import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";
const moment = require("https://momentjs.com/downloads/moment.js");
moment().format();

// A simple counter for http requests
export const requests = new Counter("http_reqs");

export let options = {
  ext: {
    loadimpact: {
      projectID: 3493976,
      // Test runs with the same name groups test runs together
      name: "--vus 50 --duration 60s"
    }
  },
  // stages: [
  //   { duration: '2m', target: 1000 }, // beyond the breaking point
  //   { duration: '5m', target: 1000 },
  //   { duration: '3m', target: 1100 }, // beyond the breaking point
  //   { duration: '3m', target: 1200 }, // beyond the breaking point
  //   { duration: '3m', target: 1300 }, // beyond the breaking point
  //   { duration: '3m', target: 1400 }, // beyond the breaking point
  //   { duration: '3m', target: 1500 }, // beyond the breaking point
  // ]
};

export default function() {
  let id = Math.floor(Math.random() * 1000000);
  let date = getDate(Math.floor(Math.random() * 100));
  let size = Math.floor(Math.random() * 12);

  //let res = http.get(`http://http://54.235.9.49:3001/api/restaurants/${id}/${date}/${size}`);
  //54.235.9.49
  //http://54.144.124.91:3001/
  let res = http.get(`http://18.213.137.110:3001/api/restaurants/${id}/${date}/${size}`);
  check(res, {
    "No errors": r => r.status === 200,
    "Transaction time under 2000ms": r => r.timings.duration < 2000
  });

  sleep(1);
}
function getDate(offSet) {
  let start = new Date();
  let end = new Date();
  end.setDate(start.getDate() + offSet);
  return moment(end).format("MM-DD-YYYY");
}
