import React from 'react';
import {
  Box,
  Collapse,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { type SxProps } from '@mui/material';

import TablePaginationControls from './TablePaginationControls';

export type Column<T> = {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

export type TableProps<T> = {
  rows: T[];
  columns: Column<T>[];
  getRowId?: (row: T) => string | number;

  enableCheckbox?: boolean;
  enableExpansion?: boolean;
  enablePagination?: boolean;
  enableHover?: boolean;
  enableHighlight?: boolean;

  expandedRowId?: string | number | null;
  onExpandToggle?: (id: string | number) => void;
  renderExpandedContent?: (row: T) => React.ReactNode;

  selectedRowIds?: (string | number)[];
  onRowSelectToggle?: (id: string | number) => void;

  isRowDisabled?: (row: T) => boolean;
  getRowSx?: (row: T) => SxProps;

  page?: number;
  rowsPerPage?: number;
  totalCount?: number;
  onPageChange?: (newPage: number) => void;
  onRowsPerPageChange?: (newLimit: number) => void;
};

function Table<T>({
  rows,
  columns,
  getRowId = (row: any) => row.id,

  enableCheckbox = false,
  enableExpansion = false,
  enablePagination = false,
  enableHover = true,
  enableHighlight = true,

  expandedRowId,
  onExpandToggle,
  renderExpandedContent,

  selectedRowIds = [],
  onRowSelectToggle,

  isRowDisabled = () => false,
  getRowSx = () => ({}),

  page = 0,
  rowsPerPage = 10,
  totalCount = 0,
  onPageChange,
  onRowsPerPageChange,
}: TableProps<T>) {
  return (
    <Box>
      <TableContainer component={Paper}>
        <MuiTable size="medium">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              {enableExpansion && <TableCell />}
              {enableCheckbox && <TableCell />}
              {columns.map((col) => (
                <TableCell key={col.id} align={col.align || 'left'}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => {
                const rowId = getRowId(row);
                const isExpanded = expandedRowId === rowId;
                const isSelected = selectedRowIds.includes(rowId);
                const disabled = isRowDisabled(row);

                return (
                  <React.Fragment key={rowId}>
                    <TableRow
                      hover={enableHover}
                      selected={enableHighlight && isSelected}
                      onClick={() => {
                        if (!disabled && enableCheckbox && onRowSelectToggle)
                          onRowSelectToggle(rowId);
                      }}
                      sx={{
                        ...(disabled
                          ? { opacity: 0.5, pointerEvents: 'none' }
                          : {}),
                        ...(getRowSx?.(row) || {}),
                      }}
                    >
                      {enableExpansion && (
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              onExpandToggle?.(rowId);
                            }}
                          >
                            {isExpanded ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </IconButton>
                        </TableCell>
                      )}

                      {enableCheckbox && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            disabled={disabled}
                            checked={isSelected}
                            onChange={() => onRowSelectToggle?.(rowId)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </TableCell>
                      )}

                      {columns.map((col) => (
                        <TableCell key={col.id} align={col.align || 'left'}>
                          {col.render ? col.render(row) : (row as any)[col.id]}
                        </TableCell>
                      ))}
                    </TableRow>

                    {enableExpansion && isExpanded && (
                      <TableRow>
                        <TableCell
                          colSpan={
                            columns.length + (enableCheckbox ? 1 : 0) + 1
                          }
                          sx={{ p: 0 }}
                        >
                          <Collapse
                            in={isExpanded}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box sx={{ m: 2 }}>
                              {renderExpandedContent?.(row) ?? (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  No additional content
                                </Typography>
                              )}
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (enableCheckbox ? 1 : 0) + 1}
                  align="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {enablePagination && onPageChange && onRowsPerPageChange && (
        <TablePaginationControls
          page={page}
          rowsPerPage={rowsPerPage}
          count={totalCount}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}
    </Box>
  );
}

export default Table;
