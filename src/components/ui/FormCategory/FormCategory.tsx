import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FC } from "react";
import { toast } from "react-toastify";

import { categoriesIcons } from "data/categoriesIcons";
import { ICategory, useAddCategoryMutation, useUpdateCategoryMutation } from "redux/categoriesApi/categoriesApi";
import { categorySchema, IErrorAPI, requestErrorPopUp } from "utils";
import { ButtonMain, Input, InputRadioIcons, SpinnerFixed, TitleMain, WrapperButtons, WrapperInfo } from "components/ui";
import { Form } from "./FormCategory.styled";
import { useChangeScreen } from "hooks/useChangeScreen";
import { SCREEN } from "constants/screenStatus";


type FormCategoryProps = {
  categoryData: ICategory;
  title: string;
  formTypeEdit?: boolean;
};

type FormData = yup.InferType<typeof categorySchema>;

export const FormCategory: FC<FormCategoryProps> = ({ formTypeEdit, title, categoryData }) => {
  const [addCategory, { isLoading: isAddingCategory }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdatingCategory }] = useUpdateCategoryMutation();
  const handleChangeScreen = useChangeScreen();

  const createDefaultValues = {
    title: '',
    icon: categoriesIcons[0].label,
  };

  const editDefaultValues = {
    title: categoryData.title,
    icon: categoryData.icon,
  };

  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(categorySchema),
    defaultValues: formTypeEdit ? editDefaultValues : createDefaultValues,
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      if (!formTypeEdit) {
        await addCategory({ type: categoryData.type, ...data }).unwrap();
        toast.info(`"${data.title}" category created`);
      }
      if (formTypeEdit) {
        await updateCategory({ categoryID: categoryData._id, body: { type: categoryData.type, ...data } }).unwrap();
        toast.info(`"${data.title}" category updated`);
      }
      handleChangeScreen(SCREEN["CATEGORIES.TABLE"]);
    } catch (e) {
      requestErrorPopUp(e as IErrorAPI);
    }
  };

  return (
    <WrapperInfo>
      <TitleMain fz="30px">{title}</TitleMain>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Input
          name={"title"}
          label={"Title"}
          autoFocus={true}
          control={control}
          error={errors?.title?.message}
        />
        <InputRadioIcons
          iconsGroup={categoriesIcons}
          name={"icon"}
          label={"Choose icon"}
          control={control}
          error={errors?.icon?.message}
        />
        <WrapperButtons>
          <ButtonMain isDisabled={isAddingCategory || isUpdatingCategory} type="submit">
            {formTypeEdit ? 'update' : 'create'}
          </ButtonMain>
          {formTypeEdit && 
            <ButtonMain onClick={() => handleChangeScreen(SCREEN["CATEGORIES.DELETE"])}>
              delete
            </ButtonMain>
          }
          <ButtonMain onClick={() => handleChangeScreen(SCREEN["CATEGORIES.TABLE"])}>
            back
          </ButtonMain>
        </WrapperButtons>
      </Form>
      {(isAddingCategory || isUpdatingCategory) && <SpinnerFixed />}
    </WrapperInfo>
  )
};