import { useState, useEffect } from 'react';

// material ui
import {
  Grid,
  Stack,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  OutlinedInput,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TablePagination,
  TableCell,
  IconButton,
  CircularProgress,
} from '@mui/material';

// api
import { useDispatch, useSelector } from '@/store';
import { getTransactions } from '@/store/slices/transaction';

// project import
import MainCard from '@/ui-component/cards/MainCard';
import EnhancedTableHead from '@/ui-component/extended/EnhancedTableHead';
import { getComparator, stableSort, handleSearch, handleRequestSort } from '@/utils/tableHelper';
import AddSale from './forms/AddSale';

// assets
import { IconShoppingCart, IconSearch, IconTrash, IconDots, IconUserEdit } from '@tabler/icons-react';

// third-party
import moment from 'moment';
import 'moment/dist/locale/id';
moment.locale('id');

// Table Header
const headCells = [
  {
    id: 'no',
    numeric: false,
    label: 'No.',
    align: 'center',
  },
  {
    id: 'id',
    numeric: false,
    label: 'Kode Barang',
    align: 'center',
    sortable: false,
  },
  {
    id: 'name',
    numeric: false,
    label: 'Nama Barang',
    align: 'center',
    sortable: false,
  },
  {
    id: 'qty',
    numeric: false,
    label: 'Jumlah Barang',
    align: 'center',
    sortable: false,
  },
  {
    id: 'price',
    numeric: false,
    label: 'Harga',
    align: 'center',
    sortable: false,
  },
  {
    id: 'created',
    numeric: false,
    label: 'Tanggal Penjualan',
    align: 'center',
    sortable: true,
  },
];

const Purchase = () => {
  const dispatch = useDispatch();

  // data
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('none');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { transactionsSale, loadingTransaction } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(getTransactions(`?type=sale`));
  }, [dispatch]);

  useEffect(() => {
    setRows(transactionsSale);
  }, [transactionsSale]);

  // action dialog
  const [openAdd, setOpenAdd] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  // search
  const [search, setSearch] = useState('');

  useEffect(() => {
    handleSearch(search, setPage, ['name'], rows, setRows, transactionsSale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <Grid container gap={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Penjualan</Typography>
        </Grid>
        <Grid item xs={12}>
          <MainCard>
            <Stack gap={2}>
              <Stack direction="row" justifyContent="space-between">
                <OutlinedInput
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{ maxWidth: 300 }}
                  size="small"
                  placeholder="Cari"
                  endAdornment={
                    <InputAdornment position="end">
                      {search ? (
                        <IconButton color="error" onClick={() => setSearch('')}>
                          <IconTrash stroke={2} size="20px" />
                        </IconButton>
                      ) : (
                        <IconSearch stroke={2} size="20px" />
                      )}
                    </InputAdornment>
                  }
                />
                <Button
                  size="medium"
                  variant="contained"
                  endIcon={<IconShoppingCart />}
                  sx={{ width: 'fit-content', px: 3 }}
                  onClick={() => setOpenAdd(true)}
                >
                  Tambah Penjualan
                </Button>
              </Stack>

              {/* table */}
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                  <EnhancedTableHead
                    headCells={headCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={(e, property) => handleRequestSort(e, property, order, setOrder, orderBy, setOrderBy)}
                    rowCount={rows?.length}
                  />

                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        /** Make sure no display bugs if row isn't an OrderData object */
                        if (typeof row === 'number') return null;

                        return (
                          <TableRow hover key={index}>
                            <TableCell align="center" component="th" scope="row">
                              <>{page * rowsPerPage + index + 1}.</>
                            </TableCell>
                            <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                              {row?.id}
                            </TableCell>
                            <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                              {row?.name}
                            </TableCell>
                            <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                              {row?.qty}
                            </TableCell>
                            <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                              Rp {parseInt(row?.price)?.toLocaleString('id')}
                            </TableCell>
                            <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                              {moment(row?.created).format('DD MMMM YYYY')}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {rows.length === 0 && loadingTransaction ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : (
                      rows.length === 0 &&
                      !loadingTransaction && (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            <Typography variant="subtitle2">Tidak ada data tersedia</Typography>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* table pagination */}
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Stack>
          </MainCard>
        </Grid>
      </Grid>

      {/* dialog */}
      {/* add */}
      <Dialog open={openAdd} fullWidth aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Tambah Penjualan</DialogTitle>
        <DialogContent>
          <AddSale onClose={() => setOpenAdd(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Purchase;
