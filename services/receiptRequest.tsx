import {ReceiptRequest} from "../props/apiRequests";
import {ReceiptResponse} from "../props/apiResponses";
import axios, {Axios, AxiosResponse} from "axios";

export interface ReceiptRequestParams {
    receiptRequest: ReceiptRequest,
    id?: number
}
export async function saveReceiptRequest({receiptRequest, id}: ReceiptRequestParams): Promise<AxiosResponse<ReceiptResponse>> {
    return await axios.request<ReceiptResponse>({
        method: id ? "PUT" : "POST",
        url: `/receipts/${id ?? ""}`,
        data: receiptRequest
    });
}

export async function getReceiptsRequest(): Promise<AxiosResponse<ReceiptResponse[]>> {
    return  await axios.get<ReceiptResponse[]>("/receipts");
}