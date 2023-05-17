import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingTable from "./BookingTable";

const Bookings = () => {
    const { user } = useContext(AuthContext)
    const [bookings, setBooking] = useState([])
    const email = user?.email

    useEffect(() => {
        fetch(`https://car-doctor-server-three-sandy.vercel.app/bookings?email=${email}`, {
            method: 'GET',
            headers: {
                authorization: `bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setBooking(data);
            })
    }, [email])

    const handleDelete = (id) => {
        console.log(id);
        fetch(`https://car-doctor-server-three-sandy.vercel.app/bookings/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    alert('s')
                    const remaining = bookings.filter(booking => id !== booking._id)
                    setBooking(remaining)
                }
            })
    }

    const handleUpdate = (id) => {
        console.log(id);
        fetch(`https://car-doctor-server-three-sandy.vercel.app/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: true })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert('s')
                    const remaining = bookings.filter(booking => id !== booking._id)
                    const updatedId = bookings.filter(booking => id === booking._id)
                    updatedId.status = true
                    // console.log(updatedId);
                    // console.log(remaining);
                    setBooking([updatedId, ...remaining])
                }
            })
    }

    return (
        <div>
            <h3 className="text-3xl text-center p-4">Bookings</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Confirm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => <BookingTable
                            key={booking._id}
                            booking={booking}
                            handleUpdate={handleUpdate}
                            handleDelete={handleDelete}
                        // handleRemove={handleRemove}
                        ></BookingTable>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;