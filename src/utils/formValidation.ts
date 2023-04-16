import * as Yup from 'yup';

const emailRegEx: RegExp = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{1,})$/;
const passwordRegEx: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,})/;
const nameRegEx: RegExp = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s]*$/;
const patternTransactionValue: RegExp = /^(\d+(?:[.,]\d{1,2})?)$/;
const patternBalanceValue: RegExp = /^-?(\d+(?:[.,]\d{1,2})?)$/;

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
  .min(-999999999999)
  .max(999999999999)
  .test(
    "is-decimal",
    "The amount should be a decimal with maximum two digits after comma",
    (val: number) => {
      if (val !== undefined) {
        return patternBalanceValue.test(val.toString());
      }
      return true;
    }
  )
  .typeError('You must specify a number');

const transactionNumber = Yup.number()
  .required('Value is required')
  .min(-999999999999)
  .max(999999999999)
  .test(
    "is-decimal",
    "The amount should be a positive decimal with maximum two digits after comma",
    (val: number) => {
      if (val === 0) {
        return false;
      }
      if (val !== undefined) {
        return patternTransactionValue.test(val.toString());
      }
      
      return true;
    }
  )
  .typeError('You must specify a number');

const startDate = Yup.string()
  .required('Start date is required');

const icon = Yup.string()
  .required('Icon is required');

const account_id = Yup.string()
  .required('Account is required');

const comment = Yup.string()
  .ensure()
  .trim()
  .max(32)

const category_id = Yup.string()
  .required('Category is required');

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

export const transactionSchema = Yup.object({
  account_id,
  date: startDate,
  value: transactionNumber,
  comment,
  category_id,
});