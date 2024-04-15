import {
  ComponentSearch,
  ComponentTablePagination,
  MaterialUISwitch,
  SeverityPill,
} from '@/components';
import { useSeasonStore } from '@/hooks';
import { SeasonModel } from '@/models';
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
import { format } from 'date-fns';
import esES from 'date-fns/locale/es';

interface tableProps {
  handleEdit?: (season: SeasonModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (season: SeasonModel) => void;
  items?: any[];
}

export const SeasonTable = (props: tableProps) => {
  const { stateSelect = false, handleEdit, itemSelect, limitInit = 10, items = [] } = props;

  const { seasons = [], getSeasons, deleteSeason, enableSeason } = useSeasonStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [seasonList, setCustomerList] = useState<SeasonModel[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getSeasons();
  }, []);

  useEffect(() => {
    const filtered = seasons.filter((e: SeasonModel) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(query != '' ? filtered : seasons, page, rowsPerPage);
    setCustomerList(newList);
  }, [seasons, page, rowsPerPage, query]);

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch title="Buscar Temporada" search={setQuery} />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Inicio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Fin</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {seasonList.map((season: SeasonModel) => {
              const isSelected = items.includes(season.id);
              return (
                <TableRow key={season.id}>
                  {stateSelect && (
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} onChange={() => itemSelect!(season)} />
                    </TableCell>
                  )}
                  <TableCell>{season.name}</TableCell>
                  <TableCell>{`${season.price} Bs.`}</TableCell>
                  <TableCell>
                    {format(new Date(season.start), 'dd MMMM yyyy', {
                      locale: esES,
                    })}
                  </TableCell>
                  <TableCell>
                    {format(new Date(season.end), 'dd MMMM yyyy', {
                      locale: esES,
                    })}
                  </TableCell>
                  <TableCell>
                    <SeverityPill color={season.enableState ? 'success' : 'error'}>
                      {season.enableState ? 'Disponible' : 'Inactivo'}
                    </SeverityPill>
                  </TableCell>
                  {!stateSelect && (
                    <TableCell align="right">
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <MaterialUISwitch
                          checked={season.enableState}
                          onChange={(_) => enableSeason(season.id)}
                        />
                        <IconButton onClick={() => handleEdit!(season)}>
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteSeason(season.id)}>
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
        total={seasons.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
};
