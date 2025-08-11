import { Head, Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface PageProps {
    auth: {
        user: User;
    };
}

export default function AdminLayout({ children, title = 'Admin Dashboard' }: AdminLayoutProps) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gradient-to-br from-pink-900 via-black to-pink-800">
                {/* Admin Navigation */}
                <nav className="border-b border-pink-500/30 bg-black/90 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex items-center space-x-8">
                                <Link href="/admin" className="flex items-center space-x-2">
                                    <div className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-xl font-bold text-transparent">
                                        BLACKPINK
                                    </div>
                                    <div className="text-sm text-white">ADMIN</div>
                                </Link>

                                <div className="hidden items-center space-x-4 md:flex">
                                    <Link
                                        href="/admin"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-pink-300 transition-colors hover:text-pink-100"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/admin/events"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-pink-300 transition-colors hover:text-pink-100"
                                    >
                                        Events
                                    </Link>
                                    <Link
                                        href="/admin/orders"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-pink-300 transition-colors hover:text-pink-100"
                                    >
                                        Orders
                                    </Link>
                                    <Link
                                        href="/admin/users"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-pink-300 transition-colors hover:text-pink-100"
                                    >
                                        Users
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/"
                                    className="rounded-md px-3 py-2 text-sm font-medium text-pink-300 transition-colors hover:text-pink-100"
                                >
                                    View Site
                                </Link>
                                <div className="text-sm text-pink-300">Welcome, {auth.user.name}</div>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-700"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="relative">{children}</main>
            </div>
        </>
    );
}
