import * as React from 'react';
import {DataGrid, useGridApiRef} from '@mui/x-data-grid';
import { columns, initialRows } from '../../internals/data/gridDataSales';
import EditToolbar from "../EditToolbar";
import { ruRU } from '@mui/x-data-grid/locales';

export default function SalesDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [selectedRowId, setSelectedRowId] = React.useState(null);
  const apiRef = useGridApiRef();
  const handleSelectionChange = (newSelection) => {
    setSelectedRowId(newSelection[0]);
  };

  return (
    <DataGrid
      localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
      apiRef={apiRef}
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize={false}
      density="compact"
      slots={{
        toolbar: EditToolbar,
      }}
      slotProps={{
        loadingOverlay: {
          variant: 'linear-progress',
          noRowsVariant: 'linear-progress',
        },
        toolbar: {
          setRows,
          apiRef: apiRef,
          selectedRowId,
          modalType: "sales"
        },
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
      onRowSelectionModelChange={handleSelectionChange}
    />
  );
}

