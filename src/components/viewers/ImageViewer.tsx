import { useState, useEffect } from "react";

const ImageViewer: React.FC<{ file: File }> = ({ file }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const objectUrl = URL.createObjectURL(file);
        setImageUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    return (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Uploaded Preview"
                    style={{
                        maxWidth: "100%",
                        maxHeight: "600px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};

export default ImageViewer;
