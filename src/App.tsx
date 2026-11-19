
import './App.css'
import type { Transaction } from './models/Transaction'
import { useEffect, useState } from 'react';
import {Routes,Route} from 'react-router-dom';
//
import DashboardPage from './views/DashboardPage';
import TransactionsPage from './views/TransactionsPage';
import Navigation from './components/Navigation';
import AnalyticsPage from './views/AnalyticsPage';
import BudgetPage from './views/BudgetsPage';
// Ngân sách
import type { Budget } from './models/Budget';

function App() {
  
  const [transactions, setTransactions] = useState<Transaction[]>(()=>{
    //Đọc dữ liệu từ local storage
    const saveTransactions=localStorage.getItem("Transactions");

    if(saveTransactions!==null){
      try{
        const parsedTransactions=JSON.parse(saveTransactions);
        if(Array.isArray(parsedTransactions)){
          const isValid=parsedTransactions.every((transaction)=>{
            return transaction!==null &&
              typeof transaction==='object'&&
               transaction.amount>0 &&
                typeof transaction.amount==='number' &&
                 Number.isFinite(transaction.amount) &&
                  typeof transaction.id==='string'&&
                   typeof transaction.title==='string'&&
                   (transaction.type==='income'||transaction.type==='expense')&&
                    typeof transaction.category==='string'&&
                     typeof transaction.date==='string';
          })
          if(isValid){
            return parsedTransactions
          }
          
        }
      }
      catch(error)
      {
        console.error("Không thể đọc dữ liệu LocalStorage:", error);
      }

    }
    return[
    {id: "1",
    title: "Ăn sáng",
    amount: 30000,
    type: "expense",
    category: "Food",
    date: "2026-10-20"},

    {id: "2",
    title: "Đổ xăng",
    amount: 50000,
    type: "expense",
    category: "Nhiên liệu",
    date: "2026-10-20"},

    {id: "3",
    title: "Tiền lương",
    amount: 8000000,
    type: "income",
    category: "Salary",
    date: "2026-10-19"}
    
  ];
  
});

  const [editingTransaction, setEditingTransaction] =
  
  useState<Transaction | null>(null);
  // Quản Lý Giao dịch đang chỉnh sửa
  const [budgets, setBudgets] = useState<Budget[]>(()=>{
    const savedBudgets=localStorage.getItem("Budgets");
    if(savedBudgets!==null){
      try{
        const parsedBudgets=JSON.parse(savedBudgets);
        if(Array.isArray(parsedBudgets)){
          const isValid=parsedBudgets.every((budget)=>{
            return budget!==null &&
              typeof budget==='object'&&
               typeof budget.id==='string'&&
                typeof budget.category==='string'&&
                 typeof budget.limit==='number'&&
                  Number.isFinite(budget.limit)&&
                   typeof budget.month==='string';
          })
          if(isValid){
            return parsedBudgets
          }
          
        }
      }
      catch(error)
      {
        console.error("Không thể đọc dữ liệu LocalStorage:", error);
      }

    }
    return [
    {
        id: "budget-1",
        category: "Food",
        limit: 300000,
        month: "2026-10"
    },
    {
        id: "budget-2",
        category: "transport",
        limit: 500000,
        month: "2026-10"
    },
    {
        id: "budget-3",
        category: "housing",
        limit: 2500000,
        month: "2026-10"
    },
    {
        id: "budget-4",
        category: "food",
        limit: 3000000,
        month: "2026-11"
    }
  ];
  });


  useEffect(()=>{
    localStorage.setItem("Budgets",JSON.stringify(budgets));
  },[budgets])

  function handleAddBudget(category:string, limit:number, month:string):boolean{
    const newBudget: Budget = {
      id: crypto.randomUUID(),
      category,
      limit,
      month
    }
      const isDuplicate = budgets.some((budget) =>
        budget.category === newBudget.category && budget.month === newBudget.month
      );

      if (isDuplicate) {
        alert("Ngân sách cho danh mục và tháng này đã tồn tại!");
        return false;
      }
      setBudgets((previousBudgets) => [...previousBudgets, newBudget])
      return true;
  }

    // Quản lý ngân sách đang chỉnh sửa
  const [editingBudget, setEditingBudget] =
    useState<Budget | null>(null);

  function handleEditBudget(id:string){
    const selectedBudget = budgets.find((budget) => 
      budget.id === id);
    if (selectedBudget) {
      setEditingBudget(selectedBudget);
    }


  }

  function handleUpdateBudget(id:string, category:string, limit:number, month:string){
    setBudgets((prevBudgets)=>
      prevBudgets.map((budget)=>
        budget.id===id?{
          ...budget,
          category:category,
          limit:limit,
          month:month
        }:budget)
      );
    setEditingBudget(null)
  }

  function handleCancelEditBudget() {
    setEditingBudget(null)
  }

  function handleDeleteBudget(id:string){
    const confirmed = window.confirm("Bạn có chắc muốn xóa?");
    if (!confirmed) {
      return;
    }
    setBudgets((prevBudgets)=>
    prevBudgets.filter((budget)=>budget.id!==id))
  }

  function handleAddTransaction(
    title: string,
    amount: number,
    type: 'income' | 'expense',
    category:string
  ) {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      title,
      amount,
      type,
      category,
      date: new Date().toISOString().slice(0, 10),
    }
    console.log("Giao dịch mới đã được thêm:", newTransaction);
    setTransactions((previousTransactions) => [...previousTransactions, newTransaction])
  }

  const handleDeleteTransaction= (id:string)=>{
    // Gọi setTransactions
    setTransactions((prevTransaction)=>
    // Sử dụng previousTransactions.filter()
    prevTransaction.filter((transaction)=>transaction.id!==id))
  }

  function handleEditTransaction(id: string) {
    // Tìm giao dịch có ID tương ứng
    const selectedTransaction = transactions.find(
      (transaction) => transaction.id === id
    );

    // Kiểm tra giao dịch vừa tìm được
    if(selectedTransaction){
      setEditingTransaction(selectedTransaction);
    }
  }
  
  function handleUpdateTransaction(id:string, title:string, amount:number, type:'income'|'expense',category:string){
    setTransactions((pervTransaction)=>
      pervTransaction.map((transaction)=>
        transaction.id===id?{
          ...transaction,
          title:title,
          amount:amount,
          type:type,
          category:category
        }:transaction)
      );
    setEditingTransaction(null)
  }

  function handleCancelEdit() {
    // Sử dụng setEditingTransaction tại đây
    setEditingTransaction(null)
  }

  // Tổng thu nhập
  const totalIncome= transactions.filter((transaction)=> 
    transaction.type ==='income' )
        .reduce((sum,transaction)=>sum+transaction.amount,0)
  
  // Tổng chi tiêu
  const totalExpense=transactions.filter((transaction)=>
    transaction.type==='expense')
      .reduce((sum,transaction)=>transaction.amount+sum,0)

  // Số dư
  const balance=totalIncome-totalExpense
  if(balance>0){
    console.log("Số dư của bạn:", balance)
  }
  else{
    console.log("Tài khoản của bạn bị âm:", balance)
  }


  //Usereffect
  useEffect(()=>{
    //Local Storage
    localStorage.setItem(
      "Transactions",JSON.stringify(transactions) );
  },[transactions])



  return (
    <div className='app-container'>
      <header>
        Expense Tracker
      </header>

      {/* THANH ĐIỀU HƯỚNG */}
      <Navigation/>
      {/* THÊM ROUTES  */}
      <Routes>
        <Route path="/" 
          element={<DashboardPage 
            totalExpense={totalExpense}
            totalIncome={totalIncome}
            balance={balance}
          />}
        />
        <Route path="/transactions" element={
          <TransactionsPage 
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
            editingTransaction={editingTransaction}
            onCancelEdit={handleCancelEdit}
            onAddTransaction={handleAddTransaction}
            onUpdateTransaction={handleUpdateTransaction}/>}
          />
        <Route path="/analytics" 
          element={<AnalyticsPage 
            transactions={transactions}
          />}/>
        {/* //Page Ngân sách */}
        <Route path="/budgets"
          element={<BudgetPage 
            budgets={budgets}
            onSetBudgets={setBudgets}
            transactions={transactions}
            onAddBudget={handleAddBudget}
            editingBudget={editingBudget}
            onEditBudget={handleEditBudget}
            onUpdateBudget={handleUpdateBudget}
            onCancelEditBudget={handleCancelEditBudget}
            onDeleteBudget={handleDeleteBudget}
          />}
        />
      </Routes>
      
    </div>


    )
}

export default App
