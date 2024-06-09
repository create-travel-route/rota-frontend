import * as yup from 'yup';
import { Trans } from 'react-i18next';

export const basicFormSchema = yup.object().shape({
  departurePoint: yup
    .object({
      lat: yup.number().min(-90).max(90).required(),
      lng: yup.number().min(-180).max(180).required()
    })
    .nullable()
    .required(<Trans i18nKey="validation.departurePoint.required" />),

  arrivalPoint: yup
    .object({
      lat: yup.number().min(-90).max(90).required(),
      lng: yup.number().min(-180).max(180).required()
    })
    .nullable()
    .required(<Trans i18nKey="validation.arrivalPoint.required" />),

  budget: yup.number().min(1, <Trans i18nKey="validation.minValue.budget" values={{ min: 1 }} />),

  category: yup.string(),
  comment: yup.number().min(0),
  point: yup.number().min(0).max(5)
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

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(<Trans i18nKey="validation.email.invalid" />)
    .required(<Trans i18nKey="validation.mail.required" />),

  password: yup.string().required(<Trans i18nKey="validation.password.required" />),

  rememberMe: yup.boolean()
});

export const createPropertySchema = yup.object().shape({
  title: yup.string().required(<Trans i18nKey="validation.title.required" />),

  description: yup.string().required(<Trans i18nKey="validation.description.required" />),

  budget: yup
    .number()
    //.min(1, <Trans i18nKey="validation.minValue.budget" values={{ min: 1 }} />)
    .required(<Trans i18nKey="validation.budget.required" />),

  category: yup.string().required(<Trans i18nKey="validation.category.required" />),

  address: yup
    .object({
      lat: yup.number().min(-90).max(90).required(),
      lng: yup.number().min(-180).max(180).required()
    })
    .nullable()
    .required(<Trans i18nKey="validation.address.required" />)
});

export const updateAccountSchema = yup.object().shape({
  firstName: yup.string().required(<Trans i18nKey="validation.firstName.required" />),

  lastName: yup.string().required(<Trans i18nKey="validation.lastName.required" />)
});

export const rateAndCommentSchema = yup.object().shape({
  rate: yup
    .number()
    .min(1)
    .max(5)
    .required(<Trans i18nKey="validation.rate.required" />),

  comment: yup.string().required(<Trans i18nKey="validation.comment.required" />)
});
