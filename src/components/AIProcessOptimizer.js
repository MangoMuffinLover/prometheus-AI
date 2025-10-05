import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const OptimizerContainer = styled(motion.div)`
  background: linear-gradient(135deg, rgba(0, 100, 200, 0.1), rgba(0, 50, 150, 0.1));
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 15px;
  padding: 25px;
  margin: 20px 0;
  backdrop-filter: blur(10px);
`;

const ModuleTitle = styled.h2`
  font-family: 'Orbitron', monospace;
  color: #00ffff;
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-shadow: 0 0 10px #00ffff;
`;

const ParameterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const ParameterCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  padding: 15px;
`;

const ParameterLabel = styled.label`
  display: block;
  color: #00ffff;
  font-size: 0.9rem;
  margin-bottom: 5px;
  font-weight: 600;
`;

const ParameterInput = styled.input`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  padding: 8px;
  color: #ffffff;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
  }
`;

const ParameterValue = styled.div`
  color: #00ff00;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 5px;
`;

const OptimizationStatus = styled.div`
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
`;

const StatusText = styled.div`
  color: #00ff00;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const PredictionText = styled.div`
  color: #ffff00;
  font-size: 0.9rem;
  font-style: italic;
`;

const OptimizeButton = styled(motion.button)`
  background: linear-gradient(45deg, #00ffff, #0080ff);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;
  
  &:hover {
    background: linear-gradient(45deg, #00cccc, #0066cc);
  }
`;

const AIProcessOptimizer = () => {
  const [parameters, setParameters] = useState({
    temperature: 1200,
    flowRate: 85,
    catalystEfficiency: 92,
    energyInput: 150,
    pressure: 2.5
  });

  const [optimization, setOptimization] = useState({
    methaneYield: 0,
    powerConsumption: 0,
    efficiency: 0,
    prediction: '',
    status: 'Standby'
  });

  const [isOptimizing, setIsOptimizing] = useState(false);

  // Simulate AI optimization algorithm
  const runOptimization = useCallback(() => {
    setIsOptimizing(true);
    setOptimization(prev => ({ ...prev, status: 'Analyzing plasma parameters...' }));

    setTimeout(() => {
      // Simulate reinforcement learning calculations
      const tempOptimal = 1150 + Math.random() * 100;
      const flowOptimal = 80 + Math.random() * 20;
      const catalystOptimal = 88 + Math.random() * 12;
      
      // Calculate optimized metrics
      const methaneYield = (parameters.temperature / 1200) * 
                          (parameters.flowRate / 100) * 
                          (parameters.catalystEfficiency / 100) * 85;
      
      const powerConsumption = parameters.energyInput * 
                              (1 - (parameters.catalystEfficiency / 100) * 0.3);
      
      const efficiency = (methaneYield / powerConsumption) * 100;

      // Generate AI predictions
      let prediction = '';
      if (parameters.temperature > 1300) {
        prediction = 'WARNING: High temperature detected. Catalyst fouling likely in 12-15 hours.';
      } else if (parameters.catalystEfficiency < 85) {
        prediction = 'ALERT: Catalyst efficiency below optimal. Recommend maintenance cycle.';
      } else if (efficiency > 75) {
        prediction = 'OPTIMAL: System operating at peak efficiency. Methane production maximized.';
      } else {
        prediction = 'SUBOPTIMAL: Adjusting parameters for improved yield. Efficiency can be increased by 15%.';
      }

      setOptimization({
        methaneYield: methaneYield.toFixed(2),
        powerConsumption: powerConsumption.toFixed(1),
        efficiency: efficiency.toFixed(1),
        prediction,
        status: 'Optimization Complete'
      });

      setIsOptimizing(false);
    }, 2000);
  }, [parameters]);

  const handleParameterChange = (param, value) => {
    setParameters(prev => ({
      ...prev,
      [param]: parseFloat(value) || 0
    }));
  };

  useEffect(() => {
    // Auto-optimize when parameters change
    const timer = setTimeout(() => {
      if (!isOptimizing) {
        runOptimization();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [parameters, isOptimizing, runOptimization]);

  return (
    <OptimizerContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ModuleTitle>🤖 AI Process Optimizer</ModuleTitle>
      
      <ParameterGrid>
        <ParameterCard>
          <ParameterLabel>Plasma Temperature (°C)</ParameterLabel>
          <ParameterInput
            type="number"
            value={parameters.temperature}
            onChange={(e) => handleParameterChange('temperature', e.target.value)}
            min="800"
            max="1500"
          />
          <ParameterValue>{parameters.temperature}°C</ParameterValue>
        </ParameterCard>

        <ParameterCard>
          <ParameterLabel>Flow Rate (%)</ParameterLabel>
          <ParameterInput
            type="number"
            value={parameters.flowRate}
            onChange={(e) => handleParameterChange('flowRate', e.target.value)}
            min="0"
            max="100"
          />
          <ParameterValue>{parameters.flowRate}%</ParameterValue>
        </ParameterCard>

        <ParameterCard>
          <ParameterLabel>Catalyst Efficiency (%)</ParameterLabel>
          <ParameterInput
            type="number"
            value={parameters.catalystEfficiency}
            onChange={(e) => handleParameterChange('catalystEfficiency', e.target.value)}
            min="0"
            max="100"
          />
          <ParameterValue>{parameters.catalystEfficiency}%</ParameterValue>
        </ParameterCard>

        <ParameterCard>
          <ParameterLabel>Energy Input (kW)</ParameterLabel>
          <ParameterInput
            type="number"
            value={parameters.energyInput}
            onChange={(e) => handleParameterChange('energyInput', e.target.value)}
            min="50"
            max="300"
          />
          <ParameterValue>{parameters.energyInput} kW</ParameterValue>
        </ParameterCard>

        <ParameterCard>
          <ParameterLabel>Pressure (atm)</ParameterLabel>
          <ParameterInput
            type="number"
            step="0.1"
            value={parameters.pressure}
            onChange={(e) => handleParameterChange('pressure', e.target.value)}
            min="1.0"
            max="5.0"
          />
          <ParameterValue>{parameters.pressure} atm</ParameterValue>
        </ParameterCard>
      </ParameterGrid>

      <OptimizationStatus>
        <StatusText>
          Status: {optimization.status} | 
          Methane Yield: {optimization.methaneYield} L/h | 
          Power: {optimization.powerConsumption} kW | 
          Efficiency: {optimization.efficiency}%
        </StatusText>
        <PredictionText>{optimization.prediction}</PredictionText>
      </OptimizationStatus>

      <OptimizeButton
        onClick={runOptimization}
        disabled={isOptimizing}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOptimizing ? 'Optimizing...' : 'Run AI Optimization'}
      </OptimizeButton>
    </OptimizerContainer>
  );
};

export default AIProcessOptimizer;