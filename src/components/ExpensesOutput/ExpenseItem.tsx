import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../Constants/styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Expense } from "../../Constants/Types";

export default function ExpenseItem({
  id,
  description,
  date,
  amount,
}: Expense) {
  const navigation: NavigationProp<any> = useNavigation();

  const goToManageExpense = () => {
    navigation.navigate("Manage Expenses", { expenseId: id });
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.buttonPress]}
      onPress={goToManageExpense}
    >
      <View>
        <Text style={styles.descriptionText}>{description}</Text>
        <Text style={styles.dateText}>{`${date.toDateString()}`}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>{amount} ₹</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary200,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  dateText: {
    fontSize: 15,
    color: "#170101",
    fontStyle: "italic",
  },
  buttonPress: {
    opacity: 0.8,
  },
  descriptionText: {
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 4,
  },
  amountContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    minWidth: 90,
  },
  amountText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "right",
  },
});
