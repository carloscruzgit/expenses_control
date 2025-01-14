import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"
export const useBudget = () => {

    const budgetContext = useContext(BudgetContext)

    return budgetContext
}