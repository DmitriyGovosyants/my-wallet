import { FC } from "react";
import { CategoryRow, CategoryIcon, CategoryTitle, CategoryCount, CategorySumm } from "./TransactionsCategory.styled";
import { categoriesIcons } from "data/categoriesIcons";
import { Accordion, AccordionDetails, AccordionSummary, getIconSrc, getMonthName } from "utils";
import { transactionsSortedType } from "../TransactionsTable/TransactionsTable";
import { transactionTypes } from "redux/transactionsApi/transactionsApi";

type TransactionsCategoryProps = {
  transactionsByCategories: transactionsSortedType;
  expanded: string | false;
  setExpanded: (value: string | false) => void;
  type: transactionTypes;
};

export const TransactionsCategory: FC<TransactionsCategoryProps> =
  ({ transactionsByCategories, expanded, setExpanded, type }) => {

  const handleExpandCategory = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean): void => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      {transactionsByCategories?.[type]
        .filter((category) => category.hasOwnProperty('transactions'))
        .map(({ _id, icon, title, transactions = [] }) => 
        <Accordion key={_id} expanded={expanded === _id} onChange={handleExpandCategory(_id)}>
          <AccordionSummary aria-controls={`${_id}-content`} id={`${_id}-header`}>
            <CategoryRow key={_id}>
              <CategoryIcon src={getIconSrc(icon, categoriesIcons)} alt={icon} />
              <CategoryTitle>{title}</CategoryTitle>
              <CategoryCount>{transactions.length}</CategoryCount>
              <CategorySumm>{transactions.reduce((acc, el) => acc += el.value, 0).toFixed(2)}</CategorySumm>
            </CategoryRow>
          </AccordionSummary>
          <AccordionDetails>
            {transactions?.map(({_id, date, value, comment}) => 
              <div key={_id}>
                <span>{Number(date.split('-')[2])}</span>
                <span>{getMonthName(Number(date.split('-')[1]))}</span>
                <span>{Number(date.split('-')[0])}</span>
                <span>{value}</span>
                <span>{comment}</span>
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      )}
    </>
  )
}