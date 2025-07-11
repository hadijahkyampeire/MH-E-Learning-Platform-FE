import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';

export interface Column<T> {
  id: keyof T | string;
  label: string;
  align?: 'left' | 'right' | 'center';
  render?: (row: T) => React.ReactNode;
  width?: number | string;
  hideOnMobile?: boolean;
  sortable?: boolean;
}

interface ResponsiveTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  getRowId?: (row: T) => string | number;
  enableCheckbox?: boolean;
  enableExpansion?: boolean;
  enablePagination?: boolean;
  enableHover?: boolean;
  enableHighlight?: boolean;
  expandedRowId?: string | number | null;
  onExpandToggle?: (rowId: string | number) => void;
  renderExpandedContent?: (row: T) => React.ReactNode;
  selectedRowIds?: (string | number)[];
  onRowSelectToggle?: (rowId: string | number) => void;
  isRowDisabled?: (row: T) => boolean;
  getRowSx?: (row: T) => any;
  page?: number;
  rowsPerPage?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
}

function ResponsiveTable<T>({
  rows,
  columns,
  getRowId = (row: any) => row.id,
  enableCheckbox = false,
  enableExpansion = false,
  enableHover = true,
  enableHighlight = true,
  expandedRowId,
  onExpandToggle,
  renderExpandedContent,
  selectedRowIds = [],
  onRowSelectToggle,
  isRowDisabled = () => false,
  getRowSx = () => ({}),
}: ResponsiveTableProps<T>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const visibleColumns = isMobile
    ? columns.filter((col) => !col.hideOnMobile)
    : columns;

  const renderMobileCard = (row: T) => {
    const rowId = getRowId(row);
    const isExpanded = expandedRowId === rowId;
    const isSelected = selectedRowIds.includes(rowId);
    const disabled = isRowDisabled(row);

    return (
      <Card
        key={rowId}
        sx={{
          mb: 2,
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
          '&:hover':
            enableHover && !disabled
              ? {
                  boxShadow: theme.shadows[4],
                  transform: 'translateY(-1px)',
                  transition: 'all 0.2s ease-in-out',
                }
              : {},
          ...(enableHighlight && isSelected
            ? {
                border: `2px solid ${theme.palette.primary.main}`,
              }
            : {}),
          ...getRowSx(row),
        }}
        onClick={() => {
          if (!disabled && enableCheckbox && onRowSelectToggle) {
            onRowSelectToggle(rowId);
          }
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box flex={1}>
              {visibleColumns.map((col) => {
                const value = col.render
                  ? col.render(row)
                  : (row as any)[col.id];
                return (
                  <Box key={String(col.id)} mb={1}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontWeight: 600, display: 'block' }}
                    >
                      {col.label}
                    </Typography>
                    <Typography variant="body2">{value || '-'}</Typography>
                  </Box>
                );
              })}
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              {enableCheckbox && (
                <Checkbox
                  checked={isSelected}
                  onChange={(e) => {
                    e.stopPropagation();
                    onRowSelectToggle?.(rowId);
                  }}
                  disabled={disabled}
                  size="small"
                />
              )}

              {enableExpansion && (
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onExpandToggle?.(rowId);
                  }}
                >
                  {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              )}
            </Box>
          </Box>

          {enableExpansion && isExpanded && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  mt: 2,
                  pt: 2,
                  borderTop: `1px solid ${theme.palette.divider}`,
                }}
              >
                {renderExpandedContent?.(row) ?? (
                  <Typography variant="body2" color="text.secondary">
                    No additional content
                  </Typography>
                )}
              </Box>
            </Collapse>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderDesktopTable = () => (
    <TableContainer component={Paper}>
      <Table size="medium">
        <TableHead sx={{ backgroundColor: theme.palette.grey[50] }}>
          <TableRow>
            {enableExpansion && <TableCell />}
            {enableCheckbox && <TableCell padding="checkbox" />}
            {columns.map((col) => (
              <TableCell
                key={String(col.id)}
                align={col.align || 'left'}
                sx={{
                  fontWeight: 600,
                  fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
                }}
              >
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
                      <TableCell
                        key={String(col.id)}
                        align={col.align || 'left'}
                        sx={{
                          fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
                        }}
                      >
                        {col.render ? col.render(row) : (row as any)[col.id]}
                      </TableCell>
                    ))}
                  </TableRow>

                  {enableExpansion && isExpanded && (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length + (enableCheckbox ? 1 : 0) + 1}
                        sx={{ p: 0 }}
                      >
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
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
                colSpan={
                  columns.length +
                  (enableCheckbox ? 1 : 0) +
                  (enableExpansion ? 1 : 0)
                }
                align="center"
                sx={{ py: 4 }}
              >
                <Typography variant="body2" color="text.secondary">
                  No data available
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box>
      {isMobile ? (
        <Box>
          {rows.length > 0 ? (
            rows.map(renderMobileCard)
          ) : (
            <Card sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No data available
              </Typography>
            </Card>
          )}
        </Box>
      ) : (
        renderDesktopTable()
      )}
    </Box>
  );
}

export default ResponsiveTable;
