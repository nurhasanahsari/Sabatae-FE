// assets
import {
  IconBuildingWarehouse,
  IconCategory,
  IconClipboardData,
  IconDashboard,
  IconReceiptRefund,
  IconShoppingCartPlus,
  IconShoppingCartX,
  IconUserCog,
  IconColorFilter,
} from '@tabler/icons-react';

// constant
const icons = {
  IconBuildingWarehouse,
  IconCategory,
  IconClipboardData,
  IconDashboard,
  IconReceiptRefund,
  IconShoppingCartPlus,
  IconShoppingCartX,
  IconUserCog,
  IconColorFilter,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const admin = {
  id: 'admin',
  title: 'admin',
  caption: 'admin',
  icon: null,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false,
      external: false,
      target: false,
    },
    {
      id: 'inventory',
      title: 'Persediaan',
      type: 'item',
      url: '/admin/inventory',
      icon: icons.IconBuildingWarehouse,
      breadcrumbs: false,
      external: false,
      target: false,
    },
    {
      id: 'purchase',
      title: 'Pembelian',
      type: 'item',
      url: '/admin/purchase',
      icon: icons.IconShoppingCartPlus,
      breadcrumbs: false,
      external: false,
      target: false,
    },
    {
      id: 'sale',
      title: 'Penjualan',
      type: 'item',
      url: '/admin/sale',
      icon: icons.IconShoppingCartX,
      breadcrumbs: false,
      external: false,
      target: false,
    },
    {
      id: 'category',
      title: 'Kategori',
      type: 'item',
      url: '/admin/category',
      icon: icons.IconColorFilter,
      breadcrumbs: false,
      external: false,
      target: false,
    },
    {
      id: 'retur',
      title: 'Retur Barang',
      type: 'item',
      url: '/admin/retur',
      icon: icons.IconReceiptRefund,
      breadcrumbs: false,
      external: false,
      target: false,
    },
    {
      id: 'report',
      title: 'Data Laporan',
      type: 'item',
      url: '/admin/report',
      icon: icons.IconClipboardData,
      breadcrumbs: false,
      external: false,
      target: false,
    },
  ],
};

export default admin;
