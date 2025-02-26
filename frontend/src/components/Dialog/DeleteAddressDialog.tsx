import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface DeleteAddressDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteAddressDialog = ({ open, onClose, onDelete }: DeleteAddressDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this address? This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onDelete} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAddressDialog;
