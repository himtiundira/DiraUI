const DataList = [];
const apiUrl =
  'https://api.github.com/repos/himtiundira/diraui/contents/components/button';
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status code: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((entry) => {
      fetch(entry.download_url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          DataList.push({ kode: data, repo: entry.html_url });
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    });
  })
  .catch((error) => {
    console.error(error.message);
  });

console.log('Data received:', DataList);
