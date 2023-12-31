"use client";

import React from "react";
import useSWR from "swr";
import Select from "react-select";

const fetchModels = () => fetch("/api/get-models").then((res) => res.json());

function ModelSelection(): React.JSX.Element {
  const { data: models, isLoading } = useSWR("models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "gpt-3.5-turbo",
  });

  return (
    <div>
      <Select
        options={models?.modelOptions}
        defaultValue={model}
        className="mt-2"
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: (state) => "bg-[#434654] border-[#434654]",
        }}
        placeholder={model}
        onChange={(event) => setModel(event.value)}
      />
    </div>
  );
}

export default ModelSelection;
