import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;
const PortableDocumentViewer = ({ file }) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [numPages, setNumPages] = useState(null);
    useEffect(() => {
        const url = URL.createObjectURL(file);
        setPdfUrl(url);
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);
    return (_jsxs("div", { style: { border: "1px solid #ccc", padding: "10px", width: "100%", height: "600px", overflowY: "auto" }, children: [_jsx("h3", { children: file.name }), pdfUrl ? (_jsx(Document, { file: pdfUrl, onLoadSuccess: ({ numPages }) => setNumPages(numPages), onLoadError: (error) => console.error("Error loading PDF:", error), children: Array.from(new Array(numPages), (_, index) => (_jsx(Page, { pageNumber: index + 1, width: 800 }, index))) })) : (_jsx("p", { children: "Loading PDF..." }))] }));
};
export default PortableDocumentViewer;
