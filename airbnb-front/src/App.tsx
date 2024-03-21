import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const OpenAI = require("openai");
declare const chrome: any;

function App() {
  console.log("process", process.env);
  const openai = new OpenAI({
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    dangerouslyAllowBrowser: true,
  });
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.action === "dataExtracted") {
        console.log("Data extracted:", message.propertiesData);
        setData(message.propertiesData);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const handleClick = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      const currentTab = tabs[0];
      if (currentTab) {
        chrome.tabs.sendMessage(
          currentTab.id,
          { action: "fetchProducts" },
          async (response: any) => {
            console.log("Product list:", response);

            try {
              const prompt = `${
                data[0]?.searchKey
              } I want to suggest the best result based on the following data: ${JSON.stringify(
                data
              )}`;
              const responses = await openai.completions.create({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 100,
                n: 1,
              });

              setData(responses);
              console.log(responses);
            } catch (error) {
              setData(response);
              console.error(
                "Error generating property recommendations:",
                error
              );
            }
          }
        );
      }
    });
  };

  const handleSave = async () => {
    try {
      const totalData = {
        search_key: data[0]?.searchKey,
        property_json: data,
      };
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}search/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: totalData,
        withCredentials: true,
      });
      if (response?.status === 201) {
        alert("Data Saved Successfully");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      alert("something went wrong");
      console.log(error);
    }
  };

  return (
    <div
      className="App"
      style={{ width: "300px", height: "300px", overflow: "auto" }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        {data?.length ? (
          <>
            <div
              style={{
                marginLeft: "168px",
                marginTop: "6px",
              }}
            >
              <button id="find" onClick={handleSave}>
                Save Search
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                marginLeft: "140px",
                marginTop: "6px",
              }}
            >
              <button id="find" onClick={handleClick} style={{ width: "100%" }}>
                Suggested Properties
              </button>
            </div>
          </>
        )}
      </div>
      <hr />
      <div>
        {data.length ? (
          <>
            <h5 style={{ textAlign: "center" }}>Suggested List</h5>
            <header className="App-header">
              {data?.map((elem: any, index: number) => (
                <ul key={index}>
                  <li>{elem?.name}</li>
                </ul>
              ))}
            </header>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
