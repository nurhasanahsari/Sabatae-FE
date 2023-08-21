import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogContent, Stack } from '@mui/material';

import { LoadingButton } from '@mui/lab';

// ===============================|| UI DIALOG - SWEET ALERT ||=============================== //

export default function AlertDialog({ children, btnCancel, btnConfirm, open, onClose, onConfirm, loading }) {
  const theme = useTheme();
  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm" sx={{ '& .MuiPaper-root': { overflow: 'visible' }, zIndex: 99999 }}>
        {open && (
          <>
            <DialogContent sx={{ textAlign: 'center' }}>{children}</DialogContent>

            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              {onConfirm && (
                <LoadingButton loading={loading} variant="contained" size="small" onClick={onConfirm} sx={{ color: theme.palette.background.paper }}>
                  {btnConfirm || 'Ya'}
                </LoadingButton>
              )}
              <Button autoFocus onClick={onClose} variant="outlined" size="small" color="error" disabled={loading}>
                {btnCancel || 'Batal'}
              </Button>
            </Stack>
          </>
        )}
      </Dialog>
    </>
  );
}

AlertDialog.propTypes = {
  children: PropTypes.node,
  btnCancel: PropTypes.string,
  btnConfirm: PropTypes.string,
  open: PropTypes.bool,
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};
