import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SimulatorContainer = styled(motion.div)`
  background: linear-gradient(135deg, rgba(0, 150, 100, 0.1), rgba(0, 100, 50, 0.1));
  border: 1px solid rgba(0, 255, 150, 0.3);
  border-radius: 15px;
  padding: 25px;
  margin: 20px 0;
  backdrop-filter: blur(10px);
`;

const ModuleTitle = styled.h2`
  font-family: 'Orbitron', monospace;
  color: #00ff96;
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-shadow: 0 0 10px #00ff96;
`;

const WasteInputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
`;

const WasteTypeCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 150, 0.2);
  border-radius: 8px;
  padding: 15px;
  position: relative;
`;

const WasteTypeLabel = styled.label`
  display: block;
  color: #00ff96;
  font-size: 1rem;
  margin-bottom: 8px;
  font-weight: 600;
`;

const WasteInput = styled.input`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 255, 150, 0.3);
  border-radius: 5px;
  padding: 8px;
  color: #ffffff;
  font-size: 0.9rem;
  margin-bottom: 5px;
  
  &:focus {
    outline: none;
    border-color: #00ff96;
    box-shadow: 0 0 5px rgba(0, 255, 150, 0.5);
  }
`;

const WastePercentage = styled.div`
  color: #00ff96;
  font-size: 0.9rem;
  font-weight: bold;
`;

const CircularFlowViz = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 255, 150, 0.3);
  border-radius: 15px;
  padding: 20px;
  margin: 20px 0;
  text-align: center;
