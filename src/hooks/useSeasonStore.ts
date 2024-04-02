import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setSeasons, setAddSeason, setUpdateSeason, setDeleteSeason } from '@/store';
import Swal from 'sweetalert2';

export const useSeasonStore = () => {
  const { seasons } = useSelector((state: any) => state.seasons);
  const dispatch = useDispatch();

  const getSeasons = async () => {
    const { data } = await coffeApi.get('/customer');
    console.log(data)
    dispatch(setSeasons({ customers: data.customers }))
  }
  const createSeason = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/customer/', body);
      console.log(data)
      dispatch(setAddSeason({ customer: data.customer }));
      Swal.fire('Cliente creado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }
  const updateSeason = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/customer/${id}`, body);
      console.log(data)
      dispatch(setUpdateSeason({ customer: data.customer }));
      Swal.fire('Cliente editado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }
  const deleteSeason = async (id: number) => {
    try {
      Swal.fire({
        title: '¿Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!',
        cancelButtonText: '¡No, cancelar!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await coffeApi.delete(`/customer/${id}`);
          console.log(data)
          dispatch(setDeleteSeason({ id }));
          Swal.fire(
            'Eliminado',
            'Cliente eliminado correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Cancelado',
            'El Cliente esta a salvo :)',
            'error'
          )
        }
      }).catch((error) => {
        console.log(error)
        Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
      });
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }

  return {
    //* Propiedades
    seasons,
    //* Métodos
    getSeasons,
    createSeason,
    updateSeason,
    deleteSeason,
  }
}