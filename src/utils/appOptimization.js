// 🚀 PROMETHEUS - CORE APPLICATION OPTIMIZATION UTILITIES
// Advanced performance optimization for Mars mission critical systems

import { lazy, Suspense, memo, useMemo, useCallback, useEffect, useRef, useState } from 'react';

// ============================================================================
// 🎯 LAZY LOADING COMPONENTS
// ============================================================================

// Lazy load heavy components for better initial load performance
export const LazyComponents = {
  AIProcessOptimizer: lazy(() => import('../components/AIProcessOptimizer')),
  WasteStreamSimulator: lazy(() => import('../components/WasteStreamSimulator')),
  SystemDashboard: lazy(() => import('../components/SystemDashboard'))
};

// Enhanced Suspense wrapper with loading states
export const OptimizedSuspense = memo(({ children, fallback = null }) => (
  <Suspense fallback={fallback || <div className="loading-spinner">Loading...</div>}>
    {children}
  </Suspense>
));

// ============================================================================
// 🎯 PERFORMANCE MONITORING
// ============================================================================

export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      renderTimes: [],
      memoryUsage: [],
      voiceProcessingTimes: [],
      componentLoadTimes: []
    };
    this.observers = new Map();
  }

  // Monitor component render performance
  measureRender(componentName, renderFunction) {
    const startTime = performance.now();
    const result = renderFunction();
    const endTime = performance.now();
    
    this.metrics.renderTimes.push({
      component: componentName,
      duration: endTime - startTime,
      timestamp: Date.now()
    });

    // Keep only last 100 measurements
    if (this.metrics.renderTimes.length > 100) {
      this.metrics.renderTimes.shift();
    }

    return result;
  }

  // Monitor memory usage
  trackMemoryUsage() {
    if (performance.memory) {
      this.metrics.memoryUsage.push({
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit,
        timestamp: Date.now()
      });

      // Keep only last 50 measurements
      if (this.metrics.memoryUsage.length > 50) {
        this.metrics.memoryUsage.shift();
      }
    }
  }

  // Get performance report
  getReport() {
    const avgRenderTime = this.metrics.renderTimes.length > 0
      ? this.metrics.renderTimes.reduce((sum, metric) => sum + metric.duration, 0) / this.metrics.renderTimes.length
      : 0;

    const currentMemory = this.metrics.memoryUsage.length > 0
      ? this.metrics.memoryUsage[this.metrics.memoryUsage.length - 1]
      : null;

    return {
      averageRenderTime: avgRenderTime.toFixed(2),
      currentMemoryUsage: currentMemory ? (currentMemory.used / 1024 / 1024).toFixed(2) : 'N/A',
      totalMetrics: this.metrics.renderTimes.length,
      recommendations: this.getRecommendations(avgRenderTime, currentMemory)
    };
  }

  getRecommendations(avgRenderTime, currentMemory) {
    const recommendations = [];

    if (avgRenderTime > 16.67) { // 60fps threshold
      recommendations.push('Consider optimizing component renders - average render time exceeds 60fps target');
    }

    if (currentMemory && currentMemory.used / currentMemory.total > 0.8) {
      recommendations.push('High memory usage detected - consider implementing memory cleanup');
    }

    if (this.metrics.voiceProcessingTimes.length > 0) {
      const avgVoiceTime = this.metrics.voiceProcessingTimes.reduce((sum, time) => sum + time, 0) / this.metrics.voiceProcessingTimes.length;
      if (avgVoiceTime > 1000) {
        recommendations.push('Voice processing is slow - consider optimizing speech recognition');
      }
    }

    return recommendations;
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// ============================================================================
// 🎯 OPTIMIZED HOOKS
// ============================================================================

// Enhanced debounce hook with cleanup
export const useOptimizedDebounce = (value, delay, options = {}) => {
  const { leading = false, trailing = true, maxWait = null } = options;
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef(null);
  const maxTimeoutRef = useRef(null);
  const lastCallTimeRef = useRef(null);

  useEffect(() => {
    const now = Date.now();
    lastCallTimeRef.current = now;

    const updateValue = () => {
      setDebouncedValue(value);
      timeoutRef.current = null;
      maxTimeoutRef.current = null;
    };

    // Leading edge execution
    if (leading && !timeoutRef.current) {
      updateValue();
      return;
    }

    // Clear existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
    }

    // Set new timeout
    if (trailing) {
      timeoutRef.current = setTimeout(updateValue, delay);
    }

    // Set max wait timeout
    if (maxWait && !maxTimeoutRef.current) {
      maxTimeoutRef.current = setTimeout(updateValue, maxWait);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (maxTimeoutRef.current) clearTimeout(maxTimeoutRef.current);
    };
  }, [value, delay, leading, trailing, maxWait]);

  return debouncedValue;
};

