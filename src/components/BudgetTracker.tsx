import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"
import { CircularProgressbar, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

function BudgetTracker() {

    const {state, dispatch, remainingAmount, usedAmount } = useBudget()

    const percentageUsed = ((usedAmount / state.budget) * 100).toFixed(0)

    const handleResetApp = () => {
        dispatch({type:'reset-app'})
    }
    return (
        <div className="grid grid-cols-2 gap-5">
            <div className="justify-center flex">
                <CircularProgressbar 
                    value={usedAmount} 
                    maxValue={state.budget} 
                    styles={buildStyles({
                        pathColor: '#7d32a8',
                        trailColor: '#F5F5F5',
                        textSize: '18px',
                        textColor: '#7d32a8'
                    })}
                    text={`${percentageUsed} %`}
                        />
            </div>

            <div className="flex flex-col justify-center items-center gap-6">
                <button type="button" className="bg-purple-700 w-10/12 p-2 text-white uppercase rounded-lg font-bold" onClick={handleResetApp}>
                        Reset App
                </button>

                <AmountDisplay label="Budget" amount={state.budget}/>
                <AmountDisplay label="Remaining" amount={remainingAmount}/>
                <AmountDisplay label="Used" amount={usedAmount}/>
            </div>

        </div>
    )
}   

export default BudgetTracker