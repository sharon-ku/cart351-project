window.onload=function(){
  console.log("client js POST loaded");

  $( "#form_userIn" ).submit(function( event ) {
 event.preventDefault();
// get the form data ...

$.post("/registerIn",
  {
    user: document.getElementById("username").value,
    name: document.getElementById("name").value,
    password: document.getElementById("password").value,
  },
  function(data, status){
   console.log(data);
   if(data ==="ALREADY IN"){
      document.getElementById("form_userIn").reset();
     $("#mess").text("User aleady taken try again ;)");

   }
   else{
     //we have registered and so go to login ...
     $("#mess").html("Thank you for registering - click <a href = 'testUserLogin.html'>here</a> to login ");

   }
    //console.log(status)
  });

})//submit


$( "#form_login" ).submit(function( event ) {
event.preventDefault();
// get the form data ...

$.post("/logIn",
{
  user: document.getElementById("username").value,
  name: document.getElementById("name").value,
  password: document.getElementById("password").value,
},
function(data, status){
 //console.log(data);
  //console.log(status)
  if(data ==="WRONG INFO"){
    document.getElementById("form_login").reset();
   $("#mess").text("WRONG INFO;)");

  }
  else {
    console.log(data);
    console.log(status);


    //REMOVE THE FORM AND SHOW THE STUFF ...
    document.getElementById("form-wrapper").remove();
    $("#mainCanvas").removeClass("isHidden");
      /**** NOW WE CAN START CLIENT SOCKET CONNECTION ****/
      startClientSocketConnection(data);

  }
});

})//submit

};
