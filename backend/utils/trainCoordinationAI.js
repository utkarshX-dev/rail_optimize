// Updated trainCoordinationAI.js - Connect to Python ML service
const axios = require('axios');
const { activeTrains } = require("../state.js");
const getActiveTrains = () => {
  try {
    const { activeTrains } = require("../state.js");
    return activeTrains;
  } catch (error) {
    console.error('Failed to get activeTrains:', error.message);
    return null;
  }
};
class TrainCoordinationAI {
  constructor() {
    this.decisionHistory = [];
    this.mlServiceUrl = process.env.ML_SERVICE_URL || 'http://127.0.0.1:5001';
    this.fallbackEnabled = true;
    this.isMLServiceReady = false;
    this.checkMLServiceHealth();
  }

  async checkMLServiceHealth() {
    try {
      const response = await axios.get(`${this.mlServiceUrl}/health`, { timeout: 5000 });
      this.isMLServiceReady = response.data.model_trained;
      console.log(`🤖 ML Service Status: ${this.isMLServiceReady ? 'Ready' : 'Model not trained'}`);
      
      if (!this.isMLServiceReady) {
        console.log('🔄 Training ML model...');
        await this.trainMLModel();
      }
    } catch (error) {
      console.error('❌ ML Service not available:', error.message);
      this.isMLServiceReady = false;
    }
  }

  async trainMLModel() {
    try {
      const response = await axios.post(`${this.mlServiceUrl}/train-model`, {}, { timeout: 30000 });
      if (response.data.success) {
        this.isMLServiceReady = true;
        console.log('✅ ML Model trained successfully');
      }
    } catch (error) {
      console.error('❌ Failed to train ML model:', error.message);
    }
  }

  // Main decision-making method that integrates AI
  async makeDecision(conflicts) {
    if (!conflicts || conflicts.length === 0) {
      return { decisions: [], aiUsed: false, reason: 'No conflicts detected' };
    }

    const allDecisions = [];
    let aiUsed = false;

    for (const conflict of conflicts) {
      let decision;
      
      try {
        // Try AI-powered decision first
        if (this.isMLServiceReady) {
          decision = await this.getAIDecision(conflict);
          aiUsed = true;
          console.log(`🤖 AI Decision for conflict ${conflict.id}:`, decision.ml_decision);
        } else {
          // Fallback to rule-based system
          decision = this.fallbackDecision(conflict);
          console.log(`⚙️ Fallback Decision for conflict ${conflict.id}`);
        }

        allDecisions.push(...decision.train_decisions || decision.decisions);
        
        // Apply decisions to trains
        await this.applyDecisions(decision.train_decisions || decision.decisions);

      } catch (error) {
        console.error('❌ AI Decision error:', error.message);
        // Use fallback
        const fallbackDecision = this.fallbackDecision(conflict);
        allDecisions.push(...fallbackDecision.decisions);
        await this.applyDecisions(fallbackDecision.decisions);
      }
    }

    // Store decision history
    this.decisionHistory.push({
      timestamp: new Date(),
      conflicts,
      decisions: allDecisions,
      aiUsed,
      totalConflicts: conflicts.length
    });

    return {
      timestamp: new Date(),
      totalConflicts: conflicts.length,
      decisions: allDecisions,
      aiUsed,
      recommendation: this.generateRecommendation(allDecisions)
    };
  }

  async getAIDecision(conflict) {
    try {
      const response = await axios.post(`${this.mlServiceUrl}/predict-decision`, {
        trains: conflict.trains,
        station: conflict.station,
        type: conflict.type,
        severity: conflict.severity
      }, { timeout: 10000 });

      if (response.data.success) {
        return {
          ml_decision: response.data.ml_decision,
          confidence: response.data.confidence,
          train_decisions: response.data.train_decisions,
          feature_importance: response.data.feature_importance
        };
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error('AI Service Error:', error.message);
      throw error;
    }
  }

  // Enhanced fallback decision system
  fallbackDecision(conflict) {
    const trains = conflict.trains.sort((a, b) => a.priority - b.priority);
    const decisions = [];
    const currentHour = new Date().getHours();
    const isPeakHour = [7, 8, 9, 17, 18, 19].includes(currentHour);

    trains.forEach((train, index) => {
      if (index === 0) {
        // Highest priority train proceeds
        decisions.push({
          trainId: train.id,
          action: "PROCEED",
          delay: 0,
          reason: `Highest priority ${train.type} - ${conflict.type}`,
          aiGenerated: false
        });
      } else {
        // Calculate delay based on various factors
        let delay = 15; // Base delay
        
        // Peak hour adjustments
        if (isPeakHour) delay += 10;
        
        // Priority difference adjustment
        const priorityDiff = train.priority - trains[0].priority;
        delay += priorityDiff * 5;
        
        // Current delay consideration
        if (train.delay > 20) delay = Math.min(delay, 10); // Don't add too much delay
        
        decisions.push({
          trainId: train.id,
          action: "HOLD",
          delay: delay,
          reason: `Priority-based holding - ${conflict.type}`,
          aiGenerated: false
        });
      }
    });

    return {
      decisions,
      station: conflict.station,
      timestamp: new Date(),
      decisionType: 'fallback'
    };
  }

  async applyDecisions(decisions) {
    const activeTrains = getActiveTrains();
    if (!activeTrains) {
      console.error('❌ activeTrains not available. Cannot apply decisions.');
      return;
    }
    for (const decision of decisions) {
      const train = activeTrains.get(decision.trainId);
      if (train) {
        if (decision.action === "HOLD") {
          // Add delay to train
          train.currentDelay = (train.currentDelay || train.delay || 0) + decision.delay;
          train.status = "delayed";
          console.log(`🚂 Train ${train.id} delayed by ${decision.delay} minutes. Total delay: ${train.currentDelay}`);
        } else if (decision.action === "PROCEED") {
          train.status = "running";
          console.log(`🚂 Train ${train.id} proceeding`);
        }
        
        // Update last decision time
        train.lastDecisionTime = Date.now();
        train.lastDecision = decision;
      }
    }
  }

  generateRecommendation(decisions) {
    const holdCount = decisions.filter(d => d.action === "HOLD").length;
    const proceedCount = decisions.filter(d => d.action === "PROCEED").length;
    
    if (holdCount > proceedCount) {
      return "High congestion detected. Consider rescheduling or rerouting some trains.";
    } else if (holdCount === 0) {
      return "All trains proceeding normally. Monitor for upcoming conflicts.";
    } else {
      return "Standard priority-based coordination applied.";
    }
  }

  // Get AI service status
  async getAIStatus() {
    try {
      const response = await axios.get(`${this.mlServiceUrl}/health`);
      return {
        available: true,
        modelTrained: response.data.model_trained,
        status: response.data.status
      };
    } catch (error) {
      return {
        available: false,
        error: error.message
      };
    }
  }

  // Get decision history for analytics
  getDecisionHistory(limit = 10) {
    return this.decisionHistory.slice(-limit);
  }

  // Force retrain the ML model
  async retrainModel() {
    try {
      await this.trainMLModel();
      return { success: true, message: 'Model retrained successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = TrainCoordinationAI;
