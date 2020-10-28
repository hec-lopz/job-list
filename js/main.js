let json;
fetch("./js/data.json")
  .then(response => response.json())
  .then(data => {
    json = data;
  })