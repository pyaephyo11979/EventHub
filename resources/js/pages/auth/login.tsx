import BlackpinkAuthLayout from '@/layouts/BlackpinkAuthLayout';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <BlackpinkAuthLayout title="Welcome Back" description="Sign in to access your BLACKPINK concert tickets">
            {status && (
                <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-center text-sm font-medium text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-pink-300">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="admin@blackpink.com"
                            className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 text-white placeholder-pink-400/50 transition-colors focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                        />
                        {errors.email && <div className="mt-1 text-sm text-red-400">{errors.email}</div>}
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-pink-300">
                                Password
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-pink-400 transition-colors hover:text-pink-300"
                                    tabIndex={5}
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>
                        <input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Enter your password"
                            className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 text-white placeholder-pink-400/50 transition-colors focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                        />
                        {errors.password && <div className="mt-1 text-sm text-red-400">{errors.password}</div>}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember"
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            tabIndex={3}
                            className="h-4 w-4 rounded border-pink-500/30 bg-black/60 text-pink-600 focus:ring-2 focus:ring-pink-400"
                        />
                        <label htmlFor="remember" className="ml-3 text-sm text-pink-300">
                            Remember me
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    tabIndex={4}
                    disabled={processing}
                    className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:from-pink-600 hover:to-pink-700 hover:shadow-lg hover:shadow-pink-500/25 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-700"
                >
                    {processing ? (
                        <>
                            <svg
                                className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Signing in...
                        </>
                    ) : (
                        'Sign In'
                    )}
                </button>

                <div className="text-center">
                    <span className="text-sm text-pink-300/80">
                        Don't have an account?{' '}
                        <Link href={route('register')} className="font-medium text-pink-400 transition-colors hover:text-pink-300" tabIndex={5}>
                            Sign up
                        </Link>
                    </span>
                </div>
            </form>
        </BlackpinkAuthLayout>
    );
}
