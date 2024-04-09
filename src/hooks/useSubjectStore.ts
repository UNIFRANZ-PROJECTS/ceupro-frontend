import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setCategories,
  setAddSubject,
  setUpdateSubject,
  setDeleteSubject,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useSubjectStore = () => {
  const { subjects } = useSelector((state: any) => state.subjects);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getSubjects = async () => {
    try {
      const { data } = await coffeApi.get('/subject');
      console.log(data);
      dispatch(setCategories({ Subjects: data.Subjects }));
    } catch (error) {
      handleError(error);
    }
  };
  const createSubject = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/subject/', body);
      console.log(data);
      dispatch(setAddSubject({ ionscription: data }));
      showSuccess('Materia creada correctamente');
    } catch (error) {
      handleError(error);
    }
  };
  const updateSubject = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/subject/${id}`, body);
      console.log(data);
      dispatch(setUpdateSubject({ ionscription: data }));
      showSuccess('Materia editada correctamente');
    } catch (error) {
      handleError(error);
    }
  };
  const deleteSubject = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/subject/${id}`);
        dispatch(setDeleteSubject({ id }));
        showSuccess('Materia eliminado correctamente');
      } else {
        showError('Cancelado', 'La Materia esta a salvo :)');
      }
    } catch (error) {
      handleError(error);
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
