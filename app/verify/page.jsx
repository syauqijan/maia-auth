'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Verify() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');

    useEffect(() => {
        const emailParam = searchParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [searchParams]);

    return (
        <div className="flex min-h-screen bg-secondary flex-col pt-20">
            <div className="flex flex-col ml-6 mr-6">
                <h1 className="text-xl font-semibold mb-4 text-primary">Verify Your Email to Get Started</h1>
                <div className='bg-white p-4 rounded-lg '>
                    <p className="text-md mt-2 text-quaternary">
                        A confirmation link has been sent to your email address <span className='font-semibold'>{email}</span>. Click the link to verify your account and unlock full access.
                    </p>
                </div>
               
            </div>
        </div>
    );
}
