import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { Expense } from "../../Constants/Types";

const renderExpensesItem = (itemData: { index: number; item: Expense }) => {
  return <ExpenseItem {...itemData.item} />;
};

export default function ExpensesList({ expenses }: { expenses: Expense[] }) {
  return (
    <View style={styles.container}>
      {expenses.length !== 0 ? (
        <FlatList
          data={expenses}
          renderItem={renderExpensesItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.emptyText}>Noting to show here.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    flex: 1,
    alignSelf: "center",
    marginTop: "50%",
    fontWeight: "bold",
  },
});
