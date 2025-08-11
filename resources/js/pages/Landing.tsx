import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Event {
    id: number;
    title: string;
    city: string;
    country: string;
    event_date: string;
    price: number;
    available_tickets: number;
}

interface Props {
    featured_events: Event[];
}

export default function Landing({ featured_events }: Props) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featured_events.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [featured_events.length]);

    const heroImages = [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&h=800&fit=crop',
    ];

    return (
        <AppLayout title="BLACKPINK World Tour - Official Tickets">
            {/* Hero Section with Animated Background */}
            <div className="relative h-screen overflow-hidden">
                {/* Animated Background Slides */}
                <div className="absolute inset-0">
                    {heroImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentSlide % heroImages.length ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-pink-900/80" />
                        </div>
                    ))}
                </div>

                {/* Floating Elements */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 h-32 w-32 animate-pulse rounded-full bg-pink-500/10 blur-xl" />
                    <div
                        className="absolute top-40 right-20 h-24 w-24 animate-bounce rounded-full bg-pink-600/20 blur-lg"
                        style={{ animationDelay: '1s' }}
                    />
                    <div
                        className="absolute bottom-32 left-1/4 h-40 w-40 animate-pulse rounded-full bg-pink-400/10 blur-2xl"
                        style={{ animationDelay: '2s' }}
                    />
                    <div
                        className="absolute right-1/3 bottom-20 h-28 w-28 animate-bounce rounded-full bg-pink-700/15 blur-xl"
                        style={{ animationDelay: '3s' }}
                    />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex h-full items-center justify-center">
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        {/* Animated Logo */}
                        <div
                            className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        >
                            <h1 className="mb-6 text-6xl font-black md:text-8xl lg:text-9xl">
                                <span className="animate-pulse bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">
                                    BLACKPINK
                                </span>
                            </h1>
                        </div>

                        {/* Animated Subtitle */}
                        <div
                            className={`transform transition-all delay-300 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        >
                            <h2 className="mb-4 text-2xl font-bold text-white md:text-4xl lg:text-5xl">WORLD TOUR</h2>
                            <div className="mb-8 text-xl font-medium text-pink-300 md:text-2xl">[BORN PINK]</div>
                        </div>

                        {/* Animated Description */}
                        <div
                            className={`transform transition-all delay-500 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        >
                            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-pink-200/90 md:text-xl">
                                Experience the magic of BLACKPINK live in concert. Join millions of BLINKs worldwide for the most spectacular K-pop
                                experience of the year.
                            </p>
                        </div>

                        {/* Animated CTA Buttons */}
                        <div
                            className={`transform transition-all delay-700 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        >
                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Link
                                    href="/events"
                                    className="group relative transform rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:from-pink-600 hover:to-pink-700 hover:shadow-2xl hover:shadow-pink-500/50"
                                >
                                    <span className="relative z-10">Get Tickets Now</span>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-600 to-pink-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </Link>

                                <Link
                                    href="#tour-dates"
                                    className="group rounded-full border-2 border-pink-400 px-8 py-4 text-lg font-bold text-pink-300 transition-all duration-300 hover:scale-105 hover:border-pink-300 hover:bg-pink-500/20 hover:text-white"
                                >
                                    View Tour Dates
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
                    <div className="flex h-10 w-6 justify-center rounded-full border-2 border-pink-400">
                        <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-pink-400" />
                    </div>
                </div>
            </div>

            {/* Featured Events Section */}
            <section id="tour-dates" className="bg-gradient-to-b from-black to-pink-900/20 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Upcoming Shows</h2>
                        <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-pink-500 to-pink-600" />
                        <p className="mx-auto max-w-2xl text-xl text-pink-300/80">
                            Don't miss your chance to see BLACKPINK live. Limited tickets available.
                        </p>
                    </div>

                    {/* Featured Events Grid */}
                    <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featured_events.slice(0, 3).map((event, index) => (
                            <div
                                key={event.id}
                                className={`group overflow-hidden rounded-2xl border border-pink-500/20 bg-black/60 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:transform hover:border-pink-400/40 hover:shadow-2xl hover:shadow-pink-500/20 ${
                                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                                }`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-pink-500 to-pink-700">
                                    <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-3xl font-bold text-white opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                                            BLACKPINK
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 rounded-full bg-black/80 px-3 py-1 text-sm font-medium text-pink-300">
                                        ${event.price}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-pink-300">
                                        {event.title}
                                    </h3>
                                    <div className="mb-2 text-pink-300">
                                        {event.city}, {event.country}
                                    </div>
                                    <div className="mb-4 text-sm text-pink-400/80">
                                        {new Date(event.event_date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
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

                    {/* View All Events Button */}
                    <div className="text-center">
                        <Link
                            href="/events"
                            className="inline-flex items-center rounded-full border border-pink-500/30 bg-black/60 px-8 py-4 font-medium text-pink-300 transition-all duration-300 hover:scale-105 hover:border-pink-400/50 hover:bg-pink-500/10 hover:text-pink-100"
                        >
                            View All Tour Dates
                            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gradient-to-r from-pink-900/20 to-black py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {[
                            { number: '2M+', label: 'Tickets Sold' },
                            { number: '50+', label: 'Cities Worldwide' },
                            { number: '100M+', label: 'BLINKs Worldwide' },
                            { number: '#1', label: 'K-Pop Girl Group' },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className={`transform text-center transition-all duration-1000 ${
                                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="mb-2 bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                                    {stat.number}
                                </div>
                                <div className="font-medium text-pink-300/80">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-black py-20">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Stay Updated</h2>
                    <p className="mb-8 text-xl text-pink-300/80">Be the first to know about new tour dates and exclusive presales</p>

                    <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 rounded-full border border-pink-500/30 bg-black/60 px-6 py-3 text-white placeholder-pink-400/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                        />
                        <button className="transform rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-8 py-3 font-medium text-white transition-all duration-200 hover:scale-105 hover:from-pink-600 hover:to-pink-700 hover:shadow-lg hover:shadow-pink-500/25">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

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
                    animation: fade-in-up 0.8s ease-out forwards;
                }
            `}</style>
        </AppLayout>
    );
}
