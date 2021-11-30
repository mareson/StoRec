import React, {FC, useState} from "react";
import Button from "../../Button";
import {styled, Typography} from "@mui/material";
import {Photo} from "@mui/icons-material";
import {useField} from "formik";
import ImagesPreview from "../ImagesPreview";
import { ALLOWED_MIME_TYPES, MAX_PHOTO_SIZE } from "../../../props/params";
import { isValidPhotoFormat } from "../../../props/validate";
import clsx from "clsx";

type Props = {
    name?: string;
    change?: (name: string, val: any)=>void;
};
const ImageUpload: FC<Props> = ({name, change}) => {
    const [field, meta] = useField<File[]>(name ?? "");
    const [dragOver, setDragOver] = useState<boolean>(false);

    const removeFile = (index: number) => {
        const files: File[] = field.value;
        if (change)
            change(field.name, files.filter((_, i)=>i!==index));
    };

    const handleDrop = (e: React.DragEvent<any>) => {
        e.preventDefault();
        const {items} = e.dataTransfer;
        const newFiles: File[] = [];

        for (let i=0; i<items.length; i++) {
            const item = items[i];
            const file: File | null = item.getAsFile();
            if (file && isValidPhotoFormat(file.type)) {
                newFiles.push(file);
            }
        }

        if (newFiles.length !== 0 && change) {
            change(field.name, [...field.value, ...newFiles]);
        }

        setDragOver(false);
    };

    const handleDragOver = (e: React.DragEvent<any>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<any>) => {
        e.preventDefault();
        setDragOver(false);
    };

    return (
        <>
            <label>
                <Input
                    accept={ALLOWED_MIME_TYPES.reduce((prev, curr)=>`${prev},${curr}`)}
                    type="file"
                    name={name}
                    multiple
                    onChange={(event)=>{
                        const files: File[] = Array.from(event.currentTarget.files ?? []);
                        if (change && name)
                            change(name, [...field.value, ...files]);
                    }}
                />
                <Wrapper onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className={clsx(dragOver && "dragOver")}>
                    <Button component="span" startIcon={<Photo />}>
                        Nahrát
                    </Button>
                </Wrapper>
            </label>
            <Typography fontStyle="italic" color="secondary.dark" textAlign="center">Maximální velikost fotky: {MAX_PHOTO_SIZE/(Math.pow(1024, 2))} MB</Typography>
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
    padding: theme.spacing(2),
    position: "relative",
    "&::after": {
        content: '"Pusťte soubory sem"',
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        justifyContent: "center",
        alignItems: "center",
        color: theme.palette.secondary.dark,
        display: "none"
    },
    "&.dragOver": {
        "& > span": {
            opacity: 0
        },
        "&::after": {
            display: "flex"
        }
    }
}));
