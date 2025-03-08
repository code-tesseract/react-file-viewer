
const VideoViewer: React.FC<{ file: File }> = ({ file }) => {
    const videoUrl = URL.createObjectURL(file);

    return (
        <div style={{ textAlign: "center" }}>
            <h3>Video Preview</h3>
            <video
                controls
                width="80%"
                style={{ maxWidth: "800px", borderRadius: "10px" }}
            >
                <source src={videoUrl} type={file.type} />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoViewer;
