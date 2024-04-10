import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setAddParallel,
  setUpdateParallel,
  setDeleteParallel,
  setParallels,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useParallelStore = () => {
  const { parallels } = useSelector((state: any) => state.parallels);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getParallels = async () => {
    try {
      const { data } = await coffeApi.get('/parallel');
      console.log(data);
      dispatch(setParallels({ parallels: data.parallels }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const createParallel = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/parallel/', body);
      console.log(data);
      dispatch(setAddParallel({ parallel: data }));
      showSuccess('Paralelo creado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const updateParallel = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/parallel/${id}`, body);
      console.log(data);
      dispatch(setUpdateParallel({ parallel: data }));
      showSuccess('Paralelo editado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const deleteParallel = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/parallel/${id}`);
        dispatch(setDeleteParallel({ id }));
        showSuccess('Paralelo eliminado correctamente');
      } else {
        showError('Cancelado', 'El paralelo esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
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
