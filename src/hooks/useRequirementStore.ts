import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setRequirements,
  setAddRequirement,
  setUpdateRequirement,
  setDeleteRequirement,
} from '@/store';
import { useErrorStore, useAlertStore } from '.';

export const useRequirementStore = () => {
  const { requirements } = useSelector((state: any) => state.requirements);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getRequirements = async () => {
    try {
      const { data } = await coffeApi.get('/requirement');
      console.log(data);
      dispatch(setRequirements({ requirements: data.requirements }));
    } catch (error) {
      handleError(error);
    }
  };
  const createRequirement = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/requirement/', body);
      console.log(data);
      dispatch(setAddRequirement({ requirement: data }));
      showSuccess('Requisito creado correctamente');
    } catch (error) {
      handleError(error);
    }
  };
  const updateRequirement = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/requirement/${id}`, body);
      console.log(data);
      dispatch(setUpdateRequirement({ requirement: data }));
      showSuccess('Requisito editado correctamente');
    } catch (error) {
      handleError(error);
    }
  };
  const deleteRequirement = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/requirement/${id}`);
        dispatch(setDeleteRequirement({ id }));
        showSuccess('Etapa eliminado correctamente');
      } else {
        showError('Cancelado', 'La etapa esta a salvo :)');
      }
    } catch (error) {
      handleError(error);
    }
  };

  return {
    //* Propiedades
    requirements,
    //* Métodos
    getRequirements,
    createRequirement,
    updateRequirement,
    deleteRequirement,
  };
};
