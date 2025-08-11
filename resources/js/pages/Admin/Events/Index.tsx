import AdminLayout from '@/layouts/AdminLayout';
import { Link } from '@inertiajs/react';

interface Event {
    id: number;
    title: string;
    venue: string;
    city: string;
    country: string;
    event_date: string;
    price: number;
    total_tickets: number;
    available_tickets: number;
    is_active: boolean;
    tickets_count: number;
    available_tickets_count: number;
}

interface PaginatedEvents {
    data: Event[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

interface Props {
    events: PaginatedEvents;
}

export default function AdminEventsIndex({ events }: Props) {
    return (
        <AdminLayout title="Events Management - Admin">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Events Management</h1>
                        <p className="mt-2 text-pink-300">Manage BLACKPINK concert events</p>
                    </div>
                    <Link
                        href="/admin/events/create"
                        className="rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:from-pink-600 hover:to-pink-700 hover:shadow-lg hover:shadow-pink-500/25"
                    >
                        Create New Event
                    </Link>
                </div>

                {/* Events Table */}
                <div className="overflow-hidden rounded-lg border border-pink-500/20 bg-black/40 backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-black/60">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Event</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Date & Venue</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Price</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Tickets</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-pink-500/20">
                                {events.data.map((event) => (
                                    <tr key={event.id} className="hover:bg-black/20">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-white">{event.title}</div>
                                                <div className="text-sm text-pink-300">{event.venue}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-white">{new Date(event.event_date).toLocaleDateString()}</div>
                                                <div className="text-sm text-pink-300">
                                                    {event.city}, {event.country}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white">${event.price}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-white">
                                                    {event.available_tickets} / {event.total_tickets}
                                                </div>
                                                <div className="text-sm text-pink-300">available</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    event.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                                }`}
                                            >
                                                {event.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/admin/events/${event.id}`}
                                                    className="text-sm font-medium text-pink-400 hover:text-pink-300"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/admin/events/${event.id}/edit`}
                                                    className="text-sm font-medium text-blue-400 hover:text-blue-300"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={`/admin/events/${event.id}`}
                                                    method="delete"
                                                    as="button"
                                                    className="text-sm font-medium text-red-400 hover:text-red-300"
                                                    onBefore={() => confirm('Are you sure you want to delete this event?')}
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {events.meta.last_page > 1 && (
                        <div className="border-t border-pink-500/20 bg-black/20 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-pink-300">
                                    Showing {(events.meta.current_page - 1) * events.meta.per_page + 1} to{' '}
                                    {Math.min(events.meta.current_page * events.meta.per_page, events.meta.total)} of {events.meta.total} results
                                </div>
                                <div className="flex space-x-1">
                                    {events.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`rounded-md px-3 py-2 text-sm ${
                                                link.active
                                                    ? 'bg-pink-600 text-white'
                                                    : link.url
                                                      ? 'text-pink-300 hover:bg-black/40 hover:text-pink-100'
                                                      : 'cursor-not-allowed text-pink-500/50'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
