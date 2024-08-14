import { useState, useEffect } from "react";
import "../../styles/Clerk/SupplyRequests.css";

function SupplyRequests() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [supplyRequests, setSupplyRequests] = useState<
    { item: string; quantity: number; status: string }[]
  >(() => {
    const savedRequests = localStorage.getItem("supplyRequests");
    return savedRequests
      ? JSON.parse(savedRequests)
      : [
          { item: "Item 3", quantity: 50, status: "Pending" },
          { item: "Item 4", quantity: 100, status: "Approved" },
        ];
  });

  useEffect(() => {
    localStorage.setItem("supplyRequests", JSON.stringify(supplyRequests));
  }, [supplyRequests]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      const updatedRequests = [...supplyRequests];
      updatedRequests[currentIndex] = {
        item: itemName,
        quantity: parseInt(quantity),
        status: "Pending",
      };
      setSupplyRequests(updatedRequests);
      setIsEditing(false);
      setCurrentIndex(0);
    } else {
      const newRequest = {
        item: itemName,
        quantity: parseInt(quantity),
        status: "Pending",
      };
      setSupplyRequests([...supplyRequests, newRequest]);
    }
    setItemName("");
    setQuantity("");
  };

  const handleEdit = (index: number) => {
    const requestToEdit = supplyRequests[index];
    setItemName(requestToEdit.item);
    setQuantity(requestToEdit.quantity.toString());
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const handleDelete = (index: number) => {
    const updatedRequests = supplyRequests.filter((_, i) => i !== index);
    setSupplyRequests(updatedRequests);
  };

  return (
    <div className="supply-requests">
      <h2>Supply Requests</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
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
          {supplyRequests.map((request, index) => (
            <tr key={index}>
              <td>{request.item}</td>
              <td>{request.quantity}</td>
              <td>{request.status}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupplyRequests;
