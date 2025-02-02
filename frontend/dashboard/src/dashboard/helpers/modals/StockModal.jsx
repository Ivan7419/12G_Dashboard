import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import InventoryIcon from "@mui/icons-material/Inventory";
import Button from "@mui/material/Button";
import ReceiptIcon from "@mui/icons-material/Receipt";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '45%',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
};

const MenuProps = {
    PaperProps: {
        style: {
            width: '28ch',
        },
    },
};

const items = [
    {label: "Har"},
    {label: "Hoodie"},
    {label: "Chain"},
    {label: "T-shirt"},
];

export default function StockModal({ open, handleClose, onAddRow }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(JSON.stringify());
        // try {
        //     const response = await fetch("/api/sales", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(saleData),
        //     });
        //
        //     if (response.ok) {
        //         alert("Продажа успешно добавлена");
        //     } else {
        //         console.error("Ошибка при отправке данных", await response.json());
        //     }
        // } catch (error) {
        //     console.error("Ошибка сети:", error);
        // }
        onAddRow();
        handleClose();
    };

    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Typography id="keep-mounted-modal-title" variant="h4" component="h2"
                            sx={{fontWeight: 800, textAlign: 'center', mb: 3}}>
                    Добавить продукт
                </Typography>

                <Autocomplete
                    disablePortal
                    id="selectedProduct"
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
                        <TextField {...params} label="Товар" variant="outlined" />
                    )}
                />
                <Divider sx={{mt: 1, mb: 3}}>Параметры</Divider>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center',
                    }}>
                        <FormControl sx={{ width: '28ch' }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Размер</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="selectedSize"
                                autoWidth
                                label="Размер"
                                MenuProps={MenuProps}
                            >
                                <MenuItem value={"XS"}>XS</MenuItem>
                                <MenuItem value={"S"}>S</MenuItem>
                                <MenuItem value={"M"}>M</MenuItem>
                                <MenuItem value={"L"}>L</MenuItem>
                                <MenuItem value={"Xl"}>Xl</MenuItem>
                                <MenuItem value={"XXl"}>XXl</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: '28ch' }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Цвет</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="selectedColor"
                                autoWidth
                                label="Цвет"
                                MenuProps={MenuProps}
                            >
                                <MenuItem value={"Серый"}>Серый</MenuItem>
                                <MenuItem value={"Чёрный"}>Чёрный</MenuItem>
                                <MenuItem value={"Белый"}>Белый</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: '28ch' }} variant="outlined">
                            <TextField
                                disabled
                                label="Наличие"
                                sx={{ width: '28ch' }}
                                value={17}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <InventoryIcon sx={{fontSize: 20}} />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </FormControl>
                    </Box>
                </Box>
                <Divider sx={{mt: 3, mb: 3}}>Цена</Divider>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <FormControl sx={{ width: '28ch' }} variant="outlined">
                            <TextField
                                label="Новая цена"
                                id="finalPrice"
                                slotProps={{
                                    input: {
                                        endAdornment: <InputAdornment position="end">грн.</InputAdornment>,
                                    },
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 5 }}>
                        <Button
                            width='100%'
                            variant="contained"
                            size="medium"
                            color="primary"
                            endIcon={<ReceiptIcon />}
                            fullWidth={isSmallScreen}
                            sx={{ width: '50%' }}
                            onClick={handleSubmit}
                        >
                            Добавить продажу
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}