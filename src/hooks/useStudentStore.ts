import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setStudents,
  setAddStudent,
  setUpdateStudent,
  setDeleteStudent,
} from '@/store';
import Swal from 'sweetalert2';

export const useStudentStore = () => {
  const { students } = useSelector((state: any) => state.students);
  const dispatch = useDispatch();

  const getStudents = async () => {
    const { data } = await coffeApi.get('/student');
    console.log(data);
    dispatch(setStudents({ students: data.students }));
  };
  const createStudent = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/student/', body);
      console.log(data);
      dispatch(setAddStudent({ student: data }));
      Swal.fire('Estudiante creado correctamente', '', 'success');
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const updateStudent = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/student/${id}`, body);
      console.log(data);
      dispatch(setUpdateStudent({ student: data }));
      Swal.fire('Estudiante editado correctamente', '', 'success');
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const deleteStudent = async (id: number) => {
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
            const { data } = await coffeApi.delete(`/student/${id}`);
            console.log(data);
            dispatch(setDeleteStudent({ id }));
            Swal.fire(
              'Eliminado',
              'Estudiante eliminado correctamente',
              'success'
            );
          } else {
            Swal.fire('Cancelado', 'El Estudiante esta a salvo :)', 'error');
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
    students,
    //* Métodos
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  };
};