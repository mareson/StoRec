import axios, {AxiosError, AxiosResponse} from "axios";
import {useState} from "react";
import {OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar} from "notistack";
import {ErrorResponse} from "./apiResponses";
import {BasicMessages} from "./messages";

axios.defaults.baseURL = (process.env.PUBLIC_URL ?? "") + "/api";

export default function useRequest<T, P>(
    process: (params: P)=>Promise<AxiosResponse<T>>,
    errors?: {
        [code: string]: {
            [code: string]: BasicMessages
        }
    },
    disableAutoLoading?: boolean
): {
    run: (params: P)=>Promise<null | T>;
    loading: boolean;
    startLoading: ()=>void;
    stopLoading: ()=>void;
    enqueueSnackbar:  (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
} {
    const [loading, setLoading] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();

    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    const run = (params: P): Promise<null | T> => {
        if (!disableAutoLoading)
            startLoading();

        return new Promise<null | T>((resolve, reject)=>{
            process(params)
                .then((result)=>{
                    resolve(result.data);
                })
                .catch((e: AxiosError<ErrorResponse>)=>{

                    let message: BasicMessages = BasicMessages.SOMETHING_WENT_WRONG;
                    if (errors && e.response) {
                        if (errors[e.response.status]) {
                            const code = e.response.data.code ?? "default";
                            message = errors[e.response.status][code];
                        }
                    }

                    enqueueSnackbar(message, {variant: "error"});
                })
                .finally(()=>{
                    if (!disableAutoLoading)
                        stopLoading();
                })
        });
    };

    return {
        startLoading, stopLoading, loading, enqueueSnackbar,
        run
    };
}