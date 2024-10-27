import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import {axisClasses} from "@mui/x-charts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

const dataset = [
    { month: 'January', illuminate: 6, nike: 5, sort_company: 7, other: 3 },
    { month: 'February', illuminate: 4, nike: 3, sort_company: 6, other: 2 },
    { month: 'March', illuminate: 7, nike: 6, sort_company: 5, other: 3 },
    { month: 'April', illuminate: 5, nike: 4, sort_company: 7, other: 3 },
    { month: 'May', illuminate: 4, nike: 3, sort_company: 5, other: 2 },
    { month: 'June', illuminate: 6, nike: 5, sort_company: 4, other: 3 },
    { month: 'July', illuminate: 5, nike: 4, sort_company: 6, other: 3 },
    { month: 'August', illuminate: 4, nike: 3, sort_company: 5, other: 2 },
    { month: 'September', illuminate: 6, nike: 5, sort_company: 4, other: 3 },
];


const chartSetting = {
    yAxis: [
        {
            label: 'продано продуктов',
        },
    ],
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-3px, 0)',
        },
    },
};

export default function BrandsChart(props) {
    return (
        <Card variant="outlined" sx={{ height: 400, }}>
            <BarChart
                dataset={dataset}
                xAxis={[
                    {
                        scaleType: 'band',
                        dataKey: 'month',
                        categoryGapRatio: 0.3,
                        barGapRatio: 0.1
                    }]}
                series={[
                    { dataKey: 'illuminate', label: 'Illuminate prime' },
                    { dataKey: 'nike', label: 'Nike' },
                    { dataKey: 'sort_company', label: 'Sort Company' },
                    { dataKey: 'other', label: 'другое' },
                ]}
                {...chartSetting}
            />
        </Card>
    );
};
