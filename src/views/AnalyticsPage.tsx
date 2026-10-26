import '../styles/AnalyticsPage.css'
import type { Transaction } from '../models/Transaction'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,Cell,PieChart,Pie,Legend } from 'recharts';
interface AnalyticsPageProps{
    transactions:Transaction[];
}

function AnalyticsPage(props:AnalyticsPageProps){
    const totalIncome= props.transactions.filter((transaction)=>
        transaction.type==='income')
         .reduce((sum,transaction)=>transaction.amount+sum,0)
    const totalExpense=props.transactions.filter((transaction)=>
        transaction.type==='expense')
            .reduce((sum,transaction)=>transaction.amount+sum,0)

    const categoryTotals= props.transactions.filter((transaction)=>
        transaction.type==="expense")
            .reduce((acc,transaction)=>{
                acc[transaction.category]=
                    (acc[transaction.category]??0)+transaction.amount;
                        return acc;
            },
            {} as Record<string,number>
        )
    // console.log("Chi tiêu theo danh mục:", categoryTotals);
    const categoryEntries=Object.entries(categoryTotals);
    // console.log(categoryEntries)
    const categoryChartData =categoryEntries.map(([category,amount])=>{
        return {
            name:category,
            amount:amount
        };
    }).sort((a,b)=> b.amount- a.amount)

    const categoryPercentData = categoryChartData.map((item) => {
        return{
            ...item,
            percent: totalExpense>0? 
                (item.amount/ totalExpense)*100:0
        }
    });
    // console.log(categoryPercentData)

    const chartData=[
        {name:"Thu nhập",amount:totalIncome},
        {name:"Chi tiêu",amount:totalExpense}
    ]
    // Danh sách màu dành cho biểu đồ tròn
    const COLORS = ["#16a34a", "#2563eb", "#f59e0b", "#dc2626"];
    return(
        <div>
            <div className="chart-header">
                <h2>Tổng quan thu chi</h2>
                <p>So sánh tổng thu nhập và chi tiêu của bạn</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart  data={chartData}>
                    <XAxis dataKey="name"/>
                    <Bar dataKey="amount"  name="Số tiền">
                        {
                            chartData.map((item)=>(
                                <Cell
                                    key={item.name}
                                    fill={item.name==="Thu nhập"?"#16a34a":"#dc2626"}
                                />
                            ))
                        }
                    </Bar>
                    <YAxis 
                        tickFormatter={(value)=>`${value /1000000}M`}
                    />
                    <Tooltip 
                        formatter={(value)=>{
                            return `${Number(value).toLocaleString('vi-VN')} ₫`
                        }}
                    />
                </BarChart> 
            </ResponsiveContainer>
            <div className="chart-header">
                <h2>Tổng quan chi tiêu theo từng danh mục </h2>
                <p>So sánh chi tiêu theo từng danh mục </p>
            </div>
            {/* Biểu đồ của Category  */}
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryChartData}>
                    <XAxis dataKey="name"/>
                    <Bar dataKey="amount" name="Số tiền" fill='#dc2626'/>
                    <YAxis 
                        tickFormatter={(value)=>`${value /1000}K`}
                    />
                    <Tooltip 
                        formatter={(value)=>{
                            return `${Number(value).toLocaleString('vi-VN')} ₫`
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
            {/* Biểu đồ tỷ lệ chi tiêu theo danh mục */}
            <div className="chart-header">
                <h2>Tỷ lệ chi tiêu theo danh mục</h2>
                <p>So sánh tỉ lệ theo từng danh mục</p>
            </div>
            { categoryChartData.length>0?(
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart >
                        <Pie  data={categoryPercentData} dataKey="amount" 
                            nameKey="name"
                            label={({ percent }) =>
                                `${((percent ?? 0) ).toFixed(1)}%`
                            }                        >
                            {
                                categoryChartData.map((item,index)=>(
                                    <Cell
                                        key={item.name}
                                        fill={COLORS[index%COLORS.length]}
                                    />
                                ))
                            }
                        </Pie>
                        {/* Hiển thị số tiền khi di chuột */}
                        <Tooltip
                        formatter={(value) =>
                            `${Number(value).toLocaleString('vi-VN')} ₫`
                        }
                        />

                        {/* Hiển thị chú giải tên danh mục và màu sắc */}
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>):(
                    <p>Chưa có dữ liệu chi tiêu</p>
                )
            }
        </div>
    )
}
export default AnalyticsPage