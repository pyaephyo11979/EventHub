<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function create(Event $event)
    {
        return Inertia::render('Orders/Create', [
            'event' => $event,
        ]);
    }

    public function store(Request $request, Event $event)
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'quantity' => 'required|integer|min:1|max:10',
        ]);

        if ($event->available_tickets < $request->quantity) {
            return back()->withErrors(['quantity' => 'Not enough tickets available']);
        }

        $order = Order::create([
            'order_number' => 'BP-'.strtoupper(Str::random(8)),
            'customer_name' => $request->customer_name,
            'customer_email' => $request->customer_email,
            'customer_phone' => $request->customer_phone,
            'total_amount' => $event->price * $request->quantity,
            'status' => 'confirmed',
            'expires_at' => now()->addMinutes(15),
        ]);

        // Reserve tickets
        $availableTickets = $event->availableTickets()->limit($request->quantity)->get();

        foreach ($availableTickets as $ticket) {
            $ticket->update([
                'order_id' => $order->id,
                'status' => 'sold',
            ]);
        }

        // Update event available tickets
        $event->decrement('available_tickets', $request->quantity);

        return redirect()->route('orders.show', $order);
    }

    public function show(Order $order)
    {
        $order->load(['tickets.event']);

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }
}
