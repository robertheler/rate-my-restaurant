import http from "k6/http";
import { check, sleep } from "k6";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";
import { Counter } from "k6/metrics";

// A simple counter for http requests
export const requests = new Counter("http_reqs");

export let options = {
  ext: {
    loadimpact: {
      projectID: 3493976,
      // Test runs with the same name groups test runs together
      name: "Stress Test"
    }
  },  // stages: [
  //   { duration: '2m', target: 100 }, // below normal load
  //   { duration: '5m', target: 100 },
  //   { duration: '2m', target: 200 }, // normal load
  //   { duration: '5m', target: 200 },
  //   { duration: '2m', target: 300 }, // around the breaking point
  //   { duration: '5m', target: 300 },
  //   { duration: '2m', target: 400 }, // beyond the breaking point
  //   { duration: '5m', target: 400 },
  //   { duration: '10m', target: 0 }, // scale down. Recovery stage.
  // ],
  vus: 10,
  duration: '30s'
};

// Load CSV file and parse it using Papa Parse
const csvData = papaparse.parse(open("./requests.csv"), { header: true }).data;

export default function() {
  // Now you can use the CSV data in your test logic below.
  // Below are some examples of how you can access the CSV data.

  // Pick a random requests
  let request = csvData[Math.floor(Math.random() * csvData.length)];
  let url = `http://localhost:3001/api/restaurants/${request.id}/${request.date}/${request.size}`
  console.log("Random Request: ", url);

  let responses = http.batch([
    [
      'GET',
      url,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
  ]);
  // Loop through all username/password pairs
  // csvData.forEach(request => {
  //   console.log(JSON.stringify(userPwdPair));
  //   const params = {
  //     id: request.username,
  //     date: request.password,
  //     size: request.size
  //   };
  // });

  //http.get(`http://localhost:3001/api/restaurants/${request.id}/${request.date}/${request.size}`, );
  sleep(1);
}
