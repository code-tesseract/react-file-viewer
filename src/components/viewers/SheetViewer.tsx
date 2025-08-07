import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";

interface SheetViewerProps {
	file: File;
	width?: string | number;
	height?: string | number;
}

const SheetViewer: React.FC<{ file: File }> = ({file, width, height}: SheetViewerProps) => {
	const [data, setData] = useState<string[][]>([]);
	const [sheetNames, setSheetNames] = useState<string[]>([]);
	const [selectedSheet, setSelectedSheet] = useState<string>("");

	const readSheet = async (sheetName?: string) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			const arrayBuffer = event.target?.result as ArrayBuffer;
			const workbook = XLSX.read(arrayBuffer, {type: "array"});

			setSheetNames(workbook.SheetNames);

			const targetSheet = sheetName || workbook.SheetNames[0];
			setSelectedSheet(targetSheet);

			const sheet = workbook.Sheets[targetSheet];
			const sheetData: string[][] = XLSX.utils.sheet_to_json(sheet, {header: 1}) as string[][];

			setData(sheetData);
		};
		reader.readAsArrayBuffer(file);
	};

	useEffect(() => {
		readSheet();
	}, [file]);

	const handleSheetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newSheet = event.target.value;
		setSelectedSheet(newSheet);
		readSheet(newSheet);
	};

	return (
		<div className='pg-viewer-wrapper'
			 style={{width: width || '100%', height: height || 'calc(100vh - 45px)'}}>
			{sheetNames.length > 1 && (
				<div style={{marginBottom: "10px"}}>
					<label htmlFor="sheet-select">Select Sheet: </label>
					<select id="sheet-select" value={selectedSheet} onChange={handleSheetChange}>
						{sheetNames.map((name) => (
							<option key={name} value={name}>
								{name}
							</option>
						))}
					</select>
				</div>
			)}
			<HotTable
				data={data}
				colHeaders={true}
				rowHeaders={true}
				height="auto"
				width="100%"
				licenseKey="non-commercial-and-evaluation"
				stretchH="all"
			/>
		</div>
	);
};

export default SheetViewer;
