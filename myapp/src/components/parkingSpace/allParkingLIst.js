// import { useEffect, useState, useContext } from "react"
// import { ParkingSpaceContext } from "../../contextApi/context"
// import axios from 'axios'
// import { Link } from "react-router-dom"
// import { Col, Row,Container } from "react-bootstrap"
// import { getDistance } from 'geolib'
// // import getDistance from 'geolib/es/getDistance'
// export default function ListParkings() {
//   const [parking, setParking] = useState([])
//   const { locationParking,center } = useContext(ParkingSpaceContext)
//   const calculateDistance=(userGeo,parkingGeo)=>{
//      return getDistance(userGeo,parkingGeo,1)
//   }
//   // useEffect(()=>{
//   //     (async()=>{
//   //         try{
//   //             const response=await axios.get('http://localhost:3045/api/parkingSpace')
//   //             console.log(response.data)
//   //             setParking(response.data)
//   //         }catch(err){
//   //             console.log(err)
//   //         }
//   //     })()
//   // },[])
//   return (
//     <div className="container mt-4" style={{ paddingTop: '40px',paddingBottom:"60px" }}>
//     <div className="row">
//         {locationParking.length !=0 ? (locationParking.map((ele, index) => (
//             <div key={index} className="col-lg-4 col-md-6 mb-4">
//                 <Link to={`/spaceBookingPage/${ele._id}`} className="text-decoration-none text-dark">
//                     <div className="card shadow-sm h-100">
//                         <img src={`http://localhost:3045/uploads/${ele.image}`} className="card-img-top" alt="..." />
//                         <div className="card-body">
//                           <Container>
//                             <Row>
//                               <Col>
//                               <p className="card-text">{ele.title}</p>
//                               </Col>
//                               {/* <Col>
//                               <p className="card-text">{ele.amenities}</p>
//                               </Col> */}
//                             </Row>
//                             <Row>
//                               <Col>
//                               <p>pricing starting from {ele.spaceTypes[0].amount} per hour</p>
//                               </Col>
//                             </Row>
//                             <Row>
//                               <Col>
//                               <p>distance from your location is {Math.round(calculateDistance(center,ele.address.coordinates)/1000)} kilometer</p>
//                               </Col>
//                             </Row>
//                           </Container>
//                         </div>
//                     </div>
//                 </Link>
//             </div>
//         ))):(<p className="text-center bold">No Parking Space Found</p>)}
//     </div>
// </div>

//   )
// }
import { useState, useContext } from "react";
import { ParkingSpaceContext } from "../../contextApi/context";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { startAddSpaceCart } from "../../actions/customerActions/customerSpaceCart";

export default function ListParkings() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.customer.cart);
    const { locationParking } = useContext(ParkingSpaceContext);
    const [selectedSpaces, setSelectedSpaces] = useState([]);
    const isSpaceInCart = (spaceId) => {
        return cart.some(item => item.parkingSpace && item.parkingSpace._id === spaceId);
    };

    const handleAddToCart = (spaceId) => {
        if (isSpaceInCart(spaceId)) {
            const updatedSpaces = selectedSpaces.filter(id => id !== spaceId);
            setSelectedSpaces(updatedSpaces);
        } else {
            const updatedSpaces = [...selectedSpaces, spaceId];
            setSelectedSpaces(updatedSpaces);
        }
        dispatch(startAddSpaceCart(spaceId));
    };

    return (
        <Container className="mt-4"  style={{paddingTop:"60px"}}>
            <Row>
                {locationParking ? (
                    locationParking.map((ele, index) => (
                        <Col key={index} lg={4} md={6} className="mb-4">
                            <Card className="shadow-sm h-100">
                                <Card.Img variant="top" src={`http://localhost:3045/uploads/${ele.image}`} alt={ele.title} />
                                <Card.Body>
                                    <Card.Title>{ele.title}</Card.Title>
                                    <Card.Text>{ele.amenities}</Card.Text>
                                    <Card.Text>Pricing starting from ${ele.spaceTypes[0].amount} per hour</Card.Text>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to={`/spaceBookingPage/${ele._id}`} className="btn btn-primary">
                                            Go..Book
                                        </Link>
                                        <Button variant="link" className="p-0 border-0" onClick={() => handleAddToCart(ele._id)}>
                                            {selectedSpaces.includes(ele._id) || isSpaceInCart(ele._id) ? <BsHeartFill style={{ color: 'red', fontSize: '1.5rem' }} /> : <BsHeart style={{ color: 'black', fontSize: '1.5rem' }} />}
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p>No Parking Space Found</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
}
