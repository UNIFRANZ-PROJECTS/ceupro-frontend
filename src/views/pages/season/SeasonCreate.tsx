import { ComponentDate, ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components"
import { useForm, useSeasonStore } from "@/hooks";
import { FormSeasonModel, FormSeasonValidations, SeasonModel, StageModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { FormEvent, useCallback, useState } from "react";
import { StageTable } from "../stage";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: SeasonModel | null;
}

const formFields: FormSeasonModel = {
  name: '',
  price: 0,
  start: null,
  end: null,
  stages: []
}

const formValidations: FormSeasonValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar el nombre'],
  price: [(value) => value != 0, 'Debe ingresar una descripcion'],
  start: [(value) => value != null, 'Debe ingresar el inicio de la temporada'],
  end: [(value) => value != null, 'Debe ingresar el finde la temporada'],
  stages: [(value) => value.length != 0, 'Debe ingresar almenos una etapa'],

}

export const SeasonCreate = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const {
    name, price, start, end, stages,
    onInputChange, isFormValid, onValueChange, onResetForm,
    nameValid, priceValid, startValid, endValid, stagesValid } = useForm(item ?? formFields, formValidations);
  const { createSeason, updateSeason } = useSeasonStore();
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
      createSeason(
        {
          name: name.trim(),
          price: parseInt(price),
          start,
          end,
          stages: stages.map((e: StageModel) => e.id)
        });
    } else {
      updateSeason(item.id,
        {
          name: name.trim(),
          price: parseInt(price),
          start,
          end,
          stages: stages.map((e: StageModel) => e.id)
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
          <StageTable
            stateSelect={true}
            itemSelect={(v) => {
              if (stages.map((e: StageModel) => e.id).includes(v.id)) {
                onValueChange('stages', [...stages.filter((e: StageModel) => e.id != v.id)])
              } else {
                onValueChange('stages', [...stages, v])
              }
            }}
            items={stages.map((e: StageModel) => (e.id))}
          />
        </ModalSelectComponent>
      }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Rol' : `${item.name}`}</DialogTitle>
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
                  label="Precio"
                  name="price"
                  value={price}
                  onChange={onInputChange}
                  error={!!priceValid && formSubmitted}
                  helperText={formSubmitted ? priceValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentDate
                  title="Fecha inicio"
                  date={start}
                  onChange={(start) => onValueChange('start', start)}
                  error={!!startValid && formSubmitted}
                  helperText={formSubmitted ? startValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
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
                  label={stages != null ? '' : 'Etapas'}
                  title={'Etapas'}
                  onPressed={() => handleModal(true)}
                  error={!!stagesValid && formSubmitted}
                  helperText={formSubmitted ? stagesValid : ''}
                  items={stages.map((e: StageModel) => ({ id: e.id, name: e.name }))}
                  onRemove={(v) => onValueChange('stages', [...stages.filter((e: StageModel) => e.id != v)])}
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
