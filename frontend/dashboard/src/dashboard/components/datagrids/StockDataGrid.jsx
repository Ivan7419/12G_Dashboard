import * as React from 'react';
import {DataGrid, useGridApiRef} from '@mui/x-data-grid';
import { columns, initialRows } from '../../internals/data/gridDataStock';
import EditToolbar from "../EditToolbar";
import { ruRU } from '@mui/x-data-grid/locales';

export default function StockDataGrid() {
  const [rows, setRows] = React.useState([]);
  const [selectedRowId, setSelectedRowId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const apiRef = useGridApiRef();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5004/api/products/get-all');
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        const data = await response.json();
        flattenProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function getRowId(product) {
    return product.id;
  }

  function flattenProducts(products) {
    const parsedProducts = [];

    products.forEach(product => {
      product.colors.forEach((colorEntry) => {
        const color = colorEntry.color;
        const sizes = colorEntry.sizes;

        Object.entries(sizes).forEach(([size, quantity]) => {
          parsedProducts.push({
            id: `${product.id}-${color}-${size}`,
            name: product.name,
            brand: product.brand,
            price: product.price,
            color,
            size,
            quantity,
          });
        });
      })
    })

    setRows(parsedProducts);
    console.log(parsedProducts);
  }

  const handleSelectionChange = (newSelection) => {
    setSelectedRowId(newSelection[0]);
  };

  return (
    <DataGrid
      getRowId={getRowId}
      localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
      apiRef={apiRef}
      rows={rows}
      columns={columns}
      density="compact"
      showCellVerticalBorder
      showColumnVerticalBorder
      disableRowSelectionOnClick
      loading={loading}
      error={error}
      unstable_rowSpanning={true}
      hideFooter
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize={false}
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
          modalType: "stock"
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

