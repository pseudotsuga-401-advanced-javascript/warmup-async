'use strict';

const superagent = require('superagent');
const url = 'https://swapi.co/api/people'
function fetchPeopleWithPromises(){
  superagent.get(url)
    .then(res => {
      return res.body.results.map( person => {
        return person.url;
      });
    })
    .then(res => {
      return res.map( oneURL => {
        return superagent.get(oneURL);
      })
    })
    .then(res => {
      console.log(res);
    })
}

fetchPeopleWithPromises();