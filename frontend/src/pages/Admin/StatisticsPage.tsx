// StatisticPage.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StatisticsHeader from '../components/StatisticsHeader';
import OverviewCard from '../components/OverviewCards';
import ProfitRevenueChart from '../components/ProfitRevenueChart';
import BestSellingCategory from '../components/BestSellingCategory';
import BestSellingProductTable from '../components/BestSellingProductTable';
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
