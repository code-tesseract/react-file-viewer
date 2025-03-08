import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const downloadImg = "/assets/images/toolbarButton-download.svg";
const TitleWithDownload = ({ fileName, handleDownload, disabled = false, backgroundColor = "#1e8e3edb", zoom, onZoom, }) => {
    return (_jsxs("div", { className: "title", style: { backgroundColor }, children: [_jsx("span", { children: fileName }), zoom && onZoom && (_jsxs("div", { style: { display: "flex" }, children: [_jsx("button", { className: "toolbarButton zoomOut", onClick: () => onZoom("out") }), _jsx("div", { className: "splitToolbarButtonSeparator" }), _jsx("button", { className: "toolbarButton zoomIn", onClick: () => onZoom("in") })] })), _jsx("button", { className: "download", title: "Download", onClick: handleDownload, disabled: disabled, children: _jsx("img", { src: downloadImg, alt: "Download" }) })] }));
};
export default TitleWithDownload;
