import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import SheetViewer from "./components/viewers/SheetViewer";
import DocumentViewer from "./components/viewers/DocumentViewer";
import ImageViewer from "./components/viewers/ImageViewer";
import TextViewer from "./components/viewers/TextViewer";
import PortableDocumentViewer from "./components/viewers/PortableDocumentViewer";
import AudioViewer from "./components/viewers/AudioViewer";
import { FileTypeEnum } from "./utils/enums/file-type.enum";
import { typeExtensions } from "./utils/Helper";
import VideoViewer from "./components/viewers/VideoViewer";
const App = () => {
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState(null);
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            const extension = selectedFile.name.split('.').pop()?.toLowerCase();
            let detectedType = null;
            for (const [type, extensions] of Object.entries(typeExtensions)) {
                if (extensions.includes(extension)) {
                    detectedType = type;
                    break;
                }
            }
            if (detectedType) {
                setFile(selectedFile);
                setFileType(detectedType);
            }
            else {
                alert("Unsupported file type.");
                setFile(null);
                setFileType(null);
            }
        }
    };
    const fileExtensions = Object.values(typeExtensions).flat().map(ext => `.${ext}`).join(",");
    return (_jsxs("div", { style: { padding: "20px" }, children: [_jsx("h1", { children: "Document, Sheet & Image Viewer" }), _jsx("input", { type: "file", accept: fileExtensions, onChange: handleFileChange }), file && fileType === FileTypeEnum.SHEET && _jsx(SheetViewer, { file: file }), file && fileType === FileTypeEnum.DOCUMENT && _jsx(DocumentViewer, { file: file }), file && fileType === FileTypeEnum.IMAGE && _jsx(ImageViewer, { file: file }), file && fileType === FileTypeEnum.TEXT && _jsx(TextViewer, { file: file }), file && fileType === FileTypeEnum.PORTABLE_DOCUMENT && _jsx(PortableDocumentViewer, { file: file }), file && fileType === FileTypeEnum.AUDIO && _jsx(AudioViewer, { file: file }), file && fileType === FileTypeEnum.VIDEO && _jsx(VideoViewer, { file: file })] }));
};
export default App;
