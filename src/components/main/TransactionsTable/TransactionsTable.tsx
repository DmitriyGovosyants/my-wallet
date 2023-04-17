import { ButtonIcon, TitleMain } from "components/ui";
import { SCREEN } from "constants/screenStatus";
import { useChangeScreen } from "hooks/useChangeScreen";
import { FC, useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "redux/reduxHooks";
import { transactionType } from "redux/transactionType/transactionTypeSlice";
import { ITransaction, transactionTypes, useGetTransactionsQuery } from "redux/transactionsApi/transactionsApi";
import { TransactionsTableList, TransactionsTableItem, TitleWrapper } from "./TransactionsTable.styled";
import { ICategory, useGetCategoriesQuery } from "redux/categoriesApi/categoriesApi";
import { TransactionsCategory } from "components";
import { getTransactionsByDate } from "utils";

type TransactionsTableProps = {
  setTransactionData: (value: ITransaction | ((prevState: ITransaction) => ITransaction)) => void;
};

type categoriesType = {
  revenue: ICategory[];
  expense: ICategory[];
}

interface ICategoryWithTransactions extends ICategory {
  transactions?: ITransaction[];
}

export type transactionsSortedType = {
  revenue: ICategoryWithTransactions[];
  expense: ICategoryWithTransactions[];
}

export const TransactionsTable: FC<TransactionsTableProps> = ({setTransactionData}) => {
  const { data: userTransactions } = useGetTransactionsQuery();
  const { data: userCategories } = useGetCategoriesQuery();
  const { year, month } = useAppSelector(({ chosesDate }) => chosesDate);
  const handleChangeScreen = useChangeScreen();
  const dispatch = useAppDispatch();

  const [transactionsByCategories, setTransactionsByCategories] = useState<transactionsSortedType>();
  const [expanded, setExpanded] = useState<string | false>(false);
  
  useEffect(() => {
    if (userTransactions && userCategories) {
      const transactionsByDate = getTransactionsByDate(year, month, userTransactions);

      const transactionsSortedByDate = transactionsByDate
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .sort((a, b) => Number(b.date.split('-')[2]) - Number(a.date.split('-')[2]));

      const categoriesByType = userCategories.reduce((acc: categoriesType, obj: ICategory) => {
        acc[obj.type].push(obj);
        return acc;
      }, { revenue: [], expense: [] });

      const categoriesTransactionsAdded = transactionsSortedByDate.reduce((acc: transactionsSortedType, obj: ITransaction) => {
        const categoryIndex = acc[obj.type].findIndex((category) => category._id === obj.category_id);

        acc[obj.type][categoryIndex].transactions = acc[obj.type][categoryIndex].transactions || [];
        acc[obj.type][categoryIndex].transactions?.push(obj);

        return acc;
      }, JSON.parse(JSON.stringify(categoriesByType)));

      setTransactionsByCategories(categoriesTransactionsAdded);
      
    };
  }, [month, userCategories, userTransactions, year]);

  const handleAddTransaction = (type: transactionTypes): void => {
    dispatch(transactionType(type))
    handleChangeScreen(SCREEN["TRANSACTION.CREATE"]);
  };

  return (
    <TransactionsTableList>

      <TransactionsTableItem>
        <TitleWrapper>
          <TitleMain fz="30px" mb='0px'>Expenses</TitleMain>
          <ButtonIcon onClick={() => handleAddTransaction(transactionTypes.Expense)} type="button">
            <MdAddCircleOutline size={40} color={'green'} />
          </ButtonIcon>
        </TitleWrapper>
        {transactionsByCategories && <TransactionsCategory
          transactionsByCategories={transactionsByCategories}
          expanded={expanded}
          setExpanded={setExpanded}
          type={transactionTypes.Expense}
        />}
      </TransactionsTableItem>

      <TransactionsTableItem>
        <TitleWrapper>
          <TitleMain fz="30px" mb='0px'>Revenues</TitleMain>
          <ButtonIcon onClick={() => handleAddTransaction(transactionTypes.Revenue)} type="button">
            <MdAddCircleOutline size={40} color={'green'} />
          </ButtonIcon>
        </TitleWrapper>
        {transactionsByCategories && <TransactionsCategory
          transactionsByCategories={transactionsByCategories}
          expanded={expanded}
          setExpanded={setExpanded}
          type={transactionTypes.Revenue}
        />}
      </TransactionsTableItem>
      
    </TransactionsTableList>
  )
}