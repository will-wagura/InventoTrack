import { useState, useEffect } from "react";
import axios from "axios";
import "./StockInformation.css";
import { Item } from "../types/Item";

interface Props {
  onDelete: (index: number) => void;
  items: Item[];
  onEdit: (index: number, editedItem: Item) => void;
}

function StockInformation({ items = [], onDelete, onEdit }: Props) {
  const [stockItems, setStockItems] = useState<Item[]>(items);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<Partial<Item>>({});

  const getAuthToken = () => localStorage.getItem("access_token");

  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  const fetchStockItems = async () => {
    try {
      const response = await axiosInstance.get('/stock');
      console.log(response.data);
      setStockItems(response.data);
    } catch (error) {
      console.error('Failed to fetch stock items:', error);
    }
  };

  useEffect(() => {
    fetchStockItems();
  }, []);

  const handleEditClick = (index: number) => {
    setIsEditing(index);
    setEditedItem({ ...stockItems[index] });
  };

  const handleSaveClick = async (index: number) => {
    try {
      await axiosInstance.put(`/stock/${stockItems[index].id}`, editedItem);
      const updatedItems = [...stockItems];
      updatedItems[index] = { ...editedItem, id: stockItems[index].id } as Item;
      setStockItems(updatedItems);
      onEdit(index, editedItem as Item); // Notify parent component
    } catch (error) {
      console.error('Failed to update stock item:', error);
    }
    setIsEditing(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleDelete = async (index: number) => {
    try {
      await axiosInstance.delete(`/stock/${stockItems[index].id}`);
      const updatedItems = stockItems.filter((_, i) => i !== index);
      setStockItems(updatedItems);
      onDelete(index); // Notify parent component
    } catch (error) {
      console.error('Failed to delete stock item:', error);
    }
  };

  return (
    <div className="stock-information">
      <h2>Stock Information</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
            <th>Expiry Date</th>
            <th>Store</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stockItems.map((item, index) => (
            <tr key={item.id}>
              {isEditing === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editedItem.name || ""} // Ensure controlled input
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="category"
                      value={editedItem.category || ""} // Ensure controlled input
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={editedItem.description || ""} // Ensure controlled input
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      value={editedItem.price || 0} // Ensure controlled input
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="expiry_date"
                      value={editedItem.expiry_date || ""} // Ensure controlled input
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="store"
                      value={editedItem.store?.name || ""} // Ensure controlled input
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSaveClick(index)}>Save</button>
                    <button onClick={() => setIsEditing(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.expiry_date}</td>
                  <td>{item.store.name}</td>
                  <td>
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
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
