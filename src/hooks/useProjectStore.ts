import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setCategories,
  setAddProject,
  setUpdateProject,
  setDeleteProject,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useProjectStore = () => {
  const { projects } = useSelector((state: any) => state.projects);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getProjects = async () => {
    try {
      const { data } = await coffeApi.get('/project');
      console.log(data);
      dispatch(setCategories({ projects: data.projects }));
    } catch (error) {
      handleError(error);
    }
  };
  const createProject = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/project/', body);
      console.log(data);
      dispatch(setAddProject({ project: data }));
      showSuccess('Proyecto creado correctamente');
    } catch (error) {
      handleError(error);
    }
  };
  const updateProject = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/project/${id}`, body);
      console.log(data);
      dispatch(setUpdateProject({ project: data }));
      showSuccess('Proyecto editado correctamente');
    } catch (error) {
      handleError(error);
    }
  };
  const deleteProject = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/project/${id}`);
        dispatch(setDeleteProject({ id }));
        showSuccess('Proyecto eliminado correctamente');
      } else {
        showError('Cancelado', 'El proyecto esta a salvo :)');
      }
    } catch (error) {
      handleError(error);
    }
  };

  return {
    //* Propiedades
    projects,
    //* Métodos
    getProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};
