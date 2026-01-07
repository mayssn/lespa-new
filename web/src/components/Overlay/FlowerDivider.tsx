import React from "react";

const FlowerDivider: React.FC = () => {
  return (
    <div className="flowerDivider" aria-hidden="true">
      <div className="flowerLine" />
      <svg className="flowerIcon" viewBox="0 0 64 64">
        <path
          d="M32 48c8-10 10-18 10-24 0-6-4-10-10-10s-10 4-10 10c0 6 2 14 10 24Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 34c10-2 16-6 20-10M52 34c-10-2-16-6-20-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div className="flowerLine" />
    </div>
  );
};

export default FlowerDivider;
