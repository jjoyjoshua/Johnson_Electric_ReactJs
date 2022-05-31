import React from "react";
import {Routes, Route} from "react-router-dom"
import Login from "./Pages/Login";
import MyWork from "./Pages/MyWork"
import Archive from "./Pages/Archive"
import MyApplication from "./Pages/MyApplication";
import ByStatus from "./Pages/ByStatus";
import DelegationProfile from "./Pages/DelegationProfile"
import Ear from "./Pages/Ear";
import Update from "./Components/Update";
function App(){
        return(
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/MyWork" element={<MyWork/>}/>
            <Route path="/MyApplication" element={<MyApplication/>}/>
            <Route path="/ByStatus" element={<ByStatus/>}/>
            <Route path="/DelegationProfile" element={<DelegationProfile/>}/>
            <Route path="/Archive" element={<Archive/>}/>
            <Route path="/MyWork/Ear" element={<Ear/>}/>
            <Route path="/MyWork/Update" element={<Update/>}/>
          </Routes>
        )
}

export default App;