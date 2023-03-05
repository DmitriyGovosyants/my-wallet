import { FC } from "react";
import { Controller, Control } from "react-hook-form";
import { FormControlLabel, Radio, FormControl, Typography } from "@mui/material";
import { accountsIcons } from "data/accountsIcons";
import { RadioGroupStyled, Icon } from "./InputAccountsIcons.styled";

interface InputAccountsIconsProps {
  name: string;
  label: string;
  control: Control<any>;
  error: string | undefined;
}

export const InputAccountsIcons: FC<InputAccountsIconsProps> = ({ name, label, control, error }) => {

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) =>
          <FormControl>
            <RadioGroupStyled
              aria-labelledby={label}
              defaultValue={value}
              value={value}
              onChange={onChange}
            >
              {accountsIcons.map(({src, label}) => 
                <FormControlLabel
                  key={label}
                  value={label}
                  control={<Radio sx={{display: 'none'}} />}
                  label={<Icon src={src} alt={label} />}
                />
              )}
            </RadioGroupStyled>
          </FormControl>
        } 
      />
      <Typography sx={{ color: 'red' }}>
        {error}
      </Typography>
    </div>
  )
}