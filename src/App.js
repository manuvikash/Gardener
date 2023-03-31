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
      const lastEntry = data.feeds[0];
      return {
        moisture: parseFloat(lastEntry.field1),
        temperature: parseFloat(lastEntry.field2),
        humidity: parseFloat(lastEntry.field3),
      };
    });
}

function useThingSpeakData(interval, plantData) {
  const [params, setParams] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const newData = await getDataFromThingSpeak();
      setParams(newData);
    }

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);
  console.log("Plant Data");
  console.log(plantData);
  console.log("Params");
  console.log(params);
  const styleMoisture =
    params?.moisture &&
    plantData &&
    (params.moisture < plantData["moisture"]["min"]
      ? "text-blue-500"
      : params.moisture > plantData["moisture"]["max"]
      ? "text-red-500"
      : "text-green-500");

  const styleTemperature =
    params?.temperature &&
    plantData &&
    (params.temperature < plantData["temperature"]["min"]
      ? "text-red-500"
      : params.temperature > plantData["temperature"]["max"]
      ? "text-blue-500"
      : "text-green-500");

  const styleHumidity =
    params?.humidity &&
    plantData &&
    (params.humidity < plantData["humidity"]["min"]
      ? "text-red-500"
      : params.humidity > plantData["humidity"]["max"]
      ? "text-blue-500"
      : "text-green-500");

  return { params, plantData, styleMoisture, styleTemperature, styleHumidity };
}

function App() {
  const [plantData, setPlantData] = useState(null);
  const { params, styleMoisture, styleTemperature, styleHumidity } =
    useThingSpeakData(5000, plantData);

  const getData = (Input) => {
    const newPlantData = data[Input["name"]];
    setPlantData(newPlantData);
  };
  return (
    <div
      className="h-screen w-screen overflow-hidden"
      style={{ backgroundImage: "url(/img/bg.jpg)" }}
    >
      <Navbar />

      <div className="h-screen w-screen flex flex-col  text-3xl items-center text-center">
        <div className=" bg-teal-900 rounded-xl mt-10 px-10 py-3 flex items-center justify-center">
          <span className="mr-3 text-white font-semibold">
            Select plant type
          </span>
          <Dropdown onSubmit={getData} />
        </div>
        <div className=" bg-gray-800 text-white rounded-xl p-10 mt-20 flex">
          <div>
            {params && (
              <>
                <p className={styleMoisture}>
                  Moisture:{" "}
                  {params.moisture
                    ? `${Number(
                        ((4095 - params.moisture) / 4095) * 100
                      ).toFixed(1)} %`
                    : "N/A"}
                </p>
                <p className={styleTemperature}>
                  Temperature:{" "}
                  {params.temperature ? `${params.temperature} °C` : "N/A"}
                </p>
                <p className={styleHumidity}>
                  Humidity: {params.humidity ? `${params.humidity} %` : "N/A"}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-center mt-20 bg-gray-800 text-white px-5 py-3 rounded-xl">
          <div className="flex flex-row items-center mr-8">
            <div
              className="h-4 w-4 mr-2 rounded-full bg-green-500"
              title="Within range"
            />
            <span className="text-sm">Ideal level</span>
          </div>
          <div className="flex flex-row items-center mr-8">
            <div
              className="h-4 w-4 mr-2 rounded-full bg-red-500"
              title="Too low"
            />
            <span className="text-sm">Too low</span>
          </div>
          <div className="flex flex-row items-center">
            <div
              className="h-4 w-4 mr-2 rounded-full bg-blue-500"
              title="Too high"
            />
            <span className="text-sm">Too high</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
