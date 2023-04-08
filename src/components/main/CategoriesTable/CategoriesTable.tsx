import { FC } from "react";
import { ButtonIcon, TitleMain, WrapperInfo } from "components/ui";
import { getIconSrc } from "utils";
import { categoryTypes, ICategory, useGetCategoriesQuery } from "redux/categoriesApi/categoriesApi";
import { TitleWrapper, CategoryIcon, IconItem, IconList } from "./CategoriesTable.styled";
import { categoriesIcons } from "data/categoriesIcons";
import { MdAddCircleOutline } from "react-icons/md";
import { useChangeScreen } from "hooks/useChangeScreen";
import { SCREEN } from "constants/screenStatus";

type CategoriesTableProps = {
  setCategoryData: (value: ICategory | ((prevState: ICategory) => ICategory)) => void;
};

export const CategoriesTable: FC<CategoriesTableProps> = ({ setCategoryData }) => {
  const { data: userCategories } = useGetCategoriesQuery();
  const handleChangeScreen = useChangeScreen();

  const handleAddCategory = (type: categoryTypes) => {
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
        <TitleMain fz="30px" mb='0px'>Revenues</TitleMain>
        <ButtonIcon onClick={() => handleAddCategory(categoryTypes.Revenue)} type="button">
          <MdAddCircleOutline size={40} color={'green'} />
        </ButtonIcon>
      </TitleWrapper>
      <IconList isHidden={userCategories?.length === 0}>
        {userCategories && (
          userCategories.filter(({type}) => type === categoryTypes.Revenue).map(category =>
            <IconItem key={category._id} onClick={() => handleEditCategory(category)}>
              <CategoryIcon src={getIconSrc(category.icon, categoriesIcons)} alt={category.icon} />
              <p>{category.title}</p>
            </IconItem>
          )
        )}
      </IconList>
      <TitleWrapper>
        <TitleMain fz="30px" mb='0px'>Expenses</TitleMain>
        <ButtonIcon onClick={() => handleAddCategory(categoryTypes.Expense)} type="button">
          <MdAddCircleOutline size={40} color={'green'} />
        </ButtonIcon>
      </TitleWrapper>
      <IconList isHidden={userCategories?.length === 0}>
        {userCategories && (
          userCategories.filter(({type}) => type === categoryTypes.Expense).map(category =>
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