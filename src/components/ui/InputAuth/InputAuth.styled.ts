import styled from '@emotion/styled';
import { TextField } from '@mui/material';

export const InputStyled = styled(TextField)({
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