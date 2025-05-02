export default function ExpenseContainer({expenses}){
    return(
        <div>
            <h2>categories-{expenses.length}</h2>
            <ul>{expenses.map((ele)=>{
                return(
                    <li>{ele.title}</li>
                )
            })
                }
            </ul>

        </div>
    )

}