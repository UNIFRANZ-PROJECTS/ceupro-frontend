import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setInscriptions,
  setAddInscription,
  setUpdateInscription,
  setDeleteInscription,
} from '@/store';
import Swal from 'sweetalert2';

export const useInscriptionStore = () => {
  const { inscriptions } = useSelector((state: any) => state.inscriptions);
  const dispatch = useDispatch();

  const getInscriptions = async () => {
    const { data } = await coffeApi.get('/inscription');
    console.log(data);
    dispatch(setInscriptions({ inscriptions: data.inscriptions }));
  };
  const createInscription = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/inscription/', body);
      console.log(data);
      dispatch(setAddInscription({ ionscription: data }));
      Swal.fire('Inscripción creada correctamente', '', 'success');
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const updateInscription = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/inscription/${id}`, body);
      console.log(data);
      dispatch(setUpdateInscription({ ionscription: data }));
      Swal.fire('Inscripción editada correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const deleteInscription = async (id: number) => {
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
            const { data } = await coffeApi.delete(`/ionscription/${id}`);
            console.log(data);
            dispatch(setDeleteInscription({ id }));
            Swal.fire('Eliminado', 'Inscripción eliminado correctamente', 'success');
          } else {
            Swal.fire('Cancelado', 'La inscripción esta a salvo :)', 'error');
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
    inscriptions,
    //* Métodos
    getInscriptions,
    createInscription,
    updateInscription,
    deleteInscription,
  };
};
