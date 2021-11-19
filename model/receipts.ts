import { Prisma, receipt as PrismaReceipt, photo as PrismaPhoto } from "@prisma/client";
import prisma from "./prisma";
import {ReceiptRequest} from "../props/apiRequests";


export type Receipt = (PrismaReceipt & {photo: PrismaPhoto[]});


export async function getAllReceipts(): Promise<Receipt[]> {
    return await prisma.receipt.findMany({
        include: {photo: true},
        orderBy: [{createdAt: "desc"}]
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
            purchaseDate: receiptRequest.purchaseDate ?? undefined
        },
        include: {photo: true}
    })
}
