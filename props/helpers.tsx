import {useRef} from 'react';
import { ReceiptResponse } from './apiResponses';

export function printDate(date?: Date | null): string {
    if (date===undefined || date===null) return ``;
    const tmpDate = new Date(date);
    return `${tmpDate.getDate()}. ${tmpDate.getMonth()+1}. ${tmpDate.getFullYear()}`;
}

export function passParams(pattern: string, replacements: {[key in string | number]: string | number}): string {
    Object.entries(replacements).forEach(([key, value]): void => {
        pattern = pattern.replace(`:${key}`, value.toString());
    });
    return pattern;
}

export function isAfterEndOfWarranty(receipt: ReceiptResponse): boolean {
    const endOfWarranty = new Date(receipt.endOfWarranty ?? new Date());
    return endOfWarranty.getTime() <= (new Date()).getTime();
}

export function useDebounce(): {
    process: (fce: Function)=>void;
} {
    const debounceTimer = useRef<number>();

    const process = (fce: Function) => {
        if (debounceTimer.current!==undefined) {
            clearTimeout(debounceTimer.current);
            debounceTimer.current = undefined;
        }

        debounceTimer.current = setTimeout(fce, 750);
    }

    return {
        process
    }
}