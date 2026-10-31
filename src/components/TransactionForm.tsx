import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Transaction } from '../models/Transaction';
interface TransactionFormProps{
    onAddTransaction:(title:string, amount:number, type:'income'|'expense',category:string)=>void;
    editingTransaction :Transaction| null,
    onUpdateTransaction: (id:string,title:string, amount:number, type:'income'|'expense',category:string)=>void;
    onCancelEdit: () => void;
}
import '../styles/TransactionForm.css'

function TransactionForm(props:TransactionFormProps){

    // State lưu tên giao dịch
    const [title,setTitle]=useState<string>('');

    // State lưu số tiền
    const [amount,setAmount]=useState<string>('');

    // State lưu loại 
    const [type, setType] = useState<'income' | 'expense'>('expense');
    
    // State lưu danh mục
    const [category, setcategory]=useState<string>('')

    function handleSubmit(e:FormEvent<HTMLFormElement>){
        const numericAmount=Number(amount.replace(/\s/g,""))
        e.preventDefault();
        if(!title.trim()){
            alert("Vui lòng nhập lại tên giao dịch !")
            return
        }
        if (!Number.isFinite(numericAmount) || numericAmount<=0) {
            alert("Vui lòng nhập số tiền hợp lệ!");
            return;
        }

        if(!category){
            alert('Vui lòng chọn danh mục!')
            return
        }

        if(props.editingTransaction!=null){
            props.onUpdateTransaction(props.editingTransaction.id,title.trim(),numericAmount,type,category)
        }
        else{
            props.onAddTransaction(title.trim(),numericAmount,type,category)            
        }
        
        setTitle("")
        setAmount("")
        setType('expense')
        setcategory('')
    }

    function handleCancel(){
        props.onCancelEdit()
        setTitle("")
        setAmount("")
        setType('expense')
        setcategory('')
    }

    function handleAmountChange(value:string){
        const numericValue=value.replace(/\D/g,"")
        if(numericValue===''){
            setAmount('')
            return
        }
        setAmount(Number(numericValue).toLocaleString('vi-VN').replaceAll('.',' '))
    }

    useEffect(()=>{
        if(props.editingTransaction==null){
            return
        }
        console.log("Transaction đã thay đổi !")
        console.log("Đang chỉnh sửa:", props.editingTransaction.title)
        setTitle(props.editingTransaction.title)
        setAmount(Number(props.editingTransaction.amount).toLocaleString('vi-VN').replaceAll('.'," "))
        setType(props.editingTransaction.type)
        setcategory(props.editingTransaction.category)
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
                <input type="text" name="Amount" id="Amount" placeholder="0" 
                    inputMode="numeric"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
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

            <div className='form-group'>
                <label htmlFor="Category">Category</label>
                <select name="Category" id="Category" value={category}
                    onChange={(e)=>setcategory(e.target.value)}>
                    {
                        type==='expense'?
                        (
                            <>
                                <option value="food">Food</option>
                                <option value="transport">Transport</option>
                                <option value="housing">Housing</option>
                                <option value="shopping">Shopping</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="health">Health</option>
                                <option value="otherexpense">Other Expense</option>
                            </>

                        ):(
                            <>
                                <option value="salary">Salary</option>
                                <option value="bonus">Bonus</option>
                                <option value="freelance">Freelance</option>
                                <option value="othericome">Other Income</option>
                            </>

                        )
                    }
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