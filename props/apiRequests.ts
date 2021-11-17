import {Asserts, date, object, setLocale, string, TypeOf} from "yup";
import {yupLocalization} from "./messages";

setLocale(yupLocalization);

const receiptRequest = {
    title: string().defined().max(255),
    note: string().nullable().optional(),
    endOfWarranty: date().nullable().optional()
};
export const receiptRequestSchema = object(receiptRequest);

export interface ReceiptRequest extends Asserts<typeof receiptRequestSchema> {}
