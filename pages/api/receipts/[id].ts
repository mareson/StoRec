import {NextApiRequest, NextApiResponse} from "next";
import {ReceiptResponse} from "../../../props/apiResponses";
import {getReceiptById, Receipt, removeReceiptById, updateReceipt} from "../../../model/receipts";
import {validate} from "../../../props/validate";
import {receiptRequestSchema} from "../../../props/apiRequests";
import {Errors, handleError} from "../../../props/errors";
import {handlerID} from "../../../services/handler";


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

export default validate(receiptRequestSchema, (req, res)=>
    handlerID(req, res, {
        get: handleGET, put: handlePUT, delete: handleDELETE
    })
);