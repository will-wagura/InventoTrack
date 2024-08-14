import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
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

const LineChart = ({ data }: Props) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Performance",
        data: data.values,
        borderColor: "#00bfa5",
        backgroundColor: "rgba(0, 191, 165, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineChart;
