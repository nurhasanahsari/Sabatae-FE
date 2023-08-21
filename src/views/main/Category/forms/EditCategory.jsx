import { useState, useEffect } from 'react';

// material ui
import { Grid, Stack, Button, Typography, TextField, Alert, MenuItem, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// api
import { useDispatch, useSelector } from '@/store';
import { getCategories, editCategory } from '@/store/slices/Category';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

const EditCategory = ({ onClose, data }) => {
  const dispatch = useDispatch();

  // category
  const { loadingCreate, errorCreate } = useSelector((state) => state.category);

  // formik
  const [isDone, setIsDone] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup.string().min(2, 'Harus minimal 2 karakter').required('Wajib Diisi'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoadingCategory(true);
      setIsDone(false);
      await dispatch(editCategory(values, data?.id));
      setLoadingCategory(false);
      setIsDone(true);
    },
  });

  useEffect(() => {
    if (!errorCreate && !loadingCreate && isDone) {
      dispatch(getCategories());
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
        {loadingCategory ? (
          <Grid item xs={12} my={2} display="flex" alignContent="center" justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>Nama</Typography>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  placeholder="Nama"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  inputProps={{
                    autoComplete: 'new-password',
                    form: {
                      autoComplete: 'off',
                    },
                  }}
                />
              </Stack>
            </Grid>
            <Grid container justifyContent="end" sx={{ mt: 3 }}>
              <Grid item>
                <Stack direction="row" alignItems="flex-end" spacing={2}>
                  <Button variant="outlined" color="error" onClick={onClose} disabled={formik.isSubmitting && loadingCreate}>
                    Batal
                  </Button>
                  <LoadingButton loading={formik.isSubmitting && loadingCreate && loadingCategory} type="submit" variant="contained">
                    Simpan
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
};

export default EditCategory;
