import { useState, useEffect } from 'react';

// material ui
import { useTheme } from '@mui/system';
import { Grid, Stack, Button, Typography, TextField, Alert, MenuItem, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// api
import { useDispatch, useSelector } from '@/store';
import { getInventories, createInventory } from '@/store/slices/inventory';
import { getCategories } from '@/store/slices/category';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

const AddInventory = ({ onClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // category
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState(0);
  const [openAlertCategory, setOpenAlertCategory] = useState(false);
  const { categories, loadingCategory } = useSelector((state) => state.category);

  const handleChange = (event) => {
    setSelectCategory(event.target.value);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setCategory(categories);
  }, [categories]);

  // formik
  const [isDone, setIsDone] = useState(false);
  const [loadingInventory, setLoadingInventory] = useState(false);
  const { errorCreate, loadingCreate } = useSelector((state) => state.inventory);

  const validationSchema = yup.object().shape({
    name: yup.string().min(2, 'Harus minimal 2 karakter').required('Wajib Diisi'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoadingInventory(true);
      setIsDone(false);
      if (selectCategory === 0) {
        setLoadingInventory(false);
        return setOpenAlertCategory(true);
      } else {
        await dispatch(createInventory(values));
      }
      setLoadingInventory(false);
      setIsDone(true);
    },
  });

  useEffect(() => {
    if (!errorCreate && !loadingCreate && isDone) {
      dispatch(getInventories());
      setSelectCategory(0);
      setLoadingInventory(false);
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDone, errorCreate, loadingCreate]);

  // set field formik
  useEffect(() => {
    formik.setFieldValue('id_category', selectCategory);
  }, [selectCategory]);

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
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>Kategori</Typography>
                <TextField name="role" defaultValue="0" select value={selectCategory} onChange={handleChange}>
                  <MenuItem value="0" selected disabled>
                    Pilih Kategori
                  </MenuItem>
                  {category?.map((item, index) => (
                    <MenuItem value={item?.id} key={index} sx={{ textTransform: 'capitalize' }}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              {openAlertCategory && (
                <Typography variant="h6" sx={{ mt: 1, ml: 2, color: theme.palette.error.main }}>
                  Silahkan pilih kategori
                </Typography>
              )}
            </Grid>
            <Grid container justifyContent="end" sx={{ mt: 3 }}>
              <Grid item>
                <Stack direction="row" alignItems="flex-end" spacing={2}>
                  <Button variant="outlined" color="error" onClick={onClose} disabled={formik.isSubmitting && loadingCreate}>
                    Batal
                  </Button>
                  <LoadingButton loading={formik.isSubmitting && loadingCreate && loadingInventory} type="submit" variant="contained">
                    Tambah
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

export default AddInventory;
