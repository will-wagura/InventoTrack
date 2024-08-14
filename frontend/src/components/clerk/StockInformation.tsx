import { useState } from "react";
import "./StockInformation.css";
import { Item } from "../types/Item";

interface Props {
  onDelete: (index: number) => void | (() => void);
  items: Item[];
  onEdit: (index: number, editedItem: Item) => void | (() => void);
}

function StockInformation({ items, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState({
    itemName: "",
    quantity: 0,
    price: 0,
    paymentStatus: "",
    stockStatus: "",
  });

  const handleEditClick = (index: number) => {
    setIsEditing(index);
    setEditedItem(items[index]);
  };

  const handleSaveClick = (index: number) => {
    onEdit(index, editedItem);
    setIsEditing(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleChange1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  return (
    <div className="stock-information">
      <h2>Stock Information</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Payment Status</th>
            <th>Stock Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index: number) => (
            <tr key={index}>
              {isEditing === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="itemName"
                      value={editedItem.itemName}
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      value={editedItem.quantity}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      value={editedItem.price}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <select
                      name="paymentStatus"
                      value={editedItem.paymentStatus}
                      onChange={(e) => handleChange1(e)}
                    >
                      <option value="paid">Paid</option>
                      <option value="unpaid">Unpaid</option>
                      <option value="partial">Partial</option>
                    </select>
                  </td>
                  <td>
                    <select
                      name="stockStatus"
                      value={editedItem.stockStatus}
                      onChange={(e) => handleChange1(e)}
                    >
                      <option value="in-stock">In Stock</option>
                      <option value="low-stock">Low Stock</option>
                      <option value="out-of-stock">Out of Stock</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleSaveClick(index)}>Save</button>
                    <button onClick={() => setIsEditing(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td className={item.paymentStatus}>{item.paymentStatus}</td>
                  <td className={item.stockStatus}>{item.stockStatus}</td>
                  <td>
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                    <button onClick={() => onDelete(index)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockInformation;
