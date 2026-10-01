import React from 'react';
import './Tabs.css';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div className={`tabs ${className}`} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tabs__tab ${activeTab === tab.id ? 'tabs__tab--active' : ''}`}
          onClick={() => onChange(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
