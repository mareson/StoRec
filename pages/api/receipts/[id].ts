import {NextApiRequest, NextApiResponse} from "next";
import {ReceiptResponse} from "../../../props/apiResponses";
import {getReceiptById, Receipt, removeReceiptById, updateReceipt} from "../../../model/receipts";
import {validate} from "../../../props/validate";
import {receiptRequestSchema} from "../../../props/apiRequests";
import {Errors, handleError} from "../../../props/errors";


async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let {id} = req.query;
    const receiptId = Number(id as string);
    if (isNaN(receiptId)) return handleError(res, Errors.NOT_EXISTS_ITEM);

    switch (req.method) {
        case "GET": await handleGET(receiptId, req, res); return;
        case "DELETE": await handleDELETE(receiptId, req, res); return;
        case "PUT": await handlePUT(receiptId, req, res); return;
    }

    handleError(res, Errors.UNSUPPORTED_METHOD);
}


/**
 * GET
 */
async function handleGET(
    id: number,
    req: NextApiRequest,
    res: NextApiResponse<ReceiptResponse>
) {
    const receipt: Receipt | null = await getReceiptById(id);
    if (!receipt) return handleError(res, Errors.NOT_EXISTS_ITEM);

    res.status(200).json(receipt);
}


/**
 * DELETE
 */
async function handleDELETE(
    id: number,
    req: NextApiRequest,
    res: NextApiResponse<undefined>
) {
    const receipt: Receipt | null = await removeReceiptById(id);
    if (!receipt) return handleError(res, Errors.NOT_EXISTS_ITEM);

    res.status(204).send(undefined);
}


/**
 * PUT
 */
async function handlePUT(
    id: number,
    req: NextApiRequest,
    res: NextApiResponse<ReceiptResponse>
) {
    const receipt: Receipt | null = await updateReceipt(id, req.body);
    if (!receipt) return handleError(res, Errors.NOT_EXISTS_ITEM);

    res.status(200).send(receipt);
}

export default validate(receiptRequestSchema, handler);