import { FC, useState } from "react";
import { CategoriesTable, CategoryDelete } from "components";
import { ICategory, categoryTypes } from "redux/categoriesApi/categoriesApi";
import { SCREEN } from "constants/screenStatus";
import { useAppSelector } from "redux/reduxHooks";
import { FormCategory } from "components/ui";

const initialCategory = {
  type: categoryTypes.Revenue,
  title: "",
  icon: "",
  _id: "",
};

export const CategoriesScreen: FC = () => {
  const screenStatus = useAppSelector(({ screenStatus }) => screenStatus);
  const [categoryData, setCategoryData] = useState<ICategory>(initialCategory);

  return (
    <>
      {screenStatus === SCREEN["CATEGORIES.TABLE"] && <CategoriesTable
        setCategoryData={setCategoryData}
      />}
      {screenStatus === SCREEN["CATEGORIES.CREATE"] && <FormCategory
        title={`New ${categoryData.type} category`}
        categoryData={categoryData}
      />}
      {screenStatus === SCREEN["CATEGORIES.EDIT"] && <FormCategory
        title={`"${categoryData.title}" ${categoryData.type} category`}
        categoryData={categoryData}
        formTypeEdit
      />}
      {screenStatus === SCREEN["CATEGORIES.DELETE"] && <CategoryDelete
        categoryData={categoryData}
      />}
    </>
  )
}