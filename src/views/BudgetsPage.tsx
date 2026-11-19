import type { Transaction } from "../models/Transaction"
import type { Budget } from "../models/Budget"
import '../styles/BudgetsPage.css'
import BudgetForm from "../components/BudgetForm"
import { useState } from "react";


interface BudgetsPageProps{
    budgets: Budget[];
    onSetBudgets:(budgets:Budget[])=>void;
    transactions:Transaction[];
    onAddBudget:(category:string, limit:number, month:string)=>boolean;
    editingBudget: Budget | null;
    onEditBudget: (id: string) => void;
    onUpdateBudget: (id: string, category: string, limit: number, month: string) => void;
    onCancelEditBudget: () => void;
    onDeleteBudget: (id:string)=>void;
}

function BudgetsPage(props:BudgetsPageProps){

    
    const budgetSummary=props.budgets.map((budget)=>{
        const filteredTransactions=props.transactions.filter((transaction)=>
            transaction.category===budget.category 
            && transaction.date.startsWith(budget.month)
            && transaction.type==="expense"
        );
        const spent=filteredTransactions.reduce((total,transaction)=>
            total+transaction.amount,0);

        const percentage= budget.limit===0?0:spent/budget.limit*100;

        const progressColor = percentage > 100 ? 'red' :
            percentage >= 80 ? 'yellow' : 'green';
        const status = percentage > 100 ? 'Vượt quá ngân sách' :
            percentage >= 80 ? 'Gần hết ngân sách' : 'Trong ngân sách';
        return {...budget, spent, percentage, progressColor, status};
    })

    const [selectedMonth, setSelectedMonth] = useState<string>("all");
    const filteredBudgets=selectedMonth==="all"?
        budgetSummary:
        budgetSummary.filter((budget)=>
            budget.month===selectedMonth
        );


    return(
        <div>
            <BudgetForm onAddBudget={props.onAddBudget} editingBudget={props.editingBudget} 
                 onUpdateBudget={props.onUpdateBudget}
                 onCancelEditBudget={props.onCancelEditBudget}
                 onDeleteBudget={props.onDeleteBudget}
                 />
            <h1>Ngân sách</h1>
            <p>Quản lý ngân sách của bạn theo từng danh mục</p>
            <div className="filter-section">
                <label htmlFor="month-filter">Lọc theo tháng:</label>
                <select id="month-filter" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    <option value="all">Tất cả các tháng</option>
                    {Array.from(new Set(budgetSummary.map((budget) => budget.month))).map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>
            <div className="content-section budget-content">
                <div className="budget-section">
                    {filteredBudgets.length===0 ?
                    (<p>Chưa có ngân sách nào được thiết lập.</p>)
                    :(
                        filteredBudgets.map((budget)=>(
                        <div key={budget.id}>
                            <div className="budget-card">
                                <div className="budget-header">
                                    <h3>{budget.category}</h3>
                                    <p>Tỷ lệ: {budget.percentage.toFixed(1)}%</p>
                                </div>
                                <p>Giới hạn: {budget.limit.toLocaleString("vi-VN")}</p>
                                <p>Tháng: {budget.month}</p>
                                <p>Đã chi: {budget.spent.toLocaleString("vi-VN")}</p>
                                <div className="progress-bar">
                                    <div className="progress" style={{
                                        width:`${Math.min(100, budget.percentage)}%`,
                                        backgroundColor: budget.progressColor
                                        }}>
                                    </div>
                                </div>
                                <p>{budget.status}</p>
                                <button className="edit-btn" onClick={()=>props.onEditBudget(budget.id)}>Chỉnh sửa</button>
                                <button className="delete-btn" onClick={()=>props.onDeleteBudget(budget.id)}>Xóa</button>
                            </div>
                        </div>
                        ))
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default BudgetsPage;