import { ComponentInput } from '@/components';
import { useForm, useStaffStore } from '@/hooks';
import {
  FormStaffModel,
  FormStaffValidations,
  StaffModel,
} from '@/models';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { FormEvent, useState } from 'react';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: StaffModel | null;
}

const formFields: FormStaffModel = {
  name: '',
  lastName: '',
  email: '',
  role:null,
};

const formValidations: FormStaffValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  lastName: [(value) => value.length >= 1, 'Debe ingresar el apellido'],
  email: [(value) => value.length >= 1, 'Debe ingresar el correo'],
  role: [(value) => value != null, 'Debe ingresar el correo'],

};

export const StaffCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const {
    code,
    name,
    lastName,
    email,
    onInputChange,
    isFormValid,
    onResetForm,
    codeValid,
    nameValid,
    lastNameValid,
    emailValid,
  } = useForm(item ?? formFields, formValidations);
  const { createStaff, updateStaff } = useStaffStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      createStaff({
        code: code.trim(),
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      });
    } else {
      updateStaff(item.id, {
        code: code.trim(),
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      });
    }
    handleClose();
    onResetForm();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {item == null ? 'Nuevo Estudiante' : `${item.user.name}`}
        </DialogTitle>
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
                  label="Apellido"
                  name="lastName"
                  value={lastName}
                  onChange={onInputChange}
                  error={!!lastNameValid && formSubmitted}
                  helperText={formSubmitted ? lastNameValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Cordigo de estudiante"
                  name="code"
                  value={code}
                  onChange={onInputChange}
                  error={!!codeValid && formSubmitted}
                  helperText={formSubmitted ? codeValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Correo"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  error={!!emailValid && formSubmitted}
                  helperText={formSubmitted ? emailValid : ''}
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
