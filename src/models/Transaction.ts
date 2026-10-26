export interface Transaction{
    id:string;
    title:string;
    amount:number;
    type:'income'|'expense';
    category:string;
    date:string
}

const transaction1: Transaction={
    id:"1",
    title:"Ăn sáng",
    amount:30000,
    type:'expense',
    category:'"Food',
    date:"2026-10-20"
}
