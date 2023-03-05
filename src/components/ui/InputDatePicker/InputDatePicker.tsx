import { Typography } from "@mui/material";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FC } from "react";
import { Controller, Control } from "react-hook-form";

interface InputDatePickerProps {
  name: string;
  label: string;
  type?: string;
  autoFocus?: boolean;
  control: Control<any>;
  error: string | undefined;
}

export const InputDatePicker: FC<InputDatePickerProps> = ({
  name, label, type = "text", autoFocus = false, control, error
}) => {
  return (
    <div>
      <Controller
        name={'DatePicker'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            onChange={onChange}
            selected={value}
          />
        )}
      />
      <Typography sx={{ mb: '10px', color: 'red' }}>
        {error}
      </Typography>
    </div>
  )
}