import React, { useEffect, useState } from "react";

function CsvComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data-to-visualize/Electric_Vehicle_Population_Data.csv")
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Do something with the CSV data
      })
      .catch((error) => console.error("Error fetching the CSV file:", error));

    // fetch("../../data-to-visualize/Electric_Vehicle_Population_Data.csv") // Public files are accessible via root `/`
    //   .then((response) => response.text())
    //   .then((csvText) => {
    //     const parsedData = Papa.parse(csvText, { header: true });
    //     setData(parsedData.data);
    //   })
    //   .catch((error) => console.error("Error loading CSV:", error));
  }, []);

  return (
    <div>
      <h1>CSV Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default CsvComponent;
