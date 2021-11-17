
export type ErrorResponse = {
    name: string;
    message: string;
    status?: number;
}

export type ReceiptResponse = {
    id: number;
    title: string;
    note: string | null;
    endOfWarranty: null | Date;
    createdAt: Date;
    photo: any[];
}