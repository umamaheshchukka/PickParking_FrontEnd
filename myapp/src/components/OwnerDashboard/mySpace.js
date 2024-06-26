import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startActiveOrDisableParkings, startGetParkingSpace, startRemoveParkingSpace } from "../../actions/ownerActions"
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap'
import EditSpace from "./editSpace"
import { useNavigate } from "react-router-dom"
import axios from "axios"
export default function MySpace() {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState('')
    const toggle = () => setModal(!modal)
    const parkingSpace = useSelector((state) => {
        return state.owners.parkingSpace
    })
    const handleCLick = (id) => {
        setEditId(id)
        toggle()
    }
    const handleAdd=()=>{
         navigate('/addparking')
    }
    const handleDelete=async(id)=>{
       dispatch(startRemoveParkingSpace(id))
    }
    const handleDisable=async(id)=>{
       dispatch(startActiveOrDisableParkings(id))
    }
    console.log("parkings",parkingSpace)
    return (
        <>
            <div class="container text-center" style={{ paddingTop: '60px' }}>
                <h3 className="mt-4">Total Space-{parkingSpace.length}</h3>
                <div class="row">
                    {parkingSpace && parkingSpace.map((ele) => {
                        return <div class="col-md-4"  key={ele._id}>
                            <div class="card text-center mb-3 mt-4 ml-4" style={{ width: "18rem", position: "relative" }}>
                                <span className={ele.approveStatus ? "badge text-bg-success" : "badge text-bg-danger"} style={{ position: "absolute", top: 0, right: 0 }}>
                                    {ele.approveStatus ? ("approve") : ("pending")}
                                </span>
                                <div class="card-body bg-light">
                                    <h5 class="card-title">{ele.title}</h5>
                                    <h6 class="card-text">
                                    <button type="button" className="btn btn-info" onClick={()=>{handleCLick(ele._id)}}>more</button>
                                    <button type="button" className="btn btn-danger ml-2" onClick={()=>{handleDelete(ele._id)}}> delete</button>
                                <button type="button" className={ele.activeStatus ? " btn btn-success ml-2" : "btn btn-danger ml-2"} onClick={()=>{handleDisable(ele._id)}}>{ele.activeStatus ? ("active"):("disable")}</button>
                                    </h6>                           
                                </div>
                            </div>
                        </div>
                    })}

                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="button" className="btn btn-primary" onClick={handleAdd}>Add Space</button>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Edit Your Parking Space</ModalHeader>
                <ModalBody>
                  <EditSpace editId={editId} toggle={toggle}/>
                </ModalBody>
            </Modal>
        </>
    )
}