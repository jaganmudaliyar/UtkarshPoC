//without delete selected row functionality


import React, { useState, useEffect } from 'react';
import { DataType, Table } from 'ka-table';
import { EditingMode } from 'ka-table/enums';
import { SortingMode } from 'ka-table/enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Papa from 'papaparse';
import jsPDF from "jspdf";
import 'jspdf-autotable';

const TableEditing = () => {
  const [dataArr, setDataArr] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [selectedIdFilter, setSelectedIdFilter] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        const mappedData = data.map((item) => ({
          id: nextId + item.id,
          myuserid: item.userId,
          myid: item.id,
          mytitle: item.title,
          mybody: item.body,
          passed: Math.random() < 0.5,
          nextTry: new Date(),
        }));
        setDataArr(mappedData);
        setOriginalData(mappedData);
        setNextId(nextId + data.length);

        const uniqueIds = [...new Set(data.map((item) => item.id))];
        setDropdownOptions(uniqueIds);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleAddRow = () => {

    const newRow = 
    { 
      id: nextId + 1, 
      myuserid: 11, 
      myid: 101, 
      mytitle: "lorem ipsum", 
      mybody: "lorem ipsum 1", 
      passed: false, 
      nextTry: new Date(2024, 7, 5, 10) 
    };

    setDataArr([newRow, ...dataArr]);
    setNextId(nextId + 1);
  }

  const handleDeleteRow = () => {
    if (dataArr.length > 0) {
      const updatedData = dataArr.slice(0, -1); // Remove the last row
      setDataArr(updatedData);
    }
  }

  const handleColumnSort = (columnKey, direction) => {
    const sortedData = [...dataArr].sort((a, b) => {
      if (direction === 'asc') {
        return a[columnKey] < b[columnKey] ? -1 : 1;
      } else {
        return a[columnKey] > b[columnKey] ? -1 : 1;
      }
    });

    setDataArr(sortedData);
  };

  const handleExportToCSV = () => {
    const csvData = Papa.unparse(
      dataArr.map(item => ({
        id: item.id,
        myuserid: item.myuserid,
        myid: item.myid,
        mytitle: item.mytitle,
        mybody: item.mybody,
        passed: item.passed,
        nextTry: item.nextTry ? item.nextTry.toLocaleDateString() : '', // Format the date if it exists
      }))
    );
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'data.csv';

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportToPdf = () => {
    const doc = new jsPDF();
    doc.text("My Pdf Data", 10, 10);


    const columns = [
      { title: "User ID", datakey: "myuserid" },
      { title: "ID", datakey: "myid" },
      { title: "Title", datakey: "mytitle" },
      { title: "Body", datakey: "mybody" },
      { title: "Passed", datakey: "passed" },
      { title: "Next Try", datakey: "nextTry" },
    ];

    const data = dataArr.map((item) => (
      {
        myuserid: item.myuserid,
        myid: item.myid,
        mytitle: item.mytitle,
        mybody: item.mybody,
        passed: item.passed ? "Yes" : "No",
        nextTry: item.nextTry ? item.nextTry.toLocaleDateString(): "",
      }
      ));

      doc.autoTable({
        head: [columns.map((column) => column.title)],
        body: data.map((row) => columns.map((column) => row[column.datakey])),
      });

      doc.save("data.pdf");
  };

  const handleIdFilterClick = () => {
    const filteredData = originalData.filter((item) => {
      return item.myid === parseInt(selectedIdFilter, 10) || selectedIdFilter === "";
    });

    setDataArr(filteredData);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reset to the first page when changing rows per page
  };

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Slice the data array to display only the rows for the current page
  const paginatedData = dataArr.slice(startIndex, endIndex);

  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={handleAddRow}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      &nbsp;

      <button onClick={handleDeleteRow}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      &nbsp;

      <button onClick={handleExportToCSV}>
        Export to CSV
      </button>
      &nbsp;

      <button onClick={handleExportToPdf}>
        Export to PDF
      </button>

      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <select
            value={selectedIdFilter}
            onChange={(e) => setSelectedIdFilter(e.target.value)}
          >
            <option value="">Select ID</option>
            {dropdownOptions.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>

          <button onClick={handleIdFilterClick}>Filter</button>
        </div>
      </div>

      {/* Pagination controls */}
      <div style={{ marginBottom: '10px' }}>
        <span>Show: </span>
        <button onClick={() => handleRowsPerPageChange(5)}>5</button>
        &nbsp;
        <button onClick={() => handleRowsPerPageChange(10)}>10</button>
        &nbsp;
        <button onClick={() => handleRowsPerPageChange(15)}>15</button>
      </div>

      <Table
        columns={[
          { key: 'myuserid', title: 'User ID', dataType: DataType.Number, width: '10%' },
          { key: 'myid', title: 'ID', dataType: DataType.Number, width: '10%' },
          { key: 'mytitle', title: 'Title', dataType: DataType.String, width: '30%' },
          { key: 'mybody', title: 'Body', dataType: DataType.String, width: '30%' },
          { key: 'passed', title: 'Passed', dataType: DataType.Boolean, width: '10%' },
          { key: 'nextTry', title: 'Next Try', dataType: DataType.Date },
        ]}
        format={({ column, value }) => {
          if (column.dataType === DataType.Date) {
            return value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' });
          }
        }}
        data={paginatedData}
        editableCells={[
          {
            columnKey: '',
            rowKeyValue: 2,
          },
        ]}
        editingMode={EditingMode.Cell}
        rowKeyField={'id'}
        sortingMode={SortingMode.Single}
        sortDirection={"asc"}
        onColumnSort={handleColumnSort}
      />

      {/* Pagination controls */}
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        &nbsp;
        <span>Page {currentPage}</span>
        &nbsp;
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TableEditing;




















//PoC in progress


// import React, { useState, useEffect } from 'react';
// import { DataType, Table } from 'ka-table';
// import { EditingMode } from 'ka-table/enums';
// import { SortingMode } from 'ka-table/enums';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
// import Papa from 'papaparse';
// import jsPDF from "jspdf";
// import 'jspdf-autotable';

// const TableEditing = () => {
//   const [dataArr, setDataArr] = useState([]);
//   const [originalData, setOriginalData] = useState([]);
//   const [nextId, setNextId] = useState(0);
//   const [selectedIdFilter, setSelectedIdFilter] = useState("");
//   const [dropdownOptions, setDropdownOptions] = useState([]);

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//       .then((response) => response.json())
//       .then((data) => {
//         const mappedData = data.map((item) => ({
//           id: nextId + item.id,
//           myuserid: item.userId,
//           myid: item.id,
//           mytitle: item.title,
//           mybody: item.body,
//           passed: Math.random() < 0.5,
//           nextTry: new Date(),
//         }));
//         setDataArr(mappedData);
//         setOriginalData(mappedData);
//         setNextId(nextId + data.length);

//         const uniqueIds = [...new Set(data.map((item) => item.id))];
//         setDropdownOptions(uniqueIds);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const handleAddRow = () => {

//     const newRow =
//     {
//       id: nextId + 1,
//       myuserid: 11,
//       myid: 101,
//       mytitle: "lorem ipsum",
//       mybody: "lorem ipsum 1",
//       passed: false,
//       nextTry: new Date(2024, 7, 5, 10)
//     };

//     setDataArr([newRow, ...dataArr]);
//     setNextId(nextId + 1);
//   }

//   const handleDeleteRow = (rowId) => {
//     const updatedData = dataArr.filter((row) => row.id !== rowId);
//     setDataArr(updatedData);
//   }

//   const deleteColumn = {
//     key: 'delete',
//     title: 'Delete',
//     dataType: DataType.String,
//     width: '10%',
//     cellText: 'Delete',
//     cell: (props) => {
//       return (
//         <button onClick={() => handleDeleteRow(props.rowData.id)}>
//           Delete
//         </button>
//       );
//     },
//   };

//   const handleColumnSort = (columnKey, direction) => {
//     const sortedData = [...dataArr].sort((a, b) => {
//       if (direction === 'asc') {
//         return a[columnKey] < b[columnKey] ? -1 : 1;
//       } else {
//         return a[columnKey] > b[columnKey] ? -1 : 1;
//       }
//     });

//     setDataArr(sortedData);
//   };

//   const handleExportToCSV = () => {
//     const csvData = Papa.unparse(
//       dataArr.map(item => ({
//         id: item.id,
//         myuserid: item.myuserid,
//         myid: item.myid,
//         mytitle: item.mytitle,
//         mybody: item.mybody,
//         passed: item.passed,
//         nextTry: item.nextTry ? item.nextTry.toLocaleDateString() : '', // Format the date if it exists
//       }))
//     );
//     const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.style.display = 'none';
//     a.href = url;
//     a.download = 'data.csv';

//     document.body.appendChild(a);
//     a.click();

//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const handleExportToPdf = () => {
//     const doc = new jsPDF();
//     doc.text("My Pdf Data", 10, 10);


//     const columns = [
//       { title: "User ID", datakey: "myuserid" },
//       { title: "ID", datakey: "myid" },
//       { title: "Title", datakey: "mytitle" },
//       { title: "Body", datakey: "mybody" },
//       { title: "Passed", datakey: "passed" },
//       { title: "Next Try", datakey: "nextTry" },
//     ];

//     const data = dataArr.map((item) => (
//       {
//         myuserid: item.myuserid,
//         myid: item.myid,
//         mytitle: item.mytitle,
//         mybody: item.mybody,
//         passed: item.passed ? "Yes" : "No",
//         nextTry: item.nextTry ? item.nextTry.toLocaleDateString() : "",
//       }
//     ));

//     doc.autoTable({
//       head: [columns.map((column) => column.title)],
//       body: data.map((row) => columns.map((column) => row[column.datakey])),
//     });

//     doc.save("data.pdf");
//   };

//   const handleIdFilterClick = () => {
//     const filteredData = originalData.filter((item) => {
//       return item.myid === parseInt(selectedIdFilter, 10) || selectedIdFilter === "";
//     });

//     setDataArr(filteredData);
//   }

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <button onClick={handleAddRow}>
//         <FontAwesomeIcon icon={faPlus} />
//       </button>
//       &nbsp;

//       <button onClick={handleDeleteRow}>
//         <FontAwesomeIcon icon={faTrash} />
//       </button>
//       &nbsp;

//       <button onClick={handleExportToCSV}>
//         Export to CSV
//       </button>
//       &nbsp;

//       <button onClick={handleExportToPdf}>
//         Export to PDF
//       </button>

//       <div style={{ textAlign: 'center' }}>
//         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//           <select
//             value={selectedIdFilter}
//             onChange={(e) => setSelectedIdFilter(e.target.value)}
//           >
//             <option value="">Select ID</option>
//             {dropdownOptions.map((id) => (
//               <option key={id} value={id}>
//                 {id}
//               </option>
//             ))}
//           </select>

//           <button onClick={handleIdFilterClick}>Filter</button>
//         </div>
//       </div>

//       <Table
//         columns={[
//           { key: 'myuserid', title: 'User ID', dataType: DataType.Number, width: '10%' },
//           { key: 'myid', title: 'ID', dataType: DataType.Number, width: '10%' },
//           { key: 'mytitle', title: 'Title', dataType: DataType.String, width: '30%' },
//           { key: 'mybody', title: 'Body', dataType: DataType.String, width: '30%' },
//           { key: 'passed', title: 'Passed', dataType: DataType.Boolean, width: '10%' },
//           { key: 'nextTry', title: 'Next Try', dataType: DataType.Date },
//           deleteColumn,
//         ]}
//         format={({ column, value }) => {
//           if (column.dataType === DataType.Date) {
//             return value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' });
//           }
//         }}
//         data={dataArr}
//         editableCells={[
//           {
//             columnKey: '',
//             rowKeyValue: 2,
//           },
//         ]}
//         editingMode={EditingMode.Cell}
//         rowKeyField={'id'}
//         sortingMode={SortingMode.Single}
//         sortDirection={"asc"}
//         onColumnSort={handleColumnSort}
//       />
//     </div>
//   );
// };

// export default TableEditing;





