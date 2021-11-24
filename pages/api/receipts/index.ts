import {NextApiRequest, NextApiResponse} from "next";
import {createReceipt, getAllReceipts, Receipt} from "../../../model/receipts";
import {validate} from "../../../props/validate";
import {ListResponse, ReceiptResponse} from "../../../props/apiResponses";
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
    res: NextApiResponse<ListResponse<ReceiptResponse>>
) {
    const fulltext = req.query.fulltext as string | undefined;
    const tmpSize = req.query.size as string | undefined;
    const archive = req.query.archive as string | undefined;
    if (isNaN(Number(tmpSize))) {
        handleError(res, Errors.SIZE_MUST_BE_NUMBER);
        return;
    }
    const size: number = Number(tmpSize);

    const receipts: Receipt[] = await getAllReceipts(size, fulltext, !!archive);

    res.status(200).json({
        data: receipts,
        pagination: {size: receipts.length}
    });
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