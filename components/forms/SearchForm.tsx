import {FC, useContext, useRef} from "react";
import {Grid, styled} from "@mui/material";
import TextField from "./fields/TextField";
import IconButton from "../IconButton";
import {Search} from "@mui/icons-material";
import {Form, Formik, FormikErrors} from "formik";
import { ReceiptsListContext } from "../ReceiptsList";
import { useDebounce } from "../../props/helpers";

type FormValues = {
    fulltext: string
};

type Props = {};
const SearchForm: FC<Props> = () => {
    const receiptsList = useContext(ReceiptsListContext);
    const debounce = useDebounce();

    const initValues: FormValues = {
        fulltext: ""
    };

    return (
        <Formik
            initialValues={initValues}

            validate={(values)=>{
                const errors: FormikErrors<FormValues> = {};
                
                if (values.fulltext!=="" && values.fulltext.length < 3) {
                    errors.fulltext = "Pro vyhledávání zadejte alespoň 3 znaky";
                }

                return errors;
            }}

            onSubmit={(values)=>{
                receiptsList.search(values);
            }}
        >
            {
                ({submitForm})=>
                    <Form>
                        <Wrapper container>
                            <Grid item xs={11}>
                                <TextField
                                    placeholder="Hledejte mezi účtenkami"
                                    name="fulltext"
                                    onChange={()=>debounce.process(submitForm)}
                                />
                            </Grid>
                            <ButtonWrapper item xs={1}>
                                <IconButton type="submit">
                                    <Search />
                                </IconButton>
                            </ButtonWrapper>
                        </Wrapper>
                    </Form>
            }
        </Formik>
    );
};
export default SearchForm;

const Wrapper = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1)
}));

const ButtonWrapper = styled(Grid)(({theme}) => ({
    display: "flex",
    justifyContent: "center"
}));