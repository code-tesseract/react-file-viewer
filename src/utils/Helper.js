import { FileTypeEnum } from "./enums/file-type.enum";
export const ALL_FILE_TYPES = [
    "xlsx",
    "docx",
    "pptx",
    "pdf",
    "xls",
    "doc",
    "ppt",
    "file2003",
    "file2007",
    "other",
];
const fileTypeMap = {
    "application/pdf": "pdf",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.ms-powerpoint": "ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
};
const fileTypeMapReverse = {
    pdf: "application/pdf",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    default: "text/plain",
};
export const typeExtensions = {
    [FileTypeEnum.DOCUMENT]: ["docx"],
    [FileTypeEnum.SHEET]: ["xls", "xlsx"],
    [FileTypeEnum.IMAGE]: ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"],
    [FileTypeEnum.TEXT]: ["txt"],
    [FileTypeEnum.PORTABLE_DOCUMENT]: ["pdf", "pdfx"],
    [FileTypeEnum.AUDIO]: ["mp3", "wav", "ogg", "aac", "flac"],
    [FileTypeEnum.VIDEO]: ["mp4", "webm", "ogg"],
};
// PDF专用方法
export async function getBlobUrl(url, pdfDocument) {
    if (url.startsWith("blob:")) {
        return url;
    }
    const uint8ArrayData = await pdfDocument.getData();
    const blob = new Blob([uint8ArrayData], { type: "application/pdf" });
    return getObjectUrl(blob);
}
export function getBlobUrlFromBuffer(arrayBuffer, fileType) {
    const type = fileTypeMapReverse[fileType] || fileTypeMapReverse["default"];
    const blob = new Blob([arrayBuffer], { type });
    return getObjectUrl(blob);
}
export function getObjectUrl(file) {
    if (window.URL && window.URL.createObjectURL) {
        return window.URL.createObjectURL(file);
    }
    if (window.webkitURL && window.webkitURL.createObjectURL) {
        return window.webkitURL.createObjectURL(file);
    }
    throw new Error("Your browser does not support Object URLs.");
}
/**
 * 文件下载方法
 * @param blobUrl - 需要下载的文件的URL
 * @param fileName - 文件名
 * @param ext - 文件后缀
 */
export function download(blobUrl, fileName, ext = "txt") {
    const a = document.createElement("a");
    const _fileName = fileName || new Date().toLocaleDateString() + `.${ext}`;
    a.href = blobUrl;
    a.target = "_parent";
    if ("download" in a) {
        a.download = _fileName;
    }
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
/**
 * 根据文件名获取文件类型
 * @param fileName - 文件名
 * @returns 文件类型
 */
export function getFileTypeFromFileName(fileName) {
    const ext = fileName.split(".").pop()?.toLowerCase() || "other";
    return ALL_FILE_TYPES.includes(ext) ? ext : "other";
}
/**
 * 根据MIME类型获取文件类型
 * @param type - MIME类型
 * @returns 文件类型
 */
export function getFileTypeFromUploadType(type) {
    return fileTypeMap[type] || "other";
}
