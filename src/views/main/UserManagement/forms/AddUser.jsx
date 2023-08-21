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
import { getUsers, createUser } from '@/store/slices/user';

// project imports
import useAuth from '@/hooks/useAuth';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AddUser = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { errorCreate, loadingCreate } = useSelector((state) => state.user);

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
    password: yup.string().min(5, 'Harus minimal 5 karakter').required('Wajib Diisi'),
    role: yup.string().notOneOf(['0'], 'Anda harus memilih peran untuk pengguna ini').nullable().required('Wajib Diisi'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      full_name: '',
      email: '',
      password: '',
      role: '0',
      id_client: user?.id,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsDone(false);
      await dispatch(createUser(values));
      setIsDone(true);
    },
  });

  useEffect(() => {
    if (!errorCreate && !loadingCreate && isDone) {
      dispatch(getUsers());
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDone, errorCreate, loadingCreate]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        {errorCreate && (
          <Grid item xs={12}>
            <Alert severity="error">{errorCreate?.message}</Alert>
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
            />
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
          />
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
              <Button variant="outlined" color="error" onClick={onClose} disabled={formik.isSubmitting && loadingCreate}>
                Batal
              </Button>
              <LoadingButton loading={formik.isSubmitting && loadingCreate} type="submit" variant="contained">
                Tambah
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddUser;
