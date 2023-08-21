import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { Box, Toolbar, Typography } from '@mui/material';

// assets

const EnhancedTableToolbar = ({ numSelected }) => {
  return (
    <>
      <Toolbar
        sx={{
          p: 0,
          pl: 1,
          pr: 1,
          ...(numSelected > 0 && {
            color: (theme) => theme.palette.secondary.main,
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography color="inherit" variant="h5">
            {numSelected} Selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Nutrition
          </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
export default EnhancedTableToolbar;
