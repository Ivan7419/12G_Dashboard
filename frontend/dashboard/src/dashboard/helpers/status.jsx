import * as React from 'react';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DoneIcon from '@mui/icons-material/Done';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export const STATUS_OPTIONS = ['Отправлено', 'Ожидание', 'Доставлено'];

const StyledChip = styled(Chip)(({ theme }) => ({
    justifyContent: 'left',
    fontSize: '1rem',
    '& .icon': {
        color: 'inherit',
    },
    '&.Отправлено': {
        color: (theme.vars || theme).palette.info.dark,
        border: `1px solid ${(theme.vars || theme).palette.info.main}`,
    },
    '&.Доставлено': {
        color: (theme.vars || theme).palette.success.dark,
        border: `1px solid ${(theme.vars || theme).palette.success.main}`,
    },
    '&.Ожидание': {
        color: (theme.vars || theme).palette.warning.dark,
        border: `1px solid ${(theme.vars || theme).palette.warning.main}`,
    },
}));

const Status = React.memo((props) => {
    const { status } = props;

    let icon = null;
    if (status === 'Отправлено') {
        icon = <LocalShippingIcon className="icon" />;
    } else if (status === 'Ожидание') {
        icon = <AutorenewIcon className="icon" />;
    } else if (status === 'Доставлено') {
        icon = <DoneIcon className="icon" />;
    }

    let label = status;
    if (status === 'PartiallyFilled') {
        label = 'Partially Filled';
    }

    return (
        <StyledChip
            className={status}
            icon={icon}
            size="small"
            label={label}
            variant="outlined"
        />
    );
});

export function renderStatus(params) {
    if (params.value == null) {
        return '';
    }

    return <Status status={params.value} />;
}