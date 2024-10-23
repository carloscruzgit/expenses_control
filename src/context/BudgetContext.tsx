import { useReducer, createContext, Dispatch, useMemo } from "react";
import { budgetReducer, initialBudgetState, BudgetState, BudgetActions } from "../reducers/budget-reducer";

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    usedAmount: number
    remainingAmount: number
}

type BudgetProviderProps = {
    children: React.ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)

export const BudgetProvider = ({children}: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialBudgetState)
    const usedAmount = useMemo(() => {
        return state.expenses.reduce((total, expense) => total + expense.amount, 0)
    }, [state.expenses])

    const remainingAmount = state.budget - usedAmount
    
    return (

        <BudgetContext.Provider value={{state, dispatch, usedAmount, remainingAmount}}>
            {children}
        </BudgetContext.Provider>

    )
}