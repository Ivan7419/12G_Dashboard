import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const items = [
    { label: "Har" },
    { label: "Hoodie" },
    { label: "Chain" },
    { label: "T-shirt" },
];

export default function Sales() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h4" component="h2" sx={{fontWeight: 800, textAlign: 'center', mb:3}}>
                        Добавить продажу
                    </Typography>

                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={items}
                    sx={{
                        width: '100%',
                        '& .MuiIconButton-root': {
                            boxShadow: 'none',
                            borderRadius: 0, // Change as needed
                            textTransform: 'none',
                            fontWeight: 'normal', // Change as needed
                            letterSpacing: 0,
                            color: 'inherit', // Or specific color
                            border: 'none', // Remove border if needed
                            backgroundColor: 'transparent', // Remove background if needed
                            '&:hover': {
                                backgroundColor: 'transparent', // Change hover effect
                            },
                            '&:active': {
                                backgroundColor: 'transparent', // Change active effect
                            },
                        },
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Item" variant="outlined" />
                    )}
                />
                </Box>
            </Modal>
        </div>
    );
}