import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import  BudgetTracker  from "./components/BudgetTracker"
import { useBudget } from "./hooks/useBudget"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import ExpenseFilter from "./components/ExpenseFilter"

function App() {

  const {state} = useBudget()

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className="py-8 max-h-72 bg-purple-950">
        <h1 className="text-4xl font-bold text-white text-center mb-5">
          Expenses control
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> :  <BudgetForm /> }
      </div>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto mt-10 mb-20">
          <ExpenseFilter />
          <ExpenseList />
          <ExpenseModal />
        </main>
        
      )}
      
    </>
  )
}

export default App
