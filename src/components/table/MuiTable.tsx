import React, { FC, useState } from 'react';
import {
  TableContainer,
  TableBody,
  Table,
  Paper,
  TableCell,
  TableRow,
  Checkbox
} from '@material-ui/core';
import TableToolbar from './TableToolbar';
import useStyles from './styles';
import { IContractorNomenclatures } from '../../store/ContractorsStore';
import TableHeader from './TableHeader';

interface ITableProps {
  data: Array<IContractorNomenclatures>;
  headCells: Array<{ id: string; label: string; }>
  // eslint-disable-next-line react/require-default-props
  isSearchable?: boolean;
}

const MuiTable: FC<ITableProps> = ({ headCells, data, isSearchable = false }: ITableProps): JSX.Element => {
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

  const isSelected = (name: string) => selected.includes(name);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar numSelected={selected.length} onDelete={onDeleteSelectedItems} isSearchable={isSearchable} onChangeSearchField={onChangeSearchField} />
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
                      onClick={event => onClickRow(event, item.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={item.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
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