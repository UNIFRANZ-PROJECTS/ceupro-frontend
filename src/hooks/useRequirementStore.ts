import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setRequirements, setAddRequirement, setUpdateRequirement, setDeleteRequirement } from '@/store';
import Swal from 'sweetalert2';

export const useRequirementStore = () => {
  const { requirements } = useSelector((state: any) => state.requirements);
  const dispatch = useDispatch();

  const getRequirements = async () => {
    const { data } = await coffeApi.get('/requirement');
    console.log(data)
    dispatch(setRequirements({ requirements: data.requirements }))
  }
  const createRequirement = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/requirement/', body);
      console.log(data)
      dispatch(setAddRequirement({ requirement: data }));
      Swal.fire('Requisito creado correctamente', '', 'success');
    } catch (error: any) {
      console.log(error)
      // Swal.fire('Oops ocurrio algo', error.response.data, 'error');
    }
  }
  const updateRequirement = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/requirement/${id}`, body);
      console.log(data)
      dispatch(setUpdateRequirement({ requirement: data }));
      Swal.fire('Requisito editado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }
  const deleteRequirement = async (id: number) => {
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
          const { data } = await coffeApi.delete(`/requirement/${id}`);
          console.log(data)
          dispatch(setDeleteRequirement({ id }));
          Swal.fire(
            'Eliminado',
            'Requisito eliminado correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Cancelado',
            'El Requisito esta a salvo :)',
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
    requirements,
    //* Métodos
    getRequirements,
    createRequirement,
    updateRequirement,
    deleteRequirement,
  }
}