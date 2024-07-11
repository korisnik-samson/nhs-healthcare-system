'use client'

import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import 'react-phone-number-input/style.css'
import Image from "next/image";

import { CustomProps, FormFieldType, IRenderInputProps } from "@/types/index.d";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";

const RenderInput = ({ field, props }: IRenderInputProps) => {
    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    {props.iconSrc && (
                        <Image src={props.iconSrc} alt={props.iconAlt || 'icon'}
                               width={24} height={24} className='ml-2' />
                    )}
                    <FormControl>
                        <Input {...field} type='text' placeholder={props.placeHolder}
                            className='shad-input border-0' />
                    </FormControl>
                </div>
            );

        case FormFieldType.CHECKBOX:
            return (
                <div></div>
            );

        case FormFieldType.TEXTAREA:
            return (
                <div></div>
            );

        case FormFieldType.PHONE_INPUT:
            return (
                <div>
                    <FormControl>
                        <PhoneInput defaultCountry='RS' placeholder={props.placeHolder} international
                            withCountryCallingCode value={field.value as E164Number | undefined} onChange={field.onChange}
                            className='input-phone' />
                    </FormControl>
                </div>
            );

        default: return null;
    }
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label,
        placeHolder, iconSrc, iconAlt } = props;

    return (
        <FormField control={control} name={name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <React.Fragment>
                            <FormLabel htmlFor={name} className='text-dark-700'>
                                {label}
                            </FormLabel>

                            <RenderInput field={field} props={props} />

                            <FormMessage className='shad-error' />
                        </React.Fragment>
                    )}
                </FormItem>
            )}
        />
    );
}

export default CustomFormField;