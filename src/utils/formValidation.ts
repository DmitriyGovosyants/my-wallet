import * as Yup from 'yup';

const emailRegEx: RegExp = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{1,})$/;
const passwordRegEx: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,})/;
const nameRegEx: RegExp = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s]*$/;
const patternTwoDigisAfterComma: RegExp = /^\d+(\.\d{0,2})?$/;

const isValidDomain = (email: string): boolean => {
  const validDomenName: string[] = ['com', 'net', 'org', 'ua', 'ru', 'gov', 'ca'];
  const emailChunks: string[] = email.split('.');
  const currentDomenName: string = emailChunks[emailChunks.length - 1];
  if (validDomenName.indexOf(currentDomenName) !== -1) {
    return true;
  }
  return false;
};

const name = Yup.string()
  .trim()
  .required('Name is required')
  .min(2)
  .max(16)
  .matches(nameRegEx, 'Name must contain only letters');

const email = Yup.string()
  .trim()
  .required('E-mail is required')
  .matches(emailRegEx, 'E-mail must contain @ and domain name')
  .test(
    'domain-match',
    'Domain must contain only .com, .net, .org, .ua, .ru, .gov, .ca',
    value => isValidDomain(value)
  )
  .max(255);

const password = Yup.string()
  .required('Password is required')
  .max(32)
  .matches(
    passwordRegEx,
    'Password must contain min 7 Characters, uppercase, lowercase, number and special case character'
  );

const confirmPassword = Yup.string().test(
  'passwords-match',
  'Passwords must match',
  function (value) {
    return this.parent.password === value;
  }
);

const currency = Yup.string().required();

const title = Yup.string()
  .trim()
  .required('Title is required')
  .min(2)
  .max(16);

const startBalance = Yup.number()
  .required('Start balance is required')
  .min(-1000000000000)
  .max(1000000000000)
  .test(
    "is-decimal",
    "The amount should be a decimal with maximum two digits after comma",
    (val: any) => {
      if (val !== undefined) {
        return patternTwoDigisAfterComma.test(val);
      }
      return true;
    }
  )
  .typeError('You must specify a number');

const startDate = Yup.string()
  .required('Start date is required');

const icon = Yup.string()
  .required('Icon is required');

export const loginSchema = Yup.object({
  email,
  password,
});

export const registerSchema = Yup.object({
  name,
  email,
  password,
  confirmPassword,
});

export const currencySchema = Yup.object({
  currency,
});

export const accountSchema = Yup.object({
  title,
  currency,
  startBalance,
  startDate,
  icon,
});

export const categorySchema = Yup.object({
  title,
  icon,
});