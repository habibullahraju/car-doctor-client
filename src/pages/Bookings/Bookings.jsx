import React, {useContext, useEffect, useState} from "react";
import {authContext} from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";
import {useNavigate} from "react-router-dom";

const Bookings = () => {
  const {user} = useContext(authContext);
  const [booking, setBooking] = useState([]);
  const navigate = useNavigate();
  const URL = `https://car-doctor-server-umber-two.vercel.app/bookings?email=${user?.email}`;
  useEffect(() => {
    fetch(URL, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("car-access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setBooking(data);
        } else {
          navigate("/");
        }
      });
  }, []);

  const handleDelete = (id) => {
    const proceed = confirm("Are you sure for Deleted?");
    if (proceed) {
      fetch(`https://car-doctor-server-umber-two.vercel.app/bookings/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("Your item is successfully deleted");
            const remaining = booking.filter((booking) => booking._id !== id);
            setBooking(remaining);
          }
        });
    }
  };

  const handleConfirm = (id) => {
    fetch(`https://car-doctor-server-umber-two.vercel.app/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({status: "confirm"}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const remaining = booking.filter((booking) => booking._id !== id);
          const updated = booking.find((booking) => booking._id === id);
          updated.status = "confirm";
          const newBooking = [updated, ...remaining];
          setBooking(newBooking);
        }
      });
  };
  return (
    <div>
      <h4 className="text-5xl">My Bookings: {booking.length}</h4>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <span>Cancel</span>
              </th>
              <th>Image</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((bookItem) => (
              <BookingRow
                key={bookItem._id}
                bookItem={bookItem}
                handleDelete={handleDelete}
                handleConfirm={handleConfirm}
              ></BookingRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
