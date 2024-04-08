import { ComponentButton } from '@/components';
import { Stack, SvgIcon, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { Add } from '@mui/icons-material';
import { RequirementModel } from '@/models';
import { RequirementCreate, RequirementTable } from '.';

export const RequirementView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<RequirementModel | null>(null);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null);
    setopenDialog(value);
  }, []);
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Requisitos de avances</Typography>
        <ComponentButton
          text="Nuevo Requisito"
          onClick={() => handleDialog(true)}
          startIcon={
            <SvgIcon fontSize="small">
              <Add />
            </SvgIcon>
          }
        />
      </Stack>
      <RequirementTable
        handleEdit={(v) => {
          setItemEdit(v);
          handleDialog(true);
        }}
      />
      {openDialog && (
        <RequirementCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit == null ? null : { ...itemEdit }}
        />
      )}
    </>
  );
};
