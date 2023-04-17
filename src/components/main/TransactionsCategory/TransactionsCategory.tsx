import { FC } from "react";
import { CategoryRow, CategoryIcon, CategoryTitle, CategoryCount, CategorySumm, TransactionRow, TransactionValue, TransactionComment } from "./TransactionsCategory.styled";
import { categoriesIcons } from "data/categoriesIcons";
import { Accordion, AccordionDetails, AccordionSummary, getIconSrc, getMonthName, getNumberFormat } from "utils";
import { transactionsSortedType } from "../TransactionsTable/TransactionsTable";
import { ITransaction, transactionTypes } from "redux/transactionsApi/transactionsApi";

type TransactionsCategoryProps = {
  transactionsByCategories: transactionsSortedType;
  expanded: string | false;
  setExpanded: (value: string | false) => void;
  type: transactionTypes;
};

export const TransactionsCategory: FC<TransactionsCategoryProps> = ({ transactionsByCategories, expanded, setExpanded, type }) => {
  const handleExpandCategory = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean): void => {
    setExpanded(newExpanded ? panel : false);
  };
    
  const handleEditTransaction = () => {
    console.log('Edit');
  };
    
  const handleCategorySumm = (transactions: ITransaction[]) => {
    const summ = transactions.reduce((acc, el) => acc += el.value, 0).toFixed(2);
    return getNumberFormat(summ);
  }

  return (
    <>
      {transactionsByCategories?.[type]
        .filter((category) => category.hasOwnProperty('transactions'))
        .map(({ _id, icon, title, transactions = [] }) => 
        <Accordion key={_id} expanded={expanded === _id} onChange={handleExpandCategory(_id)}>
          <AccordionSummary aria-controls={`${_id}-content`} id={`${_id}-header`}>
            <CategoryRow key={_id}>
              <CategoryIcon src={getIconSrc(icon, categoriesIcons)} alt={icon} />
              <CategoryCount>{transactions.length}</CategoryCount>
              <CategoryTitle>{title}</CategoryTitle>
              <CategorySumm>{handleCategorySumm(transactions)}</CategorySumm>
            </CategoryRow>
          </AccordionSummary>
          <AccordionDetails>
            {transactions?.map(({_id, date, value, comment}) => 
              <TransactionRow key={_id} onClick={handleEditTransaction}>
                <span>{date.split('-')[2]}</span>
                <span>{getMonthName(Number(date.split('-')[1]))}</span>
                <TransactionValue>{getNumberFormat(value.toFixed(2))}</TransactionValue>
                <TransactionComment>{comment}</TransactionComment>
              </TransactionRow>
            )}
          </AccordionDetails>
        </Accordion>
      )}
    </>
  )
}