import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';

interface Ticket {
    id: number;
    ticket_code: string;
    status: string;
    event: {
        title: string;
        venue: string;
        city: string;
        event_date: string;
    };
}

interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    total_amount: number;
    status: string;
    created_at: string;
    tickets: Ticket[];
}

interface Props {
    order: Order;
}

export default function OrderShow({ order }: Props) {
    const event = order.tickets[0]?.event;

    return (
        <AppLayout title={`Order ${order.order_number} - BLACKPINK Tickets`}>
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Success Header */}
                <div className="mb-12 text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                        <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="mb-2 text-3xl font-bold text-white">Order Confirmed!</h1>
                    <p className="text-pink-300">Your BLACKPINK concert tickets have been successfully purchased.</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Order Details */}
                    <div className="rounded-lg border border-pink-500/20 bg-black/40 p-6 backdrop-blur-sm">
                        <h2 className="mb-6 text-xl font-bold text-white">Order Details</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-pink-300">Order Number</span>
                                <span className="font-mono text-white">{order.order_number}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-pink-300">Status</span>
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                        order.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                    }`}
                                >
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-pink-300">Order Date</span>
                                <span className="text-white">
                                    {new Date(order.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-pink-300">Total Amount</span>
                                <span className="text-lg font-bold text-white">${order.total_amount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="rounded-lg border border-pink-500/20 bg-black/40 p-6 backdrop-blur-sm">
                        <h2 className="mb-6 text-xl font-bold text-white">Customer Information</h2>

                        <div className="space-y-4">
                            <div>
                                <div className="text-sm text-pink-300">Name</div>
                                <div className="text-white">{order.customer_name}</div>
                            </div>

                            <div>
                                <div className="text-sm text-pink-300">Email</div>
                                <div className="text-white">{order.customer_email}</div>
                            </div>

                            <div>
                                <div className="text-sm text-pink-300">Phone</div>
                                <div className="text-white">{order.customer_phone}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event Information */}
                {event && (
                    <div className="mt-8 rounded-lg border border-pink-400/30 bg-gradient-to-r from-pink-600/20 to-pink-800/20 p-6 backdrop-blur-sm">
                        <h2 className="mb-6 text-xl font-bold text-white">Event Information</h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="mb-2 text-lg font-bold text-white">{event.title}</h3>
                                <div className="text-pink-300">{event.venue}</div>
                                <div className="text-pink-300">{event.city}</div>
                            </div>

                            <div>
                                <div className="mb-1 text-sm text-pink-300">Event Date</div>
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
                        </div>
                    </div>
                )}

                {/* Tickets */}
                <div className="mt-8 rounded-lg border border-pink-500/20 bg-black/40 p-6 backdrop-blur-sm">
                    <h2 className="mb-6 text-xl font-bold text-white">Your Tickets</h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {order.tickets.map((ticket, index) => (
                            <div
                                key={ticket.id}
                                className="rounded-lg border border-pink-400/30 bg-gradient-to-r from-pink-500/10 to-pink-600/10 p-4"
                            >
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <div className="font-bold text-white">Ticket #{index + 1}</div>
                                        <div className="font-mono text-sm text-pink-300">{ticket.ticket_code}</div>
                                    </div>
                                    <div className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">
                                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                    </div>
                                </div>

                                {ticket.seat_section && (
                                    <div className="text-sm text-pink-300">
                                        Section: {ticket.seat_section}
                                        {ticket.seat_row && `, Row: ${ticket.seat_row}`}
                                        {ticket.seat_number && `, Seat: ${ticket.seat_number}`}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Important Information */}
                <div className="mt-8 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-6">
                    <h3 className="mb-3 font-bold text-yellow-300">Important Information</h3>
                    <ul className="space-y-2 text-sm text-yellow-200/80">
                        <li>• Please bring a valid ID that matches the name on the order</li>
                        <li>• Arrive at the venue at least 1 hour before the show starts</li>
                        <li>• Screenshots of tickets are not accepted - please present this confirmation</li>
                        <li>• Tickets are non-transferable and non-refundable</li>
                        <li>• Check the venue's prohibited items list before attending</li>
                    </ul>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                        href="/"
                        className="rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 px-8 py-3 text-center font-medium text-white transition-all duration-200 hover:from-pink-600 hover:to-pink-700 hover:shadow-lg hover:shadow-pink-500/25"
                    >
                        Browse More Events
                    </Link>

                    <button
                        onClick={() => window.print()}
                        className="rounded-lg border border-pink-500/30 bg-black/60 px-8 py-3 font-medium text-pink-300 transition-all duration-200 hover:border-pink-400/50 hover:text-pink-100"
                    >
                        Print Confirmation
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
