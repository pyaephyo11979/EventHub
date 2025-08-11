<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::withCount(['tickets', 'availableTickets'])
            ->orderBy('event_date', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Events/Index', [
            'events' => $events,
        ]);
    }

    public function show(Event $event)
    {
        $event->load(['tickets.order']);
        $event->loadCount(['tickets', 'availableTickets']);

        $ticketStats = [
            'total' => $event->tickets_count,
            'available' => $event->available_tickets_count,
            'sold' => $event->tickets()->where('status', 'sold')->count(),
            'reserved' => $event->tickets()->where('status', 'reserved')->count(),
        ];

        $revenue = $event->tickets()
            ->whereHas('order', function ($query) {
                $query->where('status', 'confirmed');
            })
            ->count() * $event->price;

        return Inertia::render('Admin/Events/Show', [
            'event' => $event,
            'ticket_stats' => $ticketStats,
            'revenue' => $revenue,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Events/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'venue' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'event_date' => 'required|date|after:now',
            'image_url' => 'nullable|url',
            'price' => 'required|numeric|min:0',
            'total_tickets' => 'required|integer|min:1',
        ]);

        $validated['available_tickets'] = $validated['total_tickets'];

        $event = Event::create($validated);

        // Create tickets for the event
        for ($i = 1; $i <= $event->total_tickets; $i++) {
            Ticket::create([
                'event_id' => $event->id,
                'ticket_code' => 'BP-'.$event->id.'-'.str_pad($i, 4, '0', STR_PAD_LEFT),
                'status' => 'available',
                'seat_section' => 'Section '.chr(65 + ($i - 1) % 10),
                'seat_row' => ceil($i / 20),
                'seat_number' => (($i - 1) % 20) + 1,
            ]);
        }

        return redirect()->route('admin.events.index')
            ->with('success', 'Event created successfully!');
    }

    public function edit(Event $event)
    {
        return Inertia::render('Admin/Events/Edit', [
            'event' => $event,
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'venue' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'event_date' => 'required|date',
            'image_url' => 'nullable|url',
            'price' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $event->update($validated);

        return redirect()->route('admin.events.index')
            ->with('success', 'Event updated successfully!');
    }

    public function destroy(Event $event)
    {
        // Check if event has any sold tickets
        $soldTickets = $event->tickets()->where('status', 'sold')->count();

        if ($soldTickets > 0) {
            return back()->withErrors(['error' => 'Cannot delete event with sold tickets.']);
        }

        $event->delete();

        return redirect()->route('admin.events.index')
            ->with('success', 'Event deleted successfully!');
    }
}
