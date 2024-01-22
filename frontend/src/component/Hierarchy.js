import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../layout/Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import { PlusIcon } from "@heroicons/react/solid";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";

const Hierarchy = () => {
  const [layers, setLayers] = useState([]);
  const [role, setRole] = React.useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddLayer = () => {
    setLayers((prevLayers) => [
      ...prevLayers,
      {
        name: `New Layer ${prevLayers.length + 1}`,
        authority: "",
        children: [],
        imageUrl: `/images/image${prevLayers.length + 1}.jpg`,
      },
    ]);
  };

  const handleAddChildLayer = (parentIndex) => {
    const parentLayer = layers[parentIndex];
    if (parentLayer.children.length === 0) {
      setLayers((prevLayers) => {
        const newLayers = [...prevLayers];
        newLayers[parentIndex].children.push({
          name: `Child Layer ${newLayers[parentIndex].children.length + 1}`,
          authority: "",
          children: [],
        });
        return newLayers;
      });
    } else {
      console.log("Child layer already exists.");
    }
  };

  const handleDeleteLayer = (parentIndex, childIndex) => {
    setLayers((prevLayers) => {
      const newLayers = [...prevLayers];
      if (childIndex !== undefined) {
        newLayers[parentIndex].children.splice(childIndex, 1);
      } else {
        newLayers.splice(parentIndex, 1);
        newLayers.forEach((layer, index) => {
          layer.name = `Layer ${index + 1}`;
        });
      }
      return newLayers;
    });
  };

  const handleAddAuthority = (parentIndex, childIndex) => {
    const selectedLayer =
      childIndex !== undefined
        ? layers[parentIndex].children[childIndex]
        : layers[parentIndex];

    setSelectedRole("");
    handleClickOpen(); // Open the dialog
  };

 

  const handleAddName = (parentIndex, childIndex) => {
    const selectedLayer =
      childIndex !== undefined
        ? layers[parentIndex].children[childIndex]
        : layers[parentIndex];

    setSelectedRole("");
    handleClickOpen(); // Open the dialog
  };

  
  
    const handleSubmit = (parentIndex) => (event) => {
      event.preventDefault();
      
      if (parentIndex !== undefined) {
        setLayers((prevLayers) => {
          const newLayers = [...prevLayers];
          newLayers[parentIndex].authority = role;
          return newLayers;
        });
      }
    
      setSelectedRole(""); // Reset selected role
      handleClose(); // Close the dialog
    };
  

  const renderLayers = (layers, parentIndex) => {
    return layers.map((layer, childIndex) => (
      <Paper elevation={3} className="p-3 my-3 flex px-24" key={childIndex}>
        <div>
          {layer !== undefined ? layer.authority : layer.name}
          <ActionButtonContainer>
            <button
              className="text-purple-500 rounded-xl px-2 py-2"
              onClick={() => handleAddChildLayer(parentIndex)}
            >
              <PlusIcon className="h-6 w-6 text-purple-500 cursor-pointer" />
            </button>
            <button
              className="m-1 bg-red-400 hover:bg-red-800 text-white rounded-xl px-3 py-2"
              onClick={() => handleDeleteLayer(parentIndex, childIndex)}
            >
              <DeleteIcon />
            </button>
            <button
              className="m-1 bg-green-400 hover:bg-green-800 text-white rounded-xl px-3 py-2"
              onClick={() => handleAddAuthority(parentIndex, childIndex)}
            >
              Authority
            </button>
          </ActionButtonContainer>
          {layer.authority && <div>{`Authority: ${layer.role}`}</div>}
          
        </div>
        {layer.children && layer.children.length > 0 && <Line />}
        {layer.children && renderLayers(layer.children, childIndex)}
      </Paper>
    ));
  };

  return (
    <Container>
      <Sidebar />
      <AddLayerButton className="m-24" onClick={handleAddLayer}>
        Add Layer
      </AddLayerButton>
      <FlowChartContainer>
        {layers.map((layer, parentIndex) => (
          <Card
            className=" my-3 px-44 border-2 rounded-full"
            key={parentIndex}
          >
            <div>
              {layer.name}
              <ActionButtonContainer>
              <div className="flex justify-start">
                <button
                  className="m-1 text-white rounded-2xl px-4 py-2"
                  onClick={() => handleAddChildLayer(parentIndex)}
                  >
                  {layer.imageUrl && (
                    <img
                    className=" "
                    src={layer.imageUrl}
                    alt={`Profile of ${layer.name}`}
                    height={70}
                    width={70}
                    />
                    )}
                </button>
                   </div>
                   <div className="flex justify-end">
                <button
                  className="m-1 text-red-700 rounded-xl px-3 py-2"
                  onClick={() => handleDeleteLayer(parentIndex)}
                >
                  <DeleteIcon />
                </button>
                <button
                  className="m-1  text-green-600 rounded-3xl px-3 py-2"
                  onClick={() => handleAddAuthority(parentIndex)}
                >
                  <PlusIcon className="h-6 w-6 text-green-500 cursor-pointer" />
                </button>
                </div>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    component: "form",
                     onSubmit: handleSubmit(parentIndex)
                      
                      
                    
                  }}
                >
                  <DialogContent>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      label="Role"
                      onChange={handleChange}
                    >
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="TeamLead">TeamLead</MenuItem>
                      <MenuItem value="Developer">Developer</MenuItem>
                    </Select>
                  </DialogContent>
                  <DialogActions>
                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                  </DialogActions>
                </Dialog>
              </ActionButtonContainer>

              {layer.authority && <div>{`Authority: ${layer.authority}`}</div>}
              {/* {selectedRole && renderNamesDropdown()} */}
            </div>
            {layer.children && layer.children.length > 0 && <Line />}
            {layer.children && renderLayers(layer.children, parentIndex)}
          </Card>
        ))}
      </FlowChartContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const FlowChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Line = styled.div`
  position: relative;
  width: 2px;
  height: 10%;
  background-color: green;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const AddLayerButton = styled.button`
  background-color: #6b46c1;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4c1d95;
  }
`;

export default Hierarchy;
