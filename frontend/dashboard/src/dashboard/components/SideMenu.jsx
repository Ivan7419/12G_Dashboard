import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import * as PropTypes from "prop-types";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

function Item(props) {
    return null;
}

Item.propTypes = {children: PropTypes.node};
export default function SideMenu() {
    const theme = useTheme();
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
        <Box component="section" sx={{ display: 'flex', p: 2,
            background: `radial-gradient(circle, ${theme.palette.primaryGradientStart}, ${theme.palette.primaryGradientEnd})`,
            width: '100%' }}>
            <Box
                component="img"
                sx={{
                    height: 50,
                    width: 50,
                    maxHeight: { xs: 50, md: 50 },
                    maxWidth: { xs: 50, md: 50 },
                    mr: 3
                }}
                alt="logo"
                src={`${theme.palette.logo}`}
            />
            <Typography variant="h6" component="h1" sx={{ textAlign: 'center', fontWeight: 800 }}>
                Панель
            </Typography>
        </Box>
      <Divider />
      <MenuContent />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt="Riley Carter"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            Riley Carter
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            riley@email.com
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
