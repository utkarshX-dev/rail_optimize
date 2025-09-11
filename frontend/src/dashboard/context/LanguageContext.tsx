import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'EN' | 'HI';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  EN: {
    // Navbar
    home: "Home",
    analytics: "Analytics",
    addTrain: "Add Train",
    logout: "Logout",
    
    // Dashboard
    welcome: "Welcome to Railway Dashboard",
    totalTrains: "Total Trains",
    activeRoutes: "Active Routes",
    onTimePerformance: "On-Time Performance",
    delayedTrains: "Delayed Trains",
    
    // Common
    search: "Search",
    filter: "Filter",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    
    // Chatbot
    chatbotTitle: "RailMate AI Assistant",
    askRailmate: "Ask RailMate...",
    
    // Train Management
    trainNumber: "Train Number",
    trainName: "Train Name",
    source: "Source",
    destination: "Destination",
    status: "Status",
    platform: "Platform",
    railwayAnalytics: "Railway Analytics Dashboard",
    realTimeInsights: "Real-time insights and performance metrics",
    activeTrains: "Active Trains",
    totalPassengers: "Total Passengers",
    averageSpeed: "Average Speed",
    networkEfficiency: "Network Efficiency",
    completedJourneys: "Completed Journeys",
    fuelSavings: "Fuel Savings",
    performanceTrend: "Performance Trend",
    routeDistribution: "Route Distribution",
    efficiencyTrend: "Efficiency Trend",
    currentJourneys: "Current Journeys",
    train: "Train",
    route: "Route",
    progress: "Progress",
    passengers: "Passengers",
    timeSaved: "Time Saved",
    express: "Express",
    passenger: "Passenger",
    freight: "Freight",
    suburban: "Suburban",
  },
  HI: {
    // Navbar
    home: "होम",
    analytics: "विश्लेषण",
    addTrain: "ट्रेन जोड़ें",
    logout: "लॉगआउट",
    
    // Dashboard
    welcome: "रेलवे डैशबोर्ड में आपका स्वागत है",
    totalTrains: "कुल ट्रेनें",
    activeRoutes: "सक्रिय मार्ग",
    onTimePerformance: "समय पर प्रदर्शन",
    delayedTrains: "विलंबित ट्रेनें",
    
    // Common
    search: "खोजें",
    filter: "फ़िल्टर",
    save: "सेव करें",
    cancel: "रद्द करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    view: "देखें",
    
    // Chatbot
    chatbotTitle: "रेलमेट AI सहायक",
    askRailmate: "रेलमेट से पूछें...",
    
    // Train Management
    trainNumber: "ट्रेन संख्या",
    trainName: "ट्रेन का नाम",
    source: "स्रोत",
    destination: "गंतव्य",
    status: "स्थिति",
    platform: "प्लेटफॉर्म",
    railwayAnalytics: "रेलवे एनालिटिक्स डैशबोर्ड",
    realTimeInsights: "रियल-टाइम अंतर्दृष्टि और प्रदर्शन मेट्रिक्स",
    activeTrains: "सक्रिय ट्रेनें",
    totalPassengers: "कुल यात्री",
    averageSpeed: "औसत गति",
    networkEfficiency: "नेटवर्क दक्षता",
    completedJourneys: "पूर्ण यात्राएं",
    fuelSavings: "ईंधन बचत",
    performanceTrend: "प्रदर्शन ट्रेंड",
    routeDistribution: "मार्ग वितरण",
    efficiencyTrend: "दक्षता ट्रेंड",
    currentJourneys: "वर्तमान यात्राएं",
    train: "ट्रेन",
    route: "मार्ग",
    progress: "प्रगति",
    passengers: "यात्री",
    timeSaved: "समय की बचत",
    express: "एक्सप्रेस",
    passenger: "पैसेंजर",
    freight: "फ्रेट",
    suburban: "सबर्बन",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'HI' : 'EN');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};