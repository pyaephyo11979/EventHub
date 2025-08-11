<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Ticket;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $events = [
            [
                'title' => 'BLACKPINK WORLD TOUR [BORN PINK] - Seoul',
                'description' => 'Experience BLACKPINK live in their hometown Seoul! Join Jisoo, Jennie, Rosé, and Lisa for an unforgettable night of music, dance, and pure K-pop magic.',
                'venue' => 'KSPO Dome',
                'city' => 'Seoul',
                'country' => 'South Korea',
                'event_date' => now()->addDays(30)->setTime(19, 0),
                'price' => 150.00,
                'total_tickets' => 1000,
                'available_tickets' => 850,
            ],
            [
                'title' => 'BLACKPINK WORLD TOUR [BORN PINK] - Los Angeles',
                'description' => 'BLACKPINK brings their electrifying performance to the City of Angels! Don\'t miss this spectacular show featuring all their biggest hits.',
                'venue' => 'Crypto.com Arena',
                'city' => 'Los Angeles',
                'country' => 'United States',
                'event_date' => now()->addDays(45)->setTime(20, 0),
                'price' => 180.00,
                'total_tickets' => 1200,
                'available_tickets' => 950,
            ],
            [
                'title' => 'BLACKPINK WORLD TOUR [BORN PINK] - London',
                'description' => 'The queens of K-pop take over London! Experience the phenomenon that is BLACKPINK in this exclusive European show.',
                'venue' => 'The O2 Arena',
                'city' => 'London',
                'country' => 'United Kingdom',
                'event_date' => now()->addDays(60)->setTime(19, 30),
                'price' => 165.00,
                'total_tickets' => 800,
                'available_tickets' => 720,
            ],
            [
                'title' => 'BLACKPINK WORLD TOUR [BORN PINK] - Tokyo',
                'description' => 'BLACKPINK returns to Japan for an incredible night of music and performance. Witness the global superstars in action!',
                'venue' => 'Tokyo Dome',
                'city' => 'Tokyo',
                'country' => 'Japan',
                'event_date' => now()->addDays(75)->setTime(18, 0),
                'price' => 170.00,
                'total_tickets' => 1500,
                'available_tickets' => 1200,
            ],
            [
                'title' => 'BLACKPINK WORLD TOUR [BORN PINK] - Sydney',
                'description' => 'BLACKPINK brings their world tour down under! Join thousands of BLINKs for this once-in-a-lifetime concert experience.',
                'venue' => 'Qudos Bank Arena',
                'city' => 'Sydney',
                'country' => 'Australia',
                'event_date' => now()->addDays(90)->setTime(19, 0),
                'price' => 175.00,
                'total_tickets' => 900,
                'available_tickets' => 650,
            ],
        ];

        foreach ($events as $eventData) {
            $event = Event::create($eventData);

            // Create tickets for each event
            for ($i = 1; $i <= $event->total_tickets; $i++) {
                Ticket::create([
                    'event_id' => $event->id,
                    'ticket_code' => 'BP-'.$event->id.'-'.str_pad($i, 4, '0', STR_PAD_LEFT),
                    'status' => $i <= $event->available_tickets ? 'available' : 'sold',
                    'seat_section' => 'Section '.chr(65 + ($i - 1) % 10), // A, B, C, etc.
                    'seat_row' => ceil($i / 20),
                    'seat_number' => (($i - 1) % 20) + 1,
                ]);
            }
        }
    }
}
