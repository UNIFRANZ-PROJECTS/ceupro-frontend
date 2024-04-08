import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setTeachers,
  setAddTeacher,
  setUpdateTeacher,
  setDeleteTeacher,
} from '@/store';
import Swal from 'sweetalert2';

export const useTeacherStore = () => {
  const { teachers } = useSelector((state: any) => state.teachers);
  const dispatch = useDispatch();

  const getTeachers = async () => {
    const { data } = await coffeApi.get('/teacher');
    console.log(data);
    dispatch(setTeachers({ teachers: data.teachers }));
  };
  const createTeacher = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/teacher/', body);
      console.log(data);
      dispatch(setAddTeacher({ teacher: data }));
      Swal.fire('Docente creado correctamente', '', 'success');
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const updateTeacher = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/teacher/${id}`, body);
      console.log(data);
      dispatch(setUpdateTeacher({ teacher: data }));
      Swal.fire('Docente editado correctamente', '', 'success');
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const deleteTeacher = async (id: number) => {
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
            const { data } = await coffeApi.delete(`/teacher/${id}`);
            console.log(data);
            dispatch(setDeleteTeacher({ id }));
            Swal.fire(
              'Eliminado',
              'Docente eliminado correctamente',
              'success'
            );
          } else {
            Swal.fire('Cancelado', 'El Docente esta a salvo :)', 'error');
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
    teachers,
    //* Métodos
    getTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher,
  };
};
