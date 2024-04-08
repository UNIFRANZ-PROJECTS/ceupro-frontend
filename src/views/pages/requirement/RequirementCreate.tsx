import { ComponentInput } from "@/components"
import { useForm, useRequirementStore } from "@/hooks";
import { FormRequirementModel, FormRequirementValidations,  RequirementModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { FormEvent, useState } from "react";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: RequirementModel | null;
}

const formFields: FormRequirementModel = {
  name: '',
  description: '',
}

const formValidations: FormRequirementValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  description: [(value) => value.length >= 1, 'Debe ingresar la descripción'],

}
export const RequirementCreate = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const {
    name, description,
    onInputChange, isFormValid, onResetForm,
    nameValid, descriptionValid} = useForm(item ?? formFields, formValidations);
  const { createRequirement, updateRequirement } = useRequirementStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      createRequirement(
        {
          name: name.trim(),
          description: description.trim(),
        });
    } else {
      updateRequirement(item.id,
        {
          name: name.trim(),
          description: description.trim(),
        });
    }
    handleClose();
    onResetForm();
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} style={{zIndex:10000}} >
        <DialogTitle>{item == null ? 'Nuevo Requisito' : `${item.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
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
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Descripción"
                  name="description"
                  value={description}
                  onChange={onInputChange}
                  error={!!descriptionValid && formSubmitted}
                  helperText={formSubmitted ? descriptionValid : ''}
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
