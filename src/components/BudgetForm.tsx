import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"
function BudgetForm() {

    const [budget, setBudget] = useState(0)
    const { dispatch } = useBudget()

    const handleChangeBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(+e.target.value)
    }

    const isNotValid = useMemo(() => {
        return budget <= 0 || isNaN(budget)
    }, [budget])

    const handleSubmitBudget = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: 'add-budget', payload: {budget}})
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmitBudget}>
            <div className="flex flex-col space-y-8">
                <label htmlFor="budget" className="text-4xl text-purple-700 font-bold text-center">Define your budget</label>
                <input 
                    type="number" 
                    id="budget" 
                    placeholder="define your budget" 
                    name="budget" 
                    className="w-full border border-gray-300 p-2"
                    value={budget}
                    onChange={handleChangeBudget}/>
            </div>
            <input 
                type="submit" 
                value="Define your budget" 
                className="w-full bg-purple-600 cursor-pointer text-white font-black uppercase p-2 hover:bg-purple-700 disabled:opacity-50"
                disabled={isNotValid}
                />
        </form>
    )
}

export default BudgetForm