import { useState, useEffect } from 'react';

// material ui
import { useTheme } from '@mui/system';
import { Grid, Stack, Button, Typography, TextField, Alert, MenuItem, CircularProgress, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// api
import { useDispatch, useSelector } from '@/store';
import { getTransactionsRetur, getTransactions, createTransactionRetur } from '@/store/slices/transaction';
import { getInventories } from '@/store/slices/inventory';

// project imports
import useAuth from '@/hooks/useAuth';

// third party
import { useFormik } from 'formik';

// assets
import { IconSearch } from '@tabler/icons-react';

const AddRetur = ({ onClose }) => {
  const theme = useTheme();
  const dispatch2 = useDispatch();

  // search transaction
  const [searchKey, setSearchKey] = useState(false);
  const [idSale, setIdSale] = useState('');
  const [transactionRetur, setTransactionRetur] = useState({});
  const [openAlertReason, setOpenAlertReason] = useState(false);
  const { transactionsRetur2, loadingTransactionRetur, loadingCreate, errorCreate } = useSelector((state) => state.transaction);

  const handleChangeIdSale = (event) => {
    setIdSale(event.target.value);
  };

  const handleSearchTransaction = async () => {
    setSearchKey(true);
    await dispatch2(getTransactionsRetur(`?id=${idSale}`));
  };

  useEffect(() => {
    if (searchKey) {
      setTransactionRetur(transactionsRetur2);
    }
    setOpenAlertReason(false);
  }, [transactionsRetur2]);

  // formik
  const [isDone, setIsDone] = useState(false);
  const [loadingTransaction2, setLoadingTransaction2] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id_sale: idSale || '',
      reason: '',
    },
    onSubmit: async (values) => {
      setLoadingTransaction2(true);
      setIsDone(false);
      if (formik?.values?.reason === '') {
        setOpenAlertReason(true);
      } else {
        await dispatch2(createTransactionRetur(values));
        setIsDone(true);
      }
      setSearchKey(false);
      setLoadingTransaction2(false);
    },
  });

  useEffect(() => {
    if (!errorCreate && !loadingCreate && isDone) {
      dispatch2(getTransactions(`?type=retur`));
      setTransactionRetur({});
      setIdSale('');
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
            <Typography>Kode Transaksi</Typography>
            <TextField
              fullWidth
              id="id_sale"
              name="id_sale"
              placeholder="Kode Transaksi"
              onChange={handleChangeIdSale}
              disabled={loadingTransaction2}
              InputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    size="large"
                    disabled={idSale === ''}
                    onClick={handleSearchTransaction}
                    sx={{ cursor: 'pointer' }}
                  >
                    {loadingTransactionRetur ? <CircularProgress size={30} /> : <IconSearch size={30} />}
                  </IconButton>
                ),
              }}
            />
            {transactionsRetur2 === 'Data tidak ditemukan' && (
              <Typography variant="h6" textAlign="center" sx={{ color: theme.palette.error.main }}>
                Transaksi tidak ditemukan
              </Typography>
            )}
          </Stack>
        </Grid>
        {transactionRetur?.id !== undefined && (
          <>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>Nama</Typography>
                <TextField fullWidth id="name" name="name" placeholder="Jumlah" value={transactionRetur?.name || ''} disabled />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography>Jumlah</Typography>
                    <TextField fullWidth id="name" name="name" placeholder="Jumlah" value={transactionRetur?.qty || ''} disabled />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography>Harga</Typography>
                    <TextField fullWidth id="name" name="name" placeholder="Harga" value={transactionRetur?.price || ''} disabled />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>Alasan</Typography>
                <TextField
                  fullWidth
                  id="reason"
                  name="reason"
                  placeholder="Alasan"
                  value={formik.values.reason}
                  onChange={formik.handleChange}
                  error={formik.touched.reason && Boolean(formik.errors.reason)}
                  helperText={formik.touched.reason && formik.errors.reason}
                  disabled={loadingTransaction2}
                  inputProps={{
                    autoComplete: 'new-password',
                    form: {
                      autoComplete: 'off',
                    },
                  }}
                />
              </Stack>
              {openAlertReason && (
                <Typography variant="h6" sx={{ mt: 1, ml: 2, color: theme.palette.error.main }}>
                  Masukkan alasan retur
                </Typography>
              )}
            </Grid>
          </>
        )}
        <Grid container justifyContent="end" sx={{ mt: 3 }}>
          <Grid item>
            <Stack direction="row" alignItems="flex-end" spacing={2}>
              <Button variant="outlined" color="error" onClick={onClose} disabled={formik.isSubmitting || loadingCreate || loadingTransaction2}>
                Batal
              </Button>
              <LoadingButton
                loading={formik.isSubmitting}
                disabled={loadingTransaction2 || transactionsRetur2 === 'Data tidak ditemukan' || formik?.values?.reason === ''}
                type="submit"
                variant="contained"
              >
                Tambah
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
        {/* </>
        )} */}
      </Grid>
    </form>
  );
};

export default AddRetur;
