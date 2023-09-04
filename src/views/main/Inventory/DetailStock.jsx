// material-ui
import { Grid, Divider, Typography } from '@mui/material';

const DetailStock = ({ data }) => {
  return (
    <Grid container gap={1}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h5">ID Barang</Typography>
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
            <Typography>{data?.name}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h5">Stock Barang</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>{data?.stock}</Typography>
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
            <Typography>Rp {parseInt(data?.price_per_item || 0)?.toLocaleString('id')}</Typography>
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
            <Typography>Rp {parseInt(data?.total_price || 0)?.toLocaleString('id')}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h5">Keuntungan</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>Rp {parseInt(data?.profit || 0)?.toLocaleString('id')}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h5">Kerugian</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>Rp {parseInt(data?.deficit || 0)?.toLocaleString('id')}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h5">Total Modal</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>Rp {parseInt(data?.capital || 0)?.toLocaleString('id')}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailStock;
