import { Expense } from "../types"
import { categories } from "../data/categories"
import { formatDate } from "../helpers"
import AmountDisplay from "./AmountDisplay"
import { useMemo } from "react"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';
import { useBudget } from "../hooks/useBudget"

type ExpenseItemProps = {
    expense: Expense
}
function ExpenseItem({expense} : ExpenseItemProps) {

    const {dispatch} = useBudget()

    const categoryInfo = useMemo(() => categories.filter(category => category.id === expense.category)[0], [expense])

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({type: 'set-editing-expense-id', payload: {id: expense.id}})}>
                Update
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => dispatch({type: 'remove-expense', payload: {id: expense.id}})} destructive={true}>
                Delete
            </SwipeAction>
        </TrailingActions>
    )
     
    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={30}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}>
            <div className="bg-white p-5 w-full rounded-lg shadow-lg border-b border-gray-200 flex gap-5 items-center">
                <div>
                    <img src={`/icono_${categoryInfo.icon}.svg`} alt="" className="w-20" />

                </div>

                <div className="flex-1">
                    <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                    <p className="">{expense.name}</p>
                    <p className="text-slate-600">{expense.date ? formatDate(new Date(expense.date)) : 'Date not available'}</p> 
                </div>
                <AmountDisplay amount={expense.amount}/>
            </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default ExpenseItem