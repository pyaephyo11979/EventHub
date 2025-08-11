import { Head, Link } from '@inertiajs/react';
import { ReactNode } from 'react';

interface BlackpinkAuthLayoutProps {
    children: ReactNode;
    title: string;
    description: string;
}

export default function BlackpinkAuthLayout({ children, title, description }: BlackpinkAuthLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-900 via-black to-pink-800 p-6">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Auth Card */}
                <div className="relative w-full max-w-md">
                    <div className="rounded-2xl border border-pink-500/30 bg-black/60 p-8 shadow-2xl shadow-pink-500/10 backdrop-blur-sm">
                        {/* Logo Section */}
                        <div className="mb-8 text-center">
                            <Link href="/" className="inline-block">
                                <div className="mb-4">
                                    <div className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-3xl font-bold text-transparent">
                                        BLACKPINK
                                    </div>
                                    <div className="text-sm tracking-wider text-white">TICKETS</div>
                                </div>
                            </Link>

                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold text-white">{title}</h1>
                                <p className="text-sm text-pink-300/80">{description}</p>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="space-y-6">{children}</div>

                        {/* Footer */}
                        <div className="mt-8 border-t border-pink-500/20 pt-6">
                            <div className="text-center">
                                <Link href="/" className="text-sm font-medium text-pink-400 transition-colors hover:text-pink-300">
                                    ← Back to Events
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-pink-500/20 to-pink-600/20 blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-br from-pink-600/10 to-pink-700/10 blur-xl"></div>
                </div>
            </div>
        </>
    );
}
