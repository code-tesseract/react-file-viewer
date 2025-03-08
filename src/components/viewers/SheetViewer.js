import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
const SheetViewer = ({ file }) => {
    const [data, setData] = useState([]);
    const [sheetNames, setSheetNames] = useState([]);
    const [selectedSheet, setSelectedSheet] = useState("");
    const readSheet = async (sheetName) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target?.result;
            const workbook = XLSX.read(arrayBuffer, { type: "array" });
            setSheetNames(workbook.SheetNames);
            const targetSheet = sheetName || workbook.SheetNames[0];
            setSelectedSheet(targetSheet);
            const sheet = workbook.Sheets[targetSheet];
            const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            setData(sheetData);
        };
        reader.readAsArrayBuffer(file);
    };
    useEffect(() => {
        readSheet();
    }, [file]);
    const handleSheetChange = (event) => {
        const newSheet = event.target.value;
        setSelectedSheet(newSheet);
        readSheet(newSheet);
    };
    return (_jsxs("div", { children: [sheetNames.length > 1 && (_jsxs("div", { style: { marginBottom: "10px" }, children: [_jsx("label", { htmlFor: "sheet-select", children: "Select Sheet: " }), _jsx("select", { id: "sheet-select", value: selectedSheet, onChange: handleSheetChange, children: sheetNames.map((name) => (_jsx("option", { value: name, children: name }, name))) })] })), _jsx(HotTable, { data: data, colHeaders: true, rowHeaders: true, height: "auto", width: "100%", licenseKey: "non-commercial-and-evaluation", stretchH: "all" })] }));
};
export default SheetViewer;
