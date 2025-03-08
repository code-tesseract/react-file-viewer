import {FC} from "react";

interface LoadingProps {
    showLoading?: boolean;
}

const loadingImg = "/assets/images/loading-icon.gif";

const Loading: FC<LoadingProps> = ({showLoading = false}) => {
    return (
        <div className="loadingPage" style={{display: showLoading ? "block" : "none"}}>
            <div className="loading">
                <img src={loadingImg} alt="Loading..."/>
            </div>
        </div>
    );
};

export default Loading;
