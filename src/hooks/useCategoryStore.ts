import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setCategories,
  setAddCategory,
  setUpdateCategory,
  setDeleteCategory,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useCategoryStore = () => {
  const { categories } = useSelector((state: any) => state.categories);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getCategories = async () => {
    const { data } = await coffeApi.get('/category');
    console.log(data);
    dispatch(setCategories({ Categorys: data.Categorys }));
  };
  const createCategory = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/category/', body);
      console.log(data);
      dispatch(setAddCategory({ ionscription: data }));
      showSuccess('Categoria creada correctamente');
    } catch (error) {
      handleError(error);
    }
  };
  const updateCategory = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/category/${id}`, body);
      console.log(data);
      dispatch(setUpdateCategory({ ionscription: data }));
      showSuccess('Categoria editada correctamente');
    } catch (error) {
      handleError(error);
    }
  };
  const deleteCategory = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/category/${id}`);
        dispatch(setDeleteCategory({ id }));
        showSuccess('Categoria eliminado correctamente');
      } else {
        showError('Cancelado', 'La categoria esta a salvo :)');
      }
    } catch (error) {
      handleError(error);
    }
  };

  return {
    //* Propiedades
    categories,
    //* Métodos
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
