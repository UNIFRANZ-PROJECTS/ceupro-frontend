import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setCategories,
  setAddTypeProject,
  setUpdateTypeProject,
  setDeleteTypeProject,
} from '@/store';
import Swal from 'sweetalert2';

export const useTypeProjectStore = () => {
  const { typeProjects } = useSelector((state: any) => state.typeProjects);
  const dispatch = useDispatch();

  const getTypeProjects = async () => {
    const { data } = await coffeApi.get('/typeProject');
    console.log(data);
    dispatch(setCategories({ TypeProjects: data.TypeProjects }));
  };
  const createTypeProject = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/typeProject/', body);
      console.log(data);
      dispatch(setAddTypeProject({ ionscription: data }));
      Swal.fire('Tipo de proyecto creada correctamente', '', 'success');
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const updateTypeProject = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/typeProject/${id}`, body);
      console.log(data);
      dispatch(setUpdateTypeProject({ ionscription: data }));
      Swal.fire('Tipo de proyecto editada correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const deleteTypeProject = async (id: number) => {
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
            const { data } = await coffeApi.delete(`/typeProject/${id}`);
            console.log(data);
            dispatch(setDeleteTypeProject({ id }));
            Swal.fire('Eliminado', 'Tipo de proyecto eliminado correctamente', 'success');
          } else {
            Swal.fire('Cancelado', 'El tipo de proyecto esta a salvo :)', 'error');
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
    typeProjects,
    //* Métodos
    getTypeProjects,
    createTypeProject,
    updateTypeProject,
    deleteTypeProject,
  };
};
