import { useState, useEffect } from 'react';

import {
  Grid,
  Stack,
  Card,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  OutlinedInput,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TablePagination,
  TableCell,
  IconButton,
  Select,
  Alert,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// api
import { useDispatch, useSelector } from '@/store';
import { getUsers, changePassword } from '@/store/slices/user';

// project imports
import useAuth from '@/hooks/useAuth';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ChangePassword = ({ data, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { errorUpdate, loadingUpdate } = useSelector((state) => state.user);

  const [isDone, setIsDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = yup.object().shape({
    password: yup.string().min(5, 'Harus minimal 5 karakter').required('Wajib Diisi'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: data?.password || '',
      id_client: user?.id,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsDone(false);
      await dispatch(changePassword(values, data?.id));
      setIsDone(true);
    },
  });

  useEffect(() => {
    if (!errorUpdate && !loadingUpdate && isDone) {
      dispatch(getUsers());
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDone, errorUpdate, loadingUpdate]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        {errorUpdate && (
          <Grid item xs={12}>
            <Alert severity="error">{errorUpdate?.message}</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography>Nama</Typography>
            <TextField fullWidth id="full_name" name="full_name" placeholder="Nama" value={data.full_name} disabled />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography>Password</Typography>
          <TextField
            fullWidth
            id="password"
            name="password"
            placeholder="password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              autoComplete: 'new-password',
              form: {
                autoComplete: 'off',
              },
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
            autoFocus
          />
        </Grid>
        <Grid container justifyContent="end" sx={{ mt: 3 }}>
          <Grid item>
            <Stack direction="row" alignItems="flex-end" spacing={2}>
              <Button variant="outlined" color="error" onClick={onClose} disabled={formik.isSubmitting && loadingUpdate}>
                Batal
              </Button>
              <LoadingButton loading={formik.isSubmitting && loadingUpdate} type="submit" variant="contained">
                Simpan
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ChangePassword;
