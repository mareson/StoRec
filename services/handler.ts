import {NextApiRequest, NextApiResponse} from "next";
import {Errors, handleError} from "../props/errors";

type MethodFunction = (id: number, req: NextApiRequest, res: NextApiResponse)=>Promise<void>;
export async function handlerID(
    req: NextApiRequest,
    res: NextApiResponse,
    methods: {
        [key: string]: MethodFunction;
    }
) {
    const id = Number(req.query.id as string);
    if (isNaN(id)) return handleError(res, Errors.NOT_EXISTS_ITEM);

    const key: string = req.method?.toLowerCase() ?? "";
    if (!!methods[key]) {
        await methods[key](id, req, res);
        return;
    }

    handleError(res, Errors.UNSUPPORTED_METHOD);
}