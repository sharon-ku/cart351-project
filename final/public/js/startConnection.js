/**
startConnection.js
Sharon Ku & Leanne Suen Fa

Only used to start "greenhouses.html" once user has logged inspect
Also stores user info in local storage
*/

// Get user info from Db; only works once logged in
function startClientSocketConnection(userInfoFromDb) {
  userInfo = userInfoFromDb;
  console.log(userInfo);

  console.log(`logged in here`);
  console.log(`pod length: ${userInfo[0].podId.length}`);

  localStorage.setItem(`user`, JSON.stringify(userInfoFromDb));
  window.location = `greenhouses.html`;
}
