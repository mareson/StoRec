
export function printDate(date?: Date | null): string {
    if (date===undefined || date===null) return ``;
    const tmpDate = new Date(date);
    return `${tmpDate.getDate()}. ${tmpDate.getMonth()+1}. ${tmpDate.getFullYear()}`;
}