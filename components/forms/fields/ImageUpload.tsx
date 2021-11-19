import {FC} from "react";
import Button from "../../Button";
import {styled} from "@mui/material";
import {Photo} from "@mui/icons-material";
import {useField} from "formik";
import ImagePreview from "../ImagePreview";
import ImagesPreview from "../ImagesPreview";

type Props = {
    name?: string;
    change?: (name: string, val: any)=>void;
};
const ImageUpload: FC<Props> = ({name, change}) => {
    const [field, meta] = useField<File[]>(name ?? "");

    return (
        <>
            <label>
                <Input
                    accept="image/*"
                    type="file"
                    name={name}
                    multiple
                    onChange={(event)=>{
                        const files: File[] = Array.from(event.currentTarget.files);
                        change(name, [...field.value, ...files]);
                    }}
                />
                <Wrapper>
                    <Button component="span" startIcon={<Photo />}>
                        Nahrát
                    </Button>
                </Wrapper>
            </label>
            <ImagesPreview files={field.value} />
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
