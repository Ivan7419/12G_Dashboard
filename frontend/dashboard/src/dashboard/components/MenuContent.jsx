import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

const mainListItems = [
    { text: 'Главная', icon: <HomeRoundedIcon />, path: '/dashboard' },
    { text: 'Аналитика', icon: <AnalyticsRoundedIcon />, path: '/dashboard/analytics' },
    { text: 'Продажи', icon: <PeopleRoundedIcon />, path: '/dashboard/sales' },
    { text: 'Складской учёт', icon: <AssignmentRoundedIcon />, path: '/dashboard/stock' },
];

const secondaryListItems = [
    { text: 'Настройки', icon: <SettingsRoundedIcon /> },
];

export default function MenuContent() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const location = useLocation();

    const pathToIndex = {
        '/dashboard': 0,
        '/dashboard/analytics': 1,
        '/dashboard/sales': 2,
        '/dashboard/stock': 3,
    };

    useEffect(() => {
        const index = pathToIndex[location.pathname];
        if (index !== undefined) {
            setSelectedIndex(index);
        }
    }, [location.pathname]);

    const handleClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <Stack sx={{ flexGrow: 1, p: 1, width: '100%', justifyContent: 'space-between' }}>
            <List dense sx={{ width: '100%' }}>
                {mainListItems.map((item, index) => (
                    <Box key={index} sx={{ display: 'block', width: "100%", mb: 1 }}>
                        <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton
                                sx={{
                                    height: '4rem',
                                    borderRadius: '16px',
                                }}
                                selected={selectedIndex === index}
                                onClick={() => handleClick(index)}
                            >
                                <ListItemIcon>
                                    {React.cloneElement(item.icon, { sx: { mr: 2, fontSize: '1.5rem' } })}
                                </ListItemIcon>
                                <Typography variant="body2" sx={{ fontSize: '1.05rem' }}>
                                    {item.text}
                                </Typography>
                            </ListItemButton>
                        </Link>
                    </Box>
                ))}
            </List>

            <List dense sx={{ width: '100%' }}>
                {secondaryListItems.map((item, index) => (
                    <Box key={index} sx={{ display: 'block', width: "100%", mb: 1 }}>
                        <ListItemButton
                            sx={{
                                height: '4rem',
                                borderRadius: '16px',
                            }}
                            selected={selectedIndex === mainListItems.length + index}
                            onClick={() => handleClick(mainListItems.length + index)}
                        >
                            <ListItemIcon sx={{ fontSize: '1.5rem', mr: 2 }}>{item.icon}</ListItemIcon>
                            <Typography variant="body2" sx={{ fontSize: '1.15rem' }}>
                                {item.text}
                            </Typography>
                        </ListItemButton>
                    </Box>
                ))}
            </List>
        </Stack>
    );
}
