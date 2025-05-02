import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../Constants/styles";
import { useContext } from "react";
import { ExpensesContext } from "../../store/ExpensesContext";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";
import { Expense } from "../../Constants/Types";

export default function ExpensesOutput({
  expenses,
  expensesPeriod,
}: {
  expenses: Expense[];
  expensesPeriod: string;
}) {
  const expenseCtx = useContext(ExpensesContext);
  return (
    <View style={styles.container}>
      {expenseCtx.isLoading === -1 && (
        <>
          <ErrorOverlay msg="Due to some Problem app is unable to load the data, please try again later after some time" />
        </>
      )}
      {expenseCtx.isLoading === 0 && (
        <>
          <LoadingOverlay />
        </>
      )}
      {expenseCtx.isLoading === 1 && (
        <>
          <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
          <ExpensesList expenses={expenses} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary800,
    flex: 1,
  },
});
