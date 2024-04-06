import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setStages, setAddStage, setUpdateStage, setDeleteStage } from '@/store';
import Swal from 'sweetalert2';

export const useStageStore = () => {
  const { stages } = useSelector((state: any) => state.stages);
  const dispatch = useDispatch();

  const getStages = async () => {
    const { data } = await coffeApi.get('/stage');
    console.log(data)
    dispatch(setStages({ Stages: data.Stages }))
  }
  const createStage = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/stage/', body);
      console.log(data)
      dispatch(setAddStage({ Stage: data }));
      Swal.fire('Etapa creada correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }
  const updateStage = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/stage/${id}`, body);
      console.log(data)
      dispatch(setUpdateStage({ Stage: data }));
      Swal.fire('Etapa editada correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }
  const deleteStage = async (id: number) => {
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
          const { data } = await coffeApi.delete(`/stage/${id}`);
          console.log(data)
          dispatch(setDeleteStage({ id }));
          Swal.fire(
            'Eliminado',
            'Etapa eliminado correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Cancelado',
            'La etapa esta a salvo :)',
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
    stages,
    //* Métodos
    getStages,
    createStage,
    updateStage,
    deleteStage,
  }
}