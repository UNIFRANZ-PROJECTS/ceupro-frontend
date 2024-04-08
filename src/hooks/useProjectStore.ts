import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setCategories,
  setAddProject,
  setUpdateProject,
  setDeleteProject,
} from '@/store';
import Swal from 'sweetalert2';

export const useProjectStore = () => {
  const { projects } = useSelector((state: any) => state.projects);
  const dispatch = useDispatch();

  const getProjects = async () => {
    const { data } = await coffeApi.get('/project');
    console.log(data);
    dispatch(setCategories({ Projects: data.Projects }));
  };
  const createProject = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/project/', body);
      console.log(data);
      dispatch(setAddProject({ ionscription: data }));
      Swal.fire('Proyecto creada correctamente', '', 'success');
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const updateProject = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/project/${id}`, body);
      console.log(data);
      dispatch(setUpdateProject({ ionscription: data }));
      Swal.fire('Proyecto editada correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const deleteProject = async (id: number) => {
    try {
      Swal.fire({
        title: '¿Estas seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!',
        cancelButtonText: '¡No, cancelar!',
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            const { data } = await coffeApi.delete(`/project/${id}`);
            console.log(data);
            dispatch(setDeleteProject({ id }));
            Swal.fire('Eliminado', 'Proyecto eliminado correctamente', 'success');
          } else {
            Swal.fire('Cancelado', 'El proyecto esta a salvo :)', 'error');
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire(
            'Oops ocurrio algo',
            error.response.data.errors[0].msg,
            'error'
          );
        });
    } catch (error: any) {
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };

  return {
    //* Propiedades
    projects,
    //* Métodos
    getProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};
