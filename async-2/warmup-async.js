'use strict';

const superagent = require('superagent');
const url = 'https://swapi.co/api/people'
function fetchPeopleWithPromises(){
  superagent.get(url)
    .then(res => {
      return res.body.results.map( person => {
        person.url;
      })
    })
    .then()
}