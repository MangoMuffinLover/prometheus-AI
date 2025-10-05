// Performance optimization utilities for PROMETHEUS System
import { lazy, memo, useMemo, useCallback, useRef, useEffect, useState } from 'react';

// Lazy loading components for better initial load performance
export const LazyAIProcessOptimizer = lazy(() => import('../components/AIProcessOptimizer'));
export const LazyWasteStreamSimulator = lazy(() => import('../components/WasteStreamSimulator'));
export const LazySystemDashboard = lazy(() => import('../components/SystemDashboard'));

// Debounce hook for performance optimization
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle hook for limiting function calls
export const useThrottle = (callback, delay) => {
  const lastRun = useRef(Date.now());

  return useCallback((...args) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]);
};

// Memoized calculation functions
export const useMemoizedCalculations = (wasteData) => {
  return useMemo(() => {
    if (!wasteData) return null;

    const energyRates = {
      organic: 4.2,
      plastic: 8.7,
      metal: 2.1,
      paper: 3.8,
      food: 4.5,
      mixed: 4.0
    };

    const efficiencyRates = {
      organic: 92,
      plastic: 87,
      metal: 95,
      paper: 89,
      food: 91,
      mixed: 85
    };

    const energyRequired = wasteData.mass * 2.1;
    const energyProduced = (energyRates[wasteData.type] || 4.0) * wasteData.mass;
    const efficiency = efficiencyRates[wasteData.type] || 85;
    const processingTime = Math.round(wasteData.mass * 15);
    
    const byproducts = {
      organic: ['Biogas', 'Compost', 'Water'],
      plastic: ['Fuel pellets', 'Raw materials', 'Heat'],
      metal: ['Refined metals', 'Alloys', 'Slag'],
      paper: ['Pulp', 'Biomass', 'Fiber'],
      food: ['Biogas', 'Fertilizer', 'Water'],
      mixed: ['Various materials', 'Energy', 'Residue']
    };

    return {
      energyRequired,
      energyProduced,
      efficiency,
      processingTime,
      byproducts: byproducts[wasteData.type] || ['Mixed materials'],
      netEnergy: energyProduced - energyRequired
    };
  }, [wasteData]);
};

// Performance monitoring hook
export const usePerformanceMonitor = (componentName) => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} - Render #${renderCount.current} - Time: ${renderTime.toFixed(2)}ms`);
    }
    
    startTime.current = performance.now();
  });

  return { renderCount: renderCount.current };
};

// Optimized event handlers
export const createOptimizedHandlers = () => {
  const handlers = new Map();

  return {
    getHandler: (key, callback, dependencies = []) => {
      const depsKey = dependencies.join(',');
      const fullKey = `${key}-${depsKey}`;
      
      if (!handlers.has(fullKey)) {
        handlers.set(fullKey, useCallback(callback, dependencies));
      }
      
      return handlers.get(fullKey);
    }
  };
};

// Memory cleanup utilities
export const useCleanup = (cleanupFn) => {
  useEffect(() => {
    return cleanupFn;
  }, [cleanupFn]);
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

// Bundle size optimization - dynamic imports
export const loadComponent = async (componentName) => {
  try {
    switch (componentName) {
      case 'Dashboard':
        return await import('../components/Dashboard');
      case 'VoiceInterface':
        return await import('../components/VoiceInterface');
      case 'CameraVision':
        return await import('../components/CameraVision');
      case 'WasteProcessor':
        return await import('../components/WasteProcessor');
      case 'ReactorVisualization':
        return await import('../components/ReactorVisualization');
      case 'CirculaAI':
        return await import('../components/CirculaAI');
      case 'DemoMode':
        return await import('../components/DemoMode');
      default:
        throw new Error(`Component ${componentName} not found`);
    }
  } catch (error) {
    console.error(`Failed to load component ${componentName}:`, error);
    return null;
  }
};

// WebWorker utilities for heavy computations
export const createWebWorker = (workerFunction) => {
  const blob = new Blob([`(${workerFunction.toString()})()`], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
};

// Optimized state management
export const useOptimizedState = (initialState) => {
  const [state, setState] = useState(initialState);
  
  const optimizedSetState = useCallback((newState) => {
    setState(prevState => {
      // Only update if state actually changed
      if (JSON.stringify(prevState) !== JSON.stringify(newState)) {
        return newState;
      }
      return prevState;
    });
  }, []);

  return [state, optimizedSetState];
};

// Resource preloading
export const preloadResources = () => {
  // Preload critical fonts
  const fontLinks = [
    'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap',
    'https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600&display=swap'
  ];

  fontLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
  });

  // Preload critical images/assets
  const criticalAssets = [
    // Add any critical image URLs here
  ];

  criticalAssets.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Performance metrics collection
export const collectPerformanceMetrics = () => {
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
      totalLoadTime: navigation.loadEventEnd - navigation.fetchStart
    };
  }
  return null;
};

export default {
  LazyAIProcessOptimizer,
  LazyWasteStreamSimulator,
  LazySystemDashboard,
  useDebounce,
  useThrottle,
  useMemoizedCalculations,
  usePerformanceMonitor,
  createOptimizedHandlers,
  useCleanup,
  useIntersectionObserver,
  loadComponent,
  createWebWorker,
  useOptimizedState,
  preloadResources,
  collectPerformanceMetrics
};