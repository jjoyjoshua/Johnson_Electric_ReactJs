import React, {useState,useEffect} from "react";
import "../App.css";
import { Container, Navbar, NavDropdown, OverlayTrigger, Tooltip,ListGroup,Offcanvas,Modal,Button} from "react-bootstrap";
import logo from "../je-logo.jpg"
import { FaListAlt,FaGripHorizontal,FaShoppingCart,FaPeopleArrows,FaDatabase, FaEdit, FaPlus} from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import {NavLink} from "react-router-dom";
import Axios from "axios";
import axios from "axios";
function Layout(props){

    // useState for modals(delete)
  const [infoId,setInfoId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (data) => {
      setShow(true);
      setInfoId(data);
    }

//   useState for Offcanvas

  const [Offshow, setOffShow] = useState(false);
  const handleOffClose = () => setOffShow(false);
  const handleOffShow= () => setOffShow(true);

//   fetching data from API

    const[APIdata, setAPIdata] = useState([]);

    useEffect(()=>{
            Axios.get("https://626118b3f429c20deb9a8ee7.mockapi.io/userData").then(
            (response) =>{
                    setAPIdata(response.data);
            });
        },[]);

    // update the data

    const setData= (data) =>{
        console.log(data)
        let { id, employeeName, costCenter, expenseType} = data;
        localStorage.setItem('ID', id);
        localStorage.setItem("Employee Name", employeeName)
        localStorage.setItem("Cost Center",costCenter)
        localStorage.setItem("Expense Type",expenseType)
    }

    // deleting the data

    const onDelete = (id) => {
        Axios.delete(`https://626118b3f429c20deb9a8ee7.mockapi.io/userData/${id}`)
     .then(() => {
        getData();
    },console.log(id))

    const getData = (id) => {
        Axios.get("https://626118b3f429c20deb9a8ee7.mockapi.io/userData")
            .then((getData) => {
                 setAPIdata(getData.data);
             })
    }
}
        return(
            <>
                <div className="mainLayout m-0 p-0 w-100">
                    <div className="row" style={{height: "100vh"}}> 
                        <div className="col-2 sidepanel shadow-sm  p-0 m-0 d-flex flex-column d-none d-xl-block">
                            <div><img src={logo}/></div>   
                                <ListGroup className="nav-menu mt-2 sidepanel">
                                <NavLink to="/MyWork" activeClassName="active" className="link"> <FaListAlt className="me-1" fontSize={23}/>  My Work </NavLink>
                                     <NavLink to="/MyApplication" activeClassName="active" className="link"> <FaGripHorizontal className="me-1" fontSize={23}/>  My Application </NavLink>
                                     <NavLink to="/ByStatus" activeClassName="active" className="link"> <FaShoppingCart className="me-1" fontSize={23}/>  By Status </NavLink>
                                     <NavLink to="/DelegationProfile" activeClassName="active" className="link"> <FaPeopleArrows className="me-1" fontSize={23}/>  Delegation Profile </NavLink>
                                     <NavLink to="/Archive" activeClassName="active" className="link"> <FaDatabase className="me-1" fontSize={23}/> Archive Database </NavLink>
                                </ListGroup>
                        </div>
                        <div className="col-xl-10 col-md-12">
                            <div className="row nav-bar shadow">
                                    <div className="">
                                    <Navbar expand="lg" className="" >
                                            <Container fluid className="d-flex justify-content-between">
                                                <Navbar.Toggle onClick={handleOffShow} className="d-lg-block d-xl-none" aria-controls="navbar-dark-example"/>
                                                <h5 className="page-title d-none d-sm-block">Expenses Account Reimbursement</h5>
                                                <NavDropdown className="text-secondary" title="Paul Walker">
                                                    <NavDropdown.Item><NavLink className="text-muted bg-transparent" style={{textDecoration:"none"}} to="/">Log Out</NavLink></NavDropdown.Item>
                                                </NavDropdown>
                                            </Container>
                                    </Navbar>
                                    </div>                  
                            </div>
                            <div className="row content-head  my-4 mx-3">
                                <div className="col d-flex justify-content-between ">
                                <h3 className="fs-4 fw-bolder">{props.name}</h3>
                                <NavLink to="/MyWork/Ear"><button className="btn btn-warning btnClass"><FaPlus/> New EAR</button></NavLink>
                                </div>
                            </div>
                            <div className="row content-table shadow mx-4 my-3 rounded">
                                <div class="table-responsive p-0 m-0">
                                        <table class="table table-hover m-0 ">
                                            <thead className="thead w-100">
                                                <tr>
                                                    <th>Employee Name</th>
                                                    <th>Cost Center</th>
                                                    <th>Expense Type</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>	
                                                        { APIdata.length> 0 ? APIdata.map((info) =>{
                                                        return(
                                                            <tr>
                                                                <td>{info.employeeName}</td>
                                                                <td>{info.costCenter}</td>
                                                                <td>{info.expenseType}</td>
                                                                <td class="text-end">
                                                                    <OverlayTrigger placement="top-end" overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                                                                   <NavLink to="/MyWork/Update"><a><FaEdit className="dash-icons mx-1" size={24} onClick={()=>setData(info)}/></a></NavLink> 
                                                                    </OverlayTrigger>											
                                                                    <OverlayTrigger placement="top-end" overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}><a onClick={()=>{handleShow(info.id)}} style={{cursor: "pointer"}}><RiDeleteBinLine  className="dash-icons mx-1"  size={24} /></a></OverlayTrigger>
                                                                </td>
                                                            </tr>
                                                            
                                                        )
                                                    }) : <tr><td></td><td className="text-warning fw-bold text-center">No records found.</td><td></td><td></td></tr>}
                                             </tbody>
                                        </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>       


                {/* modal */}
                <Modal  show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Sure to delete?</Modal.Body>
                        <Modal.Footer>
                        <span onClick={handleClose} >
                            <Button variant="danger" onClick={()=>{onDelete(infoId)}}>
                                Delete
                            </Button>
                        </span>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        </Modal.Footer>
                 </Modal>
                    
                {/* offcanvas */}

                <Offcanvas id="offcanvas" show={Offshow} onHide={handleOffClose}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title><img src={logo}/></Offcanvas.Title>
                    </Offcanvas.Header>

                    <ListGroup className="nav-menu mt-2">
                        <NavLink to="/MyWork" activeClassName="active" className="link"> <FaListAlt fontSize={23}/>  My Work </NavLink>
                        <NavLink to="/MyApplication" activeClassName="active" className="link"> <FaGripHorizontal fontSize={23}/>  My Application </NavLink>
                        <NavLink to="/ByStatus" activeClassName="active" className="link"> <FaShoppingCart fontSize={23}/>  By Status </NavLink>
                        <NavLink to="/DelegationProfile" activeClassName="active" className="link"> <FaPeopleArrows fontSize={23}/>  Delegation Profile </NavLink>
                        <NavLink to="/Archive" activeClassName="active" className="link"> <FaDatabase  fontSize={23}/> Archive Database </NavLink>
                    </ListGroup>
                </Offcanvas>
            </>
        )
}

export default Layout;