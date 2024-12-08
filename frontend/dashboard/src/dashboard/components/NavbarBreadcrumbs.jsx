import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import {useLocation} from "react-router-dom";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

const getBreadcrumbText = (path) => {
  switch (path) {
    case '/dashboard':
      return 'Главная';
    case '/dashboard/analytics':
      return 'Аналитика';
    case '/dashboard/sales':
      return 'Продажи';
    case '/dashboard/stock':
      return 'Складской учёт';
    default:
      return 'Главная';
  }
};

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">Панель управления</Typography>
      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
        {getBreadcrumbText(currentPath)}
      </Typography>
    </StyledBreadcrumbs>
  );
}