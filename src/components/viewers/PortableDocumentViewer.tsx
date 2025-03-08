import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;

const PortableDocumentViewer: React.FC<{ file: File }> = ({ file }) => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number | null>(null);

    useEffect(() => {
        const url = URL.createObjectURL(file);
        setPdfUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", width: "100%", height: "600px", overflowY: "auto" }}>
            <h3>{file.name}</h3>
            {pdfUrl ? (
                <Document
                    file={pdfUrl}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    onLoadError={(error) => console.error("Error loading PDF:", error)}
                >
                    {Array.from(new Array(numPages), (_, index) => (
                        <Page key={index} pageNumber={index + 1} width={800} />
                    ))}
                </Document>
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    );
};

export default PortableDocumentViewer;
