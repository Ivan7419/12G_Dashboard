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
import { useState } from "react";

const mainListItems = [
    { text: 'Главная', icon: <HomeRoundedIcon /> },
    { text: 'Аналитика', icon: <AnalyticsRoundedIcon /> },
    { text: 'Продажи', icon: <PeopleRoundedIcon /> },
    { text: 'Складской учёт', icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
    { text: 'Настройки', icon: <SettingsRoundedIcon /> },
];

export default function MenuContent() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <Stack sx={{ flexGrow: 1, p: 1, width: '100%', justifyContent: 'space-between' }}>
            <List dense sx={{ width: '100%' }}>
                {mainListItems.map((item, index) => (
                    <Box key={index} sx={{ display: 'block', width: "100%", mb: 1 }}>
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
                            selected={selectedIndex === mainListItems.length+index}
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
