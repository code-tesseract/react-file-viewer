import  {useState, useEffect} from "react";

const TextViewer: React.FC<{ file: File }> = ({file}) => {
    const [text, setText] = useState<string>("");

    useEffect(() => {
        const reader = new FileReader();
        reader.onload = (event) => {
            setText(event.target?.result as string);
        };
        reader.readAsText(file);
    }, [file]);

    return (
        <div style={{whiteSpace: "pre-wrap", padding: "10px", border: "1px solid #ccc"}}>
            <h3>{file.name}</h3>
            <pre>{text}</pre>
        </div>
    );
};

export default TextViewer;
