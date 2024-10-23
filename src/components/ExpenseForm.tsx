import {  useContext, useEffect, useState } from "react";
import { categories } from "../data/categories"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DraftExpense } from "../types";
import ErrorMessage from "./ErrorMessage";
import { BudgetContext } from "../context/BudgetContext";

function ExpenseForm() {
    const {state, dispatch, remainingAmount} = useContext(BudgetContext)
    //maybe create a custom hook for this, so its cleaner
    const [expense, setExpense] = useState<DraftExpense>({
        name: '',
        amount: 0,
        category: '',
        date: new Date()
    });

    const [error, setError] = useState('');
    const [previousAmount, setPreviousAmount] = useState(0);

    const handleChangeExpense = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.name === 'amount' ? +e.target.value : e.target.value
        })
    }

    /*const isValidExpense = () => {
        const {name, amount, category} = expense
        return name.trim() !== '' && amount > 0 && category !== ''
    }*/

    const handleSubmitExpenseForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(Object.values(expense).includes('')) {
            setError('All fields are mandatory')
            return;
        }

        //check if amount is more than the remainig budget
        if((expense.amount - previousAmount) > remainingAmount) {
            setError('This amount surpasses your remining budget')
            return;
        }
        
        if(state.editingExpenseId) {
            dispatch({type: 'update-expense', payload: {expense: {id: state.editingExpenseId, ...expense}}})
            
        }else{
            dispatch({type: 'save-expense', payload: {expense}})
        }
        
    }

    useEffect(() => {
        if(state.editingExpenseId) {
            const editingExpense = state.expenses.filter(expense => expense.id === state.editingExpenseId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingExpenseId])

    return (
        <form className="space-y-5" onSubmit={handleSubmitExpenseForm}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-teal-500">
              {state.editingExpenseId ? 'Edit Expense' : 'Add Expense'}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2 space-y-2">
                <label htmlFor="name" className="text-xl font-bold">Expense Name: </label>
                <input 
                    type="text" 
                    id="name"
                    placeholder="Add expense name"
                    className="w-full  border-gray-300 p-2 bg-slate-100"
                    name="name"
                    value={expense.name}
                    onChange={handleChangeExpense}
                   />
            </div>

            <div className="flex flex-col gap-2 space-y-2">
                <label htmlFor="amount" className="text-xl font-bold">Expense Amount: </label>
                <input 
                    type="number" 
                    id="amount"
                    placeholder="Add the expense amount: E.G. 100"
                    className="w-full  border-gray-300 p-2 bg-slate-100"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChangeExpense}
                   />
            </div>

            <div className="flex flex-col gap-2 space-y-2">
                <label htmlFor="category" className="text-xl font-bold">Category: </label>
                <select 
                    id="category"
                    className="w-full  border-gray-300 p-2 bg-slate-100"
                    name="category"
                    value={expense.category}
                    onChange={handleChangeExpense}
                    
                   >    
                    <option value="">Select Category</option>
                    {
                        categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }

                    </select>
            </div>

            <div className="flex flex-col gap-2 space-y-2">
                <label htmlFor="date" className="text-xl font-bold">Date of Expense: </label>
                <DatePicker   
                    className="border-gray-300 p-2 bg-slate-100 w-full"
                    selected={expense.date} 
                    onChange={date => setExpense({...expense, date})} />
            </div>

            <input type="submit" className="bg-teal-500 cursor-pointer hover:bg-teal-400 text-white w-full p-2 uppercase font-bold disabled:opacity-30"
            value ={state.editingExpenseId ? 'Save Changes' : 'Submit Expense'} /*disabled={!isValidExpense()}*//>
        </form>
    )
}

export default ExpenseForm