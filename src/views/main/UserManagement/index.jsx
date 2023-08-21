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

// api
import { useDispatch, useSelector } from '@/store';
import { getUsers, deleteUser } from '@/store/slices/user';

// project import
import MainCard from '@/ui-component/cards/MainCard';
import EnhancedTableHead from '@/ui-component/extended/EnhancedTableHead';
import { getComparator, stableSort, handleSearch, handleRequestSort } from '@/utils/tableHelper';
import Chip from '@/ui-component/extended/Chip';
import EnhancedMenu from '@/ui-component/extended/EnhancedMenu';
import AlertDialog from '@/ui-component/extended/AlertDialog';
import AddUser from './forms/AddUser';
import EditUser from './forms/EditUser';
import ChangePassword from './forms/ChangePassword';

// assets
import { IconUserPlus, IconSearch, IconTrash, IconDots, IconUserEdit, IconKey } from '@tabler/icons-react';

// Table Header
const headCells = [
  {
    id: 'no',
    numeric: false,
    label: 'No.',
    align: 'center',
    flex: 2,
  },
  {
    id: 'full_name',
    numeric: false,
    label: 'Nama',
    align: 'center',
    sortable: false,
    flex: 1,
  },
  {
    id: 'email',
    numeric: false,
    label: 'Email',
    align: 'center',
    sortable: false,
  },
  {
    id: 'role',
    numeric: false,
    label: 'Peran',
    align: 'center',
    sortable: false,
  },
  {
    id: 'status',
    numeric: false,
    label: 'Status',
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

const UserManagement = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('semua');

  // action dialog
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // table
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('none');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  const { users, loadingUser, errorDelete, loadingDelete } = useSelector((state) => state.user);

  useEffect(() => {
    if (category === 'semua') {
      dispatch(getUsers());
    } else {
      dispatch(getUsers(`?role=${category}`));
    }
  }, [dispatch, category]);

  useEffect(() => {
    setRows(users);
  }, [users]);

  useEffect(() => {
    handleSearch(search, setPage, ['id', 'full_name', 'email'], rows, setRows, users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  // Action  button
  const [anchorEl2, setAnchorEl2] = useState(null);
  const openAction = Boolean(anchorEl2);
  const [selectedUser, setSelectedUser] = useState([]);
  const handleClickAction = (event, row) => {
    setAnchorEl2(event.currentTarget);
    setSelectedUser(row);
  };
  const handleCloseAction = () => {
    setAnchorEl2(null);
    setSelectedUser([]);
  };

  useEffect(() => {
    if (!errorDelete && !loadingDelete) {
      dispatch(getUsers());
      setOpenDeleteDialog(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorDelete, !loadingDelete]);

  return (
    <>
      <Grid container gap={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Manajemen Pengguna</Typography>
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
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <MenuItem value={'semua'}>Semua</MenuItem>
                  <MenuItem value="01">Super Admin</MenuItem>
                  <MenuItem value="02">Admin</MenuItem>
                </Select>
                <Button
                  size="medium"
                  variant="contained"
                  endIcon={<IconUserPlus />}
                  sx={{ width: 'fit-content', px: 3 }}
                  onClick={() => setOpenAdd(true)}
                >
                  Tambah Pengguna
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
                    {!loadingUser &&
                      stableSort(rows, getComparator(order, orderBy))
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
                                  <Typography variant="h6">{row?.full_name}</Typography>
                                  <Typography variant="caption">{row.id}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">{row?.email}</TableCell>
                              <TableCell align="center">{row?.role === '01' ? 'Super Admin' : 'Admin'}</TableCell>
                              <TableCell align="center">
                                {row.status === '99' && <Chip label="Menunggu Aktivasi" chipcolor="warning" size="small" variant="outlined" />}
                                {row.status === '01' && <Chip label="Aktif" chipcolor="success" size="small" variant="outlined" />}
                                {row.status === '02' && <Chip label="Non-Aktif" chipcolor="error" size="small" variant="outlined" />}
                              </TableCell>
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
                                    Ubah User
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      setAnchorEl2(null);
                                      setOpenChangePassword(true);
                                    }}
                                    disableRipple
                                  >
                                    <IconKey color={theme.palette.info.main} stroke={1.5} style={{ marginRight: 5 }} />
                                    Ganti Password
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      setAnchorEl2(null);
                                      setOpenDeleteDialog(true);
                                    }}
                                    disableRipple
                                  >
                                    <IconTrash color={theme.palette.error.main} stroke={1.5} style={{ marginRight: 5 }} />
                                    Hapus User
                                  </MenuItem>
                                </EnhancedMenu>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    {loadingUser ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : (
                      rows.length === 0 &&
                      !loadingUser && (
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
        <DialogTitle id="alert-dialog-title">Tambah Pengguna</DialogTitle>
        <DialogContent>
          <AddUser onClose={() => setOpenAdd(false)} />
        </DialogContent>
      </Dialog>

      {/* edit */}
      <Dialog open={openEdit} fullWidth aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Ubah Pengguna</DialogTitle>
        <DialogContent>
          <EditUser
            data={selectedUser}
            onClose={() => {
              setOpenEdit(false);
              setSelectedUser([]);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* change Password */}
      <Dialog open={openChangePassword} fullWidth aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Ubah Password Pengguna</DialogTitle>
        <DialogContent>
          <ChangePassword
            data={selectedUser}
            onClose={() => {
              setOpenChangePassword(false);
              setSelectedUser([]);
            }}
          />
        </DialogContent>
      </Dialog>

      {openDeleteDialog && (
        <AlertDialog
          loading={loadingDelete}
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={async () => {
            await dispatch(deleteUser(selectedUser?.id));
          }}
        >
          <Typography>'Anda yakin ingin menghapus persediaan ini?</Typography>
        </AlertDialog>
      )}
    </>
  );
};

export default UserManagement;
