import { FC } from "react";
import Button from "@mui/material/Button";

export const ButtonSubmit: FC = () => {
  return (
    <Button
      type="submit"
      variant="text"
      sx={{
        backgroundColor: '#00bcd4',
        width: '100%',
        boxShadow: 3,
        color: 'white',
        fontSize: '20px',
        letterSpacing: 5,
        paddingTop: '10px',
        paddingBottom: '10px',
        marginTop: '20px'
      }}
    >
      Submit
    </Button>
  )
}