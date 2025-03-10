import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from "prop-types";



function AlertDialog({open, handleOpen, handleClose, dialogButtonText, dialogTitle, dialogContent, handleAction, actionButtonText}) {

    return (
        <Box>
            <Button variant="contained" onClick={handleOpen} sx = {{ textTransform: 'capitalize'}}>
                {dialogButtonText}
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-content'
            > 
                <DialogTitle id = 'dialog-title' sx = {{fontWeight: 'bold'}}>
                    {dialogTitle}
                </DialogTitle >

                <DialogContent>
                    <DialogContentText id = 'dialog-content'>
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button variant='contained' onClick={handleAction} sx={{ textTransform: 'capitalize'}}>
                        {actionButtonText}
                    </Button>
                    <Button variant='outlined' onClick = {handleClose} sx={{ textTransform: 'capitalize'}}>
                        Cancel
                    </Button>

                </DialogActions>
            </Dialog>
        </Box>
    );
}

AlertDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    dialogButtonText: PropTypes.string.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    dialogContent: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired,
    actionButtonText: PropTypes.string.isRequired
}

export default AlertDialog;