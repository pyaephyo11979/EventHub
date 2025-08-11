<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['tickets.event'])
            ->withCount('tickets');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Search by order number or customer name
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                    ->orWhere('customer_name', 'like', "%{$search}%")
                    ->orWhere('customer_email', 'like', "%{$search}%");
            });
        }

        $orders = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['tickets.event']);

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $oldStatus = $order->status;
        $order->update($validated);

        // If order is cancelled, make tickets available again
        if ($validated['status'] === 'cancelled' && $oldStatus !== 'cancelled') {
            $order->tickets()->update([
                'status' => 'available',
                'order_id' => null,
            ]);

            // Update event available tickets count
            foreach ($order->tickets as $ticket) {
                $ticket->event->increment('available_tickets');
            }
        }

        return back()->with('success', 'Order status updated successfully!');
    }

    public function destroy(Order $order)
    {
        // Make tickets available again
        $order->tickets()->update([
            'status' => 'available',
            'order_id' => null,
        ]);

        // Update event available tickets count
        foreach ($order->tickets as $ticket) {
            $ticket->event->increment('available_tickets');
        }

        $order->delete();

        return redirect()->route('admin.orders.index')
            ->with('success', 'Order deleted successfully!');
    }
}
