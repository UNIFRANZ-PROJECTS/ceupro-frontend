import { ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components"
import { useForm, useProjectStore } from "@/hooks";
import { FormProjectModel, FormProjectValidations, ProjectModel, SubjectModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { FormEvent, useCallback, useState } from "react";
import { SubjectTable } from "../subject";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: ProjectModel | null;
}

const formFields: FormProjectModel = {
  title: '',
  category: null,
  typeProject: null,
  season: null
}

const formValidations: FormProjectValidations = {
  title: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  category: [(value) => value != null, 'Debe ingresar el docente'],
  typeProject: [(value) => value != null, 'Debe ingresar la materia'],
  season: [(value) => value != null, 'Debe ingresar la materia'],

}

export const ProjectCreate = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const {
    name, price, subjects,
    onInputChange, isFormValid, onValueChange, onResetForm,
    nameValid, priceValid, subjectsValid } = useForm(item ?? formFields, formValidations);
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
      createProject(
        {
          name: name.trim(),
        });
    } else {
      updateProject(item.id,
        {
          name: name.trim(),
        });
    }
    handleClose();
    onResetForm();
  }

  return (
    <>
      {
        modal &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={true}
          title='Etapas:'
          opendrawer={modal}
          handleDrawer={handleModal}
        >
          <SubjectTable
            stateSelect={true}
            itemSelect={(v) => {
              if (subjects.map((e: SubjectModel) => e.id).includes(v.id)) {
                onValueChange('subjects', [...subjects.filter((e: SubjectModel) => e.id != v.id)])
              } else {
                onValueChange('subjects', [...subjects, v])
              }
            }}
            items={subjects.map((e: SubjectModel) => (e.id))}
          />
        </ModalSelectComponent>
      }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Proyecto' : `${item.title}`}</DialogTitle>
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
              <Grid item xs={12} sm={3} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Precio"
                  name="price"
                  value={price}
                  onChange={onInputChange}
                  error={!!priceValid && formSubmitted}
                  helperText={formSubmitted ? priceValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={subjects != null ? '' : 'Materias'}
                  title={'Materias'}
                  onPressed={() => handleModal(true)}
                  error={!!subjectsValid && formSubmitted}
                  helperText={formSubmitted ? subjectsValid : ''}
                  items={subjects.map((e: SubjectModel) => ({ id: e.id, name: e.name }))}
                  onRemove={(v) => onValueChange('subjects', [...subjects.filter((e: SubjectModel) => e.id != v)])}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              onResetForm();
              handleClose()
            }}>Cancelar</Button>
            <Button type="submit">
              {item == null ? 'CREAR' : 'EDITAR'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
