import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setStages,
  setAddStage,
  setUpdateStage,
  setDeleteStage,
} from '@/store';
import { useErrorStore, useAlertStore } from '.';

export const useStageStore = () => {
  const { stages } = useSelector((state: any) => state.stages);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getStages = async () => {
    try {
      const { data } = await coffeApi.get('/stage');
      console.log(data);
      dispatch(setStages({ stages: data.stages }));
    } catch (error) {
      handleError(error);
    }
  };

  const createStage = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/stage/', body);
      console.log(data);
      dispatch(setAddStage({ stage: data }));
      showSuccess('Etapa creada correctamente');
    } catch (error) {
      handleError(error);
    }
  };

  const updateStage = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/stage/${id}`, body);
      console.log(data);
      dispatch(setUpdateStage({ stage: data }));
      showSuccess('Etapa editada correctamente');
    } catch (error) {
      handleError(error);
    }
  };

  const deleteStage = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/stage/${id}`);
        dispatch(setDeleteStage({ id }));
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
    stages,
    //* Métodos
    getStages,
    createStage,
    updateStage,
    deleteStage,
  };
};