// Optimized throttle hook
export const useOptimizedThrottle = (callback, delay) => {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef(null);

  return useCallback((...args) => {
    const now = Date.now();

    if (now - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = now;
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
        lastRun.current = Date.now();
      }, delay - (now - lastRun.current));
    }
  }, [callback, delay]);
};

// ============================================================================
// 🎯 MEMOIZATION UTILITIES
// ============================================================================

// Deep memoization for complex objects
export const useDeepMemo = (factory, deps) => {
  const ref = useRef();
  const signalRef = useRef(0);

  const depsString = JSON.stringify(deps);
  const prevDepsString = useRef(depsString);

  if (depsString !== prevDepsString.current) {
    ref.current = factory();
    prevDepsString.current = depsString;
    signalRef.current += 1;
  }

  return useMemo(() => ref.current, [signalRef.current]);
};

// Optimized calculation memoization
export const useMemoizedCalculations = () => {
  return useMemo(() => ({
    // Waste processing calculations
    calculateEnergyOutput: memo((wasteType, mass) => {
      const energyRates = {
        organic: 4.2,
        plastic: 8.7,
        metal: 2.1,
        paper: 3.8,
        food: 4.5,
        mixed: 4.0
      };
      
      const rate = energyRates[wasteType?.toLowerCase()] || energyRates.mixed;
      return (mass * rate).toFixed(2);
    }),

    // Processing time calculations
    calculateProcessingTime: memo((mass, wasteType) => {
      const baseTime = 45; // minutes per kg
      const typeMultipliers = {
        organic: 0.8,
        plastic: 1.2,
        metal: 0.6,
        paper: 0.9,
        food: 0.85,
        mixed: 1.0
      };
      
      const multiplier = typeMultipliers[wasteType?.toLowerCase()] || 1.0;
      return Math.round(mass * baseTime * multiplier);
    }),

    // Efficiency calculations
    calculateEfficiency: memo((wasteType, systemLoad) => {
      const baseEfficiency = {
        organic: 92,
        plastic: 87,
        metal: 95,
        paper: 89,
        food: 91,
        mixed: 85
      };
      
      const base = baseEfficiency[wasteType?.toLowerCase()] || 85;
      const loadPenalty = Math.max(0, (systemLoad - 80) * 0.2);
      return Math.max(60, base - loadPenalty);
    })
  }), []);
};

// ============================================================================
// 🎯 RESOURCE OPTIMIZATION
// ============================================================================

// Preload critical resources
export const preloadResources = () => {
  const resources = [
    '/sounds/notification.mp3',
    '/sounds/success.mp3',
    '/sounds/error.mp3',
    '/sounds/processing.mp3'
  ];

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'audio';
    link.href = resource;
    document.head.appendChild(link);
  });
};

// Image optimization
export const optimizeImages = () => {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Add loading="lazy" for images below the fold
    if (!img.hasAttribute('loading')) {
      const rect = img.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        img.loading = 'lazy';
      }
    }

    // Add decoding="async" for better performance
    if (!img.hasAttribute('decoding')) {
      img.decoding = 'async';
    }
  });
};

// ============================================================================
// 🎯 MEMORY MANAGEMENT
// ============================================================================

export class MemoryManager {
  constructor() {
    this.cleanupTasks = new Set();
    this.intervals = new Set();
    this.timeouts = new Set();
    this.eventListeners = new Map();
  }

