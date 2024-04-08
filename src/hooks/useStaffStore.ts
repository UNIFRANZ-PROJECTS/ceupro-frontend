import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setStaffs,
  setAddStaff,
  setUpdateStaff,
  setDeleteStaff,
} from '@/store';
import Swal from 'sweetalert2';

export const useStaffStore = () => {
  const { staffs } = useSelector((state: any) => state.staffs);
  const dispatch = useDispatch();

  const getStaffs = async () => {
    const { data } = await coffeApi.get('/staff');
    console.log(data);
    dispatch(setStaffs({ staffs: data.staffs }));
  };
  const createStaff = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/staff/', body);
      console.log(data);
      dispatch(setAddStaff({ staff: data }));
      Swal.fire('Administrador creado correctamente', '', 'success');
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const updateStaff = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/staff/${id}`, body);
      console.log(data);
      dispatch(setUpdateStaff({ staff: data }));
      Swal.fire('Administrador editado correctamente', '', 'success');
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const deleteStaff = async (id: number) => {
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
            const { data } = await coffeApi.delete(`/staff/${id}`);
            console.log(data);
            dispatch(setDeleteStaff({ id }));
            Swal.fire(
              'Eliminado',
              'Administrador eliminado correctamente',
              'success'
            );
          } else {
            Swal.fire('Cancelado', 'El administrador esta a salvo :)', 'error');
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
    staffs,
    //* Métodos
    getStaffs,
    createStaff,
    updateStaff,
    deleteStaff,
  };
};