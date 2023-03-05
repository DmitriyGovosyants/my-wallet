import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import authBackground from 'data/image/auth-background.jpg';

export const AuthBackground = styled.div`
  height: 100dvh;

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  background-image: linear-gradient(
      to right,
      rgba(47, 48, 58, 0.5),
      rgba(47, 48, 58, 0.5)
    ),
    url(${authBackground});
`;

export const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  padding-right: 200px;
  padding-top: 20dvh;
`;

export const HelperText = styled.p`
  margin-top: 20px;
  color: white;
`

export const TextFieldStyled = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "transparent",
    boxShadow: "inset 0 0 10px #000000"
  },
  "& label": {
    color: "brown",
    fontSize: "26px"
  },
  "& input": {
    paddingTop: "35px",
    color: "white",
    fontSize: "26px"
  },
  "& input:hover": {
    outline: "1px solid brown",
  },
  "& label.Mui-focused": {
    color: "green"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green"
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent"
    },
    "&:hover fieldset": {
      borderColor: "green"
    },
    "&.Mui-focused fieldset": {
      borderColor: "green"
    }
  }
});