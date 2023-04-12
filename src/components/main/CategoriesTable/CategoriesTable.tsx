import { FC } from "react";
import { ButtonIcon, TitleMain, WrapperInfo } from "components/ui";
import { getIconSrc } from "utils";
import { ICategory, useGetCategoriesQuery } from "redux/categoriesApi/categoriesApi";
import { TitleWrapper, CategoryIcon, IconItem, IconList } from "./CategoriesTable.styled";
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
    <WrapperInfo>
      {userCategories?.length === 0 && <TitleMain>Create your first category</TitleMain>}
      <TitleWrapper>
        <TitleMain fz="30px" mb='0px'>Revenues categories</TitleMain>
        <ButtonIcon onClick={() => handleAddCategory(transactionTypes.Revenue)} type="button">
          <MdAddCircleOutline size={40} color={'green'} />
        </ButtonIcon>
      </TitleWrapper>
      <IconList isHidden={userCategories?.length === 0}>
        {userCategories && (
          userCategories.filter(({type}) => type === transactionTypes.Revenue).map(category =>
            <IconItem key={category._id} onClick={() => handleEditCategory(category)}>
              <CategoryIcon src={getIconSrc(category.icon, categoriesIcons)} alt={category.icon} />
              <p>{category.title}</p>
            </IconItem>
          )
        )}
      </IconList>
      <TitleWrapper>
        <TitleMain fz="30px" mb='0px'>Expenses categories</TitleMain>
        <ButtonIcon onClick={() => handleAddCategory(transactionTypes.Expense)} type="button">
          <MdAddCircleOutline size={40} color={'green'} />
        </ButtonIcon>
      </TitleWrapper>
      <IconList isHidden={userCategories?.length === 0}>
        {userCategories && (
          userCategories.filter(({type}) => type === transactionTypes.Expense).map(category =>
            <IconItem key={category._id} onClick={() => handleEditCategory(category)}>
              <CategoryIcon src={getIconSrc(category.icon, categoriesIcons)} alt={category.icon} />
              <p>{category.title}</p>
            </IconItem>
          )
        )}
      </IconList>
    </WrapperInfo>
  )
}