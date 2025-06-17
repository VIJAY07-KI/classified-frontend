
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import {Provider} from "react-redux"
import './index.css'; 
import store from"./Store/ConfigureStore.js"
// import RecApp from "./Recipe/RecApp.js";
// import ClassifiedApp from './Classified/ClassifiedApp.js';
import BookingApp from './Booking/BookingApp.js';
console.log(store.getState())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <BrowserRouter>
    {/* <RecApp/>
     */}
     {/* <ClassifiedApp/> */}
     <BookingApp/>
    </BrowserRouter>
  </Provider>
);
