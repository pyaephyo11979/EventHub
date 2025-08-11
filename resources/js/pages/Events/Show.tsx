import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';

interface Event {
    id: number;
    title: string;
    description: string;
    venue: string;
    city: string;
    country: string;
    event_date: string;
    image_url?: string;
    price: number;
    available_tickets: number;
}

interface Props {
    event: Event;
}

export default function EventShow({ event }: Props) {
    return (
        <AppLayout title={`${event.title} - BLACKPINK Tickets`}>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link href="/" className="mb-8 inline-flex items-center text-pink-300 transition-colors hover:text-pink-100">
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Events
                </Link>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Event Image */}
                    <div className="space-y-6">
                        <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-pink-700">
                            {event.image_url ? (
                                <img src={event.image_url} alt={event.title} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <div className="text-4xl font-bold text-white">BLACKPINK</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="mb-4 text-4xl font-bold text-white">{event.title}</h1>
                            <div className="mb-6 text-lg text-pink-300">{event.description}</div>
                        </div>

                        {/* Event Info */}
                        <div className="rounded-lg border border-pink-500/20 bg-black/40 p-6 backdrop-blur-sm">
                            <h3 className="mb-4 text-xl font-bold text-white">Event Details</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <svg className="mr-3 h-5 w-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <div className="font-medium text-white">{event.venue}</div>
                                        <div className="text-sm text-pink-300">
                                            {event.city}, {event.country}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <svg className="mr-3 h-5 w-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <div className="text-white">
                                        {new Date(event.event_date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <svg className="mr-3 h-5 w-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                                        />
                                    </svg>
                                    <div className="text-white">{event.available_tickets} tickets available</div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing & Purchase */}
                        <div className="rounded-lg border border-pink-400/30 bg-gradient-to-r from-pink-600/20 to-pink-800/20 p-6 backdrop-blur-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-white">${event.price}</div>
                                    <div className="text-sm text-pink-300">per ticket</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-pink-300">Available</div>
                                    <div className="font-bold text-white">{event.available_tickets}</div>
                                </div>
                            </div>

                            {event.available_tickets > 0 ? (
                                <Link
                                    href={`/events/${event.id}/order`}
                                    className="block w-full rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4 text-center text-lg font-bold text-white transition-all duration-200 hover:from-pink-600 hover:to-pink-700 hover:shadow-lg hover:shadow-pink-500/25"
                                >
                                    Buy Tickets Now
                                </Link>
                            ) : (
                                <button
                                    disabled
                                    className="w-full cursor-not-allowed rounded-lg bg-gray-600 px-6 py-4 text-lg font-bold text-gray-400"
                                >
                                    Sold Out
                                </button>
                            )}
                        </div>

                        {/* Warning */}
                        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
                            <div className="flex items-start">
                                <svg className="mt-0.5 mr-3 h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                                <div>
                                    <div className="text-sm font-medium text-yellow-300">Important Notice</div>
                                    <div className="mt-1 text-sm text-yellow-200/80">
                                        Tickets are non-refundable. Please review your order carefully before purchasing.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
