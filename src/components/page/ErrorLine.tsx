import {FC} from "react";

interface ErrorLineProps {
    showError?: boolean;
    errorInfo?: string;
    onShowError: (show: boolean) => void;
}

const ErrorLine: FC<ErrorLineProps> = ({ showError = false, errorInfo, onShowError }) => {
    return (
        <div className="errorLine" style={{ display: showError ? "flex" : "none" }}>
            <em>{"invalidFile"} {errorInfo}</em>
            <button onClick={() => onShowError(false)}>{"close"}</button>
        </div>
    );
};

export default ErrorLine;
