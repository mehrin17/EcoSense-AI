import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import ClimateRiskPage from './pages/ClimateRiskPage';
import CarbonFootprintPage from './pages/CarbonFootprintPage';
import AIAdvisorPage from './pages/AIAdvisorPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/climate-risk" element={<ClimateRiskPage />} />
          <Route path="/carbon" element={<CarbonFootprintPage />} />
          <Route path="/ai-advisor" element={<AIAdvisorPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
