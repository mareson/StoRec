import {FC} from "react";
import MuiTextField, {TextFieldProps} from '@mui/material/TextField';
import {useField} from "formik";


const TextField: FC<TextFieldProps> = (props) => {
    const [field, meta] = useField(props?.name ?? "");

    return (
        <MuiTextField
            size="small"
            fullWidth

            {...field}
            {...props}

            onChange={(e)=>{
                field.onChange(e);
                if (props.onChange) {
                    props.onChange(e);
                }
            }}

            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
        />
    );
};
export default TextField;