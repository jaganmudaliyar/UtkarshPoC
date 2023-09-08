import React, { useState } from 'react';


// Recursive component to render folders and files
const TreeNode = ({ node, onAdd, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        {node.type === 'folder' ? (
          //<span onClick={handleToggle}>{isExpanded ? '📂' : '📁'}</span>
          <span onClick={handleToggle}>
            {isExpanded ? '📂' : (node.type === 'file' ? '📄' : '📁')}
          </span>) : (
          <span>📄</span>
        )}
        <span>{node.name}</span>
        <span style={{ paddingLeft: "10px" }}>
          <button onClick={() => onAdd(node)}><i class="fa fa-plus" aria-hidden="true"></i></button>
          <button onClick={() => onEdit(node)}><i class="fas fa-edit"></i></button>
          <button onClick={() => onDelete(node)}><i class="fa-solid fa-x"></i></button>
        </span>
      </div>
      {node.type === 'folder' && isExpanded && (
        <div style={{ marginLeft: '20px' }}>
          {node.children.map(childNode => (
            <TreeNode
              key={childNode.name}
              node={childNode}
              onAdd={onAdd}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FolderTree = () => {
  const [tree, setTree] = useState({
    name: 'Assosiate Properties',
    type: 'folder',
    children: [
      {
        name: 'Quality Investments',
        type: 'folder',
        children: [
          {
            name: 'Equitable Vehicle',
            type: 'folder',
            children: [
              {
                name: 'Platinum Investment'
              },

              {
                name: 'Delux Investment'
              }
            ],
          },
        ],
      },
      {
        name: 'Tangible Investments LLC1',
        type: 'folder',
        children: [
          {
            name: 'Platinum Investment'
          },
          {
            name: 'Delux Investment'
          }
        ],
      },
      {
        name: 'Tangible Investments LLC2',
        type: 'folder',
        children: [
          {
            name: 'Platinum Investment'
          },
          {
            name: 'Delux Investment'
          }
        ]
      }
    ],
  },
  );

  // const handleAdd = (parentNode) => {
  //   const newNode = { name: 'New Folder', type: 'folder', children: [] };

  //   if (parentNode.type === 'folder') {
  //     parentNode.children.push(newNode);
  //     setTree({ ...tree });
  //   }
  // };


  const handleAdd = (parentNode) => {
    const newNode = { name: 'New Folder', type: 'folder', children: [] };

    if (parentNode.type === 'folder') {
      if (parentNode.children.length === 0) {
        parentNode.children.push(newNode);
        setTree({ ...tree });
      } else {
        parentNode.children.push({
          name: 'New File',
          type: 'file'
        });
        setTree({ ...tree });
      }
    }
  };



  const handleDelete = nodeToDelete => {
    const deleteNode = (nodes) => {
      return nodes.filter(node => node !== nodeToDelete);
    };

    const traverseAndDelete = (currentNode) => {
      if (currentNode.children) {
        currentNode.children = deleteNode(currentNode.children);
        currentNode.children.forEach(traverseAndDelete);
      }
    };

    traverseAndDelete(tree);
    setTree({ ...tree });
  };

  const handleEdit = nodeToEdit => {
    const newName = prompt('Enter the new name:');
    if (newName) {
      nodeToEdit.name = newName;
      setTree({ ...tree });
    }
  };

  return (
    <div>
      <h1>Tree Folder Structure</h1>
      <TreeNode
        node={tree}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default FolderTree;




