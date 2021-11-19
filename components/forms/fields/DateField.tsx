import {FC} from "react";
import DesktopDatePicker, {DesktopDatePickerProps} from '@mui/lab/DesktopDatePicker';
import {TextField} from "@mui/material";
import {useField} from "formik";

const DateField: FC<Partial<DesktopDatePickerProps> & {name?: string; change?: (name: string, val: any)=>void}> = (props) => {
    const [field, meta] = useField(props?.name ?? "");

    return (
        <DesktopDatePicker

            mask="__. __. ____"
            inputFormat="dd. MM. yyyy"

            {...field}
            {...props}

            onChange={(val)=>{
                if (props.change) props.change(field.name, val);
            }}

            renderInput={(params) => <TextField
                fullWidth
                size="small"

                {...params}
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
            />}
        />
    );
};
export default DateField;