import { useEffect, useState, React } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Dropdown from "./components/dropdown";
import data from "./data/data.json";

function getDataFromThingSpeak() {
  const url =
    "https://api.thingspeak.com/channels/2076000/feeds.json?api_key=NRWO2V3YRD3CMNDF&results=2";
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const lastEntry = data.feeds[1];
      return {
        moisture: parseFloat(lastEntry.field1),
        temperature: parseFloat(lastEntry.field2),
        humidity: parseFloat(lastEntry.field3),
      };
    });
}

function useThingSpeakData(interval) {
  const [params, setParams] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const newData = await getDataFromThingSpeak();
      setParams(newData);
    }

    const intervalId = setInterval(() => {
      fetchData();
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  return params;
}

function App() {
  const params = useThingSpeakData(5000);
  const getData = (Input) => {
    console.log(data[Input["name"]]);
  };
  return (
    <div
      className="h-screen w-screen overflow-hidden"
      style={{ backgroundImage: "url(/img/bg.jpg)" }}
    >
      <Navbar />

      <div className="h-screen w-screen flex flex-col  text-3xl items-center text-center justify-center">
        <div className="mb-10 bg-teal-900 rounded-xl px-3 py-3 flex items-center justify-center">
          <span className="mr-3 text-white font-semibold">
            Select plant type
          </span>
          <Dropdown onSubmit={getData} />
        </div>
        <div className="bg-white rounded-xl p-10 mt-20 flex flex-row">
          <div>
            {params && (
              <>
                <p>
                  Moisture: {params.moisture ? `${params.moisture} mV` : "N/A"}
                </p>
                <p>
                  Temperature:{" "}
                  {params.temperature ? `${params.temperature} °C` : "N/A"}
                </p>
                <p>
                  Humidity: {params.humidity ? `${params.humidity} %` : "N/A"}
                </p>
              </>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default App;
