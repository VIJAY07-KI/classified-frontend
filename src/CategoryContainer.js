
import { useContext } from "react"
import CategoryForm from "./CategoryForm"
import CategoryContext from "./CategoryContext"

export default function CategoryContainer(){
    const {categories} = useContext(CategoryContext)


    return(
        <div>
            <h2>categories-{categories.length}</h2>
            <ul>{categories.map((ele)=>{
                return(
                    <li>{ele.name}</li>
                )
            })
                }
            </ul>
            <CategoryForm />

        </div>
    )

}