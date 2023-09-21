import React, { useState } from 'react';
import './App.css';
import { Tree, TreeNode } from 'react-organizational-chart';

function App() {

  const [selectedOption, setSelectedOption] = useState("");
  const [showStructure, setShowStructure] = useState(false);

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
    setShowStructure(true);
  }

  const renderTree = () => {
    if (selectedOption === "Associate Properties") {
      return (
        <Tree label={<div>Associate Properties</div>}>
          <TreeNode label={<div>Quality Investments</div>}>
            <TreeNode label={<div>Equitable Vehicle</div>}>
              <TreeNode label={<div>Platinum Investment</div>} />
              <TreeNode label={<div>Delux Investment</div>} />
            </TreeNode>
          </TreeNode>

          <TreeNode label={<div>Tangible Investments LLC1</div>}>
            <TreeNode label={<div>Platinum Investment</div>} />
            <TreeNode label={<div>Delux Investment</div>} />
          </TreeNode>

          <TreeNode label={<div>Tangible Investments LLC2</div>}>
            <TreeNode label={<div>Platinum Investment</div>} />
            <TreeNode label={<div>Delux Investment</div>} />
          </TreeNode>
        </Tree>
      );
    } else if (selectedOption === "Quality Investments") {
      return (
        <Tree label={<div>Quality Investments</div>}>
          <TreeNode label={<div>Equitable Vehicle</div>}>
            <TreeNode label={<div>Platinum Investment</div>} />
            <TreeNode label={<div>Delux Investment</div>} />
          </TreeNode>
        </Tree>
      );
    } else if (selectedOption === "Equitable Vehicle") {
      return (
        <Tree label={<div>Equitable Vehicle</div>}>
          <TreeNode label={<div>Platinum Investment</div>} />
          <TreeNode label={<div>Delux Investment</div>} />
        </Tree>
      );
    } else if (selectedOption === "Tangible Investments LLC1") {
      return (
        <Tree label={<div>Tangible Investments LLC1</div>}>
          <TreeNode label={<div>Platinum Investment</div>} />
          <TreeNode label={<div>Delux Investment</div>} />
        </Tree>
      );
    } else if (selectedOption === "Tangible Investments LLC2") {
      return (
        <Tree label={<div>Tangible Investments LLC2</div>}>
          <TreeNode label={<div>Platinum Investment</div>} />
          <TreeNode label={<div>Delux Investment</div>} />
        </Tree>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="App">
      <div className='dropdown-menu'>
        <select onChange={handleDropdownChange}>
          <option value="">Select the Option</option>
          <option value="Associate Properties">Associate Properties</option>
          <option value="Quality Investments">Quality Investments</option>
          <option value="Equitable Vehicle">Equitable Vehicle</option>
          <option value="Tangible Investments LLC1">Tangible Investments LLC1</option>
          <option value="Tangible Investments LLC2">Tangible Investments LLC2</option>
        </select>
      </div>
      {showStructure && renderTree()}
    </div>
  );
}

export default App;










//FROM API incomplete


// import React, { useState, useEffect } from 'react';
// import './App.css';
// import { Tree, TreeNode } from 'react-organizational-chart';

// function App() {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [showStructure, setShowStructure] = useState(true);
//   const [options, setOptions] = useState([]);
//   const [orgChartData, setOrgChartData] = useState([]);

//   useEffect(() => {
//     fetch('./fakeApi.json')
//       .then(response => response.json())
//       .then(data => {
//         setOptions(Object.keys(data));
//         //console.log(data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedOption) {
//       fetch(`./fakeApi.json`)
//         .then(response => response.json())
//         .then(data => {
//           setOrgChartData(data[selectedOption]);
//           console.log('Org Chart Data:', data[selectedOption]);
//         })
//         .catch(error => {
//           console.error('Error fetching org chart data:', error);
//         });
//     }
//   }, [selectedOption]);

//   const handleDropdownChange = (e) => {
//     const selectedValue = e.target.value;
//     setSelectedOption(selectedValue);
//     setShowStructure(true);
//     console.log('Selected Option:', selectedValue);
//   };

//   const renderTree = () => {
//     if (orgChartData.length > 0) {
//       //console.log('Rendering Org Chart:', orgChartData);
//       return (
//         <Tree label={<div>{selectedOption}</div>}>
//           {orgChartData.map((node, index) => (
//             <TreeNode key={index} label={<div>{node.label}</div>}>
//               {node.children &&
//                 node.children.map((child, childIndex) => (
//                   <TreeNode key={childIndex} label={<div>{child.label}</div>} />
//                 ))}
//             </TreeNode>
//           ))}
//         </Tree>
//       );
//     } else {
//       return null;
//     }
//   };
//   //console.log(options);

//   return (
//     <div className="App">
//       <div className='dropdown-menu'>
//         <select onChange={handleDropdownChange}>
//           <option value="">Select the Option</option>
//           {options.map((option,index) => (
//             <option key={index} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </div>
//       {showStructure && renderTree()}
//     </div>
//   );
// }

// export default App;






























































































//FROM API COMPLETE


// import React, { useState, useEffect } from 'react';
// import './App.css';
// import { Tree, TreeNode } from 'react-organizational-chart';

// function App() {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [showStructure, setShowStructure] = useState(false);
//   const [options, setOptions] = useState([]);
//   const [orgChartData, setOrgChartData] = useState([]);

//   useEffect(() => {
//     fetch('./fakeApi.json')
//       .then(response => response.json())
//       .then(data => {
//         setOptions(Object.keys(data));
//         //console.log(data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedOption) {
//       fetch(`./fakeApi.json`)
//         .then(response => response.json())
//         .then(data => {
//           setOrgChartData(data[selectedOption]);
//           console.log('Org Chart Data:', data[selectedOption]);
//           setShowStructure(true);
//         })
//         .catch(error => {
//           console.error('Error fetching org chart data:', error);
//         });
//     }
//   }, [selectedOption]);

//   const handleDropdownChange = (e) => {
//     const selectedValue = e.target.value;
//     setSelectedOption(selectedValue);
//   };

//   const renderTree = () => {
//     if (orgChartData) {
//       return (
//         <Tree label={<div>{selectedOption}</div>}>
//           {Object.keys(orgChartData).map((key, index) => (
//             <TreeNode key={index} label={<div>{key}</div>}>
//               {Object.keys(orgChartData[key]).map((subKey, subIndex) => (
//                 <TreeNode key={subIndex} label={<div>{subKey}</div>} />
//               ))}
//             </TreeNode>
//           ))}
//         </Tree>
//       );
//     } else {
//       return null;
//     }
//   };
//   //console.log(options);

//   return (
//     <div className="App">
//       <div className='dropdown-menu'>
//         <select onChange={handleDropdownChange}>
//           <option value="">Select the Option</option>
//           {options.map((option,index) => (
//             <option key={index} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </div>
//       {showStructure && renderTree()}
//     </div>
//   );
// }

// export default App;