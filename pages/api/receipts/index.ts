import {NextApiRequest, NextApiResponse} from "next";
import {createReceipt, getAllReceipts, Receipt} from "../../../model/receipts";
import {validate} from "../../../props/validate";
import {ReceiptResponse} from "../../../props/apiResponses";
import {receiptRequestSchema} from "../../../props/apiRequests";
import {Errors, handleError} from "../../../props/errors";


async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method?.toUpperCase()) {
        case "GET": await handleGET(req, res); return;
        case "POST": await handlePOST(req, res); return;
    }

    handleError(res, Errors.UNSUPPORTED_METHOD);
}


/**
 * GET
 */
async function handleGET(
    req: NextApiRequest,
    res: NextApiResponse<ReceiptResponse[]>
) {
    const receipts: Receipt[] = await getAllReceipts();
    res.status(200).json(receipts);
}


/**
 * POST
 */
async function handlePOST(
    req: NextApiRequest,
    res: NextApiResponse<ReceiptResponse>
) {
    const receipt: Receipt = await createReceipt(req.body);
    res.status(201).json(receipt);
}

export default validate(receiptRequestSchema, handler);