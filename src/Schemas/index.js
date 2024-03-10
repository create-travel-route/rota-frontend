import * as yup from 'yup';
import { Trans } from 'react-i18next';

export const basicFormSchema = yup.object().shape({
  departurePoint: yup
    .object({
      lat: yup.number().min(-90).max(90).required(),
      lng: yup.number().min(-180).max(180).required()
    })
    .required(<Trans i18nKey="validation.departurePoint.required" />),

  arrivalPoint: yup
    .object({
      lat: yup.number().min(-90).max(90).required(),
      lng: yup.number().min(-180).max(180).required()
    })
    .required(<Trans i18nKey="validation.arrivalPoint.required" />),

  budget: yup.number().min(1, <Trans i18nKey="validation.minValue.budget" values={{ min: 1 }} />)
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(<Trans i18nKey="validation.email.invalid" />)
    .required(<Trans i18nKey="validation.mail.required" />),

  password: yup.string().required(<Trans i18nKey="validation.password.required" />)
});
