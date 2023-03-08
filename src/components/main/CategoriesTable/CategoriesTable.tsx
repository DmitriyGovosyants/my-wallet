import { FC } from "react";
import { ButtonIcon, TitleMain, WrapperInfo } from "components/ui";
import { getIconSrc } from "utils";
import { categoryTypes, ICategory, useGetCategoriesQuery } from "redux/categoriesApi/categoriesApi";
import { TitleWrapper, CategoryIcon, IconItem, IconList } from "./CategoriesTable.styled";
import { CATEGORIES_SCREEN } from "constants/categoriesScreen";
import { categoriesIcons } from "data/categoriesIcons";
import { MdAddCircleOutline } from "react-icons/md";

type CategoriesTableProps = {
  setCategoryScreen: (value: string) => void;
  setCategoryData: (value: ICategory | ((prevState: ICategory) => ICategory)) => void;
};

export const CategoriesTable: FC<CategoriesTableProps> = ({ setCategoryScreen, setCategoryData }) => {
  const { data: userCategories } = useGetCategoriesQuery();

  const handleAddCategory = (type: categoryTypes) => {
    setCategoryData(prev => ({ ...prev, type }));
    setCategoryScreen(CATEGORIES_SCREEN.CREATE);
  };

  const handleEditCategory = (category: ICategory) => {
    setCategoryData(prev => ({ ...prev, ...category }));
    setCategoryScreen(CATEGORIES_SCREEN.EDIT);
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