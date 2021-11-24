import React, {FC, useContext, useRef} from "react";
import {Chip, Grid, Stack, styled, useTheme} from "@mui/material";
import TextField from "./fields/TextField";
import IconButton from "../IconButton";
import {Search} from "@mui/icons-material";
import {Form, Formik, FormikErrors} from "formik";
import { ReceiptsListContext } from "../ReceiptsList";
import { useDebounce } from "../../props/helpers";
import clsx from "clsx";

type FormValues = {
    fulltext: string,
    archive: boolean
};

type Props = {};
const SearchForm: FC<Props> = () => {
    const receiptsList = useContext(ReceiptsListContext);
    const debounce = useDebounce();

    const initValues: FormValues = {
        fulltext: "",
        archive: false
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
                ({submitForm, values: {archive}, setFieldValue})=>{
                    const changeArchive = () => {
                        setFieldValue("archive", !archive);
                        submitForm();
                    };

                    return (
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
                                <Grid item xs={12}>
                                    <Chips direction="row" spacing={0.5}>
                                        <StyledChip
                                            variant={archive ? "filled" : "outlined"}
                                            label="Archivované"
                                            color={archive ? "primary" : undefined}
                                            className={clsx(!archive && "inactive")}
                                            onClick={changeArchive}
                                            onDelete={!archive ? undefined : changeArchive}
                                        />
                                    </Chips>
                                </Grid>
                            </Wrapper>
                        </Form>
                    );
                }
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

const Chips = styled(Stack)(({theme}) => ({
    marginTop: theme.spacing(0.5)
}));

const StyledChip = styled(Chip)(({theme}) => ({
    "&.inactive": {
        color: theme.palette.secondary.dark
    }
}));
