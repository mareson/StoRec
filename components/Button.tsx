import {FC} from "react";

import MuiButton, {ButtonProps} from '@mui/material/Button';

const Button: FC<ButtonProps> = (props) => {

    return (
        <MuiButton
            variant="contained"

            {...props}
        >
            {props.children}
        </MuiButton>
    );
};
export default Button;