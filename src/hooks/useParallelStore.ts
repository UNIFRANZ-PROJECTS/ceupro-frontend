import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setCategories,
  setAddParallel,
  setUpdateParallel,
  setDeleteParallel,
} from '@/store';
import Swal from 'sweetalert2';

export const useParallelStore = () => {
  const { parallels } = useSelector((state: any) => state.parallels);
  const dispatch = useDispatch();

  const getParallels = async () => {
    const { data } = await coffeApi.get('/parallel');
    console.log(data);
    dispatch(setCategories({ Parallels: data.Parallels }));
  };
  const createParallel = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/parallel/', body);
      console.log(data);
      dispatch(setAddParallel({ ionscription: data }));
      Swal.fire('Paralelo creada correctamente', '', 'success');
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const updateParallel = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/parallel/${id}`, body);
      console.log(data);
      dispatch(setUpdateParallel({ ionscription: data }));
      Swal.fire('Paralelo editada correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const deleteParallel = async (id: number) => {
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
            const { data } = await coffeApi.delete(`/parallel/${id}`);
            console.log(data);
            dispatch(setDeleteParallel({ id }));
            Swal.fire('Eliminado', 'Paralelo eliminado correctamente', 'success');
          } else {
            Swal.fire('Cancelado', 'El paralelo esta a salvo :)', 'error');
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
    parallels,
    //* Métodos
    getParallels,
    createParallel,
    updateParallel,
    deleteParallel,
  };
};
