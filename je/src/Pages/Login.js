import React,{useState} from "react"
import {Button, Form} from "react-bootstrap"
import "../App.css"
import bg from "../js-off.jpg"
import logo from "../je-logo.jpg"
import {useNavigate} from "react-router-dom"


function Login(){

    const navigate = useNavigate()
     //setting up modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const creds={
        admin_email: "admin@admin.com",
        admin_password: "admin123"
    }


    const [user, setUser] = useState({email: "", password: ""})
    const[email,setEmail] = useState("")
    const[pwd,setPwd] = useState("")
    const [err,setErr] = useState("")

    const handler = (e)=>{
        e.preventDefault()
        console.log(email,pwd)
        if(email!="" && pwd!=""){
            if(email === creds.admin_email && pwd === creds.admin_password){
                console.log("Logged in")
                setErr("")
                setUser({email: email, password: pwd})
                navigate("/MyWork")        
            }
        else{
            setErr("Invalid Credentials. Please try again.")}
        }
        else{
            setErr("Fill in the Credentials")}
    }
    
    
        return(
            <>
                <div className="main-container">
                    <div className="row">
                        <div className="col-6 d-none d-sm-block "> <img src={bg} className= "img-fluid" style={{height:"657px"}}></img></div>
                        <div className="col lgin p-0">
                            <div className="login-container d-flex flex-column justify-content-center m-5">
                                <div className="mb-3"><img src={logo}></img></div>
                                <h3 className="mb-3">Log In</h3>
                                <Form onSubmit={handler}>
                                    <Form.Group><Form.Control className="mb-2" type="email" placeholder="Enter your Email"  onChange={(e)=> setEmail(e.target.value)} required></Form.Control></Form.Group>
                                    <Form.Group><Form.Control type="password" placeholder="Enter your password" onChange={(e)=> setPwd(e.target.value)}  required></Form.Control></Form.Group>
                                    {<p className="text-danger d-flex justify-content-start mt-1 fw-bold">{err}</p>}
                                    <div class="form-check my-3">
                                        <input class="form-check-input" type="checkbox" value="" id="RememberPassword"/>
                                        <label class="form-check-label float-start" for="RememberPassword"> Remember me </label>
                                    </div>
                                  <button type="submit" class="btn btn-warning btnClass w-100 mx-auto" >Log In</button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}

export default Login;           