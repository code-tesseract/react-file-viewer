import {FC} from "react";

interface TitleWithDownloadProps {
    fileName: string;
    handleDownload: () => void;
    disabled?: boolean;
    backgroundColor?: string;
    zoom?: boolean;
    onZoom?: (direction: "in" | "out") => void;
}

const downloadImg = "/assets/images/toolbarButton-download.svg";

const TitleWithDownload: FC<TitleWithDownloadProps> = ({
                                                           fileName,
                                                           handleDownload,
                                                           disabled = false,
                                                           backgroundColor = "#1e8e3edb",
                                                           zoom,
                                                           onZoom,
                                                       }) => {
    return (
        <div className="title" style={{backgroundColor}}>
            <span>{fileName}</span>
            {zoom && onZoom && (
                <div style={{display: "flex"}}>
                    <button className="toolbarButton zoomOut" onClick={() => onZoom("out")}></button>
                    <div className="splitToolbarButtonSeparator"></div>
                    <button className="toolbarButton zoomIn" onClick={() => onZoom("in")}></button>
                </div>
            )}
            <button
                className="download"
                title={"Download"}
                onClick={handleDownload}
                disabled={disabled}
            >
                <img src={downloadImg} alt="Download"/>
            </button>
        </div>
    );
};

export default TitleWithDownload;
