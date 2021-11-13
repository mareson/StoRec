import {FC} from "react";
import {Grid, styled} from "@mui/material";
import TextField from "./forms/fields/TextField";
import IconButton from "./IconButton";
import {Search} from "@mui/icons-material";

type Props = {};
const SearchField: FC<Props> = () => {
    return (
        <Wrapper container>
            <Grid item xs={11}>
                <TextField
                    props={{placeholder: "Hledejte mezi účtenkami"}}
                />
            </Grid>
            <Grid item xs={1}>
                <IconButton>
                    <Search />
                </IconButton>
            </Grid>
        </Wrapper>
    );
};
export default SearchField;

const Wrapper = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(1)
}));

