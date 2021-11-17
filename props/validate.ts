import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {Asserts} from "yup";


export function validate(
    schema: Asserts<any>,
    handler: NextApiHandler
) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (['POST', 'PUT'].includes(req.method ?? "")) {
            try {
                req.body = await schema
                    .camelCase()
                    .validate(req.body, { abortEarly: false, stripUnknown: true });
            } catch (error) {
                return res.status(400).json(error);
            }
        }
        await handler(req, res);
    };
}