import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Sidebar from '../layout/Sidebar';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const EmployeeGrid = () => {
  const [rowData, setRowData] = useState([]);
  const [open, setOpen] = useState(false);
  const[selectedEmployeeName,setSelectedEmployeeName]=useState('');
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [reportEmployeeName, setReportEmployeeName] = useState('');
  const [selectedNames, setSelectedNames] = useState([]);
const[flowData,setFlowData] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee([]);
  };

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedEmployee(newValue);
  };

  const gridOptions = {
    columnDefs: [
      { headerName: 'Employee ID', field: '_id' },
      { headerName: 'Name', field: 'name' },
      { headerName: 'Role', field: 'role' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Phone', field: 'phone' },
      {
        headerName: 'Actions',
        field: 'actions',
        cellRenderer: (params) => (
          <Button color='secondary' onClick={() => handleView(params)}>
            <RemoveRedEyeIcon />
          </Button>
        ),
      },
    ],
    context: {
      componentParent: this,
    },
    getContextMenuItems: (params) => {
      console.log(setSelectedEmployeeName(params.value));
      const contextMenuItems = [
        {
          name: 'Report To',
          action: () => {
            handleClickOpen();
           
          },
        },
        {
          name: 'Move To',
          action: () => {
          
            console.log('Custom Action 2 clicked for row:', params.node.data);
          },
        },
      ];

    
      return contextMenuItems;
    },
    processCellForContextMenu: (params) => {
      return params;
    },
  };

  const serverURL = 'http://localhost:5000';

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`${serverURL}/get-user`);
      const { db, message } = response.data;

      if (message === 'Data fetched successfully') {
        setRowData(db);
        console.log(rowData);
      } else {
        console.log(message || 'No data found in the DB');
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleSubmission = async (params) => {
    try {
     const selectedEmployeesName=selectedEmployee.map((name)=>{
       return name?.name})
       const response = await axios.post(`${serverURL}/create-flow`, {
         employeeName:selectedEmployeeName?selectedEmployeeName:null,
         selectedEmployees: selectedEmployeesName,
         
         
        });
        
        console.log(response.data);
      } catch (err) {
        console.error(err.message);
      } finally {
        handleClose();
      }
      
    };
    
    const handleView=async(params)=>{
      const employeeName = params.data.name;
      setReportEmployeeName(employeeName);
     
         try {
           const response = await axios.get('http://localhost:5000/get-flow');
           setFlowData(response.data);
           const selectedEmployeeData = flowData.find((employee) => employee.name === employeeName);
           setSelectedNames(selectedEmployeeData?.selectedEmployees || []);
           console.log(selectedEmployeeData);
           setViewDialogOpen(true);
         } catch (error) {
           console.error('Error fetching flow data:', error);
         }
       };
       

const closeViewDialog = () => {
  setViewDialogOpen(false);
  setSelectedNames([]);
};

  useEffect(() => {
    fetchEmployeeData();
    
  }, []);

  const renderTreeNodes = () => {
    // Map your array to create TreeNode components for each element
    return selectedEmployee.map((name) => (
      <TreeNode key={name} label={<StyledNode>{name}</StyledNode>}>
        {/* Add other content for each TreeNode if needed */}
      </TreeNode>
    ));
  };

  return (
    <div className='m-24'>
    <div className="ag-theme-alpine" style={{ height: '800px', width: '1200px', margin: 'auto' }}>
      <Sidebar/>
      <AgGridReact gridOptions={gridOptions} rowData={rowData} />
      <Dialog
          open={viewDialogOpen}
          onClose={closeViewDialog}
          aria-labelledby="view-dialog-title"
          aria-describedby="view-dialog-description"
        >
          <DialogTitle id="view-dialog-title">View Employee</DialogTitle>
          <DialogContent>
            <DialogContentText id="view-dialog-description">
            <Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={<StyledNode>{reportEmployeeName}</StyledNode>}
            
          >
            
           
           
            {renderTreeNodes()}
    </Tree>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeViewDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      <React.Fragment>
      <Dialog className='p-8' open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Report To'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Stack spacing={3} sx={{ width: 500 }}>
            <Autocomplete
              disablePortal
              multiple
              id="combo-box-demo"
              options={rowData} // Use the employee data for Autocomplete options
              getOptionLabel={(option) => option?.name}
             
              value={selectedEmployee?selectedEmployee:null}
              onChange={handleAutocompleteChange}
              renderInput={(params) => <TextField {...params} label="Select Employee" />}
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
  }
const StyledNode = styled.div`
  padding: 40px;
  border-radius: 8px;
  display: inline-block;
  border: 2px solid red;
  background-size: cover;
  background-position: center;

   /* Set text color to white or a contrasting color */
`;

export default EmployeeGrid;
