import AppLayout from '@/layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface Event {
    id: number;
    title: string;
    venue: string;
    city: string;
    event_date: string;
    price: number;
    available_tickets: number;
}

interface Props {
    event: Event;
}

export default function OrderCreate({ event }: Props) {
    const [quantity, setQuantity] = useState(1);

    const { data, setData, post, processing, errors } = useForm({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        quantity: 1,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/events/${event.id}/order`);
    };

    const totalPrice = event.price * quantity;

    return (
        <AppLayout title={`Order Tickets - ${event.title}`}>
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link href={`/events/${event.id}`} className="mb-8 inline-flex items-center text-pink-300 transition-colors hover:text-pink-100">
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Event
                </Link>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Order Summary */}
                    <div className="h-fit rounded-lg border border-pink-500/20 bg-black/40 p-6 backdrop-blur-sm">
                        <h2 className="mb-6 text-2xl font-bold text-white">Order Summary</h2>

                        <div className="mb-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">{event.title}</h3>
                                <div className="text-pink-300">
                                    {event.venue}, {event.city}
                                </div>
                                <div className="text-sm text-pink-400/80">
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

                            <div className="border-t border-pink-500/20 pt-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-pink-300">Ticket Price</span>
                                    <span className="text-white">${event.price}</span>
                                </div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-pink-300">Quantity</span>
                                    <span className="text-white">{quantity}</span>
                                </div>
                                <div className="mt-4 border-t border-pink-500/20 pt-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-white">Total</span>
                                        <span className="text-lg font-bold text-pink-400">${totalPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Form */}
                    <div className="rounded-lg border border-pink-500/20 bg-black/40 p-6 backdrop-blur-sm">
                        <h2 className="mb-6 text-2xl font-bold text-white">Customer Information</h2>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Quantity Selection */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-pink-300">Number of Tickets</label>
                                <select
                                    value={quantity}
                                    onChange={(e) => {
                                        const newQuantity = parseInt(e.target.value);
                                        setQuantity(newQuantity);
                                        setData('quantity', newQuantity);
                                    }}
                                    className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 text-white focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                                >
                                    {Array.from({ length: Math.min(10, event.available_tickets) }, (_, i) => i + 1).map((num) => (
                                        <option key={num} value={num}>
                                            {num} {num === 1 ? 'ticket' : 'tickets'}
                                        </option>
                                    ))}
                                </select>
                                {errors.quantity && <div className="mt-1 text-sm text-red-400">{errors.quantity}</div>}
                            </div>

                            {/* Customer Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-pink-300">Full Name *</label>
                                <input
                                    type="text"
                                    value={data.customer_name}
                                    onChange={(e) => setData('customer_name', e.target.value)}
                                    className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 text-white placeholder-pink-400/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                                    placeholder="Enter your full name"
                                    required
                                />
                                {errors.customer_name && <div className="mt-1 text-sm text-red-400">{errors.customer_name}</div>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-pink-300">Email Address *</label>
                                <input
                                    type="email"
                                    value={data.customer_email}
                                    onChange={(e) => setData('customer_email', e.target.value)}
                                    className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 text-white placeholder-pink-400/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                                    placeholder="Enter your email address"
                                    required
                                />
                                {errors.customer_email && <div className="mt-1 text-sm text-red-400">{errors.customer_email}</div>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-pink-300">Phone Number *</label>
                                <input
                                    type="tel"
                                    value={data.customer_phone}
                                    onChange={(e) => setData('customer_phone', e.target.value)}
                                    className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 text-white placeholder-pink-400/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                                    placeholder="Enter your phone number"
                                    required
                                />
                                {errors.customer_phone && <div className="mt-1 text-sm text-red-400">{errors.customer_phone}</div>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4 text-lg font-bold text-white transition-all duration-200 hover:from-pink-600 hover:to-pink-700 hover:shadow-lg hover:shadow-pink-500/25 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-700"
                            >
                                {processing ? 'Processing...' : `Complete Order - $${totalPrice}`}
                            </button>
                        </form>

                        {/* Terms */}
                        <div className="mt-6 text-xs text-pink-400/60">
                            By completing this order, you agree to our terms and conditions. All sales are final and tickets are non-refundable.
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
