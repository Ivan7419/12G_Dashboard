import { GridToolbarContainer} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export default function EditToolbar(props) {
    const { addRecordHandler, selectedRowId, apiRef } = props;

    const handleDeleteRow = () => {
        const selectedRowIds = apiRef.current.getSelectedRows(); // Get selected rows
        if (selectedRowIds.size > 0) {
            const selectedRowIdArray = Array.from(selectedRowIds.keys());
            apiRef.current.updateRows(
                selectedRowIdArray.map((id) => ({ id, _action: 'delete' }))
            );
        } else {
            alert('No row selected!');
        }
    };

    return (
        <GridToolbarContainer sx={{p: 0.8}}>
            <Button color="primary" startIcon={<AddIcon />} onClick={addRecordHandler}>
                Добавить
            </Button>
            <Button color="primary" startIcon={<EditIcon />}>
                Изменить
            </Button>
            <Button color="primary" yutguiygyuiyui startIcon={<DeleteIcon />} onClick={handleDeleteRow}>
                Удалить
            </Button>
        </GridToolbarContainer>
    );
}

