import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export default function Logo12G(props) {
    const theme = useTheme();
    const { height = 50, width = 50 } = props;

    return (
        <Box
            component="img"
            sx={{
                height: height,
                width: width,
                maxHeight: { xs: height, md: height },
                maxWidth: { xs: width, md: width },
                mr: 3,
            }}
            alt="logo"
            src={theme.palette.logo}
        />
    );
}
