# @tesseract/react-file-viewer

A React-based client-side file viewer supporting documents, spreadsheets, PDFs, images, text files, audio, and video.

## Features
- View Office documents (`.docx`, `.xlsx`)
- Display PDFs using `react-pdf`
- Render images (`.png`, `.jpg`, `.gif`, etc.)
- Play audio and video files
- Simple and lightweight
- Client-side only (no server required)

## Installation

```sh
npm install @tesseract/react-file-viewer
```

or

```sh
yarn add @tesseract/react-file-viewer
```

## Usage

```tsx
import React, { useState } from "react";
import SheetViewer from "@tesseract/react-client-file-viewer/components/viewers/SheetViewer";
import DocumentViewer from "@tesseract/react-client-file-viewer/components/viewers/DocumentViewer";
import ImageViewer from "@tesseract/react-client-file-viewer/components/viewers/ImageViewer";
import TextViewer from "@tesseract/react-client-file-viewer/components/viewers/TextViewer";
import PortableDocumentViewer from "@tesseract/react-client-file-viewer/components/viewers/PortableDocumentViewer";
import AudioViewer from "@tesseract/react-client-file-viewer/components/viewers/AudioViewer";
import VideoViewer from "@tesseract/react-client-file-viewer/components/viewers/VideoViewer";
import { FileTypeEnum } from "@tesseract/react-client-file-viewer/utils/enums/file-type.enum";
import { typeExtensions } from "@tesseract/react-client-file-viewer/utils/Helper";

const App: React.FC = () => {
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
        <div style={{ padding: "20px" }}>
            <h1>Document, Sheet & Image Viewer</h1>
            <input type="file" accept={fileExtensions} onChange={handleFileChange} />

            {file && fileType === FileTypeEnum.SHEET && <SheetViewer file={file} />}
            {file && fileType === FileTypeEnum.DOCUMENT && <DocumentViewer file={file} />}
            {file && fileType === FileTypeEnum.IMAGE && <ImageViewer file={file} />}
            {file && fileType === FileTypeEnum.TEXT && <TextViewer file={file} />}
            {file && fileType === FileTypeEnum.PORTABLE_DOCUMENT && <PortableDocumentViewer file={file} />}
            {file && fileType === FileTypeEnum.AUDIO && <AudioViewer file={file} />}
            {file && fileType === FileTypeEnum.VIDEO && <VideoViewer file={file} />}
        </div>
    );
};

export default App;
```

## Supported File Types

| File Type      | Extensions                     |
|---------------|--------------------------------|
| Documents     | `.docx`, `.txt`               |
| Spreadsheets  | `.xlsx`                        |
| PDFs          | `.pdf`                          |
| Images        | `.png`, `.jpg`, `.gif`, `.bmp` |
| Text          | `.txt`, `.csv`                 |
| Audio         | `.mp3`, `.wav`, `.ogg`         |
| Video         | `.mp4`, `.webm`, `.ogg`        |

## License

MIT License

## Contributing

This is trial version of document viewer.
Feel free to contribute by submitting issues or pull requests!

## Author

Tesseract Team
