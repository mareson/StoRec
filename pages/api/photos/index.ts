import {NextApiRequest, NextApiResponse} from "next";
import {Errors, handleError} from "../../../props/errors";
import formidable, {Fields, Files, IncomingForm} from 'formidable';
import cloudinary from "../../../services/cloudinary";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import {getReceiptById, Receipt} from "../../../model/receipts";
import {createPhoto, Photo} from "../../../model/photos";
import {PhotoResponse} from "../../../props/apiResponses";
import vision from "@google-cloud/vision";
import { MAX_PHOTO_SIZE } from "../../../props/params";
import { isValidPhotoFormat } from "../../../props/validate";

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method?.toUpperCase()) {
        case "POST": await handlePOST(req, res); return;
    }

    handleError(res, Errors.UNSUPPORTED_METHOD);
}


/**
 * POST
 */
async function handlePOST(
    req: NextApiRequest,
    res: NextApiResponse<PhotoResponse>
) {
    const data: {fields: {receiptId?: number}, files: {file?: formidable.File}} = await new Promise((resolve, reject) => {
        const form = new IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            resolve({fields, files})
        })
    });

    const file: formidable.File | undefined = data.files.file;
    if (!file) {
        handleError(res, Errors.FILE_HAS_NOT_BEEN_SENT);
        return;
    }

    if (isValidPhotoFormat(file.mimetype)) {
        handleError(res, Errors.INVALID_PHOTO_FORMAT);
        return;
    }

    if (file.size>MAX_PHOTO_SIZE) {
        handleError(res, Errors.FILE_IS_TOO_LARGE);
        return;
    }

    if (!data.fields.receiptId || isNaN(Number(data.fields.receiptId))) {
        handleError(res, Errors.NOT_EXISTS_ITEM);
        return;
    }

    const receipt: Receipt | null = await getReceiptById(Number(data.fields.receiptId));
    if (!receipt) {
        handleError(res, Errors.NOT_EXISTS_ITEM);
        return;
    }

    try {
        const response: UploadApiResponse = await cloudinary.uploader.upload(file.filepath);

        let text: string | undefined | null = undefined;
        try {
            const client = new vision.ImageAnnotatorClient();
            const [result] = await client.textDetection(file.filepath);
            text = result.fullTextAnnotation?.text;
        } catch (e) {
            console.log(e);
        }

        const photo: Photo = await createPhoto(
            receipt.id,
            response.public_id,
            response.url,
            text ?? "",
            response.width,
            response.height
        );

        res.status(200).json(photo);

    } catch (e: UploadApiErrorResponse | unknown) {
        console.log(e);
        handleError(res, Errors.SOMETHING_WRONG_CLOUDINARY);
        return;
    }
}

