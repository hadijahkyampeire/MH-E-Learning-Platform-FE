import React from 'react';
import { TablePagination } from '@mui/material';

type Props = {
  page: number;
  rowsPerPage: number;
  count: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newLimit: number) => void;
};

const TablePaginationControls: React.FC<Props> = ({
  page,
  rowsPerPage,
  count,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={(_, newPage) => onPageChange(newPage)}
      onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
      rowsPerPageOptions={[5, 10, 25, 50]}
    />
  );
};

export default TablePaginationControls;
