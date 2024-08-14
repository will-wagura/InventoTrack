import { useState } from "react";
import "./ItemEntry.css";
import { Item } from "../types/Item";

interface Props {
  onAddItem: (item: Item) => void | (() => void);
}

function ItemEntry({ onAddItem }: Props) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kgs");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("Ksh");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem = {
      itemName,
      quantity: parseInt(quantity),
      unit,
      price: parseFloat(price),
      currency,
      paymentStatus,
      stockStatus: "In Stock",
    };
    onAddItem(newItem);
    setSuccessMessage("Successfully added the item to the stock list");
    setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
    setItemName("");
    setQuantity("");
    setPrice("");
    setPaymentStatus("");
    setUnit("kgs"); // Reset the unit to default
    setCurrency("Ksh"); // Reset the currency to default
  };

  return (
    <div className="item-entry">
      <h2>Item Entry</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <div className="quantity-container">
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="kgs">kgs</option>
            <option value="ltrs">ltrs</option>
            <option value="pieces">pieces</option>
          </select>
        </div>
        <div className="price-container">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="Ksh">Ksh</option>
            <option value="Tsh">Tsh</option>
          </select>
        </div>
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
        >
          <option value="">Payment Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="partial">Partial</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ItemEntry;
