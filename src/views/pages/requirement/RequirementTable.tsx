import { ComponentSearch, ComponentTablePagination } from '@/components';
import { useRequirementStore } from '@/hooks';
import { RequirementModel } from '@/models';
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
  handleEdit?: (season: RequirementModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (season: RequirementModel) => void;
  items?: any[];
}

export const RequirementTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const {
    requirements = [],
    getRequirements,
    deleteRequirement,
  } = useRequirementStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [customerList, setCustomerList] = useState<RequirementModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getRequirements();
  }, []);

  useEffect(() => {
    const filtered = requirements.filter((e: RequirementModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : requirements,
      page,
      rowsPerPage
    );
    setCustomerList(newList);
  }, [requirements, page, rowsPerPage, query]);

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch title="Buscar requisito de avances" search={setQuery} />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
              {!stateSelect && (
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList.map((requirements: RequirementModel) => {
              const isSelected = items.includes(requirements.id);
              return (
                <TableRow key={requirements.id}>
                  {stateSelect && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(requirements)}
                      />
                    </TableCell>
                  )}
                  <TableCell>{requirements.name}</TableCell>
                  <TableCell>{requirements.description}</TableCell>
                  {!stateSelect && (
                    <TableCell align="right">
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <IconButton onClick={() => handleEdit!(requirements)}>
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteRequirement(requirements.id)}
                        >
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
        total={requirements.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
};
