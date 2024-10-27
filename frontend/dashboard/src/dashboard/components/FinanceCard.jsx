import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);



export default function FinanceCard() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card variant="outlined" sx={{ height: '100%', width: '80%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                    Активный баланс
                </Typography>
                <Typography
                    component="h2"
                    variant="h2"
                    gutterBottom
                    sx={{ fontWeight: '600' }}
                >
                    120 грн.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '8px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ArrowUpwardIcon sx={{ marginRight: '4px' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Доходы:
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        12 грн.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '8px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ArrowDownwardIcon sx={{ marginRight: '4px' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Расходы:
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        1000 грн.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button
                        width='100%'
                        variant="contained"
                        size="medium"
                        color="primary"
                        endIcon={<ChevronRightRoundedIcon />}
                        fullWidth={isSmallScreen}
                        sx={{ width: '90%' }}
                    >
                        Добавить карту
                    </Button>
                </Box>
            </CardContent>
        </Card>

    );
}
