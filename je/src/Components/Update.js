import React, {useState,useEffect} from "react";
import "../App.css";
import { Container, Navbar, NavDropdown, OverlayTrigger, Tooltip,ListGroup,Form,Modal, Button, Offcanvas, Row, Col, Alert} from "react-bootstrap";
import logo from "../je-logo.jpg"
import { FaListAlt,FaGripHorizontal,FaShoppingCart,FaPeopleArrows,FaDatabase, FaEdit, FaPlus} from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import {NavLink} from "react-router-dom";
import Axios from "axios"

function Update(props){
    //   useState for Offcanvas
  const [Offshow, setOffShow] = useState(false);
  const handleOffClose = () => setOffShow(false);
  const handleOffShow= () => setOffShow(true);
  
 //setting update modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//   states for collecting data from inputs

    const[employeeName,setEmployeeName] = useState('')
    const[costCenter,setCostCenter] = useState('')
    const[expenseType,setExpenseType] = useState('')
    const[id,setID] = useState(null)

 //setting error handlers
 const[error,setError] = useState("")

    const postData = (e) =>{
        e.preventDefault();
        if(employeeName.trim()==="" && costCenter === "" && expenseType === ""){
            setError("Please fill in all the required fields.")
            return false;
        }
        if(employeeName.trim()===""){
            setError("Please fill in the Employee Name field.");
            return false;
        }
        else{
            Axios.put(`https://626118b3f429c20deb9a8ee7.mockapi.io/userData/${id}`,{
            employeeName,
            costCenter,
            expenseType
        })
        handleShow();
        }     
    }

    useEffect(()=>
    {
        setID(localStorage.getItem('ID'));
        setEmployeeName(localStorage.getItem('Employee Name'));
        setCostCenter(localStorage.getItem('Cost Center'));
        setExpenseType(localStorage.getItem('Expense Type'));
    },[]);
        return(
            <>
                <div className="mainLayout m-0 p-0 w-100">
                    <div className="row" style={{height: "100vh"}}>
                        <div className="col-2 sidepanel shadow-sm  p-0 m-0 d-flex flex-column d-none d-xl-block">
                            <div><img src={logo}/></div>   
                                <ListGroup className="nav-menu mt-2">
                                <NavLink to="/MyWork" activeClassName="active" className="link"> <FaListAlt fontSize={23}/>  My Work </NavLink>
                                     <NavLink to="/MyApplication" activeClassName="active" className="link"> <FaGripHorizontal fontSize={23}/>  My Application </NavLink>
                                     <NavLink to="/ByStatus" activeClassName="active" className="link"> <FaShoppingCart fontSize={23}/>  By Status </NavLink>
                                     <NavLink to="/DelegationProfile" activeClassName="active" className="link"> <FaPeopleArrows fontSize={23}/>  Delegation Profile </NavLink>
                                     <NavLink to="/Archive" activeClassName="active" className="link"> <FaDatabase  fontSize={23}/> Archive Database </NavLink>
                                </ListGroup>
                        </div>
                        <div className="col-xl-10 col-md-12">
                            <div className="row nav-bar shadow">
                                    <div className="">
                                    <Navbar expand="lg" className="">
                                            <Container fluid className="d-flex justify-content-between">
                                                <Navbar.Toggle onClick={handleOffShow} aria-controls="navbar-dark-example"/>
                                                <h5 className="page-title d-none d-sm-block">Expenses Account Reimbursement</h5>
                                                <NavDropdown className="text-muted" title="Paul Walker">
                                                    <NavDropdown.Item><NavLink to="/">Log Out</NavLink></NavDropdown.Item>
                                                </NavDropdown>
                                            </Container>
                                        </Navbar>
                                    </div>                  
                            </div>

                            <div className="col p-0 m-0">
                                <div className="">
                                    <Form>        
                                    <Row className="m-0 p-0">
                                    <div className=" col d-flex justify-content-between my-4">
                                        <h3 className="fw-bold">Update</h3>
                                    <div className="me-4">
                                            <Button variant="warning" className="btnClass" type="submit" onClick={postData}>Update</Button>
                                            <NavLink className={"nav-active-link"} to="/MyWork"><Button variant="secondary">Cancel</Button></NavLink>
                                    </div>
                                    </div>
                                    <Row>
                                        <Col md={4} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Employee Name</Form.Label>
                                            <Form.Control type="text" name="employeeName" onChange={(e)=> setEmployeeName(e.target.value)} value={employeeName} required/>
                                        </Form.Group>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Cost Center</Form.Label>
                                            <Form.Select name="costCenter" onChange={(e)=> setCostCenter(e.target.value)} value={costCenter} required>
                                            <option value="" selected disabled>Select</option>
                                                <option value="PRC">PRC</option>
                                                <option value="HK">HK</option>
                                                <option value="ILO">ILO</option>
                                                <option value="JBO">JBO</option>
                                                <option value="JEK">JEK</option>
                                                <option value="PARLEX HK">PARLEX HK</option>
                                                <option value="PRC-BEHAI">PRC-BEHAI</option>
                                                <option value="PRC-JESH">PRC-JESH</option>
                                                <option value="PRC-PARLEX">PRC-PARLEX</option>
                                                <option value="TAIWAN">TAIWAN</option>
                                                <option value="ZBO">ZBO</option>                  
                                            </Form.Select>
                                        </Form.Group>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Expense Type</Form.Label>
                                            <Form.Select name="expenseType" onChange={(e)=> setExpenseType(e.target.value)} value={expenseType} required>
                                            <option value="" selected disabled>Select</option>
                                            <option value="Business Travel">Business Travel</option>
                                            <option value="Home Leave">Home Leave</option>
                                            <option value="Moving & Living">Moving & Living</option>
                                            <option value="Petty Cash">Petty Cash</option>
                                            </Form.Select>
                                        </Form.Group>
                                        </Col>
                                        </Row>
                                        {<p className="text-danger fw-bold">{error}</p>} 
                                        </Row> 
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>       

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

                {/* modal */}
                <Modal  backdrop="static" show={show} onHide={handleClose}>
                    <Modal.Body className="d-flex flex-row justify-content-between modal-bdy"><h5>Data successfully updated</h5>
                    <NavLink to="/MyWork" className={"nav-active-link"}><GiCancel size={20} color="green"/></NavLink>
                    </Modal.Body>
                </Modal>
            </>
        )
}

export default Update;