  // Register cleanup task
  addCleanupTask(task) {
    this.cleanupTasks.add(task);
  }

  // Register interval for cleanup
  addInterval(intervalId) {
    this.intervals.add(intervalId);
  }

  // Register timeout for cleanup
  addTimeout(timeoutId) {
    this.timeouts.add(timeoutId);
  }

  // Register event listener for cleanup
  addEventListener(element, event, handler) {
    const key = `${element}-${event}`;
    if (this.eventListeners.has(key)) {
      const { element: el, event: ev, handler: oldHandler } = this.eventListeners.get(key);
      el.removeEventListener(ev, oldHandler);
    }
    this.eventListeners.set(key, { element, event, handler });
    element.addEventListener(event, handler);
  }

  // Cleanup all resources
  cleanup() {
    // Run cleanup tasks
    this.cleanupTasks.forEach(task => {
      try {
        task();
      } catch (error) {
        console.warn('Cleanup task failed:', error);
      }
    });

    // Clear intervals
    this.intervals.forEach(intervalId => clearInterval(intervalId));

    // Clear timeouts
    this.timeouts.forEach(timeoutId => clearTimeout(timeoutId));

    // Remove event listeners
    this.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });

    // Clear all sets and maps
    this.cleanupTasks.clear();
    this.intervals.clear();
    this.timeouts.clear();
    this.eventListeners.clear();
  }

  // Force garbage collection (if available)
  forceGC() {
    if (window.gc) {
      window.gc();
    }
  }
}

// Global memory manager
export const memoryManager = new MemoryManager();

// ============================================================================
// 🎯 BUNDLE OPTIMIZATION
// ============================================================================

// Dynamic import utility
export const dynamicImport = async (modulePath) => {
  try {
    const module = await import(modulePath);
    return module.default || module;
  } catch (error) {
    console.error(`Failed to load module: ${modulePath}`, error);
    return null;
  }
};

// Code splitting utility
export const createAsyncComponent = (importFunc, fallback = null) => {
  const LazyComponent = lazy(importFunc);
  
  return memo((props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  ));
};

// ============================================================================
// 🎯 PERFORMANCE HOOKS
// ============================================================================

// Hook for monitoring component performance
export const usePerformanceMonitor = (componentName) => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    performanceMonitor.measureRender(componentName, () => renderTime);
    startTime.current = performance.now();
  });

  return {
    renderCount: renderCount.current,
    getMetrics: () => performanceMonitor.getReport()
  };
};

// Hook for optimized event handlers
export const useOptimizedHandlers = (handlers) => {
  return useMemo(() => {
    const optimizedHandlers = {};
    
    Object.entries(handlers).forEach(([key, handler]) => {
      // Create a memoized version without using useCallback inside the loop
      optimizedHandlers[key] = (...args) => handler(...args);
    });
    
    return optimizedHandlers;
  }, [handlers]);
};

// ============================================================================
// 🎯 INITIALIZATION
// ============================================================================

// Initialize all optimizations
export const initializeOptimizations = () => {
  // Start performance monitoring
  setInterval(() => {
    performanceMonitor.trackMemoryUsage();
  }, 5000);

  // Preload resources
  preloadResources();

  // Optimize images
  setTimeout(optimizeImages, 1000);

  // Setup cleanup on page unload
  window.addEventListener('beforeunload', () => {
    memoryManager.cleanup();
  });

  console.log('🚀 Circula AI optimizations initialized');
};

// Export optimization status
export const getOptimizationStatus = () => ({
  performanceMonitoring: true,
  memoryManagement: true,
  lazyLoading: true,
  resourcePreloading: true,
  bundleOptimization: true,
  status: 'OPTIMIZED FOR MARS MISSION CRITICAL OPERATIONS'
});

export default {
  LazyComponents,
  OptimizedSuspense,
  performanceMonitor,
  useOptimizedDebounce,
  useOptimizedThrottle,
  useDeepMemo,
  useMemoizedCalculations,
  MemoryManager,
  memoryManager,
  initializeOptimizations,
  getOptimizationStatus
};