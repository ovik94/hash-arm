import React, { FC, useState } from 'react';
import {
  TableContainer,
  TableBody,
  Table,
  Paper,
  TableCell,
  TableRow,
  Checkbox
} from '@mui/material';
import TableToolbar from './TableToolbar';
import useStyles from './styles';
import { IContractorNomenclatures } from '../../store/ContractorsStore';
import TableHeader from './TableHeader';

interface ITableProps {
  data: Array<IContractorNomenclatures>;
  headCells: Array<{ id: string; label: string; }>;
  onSelected: (selectedIds: Array<string>) => void;
  // eslint-disable-next-line react/require-default-props
  isSearchable?: boolean;
}

const MuiTable: FC<ITableProps> = ({ headCells, data, isSearchable = false, onSelected }: ITableProps): JSX.Element => {
  const classes = useStyles();
  const [selected, setSelected] = useState<Array<string>>([]);
  const [items, setItems] = useState<Array<IContractorNomenclatures>>(data);

  const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = items.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const onClickRow = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: Array<string> = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const onDeleteSelectedItems = () => {
    setSelected([]);
  };

  const onChangeSearchField = (value: string) => {
    if (!value) {
      setItems(data);
    } else {
      const newItems = data.filter(item => item.title.includes(value));
      setItems(newItems);
    }
  };

  const onSubmit = (): void => {
    onSelected(selected);
  };

  const isSelected = (name: string) => selected.includes(name);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar
          onSubmit={onSubmit}
          numSelected={selected.length}
          onDelete={onDeleteSelectedItems}
          isSearchable={isSearchable}
          onChangeSearchField={onChangeSearchField}
        />
        <TableContainer>
          <Table className={classes.table} size="small">
            <TableHeader
              numSelected={selected.length}
              headCells={headCells}
              rowCount={items.length}
              onSelectAllClick={onSelectAllClick}
            />
            <TableBody>
              {
                items.map((item) => {
                  const isItemSelected = isSelected(item.id);

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={item.id}
                      selected={isItemSelected}
                      onClick={event => onClickRow(event, item.id)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} onClick={event => onClickRow(event, item.id)} />
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.price}</TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default MuiTable;
