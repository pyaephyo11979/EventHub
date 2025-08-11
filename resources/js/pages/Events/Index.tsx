import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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
    events: Event[];
}

export default function EventsIndex({ events }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Get unique cities for filter
    const cities = [...new Set(events.map((event) => event.city))];

    // Filter and sort events
    const filteredEvents = events
        .filter((event) => {
            const matchesSearch =
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.venue.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCity = selectedCity === '' || event.city === selectedCity;
            return matchesSearch && matchesCity;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(a.event_date).getTime() - new Date(b.event_date).getTime();
                case 'price':
                    return a.price - b.price;
                case 'city':
                    return a.city.localeCompare(b.city);
                default:
                    return 0;
            }
        });

    return (
        <AppLayout title="All BLACKPINK Concert Events">
            {/* Enhanced Hero Section */}
            <div className="relative h-80 overflow-hidden bg-gradient-to-r from-pink-600 via-purple-600 to-black">
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 left-10 h-32 w-32 animate-pulse rounded-full bg-pink-500/20 blur-xl" />
                    <div className="absolute top-20 right-20 h-24 w-24 animate-bounce rounded-full bg-purple-500/30 blur-lg" />
                    <div
                        className="absolute bottom-20 left-1/4 h-40 w-40 animate-pulse rounded-full bg-pink-400/15 blur-2xl"
                        style={{ animationDelay: '1s' }}
                    />
                </div>

                <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                    <div
                        className={`w-full transform text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    >
                        <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
                            All <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">BLACKPINK</span> Events
                        </h1>
                        <p className="mb-6 text-lg text-pink-200 md:text-xl">Find your perfect concert experience worldwide</p>
                        <div className="text-pink-300/80">{events.length} events available • Don't miss out!</div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="border-b border-pink-500/20 bg-black/40 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search events, cities, venues..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 pl-10 text-white placeholder-pink-400/50 transition-colors focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                            />
                            <svg
                                className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-pink-400/50"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* City Filter */}
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 text-white transition-colors focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                        >
                            <option value="">All Cities</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 text-white transition-colors focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                        >
                            <option value="date">Sort by Date</option>
                            <option value="price">Sort by Price</option>
                            <option value="city">Sort by City</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Events Grid */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {filteredEvents.length === 0 ? (
                    <div className="py-16 text-center">
                        <div className="mb-4 text-6xl">🎵</div>
                        <div className="mb-2 text-xl text-pink-300">
                            {searchTerm || selectedCity ? 'No events match your search' : 'No upcoming events'}
                        </div>
                        <div className="text-pink-400/60">
                            {searchTerm || selectedCity ? 'Try adjusting your filters' : 'Check back soon for new dates!'}
                        </div>
                        {(searchTerm || selectedCity) && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCity('');
                                }}
                                className="mt-4 font-medium text-pink-400 transition-colors hover:text-pink-300"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Results Count */}
                        <div className="mb-8 text-center">
                            <div className="text-pink-300/80">
                                Showing {filteredEvents.length} of {events.length} events
                            </div>
                        </div>

                        {/* Events Grid */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filteredEvents.map((event, index) => (
                                <div
                                    key={event.id}
                                    className={`group overflow-hidden rounded-xl border border-pink-500/20 bg-black/60 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:transform hover:border-pink-400/40 hover:shadow-2xl hover:shadow-pink-500/20 ${
                                        isVisible ? 'animate-fade-in-up' : 'opacity-0'
                                    }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-pink-500 to-pink-700">
                                        {event.image_url ? (
                                            <img
                                                src={event.image_url}
                                                alt={event.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <div className="text-2xl font-bold text-white opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                                                    BLACKPINK
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        <div className="absolute top-4 right-4 rounded-full bg-black/80 px-3 py-1 text-sm font-medium text-pink-300 backdrop-blur-sm">
                                            ${event.price}
                                        </div>

                                        {/* Availability Badge */}
                                        <div className="absolute bottom-4 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <div
                                                className={`rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${
                                                    event.available_tickets > 100
                                                        ? 'border border-green-500/30 bg-green-500/20 text-green-400'
                                                        : event.available_tickets > 20
                                                          ? 'border border-yellow-500/30 bg-yellow-500/20 text-yellow-400'
                                                          : 'border border-red-500/30 bg-red-500/20 text-red-400'
                                                }`}
                                            >
                                                {event.available_tickets > 100 ? 'Available' : event.available_tickets > 20 ? 'Limited' : 'Few Left'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-pink-300">
                                            {event.title}
                                        </h3>
                                        <div className="mb-1 flex items-center text-pink-300">
                                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            {event.venue}
                                        </div>
                                        <div className="mb-1 text-sm text-pink-400/80">
                                            {event.city}, {event.country}
                                        </div>
                                        <div className="mb-4 flex items-center text-sm text-pink-400/80">
                                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            {new Date(event.event_date).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-pink-300/80">{event.available_tickets} tickets left</div>
                                            <Link
                                                href={`/events/${event.id}`}
                                                className="transform rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:from-pink-600 hover:to-pink-700 hover:shadow-lg hover:shadow-pink-500/25"
                                            >
                                                Get Tickets
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
            `}</style>
        </AppLayout>
    );
}
