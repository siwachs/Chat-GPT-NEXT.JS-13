import React from "react";
import { generateUniqueKey } from "../helpers/utils";

type HomeInfoCardProps = {
  icon: React.ReactNode;
  cardTitle: string;
  cardHeadings: string[];
};

const HomeInfoCard = ({
  icon,
  cardTitle,
  cardHeadings,
}: HomeInfoCardProps): React.JSX.Element => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-5">
        {icon}
        <h2 className="select-none">{cardTitle}</h2>
      </div>

      <div className="space-y-2">
        {cardHeadings.map((heading, index) => {
          const uniqueKey = generateUniqueKey("Heading", index);
          return (
            <p className="infoText select-none" key={uniqueKey}>
              {heading}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default HomeInfoCard;
