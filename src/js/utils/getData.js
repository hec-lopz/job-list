const API = "./js/data.json";

const getData = async () => {
  try {
    const response = await fetch(API);
    const data = await response.json();
    return data;

  } catch(error) {
    console.error("Fecth Error", error.message);
  }
}

export default getData;