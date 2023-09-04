import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Box, Grid, Stack, Typography, CircularProgress } from '@mui/material';

// project imports
import useAuth from '@/hooks/useAuth';
import MainCard from '@/ui-component/cards/MainCard';

// api
import { useDispatch, useSelector } from '@/store';
import { getSummary } from '@/store/slices/summary';

// assets
import IcMoney from '@/assets/images/pages/ic_money.png';
import IcIncome from '@/assets/images/pages/ic_income.png';
import IcProfit from '@/assets/images/pages/ic_profit.png';
import IcDeficit from '@/assets/images/pages/ic_deficit.png';

const Dashboard = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user } = useAuth();

  // data
  const [data, setData] = useState();
  const { summary, loadingSummary } = useSelector((state) => state.summary);

  useEffect(() => {
    dispatch(getSummary());
  }, [dispatch]);

  useEffect(() => {
    setData(summary);
  }, [summary]);

  return (
    <Grid container gap={4}>
      <Grid item xs={12}>
        <Typography variant="h2">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} display="flex" alignContent="center" justifyContent="center" sx={{ height: '60vh' }}>
        <Stack display="flex" alignContent="center" justifyContent="center" sx={{ height: '100%', width: '100%' }} gap={5}>
          {/* 1 */}
          <Stack direction="row" justifyContent="center" gap={2}>
            <MainCard
              sx={{ width: '100%', cursor: 'pointer' }}
              onClick={() => navigate(`/${user?.role === '01' ? 'super-admin' : 'admin'}/inventory`)}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                <Stack gap={2} justifyItems="center">
                  {loadingSummary ? (
                    <Typography variant="h2">
                      <CircularProgress />
                    </Typography>
                  ) : (
                    <Typography variant="h2">Rp {parseInt(data?.total_purchase || 0)?.toLocaleString('id')}</Typography>
                  )}
                  <Stack>
                    <Typography variant="h4">Modal</Typography>
                    <Typography variant="caption">Total uang modal</Typography>
                  </Stack>
                </Stack>
                <Box component="img" src={IcIncome} width={80} height={80} />
              </Stack>
            </MainCard>
          </Stack>
          {/* 2 */}
          <Stack direction="row" justifyContent="center" gap={2}>
            <MainCard sx={{ width: '100%' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                <Stack gap={2} justifyItems="center">
                  {loadingSummary ? (
                    <Typography variant="h2">
                      <CircularProgress />
                    </Typography>
                  ) : (
                    <Typography variant="h2">
                      Rp {parseInt(data?.total_sale - data?.total_purchase - data?.total_retur || 0)?.toLocaleString('id')}
                    </Typography>
                  )}
                  <Stack>
                    <Typography variant="h4">Total Keuntungan</Typography>
                    <Typography variant="caption">Jumlah keuntungan dari penjualan barang</Typography>
                  </Stack>
                </Stack>
                <Box component="img" src={IcMoney} width={80} height={80} />
              </Stack>
            </MainCard>
            <MainCard sx={{ width: '100%', cursor: 'pointer' }} onClick={() => navigate(`/${user?.role === '01' ? 'super-admin' : 'admin'}/retur`)}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                <Stack gap={2} justifyItems="center">
                  {loadingSummary ? (
                    <Typography variant="h2">
                      <CircularProgress />
                    </Typography>
                  ) : (
                    <Typography variant="h2">Rp {data?.total_retur < 0 ? 0 : parseInt(data?.total_retur || 0)?.toLocaleString('id')}</Typography>
                  )}
                  <Stack>
                    <Typography variant="h4">Total Kerugian</Typography>
                    <Typography variant="caption">Jumlah kerugian dari barang yang di retur</Typography>
                  </Stack>
                </Stack>
                <Box component="img" src={IcDeficit} width={80} height={80} />
              </Stack>
            </MainCard>
          </Stack>
          {/* 3 */}
          <Stack direction="row" justifyContent="center" gap={2}>
            <MainCard
              sx={{ width: '100%', cursor: 'pointer' }}
              onClick={() => navigate(`/${user?.role === '01' ? 'super-admin' : 'admin'}/purchase`)}
            >
              <Stack alignItems="center" gap={2}>
                {loadingSummary ? (
                  <Typography variant="h3">
                    <CircularProgress />
                  </Typography>
                ) : (
                  <Typography variant="h3">{parseInt(data?.purchase || 0)}</Typography>
                )}
                <Typography variant="h4">Jumlah Transaksi Pembelian</Typography>
              </Stack>
            </MainCard>
            <MainCard sx={{ width: '100%', cursor: 'pointer' }} onClick={() => navigate(`/${user?.role === '01' ? 'super-admin' : 'admin'}/sale`)}>
              <Stack alignItems="center" gap={2}>
                {loadingSummary ? (
                  <Typography variant="h3">
                    <CircularProgress />
                  </Typography>
                ) : (
                  <Typography variant="h3">{parseInt(data?.sale || 0)}</Typography>
                )}
                <Typography variant="h4">Jumlah Transaksi Penjualan</Typography>
              </Stack>
            </MainCard>
            <MainCard sx={{ width: '100%', cursor: 'pointer' }} onClick={() => navigate(`/${user?.role === '01' ? 'super-admin' : 'admin'}/retur`)}>
              <Stack alignItems="center" gap={2}>
                {loadingSummary ? (
                  <Typography variant="h3">
                    <CircularProgress />
                  </Typography>
                ) : (
                  <Typography variant="h3">{parseInt(data?.retur || 0)}</Typography>
                )}
                <Typography variant="h4">Jumlah Transaksi Retur</Typography>
              </Stack>
            </MainCard>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
