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

export const registerSchema = yup.object().shape({
  firstName: yup.string().required(<Trans i18nKey="validation.firstName.required" />),

  lastName: yup.string().required(<Trans i18nKey="validation.lastName.required" />),

  email: yup
    .string()
    .email(<Trans i18nKey="validation.email.invalid" />)
    .required(<Trans i18nKey="validation.mail.required" />),

  password: yup
    .string()
    .min(8, <Trans i18nKey="validation.minDigit.password" values={{ min: 8 }} />)
    .max(25, <Trans i18nKey="validation.maxDigit.password" values={{ max: 25 }} />)
    .required(<Trans i18nKey="validation.password.required" />),

  passwordAgain: yup
    .string()
    .min(8, <Trans i18nKey="validation.minDigit.password" values={{ min: 8 }} />)
    .max(25, <Trans i18nKey="validation.maxDigit.password" values={{ max: 25 }} />)
    .oneOf([yup.ref('password')], <Trans i18nKey="validation.passwordsDontMatch" />)
    .required(<Trans i18nKey="validation.passwordAgain.required" />)
});
