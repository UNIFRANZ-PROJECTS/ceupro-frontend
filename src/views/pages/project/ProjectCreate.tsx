import {
  ComponentInput,
  ComponentSelect,
  ModalSelectComponent,
} from '@/components';
import { useForm, useProjectStore } from '@/hooks';
import {
  FormProjectModel,
  FormProjectValidations,
  ProjectModel,
  StudentModel,
} from '@/models';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { CategoryTable } from '../category';
import { TypeProjectTable } from '../typeProject';
import { StudentTable } from '../student';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: ProjectModel | null;
}

const formFields: FormProjectModel = {
  title: '',
  category: null,
  typeProject: null,
  students: [],
};

const formValidations: FormProjectValidations = {
  title: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  category: [(value) => value != null, 'Debe ingresar el docente'],
  typeProject: [(value) => value != null, 'Debe ingresar la materia'],
  students: [
    (value) => value.length != 0,
    'Debe ingresar porlomenos un estudiante',
  ],
};

export const ProjectCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const {
    title,
    category,
    typeProject,
    students,
    onInputChange,
    isFormValid,
    onValueChange,
    onResetForm,
    titleValid,
    categoryValid,
    typeProjectValid,
    studentsValid,
  } = useForm(item ?? formFields, formValidations);
  const { createProject, updateProject } = useProjectStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const handleModal = useCallback((value: boolean) => {
    setModal(value);
  }, []);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      createProject({
        title: title.trim(),
        categoryId: category.id,
        typeProjectId: typeProject.id,
        students: students.map((e: StudentModel) => e.id),
      });
    } else {
      updateProject(item.id, {
        title: title.trim(),
        categoryId: category.id,
        typeProjectId: typeProject.id,
        students: students.map((e: StudentModel) => e.id),
      });
    }
    handleClose();
    onResetForm();
  };
  const [modalCategory, setModalCategory] = useState(false);
  const handleModalCategory = useCallback((value: boolean) => {
    setModalCategory(value);
  }, []);
  const [modalTypeProject, setModalTypeProject] = useState(false);
  const handleModalTypeProject = useCallback((value: boolean) => {
    setModalTypeProject(value);
  }, []);
  return (
    <>
      {modalCategory && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title="Categorias:"
          opendrawer={modalCategory}
          handleDrawer={handleModalCategory}
        >
          <CategoryTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (category == null || category.id != v.id) {
                onValueChange('category', v);
                handleModalCategory(false);
              }
            }}
            items={category == null ? [] : [category.id]}
          />
        </ModalSelectComponent>
      )}
      {modalTypeProject && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title="Tipos de proyectos:"
          opendrawer={modalTypeProject}
          handleDrawer={handleModalTypeProject}
        >
          <TypeProjectTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (typeProject == null || typeProject.id != v.id) {
                onValueChange('typeProject', v);
                handleModalTypeProject(false);
              }
            }}
            items={typeProject == null ? [] : [typeProject.id]}
          />
        </ModalSelectComponent>
      )}

      {modal && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={true}
          title="Estudiantes:"
          opendrawer={modal}
          handleDrawer={handleModal}
        >
          <StudentTable
            stateSelect={true}
            itemSelect={(v) => {
              if (students.map((e: StudentModel) => e.id).includes(v.id)) {
                onValueChange('students', [
                  ...students.filter((e: StudentModel) => e.id != v.id),
                ]);
              } else {
                onValueChange('students', [...students, v]);
              }
            }}
            items={students.map((e: StudentModel) => e.id)}
          />
        </ModalSelectComponent>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {item == null ? 'Nuevo Proyecto' : `${item.title}`}
        </DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={9} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Titulo"
                  name="title"
                  value={title}
                  onChange={onInputChange}
                  error={!!titleValid && formSubmitted}
                  helperText={formSubmitted ? titleValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={category != null ? 'Categoria' : ''}
                  title={category != null ? category.name : 'Categoria'}
                  onPressed={() => handleModalCategory(true)}
                  error={!!categoryValid && formSubmitted}
                  helperText={formSubmitted ? categoryValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={typeProject != null ? 'Tipo de proyecto' : ''}
                  title={
                    typeProject != null ? typeProject.name : 'Tipo de proyecto'
                  }
                  onPressed={() => handleModalTypeProject(true)}
                  error={!!typeProjectValid && formSubmitted}
                  helperText={formSubmitted ? typeProjectValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={students != null ? '' : 'Estudiantes'}
                  title={'Estudiantes'}
                  onPressed={() => handleModal(true)}
                  error={!!studentsValid && formSubmitted}
                  helperText={formSubmitted ? studentsValid : ''}
                  items={students.map((e: StudentModel) => ({
                    id: e.id,
                    name: e.user.name,
                  }))}
                  onRemove={(v) =>
                    onValueChange('students', [
                      ...students.filter((e: StudentModel) => e.id != v),
                    ])
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                onResetForm();
                handleClose();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">{item == null ? 'CREAR' : 'EDITAR'}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
