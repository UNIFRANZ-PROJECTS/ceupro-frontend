import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useProjectStore } from '@/hooks';
import { ProjectModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
  handleEdit?: (season: ProjectModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (season: ProjectModel) => void;
  items?: any[];
}


export const ProjectTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { projects = [], getProjects, deleteProject } = useProjectStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [customerList, setCustomerList] = useState<ProjectModel[]>([]);
  const [query, setQuery] = useState<string>('');


  useEffect(() => {
    getProjects()
  }, []);

  useEffect(() => {
    const filtered = projects.filter((e: ProjectModel) =>
      e.title.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : projects,
      page,
      rowsPerPage
    );
    setCustomerList(newList)
  }, [projects, page, rowsPerPage, query])


  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Proyecto"
        search={setQuery}
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Inicio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Fin</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList.map((project: ProjectModel) => {
              const isSelected = items.includes(project.id);
              return (
                <TableRow key={project.id} >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(project)}
                      />
                    </TableCell>
                  }
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.season.name }</TableCell>
                  {
                    !stateSelect && <TableCell align="right">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton onClick={() => handleEdit!(project)} >
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteProject(project.id)} >
                          <DeleteOutline color="error" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  }
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={projects.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
}
