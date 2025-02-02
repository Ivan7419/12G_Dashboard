import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import {useState} from "react";

function VerificationCheck({ open, handleClose, onVerify }) {
    const [code, setCode] = useState("");

    const handleInputChange = (e) => {
        setCode(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onVerify(code);
    };

    if (!open) return null;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
                sx: { backgroundImage: 'none' },
            }}
        >
            <DialogTitle>Двухфакторная аутентификация</DialogTitle>
            <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
                <DialogContentText>
                    Мы отправили вам код пля подтверждения на электронную почту, введите этот код.
                </DialogContentText>
                <OutlinedInput
                    autoFocus
                    required
                    margin="dense"
                    id="code"
                    name="code"
                    label="Код"
                    placeholder="Код"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button variant="contained" type="submit">
                    Продолжить
                </Button>
            </DialogActions>
        </Dialog>
    );
}

VerificationCheck.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default VerificationCheck;
