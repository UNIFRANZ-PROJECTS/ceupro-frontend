import { useForm, useParallelStore } from '@/hooks';
import { FormParallelFileModel, FormParallelFileValidations } from '@/models';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FormEvent } from 'react';
import { FileUploader } from "react-drag-drop-files";

interface createProps {
  open: boolean;
  handleClose: () => void;
}

const formFields: FormParallelFileModel = {
  file: null,
};

const formValidations: FormParallelFileValidations = {
  file: [(value) => value != null, 'Debe ingresar el docente'],
};

export const ParallelUploadFile = (props: createProps) => {
  const { open, handleClose } = props;
  const {
    file,
    isFormValid,
    onValueChange,
    onResetForm,
    fileValid,
  } = useForm(formFields, formValidations);

  const { createParallels } = useParallelStore();

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;
    await createParallels(file);
    handleClose();
    onResetForm();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Carga de excel'}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <FileUploader handleChange={(file: File) => onValueChange('file', file)} name="file" types={["XLSX"]} />
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
            <Button type="submit">{'SUBIR'}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
