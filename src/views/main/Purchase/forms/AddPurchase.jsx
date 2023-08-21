import { useState, useEffect } from 'react';

// material ui
import { useTheme } from '@mui/system';
import { Grid, Stack, Button, Typography, TextField, Alert, MenuItem, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// api
import { useDispatch, useSelector } from '@/store';
import { getTransactions, createTransaction } from '@/store/slices/transaction';
import { getInventories } from '@/store/slices/inventory';

// project imports
import useAuth from '@/hooks/useAuth';

// third party
import { useFormik } from 'formik';

const AddPurchase = ({ onClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useAuth();

  // inventory
  const [selectInventory, setSelectInventory] = useState(0);
  const [openAlertQty, setOpenAlertQty] = useState(false);
  const [openAlertPrice, setOpenAlertPrice] = useState(false);
  const [openAlertInventory, setOpenAlertInventory] = useState(false);
  const { inventories, loadingInventory } = useSelector((state) => state.inventory);

  const handleChange = (event) => {
    setSelectInventory(event.target.value);
    setOpenAlertInventory(false);
  };

  useEffect(() => {
    dispatch(getInventories());
    setOpenAlertInventory(false);
    setOpenAlertQty(false);
    setOpenAlertPrice(false);
  }, [dispatch]);

  // category
  const { loadingCreate, errorCreate } = useSelector((state) => state.transaction);

  // formik
  const [isDone, setIsDone] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id_product: selectInventory || '',
      qty: 0,
      price: 0,
      type: 'purchase',
      id_client: user?.id,
    },
    onSubmit: async (values) => {
      setLoadingCategory(true);
      setIsDone(false);
      if (selectInventory === 0) {
        setOpenAlertInventory(true);
      } else if (values?.qty === 0) {
        setOpenAlertQty(true);
      } else if (values?.price === 0) {
        setOpenAlertPrice(true);
      } else {
        await dispatch(createTransaction(values));
        setIsDone(true);
      }
      setLoadingCategory(false);
    },
  });

  useEffect(() => {
    if (!errorCreate && !loadingCreate && isDone) {
      dispatch(getTransactions(`?type=purchase`));
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
        {loadingCategory || loadingInventory ? (
          <Grid item xs={12} my={2} display="flex" alignContent="center" justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>Barang</Typography>
                <TextField name="role" defaultValue="0" select value={selectInventory} onChange={handleChange}>
                  <MenuItem value="0" selected disabled>
                    Pilih barang
                  </MenuItem>
                  {inventories?.map((item, index) => (
                    <MenuItem value={item?.id} key={index} sx={{ textTransform: 'capitalize' }}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              {openAlertInventory && (
                <Typography variant="h6" sx={{ mt: 1, ml: 2, color: theme.palette.error.main }}>
                  Silahkan pilih barang
                </Typography>
              )}
            </Grid>
            {selectInventory !== 0 && (
              <>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <Typography>Jumlah</Typography>
                    <TextField
                      fullWidth
                      type="number"
                      id="qty"
                      name="qty"
                      placeholder="Jumlah"
                      value={formik.values.qty}
                      onChange={formik.handleChange}
                      error={formik.touched.qty && Boolean(formik.errors.qty)}
                      helperText={formik.touched.qty && formik.errors.qty}
                      inputProps={{
                        autoComplete: 'new-password',
                        form: {
                          autoComplete: 'off',
                        },
                      }}
                    />
                  </Stack>
                  {openAlertQty && (
                    <Typography variant="h6" sx={{ mt: 1, ml: 2, color: theme.palette.error.main }}>
                      Masukkan jumlah pembelian
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <Typography>Harga</Typography>
                    <TextField
                      fullWidth
                      type="number"
                      id="price"
                      name="price"
                      placeholder="Jumlah"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      error={formik.touched.price && Boolean(formik.errors.price)}
                      helperText={formik.touched.price && formik.errors.price}
                      inputProps={{
                        autoComplete: 'new-password',
                        form: {
                          autoComplete: 'off',
                        },
                      }}
                    />
                  </Stack>
                  {openAlertPrice && (
                    <Typography variant="h6" sx={{ mt: 1, ml: 2, color: theme.palette.error.main }}>
                      Masukkan harga pembelian
                    </Typography>
                  )}
                </Grid>
              </>
            )}
            <Grid container justifyContent="end" sx={{ mt: 3 }}>
              <Grid item>
                <Stack direction="row" alignItems="flex-end" spacing={2}>
                  <Button variant="outlined" color="error" onClick={onClose} disabled={formik.isSubmitting && loadingCreate}>
                    Batal
                  </Button>
                  <LoadingButton loading={formik.isSubmitting} type="submit" variant="contained">
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

export default AddPurchase;
