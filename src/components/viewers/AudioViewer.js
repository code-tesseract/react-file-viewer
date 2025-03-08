import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const AudioViewer = ({ file }) => {
    const [audioUrl, setAudioUrl] = useState(null);
    useEffect(() => {
        const url = URL.createObjectURL(file);
        setAudioUrl(url);
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);
    return (_jsxs("div", { style: { textAlign: "center", padding: "10px" }, children: [_jsx("h3", { children: file.name }), audioUrl ? (_jsxs("audio", { controls: true, children: [_jsx("source", { src: audioUrl, type: file.type }), "Your browser does not support the audio element."] })) : (_jsx("p", { children: "Loading audio..." }))] }));
};
export default AudioViewer;
