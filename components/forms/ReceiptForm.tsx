import {FC, useContext} from "react";
import {Formik, Form} from 'formik';
import {ReceiptRequest, receiptRequestSchema} from "../../props/apiRequests";
import TextField from "./fields/TextField";
import Button from "../Button";
import {Grid} from "@mui/material";
import {FORM_SPACING} from "../../props/theme";
import axios from "axios";
import LoadingButton from "../LoadingButton";
import {ReceiptResponse} from "../../props/apiResponses";
import useRequest from "../../props/requests";
import {ReceiptRequestParams, saveReceiptRequest} from "../../services/receiptRequest";
import {ReceiptsListContext} from "../ReceiptsList";
import DateField from "./fields/DateField";
import {BasicMessages} from "../../props/messages";
import ImageUpload from "./fields/ImageUpload";

type Props = {
    afterSave?: ()=>void;
    receipt?: ReceiptResponse;
};
const ReceiptForm: FC<Props> = ({afterSave, receipt}) => {
    const receiptList = useContext(ReceiptsListContext);
    const saveReceipt = useRequest<ReceiptResponse, ReceiptRequestParams>(saveReceiptRequest);

    return (
        <Formik
            initialValues={{
                title: receipt?.title ?? "",
                note: receipt?.note ?? "",
                purchaseDate: new Date(receipt?.purchaseDate ?? ""),
                endOfWarranty: new Date(receipt?.endOfWarranty ?? ""),
                photos: []
            }}
            validationSchema={receiptRequestSchema}

            onSubmit={async (values, formikHelpers)=>{
                const receiptResponse: ReceiptResponse | null = await saveReceipt.run({
                    receiptRequest: values as ReceiptRequest,
                    id: receipt?.id ?? undefined
                });
                if (receiptResponse) {
                    formikHelpers.setValues({
                        ...receiptResponse,
                        note: receiptResponse.note ?? "",
                        purchaseDate: receiptResponse.purchaseDate ?? new Date(),
                        endOfWarranty: receiptResponse.endOfWarranty ?? new Date(),
                        photos: undefined
                    });
                    if (afterSave) afterSave();
                    saveReceipt.enqueueSnackbar(BasicMessages.SAVED, {variant: "success"});
                    receiptList.updateRequests();
                }
            }}
        >
            {
                (values)=>
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
                                    change={(name, val: Date)=>{
                                        values.setFieldValue(name, val);
                                        values.setFieldValue("endOfWarranty",
                                            new Date(val.getFullYear()+2, val.getMonth(), val.getDate())
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DateField
                                    label="Konec záruky"
                                    name="endOfWarranty"
                                    change={values.setFieldValue}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ImageUpload
                                    name="photos"
                                    change={values.setFieldValue}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton
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