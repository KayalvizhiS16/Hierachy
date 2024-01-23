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

const EmployeeGrid = () => {
  const [rowData, setRowData] = useState([]);
  const [open, setOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedEmployee(newValue);
  };

  const handleSubmission = async () => {
    try {
      const response = await axios.post(`${serverURL}/create-flow`, {
        selectedEmployees: selectedEmployee,
      });

      console.log(response.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      handleClose();
    }
  };

  const gridOptions = {
    
    getContextMenuItems: (params) => {
      const contextMenuItems = [
        {
          name: 'Report To',
          action: () => {
            handleClickOpen();
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
      } else {
        console.log(message || 'No data found in the DB');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: '800px', width: '1200px', margin: 'auto' }}>
      <AgGridReact gridOptions={gridOptions} rowData={rowData} />
      <React.Fragment>
        <Dialog className="p-8" open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
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
                  value={selectedEmployee}
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
  );
};

export default EmployeeGrid;
