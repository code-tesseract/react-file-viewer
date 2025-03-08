import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const ErrorLine = ({ showError = false, errorInfo, onShowError }) => {
    return (_jsxs("div", { className: "errorLine", style: { display: showError ? "flex" : "none" }, children: [_jsxs("em", { children: ["invalidFile", " ", errorInfo] }), _jsx("button", { onClick: () => onShowError(false), children: "close" })] }));
};
export default ErrorLine;
