import { useState, useEffect } from 'react';

// material ui
import {
  Grid,
  Stack,
  Typography,
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
  Select,
  MenuItem,
} from '@mui/material';

// api
import { useDispatch, useSelector } from '@/store';
import { getTransactions } from '@/store/slices/transaction';

// project import
import MainCard from '@/ui-component/cards/MainCard';
import EnhancedTableHead from '@/ui-component/extended/EnhancedTableHead';
import { getComparator, stableSort, handleSearch, handleRequestSort } from '@/utils/tableHelper';
import ExportToExcel from '@/ui-component/ExportToExcel';

// assets
import { IconSearch, IconTrash } from '@tabler/icons-react';

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
    label: 'Kode Transaksi',
    align: 'center',
    sortable: false,
  },
  {
    id: 'type',
    numeric: false,
    label: 'Tipe',
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
    id: 'created',
    numeric: false,
    label: 'Tanggal Transaksi',
    align: 'center',
    sortable: true,
  },
];

const Report = () => {
  const dispatch = useDispatch();
  const date = new Date();

  // inventory
  const [selectType, setSelectType] = useState('semua');

  useEffect(() => {
    setSelectType('semua');
  }, []);

  // data
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('none');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { transactions, transactionsRetur, transactionsSale, transactionsPurchase, loadingTransaction } = useSelector((state) => state.transaction);

  useEffect(() => {
    if (selectType === 'semua') {
      dispatch(getTransactions());
    } else {
      dispatch(getTransactions(`?type=${selectType}`));
    }
  }, [dispatch, selectType, setSelectType]);

  useEffect(() => {
    if (selectType === 'semua') {
      setRows(transactions);
    } else if (selectType === 'purchase') {
      setRows(transactionsPurchase);
    } else if (selectType === 'sale') {
      setRows(transactionsSale);
    } else {
      setRows(transactionsRetur);
    }
  }, [transactions, transactionsPurchase, transactionsSale, transactionsRetur, selectType]);

  // action dialog
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
    if (selectType === 'semua') {
      handleSearch(search, setPage, ['id', 'name'], rows, setRows, transactions);
    } else if (selectType === 'purchase') {
      handleSearch(search, setPage, ['id', 'name'], rows, setRows, transactionsPurchase);
    } else if (selectType === 'sale') {
      handleSearch(search, setPage, ['id', 'name'], rows, setRows, transactionsSale);
    } else {
      handleSearch(search, setPage, ['id', 'name'], rows, setRows, transactionsRetur);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Grid container gap={2}>
      <Grid item xs={12}>
        <Typography variant="h2">Data Laporan</Typography>
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
              <Select
                size="small"
                sx={{ width: '15%' }}
                labelId="filter"
                id="filter"
                value={selectType}
                onChange={(event) => setSelectType(event.target.value)}
              >
                <MenuItem value="semua">Semua</MenuItem>
                <MenuItem value="purchase">Pembelian</MenuItem>
                <MenuItem value="sale">Penjualan</MenuItem>
                <MenuItem value="retur">Retur Barang</MenuItem>
              </Select>

              <ExportToExcel
                loading={loadingTransaction}
                apiData={rows?.map((i) => ({
                  id: i.id,
                  type: i.type === 'purchase' ? 'Pembelian' : i.type === 'sale' ? 'Penjualan' : 'Retur',
                  id_client: i.id_client,
                  id_product: i.id_product,
                  name: i.name,
                  qty: i.qty,
                  price: i.price,
                  reason: i.reason || '-',
                  created: moment(i.created).format('DD MMMM YYYY - HH:MM'),
                  updated: moment(i.updated).format('DD MMMM YYYY - HH:MM'),
                }))}
                customHeader={[
                  'ID Transaksi',
                  'Tipe Transaksi',
                  'ID Penanggung Jawab',
                  'ID Produk',
                  'Nama Produk',
                  'Jumlah',
                  'Total Harga',
                  'Alasan Retur',
                  'Tanggal Transaksi Dibuat',
                  'Tanggal Transaksi Diubah',
                ]}
                fileName={`Laporan Transaksi Sabatae ${moment(date).format('DD MMMM YYYY')}`}
              />
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
                            {row?.type === 'purchase' && 'Pembelian'}
                            {row?.type === 'sale' && 'Penjualan'}
                            {row?.type === 'retur' && 'Retur'}
                          </TableCell>
                          <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                            <Stack direction="column">
                              {row?.name}
                              <Typography variant="caption">{row?.id_product}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                            {moment(row?.type === 'retur' ? row?.updated : row?.created).format('DD MMMM YYYY - HH:MM')}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {rows.length === 0 && loadingTransaction ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.length === 0 &&
                    !loadingTransaction && (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
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
  );
};

export default Report;
