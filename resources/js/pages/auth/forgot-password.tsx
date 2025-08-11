import BlackpinkAuthLayout from '@/layouts/BlackpinkAuthLayout';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <BlackpinkAuthLayout title="Forgot Password?" description="No worries! Enter your email and we'll send you a reset link">
            {status && (
                <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-center text-sm font-medium text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-pink-300">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="off"
                        value={data.email}
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 text-white placeholder-pink-400/50 transition-colors focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                    />
                    {errors.email && <div className="mt-1 text-sm text-red-400">{errors.email}</div>}
                </div>

                <button
                    type="submit"
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
                            Sending reset link...
                        </>
                    ) : (
                        'Send Password Reset Link'
                    )}
                </button>

                <div className="text-center">
                    <span className="text-sm text-pink-300/80">
                        Remember your password?{' '}
                        <Link href={route('login')} className="font-medium text-pink-400 transition-colors hover:text-pink-300">
                            Sign in
                        </Link>
                    </span>
                </div>
            </form>
        </BlackpinkAuthLayout>
    );
}
