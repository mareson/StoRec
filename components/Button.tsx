import {FC} from "react";

import MuiButton, {ButtonProps} from '@mui/material/Button';

type Props = {
    props?: ButtonProps;
};
const Button: FC<Props> = ({children, props}) => {

    return (
        <MuiButton
            variant="contained"

            {...props}
        >
            {children}
        </MuiButton>
    );
};
export default Button;