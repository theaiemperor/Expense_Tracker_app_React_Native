import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { Dispatch, SetStateAction } from "react";
import { GlobalStyles } from "../../Constants/styles";
import { ExpenseFormInterface } from "../../Constants/Types";

export default function ExpenseForm({
  values,
  setValues,
  isValid,
  setIsValid,
}: {
  values: ExpenseFormInterface;
  setValues: Dispatch<SetStateAction<ExpenseFormInterface>>;
  isValid: boolean;
  setIsValid: Dispatch<SetStateAction<boolean>>;
}) {
  const handleInput = (identifier: string, value: string) => {
    setValues((currentValues: ExpenseFormInterface) => {
      const result = {
        ...currentValues,
        [identifier]: value,
      };

      // Adding validations
      function validDate(dt: string) {
        if (result.date.trim().length === 0) {
          result.date = new Date().toISOString().slice(0, 10);
          return true;
        }
        const extract = dt.split("-");
        const newDate = new Date(`${extract[0]}-${extract[1]}-${extract[2]}`);

        if (extract.length != 3 && extract[0].length != 4) {
          return false;
        } else if (0 >= +extract[1] || +extract[1] > 12) {
          return false;
        } else if (0 >= +extract[2] || +extract[2] > 31) {
          return false;
        } else return newDate.toString() !== "Invalid Date";
      }

      const validAmount = !isNaN(+result.amount) && +result.amount > 0;
      const validDescription = result.description.trim().length > 0;

      if (
        !validAmount ||
        !validDate(result.date.toString()) ||
        !validDescription
      ) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }

      return result;
    });
  };

  return (
    <View>
      <Input
        label="Amount"
        textInputConfigurations={{
          keyboardType: "decimal-pad",
          placeholder: "e.g. 200",
          onChangeText: (value: string) => handleInput("amount", value),
          value: values.amount,
        }}
      />

      <Input
        label="Date"
        textInputConfigurations={{
          placeholder: new Date().toISOString().slice(0, 10),
          keyboardType: "decimal-pad",
          maxLength: 10,
          onChangeText: (value: string) =>
            handleInput("date", value.replace(".", "-")),
          value: values.date,
        }}
      />
      <Text style={styles.dateNote}>Use . for separating dates</Text>

      <Input
        label="Description"
        textInputConfigurations={{
          multiline: true,
          placeholder: "e.g. Buying a book",
          onChangeText: (value: string) => handleInput("description", value),
          value: values.description,
        }}
      />

      <Text style={styles.InvalidText}>{!isValid && "Invalid Input"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  InvalidText: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    margin: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  dateNote: {
    textAlign: "center",
    marginBottom: 12,
    color: "white",
  },
});
