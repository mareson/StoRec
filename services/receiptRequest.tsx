import {ReceiptRequest} from "../props/apiRequests";
import {ListResponse, ReceiptResponse} from "../props/apiResponses";
import axios, {Axios, AxiosResponse} from "axios";
import { LIST_DEFAULT_SIZE } from "../props/params";

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

export interface GetReceiptsRequestParams {
    fulltext?: string;
    size?: number;
    archive?: boolean;
}
export async function getReceiptsRequest({fulltext, size, archive}: GetReceiptsRequestParams): Promise<AxiosResponse<ListResponse<ReceiptResponse>>> {
    const params: URLSearchParams = new URLSearchParams();

    if (fulltext) params.set("fulltext", fulltext);
    if (archive) params.set("archive", "true");
    params.set("size", (size ? size : LIST_DEFAULT_SIZE).toString());

    return await axios.get<ListResponse<ReceiptResponse>>(`/receipts${params.toString() !== "" ? "?"+params.toString() : ""}`);
}

export interface ReceiptRemoveRequestParams {
    id: number;
}
export async function removeReceiptRequest({id}: ReceiptRemoveRequestParams): Promise<AxiosResponse<"">> {
    return await axios.delete(`/receipts/${id}`);
}