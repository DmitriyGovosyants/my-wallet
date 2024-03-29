import { FC } from "react";
import { toast } from "react-toastify";
import { ICategory, useDeleteCategoryMutation } from "redux/categoriesApi/categoriesApi";
import { IErrorAPI, requestErrorPopUp } from "utils";
import { ButtonMain, TitleMain, SpinnerFixed, WrapperButtons, WrapperInfo } from "components/ui";
import { useChangeScreen } from "hooks/useChangeScreen";
import { SCREEN } from "constants/screenStatus";
import { useGetTransactionsQuery } from "redux/transactionsApi/transactionsApi";

type CategoryDeleteProps = {
  categoryData: ICategory;
};

export const CategoryDelete: FC<CategoryDeleteProps> = ({categoryData}) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const { data, refetch: refetchTransactions } = useGetTransactionsQuery();
  const handleChangeScreen = useChangeScreen();

  const handleCategoryDelete = async (): Promise<void> => {
    try {
      await deleteCategory(categoryData._id).unwrap();
      await refetchTransactions();
      toast.info(`"${categoryData.title}" category deleted`);
      handleChangeScreen(SCREEN["CATEGORIES.TABLE"]);
    } catch (e) {
      requestErrorPopUp(e as IErrorAPI);
    }
  };

  return (
    <>
      <WrapperInfo>
        <TitleMain fz="30px">
          {`Are you sure you want to delete "${categoryData.title}" with all transactions in this category?`}
        </TitleMain>
        <WrapperButtons>
          <ButtonMain
            onClick={handleCategoryDelete}
            isDisabled={isLoading}
          >
            Delete
          </ButtonMain>
          <ButtonMain
            onClick={() => handleChangeScreen(SCREEN["CATEGORIES.EDIT"])}
          >
            Back
          </ButtonMain>
        </WrapperButtons>
      </WrapperInfo>
      {isLoading && <SpinnerFixed />}
    </>
  )
};