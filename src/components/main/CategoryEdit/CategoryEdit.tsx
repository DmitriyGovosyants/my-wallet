import { FormCategory, TitleMain, WrapperInfo } from "components/ui";
import { FC } from "react";
import { ICategory } from "redux/categoriesApi/categoriesApi";

type CategoryEditProps = {
  setCategoryScreen: (value: string) => void;
  categoryData: ICategory;
};

export const CategoryEdit: FC<CategoryEditProps> = ({categoryData, setCategoryScreen}) => {
  return (
    <WrapperInfo>
      <TitleMain fz="30px">{`"${categoryData.title}" ${categoryData.type} category`}</TitleMain>
      <FormCategory
        setCategoryScreen={setCategoryScreen}
        categoryData={categoryData}
        formTypeEdit
      />
    </WrapperInfo>
  )
}