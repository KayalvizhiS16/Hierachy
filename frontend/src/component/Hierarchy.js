import React, { useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';

const Hierarchy = () => {
 
  

  const [selectedLayer, setSelectedLayer] = useState('');

  const handleLayerSelect = (layer) => {
    setSelectedLayer(layer);
  };

  const renderTree = () => {
    switch (selectedLayer) {
      case 'Manager':
        return (
          <Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={<StyledNode>HR Manager</StyledNode>}
            
          >
            
            <TreeNode  label={<StyledNode>Manager</StyledNode>} >
           
    </TreeNode>

    {/* Your Manager structure */}
          </Tree>
        );
        case 'Team Lead':
          return (
            
            <Tree
              lineWidth={'2px'}
              lineColor={'green'}
              lineBorderRadius={'10px'}
              label={<StyledNode>Manager</StyledNode>}
            >
              <TreeNode label={<StyledNode>Team Lead 1</StyledNode>}>
              
              </TreeNode>
              
              <TreeNode label={<StyledNode>Team Lead 2</StyledNode>}>
              
              </TreeNode>
            </Tree>
          );

      case 'Developer':
        return (
          
          <Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={<StyledNode>Manager</StyledNode>}
          >
            <TreeNode  label={<StyledNode>Team Lead 1</StyledNode>}>
            <TreeNode label={<StyledNode>Developer 1</StyledNode>} />
            <TreeNode label={<StyledNode>Developer 2</StyledNode>} />
            <TreeNode label={<StyledNode>Developer 3</StyledNode>} />
            </TreeNode>
            
            <TreeNode label={<StyledNode>Team Lead 2</StyledNode>}>
            <TreeNode label={<StyledNode>Developer 4</StyledNode>} />
            <TreeNode label={<StyledNode>Developer 5</StyledNode>} />
            <TreeNode label={<StyledNode>Developer 6</StyledNode>} />
            </TreeNode>
          </Tree>
        );
      // Add cases for other layers as needed

      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <label className='text-purple-600 ' >Select Layer:</label>
        <select value={selectedLayer} onChange={(e) => handleLayerSelect(e.target.value)}>
          <option value="">Select Layer</option>
          <option value="Manager">Manager</option>
          <option value="Team Lead">Team Lead</option>
          <option value="Developer">Developer </option>
          {/* Add options for other layers as needed */}
        </select>
      </div>
      {renderTree()}
     
    </div>
  );
  
};

const StyledNode = styled.div`
  padding: 40px;
  border-radius: 8px;
  display: inline-block;
  border: 2px solid red;
  background-size: cover;
  background-position: center;

   /* Set text color to white or a contrasting color */
`;


export default Hierarchy;
