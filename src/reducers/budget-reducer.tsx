import { v4 as uuid } from 'uuid'
import { Category, DraftExpense, Expense } from "../types"

export type BudgetActions = 
{ type: 'add-budget', payload: { budget: number } } |
{ type: 'show-expenses-modal'} |
{ type: 'hide-expenses-modal'} |
{ type: 'reset-budget'} |
{ type: 'save-expense', payload: { expense: DraftExpense } } |
{ type: 'remove-expense', payload: { id: string } } | 
{ type: 'set-editing-expense-id', payload: { id: string } } |
{ type: 'update-expense', payload : { expense: Expense } } | 
{ type: 'filter-category', payload: { categoryId: Category['id'] } } |
{ type: 'reset-app' }


export type BudgetState = {
    budget: number,
    expensesModal: boolean,
    expenses: Expense[],
    currentCategory: Category['id'],
    editingExpenseId : Expense['id']
}


const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    const budget = localStorageBudget ? +localStorageBudget : 0
    return budget
}

const initialExpenses = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    const budget = localStorageExpenses ? JSON.parse(localStorageExpenses): []
    return budget
}

export const initialBudgetState: BudgetState = {
    budget: initialBudget(),
    expensesModal: false,
    expenses: initialExpenses(),
    currentCategory:  '',
    editingExpenseId: ''
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuid()
    }
}

export const budgetReducer = (
    state: BudgetState = initialBudgetState, 
    action: BudgetActions) => {
    
    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === 'show-expenses-modal') {
        return {
            ...state,
            expensesModal: true
        }
    }

    if (action.type === 'hide-expenses-modal') {
        return {
            ...state,
            expensesModal: false,
            editingExpenseId: ''
        }
    }

    if(action.type === 'save-expense') {
        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expense],
            expensesModal: false
        }
    }

    if(action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }

    if(action.type === 'set-editing-expense-id') {
        return {
            ...state,
            editingExpenseId: action.payload.id,
            expensesModal: true
        }
    }

    if(action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            editingExpenseId: '',
            expensesModal: false
        }
    }

    if (action.type === 'reset-app') {

        return {
            ...state,
            budget: 0,
            expenses: []
        }
    }

    if(action.type === 'filter-category') {
        return {
            ...state,
            currentCategory: action.payload.categoryId
        }
    }
    
    return state
}