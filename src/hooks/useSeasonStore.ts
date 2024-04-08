import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setSeasons,
  setAddSeason,
  setUpdateSeason,
  setDeleteSeason,
  setEnableSeason,
} from '@/store';
import Swal from 'sweetalert2';

export const useSeasonStore = () => {
  const { seasons } = useSelector((state: any) => state.seasons);
  const dispatch = useDispatch();

  const getSeasons = async () => {
    const { data } = await coffeApi.get('/season');
    console.log(data);
    dispatch(setSeasons({ seasons: data.seasons }));
  };
  const createSeason = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/season/', body);
      console.log(data);
      dispatch(setAddSeason({ season: data }));
      Swal.fire('Temporada creado correctamente', '', 'success');
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const updateSeason = async (id: number, body: object) => {
    try {
      console.log(body);
      const { data } = await coffeApi.put(`/season/${id}`, body);
      console.log(data);
      dispatch(setUpdateSeason({ season: data }));
      Swal.fire('Temporada editado correctamente', '', 'success');
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const deleteSeason = async (id: number) => {
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
            const { data } = await coffeApi.delete(`/season/${id}`);
            console.log(data);
            dispatch(setDeleteSeason({ id }));
            Swal.fire(
              'Eliminado',
              'Temporada eliminado correctamente',
              'success'
            );
          } else {
            Swal.fire('Cancelado', 'La temporada esta a salvo :)', 'error');
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
  const enableSeason = async (id: number) => {
    try {
      const { data } = await coffeApi.put(`/season/enable/${id}`);
      console.log(data);
      dispatch(setEnableSeason({ season: data }));
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };

  return {
    //* Propiedades
    seasons,
    //* Métodos
    getSeasons,
    createSeason,
    updateSeason,
    deleteSeason,
    enableSeason,
  };
};
