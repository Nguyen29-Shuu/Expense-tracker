import { useEffect, useState } from 'react';
import { type Budget} from '../models/Budget';
import '../styles/BudgetForm.css'

interface BudgetFormProps{
    onAddBudget:(category:string, limit:number, month:string)=>boolean;
    editingBudget: Budget | null;
    onUpdateBudget: (id:string, category:string, limit:number, month:string)=>void;
    onCancelEditBudget: () => void;
    onDeleteBudget: (id:string)=>void;
}


function BudgetForm(props:BudgetFormProps){

    const [category,setCategory]=useState("")
    const [limit,setLimit]=useState("")
    const [month,setMonth]=useState("")

    // Hàm xử lý khi người dùng submit form
    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        // Kiểm tra dữ liệu nhập vào
        if(!category){
            alert('Vui lòng chọn danh mục!')
            return
        }
        const numericAmount = Number(limit);
        if(!Number.isFinite(numericAmount) || numericAmount<=0){
            alert("Vui lòng nhập số tiền");
            return;
        }
        if(!month){
            alert("Vui lòng chọn tháng áp dụng");
            return;
        }

        if(props.editingBudget !== null) {
            props.onUpdateBudget(props.editingBudget.id, category, numericAmount, month);
            setCategory("");
            setLimit("");
            setMonth("");
            return;
        }

        const isAdded = props.onAddBudget(category, numericAmount, month);
        if (!isAdded) {
            return;
        }
        // Reset form sau khi submit
        setCategory("")
        setLimit("")
        setMonth("")
    }

    function handleCancel(){
        props.onCancelEditBudget()
        setCategory("")
        setLimit("")
        setMonth("")
    }

    useEffect(() => {
        if (props.editingBudget !== null) {
            setCategory(props.editingBudget.category);
            setLimit(props.editingBudget.limit.toString());
            setMonth(props.editingBudget.month);
        } else {
            setCategory("");
            setLimit("");
            setMonth("");
        }
    }, [props.editingBudget]);

    return(
        <div>
            <h2>
    {           props.editingBudget ? "Chỉnh sửa ngân sách" : "Thêm ngân sách"}
            </h2>
            <form className="budget-form" onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="Category">Category</label>
                    <select name="Category" id="Category" value={category}
                    onChange={(e)=>setCategory(e.target.value)}>
                        <option value="">-- Chọn danh mục --</option>
                        <option value="food">Food</option>
                        <option value="transport">Transport</option>
                        <option value="housing">Housing</option>
                        <option value="shopping">Shopping</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="health">Health</option>
                        <option value="otherexpense">Other Expense</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="limit">Số tiền</label>
                    <input
                        type="number"
                        id="limit"
                        placeholder="Nhập số tiền"
                        value={limit}
                        onChange={
                            (e)=>setLimit(e.target.value)
                        }>
                    </input>
                </div>

                <div className="form-group">
                    <label htmlFor="month">Tháng áp dụng</label>
                    <input
                        type="month"
                        id="month"
                        placeholder="Nhập tháng áp dụng (YYYY-MM)"
                        value={month}
                        onChange={
                            (e)=>setMonth(e.target.value)
                        }>
                    </input>
                </div>
                <button type="submit" className="submit-button">
                    {props.editingBudget ? "Lưu thay đổi" : "+ Lưu ngân sách"}
                </button>
                {
                    props.editingBudget && (
                        <button type="button" className="cancel-button" onClick={handleCancel}>
                            Hủy
                        </button>
                    )
                }
            </form>
        </div>

    )
}

export default BudgetForm