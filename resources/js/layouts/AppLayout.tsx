import { Head, Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

interface AppLayoutProps {
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
    auth?: {
        user?: User;
    };
}

export default function AppLayout({ children, title = 'BLACKPINK Tickets' }: AppLayoutProps) {
    const { auth } = usePage<PageProps>().props;
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gradient-to-br from-pink-900 via-black to-pink-800">
                {/* Navigation */}
                <nav className="border-b border-pink-500/20 bg-black/80 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex items-center">
                                <Link href="/" className="flex items-center space-x-2">
                                    <div className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
                                        BLACKPINK
                                    </div>
                                    <div className="text-sm text-white">TICKETS</div>
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/events"
                                    className="rounded-md px-3 py-2 text-sm font-medium text-pink-300 transition-colors hover:text-pink-100"
                                >
                                    Events
                                </Link>

                                {auth?.user ? (
                                    <>
                                        {auth.user.role === 'admin' && (
                                            <Link
                                                href="/admin"
                                                className="rounded-md px-3 py-2 text-sm font-medium text-pink-300 transition-colors hover:text-pink-100"
                                            >
                                                Admin
                                            </Link>
                                        )}
                                        <Link
                                            href="/dashboard"
                                            className="rounded-md px-3 py-2 text-sm font-medium text-pink-300 transition-colors hover:text-pink-100"
                                        >
                                            Dashboard
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
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="rounded-md px-3 py-2 text-sm font-medium text-pink-300 transition-colors hover:text-pink-100"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-700"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="relative">{children}</main>

                {/* Footer */}
                <footer className="mt-20 border-t border-pink-500/20 bg-black/90">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="mb-2 text-lg font-bold text-pink-400">BLACKPINK TICKETS</div>
                            <div className="text-sm text-pink-300/60">Experience the magic of BLACKPINK live in concert</div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
