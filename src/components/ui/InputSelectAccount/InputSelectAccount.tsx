import { Typography, MenuItem } from "@mui/material";
import { accountsIcons } from "data/accountsIcons";
import { FC } from "react";
import { Controller, Control } from "react-hook-form";
import { IAccount } from "redux/accounts/accountsApi";
import { getIconSrc } from "utils";
import { SelectStyled } from "./InputSelectAccount.styled";

interface InputSelectAccountProps {
  name: string;
  label: string;
  inputData: IAccount[] | undefined;
  control: Control<any>;
  error: string | undefined;
}

export const InputSelectAccount: FC<InputSelectAccountProps> = ({name, label, inputData, control, error}) => {
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
            {inputData?.map(({_id, title, icon, currency}) => (
              <MenuItem key={_id} value={_id}>
                <img src={getIconSrc(icon, accountsIcons)} alt={title} />
                {title}
                {currency}
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