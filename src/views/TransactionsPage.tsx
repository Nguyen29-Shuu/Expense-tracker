import type { Transaction } from "../models/Transaction"
import TransactionItem from "../components/TransactionItem";
import TransactionForm from "../components/TransactionForm";
interface TransactionsPageProps {
  transactions: Transaction[];
  onDelete:(id:string)=>void;
  onEdit:(id:string)=>void;
  editingTransaction:Transaction|null;
  onCancelEdit:()=>void;
  onAddTransaction:(title:string, amount:number,type:'income'|'expense',category:string)=>void;
  onUpdateTransaction:(id:string,title:string,amount:number,type:'income'|'expense',category:string)=>void
}

function TransactionsPage(props:TransactionsPageProps){
    return(
        <div >
            <h1>Trang Transactions Page</h1>
            <div className="content-section">
                <div className="form-section">
                    <TransactionForm 
                        editingTransaction={props.editingTransaction}
                        onCancelEdit={props.onCancelEdit}
                        onAddTransaction={props.onAddTransaction}
                        onUpdateTransaction={props.onUpdateTransaction}
                    />
                </div>
                <div className="transaction-section">
                    {props.transactions.map((trasaction)=>(
                        <TransactionItem 
                            key={trasaction.id}
                            transaction={trasaction}
                            onDelete={props.onDelete}
                            onEdit={props.onEdit}
                        />
                    ))}
                </div>
            </div>


        </div>

    )
}
export default TransactionsPage