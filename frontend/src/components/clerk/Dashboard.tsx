import "./Dashboard.css";
import ItemEntry from "./ItemEntry";
import StockInformation from "./StockInformation";
import SupplyRequests from "./SupplyRequests";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

const sampleData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  values: [30, 40, 35, 50, 45, 60],
};

function Dashboard() {
  return (
    <div className="dashboard">
      <ItemEntry onAddItem={() => {}} />
      <StockInformation onEdit={() => {}} onDelete={() => {}} items={[]} />
      <SupplyRequests />
      <div className="charts">
        <h2>Performance Metrics</h2>
        <div className="chart-container">
          <LineChart data={sampleData} />
        </div>
        <div className="chart-container">
          <BarChart data={sampleData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
