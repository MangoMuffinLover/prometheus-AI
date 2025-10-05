import React, { useState, useEffect, useRef, useCallback, Suspense, memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AIProcessOptimizer from './components/AIProcessOptimizer';
import WasteStreamSimulator from './components/WasteStreamSimulator';
import SystemDashboard from './components/SystemDashboard';
import './App.css';
import { 
  initializeOptimizations, 
  performanceMonitor, 
  usePerformanceMonitor,
  useMemoizedCalculations,
  memoryManager,
  getOptimizationStatus
} from './utils/appOptimization';

// Styled Components for PROMETHEUS Control Platform
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #2d1810 30%, #1a0f0a 70%, #000000 100%);
  color: #ff9600;
  font-family: 'Exo 2', sans-serif;
  position: relative;
  overflow-x: hidden;
`;

const Header = styled(motion.header)`
  padding: 25px;
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(15px);
  border-bottom: 2px solid rgba(255, 150, 0, 0.4);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(255, 150, 0, 0.2);
`;

const Title = styled(motion.h1)`
  font-family: 'Orbitron', monospace;
  font-size: 3rem;
  font-weight: 900;
  text-shadow: 
    0 0 15px #ff9600,
    0 0 30px #ff9600,
    0 0 45px #ff6600;
  margin-bottom: 10px;
  letter-spacing: 3px;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  opacity: 0.9;
  font-weight: 400;
  color: #ffcc66;
  margin-bottom: 5px;
`;

const SystemDescription = styled(motion.p)`
  font-size: 1rem;
  opacity: 0.7;
  font-weight: 300;
  color: #ffffff;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.4;
`;

const ModulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
  max-width: 1600px;
  margin: 0 auto;
`;

const ScanLine = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #ff9600, transparent);
  z-index: 1000;
  box-shadow: 0 0 10px #ff9600;
`;

// Memoized App component for optimal performance
const App = memo(() => {
  // Performance monitoring
  const { renderCount, getMetrics } = usePerformanceMonitor('App');
  const memoizedCalculations = useMemoizedCalculations();
  
  const [systemStatus, setSystemStatus] = useState('standby');
  const [isProcessing, setIsProcessing] = useState(false);
  const [wasteData, setWasteData] = useState({
    type: '',
    mass: 0,
    moisture: 50,
    contamination: 10
  });
  const [results, setResults] = useState(null);
  const [processingResults, setProcessingResults] = useState(null);
  const [showDemoMode, setShowDemoMode] = useState(false);
  
  // Performance and optimization state
  const [optimizationStatus, setOptimizationStatus] = useState(null);

  // Initialize Circula AI system and optimizations
  useEffect(() => {
    console.log('🚀 Circula AI Mission Assistant Initializing...');
    
    // Initialize performance optimizations
    initializeOptimizations();
    
    // Set optimization status
    setOptimizationStatus(getOptimizationStatus());
    
    setSystemStatus('online');
    
    // Simulate system startup
    setTimeout(() => {
      console.log('✅ Circula AI System Online');
    }, 2000);
    
    // Cleanup on unmount
    return () => {
      memoryManager.cleanup();
    };
  }, []);

  // Performance monitoring effect
  useEffect(() => {
    const interval = setInterval(() => {
      const metrics = getMetrics();
      if (metrics.recommendations.length > 0) {
        console.log('🔧 Performance Recommendations:', metrics.recommendations);
      }
    }, 30000); // Check every 30 seconds

    memoryManager.addInterval(interval);
    return () => clearInterval(interval);
  }, [getMetrics]);

  // Optimized waste processing handler
  const handleWasteProcessing = useCallback(async (data) => {
    const startTime = performance.now();
    
    setIsProcessing(true);
    setWasteData(data);
    
    try {
      // Use memoized calculations for better performance
      const energyOutput = memoizedCalculations.calculateEnergyOutput(data.type, data.mass);
      const processingTime = memoizedCalculations.calculateProcessingTime(data.mass, data.type);
      const efficiency = memoizedCalculations.calculateEfficiency(data.type, 75); // Assume 75% system load
      
      // Simulate processing time with realistic delay
      setTimeout(() => {
        const results = {
          ...calculateResults(data),
          energyOutput: parseFloat(energyOutput),
          processingTime,
          efficiency,
          optimized: true
        };
        
        setResults(results);
        setProcessingResults(results);
        setIsProcessing(false);
        
        // Track processing performance
        const endTime = performance.now();
        performanceMonitor.metrics.voiceProcessingTimes.push(endTime - startTime);
        
        console.log(`✅ Waste processing completed in ${(endTime - startTime).toFixed(2)}ms`);
      }, Math.max(1000, processingTime * 10)); // Realistic processing simulation
      
    } catch (error) {
      console.error('❌ Waste processing error:', error);
      setIsProcessing(false);
    }
  }, [memoizedCalculations]);

  // Calculate processing results based on waste data
  const calculateResults = (data) => {
    const baseEnergy = {
      organic: 1.2,
      plastic: 2.3,
      metal: 0.9,
      fabric: 1.4
    };
    
    const energyRequired = data.mass * 0.8;
    const energyProduced = data.mass * (baseEnergy[data.type] || 1.0) * (1 - data.moisture / 100);
    const efficiency = Math.min(95, Math.max(60, (energyProduced / energyRequired) * 100));
    
    return {
      energyRequired: energyRequired.toFixed(1),
      energyProduced: energyProduced.toFixed(1),
      efficiency: efficiency.toFixed(0),
      processingTime: Math.ceil(data.mass * 2.5),
      byproducts: {
        methane: (data.mass * 0.3).toFixed(1),
        hydrogen: (data.mass * 0.15).toFixed(1),
        carbonSolids: (data.mass * 0.25).toFixed(1),
        recoveredMaterials: (data.mass * 0.1).toFixed(1)
      }
    };
  };

  // Optimized demo mode handlers
  const handleDemoWasteInput = useCallback((demoWasteData) => {
    setWasteData(demoWasteData);
    console.log('🎯 Demo waste input:', demoWasteData);
  }, []);

  const handleDemoVoiceCommand = useCallback((command) => {
    console.log('🎤 Demo voice command:', command);
    // Process demo voice command with performance tracking
    const startTime = performance.now();
    
    // Simulate voice processing
    setTimeout(() => {
      const endTime = performance.now();
      performanceMonitor.metrics.voiceProcessingTimes.push(endTime - startTime);
      console.log(`🎯 Demo voice command processed in ${(endTime - startTime).toFixed(2)}ms`);
    }, 100);
  }, []);

  const handleDemoStartProcessing = useCallback(() => {
    console.log('🚀 Demo processing initiated');
    handleWasteProcessing(wasteData);
  }, [wasteData, handleWasteProcessing]);

  return (
    <AppContainer>
      {/* Animated scan line for futuristic effect */}
      <ScanLine
        animate={{ y: ['0vh', '100vh'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      
      <Header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Title
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          PROMETHEUS
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Mars Mission Waste-to-Fuel Processing System
        </Subtitle>
        <SystemDescription
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Advanced circular economy platform for sustainable resource management on Mars
        </SystemDescription>
      </Header>

      <ModulesContainer>
        {/* AI Process Optimizer Module */}
        <AIProcessOptimizer />

        {/* Waste Stream Simulator Module */}
        <WasteStreamSimulator />

        {/* System Dashboard Module */}
        <SystemDashboard />
      </ModulesContainer>
      
      {/* Performance Status Indicator */}
      {optimizationStatus && (
        <div style={{
          position: 'fixed',
          bottom: '15px',
          right: '15px',
          background: 'rgba(255, 150, 0, 0.1)',
          border: '1px solid #ff9600',
          borderRadius: '8px',
          padding: '10px 15px',
          fontSize: '12px',
          color: '#ff9600',
          zIndex: 1000,
          backdropFilter: 'blur(10px)'
        }}>
          🚀 PROMETHEUS OPTIMIZED | Renders: {renderCount}
        </div>
      )}
    </AppContainer>
  );
});

export default App;