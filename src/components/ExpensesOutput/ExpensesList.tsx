import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { Expense } from "../../Constants/Types";
import { useMediaQuery } from "react-responsive";

const renderExpensesItem = (itemData: { index: number; item: Expense }) => {
  return <ExpenseItem {...itemData.item} />;
};

export default function ExpensesList({ expenses }: { expenses: Expense[] }) {
  const isMedium = useMediaQuery({ minWidth: 600, maxWidth: 1023 });
  const isLarge = useMediaQuery({ minWidth: 1024 });

  let numColumns = 1;
  if (isMedium) numColumns = 2;
  if (isLarge) numColumns = 3;

  return (
    <View style={styles.container}>
      {expenses.length !== 0 ? (
        <FlatList
          key={numColumns}
          data={expenses}
          numColumns={numColumns}
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
