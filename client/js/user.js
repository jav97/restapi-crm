//delete user
function deleteUser(id) {
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    axios.delete(`http://localhost:4000/api/users/${id}`, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(function (res) {
        if (res.status == 204) {
            data = res.data;
        }
        console.log(res);
    })
    .catch(function (err) {
        console.log(err);
    })
}

//add user
$("#btnSaveUser").click(function () {
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];

    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var lastname = document.getElementById('lastname').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var role = document.getElementById('role').value;   
    axios.post('http://localhost:4000/api/users',{'name':name,'lastname':lastname,'username':username,'password':password,'role':role},{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(function (res) {
        if (res.status == 201) {
            swal('User created correctly', "", "success");
            clearInput();
            drawTable();
        }
    })
    .catch(function (err) {
        console.log(err);
    })
});

window.onload = function(){
   drawTable();
}

//draw table with all users
var drawTable = function () {
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    axios.get('http://localhost:4000/api/users', {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    }).then(function (res) {
        if (res.status == 200) {
            var table = $("#users").DataTable({
                responsive: true,
                "destroy": true,
                dom: 'Bfrtip',
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
                },
                searching: true,
                data: res.data,
                columns: [
                    {
                        targets: [0],
                        visible: false,
                        data: "_id"
                    },
                    {
                        data: 'name',
                        render: function (data) {
                            return data;
                        }
                    },
                    {
                        data: 'lastname',
                        render: function (data) {
                            return data;
                        }
                    },
                    {
                        data: 'username',
                        render: function (data) {
                            return data;

                        }
                    },
                    {
                        data: "_id",
                        render: function (data) {
                            var html = '<button type="button" class="edit btn btn-primary"><i class="fas fa-pen"></i></button>';
                            html += '<button type="button" class="delete btn btn-danger"><i class="fas fa-trash"></i></button>';
                            return html;
                        }

                    }
                ],
                order: [[0, 'desc']]
            });
            editU('#users', table);
            deleteU('#users', table);

        }
    })
        .catch(function (err) {
            console.log(err);
        });
}

//get one user and charge info in the inputs
function getUser(id){
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];

    axios.get(`http://localhost:4000/api/users/${id}`, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(function (res) {
        if (res.status == 200) {
            data = (res.data);
            console.log(data.name);

            document.getElementById('name').value = data.name;
            document.getElementById('lastname').value = data.lastname;
            document.getElementById('username').value = data.username;
            document.getElementById('password').value = "";
            document.getElementById('role').value = data.role; 
        }
        console.log(res);
    })
    .catch(function (err) {
        console.log(err);
    })
}

//load user of table to edit
var editU = function (tbody, table) {
    $(tbody).on("click", "button.edit", async function () {
        var dataTable = table.row($(this).parents("tr")).data();
        getUser(dataTable._id);
        $('#btnUpdateUser').attr('hidden',false)
        $('#btnSaveUser').attr('hidden',true)
        console.log(dataTable);
    });
}
//clear input and reset attr of buttons
$("#cancel").click(function (){
    $('#btnUpdateUser').attr('hidden',true)
    $('#btnSaveUser').attr('hidden',false)
    clearInput();
});

//call deleteUser
var deleteU = function (tbody, table) {
    $(tbody).on("click", "button.delete", async function () {
        var dataTable = table.row($(this).parents("tr")).data();
        swal({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Poof! Your client has been deleted!", {
                icon: "success",
              });
              deleteUser(dataTable._id);

            } else {
              swal("Your client is safe!");
            }
          });
        drawTable();
    });
}

// update data of user selected
function updateUser(id) {
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];

    var username = document.getElementById('username').value;
    var name =         document.getElementById('name').value;
    var lastname =     document.getElementById('lastname').value;
    var username =     document.getElementById('username').value;
    var password =     document.getElementById('password').value;
    var role =         document.getElementById('role').value;
    
    axios.put(`http://localhost:4000/api/users/${id}`,{'name':name,'lastname':lastname,'username':username,'password':password,'role':role},{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(function (res) {
            if (res.status == 400) {
                swal('User update correctly', "", "success");
                clearInput();
                drawTable();
            }
        })
        .catch(function (err) {
            console.log(err);
        })
};

function clearInput(){
    document.getElementById('username').value = "";
    document.getElementById('name').value = "";
    document.getElementById('lastname').value = "";
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('role').value = ""; 
}