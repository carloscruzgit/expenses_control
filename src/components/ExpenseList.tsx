import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseItem from "./ExpenseItem"

function ExpenseList(){

    const {state} = useBudget()

    const filteredExpenses = state.currentCategory ? 
        state.expenses.filter(expense => expense.category === state.currentCategory)
        : state.expenses

    const isEmptyExpenses = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

    


    return (  
        <div className="">
            {isEmptyExpenses ? <p className="text-2xl text-gray-500 font-bold">No expenses</p> : (
                <>
                    <p className="text-2xl text-gray-500 font-bold pb-4">Expense List:</p>

                    { filteredExpenses.map(expense => (
                            <ExpenseItem key={expense.id} expense={expense} />
                        ))
                    }

                </>
            )}
        </div>
    )
}

export default ExpenseList

