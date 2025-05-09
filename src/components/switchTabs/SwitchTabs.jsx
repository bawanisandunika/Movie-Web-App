import React, { useState } from 'react';
import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * (100 / data.length)); // Calculate percentage-based left position
    setTimeout(() => {
      setSelectedTab(index);
    }, 200);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems" data-tab-count={data.length}>
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="activeIndicator" style={{ left: `${left}%`, width: `${100 / data.length}%` }} />
      </div>
    </div>
  );
};

export default SwitchTabs;