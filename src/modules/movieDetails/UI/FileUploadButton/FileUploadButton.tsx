import React, {ChangeEvent, useRef} from 'react'
import UploadSvg from '../../../../assets/upload.svg'
import classes from './FileUploadButton.module.sass'
import Button from "../../../../ui/button/Button.tsx";

interface FileUploadButtonProps {
    label: string
    onFileSelect: (file: File) => void
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({label, onFileSelect}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current!.click()
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            onFileSelect(file)
        }
    }

    return (
        <>
            <Button className={classes.button} onClick={handleButtonClick}>
                <span>{label}</span>
                <UploadSvg />
            </Button>
            <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className={classes.input}
            />
        </>
    )
}

export default FileUploadButton
