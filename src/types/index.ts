export type Expense = {
    id: string,
    name: string,
    amount: number,
    category: string,
    date: Date | null
}

export type DraftExpense = Omit<Expense, 'id'>

export type Category = {
    id: string;
    name: string;
    icon: string;
}