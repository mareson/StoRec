import {photo as PrismaPhoto} from "@prisma/client";
import prisma from "./prisma";
import cloudinary from "../services/cloudinary";
import {Receipt} from "./receipts";
import {PhotoRequest, ReceiptRequest} from "../props/apiRequests";

export type Photo = PrismaPhoto;

export async function createPhoto(receiptId: number, cloudinaryId: string, url: string, text: string, width: number, height: number): Promise<Photo> {
    return await prisma.photo.create({
       data: {
           receiptId, cloudinaryId, url, text, width, height
       }
    });
}

export async function removePhotoByObject(photo: Photo): Promise<Photo | null> {
    try {
        await cloudinary.uploader.destroy(photo.cloudinaryId);
        return await prisma.photo.delete({
            where: {id: photo.id}
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function getPhotoById(id: number): Promise<Photo | null> {
    return await prisma.photo.findUnique({where: {id}});
}

export async function updatePhoto(id: number, photoRequest: PhotoRequest): Promise<Photo> {
    return await prisma.photo.update({
        where: {id},
        data: {
            receiptId: photoRequest.receiptId,
            text: photoRequest.text ?? "",
            caption: photoRequest.caption ?? ""
        }
    });
}