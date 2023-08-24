import FolderTree, { testData } from "react-folder-tree";
import "react-folder-tree/dist/style.css";
import "./App.css";

export default function App() {
  const onTreeStructureChange = (state, event) => console.log(state, event);

  const treeStructure = {
    name: "Associate Properties",
    checked: 0.5,
    isOpen: true,
    children: [
      {
        name: "Quality Investments",
        checked: 0,
        isOpen: true,
        children: [
          {
            name: "Equitable Vehicle",
            checked: 0,
            isOpen: true,
            children: [
              {
                name: "Platinum Investment",
                checked: 0
              },
              {
                name: "Delux Investment",
                checked: 1
              }
            ]
          }
        ]
      },
      {
        name: "Tangible Investments LLC1",
        checked: 0.5,
        isOpen: false,
        children: [
          { name: "Platinum Investment", checked: 0 },
          { name: "Delux Investment", checked: 1 }
        ]
      },
      {
        name: "Tangible Investments LLC2",
        checked: 0.5,
        isOpen: false,
        children: [
          { name: "Platinum Investment", checked: 0 },
          { name: "Delux Investment", checked: 1 }
        ]
      }
    ]
  };

  const folderIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-folder2-open"
      viewBox="0 0 16 16"
    >
      <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z" />
    </svg>
  );

  const editIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-folder2-open"
      viewBox="0 0 16 16"
    >
      <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z" />
    </svg>
  );

  console.log(testData);

  return (
    <div className="App">
      <FolderTree
        data={treeStructure}
        onChange={onTreeStructureChange}
        showCheckbox={false}
        iconComponents={{ folderIcon: folderIcon, editIcon: editIcon }}
      />
    </div>
  );
}