import { FC } from "react";
import { ACCOUNTS_SCREEN } from "constants/accountsScreen";
import { ButtonMain, TitleMain, WrapperInfo } from "components/ui";
import { getAccountIconSrc, getCurrencyLabel } from "utils";
import { ICategory, useGetCategoriesQuery } from "redux/categoriesApi/categoriesApi";
import { Table, RowGrid, TitleData, RowData, Text, ButtonBox, AccountInterfaceBtn, DeleteIcon, EditIcon } from "./CategoriesTable.styled";
import { CATEGORIES_SCREEN } from "constants/categoriesScreen";


type CategoriesTableProps = {
  setCategoryScreen: (value: string) => void;
  setCategoryData: (value: ICategory | ((prevState: ICategory) => ICategory)) => void;
}

export const CategoriesTable: FC<CategoriesTableProps> = ({ setCategoryScreen, setCategoryData }) => {
  const { data: userCategories } = useGetCategoriesQuery();

  const handleAddRevenueCategory = () => {
    console.log(userCategories);
    setCategoryScreen(CATEGORIES_SCREEN.CREATE);
  }

  const handleAddExpenseCategory = () => {
    console.log(userCategories);
    setCategoryScreen(CATEGORIES_SCREEN.CREATE);
  }

  return (
    <WrapperInfo>
      <TitleMain fz="30px">Revenues</TitleMain>
      <ButtonMain onClick={handleAddRevenueCategory}>+</ButtonMain>
      <TitleMain fz="30px">Expenses</TitleMain>
      <ButtonMain onClick={handleAddExpenseCategory}>+</ButtonMain>
    </WrapperInfo>
  )
}