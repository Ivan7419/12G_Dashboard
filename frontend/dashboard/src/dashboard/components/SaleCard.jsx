import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';



export default function SaleCard() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card variant="outlined" sx={{ height: '100%', width: '90%' }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUpIcon sx={{ fontSize: 35, marginRight: '4px' }} />
                    <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                        Продажи
                    </Typography>
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Button
                            width='100%'
                            variant="contained"
                            size="medium"
                            color="primary"
                            endIcon={<AddBoxRoundedIcon />}
                            fullWidth={isSmallScreen}
                            sx={{ width: '90%', mb: 2}}>
                            Добавить
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Button
                            width='100%'
                            variant="contained"
                            size="medium"
                            color="primary"
                            endIcon={<SellRoundedIcon />}
                            fullWidth={isSmallScreen}
                            sx={{ width: '90%' }}>
                            Продать
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>

    );
}
