import "./index.css"
import { useState,useEffect } from "react"
import axios from "axios"
import Expense from "./Expense/Expense"
import Category from "./Category/Category"


export default function ExpApp(){
    return(
        <div>
            <h1>Expense App</h1>
            <Category/>
            <Expense/>
        </div>
    )

}

