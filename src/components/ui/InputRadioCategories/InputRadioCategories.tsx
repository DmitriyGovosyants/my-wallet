import { FC } from "react";
import { Controller, Control } from "react-hook-form";
import { FormControlLabel, Radio, Typography } from "@mui/material";

import { ICategory } from "redux/categoriesApi/categoriesApi";
import { getIconSrc } from "utils";
import { categoriesIcons } from "data/categoriesIcons";
import { CategoryIcon, IconItem, RadioGroupStyled } from "./InputRadioCategories.styled";


type InputRadioCategoriesProps = {
  categoriesGroup: ICategory[];
  name: string;
  label: string;
  control: Control<any>;
  error: string | undefined;
}

export const InputRadioCategories: FC<InputRadioCategoriesProps> = ({categoriesGroup, name, label, control, error }) => {

  return (
    <div style={{width: '100%'}}>
      <Typography sx={{ color: 'red' }}>
        {error}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) =>
          <RadioGroupStyled
            aria-labelledby={label}
            defaultValue={value}
            value={value}
            onChange={onChange}
          >
            {categoriesGroup.map(({_id, icon, title}) => 
              <FormControlLabel
                key={_id}
                value={_id}
                control={<Radio sx={{display: 'none'}} />}
                label={
                  <IconItem>
                    <CategoryIcon src={getIconSrc(icon, categoriesIcons)} alt={title} />
                    <p>{title}</p>
                  </IconItem>
                }
              />
            )}
          </RadioGroupStyled>
        } 
      />
    </div>
  )
}