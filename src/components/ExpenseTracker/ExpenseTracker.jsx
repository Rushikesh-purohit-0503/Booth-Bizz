import React, { useState,useEffect } from 'react';
import DeleteExpensePopup from './PopUp/DeleteExpensePopup';
import EditExpensePopup from './PopUp/EditExpensePopup';
import AddExpensePopup from './PopUp/AddExpensePopup';
import Left from './Left';
import Right from './Right';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ExpenseTracker() {
    const navigate = useNavigate()
    const authStatus = useSelector((state)=>state.auth.status);


    const [expenses, setExpenses] = useState([
        // { date: '2024-09-15', description: 'Stall DP', category: 'Set-up cost', amount: 2000 },
        // { date: '2024-09-18', description: 'Nachos Box', category: 'Set-up cost', amount: 500 },
    ]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [expenseToDelete, setExpenseToDelete] = useState(null);
    const totalAmount = expenses.reduce((total, expense) => total + Number(expense.amount),0);
    const stall = useSelector((state)=>state.stall)

    useEffect(()=>{
        if(!authStatus){
            navigate('/signin')
        }
    },[authStatus,navigate])
    useEffect(() => {
        const storedExpenses = localStorage.getItem('expenses');
        if (storedExpenses) {
            setExpenses(JSON.parse(storedExpenses));
        }
    }, []);



    const handleAddExpense = (data) => {
        const newExpenses = [...expenses, data];
        setExpenses(newExpenses);
        localStorage.setItem('expenses', JSON.stringify(newExpenses));
        setIsPopupOpen(false);
    };

    const handleEditExpense = (data) => {
        const updatedExpenses = expenses.map(expense =>
            expense.description === editingExpense.description ? {...expense,...data }: expense
        );
        setExpenses(updatedExpenses);
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
        setIsEditPopupOpen(false);
        setEditingExpense(null);
    };

    const handleDeleteExpense = () => {
        const updatedExpenses = expenses.filter(expense => expense.description !== expenseToDelete.description);
        setExpenses(updatedExpenses);
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
        setIsDeletePopupOpen(false);
        setExpenseToDelete(null);
    };

    const openEditPopup = (expense) => {
        setEditingExpense(expense);
        setIsEditPopupOpen(true);
    };

    const openDeletePopup = (expense) => {
        setExpenseToDelete(expense);
        setIsDeletePopupOpen(true);
    };

    return (
        <div className="flex min-h-screen bg-pink-50 p-6">
            <Left stallName={stall.stallName} onStallClick={()=>(navigate('/stall-details'))} onProductClick={()=>(navigate('/product'))} onClickSalesAnalysis={()=>(navigate('/sales-analysis'))}/>
            <Right
                expenses={expenses}
                totalAmount={totalAmount}
                onAddExpense={() => setIsPopupOpen(true)}
                onEditExpense={openEditPopup}
                onDeleteExpense={openDeletePopup}
            />
             {isPopupOpen && (
                <AddExpensePopup 
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    onSubmit={handleAddExpense}
                />
            )}

            {isEditPopupOpen && (
                <EditExpensePopup
                    isOpen={isEditPopupOpen}
                    onClose={() => setIsEditPopupOpen(false)}
                    onSubmit={handleEditExpense}
                    existingData={editingExpense}
                />
            )}

            {isDeletePopupOpen && (
                <DeleteExpensePopup
                    isOpen={isDeletePopupOpen}
                    onClose={() => setIsDeletePopupOpen(false)}
                    onConfirm={handleDeleteExpense}
                />
            )}
        </div>
    );
}

export default ExpenseTracker;