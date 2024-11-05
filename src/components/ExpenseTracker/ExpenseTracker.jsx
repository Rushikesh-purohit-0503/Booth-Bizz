import React, { useState, useEffect,useMemo } from 'react';
import DeleteExpensePopup from './PopUp/DeleteExpensePopup';
import EditExpensePopup from './PopUp/EditExpensePopup';
import AddExpensePopup from './PopUp/AddExpensePopup';
import Left from './Left';
import Right from './Right';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StallManagement from '../../firebase/Backend/stallManagement'; // Adjust the path as necessary

function ExpenseTracker() {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const stall = useSelector((state) => state.stall.clickedStall);
    const user = useSelector((state) => state.auth.userData); // Ensure you have user data

    // Initialize expenses as an empty array
    const [expenses, setExpenses] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [expenseToDelete, setExpenseToDelete] = useState(null);
    const totalAmount = expenses.reduce((total, expense) => total + Number(expense.amount), 0);

    const stallManagement = useMemo(()=>new StallManagement({uid:user.uid}),[user.uid]) 
    
    useEffect(() => {
        
        if (!authStatus) {
            navigate('/signin');
        }
    }, [authStatus, navigate]);
    
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const fetchedExpenses = await stallManagement.getExpenses(stall.id);
                // Ensure fetchedExpenses is an array
                setExpenses(Array.isArray(fetchedExpenses) ? fetchedExpenses : []);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchExpenses();
    }, [stall.id, user.uid]); // Include stall.id and user in the dependency array

    const handleAddExpense = async (data) => {

        try {
            await stallManagement.addExpense(stall.id, data);
            setExpenses((prev) => [...prev, data]);
            setIsPopupOpen(false);
            navigate(0)
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    const handleEditExpense = async (data) => {
       
        try {
            await stallManagement.updateExpense(stall.id, editingExpense.id, data);
            const updatedExpenses = expenses.map(expense =>
                expense.id === editingExpense.id ? { ...expense, ...data } : expense
            );
            setExpenses(updatedExpenses);
            setIsEditPopupOpen(false);
            setEditingExpense(null);
        } catch (error) {
            console.error("Error updating expense:", error);
        }
    };

    const handleDeleteExpense = async () => {
        // const stallManagement = new StallManagement(user);
        try {
            await stallManagement.deleteExpense(stall.id, expenseToDelete.id);
            const updatedExpenses = expenses.filter(expense => expense.id !== expenseToDelete.id);
            setExpenses(updatedExpenses);
            
            setIsDeletePopupOpen(false);
            setExpenseToDelete(null);
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
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
            <Left
                stallName={stall.stallName}
                onStallClick={() => (navigate('/stall-details'))}
                onProductClick={() => (navigate('/product'))}
                onClickSalesAnalysis={() => (navigate('/sales-analysis'))}
            />
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
