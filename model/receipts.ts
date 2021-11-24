import { Prisma, receipt as PrismaReceipt, photo as PrismaPhoto } from "@prisma/client";
import prisma from "./prisma";
import {ReceiptRequest} from "../props/apiRequests";
import {Errors} from "../props/errors";
import {removePhotoByObject} from "./photos";
import { object } from "yup/lib/locale";


export type Receipt = (PrismaReceipt & {photo: PrismaPhoto[]});

export async function getAllReceipts(size: number, fulltext?: string, archive?: boolean): Promise<Receipt[]> {
    const match: {contains: string, mode: "insensitive" } = { contains: fulltext ?? "", mode: "insensitive" };

    return await prisma.receipt.findMany({ 
        take: size,
        where: (fulltext && fulltext!=="") ? {
            OR: 
                [
                    { photo: { some: { text: match } } },
                    { title: match },
                    { note: match }
                ],
            AND: [
                { archive: archive }
            ]
        } : { archive: archive },
        include: {
            photo: true
        },
        orderBy: [{endOfWarranty: "asc"}]
    });
}

export async function createReceipt(receiptRequest: ReceiptRequest): Promise<Receipt> {
    return await prisma.receipt.create({
        data: {
            title: receiptRequest.title,
            note: receiptRequest.note,
            endOfWarranty: receiptRequest.endOfWarranty ?? undefined,
            purchaseDate: receiptRequest.purchaseDate ?? undefined
        },
        include: {photo: true}
    });
}

export async function getReceiptById(id: number): Promise<Receipt | null> {
    return await prisma.receipt.findUnique({where: {id}, include: {photo: true}});
}

export async function removeReceiptById(id: number): Promise<Receipt | null> {
    try {
        const receipt: Receipt | null = await getReceiptById(id);
        if (!receipt) throw Errors.NOT_EXISTS_ITEM;

        for (let photo of receipt.photo) {
            await removePhotoByObject(photo);
        }

        return await prisma.receipt.delete({where: {id}, include: {photo: true}});
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function updateReceipt(id: number, receiptRequest: ReceiptRequest): Promise<Receipt> {
    return await prisma.receipt.update({
        where: {id},
        data: {
            title: receiptRequest.title,
            note: receiptRequest.note,
            endOfWarranty: receiptRequest.endOfWarranty ?? undefined,
            purchaseDate: receiptRequest.purchaseDate ?? undefined,
            archive: !!receiptRequest.archive
        },
        include: {photo: true}
    })
}
