import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/ExpensesContext";

export default function RecentExpenses() {
  const today = new Date();
  const agoDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );

  const expenseCtx = useContext(ExpensesContext);
  const recentExpenses = expenseCtx.expenses.filter(
    (expense: { date: Date }) =>
      expense.date >= agoDate && expense.date <= today
  );

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" />
  );
}
