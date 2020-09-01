window.onload=function(){
  var boton = document.getElementById('btn-axios');
  boton.addEventListener('click', function() {
  let sessionStorage = new SessionStorageDB('token');

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var admin = "admin";
  var user = "user";

    axios.post('http://localhost:4000/api/token', {
      headers: {'Content-Type': 'application/json'},
      data: {
        username: username,
        password: password
      }
    })
      .then(function(res) {
        if(res.status==200 && res.data.role== user) {
          console.log(res.data.role);
          var token={'token':res.data.token};
          sessionStorage.delete();
          sessionStorage.push(token);
          location.href ="./clients" 
          
        }else if(res.status==200 && res.data.role== admin) {
          console.log(res.data.role);
          var token={'token':res.data.token};
          sessionStorage.delete();
          sessionStorage.push(token);
          location.href ="./users"
        }
      })
      .catch(function(err) {
        console.log(err);
        alert(err);
      })
  });
}
