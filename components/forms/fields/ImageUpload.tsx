import {FC} from "react";
import Button from "../../Button";
import {styled, Typography} from "@mui/material";
import {Photo} from "@mui/icons-material";
import {useField} from "formik";
import ImagesPreview from "../ImagesPreview";
import { MAX_PHOTO_SIZE } from "../../../props/params";

type Props = {
    name?: string;
    change?: (name: string, val: any)=>void;
};
const ImageUpload: FC<Props> = ({name, change}) => {
    const [field, meta] = useField<File[]>(name ?? "");

    const removeFile = (index: number) => {
        const files: File[] = field.value;
        if (change)
            change(field.name, files.filter((_, i)=>i!==index));
    };

    return (
        <>
            <label>
                <Input
                    accept="image/*"
                    type="file"
                    name={name}
                    multiple
                    onChange={(event)=>{
                        const files: File[] = Array.from(event.currentTarget.files ?? []);
                        if (change && name)
                            change(name, [...field.value, ...files]);
                    }}
                />
                <Wrapper>
                    <Button component="span" startIcon={<Photo />}>
                        Nahrát
                    </Button>
                </Wrapper>
            </label>
            <Typography fontStyle="italic" color="secondary.dark" textAlign="center">Maximální velikost fotky: {MAX_PHOTO_SIZE/(1024^2)} MB</Typography>
            <ImagesPreview files={field.value} removeFile={removeFile} />
        </>
    );
};
export default ImageUpload;

const Input = styled('input')({
    display: 'none',
});

const Wrapper = styled("div")(({theme})=>({
    border: `2px dotted ${theme.palette.secondary.dark}`,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2)
}));
