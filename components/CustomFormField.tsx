'use client'

import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import 'react-phone-number-input/style.css'
import Image from "next/image";

import { CustomProps, FormFieldType, IRenderInputProps } from "@/types/index.d";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const RenderInput = ({ field, props }: IRenderInputProps) => {
    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border-2 border-dark-500 bg-dark-400'>
                    {props.iconSrc && (
                        <Image src={props.iconSrc} alt={props.iconAlt || 'icon'}
                               width={24} height={24} className='ml-2' />
                    )}
                    <FormControl>
                        <Input {...field} type={props.name} placeholder={props.placeHolder}
                            className='shad-input border-0' />
                    </FormControl>
                </div>
            );

        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className='shad-select-trigger'>
                                <SelectValue placeholder={props.placeHolder} />
                            </SelectTrigger>
                        </FormControl>

                        <SelectContent className='shad-select-content'>
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            );

        case FormFieldType.DATE_PICKER:
            return (
                <div className='flex rounded-md border-2 border-dark-500 bg-dark-400'>
                    <Image src='/assets/icons/calendar.svg' alt='calendar' height={24} width={24} className='ml-2' />
                    <FormControl>
                        <DatePicker selected={field.value} onChange={(date) => field.onChange(date)}
                            dateFormat={props.dateFormats ?? 'MM/dd/yyyy'} showTimeSelect={props.showTimeSelect ?? false}
                            timeInputLabel="Time:" wrapperClassName='date-picker'/>
                    </FormControl>
                </div>
            );

        case FormFieldType.SKELETON:
            return props.renderSkeleton ? props.renderSkeleton (field) : null

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

        case FormFieldType.TEXTAREA:
            return (
                <div className='flex rounded-md border-2 border-dark-500 bg-dark-400'>
                    <FormControl>
                        <Textarea {...field} placeholder={props.placeHolder} className='shad-input border-0'
                        disabled={props.disabled} />
                    </FormControl>
                </div>
            );

        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className='flex items-center gap-4'>
                        <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />
                        <label htmlFor={props.name} className='checkbox-label'>
                            {props.label}
                        </label>
                    </div>
                </FormControl>
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
                        <FormLabel htmlFor={name} className='text-dark-700'>
                                {label}
                        </FormLabel>
                    )}
                    <RenderInput field={field} props={props} />
                    <FormMessage className='shad-error' />
                </FormItem>
            )}
        />
    );
}

export default CustomFormField;