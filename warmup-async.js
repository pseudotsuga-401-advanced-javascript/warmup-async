'use strict';

const superagent = require('superagent');
let url = 'https://swapi.co/api/people/';

function fetchPeopleWithPromises(){
  superagent.get(url)
  .then(result => {
    return result.body.results.map(val => val.url)
  })
  .then(result => {
    return result.map(oneURL => superagent.get(oneURL))
  })
  .then(result => {
    return Promise.all(result);
  })
  .then(result => {
    return result.forEach(response => {
      console.log(response.body.name);
    });
  })
  .catch((err) => console.error(err))
}

// fetchPeopleWithPromises();

async function fetchPeopleWithAsync(){
  const fullResponse = await superagent.get(url);
  const personList = fullResponse.body.results;
  const URLArray = personList.map(object => object.url);
  const individualPersonAccess = URLArray.map(oneURL => superagent.get(oneURL));
  Promise.all(individualPersonAccess)
  .then(result => {
    result.forEach(response => {
      console.log(response.body.name);
    })
  })
  .catch(err => console.error(err));
}

fetchPeopleWithAsync();