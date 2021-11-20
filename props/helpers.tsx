
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