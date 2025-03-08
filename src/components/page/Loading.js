import { jsx as _jsx } from "react/jsx-runtime";
const loadingImg = "/assets/images/loading-icon.gif";
const Loading = ({ showLoading = false }) => {
    return (_jsx("div", { className: "loadingPage", style: { display: showLoading ? "block" : "none" }, children: _jsx("div", { className: "loading", children: _jsx("img", { src: loadingImg, alt: "Loading..." }) }) }));
};
export default Loading;
