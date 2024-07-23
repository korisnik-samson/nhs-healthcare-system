'use client';

import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { credentials, decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModal = () => {
    const router: AppRouterInstance = useRouter();
    const path = usePathname();
    const [open, setOpen] = useState<boolean>(true);
    const [passkey, setPasskey] = useState<string>('');
    const [error, setError] = useState<string>('');

    // get the encrypted key from the local storage if it's been issued
    const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('accessKey') : null;

    useEffect((): void => {
        const accessKey = encryptedKey && decryptKey(encryptedKey);

        if (path) {
            if (accessKey === credentials.NEXT_PUBLIC_PASSKEY!) {
                setOpen(false);
                router.push('/admin');

            } else {
                setOpen(true);
            }
        }
    }, [encryptedKey]);

    const closeModal = () => {
        setOpen(false);
        router.push('/');
    }

    const validatePasskey = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault();

        if (passkey === credentials.NEXT_PUBLIC_PASSKEY!) {
            const encryptedKey = encryptKey(passkey);
            localStorage.setItem('accessKey', encryptedKey);

            setOpen(false);

        } else {
            setError('Invalid passkey. Please try again');
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className='shad-alert-dialog'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex items-start justify-between'>
                        Admin Access Verification
                        <Image src='/assets/icons/close.svg' alt='close' width={20} height={20}
                            onClick={() => closeModal()} className='cursor-pointer' />
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        To access the admin dashboard, please enter the passkey provided to you.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className=''>
                    <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
                        <InputOTPGroup className='shad-otp'>
                            <InputOTPSlot className='shad-otp-slot' index={0} />
                            <InputOTPSlot className='shad-otp-slot' index={1} />
                            <InputOTPSlot className='shad-otp-slot' index={2} />
                            <InputOTPSlot className='shad-otp-slot' index={3} />
                            <InputOTPSlot className='shad-otp-slot' index={4} />
                            <InputOTPSlot className='shad-otp-slot' index={5} />
                        </InputOTPGroup>
                    </InputOTP>

                    {error && <p className='shad-error text-14-regular mt-4 flex justify-center'>
                        {error}
                    </p>}
                </div>

                <AlertDialogFooter>
                    <AlertDialogAction className='shad-primary-btn w-full' onClick={(ev) => validatePasskey(ev)}>
                        Enter Admin Passkey
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default PasskeyModal;