import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const TextViewer = ({ file }) => {
    const [text, setText] = useState("");
    useEffect(() => {
        const reader = new FileReader();
        reader.onload = (event) => {
            setText(event.target?.result);
        };
        reader.readAsText(file);
    }, [file]);
    return (_jsxs("div", { style: { whiteSpace: "pre-wrap", padding: "10px", border: "1px solid #ccc" }, children: [_jsx("h3", { children: file.name }), _jsx("pre", { children: text })] }));
};
export default TextViewer;
