import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setSeasons,
  setAddSeason,
  setUpdateSeason,
  setDeleteSeason,
  setEnableSeason,
  setSeasonsEnable,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useSeasonStore = () => {
  const { seasons,seasonEnable } = useSelector((state: any) => state.seasons);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getSeasonEnable = async () => {
    try {
      const { data } = await coffeApi.get('/season/enable');
      console.log(data);
      dispatch(setSeasonsEnable({ season: data }));
    } catch (error) {
      throw handleError(error);
    }
  };

  const getSeasons = async () => {
    try {
      const { data } = await coffeApi.get('/season');
      console.log(data);
      dispatch(setSeasons({ seasons: data.seasons }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const createSeason = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/season/', body);
      console.log(data);
      dispatch(setAddSeason({ season: data }));
      showSuccess('Temporada creado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const updateSeason = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/season/${id}`, body);
      console.log(data);
      dispatch(setUpdateSeason({ season: data }));
      showSuccess('Temporada editado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const deleteSeason = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/season/${id}`);
        dispatch(setDeleteSeason({ id }));
        showSuccess('Temporada eliminado correctamente');
      } else {
        showError('Cancelado', 'La Temporada esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };
  const enableSeason = async (id: number) => {
    try {
      const { data } = await coffeApi.put(`/season/enable/${id}`);
      console.log(data);
      dispatch(setEnableSeason({ season: data }));
      showSuccess('Temporada habilitado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    seasons,
    seasonEnable,
    //* Métodos
    getSeasonEnable,
    getSeasons,
    createSeason,
    updateSeason,
    deleteSeason,
    enableSeason,
  };
};
