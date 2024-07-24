'use client';

import React from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCcwIcon } from 'lucide-react'
import { useRouter } from "next/navigation";

const RefreshButton = () => {
    const router = useRouter();

    return <Button variant="outline" size="default" className='shad-gray-btn' onClick={router.refresh}>
        <RefreshCcwIcon size={16} className='shad-gray-btn mr-3'/>
        Reload Appointments
    </Button>
}

export default RefreshButton;