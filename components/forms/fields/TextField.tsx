import {FC} from "react";
import MuiTextField, {TextFieldProps} from '@mui/material/TextField';

type Props = {
    props?: TextFieldProps;
};
const TextField: FC<Props> = ({props}) => {
    return (
        <MuiTextField
            size="small"
            fullWidth

            {...props}
        />
    );
};
export default TextField;