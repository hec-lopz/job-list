import Data from "../data.json";
// const API = "./js/data.json";

const getData = async () => {
  try {
    const response = await Promise.resolve(Data);
    // const data = await response.json();
    return response;
  } catch (error) {
    console.error("Fecth Error", error.message);
  }
};

export default getData;
