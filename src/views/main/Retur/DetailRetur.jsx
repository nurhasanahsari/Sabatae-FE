// material-ui
import { Grid, Divider, Typography } from '@mui/material';

// third-party
import moment from 'moment';
import 'moment/dist/locale/id';
moment.locale('id');

const DetailRetur = ({ data }) => (
  <Grid container gap={1}>
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant="h5">ID Transaksi</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>:</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{data?.id}</Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Divider />
    </Grid>
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant="h5">Nama Barang</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>:</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>
            {data?.name} ({data?.id})
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Divider />
    </Grid>
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant="h5">Jumlah Barang</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>:</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{data?.qty}</Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Divider />
    </Grid>
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant="h5">Harga Satuan</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>:</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>Rp {parseInt(data?.price / data?.qty || 0)?.toLocaleString('id')}</Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Divider />
    </Grid>
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant="h5">Total Harga</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>:</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>Rp {parseInt(data?.price * data?.qty || 0)?.toLocaleString('id')}</Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Divider />
    </Grid>
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant="h5">Tanggal Retur</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>:</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{moment(data?.updated).format('DD MMMM YYYY - HH:mm')}</Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Divider />
    </Grid>
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant="h5">Alasan Retur</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>:</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{data?.reason}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default DetailRetur;
