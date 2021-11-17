import {NextApiResponse} from "next";
import {ErrorResponse} from "./apiResponses";

type ErrorType = ErrorResponse & {status: number};

enum ErrorName {
    ValidationError = "ValidationError",
    NotFoundError = "NotFoundError"
}

enum ErrorsEnum {
    NOT_EXISTS_ITEM="NOT_EXISTS_ITEM",
    UNSUPPORTED_METHOD="UNSUPPORTED_METHOD"
}

export const Errors: {
    [key in ErrorsEnum]: ErrorType
} = {
    [ErrorsEnum.NOT_EXISTS_ITEM]: {
        name: ErrorName.ValidationError,
        message: "Item does not exists",
        status: 404
    },
    [ErrorsEnum.UNSUPPORTED_METHOD]: {
        name: ErrorName.NotFoundError,
        message: "Unsupported method",
        status: 405
    }
}

export function handleError(
    res: NextApiResponse,
    error: ErrorType
) {
    res = res as NextApiResponse<ErrorResponse>;
    res.status(error.status).json(error);
}