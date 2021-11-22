import { LoadingButton } from "@mui/lab";
import React, {FC} from "react";
import Button from "./Button";
import {Dialog, DialogBasicProps} from './Dialog';

interface Props extends DialogBasicProps {
    removeCallback: ()=>void;
    loading?: boolean;
}
const RemoveDialog: FC<Props> = (props) => {
    return (
        <Dialog
            title="Mazání položky"
            contentText="Doopravdy si přejete smazat tuto položku?"
            color="error"
            actions={<>
                <LoadingButton 
                    variant="outlined"
                    color="error"
                    loading={props.loading}
                    onClick={props.removeCallback}
                >
                    Smazat
                </LoadingButton>
                <Button onClick={props.handleClose} color="error" autoFocus>
                    Zrušit
                </Button>
            </>}

            {...props}
        >

        </Dialog>
    );
};

export default RemoveDialog;
