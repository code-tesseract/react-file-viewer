import {FC, useState} from "react";
import SheetViewer from "./components/viewers/SheetViewer";
import DocumentViewer from "./components/viewers/DocumentViewer";
import ImageViewer from "./components/viewers/ImageViewer";
import TextViewer from "./components/viewers/TextViewer";
import PortableDocumentViewer from "./components/viewers/PortableDocumentViewer";
import AudioViewer from "./components/viewers/AudioViewer";
import {FileTypeEnum} from "./utils/enums/file-type.enum";
import {typeExtensions} from "./utils/Helper";
import VideoViewer from "./components/viewers/VideoViewer";

const App: FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileType, setFileType] = useState<FileTypeEnum | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            const extension = selectedFile.name.split('.').pop()?.toLowerCase();

            let detectedType: FileTypeEnum | null = null;
            for (const [type, extensions] of Object.entries(typeExtensions)) {
                if (extensions.includes(extension!)) {
                    detectedType = type as FileTypeEnum;
                    break;
                }
            }

            if (detectedType) {
                setFile(selectedFile);
                setFileType(detectedType);
            } else {
                alert("Unsupported file type.");
                setFile(null);
                setFileType(null);
            }
        }
    };

    const fileExtensions = Object.values(typeExtensions).flat().map(ext => `.${ext}`).join(",");

    return (
        <div style={{padding: "20px"}}>
            <h1>Document, Sheet & Image Viewer</h1>
            <input type="file" accept={fileExtensions} onChange={handleFileChange}/>

            {file && fileType === FileTypeEnum.SHEET && <SheetViewer file={file}/>}
            {file && fileType === FileTypeEnum.DOCUMENT && <DocumentViewer file={file}/>}
            {file && fileType === FileTypeEnum.IMAGE && <ImageViewer file={file}/>}
            {file && fileType === FileTypeEnum.TEXT && <TextViewer file={file}/>}
            {file && fileType === FileTypeEnum.PORTABLE_DOCUMENT && <PortableDocumentViewer file={file}/>}
            {file && fileType === FileTypeEnum.AUDIO && <AudioViewer file={file}/>}
            {file && fileType === FileTypeEnum.VIDEO && <VideoViewer file={file}/>}

        </div>
    );
};

export default App;
