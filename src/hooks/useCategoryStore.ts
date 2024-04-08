import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setCategories,
  setAddCategory,
  setUpdateCategory,
  setDeleteCategory,
} from '@/store';
import Swal from 'sweetalert2';

export const useCategoryStore = () => {
  const { categories } = useSelector((state: any) => state.categories);
  const dispatch = useDispatch();

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
      Swal.fire('Categoria creada correctamente', '', 'success');
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const updateCategory = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/category/${id}`, body);
      console.log(data);
      dispatch(setUpdateCategory({ ionscription: data }));
      Swal.fire('Categoria editada correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire(
        'Oops ocurrio algo',
        error.response.data.errors[0].msg,
        'error'
      );
    }
  };
  const deleteCategory = async (id: number) => {
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
            const { data } = await coffeApi.delete(`/category/${id}`);
            console.log(data);
            dispatch(setDeleteCategory({ id }));
            Swal.fire('Eliminado', 'Categoria eliminado correctamente', 'success');
          } else {
            Swal.fire('Cancelado', 'La categoria esta a salvo :)', 'error');
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
    categories,
    //* Métodos
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
