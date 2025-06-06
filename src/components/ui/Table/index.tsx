import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import type {
  GridRowsProp,
  GridColDef,
  GridFilterModel,
  GridRowSelectionModel,
  GridRowId
} from '@mui/x-data-grid';

interface TableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  pageSize?: number;
  pagination?: boolean;
  sorting?: boolean;
  checkboxSelection?: boolean;
  filterModel?: GridFilterModel;
  onFilterModelChange?: (model: GridFilterModel) => void;
  onRowSelectionModelChange?: (model: GridRowSelectionModel) => void;
  rowSelectionModel?: GridRowSelectionModel;
  [key: string]: any;
  getRowId?: (row: any) => GridRowId;
}

const Table: React.FC<TableProps> = ({
  rows,
  columns,
  pageSize = 10,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pagination = true,
  sorting = true,
  checkboxSelection = false,
  filterModel,
  onFilterModelChange,
  onRowSelectionModelChange,
  rowSelectionModel,
  getRowId = (row) => row.id,
  ...props
}) => {
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        pageSizeOptions={[pageSize]}
        initialState={{
          pagination: { paginationModel: { pageSize, page: 0 } }
        }}
        sortingOrder={sorting ? ['asc', 'desc'] : []}
        checkboxSelection={checkboxSelection}
        filterModel={filterModel}
        onFilterModelChange={onFilterModelChange}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={onRowSelectionModelChange}
        disableColumnMenu={!sorting}
        {...props}
      />
    </div>
  );
};

export default Table;
