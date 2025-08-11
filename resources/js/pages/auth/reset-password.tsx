import BlackpinkAuthLayout from '@/layouts/BlackpinkAuthLayout';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <BlackpinkAuthLayout title="Reset Your Password" description="Enter your new password to regain access to your account">
            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-pink-300">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={data.email}
                            readOnly
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full cursor-not-allowed rounded-lg border border-pink-500/20 bg-black/40 px-4 py-3 text-pink-300"
                        />
                        {errors.email && <div className="mt-1 text-sm text-red-400">{errors.email}</div>}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-pink-300">
                            New Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={data.password}
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Enter your new password"
                            className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 text-white placeholder-pink-400/50 transition-colors focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                        />
                        {errors.password && <div className="mt-1 text-sm text-red-400">{errors.password}</div>}
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="mb-2 block text-sm font-medium text-pink-300">
                            Confirm New Password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirm your new password"
                            className="w-full rounded-lg border border-pink-500/30 bg-black/60 px-4 py-3 text-white placeholder-pink-400/50 transition-colors focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none"
                        />
                        {errors.password_confirmation && <div className="mt-1 text-sm text-red-400">{errors.password_confirmation}</div>}
                    </div>
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
                            Resetting password...
                        </>
                    ) : (
                        'Reset Password'
                    )}
                </button>
            </form>
        </BlackpinkAuthLayout>
    );
}
