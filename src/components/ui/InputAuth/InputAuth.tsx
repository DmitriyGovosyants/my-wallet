import { Typography } from "@mui/material";
import { FC } from "react";
import { Controller, Control } from "react-hook-form";
import { InputStyled } from "./InputAuth.styled";

interface InputAuthProps {
  name: string;
  label: string;
  type?: string;
  autoFocus?: boolean;
  control: Control<any>;
  error: string | undefined;
}

export const InputAuth: FC<InputAuthProps> = ({
  name, label, type = "text", autoFocus = false, control, error
}) => {

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputStyled
            onChange={onChange}
            value={value}
            label={label}
            autoFocus={autoFocus}
            required
            type={type}
            variant="filled"
          />
        )}
      />
      <Typography sx={{ mb: '10px', color: 'red' }}>
        {error}
      </Typography>
    </div>
  )
}