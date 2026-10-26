import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Transaction } from '../models/Transaction';
interface TransactionFormProps{
    onAddTransaction:(title:string, amount:number, type:'income'|'expense')=>void;
    editingTransaction :Transaction| null,
    onUpdateTransaction: (id:string,title:string, amount:number, type:'income'|'expense')=>void;
    onCancelEdit: () => void;
}
import '../styles/TransactionForm.css'

function TransactionForm(props:TransactionFormProps){

    // State lưu tên giao dịch
    const [title,setTitle]=useState<string>('');

    // State lưu số tiền
    const [amount,setAmount]=useState<number>(0);

    // State lưu loại 
    const [type, setType] = useState<'income' | 'expense'>('expense');

    function handleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(!title.trim()){
            alert("Vui lòng nhập lại tên giao dịch !")
            return
        }
        if (!Number.isFinite(amount) || amount <= 0) {
            alert("Vui lòng nhập số tiền hợp lệ!");
            return;
        }

        if(props.editingTransaction!=null){
            props.onUpdateTransaction(props.editingTransaction.id,title.trim(),amount,type)
        }
        else{
            props.onAddTransaction(title.trim(),amount,type)            
        }
        
        setTitle("")
        setAmount(0)
        setType('expense')
    }

    function handleCancel(){
        props.onCancelEdit()
        setTitle("")
        setAmount(0)
        setType('expense')
    }

    useEffect(()=>{
        if(props.editingTransaction==null){
            return
        }
        console.log("Transaction đã thay đổi !")
        console.log("Đang chỉnh sửa:", props.editingTransaction.title)
        setTitle(props.editingTransaction.title)
        setAmount(props.editingTransaction.amount)
        setType(props.editingTransaction.type)
    },[props.editingTransaction])

    return(
        <>
        <form  className='transaction-form' onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="title">Transaction Title</label>
                <input type="text" id="title" placeholder="Nhập tên giao dịch" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className='form-group'>
                <label htmlFor="Amount">Amount</label>
                <input type="number" name="Amount" id="Amount" placeholder="Nhập số tiền" min="0" 
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </div>

            <div className='form-group'>
                <label htmlFor="Type">Type</label>
                <select name="Type" id="Type" value={type}
                    onChange={(e)=>setType(e.target.value as 'income'|'expense')}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            <button className="submit-btn" type='submit'>{props.editingTransaction ? "Lưu thay đổi" :"Thêm"}</button>
            {/* Chỉ hiển thị nút Cancel khi đang chỉnh sửa */}
            {props.editingTransaction && (
                <button  className="cancel-btn" type="button" onClick={handleCancel}>
                    Cancel
                </button>
            )}
        </form>
        </>
    )
}
export default TransactionForm