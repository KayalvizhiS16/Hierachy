import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Sidebar from "../layout/Sidebar";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from "styled-components";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddIcon from "@mui/icons-material/Add";
import Card from '@mui/material/Card';

const EmployeeGrid = () => {
  const [rowData, setRowData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [reportEmployeeName, setReportEmployeeName] = useState("");
  const [selectedNames, setSelectedNames] = useState([]);
  const [flowData, setFlowData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedEmployeeName, setEditedEmployeeName] = useState("");
  const [editParams, setEditParams] = useState("");
  const [editName, setEditName] = useState("");
  const [layers, setLayers] = useState([]);
  const [showAdditionalContainer, setShowAdditionalContainer] = useState(false);
  const [newLayer, setNewLayer] = useState('');
  const handleAddLayer = (index) => {
    const newLayer = {
      name: `New Layer `,
    };
    console.log(selectedNames,"selectednames");
    console.log(index,"index");
    console.log(layers,"layer");
  
    setLayers((prevLayers) => {
      const updatedLayers = [...prevLayers];
      updatedLayers.splice(index, 0, newLayer); 
      return updatedLayers;
    });
  
    setShowAdditionalContainer(true);
  };
  console.log(layers,"layer2222222222222");
  
const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee([]);
  };

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedEmployee(newValue);
    setNewLayer(newValue);
  };
  const handleLayerAutocompleteChange = (event, newValue, index) => {
    const updatedLayers = layers.map((layer, i) =>
    i === index ? { ...layer, selectedEmployee: newValue } : layer
    );
    setLayers(updatedLayers);
  };

  const gridOptions = {
    columnDefs: [
      { headerName: "Employee ID", field: "_id" },
      { headerName: "Name", field: "name" },
      { headerName: "Role", field: "role" },
      { headerName: "Email", field: "email" },
      { headerName: "Phone", field: "phone" },
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: (params) => (
          <div>
            <Button color="primary" onClick={() => handleView(params)}>
              <RemoveRedEyeIcon />
            </Button>
          </div>
        ),
      },
    ],
    context: {
      componentParent: this,
    },
    getContextMenuItems: (params) => {
      setSelectedEmployeeName(params.value);
      const contextMenuItems = [
        {
          name: "Report To",
          action: () => {
            handleClickOpen();
          },
        },
        {
          name: "Move To",
          action: () => {
            console.log("Custom Action 2 clicked for row:", params.node.data);
          },
        },
      ];
      return contextMenuItems;
    },
    processCellForContextMenu: (params) => {
      return params;
    },
  };
  console.log(selectedEmployee);

  const serverURL = "http://localhost:5000";

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`${serverURL}/get-user`);
      const { db, message } = response.data;

      if (message === "Data fetched successfully") {
        setRowData(db);
      } else {
        console.log(message || "No data found in the DB");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmission = async () => {
    try {
      const selectedEmployeesName = selectedEmployee.map((name) => name?.name);
      const response = await axios.post(`${serverURL}/create-flow`, {
        employeeName: selectedEmployeeName ? selectedEmployeeName : null,
        selectedEmployees: selectedEmployeesName,
      });
      // Assuming flowData is updated from the server after submission
      setFlowData(response.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      handleClose();
    }
  };

  const handleView = async (params) => {
    const employeeName = params.data.name;
    console.log(params.data.name);
    setEditParams(params);
    setReportEmployeeName(employeeName);
    try {
      const response = await axios.get("http://localhost:5000/get-flow");
      const a = response.data;
      setFlowData(a);
      const selectedEmployeeData = a.findLast((employee) => {
        return employee.employeeName === employeeName;
      });
      setSelectedNames(selectedEmployeeData?.selectedEmployees || []);
      setViewDialogOpen(true);
      // setLayers([])
    } catch (error) {
      console.error("Error fetching flow data:", error);
    }
  };
  
  console.log(selectedNames,"selectednames");

  const closeViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedNames([]);
  };

  const handleEdit = (params, name) => {
    const editName = name;
    setEditName(editName);
    const employeeName = params.data.name;
    setEditedEmployeeName(employeeName);
    setEditDialogOpen(true);
  };

  const handleEditSubmission = async () => {
    try {
      if (editedEmployeeName && editParams) {
        const updatedSelectedNames = selectedNames.map((name) =>
          name === editParams.data.name ? editedEmployeeName : name
        );
        setSelectedNames(updatedSelectedNames);
      }
      setEditDialogOpen(false);
      await axios.put(`${serverURL}/edit-employee`, {
        empName: editParams.data.name,
        oldName: editName,
        newName: editedEmployeeName,
      });
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };
  console.log(editParams.data);
  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditedEmployeeName("");
  };

  const handleDelete = async (name) => {
    try {
      const updatedSelectedNames = selectedNames.filter((n) => n !== name);
      setSelectedNames(updatedSelectedNames);
      await axios.put(`${serverURL}/delete-employee`, {
        employeeName: reportEmployeeName,
        selectedEmployee: name,
      });
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };
  const handleSubmit = async() => {
  
    try {
      
      const response = await axios.post(`${serverURL}/submit-flow`, {
        employeeName: selectedEmployeeName ? selectedEmployeeName : null,
       
      });
      setFlowData(response.data);
      setFlowData([]);
      setLayers([])
      setViewDialogOpen(false);
    } catch (err) {
      console.error(err.message);
    } finally {
      handleClose();
    }
  }

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const renderTreeNodes = () => {
    return selectedNames.map((name,index) => (
      <Card>
      <TreeNode
        key={name}
        label={
          <StyledNode>
            <Card>
            {name} :
            {
              rowData.find((a) => {
                return a.name === name;
              }).role
            }
            <div>
              <Button onClick={() => handleEdit(editParams, name)}>
                <EditRoundedIcon color="secondary" className=" mr-4 ml-4" />
              </Button>
              <Button onClick={() => handleDelete(name)}>
                <DeleteRoundedIcon color="primary" />
              </Button>
              <Button>
                <AddIcon onClick={() => handleAddLayer(index)} color="primary" />
              </Button>
            </div>
            </Card>
          </StyledNode>
          
        }
      >
        { renderLayers(layers, 0)}
      </TreeNode>
      </Card>
    ));
  };
  const renderLayers = (layers, parentIndex) => {
    return layers.map((layer, childIndex) => (
      <StyledNode key={childIndex}>
        <div>
          {layer.name}
          <ActionButtonContainer>
            <button>
              {
                <Stack
                  spacing={3}
                  sx={{ width: 200 }}
                  style={{ height: "100px" }}
                >
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={rowData}
                    getOptionLabel={(option) => option?.name}
                    value={layers.selectedEmployee}
                    onChange={(event, newValue) =>
                      handleLayerAutocompleteChange(event, newValue, childIndex)
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Select Employee" />
                    )}  
                  />
                </Stack>
              }
            </button>
          </ActionButtonContainer>
        </div>
        {layer.children && renderLayers(layer.children, childIndex)}
      </StyledNode>
    ));
  };

  console.log();

  return (
    <div className="m-24">
      <div
        className="ag-theme-alpine-dark"
        style={{ height: "800px", width: "1200px", margin: "auto" }}
      >
        <Sidebar />

        <AgGridReact gridOptions={gridOptions} rowData={rowData} />
        <Dialog
          open={viewDialogOpen}
          onClose={closeViewDialog}
          aria-labelledby="view-dialog-title"
          aria-describedby="view-dialog-description"
        >
          <DialogTitle id="view-dialog-title">Employee Hierarchy</DialogTitle>
          <DialogContent>
            <DialogContentText id="view-dialog-description">
              
              <Tree
                lineWidth={"3px"}
                lineColor={"red"}
                lineBorderRadius={"10px"}
                label={<StyledNode>{reportEmployeeName}</StyledNode>}
              >
                {renderTreeNodes()}
              </Tree>
               
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={closeViewDialog}>Close</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={editDialogOpen}
          onClose={closeEditDialog}
          aria-labelledby="edit-dialog-title"
          aria-describedby="edit-dialog-description"
        >
          <DialogContent>
            <DialogTitle id="edit-dialogue-title">
              Edit Employee Name
            </DialogTitle>
            <DialogContentText id="edit-dialogue-description">
              <Stack
                spacing={3}
                sx={{ width: 500 }}
                style={{ height: "400px" }}
              >
                <TextField
                  id="edited-employee-name"
                  label="Employee Name"
                  value={editName}
                  disabled
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-edit"
                  options={rowData.map((option) => option.name)}
                  renderInput={(params) => (
                    <TextField {...params} label="Select New Name" />
                  )}
                  onChange={(event, newValue) =>
                    setEditedEmployeeName(newValue)
                  }
                />
              </Stack>
              <DialogActions>
                <Button onClick={closeEditDialog}>Cancel</Button>
                <Button onClick={handleEditSubmission} autoFocus>
                  Submit
                </Button>
              </DialogActions>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <React.Fragment>
          <Dialog
            className="p-8"
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Report To"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Stack
                  spacing={3}
                  sx={{ width: 500 }}
                  style={{ height: "400px" }}
                >
                  <Autocomplete
                    disablePortal
                    multiple
                    id="combo-box-demo"
                    options={rowData} // Use the employee data for Autocomplete options
                    getOptionLabel={(option) => option?.name}
                    value={selectedEmployee}
                    onChange={handleAutocompleteChange}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Employee" />
                    )}
                  />
                </Stack>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmission} autoFocus>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>
    </div>
  );
};

const StyledNode = styled.div`
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 5px;
  text-bold: 10px;
`;
const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export default EmployeeGrid;
