import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

function ExpenseFilter(){

    const { dispatch} = useBudget()

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.currentTarget.value)
        dispatch({type: 'filter-category', payload: {categoryId: e.currentTarget.value}})
    }

    return(
        <div className="bg-white rounded-lg shadow-md p-10 mt-5 mb-10">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                  <label htmlFor="category">Filter by category</label>
                  <select name="category" id="category" onChange={handleFilterChange} className="flex-1 bg-slate-200 p-2 rounded">
                      <option value="">All categories</option>
                      {categories.map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                  </select>
                </div>
                

            </form>
        </div>
    )
}

export default ExpenseFilter