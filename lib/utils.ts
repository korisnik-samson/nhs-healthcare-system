import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
    const dateTimeOptions: Intl.DateTimeFormatOptions = {
        // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
        month: "short", // abbreviated month name (e.g., 'Oct')
        day: "numeric", // numeric day of the month (e.g., '25')
        year: "numeric", // numeric year (e.g., '2023')
        hour: "numeric", // numeric hour (e.g., '8')
        minute: "numeric", // numeric minute (e.g., '30')
        hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    };

    const dateDayOptions: Intl.DateTimeFormatOptions = {
        weekday: "short", // abbreviated weekday name (e.g., 'Mon')
        year: "numeric", // numeric year (e.g., '2023')
        month: "2-digit", // abbreviated month name (e.g., 'Oct')
        day: "2-digit", // numeric day of the month (e.g., '25')
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
        month: "short", // abbreviated month name (e.g., 'Oct')
        year: "numeric", // numeric year (e.g., '2023')
        day: "numeric", // numeric day of the month (e.g., '25')
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric", // numeric hour (e.g., '8')
        minute: "numeric", // numeric minute (e.g., '30')
        hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    };

    const formattedDateTime: string = new Date(dateString).toLocaleString(
        "en-US",
        dateTimeOptions
    );

    const formattedDateDay: string = new Date(dateString).toLocaleString(
        "en-US",
        dateDayOptions
    );

    const formattedDate: string = new Date(dateString).toLocaleString(
        "en-US",
        dateOptions
    );

    const formattedTime: string = new Date(dateString).toLocaleString(
        "en-US",
        timeOptions
    );

    return {
        dateTime: formattedDateTime,
        dateDay: formattedDateDay,
        dateOnly: formattedDate,
        timeOnly: formattedTime,
    };
};

export function encryptKey(passkey: string) {
    return btoa(passkey);
}

export function decryptKey(passkey: string) {
    return atob(passkey);
}

export function truncateLastName(name: string) {
    return name.split(" ")[0];
}

export const credentials = {
    APPWRITE_PROJECT_ID: '668e21b9003687decf31',
    APPWRITE_API_KEY: '1478ac38c31b089762a90218beaa3f038df4c549798949ed5670b6ea9a0f7fbc0c05ae6970a24d757e3af812ea8be848de48f87c97df197488a809551d9b158474e84541288b7b577551752f14a0de1192135a41bd66002fd08eeae459a350da69929043cb16d2f3dc6a83a5dbde4073cb72b9765f96506d9608db992d488155',
    APPWRITE_DATABASE_ID: '668e224f0020a5cd2e11',
    APPWRITE_PATIENT_COLLECTION_ID: '668e227300203f5c2f0c',
    APPWRITE_DOCTOR_COLLECTION_ID: '668e229f0007a18f4aae',
    APPWRITE_APPOINTMENT_COLLECTION_ID: '668e22c9000031c6362b',
    NEXT_PUBLIC_BUCKET_ID: '668e22e8001d20d40c90',
    NEXT_PUBLIC_LOCAL_ENDPOINT: 'localhost:3000',
    NEXT_PUBLIC_ENDPOINT: 'https://cloud.appwrite.io/v1',
    NEXT_PUBLIC_PASSKEY:'932005'
}