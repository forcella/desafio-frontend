// postRequest('http://example.com/api/v1/users', {user: 'Dan'})
//   .then(data => console.log(data)) // Result from the `response.json()` call
//   .catch(error => console.error(error))

// function postRequest(url, data) {
//   return fetch(url, {
//     credentials: 'same-origin', // 'include', default: 'omit'
//     method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
//     body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
//     headers: new Headers({
//       'Content-Type': 'application/json'
//     }),
//   })
//   .then(response => response.json())
// }

Service = {} || Service;

Service.getRequest = function(url) {
  return fetch(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });
};

Service.searchUsers = function(user) {
  return Service.getRequest("https://api.github.com/search/users?q=" + user);
};
Service.getUserByLogin = function(user) {
  return Service.getRequest("https://api.github.com/users/" + user);
};
Service.listRepoFromUser = function(user) {
  return Service.getRequest(`https://api.github.com/users/${user}/repos`);
};
