import React, {useContext} from "react";
import {useLoaderData} from "react-router-dom";
import {authContext} from "../../providers/AuthProvider";

const CheckOut = () => {
  const service = useLoaderData();
  const {_id, title, price, img} = service;
  const {user} = useContext(authContext);
  console.log(service);

  const handleBookService = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;
    const amount = form.amount.value;
    const booking = {
      customerName: name,
      date,
      email,
      amount,
      image: img,
      service_id: _id,
      title: title,
      price: price,
    };
    console.log(booking);

    fetch("https://car-doctor-server-umber-two.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <h2>Book service:</h2>

      <form onSubmit={handleBookService}>
        <div className="card-body">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                placeholder="Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                name="date"
                placeholder="password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                defaultValue={user?.email}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due Amount</span>
              </label>
              <input
                type="text"
                name="amount"
                defaultValue={`$${price}`}
                className="input input-bordered"
              />
            </div>
          </div>
          <input
            className="btn btn-primary btn-block"
            type="submit"
            value="Order Confirm"
          />
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
