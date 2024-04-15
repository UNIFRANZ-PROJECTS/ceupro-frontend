import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { saveAs } from 'file-saver';
import { setAddProject, setUpdateProject, setDeleteProject, setProjects } from '@/store';
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
      dispatch(setProjects({ projects: data.projects }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const createProject = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/project/', body);
      console.log(data);
      dispatch(setAddProject({ project: data }));
      //descargar excel
      const base64 = data.document; // Suponiendo que data.document contiene la cadena base64
      const binaryString = window.atob(base64);
      const byteArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: 'application/xml' });
      saveAs(blob, 'formulario.xlsx');

      showSuccess('Proyecto creado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const updateProject = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/project/${id}`, body);
      console.log(data);
      dispatch(setUpdateProject({ project: data }));
      showSuccess('Proyecto editado correctamente');
    } catch (error) {
      throw handleError(error);
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
      throw handleError(error);
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
