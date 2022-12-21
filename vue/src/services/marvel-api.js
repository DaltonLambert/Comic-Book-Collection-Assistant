const endpoint = "http://gateway.marvel.com/v1/public/comics/100?apikey=4d4fb7a8ee589aa8a41ea7bac53ff77c&ts=1671576398321&hash=dd5a754afd936ea1557909caf99bab72";

fetch(endpoint)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const title = data.data.results[0].title;
    const issueNumber = data.data.results[0].issueNumber;
    const description = data.data.results[0].description;
    const thumbnail = data.data.results[0].thumbnail;

    // Now you can use the data to display the comic's title, issue number, description, and thumbnail on your website.
  })
  .catch(error => {
    console.error(error);
  });

