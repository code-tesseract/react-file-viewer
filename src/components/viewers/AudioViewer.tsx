import {useState, useEffect} from "react";

const AudioViewer: React.FC<{ file: File }> = ({file}) => {
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    useEffect(() => {
        const url = URL.createObjectURL(file);
        setAudioUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    return (
        <div style={{textAlign: "center", padding: "10px"}}>
            <h3>{file.name}</h3>
            {audioUrl ? (
                <audio controls>
                    <source src={audioUrl} type={file.type}/>
                    Your browser does not support the audio element.
                </audio>
            ) : (
                <p>Loading audio...</p>
            )}
        </div>
    );
};

export default AudioViewer;
