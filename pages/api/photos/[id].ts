import {NextApiRequest, NextApiResponse} from "next";
import {PhotoResponse, ReceiptResponse} from "../../../props/apiResponses";
import {getReceiptById, Receipt, removeReceiptById, updateReceipt} from "../../../model/receipts";
import {validate} from "../../../props/validate";
import {photoRequestSchema, receiptRequestSchema} from "../../../props/apiRequests";
import {Errors, handleError} from "../../../props/errors";
import {getPhotoById, Photo, removePhotoByObject, updatePhoto} from "../../../model/photos";
import {handlerID} from "../../../services/handler";


/**
 * GET
 */
async function handleGET(
    id: number,
    req: NextApiRequest,
    res: NextApiResponse<PhotoResponse>
) {
    const photo: Photo | null = await getPhotoById(id);
    if (!photo) return handleError(res, Errors.NOT_EXISTS_ITEM);

    res.status(200).json(photo);
}


/**
 * DELETE
 */
async function handleDELETE(
    id: number,
    req: NextApiRequest,
    res: NextApiResponse<undefined>
) {
    const photo: Photo | null = await getPhotoById(id);
    if (!photo) return handleError(res, Errors.NOT_EXISTS_ITEM);

    await removePhotoByObject(photo);
    res.status(204).send(undefined);
}


/**
 * PUT
 */
async function handlePUT(
    id: number,
    req: NextApiRequest,
    res: NextApiResponse<PhotoResponse>
) {
    const photo: Photo | null = await updatePhoto(id, req.body);
    if (!photo) return handleError(res, Errors.NOT_EXISTS_ITEM);

    res.status(200).send(photo);
}

export default validate(photoRequestSchema,
    (req, res)=>handlerID(req, res, {
        get: handleGET, put: handlePUT, delete: handleDELETE
    })
);