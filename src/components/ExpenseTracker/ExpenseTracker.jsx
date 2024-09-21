import React, { useState } from 'react';

import Left from './Left';
import Right from './Right';

function ExpenseTracker() {
    const [expenses, setExpenses] = useState([
        { date: '2024-09-15', description: 'Stall DP', category: 'Set-up cost', amount: 2000 },
        { date: '2024-09-18', description: 'Nachos Box', category: 'Set-up cost', amount: 500 },
    ]);

    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

    return (
        <div className="flex min-h-screen bg-pink-50 p-6">
            <Left/>
            <Right expenses={expenses} totalAmount={totalAmount}/>
        </div>
    );
}

export default ExpenseTracker;