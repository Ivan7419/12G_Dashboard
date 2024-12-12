import * as React from 'react';
import CustomizedDataGrid from "./CustomizedDataGrid";
import Grid from "@mui/material/Grid2";
import StatCard from "./StatCard";
import Box from "@mui/material/Box";

const data = [
    {
        title: 'Общие продажи',
        value: '14к',
        interval: 'Последние 30 дней',
        trend: 'up',
        data: [
            200, 24, 220, 260, 330, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
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

export default function Stock() {

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Grid container spacing={4} columns={12}
                  direction="row"
                  sx={{
                      justifyContent: "center",
                      alignItems: "flex-start",
                  }}>
                <Grid
                    size={{xs: 12, sm: 12, lg: 12}}
                    container
                    spacing={2}
                    columns={12}
                    sx={{mb: (theme) => theme.spacing(1)}}
                >
                    {data.map((card, index) => (
                        <Grid key={index} size={{xs: 12, sm: 6, lg: 4}}>
                            <StatCard {...card} />
                        </Grid>
                    ))}
                </Grid>

                <Grid
                    size={{xs: 12, sm: 12, lg: 12}}
                    container
                    spacing={2}
                    columns={12}
                    sx={{mb: (theme) => theme.spacing(1)}}
                >
                    <CustomizedDataGrid/>
                </Grid>
            </Grid>
        </Box>
    );
}