import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faMoneyBillWave,
  faChartLine,
  faDollarSign,
  faBoxes,
  faTruck,
  faShoppingBag,
  faBan,
  faUndo,
  faUser,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import "../../styles/Merchant/HomePage.css";

const salesPurchaseData = [
  { name: "Oct", Purchase: 50000, Sales: 40000 },
  { name: "Nov", Purchase: 55000, Sales: 45000 },
  { name: "Dec", Purchase: 48000, Sales: 52000 },
  { name: "Jan", Purchase: 51000, Sales: 48000 },
  { name: "Feb", Purchase: 54000, Sales: 50000 },
  { name: "Mar", Purchase: 49000, Sales: 46000 },
  { name: "Apr", Purchase: 53000, Sales: 49000 },
];

const orderSummaryData = [
  { name: "Jan", Ordered: 4000, Cancelled: 2400, Delivered: 2400 },
  { name: "Feb", Ordered: 3000, Cancelled: 1398, Delivered: 2210 },
  { name: "Mar", Ordered: 2000, Cancelled: 9800, Delivered: 2290 },
  { name: "Apr", Ordered: 2780, Cancelled: 3908, Delivered: 2000 },
  { name: "May", Ordered: 1890, Cancelled: 4800, Delivered: 2181 },
];
const Home: React.FC = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Dashboard</h1>
      </header>
      <div className="dashboard">
        <div className="row">
          <div className="card sales-overview">
            <h2>Sales Overview</h2>
            <div className="stats">
              <div className="stat">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="icon"
                  color="#17a2b8"
                />
                <span className="value">Ksh 7,832</span>
                <span className="label">Sales</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faMoneyBillWave}
                  className="icon"
                  color="#817AF3"
                />
                <span className="value">Ksh 19,300</span>
                <span className="label">Revenue</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="icon"
                  color="#58D365"
                />
                <span className="value">Ksh 858</span>
                <span className="label">Profit</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className="icon"
                  color="#DBA362"
                />
                <span className="value">Ksh 17,432</span>
                <span className="label">Cost</span>
              </div>
            </div>
          </div>
          <div className="card inventory-summary">
            <h2>Inventory Summary</h2>
            <div className="stats">
              <div className="stat">
                <FontAwesomeIcon
                  icon={faBoxes}
                  className="icon"
                  color="#817AF3"
                />
                <span className="value">668</span>
                <span className="label">Quantity in Hand</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="icon"
                  color="#DBA362"
                />
                <span className="value">200</span>
                <span className="label">To be received</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card purchase-overview">
            <h2>Purchase Overview</h2>
            <div className="stats">
              <div className="stat">
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="icon"
                  color="#009ED8"
                />
                <span className="value">82</span>
                <span className="label">Purchase</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className="icon"
                  color="#58D365"
                />
                <span className="value">Ksh 13,573</span>
                <span className="label">Cost</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faBan}
                  className="icon"
                  color="#DBA362"
                />
                <span className="value">5</span>
                <span className="label">Cancel</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faUndo}
                  className="icon"
                  color="#17a2b8"
                />
                <span className="value">Ksh 17,432</span>
                <span className="label">Return</span>
              </div>
            </div>
          </div>
          <div className="card product-summary">
            <h2>Product Summary</h2>
            <div className="stats">
              <div className="stat">
                <FontAwesomeIcon
                  icon={faUser}
                  className="icon"
                  color="#58D365"
                />
                <span className="value">31</span>
                <span className="label">Number of Suppliers</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon
                  icon={faList}
                  className="icon"
                  color="#817AF3"
                />
                <span className="value">21</span>
                <span className="label">Number of Categories</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card sales-purchase">
            <h2>Sales & Purchase</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesPurchaseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Purchase" fill="#8884d8" />
                <Bar dataKey="Sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card order-summary">
            <h2>Order Summary</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderSummaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Ordered" stroke="#8884d8" />
                <Line type="monotone" dataKey="Cancelled" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Delivered" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="row">
          <div className="card top-selling-stock">
            <h2>Top Selling Stock</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sold Quantity</th>
                  <th>Remaining Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Surgar</td>
                  <td>30</td>
                  <td>12</td>
                  <td>Ksh10000</td>
                </tr>
                <tr>
                  <td>Bread</td>
                  <td>21</td>
                  <td>15</td>
                  <td>Ksh 20000</td>
                </tr>
                <tr>
                  <td>Arimis</td>
                  <td>19</td>
                  <td>17</td>
                  <td>Ksh 15000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card low-quantity-stock">
            <h2>Low Quantity Stock</h2>
            <div className="stock-items">
              <div className="stock-item">
                <img
                  src="/src/assets/Maize - Flour _ Jumia KE.jpeg"
                  alt="Tata Salt"
                />
                <div>
                  <h3>Maize Flour</h3>
                  <p>Remaining Quantity: 10 Packet</p>
                </div>
                <span className="low-tag">Low</span>
              </div>
              <div className="stock-item">
                <img src="/src/assets/Cooking Salt 1_5kg - 1.5kg" alt="Lays" />
                <div>
                  <h3>Lays</h3>
                  <p>Remaining Quantity: 15 Packet</p>
                </div>
                <span className="low-tag">Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
