var boton = document.getElementById('btn-axios');
boton.addEventListener('click', function() {
var username = document.getElementById('username').value;
var key = document.getElementById('key').value;
  axios.post('http://localhost:4000/api/token', {
    headers: {'Content-Type': 'application/json'},
    data: {
      username: username,
      password: key
    }
  })
    .then(function(res) {
      if(res.status==200) {
        console.log(res.data);
      }
    })
    .catch(function(err) {
      console.log(err);
    })
});