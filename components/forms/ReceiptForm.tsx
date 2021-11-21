import React, {FC, useContext} from "react";
import {Formik, Form, FormikProps} from 'formik';
import {ReceiptRequest, receiptRequestSchema} from "../../props/apiRequests";
import TextField from "./fields/TextField";
import {Grid} from "@mui/material";
import {FORM_SPACING} from "../../props/theme";
import {PhotoResponse, ReceiptResponse} from "../../props/apiResponses";
import useRequest from "../../props/requests";
import {ReceiptRequestParams, saveReceiptRequest} from "../../services/receiptRequest";
import {ReceiptsListContext} from "../ReceiptsList";
import DateField from "./fields/DateField";
import {BasicMessages} from "../../props/messages";
import {
    createPhotoRequest,
    CreatePhotoRequestParams,
    savePhotoRequest,
    SavePhotoRequestParams
} from "../../services/photoRequest";
import {useSnackbar} from "notistack";
import {passParams} from "../../props/helpers";
import ReceiptFormPhoto from "./ReceiptFormPhoto";
import ImageUpload from "./fields/ImageUpload";
import { LoadingButton } from "@mui/lab";

type Props = {
    afterSave?: (receipt: ReceiptResponse)=>void;
    receipt?: ReceiptResponse;
};

type FormValues = {
    title: string;
    note: string;
    purchaseDate: Date;
    endOfWarranty: Date;
    files: File[];
    photo: PhotoResponse[];
};

const ReceiptForm: FC<Props> = ({afterSave, receipt}) => {
    const receiptList = useContext(ReceiptsListContext);
    const saveReceipt = useRequest<ReceiptResponse, ReceiptRequestParams>(saveReceiptRequest, undefined, true);
    const createPhoto = useRequest<PhotoResponse, CreatePhotoRequestParams>(createPhotoRequest);
    const savePhoto = useRequest<PhotoResponse, SavePhotoRequestParams>(savePhotoRequest);
    const { enqueueSnackbar } = useSnackbar();

    const initValues: FormValues = {
        title: receipt?.title ?? "",
        note: receipt?.note ?? "",
        purchaseDate: receipt?.purchaseDate ? new Date(receipt?.purchaseDate) : new Date(),
        endOfWarranty: receipt?.endOfWarranty ? new Date(receipt?.endOfWarranty) : new Date(),
        files: [],
        photo: receipt?.photo ?? []
    };

    return (
        <Formik
            initialValues={initValues}
            validationSchema={receiptRequestSchema}

            onSubmit={async (values, formikHelpers)=>{
                saveReceipt.startLoading();
                let receiptResponse: ReceiptResponse | null = await saveReceipt.run({
                    receiptRequest: ({...values, files: undefined}) as ReceiptRequest,
                    id: receipt?.id ?? undefined
                });
                if (receiptResponse) {
                    for (let file of values.files) {
                        const photoResponse: PhotoResponse | null = await createPhoto.run({
                            photo: file,
                            receiptId: receiptResponse.id
                        });

                        if (!photoResponse) {
                            enqueueSnackbar(passParams(BasicMessages.PHOTO_FAILED_TO_SAVE, {
                                name: file.name
                            }));
                        } else receiptResponse.photo.push(photoResponse);
                    }

                    for (let i=0; i<values.photo.length; i++) {
                        let photo = values.photo[i];
                        const photoResponse: PhotoResponse | null = await savePhoto.run({
                            id: photo.id,
                            request: {
                                caption: photo.caption ?? "",
                                text: photo.text ?? "",
                                receiptId: receiptResponse.id
                            }
                        });

                        if (!photoResponse) {
                            enqueueSnackbar(passParams(BasicMessages.PHOTO_INFO_FAILED_TO_SAVE, {
                                caption: photo.caption ?? `Foto ${i+1}`,
                            }));
                        } else {
                            for (let j=0; j<receiptResponse.photo.length; j++) {
                                if (receiptResponse.photo[j].id === photoResponse.id) {
                                    receiptResponse.photo[j] = photoResponse;
                                }
                            }
                        }
                    }

                    formikHelpers.setValues({
                        ...receiptResponse,
                        note: receiptResponse.note ?? "",
                        purchaseDate: receiptResponse.purchaseDate ?? new Date(),
                        endOfWarranty: receiptResponse.endOfWarranty ?? new Date(),
                        files: [],
                        photo: receiptResponse.photo ?? []
                    });
                    if (afterSave) afterSave(receiptResponse);

                    saveReceipt.enqueueSnackbar(BasicMessages.SAVED, {variant: "success"});
                    receiptList.updateRequests();
                    saveReceipt.stopLoading();
                }
            }}
        >
            {
                ({setFieldValue, values}: FormikProps<FormValues>)=>
                    <Form>
                        <Grid container spacing={FORM_SPACING} mt={1}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Nadpis"
                                    name="title"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Poznámka"
                                    name="note"
                                    rows={3}
                                    multiline
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DateField
                                    label="Datum nákupu"
                                    name="purchaseDate"
                                    change={(name, val: Date | null)=>{
                                        setFieldValue(name, val);
                                        if (val && !isNaN(val.getTime()))
                                            setFieldValue("endOfWarranty",
                                                new Date(val.getFullYear()+2, val.getMonth(), val.getDate())
                                            )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DateField
                                    label="Konec záruky"
                                    name="endOfWarranty"
                                    change={setFieldValue}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ImageUpload
                                    name="files"
                                    change={setFieldValue}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            {
                                (values.photo).map((photo, i)=>
                                    <ReceiptFormPhoto
                                        key={photo.id}
                                        photo={photo}
                                        index={i}
                                    />
                                )
                            }
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton // External file jams typescript validator
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    loading={saveReceipt.loading}
                                >
                                    {
                                        !!receipt ? "Uložit" : "Vytvořit"
                                    }
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Form>
            }
        </Formik>
    );
};
export default ReceiptForm;