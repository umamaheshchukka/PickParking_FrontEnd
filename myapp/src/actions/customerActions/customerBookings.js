import axios from"axios"
export const GET_BOOKINGS="GET_BOOKINGS"
export const SET_NEW_BOOKING="SET_NEW_BOOKING"
export const startGetBookings=()=>{
    return async(dispatch)=>{
        try{
            const response=await axios.get("http://localhost:3045/api/bookings/list",{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            dispatch(getbookings(response.data))
        }catch(err){
            console.log(err)
        }
    }
}

export const startParkingSpaceBooking=(id, parkingType,formData,popUp)=>{
    return async(dispatch)=>{
        try {
            const response = await axios.post(`http://localhost:3045/api/booking/${id}/spaceTypes/${parkingType}`,formData, {
                headers: { 'Authorization': localStorage.getItem('token') }
            })
            console.log("booo",response.data)
            dispatch(setSpaceBooking(response.data))
            popUp()
        } catch (err) {
            console.log(err)
        }
    }
}


const getbookings=(data)=>{
    return{
        type:GET_BOOKINGS,
        payload:data
    }
}
const setSpaceBooking=(data)=>{
    return {
        type:SET_NEW_BOOKING,
        payload:data
    }
}