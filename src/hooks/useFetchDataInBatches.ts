import { baseUrl } from "../constants";
import { parseDate, generateDateRanges } from "../utils/dateUtils";

const fetchDataForRange = async (range: { start: string; end: string }) => {
  const url =
    baseUrl +
    `?startDate=${encodeURIComponent(range.start)}&endDate=${encodeURIComponent(
      range.end
    )}`;
  console.log("Fetching data from", url);
  try {
    console.log(`Fetching data for ${range.start} to ${range.end}`);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      // if the response is JSON
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      // if the response is HTML

      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const divs = doc.querySelectorAll('div[title^="MCP on"]');

      const prices = Array.from(divs).map((div) => {
        const title = div.getAttribute("title");
        const dateTime = title?.replace("MCP on ", "");
        const price = div.textContent;
        return { dateTime, price };
      });

      return prices;
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
};

const downloadJSON = (data: unknown, filename: string) => {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const downloadLink = document.createElement("a");
  const downloadUrl = URL.createObjectURL(blob);
  downloadLink.setAttribute("href", downloadUrl);
  downloadLink.setAttribute("download", filename);
  downloadLink.style.visibility = "hidden";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export const fetchDataInBatches = async (
  startDate: string,
  endDate: string
) => {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  const dateRanges = generateDateRanges(start, end, 10);

  const allPrices: { dateTime: string | undefined; price: string | null }[] =
    [];

  for (const range of dateRanges) {
    console.log("Fetching data for range", range);
    const prices = await fetchDataForRange(range);
    allPrices.push(...prices);
  }

  console.log(allPrices);
  downloadJSON(allPrices, "prices.json");

  return allPrices;
};
