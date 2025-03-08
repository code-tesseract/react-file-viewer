import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const VideoViewer = ({ file }) => {
    const videoUrl = URL.createObjectURL(file);
    return (_jsxs("div", { style: { textAlign: "center" }, children: [_jsx("h3", { children: "Video Preview" }), _jsxs("video", { controls: true, width: "80%", style: { maxWidth: "800px", borderRadius: "10px" }, children: [_jsx("source", { src: videoUrl, type: file.type }), "Your browser does not support the video tag."] })] }));
};
export default VideoViewer;
