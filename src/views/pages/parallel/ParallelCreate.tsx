import {
  ComponentInput,
  ComponentSelect,
  ModalSelectComponent,
} from '@/components';
import { useForm, useParallelStore } from '@/hooks';
import {
  FormParallelModel,
  FormParallelValidations,
  ParallelModel,
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
import { SubjectTable } from '../subject';
import { TeacherTable } from '../teacher';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: ParallelModel | null;
}

const formFields: FormParallelModel = {
  name: '',
  teacher: null,
  subject: null,
};

const formValidations: FormParallelValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  teacher: [(value) => value != null, 'Debe ingresar el docente'],
  subject: [(value) => value != null, 'Debe ingresar la materia'],
};

export const ParallelCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const {
    name,
    teacher,
    subject,
    onInputChange,
    isFormValid,
    onValueChange,
    onResetForm,
    nameValid,
    teacherValid,
    subjectValid,
  } = useForm(item ?? formFields, formValidations);
  const { createParallel, updateParallel } = useParallelStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalSubject, setModalSubject] = useState(false);
  const handleModalSubject = useCallback((value: boolean) => {
    setModalSubject(value);
  }, []);
  const [modalTeacher, setModalTeacher] = useState(false);
  const handleModalTeacher = useCallback((value: boolean) => {
    setModalTeacher(value);
  }, []);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      await createParallel({
        name: name.trim(),
        teacherId: teacher.id,
        subjectId: subject.id,
      });
    } else {
      await updateParallel(item.id, {
        name: name.trim(),
        teacherId: teacher.id,
        subjectId: subject.id,
      });
    }
    handleClose();
    onResetForm();
  };

  return (
    <>
      {modalTeacher && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title="Docentes:"
          opendrawer={modalTeacher}
          handleDrawer={handleModalTeacher}
        >
          <TeacherTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (teacher == null || teacher.id != v.id) {
                onValueChange('teacher', v);
                handleModalTeacher(false);
              }
            }}
            items={teacher == null ? [] : [teacher.id]}
          />
        </ModalSelectComponent>
      )}
      {modalSubject && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title="Materias:"
          opendrawer={modalSubject}
          handleDrawer={handleModalSubject}
        >
          <SubjectTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (subject == null || subject.id != v.id) {
                onValueChange('subject', v);
                handleModalSubject(false);
              }
            }}
            items={subject == null ? [] : [subject.id]}
          />
        </ModalSelectComponent>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {item == null ? 'Nuevo Paralelo' : `${item.name}`}
        </DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={9} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Nombre"
                  name="name"
                  value={name}
                  onChange={onInputChange}
                  error={!!nameValid && formSubmitted}
                  helperText={formSubmitted ? nameValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={teacher != null ? 'Docente' : ''}
                  title={teacher != null ? teacher.user.name : 'Docente'}
                  onPressed={() => handleModalTeacher(true)}
                  error={!!teacherValid && formSubmitted}
                  helperText={formSubmitted ? teacherValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={subject != null ? 'Materia' : ''}
                  title={subject != null ? subject.name : 'Materia'}
                  onPressed={() => handleModalSubject(true)}
                  error={!!subjectValid && formSubmitted}
                  helperText={formSubmitted ? subjectValid : ''}
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
