import React from 'react'
import Image from 'next/image'
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import { SearchParamProps } from "@/types";

import * as Sentry from '@sentry/nextjs'

const Page = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getUser(userId);

    // Track user viewing the registration page
    Sentry.metrics.set('user_view_register', user.name);

    return (
        <div className='flex h-screen max-h-screen'>
            <section className='remove-scrollbar container'>
                <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
                    <Image src='/assets/icons/logo-full.svg' height={1000} width={1000} alt='Patient'
                           className='mb-12 h-10 w-fit'/>

                    <RegisterForm user={user} />

                    <p className='copyright py-12'>
                        &copy; 2024 Samson. All rights reserved.
                    </p>
                </div>
            </section>

            <Image src='/assets/images/register-img.png' height={1000} width={1000} alt='Patient'
                   className='side-img max-w-[500px]' />
        </div>
    );
}

export default Page;