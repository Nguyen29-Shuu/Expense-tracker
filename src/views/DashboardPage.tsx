interface DashboardPageProps{
    totalIncome:number;
    totalExpense:number;
    balance:number
}
import Dashboard from "../components/Dashboard";

function DashboardPage(props:DashboardPageProps){
    return(
        <div>
            <h1>Trang Dash Page</h1>   
            <Dashboard totalExpense={props.totalExpense} totalIncome={props.totalIncome} balance={props.balance}/>
        </div>
        
    )
}
export default DashboardPage