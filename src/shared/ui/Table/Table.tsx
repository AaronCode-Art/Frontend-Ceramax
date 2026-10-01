import React from 'react';
import { Spinner } from '../Spinner';
import './Table.css';

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
  keyExtractor?: (row: T, index: number) => string;
}

export function Table<T extends object>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No hay datos disponibles',
  onRowClick,
  keyExtractor,
}: TableProps<T>) {
  const getRowKey = (row: T, index: number) => {
    if (keyExtractor) return keyExtractor(row, index);
    return String((row as Record<string, unknown>)['id'] ?? index);
  };

  const getCellValue = (row: T, key: string): React.ReactNode => {
    return (row as Record<string, unknown>)[key] as React.ReactNode;
  };

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={col.sortable ? 'data-table__th--sortable' : ''}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="data-table__loading">
                <Spinner size="md" />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="data-table__empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={getRowKey(row, rowIndex)}
                className={onRowClick ? 'data-table__row--clickable' : ''}
                onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
              >
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render
                      ? col.render(row, rowIndex)
                      : getCellValue(row, col.key)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
