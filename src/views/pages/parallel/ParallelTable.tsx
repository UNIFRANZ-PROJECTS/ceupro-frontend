import { ComponentSearch, ComponentTablePagination } from '@/components';
import { useParallelStore } from '@/hooks';
import { ParallelModel } from '@/models';
import { applyPagination } from '@/utils/applyPagination';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import {
  Checkbox,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface tableProps {
  handleEdit?: (season: ParallelModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (season: ParallelModel) => void;
  items?: any[];
}

export const ParallelTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { parallels = [], getParallels, deleteParallel } = useParallelStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [customerList, setCustomerList] = useState<ParallelModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getParallels();
  }, []);

  useEffect(() => {
    const filtered = parallels.filter((e: ParallelModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : parallels,
      page,
      rowsPerPage
    );
    setCustomerList(newList);
  }, [parallels, page, rowsPerPage, query]);

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch title="Buscar Paralelo" search={setQuery} />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Materia</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Semestre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Docente</TableCell>
              {!stateSelect && (
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList.map((parallel: ParallelModel) => {
              const isSelected = items.includes(parallel.id);
              return (
                <TableRow key={parallel.id}>
                  {stateSelect && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(parallel)}
                      />
                    </TableCell>
                  )}
                  <TableCell>{parallel.name}</TableCell>
                  <TableCell>{parallel.subject.name}</TableCell>
                  <TableCell>{parallel.subject.semester}</TableCell>
                  <TableCell>{parallel.teacher.user.name}</TableCell>
                  {!stateSelect && (
                    <TableCell align="right">
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <IconButton onClick={() => handleEdit!(parallel)}>
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteParallel(parallel.id)}>
                          <DeleteOutline color="error" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={parallels.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
};
