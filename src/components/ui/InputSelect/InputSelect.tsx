import { Typography, MenuItem } from "@mui/material";
import { FC } from "react";
import { Controller, Control } from "react-hook-form";
import { SelectStyled } from "./InputSelect.styled";

interface InputSelectProps {
  name: string;
  label: string;
  inputData: {
    value: string;
    label: string;
  }[];
  control: Control<any>;
  error: string | undefined;
}

export const InputSelect: FC<InputSelectProps> = ({name, label, inputData, control, error}) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <SelectStyled
            select
            label={label}
            value={value}
            onChange={onChange}
            variant="standard"
          >
            {inputData.map(({value}) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </SelectStyled>
        )}
      />
      <Typography sx={{ mb: '10px', color: 'black' }}>
        {error}
      </Typography>
    </div>
  )
}