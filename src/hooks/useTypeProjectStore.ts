import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setAddTypeProject,
  setUpdateTypeProject,
  setDeleteTypeProject,
  setTypeProjects,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useTypeProjectStore = () => {
  const { typeProjects } = useSelector((state: any) => state.typeProjects);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getTypeProjects = async () => {
    try {
      const { data } = await coffeApi.get('/typeProject');
      console.log(data);
      dispatch(setTypeProjects({ typeProjects: data.typeProjects }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const createTypeProject = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/typeProject/', body);
      console.log(data);
      dispatch(setAddTypeProject({ typeProject: data }));
      showSuccess('Tipo de proyecto creada correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const updateTypeProject = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/typeProject/${id}`, body);
      console.log(data);
      dispatch(setUpdateTypeProject({ typeProject: data }));
      showSuccess('Tipo de proyecto editada correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const deleteTypeProject = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/typeProject/${id}`);
        dispatch(setDeleteTypeProject({ id }));
        showSuccess('Tipo de proyecto eliminado correctamente');
      } else {
        showError('Cancelado', 'El Tipo de proyecto esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
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
