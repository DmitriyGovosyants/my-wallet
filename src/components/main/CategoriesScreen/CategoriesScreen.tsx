import { FC, useState } from "react";
import { CategoriesTable, CategoryCreate, CategoryDelete, CategoryEdit } from "components";
import { ICategory, categoryTypes } from "redux/categoriesApi/categoriesApi";
import { CATEGORIES_SCREEN } from "constants/categoriesScreen";

const initialCategory = {
  type: categoryTypes.Revenue,
  title: "",
  icon: "",
  _id: "",
}
export const CategoriesScreen: FC = () => {
  const [categoryScreen, setCategoryScreen] = useState<string>(CATEGORIES_SCREEN.TABLE);
  const [categoryData, setCategoryData] = useState<ICategory>(initialCategory);

  return (
    <>
      {categoryScreen === CATEGORIES_SCREEN.TABLE && <CategoriesTable
        setCategoryScreen={setCategoryScreen}
        setCategoryData={setCategoryData}
      />}
      {categoryScreen === CATEGORIES_SCREEN.CREATE && <CategoryCreate
        categoryData={categoryData}
        setCategoryScreen={() => setCategoryScreen(CATEGORIES_SCREEN.TABLE)}
      />}
      {categoryScreen === CATEGORIES_SCREEN.EDIT && <CategoryEdit
        categoryData={categoryData}
        setCategoryScreen={setCategoryScreen}
      />}
      {categoryScreen === CATEGORIES_SCREEN.DELETE && <CategoryDelete
        categoryData={categoryData}
        setCategoryScreen={() => setCategoryScreen(CATEGORIES_SCREEN.TABLE)}
      />}
    </>
  )
}