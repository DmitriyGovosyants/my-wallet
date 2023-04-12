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
      const transactionsByDate = userTransactions.filter(({ date }) => {
        const transactionYear = Number(date.split('-')[0]);
        const transactionMonth = Number(date.split('-')[1]);

        const isChosesYear = transactionYear === year;
        const isChosesMonth = transactionMonth === month;

        return isChosesYear && isChosesMonth;
      });

      const categoriesByType = userCategories.reduce((acc: categoriesType, obj: ICategory) => {
        acc[obj.type].push(obj);
        return acc;
      }, { revenue: [], expense: [] });

      const categoriesTransactionsAdded = transactionsByDate.reduce((acc: transactionsSortedType, obj: ITransaction) => {
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

  // const handleExpandCategory = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean): void => {
  //   setExpanded(newExpanded ? panel : false);
  // };

  console.log(transactionsByCategories)

  return (
    <TransactionsTableList>
      <TransactionsTableItem>
        <TitleWrapper>
          <TitleMain fz="30px" mb='0px'>Revenues transaction</TitleMain>
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
      <TransactionsTableItem>
        <TitleWrapper>
          <TitleMain fz="30px" mb='0px'>Expenses transaction</TitleMain>
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
    </TransactionsTableList>
  )
}