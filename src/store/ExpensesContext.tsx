import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  getExpenses,
  removeExpenses,
  storeExpenses,
  updateExpenses,
} from "./firebase";
import { Expense, ExpensesContextType } from "../Constants/Types";

// Main context which will be used to get and set expenses data
export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  isLoading: 0,
});

function expenseReducer(
  state: Expense[],
  action: { type: string; payload: any }
): Expense[] {
  switch (action.type) {
    case "ADD":
      const id = action.payload.id;
      return [{ id, ...action.payload.expenseData }, ...state];
    case "UPDATE":
      return state.map((expense) => {
        return expense.id === action.payload.id
          ? { id: expense.id, ...action.payload.data }
          : expense;
      });
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "SET":
      return action.payload.reverse();
    default:
      return state;
  }
}

export default function ExpenseContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [expenses, dispatch] = useReducer(expenseReducer, []);
  const [isLoading, setIsLoading] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getExpenses();
        dispatch({ type: "SET", payload: data });
        setIsLoading(1);
      } catch (err) {
        setIsLoading(-1);
      }
    }

    fetchData();
  }, []);

  async function addExpense(expenseData: Omit<Expense, "id">) {
    setIsLoading(0);
    try {
      const id = await storeExpenses(expenseData);
      dispatch({ type: "ADD", payload: { id, expenseData } });
      setIsLoading(1);
    } catch (err) {
      setIsLoading(-1);
    }
  }

  async function deleteExpense(id: string) {
    setIsLoading(0);
    try {
      await removeExpenses(id);
      dispatch({ type: "DELETE", payload: id });
      setIsLoading(1);
    } catch (err) {
      setIsLoading(-1);
    }
  }

  async function updateExpense(id: string, expenseData: Omit<Expense, "id">) {
    setIsLoading(0);
    try {
      await updateExpenses(id, expenseData);
      dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
      setIsLoading(1);
    } catch (err) {
      setIsLoading(-1);
    }
  }

  const value: ExpensesContextType = {
    isLoading,
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
