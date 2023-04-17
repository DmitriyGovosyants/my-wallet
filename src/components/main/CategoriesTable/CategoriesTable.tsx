import { FC } from "react";
import { TitleMain } from "components/ui";
import { getIconSrc } from "utils";
import { ICategory, useGetCategoriesQuery } from "redux/categoriesApi/categoriesApi";
import { Wrapper, CategoryIcon, IconItem, IconList } from "./CategoriesTable.styled";
import { categoriesIcons } from "data/categoriesIcons";
import { MdAddCircleOutline } from "react-icons/md";
import { useChangeScreen } from "hooks/useChangeScreen";
import { SCREEN } from "constants/screenStatus";
import { transactionTypes } from "redux/transactionsApi/transactionsApi";

type CategoriesTableProps = {
  setCategoryData: (value: ICategory | ((prevState: ICategory) => ICategory)) => void;
};

export const CategoriesTable: FC<CategoriesTableProps> = ({ setCategoryData }) => {
  const { data: userCategories } = useGetCategoriesQuery();
  const handleChangeScreen = useChangeScreen();

  const handleAddCategory = (type: transactionTypes) => {
    setCategoryData(prev => ({ ...prev, type }));
    handleChangeScreen(SCREEN["CATEGORIES.CREATE"]);
  };

  const handleEditCategory = (category: ICategory) => {
    setCategoryData(prev => ({ ...prev, ...category }));
    handleChangeScreen(SCREEN["CATEGORIES.EDIT"]);
  };

  return (
    <Wrapper>

      <TitleMain fz="30px" mb='10px'>Expenses</TitleMain>
      <IconList>
        {userCategories && (
          userCategories.filter(({ type }) => type === transactionTypes.Expense).map(category =>
            <IconItem key={category._id} onClick={() => handleEditCategory(category)}>
              <CategoryIcon src={getIconSrc(category.icon, categoriesIcons)} alt={category.icon} />
              <p>{category.title}</p>
            </IconItem>
          )
        )}
        <IconItem onClick={() => handleAddCategory(transactionTypes.Expense)}>
          <MdAddCircleOutline size={110} color={'green'} />
        </IconItem>
      </IconList>

      <TitleMain fz="30px" mb='10px'>Revenues</TitleMain>
      <IconList>
        {userCategories && (
          userCategories.filter(({type}) => type === transactionTypes.Revenue).map(category =>
            <IconItem key={category._id} onClick={() => handleEditCategory(category)}>
              <CategoryIcon src={getIconSrc(category.icon, categoriesIcons)} alt={category.icon} />
              <p>{category.title}</p>
            </IconItem>
          )
        )}
        <IconItem onClick={() => handleAddCategory(transactionTypes.Revenue)}>
          <MdAddCircleOutline size={110} color={'green'} />
        </IconItem>
      </IconList>

    </Wrapper>
  )
}