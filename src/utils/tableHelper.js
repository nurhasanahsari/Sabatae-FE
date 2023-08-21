export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const handleSearch = (search, setPage, property, rows, setRows, data) => {
  if (setPage) {
    setPage(0);
  }

  if (search) {
    const newRows = rows.filter((row) => {
      let matches = true;

      const properties = [...property];
      let containsQuery = false;

      properties.forEach((property) => {
        if (row[property].toString().toLowerCase().includes(search.toString().toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
      return matches;
    });
    setRows(newRows);
  } else {
    setRows(data);
  }
};

export const handleFilter = (newString, setPage, property, setRows, data, setAnchorEl, setSearch = null) => {
  if (setAnchorEl) setAnchorEl(null);
  if (setPage) setPage(0);
  if (setSearch) setSearch(newString || '');
  if (newString) {
    const newRows = data.filter((row) => {
      let matches = true;

      const properties = [...property];
      let containsQuery = false;

      if (newString === 'open') {
        properties.forEach((property) => {
          if (!row[property]) {
            containsQuery = true;
          }
        });
      } else if (newString === 'done') {
        properties.forEach((property) => {
          if (row[property]) {
            containsQuery = true;
          }
        });
      } else {
        properties.forEach((property) => {
          if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
            containsQuery = true;
          }
        });
      }

      if (!containsQuery) {
        matches = false;
      }
      return matches;
    });
    setRows(newRows);
  } else {
    setRows(data);
  }
};

export const handleRequestSort = (event, property, order, setOrder, orderBy, setOrderBy) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
};

export const handleSelectAllClick = (event, rows, selected, setSelected) => {
  if (event.target.checked) {
    if (selected.length > 0) {
      setSelected([]);
    } else {
      const newSelectedId = rows.map((n) => n.id);
      setSelected(newSelectedId);
    }
    return;
  }
  setSelected([]);
};

export const handleClick = (event, name, selected, setSelected) => {
  const selectedIndex = selected.indexOf(name);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  }

  setSelected(newSelected);
};
