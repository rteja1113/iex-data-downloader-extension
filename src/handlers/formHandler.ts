import axios from "axios";
import FormData from "../entities/formData";
import { apiGatewayUrl, urlFirstPart, urlSecondPart } from "../constants";

export const onSubmitHandler = async (data: FormData) => {
  const today = new Date();
  const lookbackDate = new Date(today);
  lookbackDate.setDate(today.getDate() - data.lookback);

  const dates = [];
  for (let d = new Date(today); d >= lookbackDate; d.setDate(d.getDate() - 1)) {
    dates.push(new Date(d));
  }

  for (const date of dates) {
    // construct the URL to fetch data
    const formattedDate = date.toISOString().split("T")[0].replace(/-/g, "");
    const fetchUrl = `${urlFirstPart}${formattedDate}${urlSecondPart}`;

    // call the API to download data
    const downloadedData = await axios
      .get(fetchUrl)
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          `Error fetching data for date: ${date} and url: ${fetchUrl}`
        );
        return null;
      });

    // call the API to upload data to S3
    if (!downloadedData) {
      console.log("No data found for date: ", date);
      continue;
    }
    const uploadResponse = await axios
      .post(apiGatewayUrl, { body: downloadedData })
      .then((response) => {
        if (response.status === 200) {
          console.log(`Data uploaded to S3 for date: ${date}`);
        }
      })
      .catch((error) =>
        console.error(`Error uploading data to S3 due to: ${error}`)
      );
  }
};
