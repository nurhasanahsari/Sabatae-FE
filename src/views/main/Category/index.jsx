import { useState, useEffect } from 'react';

// material ui
import { useTheme } from '@mui/system';
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
  MenuItem,
  CircularProgress,
} from '@mui/material';

// api
import { useDispatch, useSelector } from '@/store';
import { getCategories, deleteCategory } from '@/store/slices/category';

// project import
import MainCard from '@/ui-component/cards/MainCard';
import EnhancedTableHead from '@/ui-component/extended/EnhancedTableHead';
import { getComparator, stableSort, handleSearch, handleRequestSort } from '@/utils/tableHelper';
import EnhancedMenu from '@/ui-component/extended/EnhancedMenu';
import AlertDialog from '@/ui-component/extended/AlertDialog';
import AddCategory from './forms/AddCategory';
import EditCategory from './forms/EditCategory';

// assets
import { IconEdit, IconSearch, IconTrash, IconDots, IconPlus } from '@tabler/icons-react';

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
    id: 'action',
    numeric: false,
    label: 'Aksi',
    align: 'center',
    sortable: false,
  },
];

const Category = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // data
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('none');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { categories, loadingCategory, loadingDelete, errorDelete } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setRows(categories);
  }, [categories]);

  // action dialog
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const openAction = Boolean(anchorEl2);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleClickAction = (event, row) => {
    setAnchorEl2(event.currentTarget);
    setSelectedCategory(row);
  };
  const handleCloseAction = () => {
    setAnchorEl2(null);
    setSelectedCategory([]);
  };

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
    handleSearch(search, setPage, ['name'], rows, setRows, categories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (!errorDelete && !loadingDelete) {
      dispatch(getCategories());
      setOpenDeleteDialog(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorDelete, !loadingDelete]);

  return (
    <>
      <Grid container gap={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Kategori</Typography>
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
                  endIcon={<IconPlus />}
                  sx={{ width: 'fit-content', px: 3 }}
                  onClick={() => setOpenAdd(true)}
                >
                  Tambah Kategori
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
                            <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                              {row?.name}
                            </TableCell>{' '}
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
                                  <IconEdit color={theme.palette.info.main} stroke={1.5} style={{ marginRight: 5 }} />
                                  Ubah Kategori
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    setAnchorEl2(null);
                                    setOpenDeleteDialog(true);
                                  }}
                                  disableRipple
                                >
                                  <IconTrash color={theme.palette.error.main} stroke={1.5} style={{ marginRight: 5 }} />
                                  Hapus Kategori
                                </MenuItem>
                              </EnhancedMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {rows.length === 0 && loadingCategory ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : (
                      rows.length === 0 &&
                      !loadingCategory && (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
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
        <DialogTitle id="alert-dialog-title">Tambah Kategori</DialogTitle>
        <DialogContent>
          <AddCategory onClose={() => setOpenAdd(false)} />
        </DialogContent>
      </Dialog>

      {/* edit */}
      <Dialog open={openEdit} fullWidth aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Ubah Kategori</DialogTitle>
        <DialogContent>
          <EditCategory
            data={selectedCategory}
            onClose={() => {
              setOpenEdit(false);
              setSelectedCategory([]);
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
            await dispatch(deleteCategory(selectedCategory?.id));
          }}
        >
          <Typography>Anda yakin ingin menghapus kategori ini?</Typography>
        </AlertDialog>
      )}
    </>
  );
};

export default Category;
