import {FC} from "react";
import {Grid, styled} from "@mui/material";
import TextField from "./fields/TextField";
import IconButton from "../IconButton";
import {Search} from "@mui/icons-material";
import {Form, Formik} from "formik";

type Props = {};
const SearchForm: FC<Props> = () => {
    return (
        <Formik
            initialValues={{
                fulltext: ""
            }}

            onSubmit={(values)=>{
                alert("ano");
            }}
        >
            <Form>
                <Wrapper container>
                    <Grid item xs={11}>
                        <TextField
                            placeholder="Hledejte mezi účtenkami"
                            name="fulltext"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton props={{type: "submit"}}>
                            <Search />
                        </IconButton>
                    </Grid>
                </Wrapper>
            </Form>
        </Formik>
    );
};
export default SearchForm;

const Wrapper = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1)
}));