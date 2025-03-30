import {GridToolbarContainer} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as React from "react";
import SalesModal from "../helpers/modals/SalesModal";
import StockModal from "../helpers/modals/StockModal";


export default function EditToolbar(props) {
    const [open, setOpen] = React.useState(false);
    const [modalMode, setModalMode] = React.useState("add");
    const [selectedRowData, setSelectedRowData] = React.useState(null);
    const {selectedRowId, apiRef, setRows, modalType} = props;

    const handleOpen = (mode) => {
        setModalMode(mode);
        if (mode === "edit" && selectedRowId) {
            const selectedRow = apiRef.current.getRow(selectedRowId);
            setSelectedRowData(selectedRow);
        } else {
            setSelectedRowData(null);
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleDeleteRow = () => {
        const selectedRowIds = apiRef.current.getSelectedRows(); // Get selected rows
        if (selectedRowIds.size > 0) {
            const selectedRowIdArray = Array.from(selectedRowIds.keys());
            apiRef.current.updateRows(
                selectedRowIdArray.map((id) => ({id, _action: 'delete'}))
            );
        } else {
            alert('No row selected!');
        }
    };

    return (
        <>
            <GridToolbarContainer sx={{p: 0.8}}>
                <Button
                    color="primary"
                    startIcon={<AddIcon/>}
                    onClick={() => handleOpen("add")}
                >
                    Добавить
                </Button>
                <Button
                    disabled={!selectedRowId}
                    color="primary"
                    tartIcon={<EditIcon/>}
                    onClick={() => handleOpen("edit")}
                >
                    Изменить
                </Button>
                <Button
                    disabled={!selectedRowId}
                    color="primary" startIcon={<DeleteIcon/>}
                    onClick={handleDeleteRow}
                >
                    Удалить
                </Button>
            </GridToolbarContainer>

            {modalType === "stock" ? (
                <StockModal
                    open={open}
                    setOpen={setOpen}
                    handleClose={handleClose}
                    onAddRow={(newRow) => setRows((prev) => [newRow, ...prev])}
                    onEditRow={(updatedRow) =>
                        setRows((prev) =>
                            prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
                        )
                    }
                    selectedRow={modalMode === "edit" ? selectedRowData : null}
                />
            ) : (
                <SalesModal
                    open={open}
                    setOpen={setOpen}
                    handleClose={handleClose}
                    onAddRow={(newRow) => setRows((prev) => [newRow, ...prev])}
                    onEditRow={(updatedRow) =>
                        setRows((prev) =>
                            prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
                        )
                    }
                    selectedRow={modalMode === "edit" ? selectedRowData : null}
                />
            )}
        </>
    );
}
