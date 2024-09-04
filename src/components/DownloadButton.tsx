import React, { useState } from "react";
import { fetchDataInBatches } from "../hooks/useFetchDataInBatches";
import { Button } from "@chakra-ui/react";

const DownloadButton: React.FC = () => {
  const [isFetching, setIsFetching] = useState(false);

  const handleDownload = async () => {
    setIsFetching(true);
    const startDate = "01/01/2024";
    const endDate = "12/01/2024";
    await fetchDataInBatches(startDate, endDate);
    setIsFetching(false);
  };

  return (
    <Button onClick={handleDownload} colorScheme="blue" isLoading={isFetching}>
      {isFetching ? "Downloading..." : "Download Now"}
    </Button>
  );
};

export default DownloadButton;
