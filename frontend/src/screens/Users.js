import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

import axios from 'axios';

const EmployeeGrid = () => {
  const [rowData, setRowData] = useState([]);
  const gridOptions = {
    columnDefs: [
      { headerName: 'Employee ID', field: '_id' },
      { headerName: 'Name', field: 'name' },
      { headerName: 'Role', field: 'role' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Phone', field: 'phone' },
    ],
    context: {
      componentParent: this,
    },
    getContextMenuItems: params => {
      const contextMenuItems = [
        {
          name: 'Custom Action 1',
          action: () => {
            // Custom action logic for menu item 1
            console.log('Custom Action 1 clicked for row:', params.node.data);
          },
        },
        {
          name: 'Custom Action 2',
          action: () => {
            // Custom action logic for menu item 2
            console.log('Custom Action 2 clicked for row:', params.node.data);
          },
        },
        // Add more context menu items as needed
      ];

      return contextMenuItems;
    },
    processCellForContextMenu: params => {
      return params;
    },
  };
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

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: '400px', width: '600px', margin: 'auto' }}>
      <AgGridReact gridOptions={gridOptions} rowData={rowData} />
    </div>
  );
};

export default EmployeeGrid;
