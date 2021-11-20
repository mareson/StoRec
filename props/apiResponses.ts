
export type ErrorResponse = {
    name: string;
    message: string;
    status?: number;
    code?: number;
}

export type ReceiptResponse = {
    id: number;
    title: string;
    note: string | null;
    endOfWarranty: null | Date;
    purchaseDate: null | Date;
    createdAt: Date;
    photo: any[];
}

export type PhotoResponse = {
    id: number;
    caption: string | null;
    receiptId: number;
    text: string;
    cloudinaryId: string;
    url: string;
    width: number;
    height: number;
};