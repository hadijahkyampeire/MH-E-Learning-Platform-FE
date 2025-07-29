import React from 'react';
import ResponsiveTable from './ResponsiveTable';
import type { Column as ResponsiveColumn } from './ResponsiveTable';

// Re-export ResponsiveTable as Table for backward compatibility
export type Column<T> = ResponsiveColumn<T>;
export type TableProps = React.ComponentProps<typeof ResponsiveTable>;

function Table(props: React.ComponentProps<typeof ResponsiveTable>) {
  return <ResponsiveTable {...props} />;
}

export default Table;
