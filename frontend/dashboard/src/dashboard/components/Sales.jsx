import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Modal from '@mui/material/Modal';
import {AccountCircle} from "@mui/icons-material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import CustomizedDataGrid from "./CustomizedDataGrid";
import Grid from "@mui/material/Grid2";
import StatCard from "./StatCard";

const data = [
    {
        title: 'Общие продажи',
        value: '14к',
        interval: 'Последние 30 дней',
        trend: 'up',
        data: [
            200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
            360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
        ],
    },
    {
        title: 'Дневные продажи',
        value: '24',
        interval: 'Последние 30 дней',
        trend: 'down',
        data: [
            1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
            780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
        ],
    },
    {
        title: 'Продуктов продано',
        value: '127',
        interval: 'Последние 30 дней',
        trend: 'neutral',
        data: [
            500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
            520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
        ],
    },
];

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

export default function Sales() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container spacing={4} columns={12}
              direction="row"
              sx={{
                  justifyContent: "center",
                  alignItems: "flex-start",
              }}>
            <Grid
                size={{ xs: 12, sm: 6, lg: 12 }}
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(1) }}
            >
                {data.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
                        <StatCard {...card} />
                    </Grid>
                ))}
            </Grid>

            <CustomizedDataGrid addRecordHandler={handleOpen} />
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
                                    id="demo-simple-select-autowidth"
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
                                    id="demo-simple-select-autowidth"
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
                                    id="outlined-start-adornment"
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
                    <Divider sx={{mt: 3, mb: 3}}>Данные клиента</Divider>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'center',
                        }}>
                            <FormControl sx={{ width: '28ch' }} variant="outlined">
                            <TextField
                                label="Полное имя"
                                id="outlined-start-adornment"
                                sx={{ width: '28ch' }}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle sx={{fontSize: 20}} />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                            </FormControl>
                            <FormControl sx={{ width: '28ch' }} variant="outlined">
                                <TextField
                                    label="Телефон"
                                    id="outlined-start-adornment"
                                    sx={{ width: '28ch' }}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocalPhoneIcon sx={{fontSize: 20}} />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </FormControl>
                            <FormControl sx={{ width: '28ch' }} variant="outlined">
                                <TextField
                                    label="Адрес"
                                    id="outlined-start-adornment"
                                    sx={{ width: '28ch' }}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <HomeIcon sx={{fontSize: 20}} />
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
                                    disabled
                                    label="Ориг. цена"
                                    id="outlined-start-adornment"
                                    slotProps={{
                                        input: {
                                            endAdornment: <InputAdornment position="end">грн.</InputAdornment>,
                                        },
                                    }}
                                />
                            </FormControl>
                            <FormControl sx={{ width: '28ch' }} variant="outlined">
                                <TextField
                                    label="Скидка"
                                    id="outlined-start-adornment"
                                    slotProps={{
                                        input: {
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        },
                                    }}
                                />
                            </FormControl>
                            <FormControl sx={{ width: '28ch' }} variant="outlined">
                                <TextField
                                    label="Новая цена"
                                    id="outlined-start-adornment"
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
                            >
                                Добавить продажу
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Grid>
    );
}