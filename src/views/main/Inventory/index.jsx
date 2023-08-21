import { useState, useEffect } from 'react';

// material ui
import { useTheme } from '@mui/system';
import {
  Grid,
  Stack,
  Card,
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
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';

import { useDispatch, useSelector } from '@/store';
import { getInventories, deleteInventory } from '@/store/slices/inventory';
import { getCategories } from '@/store/slices/category';

// project import
import MainCard from '@/ui-component/cards/MainCard';
import EnhancedTableHead from '@/ui-component/extended/EnhancedTableHead';
import { getComparator, stableSort, handleSearch, handleRequestSort } from '@/utils/tableHelper';
import EnhancedMenu from '@/ui-component/extended/EnhancedMenu';
import AlertDialog from '@/ui-component/extended/AlertDialog';
import AddInventory from './forms/AddInventory';
import EditInventory from './forms/EditInventory';

// assets
import { IconSearch, IconTrash, IconDots, IconUserEdit, IconClipboardPlus } from '@tabler/icons-react';

// Table Header
const headCells = [
  {
    id: 'no',
    numeric: false,
    label: 'No.',
    align: 'center',
  },
  {
    id: 'name',
    numeric: false,
    label: 'Nama',
    align: 'center',
    sortable: false,
  },
  {
    id: 'category',
    numeric: false,
    label: 'Kategory',
    align: 'center',
    sortable: false,
  },
  {
    id: 'stock',
    numeric: false,
    label: 'Stok',
    align: 'center',
    sortable: false,
  },
  {
    id: 'action',
    numeric: false,
    label: 'Aksi',
    align: 'center',
    sortable: false,
  },
];

const Inventory = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // category
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState('semua');
  const { categories, loadingCategory } = useSelector((state) => state.category);

  useEffect(() => {
    setSelectCategory('semua');
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setCategory(categories);
  }, [categories]);

  // table data
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('none');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  const { inventories, loadingInventory, loadingDelete, errorDelete } = useSelector((state) => state.inventory);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (selectCategory === 'semua') {
      dispatch(getInventories());
    } else {
      dispatch(getInventories(`?id_category=${selectCategory}`));
    }
  }, [dispatch, selectCategory, setSelectCategory]);

  useEffect(() => {
    setRows(inventories);
  }, [inventories]);

  // Action  button
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const openAction = Boolean(anchorEl2);
  const [selectedInventory, setSelectedInventory] = useState([]);

  const handleClickAction = (event, row) => {
    setAnchorEl2(event.currentTarget);
    setSelectedInventory(row);
  };
  const handleCloseAction = () => {
    setAnchorEl2(null);
    setSelectedInventory([]);
  };

  // search
  const [search, setSearch] = useState('');

  useEffect(() => {
    handleSearch(search, setPage, ['id', 'name', 'stock'], rows, setRows, inventories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (!errorDelete && !loadingDelete) {
      if (selectCategory === 'semua') {
        dispatch(getInventories());
      } else {
        dispatch(getInventories(`?id_category=${selectCategory}`));
      }
      setOpenDeleteDialog(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorDelete, !loadingDelete]);

  return (
    <>
      <Grid container gap={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Persediaan</Typography>
        </Grid>

        <Grid item xs={12}>
          <MainCard sx={{ boxShadow: '0px 0px 14px 0px rgba(0,0,0,0.05)', p: 2 }}>
            {loadingCategory ? (
              <Grid item xs={12} my={2} display="flex" alignContent="center" justifyContent="center">
                <CircularProgress />
              </Grid>
            ) : (
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
                    value={selectCategory}
                    onChange={(event) => setSelectCategory(event.target.value)}
                  >
                    <MenuItem value={'semua'}>Semua</MenuItem>
                    {category?.map((item, index) => (
                      <MenuItem value={item?.id} key={index} sx={{ textTransform: 'capitalize' }}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    size="medium"
                    variant="contained"
                    endIcon={<IconClipboardPlus />}
                    sx={{ width: 'fit-content', px: 3 }}
                    onClick={() => setOpenAdd(true)}
                  >
                    Tambah Persediaan
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
                      rowCount={rows.length}
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
                                <>{page * 10 + index + 1}.</>
                              </TableCell>
                              <TableCell>
                                <Stack alignItems="center" gap={1}>
                                  <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
                                    {row?.name}
                                  </Typography>
                                  <Typography variant="caption">{row.id}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                                {row?.category}
                              </TableCell>
                              <TableCell align="center">{parseInt(row?.stock)}</TableCell>
                              <TableCell align="center">
                                <IconButton
                                  size="large"
                                  id="demo-customized-button"
                                  aria-controls={openAction ? 'demo-customized-menu' : undefined}
                                  aria-haspopup="true"
                                  aria-expanded={openAction ? 'true' : undefined}
                                  // disableElevation
                                  onClick={(e) => handleClickAction(e, row)}
                                >
                                  <IconDots style={{ fontSize: '1.3rem' }} />
                                </IconButton>
                                <EnhancedMenu
                                  id="demo-customized-menu"
                                  MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                  }}
                                  anchorEl={anchorEl2}
                                  open={openAction}
                                  onClose={handleCloseAction}
                                >
                                  <MenuItem
                                    onClick={() => {
                                      setAnchorEl2(null);
                                      setOpenEdit(true);
                                    }}
                                    disableRipple
                                  >
                                    <IconUserEdit color={theme.palette.info.main} stroke={1.5} style={{ marginRight: 5 }} />
                                    Ubah Persediaan
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      setAnchorEl2(null);
                                      setOpenDeleteDialog(true);
                                    }}
                                    disableRipple
                                  >
                                    <IconTrash color={theme.palette.error.main} stroke={1.5} style={{ marginRight: 5 }} />
                                    Hapus Persediaan
                                  </MenuItem>
                                </EnhancedMenu>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {rows.length === 0 && loadingInventory ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            <CircularProgress />
                          </TableCell>
                        </TableRow>
                      ) : (
                        rows.length === 0 &&
                        !loadingInventory && (
                          <TableRow>
                            <TableCell colSpan={5} align="center">
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
            )}
          </MainCard>
        </Grid>
      </Grid>

      {/* dialog */}
      {/* add */}
      <Dialog open={openAdd} fullWidth aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Tambah Persediaan</DialogTitle>
        <DialogContent>
          <AddInventory onClose={() => setOpenAdd(false)} />
        </DialogContent>
      </Dialog>

      {/* edit */}
      <Dialog open={openEdit} fullWidth aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Ubah Persediaan</DialogTitle>
        <DialogContent>
          <EditInventory
            data={selectedInventory}
            onClose={() => {
              setOpenEdit(false);
              setSelectedInventory([]);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* delete  */}
      {openDeleteDialog && (
        <AlertDialog
          loading={loadingDelete}
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={async () => {
            await dispatch(deleteInventory(selectedInventory?.id));
          }}
        >
          <Typography>Anda yakin ingin menghapus persediaan ini?</Typography>
        </AlertDialog>
      )}
    </>
  );
};

export default Inventory;
