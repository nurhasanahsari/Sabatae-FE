/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

// material ui
import { Button } from '@mui/material';

// third party
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

// assets
import { IconFileSpreadsheet } from '@tabler/icons-react';

const ExportToExcel = ({ apiData, customHeader, fileName, loading }) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    XLSX.utils.sheet_add_aoa(ws, [customHeader], { origin: 'A1' });
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button startIcon={<IconFileSpreadsheet stroke={1} />} variant="contained" disabled={loading} onClick={() => exportToCSV(apiData, fileName)}>
      Export to Excel
    </Button>
  );
};

ExportToExcel.propTypes = {
  apiData: PropTypes.array,
  customHeader: PropTypes.array,
  fileName: PropTypes.string,
};

export default ExportToExcel;
