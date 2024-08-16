import { useState, useEffect } from "react";
import axios from "axios";
import "./SupplyRequests.css";

function SupplyRequests() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [supplyRequests, setSupplyRequests] = useState<
    { id: number; item: string; quantity: number; status: string }[]
  >([]);

  const getAuthToken = () => {
    return localStorage.getItem("access_token");
  };

  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  const fetchSupplyRequests = async () => {
    try {
      const response = await axiosInstance.get('/supply');
      const data = response.data || [];
      setSupplyRequests(data);
    } catch (error) {
      console.error('Failed to fetch supply requests:', error);
    }
  };

  useEffect(() => {
    fetchSupplyRequests();
  }, []);
  console.log(supplyRequests);

  useEffect(() => {
    localStorage.setItem("supplyRequests", JSON.stringify(supplyRequests));
  }, [supplyRequests]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRequest = {
      item: itemName,
      quantity: parseInt(quantity),
      status: "Pending",
    };

    try {
      if (isEditing) {
        await axiosInstance.put(`/supply/${supplyRequests[currentIndex].id}`, newRequest);
        const updatedRequests = [...supplyRequests];
        updatedRequests[currentIndex] = { ...newRequest, id: supplyRequests[currentIndex].id };
        setSupplyRequests(updatedRequests);
      } else {
        const response = await axiosInstance.post('/supply', newRequest);
        setSupplyRequests([...supplyRequests, response.data]);
      }
    } catch (error) {
      console.error('Failed to process supply request:', error);
    }

    setItemName("");
    setQuantity("");
    setIsEditing(false);
    setCurrentIndex(0);
  };

  const handleEdit = (index: number) => {
    const requestToEdit = supplyRequests[index];
    setItemName(requestToEdit.item);
    setQuantity(requestToEdit.quantity.toString());
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const handleDelete = async (index: number) => {
    const requestId = supplyRequests[index].id;
    try {
      await axiosInstance.delete(`/supply/${requestId}`);
      const updatedRequests = supplyRequests.filter((_, i) => i !== index);
      setSupplyRequests(updatedRequests);
    } catch (error) {
      console.error('Failed to delete supply request:', error);
    }
  };

  return (
    <div className="supply-requests">
      <h2>Supply Requests</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName || ""} // Ensure value is always a string
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity || ""} // Ensure value is always a string
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="submit">
          {isEditing ? "Update Request" : "Request Supply"}
        </button>
      </form>
      <h3>Current Requests</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {supplyRequests.length > 0 ? (
            supplyRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.product.name}</td>
                <td>{request.quantity}</td>
                <td>{request.status}</td>
                <td>
                  <button onClick={() => handleEdit(supplyRequests.findIndex(r => r.id === request.id))}>Edit</button>
                  <button onClick={() => handleDelete(supplyRequests.findIndex(r => r.id === request.id))}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No supply requests available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SupplyRequests;
