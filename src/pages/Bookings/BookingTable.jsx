const BookingTable = ({ booking, handleDelete, handleUpdate }) => {
    const { _id, date, img, price, status } = booking

    return (
        <tr>
            <td><button onClick={() => handleDelete(_id)} className="btn">X</button></td>
            <td><img src={img} className="w-24" alt="v" /></td>
            <td>{date}</td>
            <td>{price}</td>
            <td>{status == true ? <button className="btn">confirmed</button> : <button onClick={() => handleUpdate(_id)} className="btn">confirm now</button>}</td>
        </tr>
    );
};

export default BookingTable;