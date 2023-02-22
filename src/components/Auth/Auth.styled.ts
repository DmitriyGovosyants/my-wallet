import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import authBackground from '../../data/image/auth-background.jpg';

export const MainBox = styled.div`
  height: 100vh;

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  background-image: linear-gradient(
      to right,
      rgba(47, 48, 58, 0.5),
      rgba(47, 48, 58, 0.5)
    ),
    url(${authBackground});
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