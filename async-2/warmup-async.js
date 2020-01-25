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
      return Promise.all(res);
    })
    .then(res => {
      return res.forEach( person => {
        console.log(person.body.name);
      })
    })
    .catch(err => console.error(err));
}

async function fetchPeopleWithAsync(){
  const everything = await superagent.get(url);
  const personList = everything.body.results;
  const justURLs = personList.map(person => person.url);
  const allPeopleAgain = await justURLs.map( oneURL => superagent.get(oneURL));
  const promises = await Promise.all(allPeopleAgain);
  promises.forEach(person => console.log(person.body.name));
}

fetchPeopleWithAsync();