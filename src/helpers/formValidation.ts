import * as Yup from 'yup';

const emailRegEx = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{1,})$/;
const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,})/;
const nameRegEx = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s]*$/;

const isValidDomain = (email: string): boolean => {
  const validDomenName = ['com', 'net', 'org', 'ua', 'ru', 'gov', 'ca'];
  const emailChunks = email.split('.');
  const currentDomenName = emailChunks[emailChunks.length - 1];
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