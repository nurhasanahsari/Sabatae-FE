import PropTypes from 'prop-types';

// material-ui
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';

import EnhancedTableToolbar from './EnhancedTableToolbar';

const EnhancedTableHead = ({
  onCheck,
  mainData,
  headCells,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  selected,
  type,
  action,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const theme = useTheme();
  return (
    <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
      {numSelected > 0 && (
        <TableRow>
          <TableCell colSpan={11}>
            <EnhancedTableToolbar numSelected={selected.length} selected={selected} mainData={mainData} type={type} />
          </TableCell>
        </TableRow>
      )}
      <TableRow>
        {onCheck && (
          <TableCell padding="checkbox" sx={{ pl: 3 }}>
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        )}

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                <Typography variant="h5">{headCell.label}</Typography>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <Typography variant="h5">{headCell.label}</Typography>
            )}
          </TableCell>
        ))}
        {action && numSelected <= 0 && (
          <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
            Action
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  headCells: PropTypes.array.isRequired,
  selected: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number,
  action: PropTypes.bool,
  mainData: PropTypes.object,
  type: PropTypes.string,
  onCheck: PropTypes.bool,
};

EnhancedTableHead.defaultProps = {
  action: false,
  onCheck: false,
  rowCount: 0,
  numSelected: 0,
};

export default EnhancedTableHead;
