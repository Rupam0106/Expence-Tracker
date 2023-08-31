import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/Expense/ExpenseForm";
import ExpenseFilter from "./components/Expense/ExpenseFilter";
import ExpenseList from "./components/Expense/ExpenseList";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "aaaa",
      amount: 10,
      category: "Utilities",
    },
    {
      id: 2,
      description: "bbbb",
      amount: 10,
      category: "Groceries",
    },
    {
      id: 3,
      description: "ccc",
      amount: 10,
      category: "Groceries",
    },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;
  return (
    <>
      <ExpenseForm
        onSubmit={(expense) =>
          setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
        }
      />

      <ExpenseFilter
        onSelectCategory={(category) => setSelectedCategory(category)}
      />

      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
      {/* <Login /> */}
    </>
  );
}

export default App;
