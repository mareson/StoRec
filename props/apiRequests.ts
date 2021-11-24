import {Asserts, bool, date, mixed, number, object, setLocale, string, TypeOf} from "yup";
import {yupLocalization} from "./messages";

setLocale(yupLocalization);

const receiptRequest = {
    title: string().defined().max(255),
    note: string().nullable().optional(),
    purchaseDate: date().nullable().optional(),
    endOfWarranty: date().nullable().optional(),
    archive: bool().optional().notRequired()
};
export const receiptRequestSchema = object(receiptRequest);
export interface ReceiptRequest extends Asserts<typeof receiptRequestSchema> {}

export const photoRequestSchema = object({
    caption: string().nullable().optional().max(255),
    text: string().nullable().optional(),
    receiptId: number().defined()
});
export interface PhotoRequest extends Asserts<typeof photoRequestSchema> {}


