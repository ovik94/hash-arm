import React, { FC } from 'react';
import { TableHead, TableRow, TableCell, Checkbox } from '@mui/material';

interface ITableHeaderProps {
  numSelected: number;
  rowCount: number;
  headCells: Array<{ id: string; label: string; }>;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableHeader: FC<ITableHeaderProps> = ({
  numSelected,
  headCells,
  rowCount,
  onSelectAllClick
}: ITableHeaderProps) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={onSelectAllClick}
        />
      </TableCell>
      {
        headCells.map(cell => <TableCell key={cell.id}>{cell.label}</TableCell>)
      }
    </TableRow>
  </TableHead>
);

export default TableHeader;
