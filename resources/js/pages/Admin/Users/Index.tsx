import AdminLayout from '@/layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    email_verified_at: string | null;
}

interface PaginatedUsers {
    data: User[];
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
    users: PaginatedUsers;
    filters: {
        role?: string;
        search?: string;
    };
}

export default function AdminUsersIndex({ users, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');

    const handleFilter = () => {
        router.get('/admin/users', { search, role }, { preserveState: true });
    };

    const handleReset = () => {
        setSearch('');
        setRole('');
        router.get('/admin/users');
    };

    return (
        <AdminLayout title="Users Management - Admin">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Users Management</h1>
                        <p className="mt-2 text-pink-300">Manage system users and administrators</p>
                    </div>
                    <Link
                        href="/admin/users/create"
                        className="rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:from-pink-600 hover:to-pink-700 hover:shadow-lg hover:shadow-pink-500/25"
                    >
                        Create New User
                    </Link>
                </div>

                {/* Filters */}
                <div className="mb-6 rounded-lg border border-pink-500/20 bg-black/40 p-6 backdrop-blur-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-pink-300">Search Users</label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Name or email"
                                className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-2 text-white placeholder-pink-400/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-pink-300">Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-2 text-white focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                            >
                                <option value="">All Roles</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
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

                {/* Users Table */}
                <div className="overflow-hidden rounded-lg border border-pink-500/20 bg-black/40 backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-black/60">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Role</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Joined</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-pink-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-pink-500/20">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-black/20">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-white">{user.name}</div>
                                                <div className="text-sm text-pink-300">{user.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                                                }`}
                                            >
                                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    user.email_verified_at ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                                }`}
                                            >
                                                {user.email_verified_at ? 'Verified' : 'Unverified'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-white">{new Date(user.created_at).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/admin/users/${user.id}`}
                                                    className="text-sm font-medium text-pink-400 hover:text-pink-300"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/admin/users/${user.id}/edit`}
                                                    className="text-sm font-medium text-blue-400 hover:text-blue-300"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={`/admin/users/${user.id}`}
                                                    method="delete"
                                                    as="button"
                                                    className="text-sm font-medium text-red-400 hover:text-red-300"
                                                    onBefore={() => confirm('Are you sure you want to delete this user?')}
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
                    {users.meta.last_page > 1 && (
                        <div className="border-t border-pink-500/20 bg-black/20 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-pink-300">
                                    Showing {(users.meta.current_page - 1) * users.meta.per_page + 1} to{' '}
                                    {Math.min(users.meta.current_page * users.meta.per_page, users.meta.total)} of {users.meta.total} results
                                </div>
                                <div className="flex space-x-1">
                                    {users.links.map((link, index) => (
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
