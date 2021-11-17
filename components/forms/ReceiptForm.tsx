import {FC} from "react";
import { Formik, Form, Field } from 'formik';
import {receiptRequestSchema} from "../../props/apiRequests";
import TextField from "./fields/TextField";
import Button from "../Button";
import {Grid} from "@mui/material";
import {FORM_SPACING} from "../../props/theme";
import axios from "axios";

type Props = {};
const ReceiptForm: FC<Props> = () => {
    return (
        <Formik
            initialValues={{
                title: "",
                note: ""
            }}
            validationSchema={receiptRequestSchema}

            onSubmit={async (values)=>{
                await axios.post("/api/receipts", values);
            }}
        >
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
                    <Grid item xs={12}>
                        <Button props={{type: "submit"}}>Vytvořit</Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    );
};
export default ReceiptForm;