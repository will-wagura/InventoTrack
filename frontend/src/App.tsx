import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ItemEntry from "./components/ItemEntry";
import StockInformation from "./components/StockInformation";
import SupplyRequests from "./components/SupplyRequests";
import Home from "./components/Home";
import Inbox from "./components/inbox";
import Footer from "./components/footer";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import Careers from "./components/Careers";
import FAQs from "./components/FAQs";
import Teams from "./components/Teams";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { Item } from "./types/Item";

function App() {
  const [activeComponent, setActiveComponent] = useState("home");
  const [items, setItems] = useState<Item[]>(() => {
    const storedItems = localStorage.getItem("items");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  useEffect(() => {
    const updatedItems = items.map((item) => ({
      ...item,
      stockStatus: item.stockStatus || "In Stock",
    }));
    if (JSON.stringify(updatedItems) !== JSON.stringify(items)) {
      localStorage.setItem("items", JSON.stringify(updatedItems));
      setItems(updatedItems);
    }
  }, [items]);

  const handleAddItem = (newItem:Item) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const handleDeleteItem = (index:number) => {
    const updatedItems = items.filter((_, i: number) => i !== index);
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const handleEditItem = (index:number, editedItem: Item) => {
    const updatedItems = items.map((item, i: number) =>
      i === index ? editedItem : item
    );
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "home":
        return <Home />;
      case "itemEntry":
        return <ItemEntry onAddItem={handleAddItem} />;
      case "stockInfo":
        return (
          <StockInformation
            items={items}
            onDelete={handleDeleteItem}
            onEdit={handleEditItem}
          />
        );
      case "supplyRequests":
        return <SupplyRequests />;
      case "inbox":
        return <Inbox />;
      case "contactUs":
        return <ContactUs />;
      case "aboutUs":
        return <AboutUs />;
      case "careers":
        return <Careers />;
      case "faqs":
        return <FAQs />;
      case "teams":
        return <Teams />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Sidebar setActiveComponent={setActiveComponent} />
      <main className="main-content">{renderComponent()}</main>
      <Inbox />
      <Footer setActiveComponent={setActiveComponent} />
    </div>
  );
}

export default App;
