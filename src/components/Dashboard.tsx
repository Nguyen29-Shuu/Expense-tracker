interface DashboardProps{
    totalIncome:number;
    totalExpense:number;
    balance:number
}
import "../styles/Dashboard.css"

function Dashboard(props:DashboardProps){
    const TIncome=new Intl.NumberFormat('vi-VN').format(props.totalIncome)
    const TExpense=new Intl.NumberFormat('vi-VN').format(props.totalExpense)
    const Balance=new Intl.NumberFormat('vi-VN').format(props.balance)
    return(
        <div className="dashboard-grid">
            <div className="dashboard-card income-card">
                <p className="card-title">Total Income</p>
                <p className="card-amount">{TIncome} ₫</p>
            </div>
            <div className="dashboard-card expense-card">
                <p className="card-title">Total Expense</p>
                <p className="card-amount"> {TExpense} ₫ </p>
            </div>
            <div className="dashboard-card balance-card">
                <p className="card-title">Balance</p>
                <p className="card-amount">{Balance} ₫</p>
            </div>
        </div>

    )
}

export default Dashboard