import {NextApiResponse} from "next";
import {ErrorResponse} from "./apiResponses";
import { BasicMessages } from "./messages";

type ErrorType = ErrorResponse & {status: number};

enum ErrorName {
    ValidationError = "ValidationError",
    NotFoundError = "NotFoundError",
    CloudinaryError = "CloudinaryError"
}

enum ErrorsEnum {
    NOT_EXISTS_ITEM="NOT_EXISTS_ITEM",
    UNSUPPORTED_METHOD="UNSUPPORTED_METHOD",
    FILE_HAS_NOT_BEEN_SENT="FILE_HAS_NOT_BEEN_SENT",
    FILE_IS_TOO_LARGE="FILE_IS_TOO_LARGE",
    SOMETHING_WRONG_CLOUDINARY="SOMETHING_WRONG_CLOUDINARY",
    INVALID_PHOTO_FORMAT="INVALID_PHOTO_FORMAT",
    SIZE_MUST_BE_NUMBER="SIZE_MUST_BE_NUMBER"
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
    },
    [ErrorsEnum.FILE_HAS_NOT_BEEN_SENT]: {
        name: ErrorName.ValidationError,
        message: "The required file has not been sent",
        status: 400
    },
    [ErrorsEnum.FILE_IS_TOO_LARGE]: {
        name: ErrorName.ValidationError,
        message: "The attached file is too large",
        status: 400
    },
    [ErrorsEnum.SOMETHING_WRONG_CLOUDINARY]: {
        name: ErrorName.CloudinaryError,
        message: "Something is wrong with cloudinary",
        status: 500
    },
    [ErrorsEnum.INVALID_PHOTO_FORMAT]: {
        name: ErrorName.ValidationError,
        message: BasicMessages.PHOTO_INVALID_FORMAT,
        status: 400
    },
    [ErrorsEnum.SIZE_MUST_BE_NUMBER]: {
        name: ErrorName.ValidationError,
        message: "Size param must be number",
        status: 400
    }
}

export function handleError(
    res: NextApiResponse,
    error: ErrorType
) {
    res = res as NextApiResponse<ErrorResponse>;
    res.status(error.status).json(error);
}