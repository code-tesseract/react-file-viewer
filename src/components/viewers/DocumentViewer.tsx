import {useEffect, useState} from 'react';
import * as mammoth from 'mammoth';
import Loading from "../page/Loading";
import ErrorLine from "../page/ErrorLine";
import TitleWithDownload from "../page/TitleWithDownload";
import {download, getBlobUrlFromBuffer, getFileTypeFromUploadType} from "../../utils/Helper";

interface DocxViewerProps {
    file: string | File;
    fileName?: string;
    width?: string | number;
    height?: string | number;
}

const DocumentViewer: React.FC<DocxViewerProps> = ({file, fileName: outFileName, width, height}) => {
    const [docHtmlStr, setDocHtmlStr] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);
    const [errorInfo] = useState<string>('Invalid document format');
    const [scale, setScale] = useState<number>(1);
    const [fileArrayBuffer, setFileArrayBuffer] = useState<ArrayBuffer | null>(null);
    const [showLoading, setShowLoading] = useState<boolean>(false);

    useEffect(() => {
        if (outFileName) {
            setFileName(outFileName);
        }
    }, [outFileName]);

    useEffect(() => {
        if (file) {
            setShowLoading(true);
            if (typeof file === 'string') {
                fetch(file)
                    .then(response => response.arrayBuffer())
                    .then(arrayBuffer => {
                        setFileArrayBuffer(arrayBuffer);
                        loadContent(arrayBuffer);
                    })
                    .catch(() => {
                        setShowError(true);
                        setShowLoading(false);
                    });
            } else if (file instanceof File) {
                const fileType = getFileTypeFromUploadType(file.type);
                if (fileType !== 'docx') {
                    setShowError(true);
                    setShowLoading(false);
                    return;
                }
                const reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = (e) => {
                    if (e.target?.result instanceof ArrayBuffer) {
                        setFileName(file.name);
                        setFileArrayBuffer(e.target.result);
                        loadContent(e.target.result);
                    }
                };
            } else {
                setShowError(true);
                setShowLoading(false);
            }
        }
    }, [file]);

    const loadContent = async (arrayBuffer: ArrayBuffer) => {
        setShowLoading(true);
        try {
            const {value} = await mammoth.convertToHtml({arrayBuffer});
            const div = document.createElement('div');
            div.innerHTML = value;
            Array.from(div.getElementsByTagName('a')).forEach(link => link.setAttribute('target', '_blank'));
            setDocHtmlStr(div.innerHTML);
        } catch {
            setShowError(true);
        } finally {
            setShowLoading(false);
        }
    };

    const handleDownload = () => {
        if (fileArrayBuffer) {
            const fileUrl = getBlobUrlFromBuffer(fileArrayBuffer, 'docx');
            download(fileUrl, fileName, 'docx');
        }
    };

    const onZoom = (direction: 'in' | 'out') => {
        setScale(prevScale => {
            const newScale = direction === 'in' ? Math.min(prevScale + 0.1, 1) : Math.max(prevScale - 0.1, 0.3);
            return parseFloat(newScale.toFixed(1));
        });
    };

    return (
        <div className='pg-viewer-wrapper'
             style={{width: width || '100%', height: height || 'calc(100vh - 45px)'}}>
            <Loading showLoading={showLoading}/>
            <ErrorLine errorInfo={errorInfo} showError={showError} onShowError={setShowError}/>
            <TitleWithDownload
                backgroundColor='rgba(35,100,155,0.9)'
                handleDownload={handleDownload}
                fileName={fileName}
                disabled={!fileArrayBuffer}
                onZoom={onZoom}
                zoom={true}
            />
            <div
                className={'document-container'}
                style={{width: `${scale * 100}%`, height: '85%', overflow: 'auto'}}
                dangerouslySetInnerHTML={{__html: docHtmlStr}}
            />
        </div>
    );
};

export default DocumentViewer;
