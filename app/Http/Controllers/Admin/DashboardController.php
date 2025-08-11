<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Order;
use App\Models\Ticket;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_events' => Event::count(),
            'active_events' => Event::where('is_active', true)->count(),
            'total_orders' => Order::count(),
            'confirmed_orders' => Order::where('status', 'confirmed')->count(),
            'total_revenue' => Order::where('status', 'confirmed')->sum('total_amount'),
            'total_tickets_sold' => Ticket::where('status', 'sold')->count(),
            'total_users' => User::where('role', 'user')->count(),
            'total_admins' => User::where('role', 'admin')->count(),
        ];

        $recent_orders = Order::with(['tickets.event'])
            ->latest()
            ->limit(10)
            ->get();

        $upcoming_events = Event::where('is_active', true)
            ->where('event_date', '>', now())
            ->orderBy('event_date')
            ->limit(5)
            ->get();

        $revenue_by_event = Event::withSum(['tickets as revenue' => function ($query) {
            $query->whereHas('order', function ($q) {
                $q->where('status', 'confirmed');
            });
        }], 'event.price')
            ->orderBy('revenue', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_orders' => $recent_orders,
            'upcoming_events' => $upcoming_events,
            'revenue_by_event' => $revenue_by_event,
        ]);
    }
}
