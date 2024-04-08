import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setCategories,
  setAddSubject,
  setUpdateSubject,
  setDeleteSubject,
} from '@/store';
import Swal from 'sweetalert2';

export const useSubjectStore = () => {
  const { subjects } = useSelector((state: any) => state.subjects);
  const dispatch = useDispatch();

  const getSubjects = async () => {
    const { data } = await coffeApi.get('/subject');
    console.log(data);
    dispatch(setCategories({ Subjects: data.Subjects }));
  };
  const createSubject = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/subject/', body);
      console.log(data);
      dispatch(setAddSubject({ ionscription: data }));
      Swal.fire('Materia creada correctamente', '', 'success');
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const updateSubject = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/subject/${id}`, body);
      console.log(data);
      dispatch(setUpdateSubject({ ionscription: data }));
      Swal.fire('Materia editada correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const deleteSubject = async (id: number) => {
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
            const { data } = await coffeApi.delete(`/subject/${id}`);
            console.log(data);
            dispatch(setDeleteSubject({ id }));
            Swal.fire('Eliminado', 'Materia eliminado correctamente', 'success');
          } else {
            Swal.fire('Cancelado', 'La materia esta a salvo :)', 'error');
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
    subjects,
    //* Métodos
    getSubjects,
    createSubject,
    updateSubject,
    deleteSubject,
  };
};
