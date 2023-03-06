import { FC } from "react";
import { ICategory } from "redux/categoriesApi/categoriesApi";
import { FormCategory, TitleMain, WrapperInfo } from "components/ui";

type CategoryCreateProps = {
  setCategoryScreen: () => void;
  categoryData: ICategory;
};

export const CategoryCreate: FC<CategoryCreateProps> = ({ setCategoryScreen, categoryData }) => {
  return (
    <WrapperInfo>
      <TitleMain fz="30px">{`New ${categoryData.type} category`}</TitleMain>
      <FormCategory
        setCategoryScreen={setCategoryScreen}
        categoryData={categoryData}
      />
    </WrapperInfo>
  )
};