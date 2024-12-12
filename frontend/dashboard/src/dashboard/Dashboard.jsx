import * as React from 'react';

import {alpha} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from './theme/customizations';
import AppTheme from "../shared-theme/AppTheme";
import AppNavbar from "./components/AppNavbar";
import MainGrid from "./components/MainGrid";
import Sales from "./components/Sales";
import {Route, Routes} from "react-router-dom";
import Stock from "./components/Stock";

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

export default function Dashboard(props) {
    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
                <CssBaseline enableColorScheme/>
                <Box sx={{display: 'flex'}}>
                    <SideMenu/>
                    <AppNavbar/>
                    <Box
                        component="main"
                        sx={(theme) => ({
                            flexGrow: 1,
                            backgroundColor: theme.vars
                                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                                : alpha(theme.palette.background.default, 1),
                            overflow: 'auto',
                        })}
                    >
                        <Stack
                            spacing={2}
                            sx={{
                                alignItems: 'center',
                                mx: 3,
                                pb: 5,
                                mt: {xs: 8, md: 0},
                            }}
                        >
                            <Header/>
                            <Routes>
                                <Route path="/" element={<MainGrid />} />
                                <Route path="sales" element={<Sales />} />
                                <Route path="analytics" element={<h1>Analytics</h1>}/>
                                <Route path="stock" element={<Stock />} />
                            </Routes>
                        </Stack>
                    </Box>
                </Box>
        </AppTheme>
    );
}
