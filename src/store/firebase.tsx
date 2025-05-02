import axios from "axios";
import { Expense } from "../Constants/Types";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function storeExpenses(expenseData: {}): Promise<string> {
  const URL = BASE_URL + "/expense.json";
  const response = await axios.post(URL, expenseData);
  return response.data.name;
}

export async function getExpenses() {
  const URL = BASE_URL + "/expense.json";
  const response = await axios.get(URL);

  const expenseArray = [];

  for (const key in response.data) {
    const expenseObject = {
      id: key,
      amount: parseInt(response.data[key].amount),
      date: new Date(response.data[key].date),
      description: response.data[key].description.toString(),
    };
    expenseArray.push(expenseObject);
  }
  return expenseArray;
}

export async function updateExpenses(id: string, expense: Omit<Expense, "id">) {
  const URL = BASE_URL + `/expense/${id}.json`;
  return await axios.put(URL, expense);
}

export async function removeExpenses(id: string) {
  const URL = BASE_URL + `/expense/${id}.json`;
  return await axios.delete(URL);
}
