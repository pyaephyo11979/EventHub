import BlackpinkAuthLayout from '@/layouts/BlackpinkAuthLayout';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <BlackpinkAuthLayout title="Join the BLINK Community" description="Create your account to get exclusive access to BLACKPINK tickets">
            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-pink-300">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Enter your full name"
                            className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 text-white placeholder-pink-400/50 transition-colors focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none disabled:opacity-50"
                        />
                        {errors.name && <div className="mt-1 text-sm text-red-400">{errors.name}</div>}
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-pink-300">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="your@email.com"
                            className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 text-white placeholder-pink-400/50 transition-colors focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none disabled:opacity-50"
                        />
                        {errors.email && <div className="mt-1 text-sm text-red-400">{errors.email}</div>}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-pink-300">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Create a secure password"
                            className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 text-white placeholder-pink-400/50 transition-colors focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none disabled:opacity-50"
                        />
                        {errors.password && <div className="mt-1 text-sm text-red-400">{errors.password}</div>}
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="mb-2 block text-sm font-medium text-pink-300">
                            Confirm Password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm your password"
                            className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 text-white placeholder-pink-400/50 transition-colors focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none disabled:opacity-50"
                        />
                        {errors.password_confirmation && <div className="mt-1 text-sm text-red-400">{errors.password_confirmation}</div>}
                    </div>
                </div>

                <button
                    type="submit"
                    tabIndex={5}
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
                            Creating account...
                        </>
                    ) : (
                        'Create Account'
                    )}
                </button>

                <div className="text-center">
                    <span className="text-sm text-pink-300/80">
                        Already have an account?{' '}
                        <Link href={route('login')} className="font-medium text-pink-400 transition-colors hover:text-pink-300" tabIndex={6}>
                            Sign in
                        </Link>
                    </span>
                </div>
            </form>
        </BlackpinkAuthLayout>
    );
}
