import React from "react";
import HomeInfoCard from "../../components/HomeInfoCard";

import {
  SunIcon,
  BoltIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

const HomePage = (): React.JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>

      <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-3 lg:gap-x-2 text-center">
        <HomeInfoCard
          icon={<SunIcon className="h-8 w-8" />}
          cardTitle="Examples"
          cardHeadings={[
            "Answering Questions and Providing Information",
            "Language Translation and Assistance",
            "Content Generation and Writing Assistance",
          ]}
        />

        <HomeInfoCard
          icon={<BoltIcon className="h-8 w-8" />}
          cardTitle="Capabilities"
          cardHeadings={[
            "Natural Language Understanding (NLU)",
            "Conversation Generation",
            "Entertainment and Engagement",
          ]}
        />

        <HomeInfoCard
          icon={<ExclamationTriangleIcon className="h-8 w-8" />}
          cardTitle="Limitations"
          cardHeadings={[
            "Inability to Provide Personalized Advice",
            "Lack of Emotional Intelligence",
            "Limitations in Handling Sensitive Information",
          ]}
        />
      </div>
    </div>
  );
};

export default HomePage;
