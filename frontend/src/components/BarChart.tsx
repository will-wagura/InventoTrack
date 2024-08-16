import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: {
    labels: string[];
    values: number[];
  };
}

const BarChart = ({ data }: Props) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Performance",
        data: data.values,
        backgroundColor: "#00bfa5",
        borderColor: "#008f7a",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;
