import { ComponentButton } from "@/components"
import { Stack, SvgIcon, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { Add, Upload } from "@mui/icons-material";
import { ParallelModel } from "@/models";
import { ParallelCreate, ParallelTable, ParallelUploadFile } from ".";

export const ParallelView = () => {
  const [itemEdit, setItemEdit] = useState<ParallelModel | null>(null);
  
  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const [openDialog, setopenDialog] = useState(false);
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);
  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const [openDialogUpload, setopenDialogUpload] = useState(false);
  const handleDialogUpload = (value: boolean) => {
    setopenDialogUpload(value);
  };
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Typography variant="h6">Paralelos</Typography>
        <ComponentButton
          text="Cargar excel"
          onClick={() => handleDialogUpload(true)}
          startIcon={<SvgIcon fontSize="small"><Upload /></SvgIcon>} />
        <ComponentButton
          text="Nuevo Paralelo"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
      </Stack>
      <ParallelTable
        handleEdit={(v) => {
          setItemEdit(v)
          handleDialog(true)
        }}
      />
      {
        openDialog &&
        <ParallelCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit == null ? null : { ...itemEdit }}
        />
      }
      {
        openDialogUpload &&
        <ParallelUploadFile
          open={openDialogUpload}
          handleClose={() => handleDialogUpload(false)}
        />
      }
    </>
  )
}
