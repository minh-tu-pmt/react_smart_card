/* eslint-disable jsx-a11y/no-autofocus */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

function Modal({ title, onSave, children }, ref) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useImperativeHandle(
        ref,
        () => ({
            open,
            setOpen
        }),
        []
    );

    return (
        <div>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="md">
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {title || 'Modal title'}
                </BootstrapDialogTitle>
                <DialogContent dividers>{children}</DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={onSave || null}>Save</Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

export default forwardRef(Modal);
