import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider';
const Checkout = () => {

    const services = useLoaderData()
    const { _id, title, price, img } = services;
    const { user } = useContext(AuthContext)

    const handleOrder = (e) => {
        e.preventDefault()

        const form = e.target
        const name = form.name.value
        const date = form.date.value
        const email = form.email.value
        const price = form.price.value
        const order = {
            customerName: name,
            Services_id: _id,
            Services: title,
            img,
            email,
            date,
            price
        }

        fetch(`http://localhost:5000/bookings`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    alert('s')
                } else {
                    alert('e')
                }
            })
    }

    return (
        <div>
            <div className="card flex-shrink-0 w-full  bg-base-200">
                <div className="card-body">
                    <h3 className="text-3xl text-center">{title}</h3>
                    <form onSubmit={handleOrder}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Name" defaultValue={user?.displayName} name='name' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date</span>
                                </label>
                                <input type="date" name='date' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" defaultValue={user?.email} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">price</span>
                                </label>
                                <input type="text" name='price' className="input input-bordered" defaultValue={`$ ${price}`} />
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value='Order Now' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;