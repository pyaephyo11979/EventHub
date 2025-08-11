import AdminLayout from '@/layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    customer_email: string;
    total_amount: number;
    status: string;
    created_at: string;
    tickets_count: number;
    tickets: Array<{
        event: {
            title: string;
            city: string;
        };
    }>;
}

interface PaginatedOrders {
    data: Order[];
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
    orders: PaginatedOrders;
    filters: {
        status?: string;
        search?: string;
    };
}

export default function AdminOrdersIndex({ orders, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleFilter = () => {
        router.get('/admin/orders', { search, status }, { preserveState: true });
    };

    const handleReset = () => {
        setSearch('');
        setStatus('');
        router.get('/admin/orders');
    };

    return (
        <AdminLayout title="Orders Management - Admin">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Orders Management</h1>
                    <p className="mt-2 text-pink-300">Manage customer orders and tickets</p>
                </div>

                {/* Filters */}
                <div className="mb-6 rounded-lg border border-pink-500/20 bg-black/40 p-6 backdrop-blur-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-pink-300">Search Orders</label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Order number, customer name, or email"
                                className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-2 text-white placeholder-pink-400/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-pink-300">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-2 text-white focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                            >
                                <option value="">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="flex items-end space-x-2">
                            <button
                                onClick={handleFilter}
                                className="rounded-lg bg-pink-600 px-4 py-2 font-medium text-white transition-colors hover:bg-pink-700"
                            >
                                Filter
                            </button>
                            <button
                                onClick={handleReset}
                                className="rounded-lg border border-pink-500/30 bg-black/60 px-4 py-2 font-medium text-pink-300 transition-colors hover:border-pink-400/50 hover:text-pink-100"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-hidden rounded-lg border border-pink-500/20 bg-black/40 backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-black/60">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Order</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Customer</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Event</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-pink-500/20">
                                {orders.data.map((order) => (
                                    <tr key={order.id} className="hover:bg-black/20">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-mono font-medium text-white">{order.order_number}</div>
                                                <div className="text-sm text-pink-300">{order.tickets_count} tickets</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-white">{order.customer_name}</div>
                                                <div className="text-sm text-pink-300">{order.customer_email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-white">{order.tickets[0]?.event.title}</div>
                                                <div className="text-sm text-pink-300">{order.tickets[0]?.event.city}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white">${order.total_amount}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    order.status === 'confirmed'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : order.status === 'pending'
                                                          ? 'bg-yellow-500/20 text-yellow-400'
                                                          : 'bg-red-500/20 text-red-400'
                                                }`}
                                            >
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-white">{new Date(order.created_at).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/admin/orders/${order.id}`}
                                                    className="text-sm font-medium text-pink-400 hover:text-pink-300"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/admin/orders/${order.id}`}
                                                    method="delete"
                                                    as="button"
                                                    className="text-sm font-medium text-red-400 hover:text-red-300"
                                                    onBefore={() => confirm('Are you sure you want to delete this order?')}
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
                    {orders.meta.last_page > 1 && (
                        <div className="border-t border-pink-500/20 bg-black/20 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-pink-300">
                                    Showing {(orders.meta.current_page - 1) * orders.meta.per_page + 1} to{' '}
                                    {Math.min(orders.meta.current_page * orders.meta.per_page, orders.meta.total)} of {orders.meta.total} results
                                </div>
                                <div className="flex space-x-1">
                                    {orders.links.map((link, index) => (
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
