import type { Transaction } from "../models/Transaction";
interface TransactionItemProps{
  transaction:Transaction;
  onDelete:(id:string)=>void;
  onEdit:(id:string)=>void
}
import '../styles/TransactionItem.css'

function TransactionItem(props:TransactionItemProps){
    return(
    <div className="transaction-item">
      <div className="transaction-info">
        <div className="transaction-details">
          <p className="transaction-title">{props.transaction.title} </p>
          <p className="transaction-category">{props.transaction.category}</p>
          <p className="transaction-date">{props.transaction.date}</p>
        </div>
        <div className={`transaction-amount ${props.transaction.type==='income' ? 'income' : 'expense'}`}>
          <p>{props.transaction.type==='income'? '+':'-'}{new Intl.NumberFormat('vi-VN').format(props.transaction.amount)}</p>
        </div>
      </div>
      <div className="transaction-actions">
        <button className="delete-btn" onClick={()=>props.onDelete(props.transaction.id)}>Xóa</button>
        <button className="edit-btn" onClick={()=>props.onEdit(props.transaction.id)}>Chỉnh sữa</button>
      </div>
    </div>
    )
}
export default TransactionItem