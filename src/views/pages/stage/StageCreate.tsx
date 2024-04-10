import {
  ComponentDate,
  ComponentInput,
  ComponentSelect,
  ModalSelectComponent,
} from '@/components';
import { useForm, useStageStore } from '@/hooks';
import {
  StageModel,
  FormStageModel,
  FormStageValidations,
  RequirementModel,
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
import { RequirementTable } from '../requirement';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: StageModel | null;
}

const formFields: FormStageModel = {
  name: '',
  start: null,
  end: null,
  weighing: 0,
  requirements: [],
};

const formValidations: FormStageValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  start: [(value) => value != null, 'Debe ingresar el nombre'],
  end: [(value) => value != null, 'Debe ingresar el nombre'],
  weighing: [(value) => value != 0, 'Debe ingresar el nombre'],
  requirements: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
};

export const StageCreate = (props: createProps) => {
  const { open, handleClose, item } = props;
  const { createStage, updateStage } = useStageStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    name,
    start,
    end,
    weighing,
    requirements,
    onInputChange,
    isFormValid,
    onValueChange,
    onResetForm,
    nameValid,
    startValid,
    endValid,
    weighingValid,
    requirementsValid,
  } = useForm(item ?? formFields, formValidations);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
      if (item == null) {
        await createStage({
          name: name.trim(),
          start,
          end,
          weighing: parseInt(weighing),
          requirements: requirements.map((e: RequirementModel) => e.id),
        });
      } else {
        await updateStage(item.id, {
          name: name.trim(),
          start,
          end,
          weighing: parseInt(weighing),
          requirements: requirements.map((e: RequirementModel) => e.id),
        });
      }
      handleClose();
      onResetForm();
  };

  const [modal, setModal] = useState(false);
  const handleModal = useCallback((value: boolean) => {
    setModal(value);
  }, []);

  return (
    <>
      {modal && (
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={true}
          title="Requisitos:"
          opendrawer={modal}
          handleDrawer={handleModal}
        >
          <RequirementTable
            stateSelect={true}
            itemSelect={(v) => {
              if (
                requirements.map((e: RequirementModel) => e.id).includes(v.id)
              ) {
                onValueChange('requirements', [
                  ...requirements.filter((e: RequirementModel) => e.id != v.id),
                ]);
              } else {
                onValueChange('requirements', [...requirements, v]);
              }
            }}
            items={requirements.map((e: RequirementModel) => e.id)}
          />
        </ModalSelectComponent>
      )}
      <Dialog open={open} onClose={handleClose} style={{ zIndex: 9998 }}>
        <DialogTitle>
          {item == null ? 'Nueva Etapa' : `${item.name}`}
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
              <Grid item xs={12} sm={3} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Ponderación"
                  name="weighing"
                  value={weighing}
                  onChange={onInputChange}
                  error={!!weighingValid && formSubmitted}
                  helperText={formSubmitted ? weighingValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentDate
                  title="Fecha inicio"
                  date={start}
                  onChange={(start) => onValueChange('start', start)}
                  error={!!startValid && formSubmitted}
                  helperText={formSubmitted ? startValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentDate
                  title="Fecha fin"
                  date={end}
                  onChange={(end) => onValueChange('end', end)}
                  error={!!endValid && formSubmitted}
                  helperText={formSubmitted ? endValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={requirements != null ? '' : 'Requisitos'}
                  title={'Requisitos'}
                  onPressed={() => handleModal(true)}
                  error={!!requirementsValid && formSubmitted}
                  helperText={formSubmitted ? requirementsValid : ''}
                  items={requirements.map((e: RequirementModel) => ({
                    id: e.id,
                    name: e.name,
                  }))}
                  onRemove={(v) =>
                    onValueChange('requirements', [
                      ...requirements.filter(
                        (e: RequirementModel) => e.id != v
                      ),
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
