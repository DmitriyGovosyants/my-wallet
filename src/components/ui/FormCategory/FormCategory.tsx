import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FC } from "react";
import { toast } from "react-toastify";

import { categoriesIcons } from "data/categoriesIcons";
import { ICategory, useAddCategoryMutation, useUpdateCategoryMutation } from "redux/categoriesApi/categoriesApi";
import { categorySchema, IErrorAPI, requestErrorPopUp } from "utils";
import { ButtonMain, Input, InputRadioIcons, SpinnerFixed, WrapperButtons } from "components/ui";
import { Form } from "./FormCategory.styled";
import { CATEGORIES_SCREEN } from "constants/categoriesScreen";


type FormCategoryProps = {
  categoryData: ICategory;
  formTypeEdit?: boolean;
  setCategoryScreen: (value: string) => void;
};

type FormData = yup.InferType<typeof categorySchema>;

export const FormCategory: FC<FormCategoryProps> = ({ formTypeEdit, categoryData, setCategoryScreen }) => {
  const [addCategory, { isLoading: isAddingAccount }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdatingAccount }] = useUpdateCategoryMutation();

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
      setCategoryScreen(CATEGORIES_SCREEN.TABLE);
    } catch (e) {
      requestErrorPopUp(e as IErrorAPI);
    }
  };

  return (
    <>
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
          <ButtonMain isDisabled={isAddingAccount} type="submit">
            {formTypeEdit ? 'edit' : 'create'}
          </ButtonMain>
          {formTypeEdit && 
            <ButtonMain onClick={() => setCategoryScreen(CATEGORIES_SCREEN.DELETE)}>
              delete
            </ButtonMain>
          }
          <ButtonMain onClick={() => setCategoryScreen(CATEGORIES_SCREEN.TABLE)}>
            back
          </ButtonMain>
        </WrapperButtons>
      </Form>
      {isAddingAccount && <SpinnerFixed />}
    </>
  )
};