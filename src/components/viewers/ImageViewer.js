import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const ImageViewer = ({ file }) => {
    const [imageUrl, setImageUrl] = useState(null);
    useEffect(() => {
        const objectUrl = URL.createObjectURL(file);
        setImageUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);
    return (_jsx("div", { style: { textAlign: "center", marginTop: "10px" }, children: imageUrl ? (_jsx("img", { src: imageUrl, alt: "Uploaded Preview", style: {
                maxWidth: "100%",
                maxHeight: "600px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            } })) : (_jsx("p", { children: "Loading image..." })) }));
};
export default ImageViewer;