`;

const FlowStage = styled(motion.div)`
  display: inline-block;
  background: linear-gradient(45deg, #00ff96, #00cc77);
  color: #000;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
`;

const FlowArrow = styled.span`
  color: #00ff96;
  font-size: 1.5rem;
  margin: 0 10px;
`;

const OutputMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const MetricCard = styled.div`
  background: rgba(0, 255, 150, 0.1);
  border: 1px solid rgba(0, 255, 150, 0.3);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
`;

const MetricValue = styled.div`
  color: #00ff96;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const MetricLabel = styled.div`
  color: #ffffff;
  font-size: 0.9rem;
`;

const SimulateButton = styled(motion.button)`
  background: linear-gradient(45deg, #00ff96, #00cc77);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;
  
  &:hover {
    background: linear-gradient(45deg, #00cc77, #009955);
  }
`;

const SustainabilityScore = styled.div`
  background: linear-gradient(45deg, rgba(0, 255, 150, 0.2), rgba(0, 200, 100, 0.2));
  border: 2px solid #00ff96;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
`;

const ScoreValue = styled.div`
  color: #00ff96;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ScoreDescription = styled.div`
  color: #ffffff;
  font-size: 1rem;
`;

const WasteStreamSimulator = () => {
  const [wasteComposition, setWasteComposition] = useState({
    polymers: 35,
    packaging: 25,
    structuralResidues: 20,
    organics: 15,
    metals: 5
  });

  const [simulation, setSimulation] = useState({
    energyNeeds: 0,
    methaneOutput: 0,
    carbonProduction: 0,
    hydrogenOutput: 0,
    sustainabilityScore: 0,
    cycleEfficiency: 0
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [flowAnimation, setFlowAnimation] = useState(false);

  // Calculate waste decomposition under plasma conditions
  const runSimulation = useCallback(() => {
    setIsSimulating(true);
    setFlowAnimation(true);

    setTimeout(() => {
      const totalWaste = Object.values(wasteComposition).reduce((sum, val) => sum + val, 0);
      
      // Plasma decomposition efficiency by waste type
      const decompositionRates = {
        polymers: 0.85,
        packaging: 0.78,
        structuralResidues: 0.65,
        organics: 0.92,
        metals: 0.45
      };

      // Energy requirements (kWh per kg)
      const energyRequirements = {
        polymers: 2.3,
        packaging: 1.8,
        structuralResidues: 3.1,
        organics: 1.2,
        metals: 4.5
      };

      // Calculate outputs
      let totalEnergyNeeds = 0;
      let totalMethaneOutput = 0;
      let totalCarbonProduction = 0;
      let totalHydrogenOutput = 0;

      Object.entries(wasteComposition).forEach(([type, percentage]) => {
        const wasteAmount = (percentage / 100) * 100; // Assume 100kg total
        const decomposed = wasteAmount * decompositionRates[type];
        
        totalEnergyNeeds += wasteAmount * energyRequirements[type];
        totalMethaneOutput += decomposed * 0.4; // 40% methane yield
        totalCarbonProduction += decomposed * 0.3; // 30% solid carbon
        totalHydrogenOutput += decomposed * 0.15; // 15% hydrogen
      });

      const cycleEfficiency = (totalMethaneOutput * 50 + totalHydrogenOutput * 120) / totalEnergyNeeds;
      const sustainabilityScore = Math.min(100, cycleEfficiency * 1.2);

      setSimulation({
        energyNeeds: totalEnergyNeeds.toFixed(1),
        methaneOutput: totalMethaneOutput.toFixed(1),
        carbonProduction: totalCarbonProduction.toFixed(1),
        hydrogenOutput: totalHydrogenOutput.toFixed(1),
        sustainabilityScore: sustainabilityScore.toFixed(0),
        cycleEfficiency: cycleEfficiency.toFixed(1)
      });

      setIsSimulating(false);
      setTimeout(() => setFlowAnimation(false), 3000);
    }, 2000);
  }, [wasteComposition]);

  const handleWasteChange = (type, value) => {
    setWasteComposition(prev => ({
      ...prev,
      [type]: Math.max(0, Math.min(100, parseFloat(value) || 0))
    }));
  };

  useEffect(() => {
    runSimulation();
  }, [wasteComposition, runSimulation]);

  const totalPercentage = Object.values(wasteComposition).reduce((sum, val) => sum + val, 0);

  return (
    <SimulatorContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <ModuleTitle>♻️ Waste Stream Simulator</ModuleTitle>
      
      <WasteInputGrid>
        <WasteTypeCard>
          <WasteTypeLabel>Polymers (Plastics)</WasteTypeLabel>
          <WasteInput
            type="number"
            value={wasteComposition.polymers}
            onChange={(e) => handleWasteChange('polymers', e.target.value)}
            min="0"
            max="100"
          />
          <WastePercentage>{wasteComposition.polymers}% of total waste</WastePercentage>
        </WasteTypeCard>

        <WasteTypeCard>
          <WasteTypeLabel>Packaging Materials</WasteTypeLabel>
          <WasteInput
            type="number"
            value={wasteComposition.packaging}
            onChange={(e) => handleWasteChange('packaging', e.target.value)}
            min="0"
            max="100"
          />
          <WastePercentage>{wasteComposition.packaging}% of total waste</WastePercentage>
        </WasteTypeCard>

        <WasteTypeCard>
          <WasteTypeLabel>Structural Residues</WasteTypeLabel>
          <WasteInput
            type="number"
            value={wasteComposition.structuralResidues}
            onChange={(e) => handleWasteChange('structuralResidues', e.target.value)}
            min="0"
            max="100"
          />
          <WastePercentage>{wasteComposition.structuralResidues}% of total waste</WastePercentage>
        </WasteTypeCard>

        <WasteTypeCard>
          <WasteTypeLabel>Organic Waste</WasteTypeLabel>
          <WasteInput
            type="number"
            value={wasteComposition.organics}
            onChange={(e) => handleWasteChange('organics', e.target.value)}
            min="0"
            max="100"
          />
          <WastePercentage>{wasteComposition.organics}% of total waste</WastePercentage>
        </WasteTypeCard>

        <WasteTypeCard>
          <WasteTypeLabel>Metal Components</WasteTypeLabel>
          <WasteInput
            type="number"
            value={wasteComposition.metals}
            onChange={(e) => handleWasteChange('metals', e.target.value)}
            min="0"
            max="100"
          />
          <WastePercentage>{wasteComposition.metals}% of total waste</WastePercentage>
        </WasteTypeCard>
      </WasteInputGrid>

      <div style={{ color: totalPercentage > 100 ? '#ff4444' : '#00ff96', textAlign: 'center', marginBottom: '15px' }}>
        Total Composition: {totalPercentage.toFixed(1)}% {totalPercentage > 100 && '(Exceeds 100%)'}
      </div>

      <CircularFlowViz>
        <h3 style={{ color: '#00ff96', marginBottom: '15px' }}>Circular Economy Flow</h3>
        <FlowStage
          animate={flowAnimation ? { scale: [1, 1.1, 1], opacity: [1, 0.7, 1] } : {}}
          transition={{ duration: 0.8, repeat: flowAnimation ? Infinity : 0 }}
        >
          Mission Waste
        </FlowStage>
        <FlowArrow>→</FlowArrow>
        <FlowStage
          animate={flowAnimation ? { scale: [1, 1.1, 1], opacity: [1, 0.7, 1] } : {}}
          transition={{ duration: 0.8, delay: 0.2, repeat: flowAnimation ? Infinity : 0 }}
        >
          Plasma Processing
        </FlowStage>
        <FlowArrow>→</FlowArrow>
        <FlowStage
          animate={flowAnimation ? { scale: [1, 1.1, 1], opacity: [1, 0.7, 1] } : {}}
          transition={{ duration: 0.8, delay: 0.4, repeat: flowAnimation ? Infinity : 0 }}
        >
          Fuel Production
        </FlowStage>
        <FlowArrow>→</FlowArrow>
        <FlowStage
          animate={flowAnimation ? { scale: [1, 1.1, 1], opacity: [1, 0.7, 1] } : {}}
          transition={{ duration: 0.8, delay: 0.6, repeat: flowAnimation ? Infinity : 0 }}
        >
          Mission Sustainability
        </FlowStage>
      </CircularFlowViz>

      <OutputMetrics>
        <MetricCard>
          <MetricValue>{simulation.energyNeeds}</MetricValue>
          <MetricLabel>Energy Required (kWh)</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>{simulation.methaneOutput}</MetricValue>
          <MetricLabel>Methane Output (kg)</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>{simulation.carbonProduction}</MetricValue>
          <MetricLabel>Solid Carbon (kg)</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>{simulation.hydrogenOutput}</MetricValue>
          <MetricLabel>Hydrogen Output (kg)</MetricLabel>
        </MetricCard>
      </OutputMetrics>

      <SustainabilityScore>
        <ScoreValue>{simulation.sustainabilityScore}/100</ScoreValue>
        <ScoreDescription>
          Mission Sustainability Score | Cycle Efficiency: {simulation.cycleEfficiency}%
        </ScoreDescription>
      </SustainabilityScore>

      <SimulateButton
        onClick={runSimulation}
        disabled={isSimulating}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSimulating ? 'Simulating Plasma Decomposition...' : 'Run Waste Stream Simulation'}
      </SimulateButton>
    </SimulatorContainer>
  );
};

export default WasteStreamSimulator;