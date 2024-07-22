import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { SearchParamProps } from "@/types";
import { getAppointments } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Page = async ({ params: { userId }, searchParams }: SearchParamProps) => {
    // extract the appointmentId from the search params and fetch the appointment details
    const appointmentId = (searchParams?.appointmentId as string) || '';
    const appointment = await getAppointments(appointmentId);

    const doctor = Doctors.find((doctor) => doctor.name === appointment?.primaryPhysician);

    return (
        <div className='flex h-screen max-h-screen px-[5%]'>
            <div className='success-img'>
                <Link href='/'>
                    <Image src='/assets/icons/logo-full.svg' width={1000} height={1000} alt='logo'
                        className='h-10 w-fit' />
                </Link>

                <section className='flex flex-col items-center'>
                    <Image src='/assets/gifs/success.gif' alt='success' width={300} height={280} />

                    <h2 className='header mb-6 max-w-[600px] text-center'>
                        Your <span className='text-green-500'>appointment request</span> has been successfully submitted!
                    </h2>
                    <p className=''>We&apos;ll be in touch shortly to confirm</p>
                </section>

                <section className='request-details'>
                    <p>Requested Appointment Details</p>
                    <div className='flex items-center gap-3'>
                        {/* Render the details of the selected doctor */}
                        <Image src={doctor?.image!} alt='doctor' width={600} height={600} className='size-6' />
                        <p className='whitespace-nowrap'> Dr. {doctor?.name}</p>
                    </div>
                    <div className='flex gap-2'>
                        <Image src='/assets/icons/calendar.svg' alt='calendar' width={24} height={24} />
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>

                <Button variant='default' className='shad-primary-btn' asChild>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New Appointment
                    </Link>
                </Button>
                <p className='copyright'>
                    &copy; 2024 Samson. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default Page;