import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Campo requerido',
  },
  number: {
    positive: 'Debe ser un número positivo',
  },
});

export const computePanelsSchema = yup.object({
  panelHeight: yup.number().positive().required(),
  panelWidth: yup.number().positive().required(),
  roofHeight: yup.number().positive().required(),
  roofWidth: yup.number().positive().required(),
});
