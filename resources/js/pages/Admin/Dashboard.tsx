import AdminLayout from '@/layouts/AdminLayout';
import { Link } from '@inertiajs/react';

interface Stats {
    total_events: number;
    active_events: number;
    total_orders: number;
    confirmed_orders: number;
    total_revenue: number;
    total_tickets_sold: number;
    total_users: number;
    total_admins: number;
}

interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    total_amount: number;
    status: string;
    created_at: string;
    tickets: Array<{
        event: {
            title: string;
        };
    }>;
}

interface Event {
    id: number;
    title: string;
    city: string;
    event_date: string;
    available_tickets: number;
}

interface Props {
    stats: Stats;
    recent_orders: Order[];
    upcoming_events: Event[];
}

export default function AdminDashboard({ stats, recent_orders, upcoming_events }: Props) {
    return (
        <AdminLayout title="Admin Dashboard - BLACKPINK Tickets">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    <p className="mt-2 text-pink-300">Manage BLACKPINK concert tickets and events</p>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border border-pink-500/20 bg-black/40 p-6 backdrop-blur-sm">
                        <div className="flex items-center">
                            <div className="rounded-full bg-pink-500/20 p-3">
                                <svg className="h-6 w-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-pink-300">Total Events</p>
                                <p className="text-2xl font-bold text-white">{stats.total_events}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-pink-500/20 bg-black/40 p-6 backdrop-blur-sm">
                        <div className="flex items-center">
                            <div className="rounded-full bg-green-500/20 p-3">
                                <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-pink-300">Confirmed Orders</p>
                                <p className="text-2xl font-bold text-white">{stats.confirmed_orders}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-pink-500/20 bg-black/40 p-6 backdrop-blur-sm">
                        <div className="flex items-center">
                            <div className="rounded-full bg-yellow-500/20 p-3">
                                <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-pink-300">Total Revenue</p>
                                <p className="text-2xl font-bold text-white">${stats.total_revenue}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-pink-500/20 bg-black/40 p-6 backdrop-blur-sm">
                        <div className="flex items-center">
                            <div className="rounded-full bg-blue-500/20 p-3">
                                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-pink-300">Total Users</p>
                                <p className="text-2xl font-bold text-white">{stats.total_users}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Recent Orders */}
                    <div className="rounded-lg border border-pink-500/20 bg-black/40 p-6 backdrop-blur-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Recent Orders</h2>
                            <Link href="/admin/orders" className="text-sm font-medium text-pink-400 hover:text-pink-300">
                                View All
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recent_orders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between rounded-lg bg-black/20 p-4">
                                    <div>
                                        <div className="font-medium text-white">{order.order_number}</div>
                                        <div className="text-sm text-pink-300">{order.customer_name}</div>
                                        <div className="text-xs text-pink-400/80">{order.tickets[0]?.event.title}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-white">${order.total_amount}</div>
                                        <div
                                            className={`rounded-full px-2 py-1 text-xs ${
                                                order.status === 'confirmed'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : order.status === 'pending'
                                                      ? 'bg-yellow-500/20 text-yellow-400'
                                                      : 'bg-red-500/20 text-red-400'
                                            }`}
                                        >
                                            {order.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="rounded-lg border border-pink-500/20 bg-black/40 p-6 backdrop-blur-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
                            <Link href="/admin/events" className="text-sm font-medium text-pink-400 hover:text-pink-300">
                                View All
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {upcoming_events.map((event) => (
                                <div key={event.id} className="flex items-center justify-between rounded-lg bg-black/20 p-4">
                                    <div>
                                        <div className="font-medium text-white">{event.title}</div>
                                        <div className="text-sm text-pink-300">{event.city}</div>
                                        <div className="text-xs text-pink-400/80">{new Date(event.event_date).toLocaleDateString()}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-white">{event.available_tickets}</div>
                                        <div className="text-xs text-pink-300">tickets left</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Link
                        href="/admin/events/create"
                        className="rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 p-6 text-center font-medium text-white transition-all duration-200 hover:from-pink-600 hover:to-pink-700 hover:shadow-lg hover:shadow-pink-500/25"
                    >
                        <svg className="mx-auto mb-2 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Event
                    </Link>

                    <Link
                        href="/admin/orders"
                        className="rounded-lg border border-pink-500/30 bg-black/60 p-6 text-center font-medium text-pink-300 transition-all duration-200 hover:border-pink-400/50 hover:text-pink-100"
                    >
                        <svg className="mx-auto mb-2 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                        Manage Orders
                    </Link>

                    <Link
                        href="/admin/users"
                        className="rounded-lg border border-pink-500/30 bg-black/60 p-6 text-center font-medium text-pink-300 transition-all duration-200 hover:border-pink-400/50 hover:text-pink-100"
                    >
                        <svg className="mx-auto mb-2 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                            />
                        </svg>
                        Manage Users
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
