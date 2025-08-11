<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::where('is_active', true)
            ->where('event_date', '>', now())
            ->orderBy('event_date')
            ->get();

        return Inertia::render('Events/Index', [
            'events' => $events,
        ]);
    }

    public function landing()
    {
        $featured_events = Event::where('is_active', true)
            ->where('event_date', '>', now())
            ->orderBy('event_date')
            ->limit(3)
            ->get();

        return Inertia::render('Landing', [
            'featured_events' => $featured_events,
        ]);
    }

    public function show(Event $event)
    {
        $event->load('availableTickets');

        return Inertia::render('Events/Show', [
            'event' => $event,
        ]);
    }
}
