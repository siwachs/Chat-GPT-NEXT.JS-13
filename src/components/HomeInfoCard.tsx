import React from "react";
import { generateUniqueKey } from "../helpers/utils";

interface HomeInfoCardProps {
  icon: React.ReactNode;
  cardTitle: string;
  cardHeadings: string[];
}

const HomeInfoCard: React.FC<HomeInfoCardProps> = ({
  icon,
  cardTitle,
  cardHeadings,
}) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-5">
        {icon}
        <h2>{cardTitle}</h2>
      </div>

      <div className="space-y-2">
        {cardHeadings.map((heading, index) => {
          const uniqueKey = generateUniqueKey("Heading", index);
          return (
            <p className="infoText" key={uniqueKey}>
              {heading}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default HomeInfoCard;
