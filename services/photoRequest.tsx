import axios, {AxiosResponse} from "axios";
import {PhotoResponse} from "../props/apiResponses";
import {PhotoRequest} from "../props/apiRequests";
import { number } from "yup";

export interface CreatePhotoRequestParams {
    photo: File,
    receiptId: number
}
export async function createPhotoRequest({photo, receiptId}: CreatePhotoRequestParams): Promise<AxiosResponse<PhotoResponse>> {
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("receiptId", receiptId.toString());
    return await axios.post("/photos", formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export interface SavePhotoRequestParams {
    request: PhotoRequest;
    id: number;
}
export async function savePhotoRequest({request, id}: SavePhotoRequestParams): Promise<AxiosResponse<PhotoResponse>> {
    return await axios.put<PhotoResponse>(`/photos/${id}`, request);
}

export interface RemovePhotoRequestParams {
    id: number;
}
export async function removePhotoRequest({id}: RemovePhotoRequestParams): Promise<AxiosResponse<"">> {
    return await axios.delete<"">(`/photos/${id}`);
}