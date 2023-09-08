//FETCHING FILTERED ROW NO. FROM MULTIPLE SHEETS


// import React, { useState } from 'react';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import { Tabs, Tab } from 'react-bootstrap';
// import * as XLSX from 'xlsx';
// import "./App.css";

// function ReadExcel() {
//   const [sheets, setSheets] = useState([]);
//   const [selectedRow, setSelectedRow] = useState(""); // State to store selected row number
//   const [selectedTab, setSelectedTab] = useState(0);
//   const [showResult, setShowResult] = useState(false);
//   const [fileUploaded, setFileUploaded] = useState(false);

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = async (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const sheetNames = workbook.SheetNames;

//       const sheetsData = sheetNames.map((sheetName) => {
//         const worksheet = workbook.Sheets[sheetName];
//         const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//         return {
//           sheetName,
//           sheetData
//         };
//       });
//       setSheets(sheetsData);
//       setShowResult(false);
//       setFileUploaded(true);
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   const handleShowRowClick = () => {
//     setShowResult(true);
//   }

//   const handleRowInputChange = (event) => {
//     setShowResult(false);
//     setSelectedRow(event.target.value);
//   }

//   const displaySelectedRow = (tabIndex) => {
//     if(sheets[tabIndex] && showResult) {
//       return (
//         <Tabs
//         id="sheets-tabs"
//         activeKey={selectedTab}
//         onSelect={(key) => setSelectedTab(key)}>
//         {sheets.map((sheet, tabIndex) => (
//           <Tab eventKey={tabIndex} title={`${tabIndex}: ${sheet.sheetName}`} key={tabIndex}>
//             <div>
//               <table>
//                 <thead>
//                   <tr>
//                     {sheets[tabIndex].sheetData[0].map((header, index) => (
//                       <th key={index}>{header}</th>
//                     ))}
//                   </tr>
//                 </thead>

//                 <tbody>
//                   <tr>
//                     {sheets[tabIndex].sheetData[selectedRow] &&
//                       sheets[tabIndex].sheetData[selectedRow].map((cell, cellIndex) => (
//                         <td key={cellIndex}>{cell}</td>
//                       ))}
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </Tab>
//         ))}
//       </Tabs>
//       )
//     }
//   };

//   return (
//     <div>
//       <div style={{marginBottom: "20px"}}>
//       {!fileUploaded && ( // Only show input and button if no file is uploaded
//           <div>
//             <input type="file" onChange={handleFileUpload} />
//           </div>
//         )}
//        {fileUploaded && ( // Only show input and button if a file is uploaded
//           <div>
//             <input
//               type='number'
//               placeholder="Enter Row Number"
//               value={selectedRow}
//               onChange={handleRowInputChange}
//             />
//             <button onClick={handleShowRowClick}>Show Row</button>
//           </div>
//         )}

//       <div className='row'>

//       <div className='col-md-6'>
//       {displaySelectedRow(selectedTab)}
//       </div>

//       <div className='col-md-6'>
//       <Tabs 
//         transition={false} 
//         id="noanim-tab-example"
//         className="mb-3">
//           {
//           sheets.map((sheet, tabIndex) => (
//             <Tab key={tabIndex} eventKey={sheet.sheetName} title={`${tabIndex}: ${sheet.sheetName}`}>
//               <div style={{ overflow: "auto", maxHeight: "400px", maxWidth: "400px" }}>
//                 <table>
//                   <thead>
//                     <tr>
//                       {sheet.sheetData[0].map((header, index) => (
//                         <th key={index}>{header}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                    {sheet.sheetData.slice(1).map((row, rowIndex) => (
//                      <tr key={rowIndex}>
//                       <td>{rowIndex + 1}</td>
//                       {row.map((cell, cellIndex) => (
//                          <td key={cellIndex}>{cell}</td>
//                       ))}
//                      </tr>
//                   ))}
//                 </tbody>
//                 </table>
//               </div>
//             </Tab>
//           ))}
//         </Tabs>
//       </div>
//       </div>
//       </div>
//     </div>
//   );
// }

// export default ReadExcel;








//FINAL ONE


import React, { useState } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Tab } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import "./App.css";

function ReadExcel() {
    const [sheets, setSheets] = useState([]);
    const [selectedSheetData, setSelectedSheetData] = useState([]);
    const [filterRowNumber, setFilterRowNumber] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [fileUploaded, setFileUploaded] = useState(false);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetNames = workbook.SheetNames;

            const sheetsData = sheetNames.map((sheetName) => {
                const worksheet = workbook.Sheets[sheetName];
                const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                return {
                    sheetName,
                    sheetData
                };
            });

            setSheets(sheetsData);
            if (sheetsData.length > 0) {
                setSelectedSheetData(sheetsData[0].sheetData);
            }
            setFileUploaded(true);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleTabChange = (sheetName) => {
        const selectedSheet = sheets.find(sheet => sheet.sheetName === sheetName);
        setSelectedSheetData(selectedSheet.sheetData);

        setFilteredData([]);
        setFilterRowNumber([]);
    };

    const handleFilterButtonClick = () => {
        if (filterRowNumber.trim() === '') {
            setFilteredData([]);
        } else {
            const rowNumber = parseInt(filterRowNumber);
            if (!isNaN(rowNumber) && rowNumber >= 1 && rowNumber <= selectedSheetData.length) {
                const filteredRow = selectedSheetData[rowNumber - 1];
                setFilteredData(filteredRow);
            } else {
                setFilteredData([]);
                alert('Invalid row number. Please enter a valid row number.');
            }
        }
    };

    return (
        <div>
            <div>
                <input type="file" onChange={handleFileUpload} />
                <br />
                {fileUploaded && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter row number"
                            value={filterRowNumber}
                            onChange={(e) => setFilterRowNumber(e.target.value)}
                        />
                        <button onClick={handleFilterButtonClick}>Fetch Data</button>
                    </>
                )
                }
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 2 }}>
                    <div style={{ overflow: "auto", maxHeight: "400px", maxWidth: "400px", marginTop: "50px" }}>
                        <table>
                            <tbody>
                                {filteredData.map((cell, cellIndex) => (
                                    <tr key={cellIndex}>
                                        <td style={{ padding: '15px', fontSize: '20px' }}>{cell}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <Tabs
                        transition={false}
                        id="noanim-tab-example"
                        className="mb-3"
                        onSelect={handleTabChange}
                    >
                        {sheets.map((sheet, index) => (
                            <Tab key={index} eventKey={sheet.sheetName} title={sheet.sheetName}>
                                <div style={{ overflow: "auto", maxHeight: "400px", maxWidth: "400px" }}>
                                    <table>
                                        <tbody>
                                            {sheet.sheetData.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    <td>{rowIndex + 1}</td>
                                                    {row.map((cell, cellIndex) => (
                                                        <td key={cellIndex}>{cell}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Tab>
                        ))}
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default ReadExcel;
