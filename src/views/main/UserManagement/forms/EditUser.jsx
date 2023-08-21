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
import { getUsers, editUser } from '@/store/slices/user';

// project imports
import useAuth from '@/hooks/useAuth';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const EditUser = ({ data, onClose }) => {
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
    full_name: yup.string().min(2, 'Harus minimal 2 karakter').required('Wajib Diisi'),
    email: yup.string().email('Format Tidak Valid').required('Wajib Diisi'),
    role: yup.string().notOneOf(['0'], 'Anda harus memilih peran untuk pengguna ini').nullable().required('Wajib Diisi'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      full_name: data?.full_name || '',
      email: data?.email || '',
      password: data?.password || '',
      role: data?.role || '0',
      id_client: user?.id,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsDone(false);
      await dispatch(editUser(values, data?.id));
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
            <TextField
              fullWidth
              id="full_name"
              name="full_name"
              placeholder="Nama"
              value={formik.values.full_name}
              onChange={formik.handleChange}
              error={formik.touched.full_name && Boolean(formik.errors.full_name)}
              helperText={formik.touched.full_name && formik.errors.full_name}
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
              disabled={data?.id === '0c3b95d1-2d81-4e79-8a8f-d25ccdbca13f'}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography>Email</Typography>
            <TextField
              fullWidth
              id="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
              disabled={data?.id === '0c3b95d1-2d81-4e79-8a8f-d25ccdbca13f'}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography>Peran</Typography>
            <TextField
              name="role"
              defaultValue="0"
              select
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
              disabled={data?.id === '0c3b95d1-2d81-4e79-8a8f-d25ccdbca13f'}
            >
              <MenuItem value="0" selected disabled>
                Pilih Role
              </MenuItem>
              <MenuItem value="01">Super Admin</MenuItem>
              <MenuItem value="02">Admin</MenuItem>
            </TextField>
          </Stack>
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

export default EditUser;
