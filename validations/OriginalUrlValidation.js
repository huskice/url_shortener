import * as yup from 'yup'

export const urlSchema = yup
  .object()
  .shape({
    originalUrl: yup.string().required(),
  })
  .required()
