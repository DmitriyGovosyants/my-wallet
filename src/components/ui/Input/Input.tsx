import { Typography } from "@mui/material";
import { FC } from "react";
import { Controller, Control } from "react-hook-form";
import { InputStyled } from "./Input.styled";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  autoFocus?: boolean;
  control: Control<any>;
  error: string | undefined;
}

export const Input: FC<InputProps> = ({
  name, label, type = "text", autoFocus = false, control, error
}) => {

  let inputStep: {step?: number} = {};
  if (type === "number") {
    inputStep.step = 0.01;
  }

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
            variant="standard"
            inputProps={{
              ...inputStep
            }}
          />
        )}
      />
      <Typography sx={{ color: 'red' }}>
        {error}
      </Typography>
    </div>
  )
}