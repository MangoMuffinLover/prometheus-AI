import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DashboardContainer = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 100, 0, 0.1), rgba(200, 50, 0, 0.1));
  border: 1px solid rgba(255, 150, 0, 0.3);
  border-radius: 15px;
  padding: 25px;
  margin: 20px 0;
  backdrop-filter: blur(10px);
`;

const ModuleTitle = styled.h2`
  font-family: 'Orbitron', monospace;
  color: #ff9600;
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-shadow: 0 0 10px #ff9600;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
`;

const MetricCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 150, 0, 0.2);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  position: relative;
`;

const MetricValue = styled.div`
  color: #ff9600;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const MetricLabel = styled.div`
  color: #ffffff;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const MetricTrend = styled.div`
  color: ${props => props.positive ? '#00ff00' : '#ff4444'};
  font-size: 0.8rem;
  font-weight: bold;
`;

const ProjectionSection = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 150, 0, 0.3);
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
`;

const ProjectionTitle = styled.h3`
  color: #ff9600;
  font-size: 1.3rem;
  margin-bottom: 15px;
  text-align: center;
`;

const ProjectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 15px;
`;

const YearCard = styled.div`
  background: rgba(255, 150, 0, 0.1);
  border: 1px solid rgba(255, 150, 0, 0.3);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
`;

const YearLabel = styled.div`
  color: #ff9600;
  font-weight: bold;
  margin-bottom: 10px;
`;

const YearMetric = styled.div`
  color: #ffffff;
  font-size: 0.9rem;
  margin: 5px 0;
`;

const MaintenanceSection = styled.div`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 100, 100, 0.3);
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
`;

const MaintenanceTitle = styled.h3`
  color: #ff6666;
  font-size: 1.2rem;
  margin-bottom: 15px;
`;

const MaintenanceItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-left: 3px solid ${props => props.priority === 'high' ? '#ff4444' : props.priority === 'medium' ? '#ffaa00' : '#00ff00'};
  padding: 10px 15px;
  margin: 10px 0;
  border-radius: 5px;
`;

const MaintenanceText = styled.div`
  color: #ffffff;
  font-size: 0.9rem;
`;

const MaintenanceTime = styled.div`
  color: #ff9600;
  font-size: 0.8rem;
  font-weight: bold;
`;

const EfficiencyBar = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  height: 20px;
  margin: 10px 0;
  overflow: hidden;
