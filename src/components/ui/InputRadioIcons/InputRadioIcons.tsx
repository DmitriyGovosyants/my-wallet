import { FC } from "react";
import { Controller, Control } from "react-hook-form";
import { FormControlLabel, Radio, FormControl, Typography } from "@mui/material";
import { RadioGroupStyled, Icon } from "./InputRadioIcons.styled";
import { IICon } from "utils";

type InputRadioIconsProps = {
  iconsGroup: IICon[];
  name: string;
  label: string;
  control: Control<any>;
  error: string | undefined;
}

export const InputRadioIcons: FC<InputRadioIconsProps> = ({iconsGroup, name, label, control, error }) => {

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
              {iconsGroup.map(({src, label}) => 
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