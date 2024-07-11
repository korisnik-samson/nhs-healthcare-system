import React from 'react'
import { IButtonProps } from "@/types";
import { Button } from "@/components/ui/button";

import { Loader } from "lucide-react";

const SubmitButton = ({ isLoading, className, children }: IButtonProps) => {
    return (
        <Button type='submit' disabled={isLoading} className={className ?? 'shad-primary-btn w-full'}>
            {isLoading ? (
                <div className='flex items-center gap-4'>
                    <Loader size={24} className='animate-spin' />
                    Loading...
                </div>
            ) : children}
        </Button>
    );
}

export default SubmitButton;