`;

const EfficiencyFill = styled(motion.div)`
  background: linear-gradient(90deg, #ff4444, #ffaa00, #00ff00);
  height: 100%;
  border-radius: 10px;
`;

const AlertSection = styled.div`
  background: rgba(255, 255, 0, 0.1);
  border: 1px solid rgba(255, 255, 0, 0.3);
  border-radius: 8px;
  padding: 15px;
  margin: 15px 0;
`;

const AlertText = styled.div`
  color: #ffff00;
  font-size: 0.9rem;
  font-weight: bold;
`;

const SystemDashboard = () => {
  const [metrics, setMetrics] = useState({
    wasteProcessed: 0,
    methaneStored: 0,
    powerUsed: 0,
    co2Offset: 0,
    systemEfficiency: 0,
    uptime: 0
  });

  const [projections, setProjections] = useState({
    year1: { waste: 0, methane: 0, power: 0, efficiency: 0 },
    year2: { waste: 0, methane: 0, power: 0, efficiency: 0 },
    year3: { waste: 0, methane: 0, power: 0, efficiency: 0 }
  });

  const [maintenance, setMaintenance] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Simulate real-time data updates
  const updateMetrics = useCallback(() => {
    const now = Date.now();
    const baseWaste = 150 + Math.sin(now / 10000) * 20;
    const baseMethane = 85 + Math.sin(now / 8000) * 15;
    const basePower = 180 + Math.sin(now / 12000) * 25;
    const efficiency = 75 + Math.sin(now / 15000) * 15;
    
    setMetrics({
      wasteProcessed: baseWaste.toFixed(1),
      methaneStored: baseMethane.toFixed(1),
      powerUsed: basePower.toFixed(1),
      co2Offset: (baseWaste * 2.3).toFixed(1),
      systemEfficiency: efficiency.toFixed(1),
      uptime: 98.7
    });

    // Update 3-year projections
    const crewSize = 6; // Mars mission crew
    const scalingFactor = crewSize / 4; // Base calculations for 4 crew
    
    setProjections({
      year1: {
        waste: (baseWaste * 365 * scalingFactor / 1000).toFixed(1),
        methane: (baseMethane * 365 * scalingFactor / 1000).toFixed(1),
        power: (basePower * 365 * scalingFactor / 1000).toFixed(1),
        efficiency: (efficiency * 0.95).toFixed(1)
      },
      year2: {
        waste: (baseWaste * 365 * scalingFactor * 1.1 / 1000).toFixed(1),
        methane: (baseMethane * 365 * scalingFactor * 1.15 / 1000).toFixed(1),
        power: (basePower * 365 * scalingFactor * 0.9 / 1000).toFixed(1),
        efficiency: (efficiency * 0.98).toFixed(1)
      },
      year3: {
        waste: (baseWaste * 365 * scalingFactor * 1.2 / 1000).toFixed(1),
        methane: (baseMethane * 365 * scalingFactor * 1.25 / 1000).toFixed(1),
        power: (basePower * 365 * scalingFactor * 0.85 / 1000).toFixed(1),
        efficiency: (efficiency * 1.02).toFixed(1)
      }
    });

    // Generate maintenance schedule
    const maintenanceItems = [
      {
        task: 'Plasma chamber cleaning',
        timeRemaining: '18 days',
        priority: 'medium',
        duration: '2 hours'
      },
      {
        task: 'Catalyst replacement',
        timeRemaining: '45 days',
        priority: 'high',
        duration: '4 hours'
      },
      {
        task: 'Flow sensor calibration',
        timeRemaining: '8 days',
        priority: 'low',
        duration: '1 hour'
      },
      {
        task: 'Pressure vessel inspection',
        timeRemaining: '72 days',
        priority: 'high',
        duration: '3 hours'
      }
    ];

    setMaintenance(maintenanceItems);

    // Generate alerts based on system status
    const currentAlerts = [];
    if (efficiency < 70) {
      currentAlerts.push('System efficiency below optimal threshold. Check catalyst status.');
    }
    if (basePower > 200) {
      currentAlerts.push('Power consumption elevated. Consider load balancing.');
    }
    if (Math.random() > 0.8) {
      currentAlerts.push('Predictive maintenance: Flow rate sensor drift detected.');
    }

    setAlerts(currentAlerts);
  }, []);

  useEffect(() => {
    updateMetrics();
    const interval = setInterval(updateMetrics, 3000);
    return () => clearInterval(interval);
  }, [updateMetrics]);

  return (
    <DashboardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <ModuleTitle>📊 System Dashboard</ModuleTitle>
      
      <MetricsGrid>
        <MetricCard
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <MetricValue>{metrics.wasteProcessed}</MetricValue>
          <MetricLabel>Waste Processed Today (kg)</MetricLabel>
          <MetricTrend positive={true}>↗ +12% vs yesterday</MetricTrend>
        </MetricCard>

        <MetricCard
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <MetricValue>{metrics.methaneStored}</MetricValue>
          <MetricLabel>Methane Stored (kg)</MetricLabel>
          <MetricTrend positive={true}>↗ +8% vs yesterday</MetricTrend>
        </MetricCard>

        <MetricCard
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <MetricValue>{metrics.powerUsed}</MetricValue>
          <MetricLabel>Power Used Today (kWh)</MetricLabel>
          <MetricTrend positive={false}>↗ +3% vs yesterday</MetricTrend>
        </MetricCard>

        <MetricCard
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <MetricValue>{metrics.co2Offset}</MetricValue>
          <MetricLabel>CO₂ Equivalent Offset (kg)</MetricLabel>
          <MetricTrend positive={true}>↗ +15% vs yesterday</MetricTrend>
        </MetricCard>

        <MetricCard
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <MetricValue>{metrics.systemEfficiency}%</MetricValue>
          <MetricLabel>System Efficiency</MetricLabel>
          <EfficiencyBar>
            <EfficiencyFill
              initial={{ width: 0 }}
              animate={{ width: `${metrics.systemEfficiency}%` }}
              transition={{ duration: 1 }}
            />
          </EfficiencyBar>
        </MetricCard>

        <MetricCard
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <MetricValue>{metrics.uptime}%</MetricValue>
          <MetricLabel>System Uptime</MetricLabel>
          <MetricTrend positive={true}>↗ Excellent</MetricTrend>
        </MetricCard>
      </MetricsGrid>

      {alerts.length > 0 && (
        <AlertSection>
          <AlertText>⚠️ System Alerts:</AlertText>
          {alerts.map((alert, index) => (
            <div key={index} style={{ color: '#ffffff', fontSize: '0.9rem', marginTop: '5px' }}>
              • {alert}
            </div>
          ))}
        </AlertSection>
      )}

      <ProjectionSection>
        <ProjectionTitle>3-Year Mission Sustainability Projections</ProjectionTitle>
        <ProjectionGrid>
          <YearCard>
            <YearLabel>Year 1 (Sol 0-687)</YearLabel>
            <YearMetric>Waste: {projections.year1.waste} tonnes</YearMetric>
            <YearMetric>Methane: {projections.year1.methane} tonnes</YearMetric>
            <YearMetric>Power: {projections.year1.power} MWh</YearMetric>
            <YearMetric>Efficiency: {projections.year1.efficiency}%</YearMetric>
          </YearCard>
          
          <YearCard>
            <YearLabel>Year 2 (Sol 688-1374)</YearLabel>
            <YearMetric>Waste: {projections.year2.waste} tonnes</YearMetric>
            <YearMetric>Methane: {projections.year2.methane} tonnes</YearMetric>
            <YearMetric>Power: {projections.year2.power} MWh</YearMetric>
            <YearMetric>Efficiency: {projections.year2.efficiency}%</YearMetric>
          </YearCard>
          
          <YearCard>
            <YearLabel>Year 3 (Sol 1375-2061)</YearLabel>
            <YearMetric>Waste: {projections.year3.waste} tonnes</YearMetric>
            <YearMetric>Methane: {projections.year3.methane} tonnes</YearMetric>
            <YearMetric>Power: {projections.year3.power} MWh</YearMetric>
            <YearMetric>Efficiency: {projections.year3.efficiency}%</YearMetric>
          </YearCard>
        </ProjectionGrid>
        
        <div style={{ textAlign: 'center', color: '#ff9600', fontSize: '0.9rem', fontStyle: 'italic' }}>
          Projections based on 6-person crew, optimized system performance, and Martian operational conditions
        </div>
      </ProjectionSection>

      <MaintenanceSection>
        <MaintenanceTitle>🔧 Predictive Maintenance Schedule (~2 hours/month crew intervention)</MaintenanceTitle>
        {maintenance.map((item, index) => (
          <MaintenanceItem key={index} priority={item.priority}>
            <MaintenanceText>{item.task} - Duration: {item.duration}</MaintenanceText>
            <MaintenanceTime>Due in: {item.timeRemaining} | Priority: {item.priority.toUpperCase()}</MaintenanceTime>
          </MaintenanceItem>
        ))}
      </MaintenanceSection>
    </DashboardContainer>
  );
};

export default SystemDashboard;