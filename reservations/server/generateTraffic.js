import http from 'k6/http';
import { sleep } from 'k6';
import { max } from 'moment';
const lineReader = require('line-reader');


export let options = {
  ext: {
    loadimpact: {
      projectID: 3493976,
      // Test runs with the same name groups test runs together
      name: "Stress Test"
    }
  }
}

let maxRequests  = 10;

export default function() {
  let i = 0;
  lineReader.eachLine('/path/to/file', function(line) {
    i++;
    console.log(line);
    http.get(line);
    sleep(1);

    if (i === maxRequests) {
      break
    }
  });
}