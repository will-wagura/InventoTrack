

import React, { useState, useEffect } from 'react';

interface Store {
  name: string;
  address: string;
  phone: string;
}

const StoreList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>(() => {
    // Retrieve stores from localStorage or set initial state
    const storedStores = localStorage.getItem("stores");
    return storedStores ? JSON.parse(storedStores) : [
      { name: 'Kitisuru Branch', address: '1A/Krihnarajapuram, 3rd street sulur', phone: '044-653578' },
      { name: 'Ruaka Branch', address: '54 Ramani colony, 3rd street sulur', phone: '044-653763' },
      { name: 'Kitengela Branch', address: '32/Venkatasamy layout, 3rd street sulur', phone: '044-653578' },
    ];
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedStore, setEditedStore] = useState<Store>({ name: '', address: '', phone: '' });
  const [newStore, setNewStore] = useState<Store>({ name: '', address: '', phone: '' });
  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    // Save stores to localStorage whenever the stores state changes
    localStorage.setItem("stores", JSON.stringify(stores));
  }, [stores]);

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditedStore(stores[index]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<Store>>) => {
    const { name, value } = e.target;
    setState((prevStore) => ({
      ...prevStore,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    if (editingIndex !== null) {
      const updatedStores = [...stores];
      updatedStores[editingIndex] = editedStore;
      setStores(updatedStores);
      setEditingIndex(null);
    }
  };

  const handleAddStoreClick = () => {
    setIsAdding(true);
  };

  const handleAddStore = () => {
    if (newStore.name && newStore.address && newStore.phone) {
      setStores([...stores, newStore]);
      setNewStore({ name: '', address: '', phone: '' });
      setIsAdding(false);
    }
  };

  const handleCancelAdd = () => {
    setNewStore({ name: '', address: '', phone: '' });
    setIsAdding(false);
  };

  return (
    
      
    <div className="store-list">
    
      <button className="add-store" onClick={handleAddStoreClick}>Add Store</button>
      
      {isAdding && (
        <div className="store">
          <div className="store-info">
            <input
              type="text"
              name="name"
              value={newStore.name}
              onChange={(e) => handleInputChange(e, setNewStore)}
              placeholder="Store Name"
              className="input-field"
            />
            <input
              type="text"
              name="address"
              value={newStore.address}
              onChange={(e) => handleInputChange(e, setNewStore)}
              placeholder="Store Address"
              className="input-field"
            />
            <input
              type="text"
              name="phone"
              value={newStore.phone}
              onChange={(e) => handleInputChange(e, setNewStore)}
              placeholder="Phone Number"
              className="input-field"
            />
            <button onClick={handleAddStore} className="save-store">Save</button>
            <button onClick={handleCancelAdd} className="cancel-store">Cancel</button>
          </div>
        </div>
      )}

      {stores.map((store, index) => (
        <div className="store" key={index}>
          <img src="src/assets/store-logo.png" alt="Shop Local" />
          {editingIndex === index ? (
            <div className="store-info">
              <input
                type="text"
                name="name"
                value={editedStore.name}
                onChange={(e) => handleInputChange(e, setEditedStore)}
                placeholder="Store Name"
                className="input-field"
              />
              <input
                type="text"
                name="address"
                value={editedStore.address}
                onChange={(e) => handleInputChange(e, setEditedStore)}
                placeholder="Store Address"
                className="input-field"
              />
              <input
                type="text"
                name="phone"
                value={editedStore.phone}
                onChange={(e) => handleInputChange(e, setEditedStore)}
                placeholder="Phone Number"
                className="input-field"
              />
              <button onClick={handleSaveClick} className="save-store">Save</button>
            </div>
          ) : (
            <div className="store-info">
              <h3>{store.name}</h3>
              <p>{store.address}</p>
              <p>{store.phone}</p>
            </div>
          )}
          <button onClick={() => handleEditClick(index)} className="edit-store">Edit</button>
        </div>
      ))}
    </div>
   
  );
};

export default StoreList;
