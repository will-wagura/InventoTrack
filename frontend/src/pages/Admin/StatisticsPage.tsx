// StatisticPage.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StatisticsHeader from '../../components/Admin/StatisticsHeader';
import OverviewCard from '../../components/Admin/OverviewCards';
import ProfitRevenueChart from '../../components/Admin/ProfitRevenueChart';
import BestSellingCategory from '../../components/Admin/BestSellingCategory';
import BestSellingProductTable from '../../components/Admin/BestSellingProductTable';
import './StatisticPage.css'; 

const StatisticPage: React.FC = () => {
  return (
    <Container fluid className="statistic-page">
      <StatisticsHeader />

      <Row className="overview">
        <Col md={4}>
          <OverviewCard title="Total Profit" value="Ksh 21,190" />
        </Col>

      </Row>
      <Col md={4}>
          <BestSellingCategory />
        </Col>
      

      

      <Row className="charts">
        <Col md={8}>
          <ProfitRevenueChart />
        </Col>
        
      </Row>

      <Row className="product-table">
        <Col md={12}>
          <BestSellingProductTable />
        </Col>
      </Row>
    </Container>
  );
};

export default StatisticPage;
