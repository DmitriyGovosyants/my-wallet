import { FC } from "react";
import { toast } from "react-toastify";
import { ICategory, useDeleteCategoryMutation } from "redux/categoriesApi/categoriesApi";
import { IErrorAPI, requestErrorPopUp } from "utils";
import { ButtonMain, TitleMain, SpinnerFixed, WrapperButtons, WrapperInfo } from "components/ui";

type CategoryDeleteProps = {
  setCategoryScreen: () => void;
  categoryData: ICategory;
};

export const CategoryDelete: FC<CategoryDeleteProps> = ({categoryData, setCategoryScreen}) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleCategoryDelete = async (): Promise<void> => {
    try {
      await deleteCategory(categoryData._id).unwrap();
      toast.info(`"${categoryData.title}" category deleted`);
      setCategoryScreen();
    } catch (e) {
      requestErrorPopUp(e as IErrorAPI);
    }
  };

  return (
    <>
      <WrapperInfo>
        <TitleMain fz="30px">{`Are you sure you want to delete "${categoryData.title}"?`}</TitleMain>
        <WrapperButtons>
          <ButtonMain
            onClick={handleCategoryDelete}
            isDisabled={isLoading}
          >
            Delete
          </ButtonMain>
          <ButtonMain
            onClick={setCategoryScreen}
          >
            Back
          </ButtonMain>
        </WrapperButtons>
      </WrapperInfo>
      {isLoading && <SpinnerFixed />}
    </>
  )
};