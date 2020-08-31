//delete contacts of the server
function deleteClient(id) {
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    axios.delete(`http://localhost:4000/api/contacts/${id}`, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
        })
        .then(function (res) {
            if (res.status == 204) {
                data = res.data;
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this imaginary file!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            swal("Poof! Your imaginary file has been deleted!", {
                                icon: "success",
                            });
                        } else {
                            swal("Your imaginary file is safe!");
                        }
                    });

            }
            console.log(res);
        })
        .catch(function (err) {
            console.log(err);
        })
}

//save contact
$("#btnSaveContact").click(function () {

    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    
    var name =        document.getElementById('name').value;
    var client =      document.getElementById('clients').value;
    var lastname =    document.getElementById('lastname').value;
    var email =       document.getElementById('email').value;
    var position =    document.getElementById('position').value;
    var numberPhone = document.getElementById('numberPhone').value;
 
    console.log(client);
    axios.post('http://localhost:4000/api/contacts',{'name':name,'client':client,'lastname':lastname,'email':email,'numberPhone':numberPhone, 'position': position},{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(function (res) {
            if (res.status == 201) {
                swal('Client created correctly', "", "success");
                drawTable();
            }
        })
        .catch(function (err) {
            console.log(err);
        })
});

window.onload = function(){
  loadClients();
  drawTable();
}

function loadClients(){
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    
   axios.get('http://localhost:4000/api/clients',{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(function(res) {
    if(res.status==200) {
        data = res.data;
        for(let i in data){
            jQuery('#clients').append(`<option value="${data[i]._id}">${data[i].name}</option>`);
        }
       
    }
    })
    .catch(function(err) {
    console.log(err);
    })
}

//load data of all contacts
var drawTable = function () {
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    axios.get('http://localhost:4000/api/contacts',{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    }).then(function (res) {
        if (res.status == 200) {
            console.log(res.data);
            var table = $("#contacts").DataTable({
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
                        data: 'client',
                        render: function (data) {
                            let nameCliet;
                            data.forEach(element => {
                                nameCliet=element.name;
                            });
                            return nameCliet;
                        }
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
                        data: 'email',
                        render: function (data) {
                            return data;

                        }
                    },
                    {
                        data: 'numberPhone',
                        render: function (data) {
                            return data;

                        }
                    },
                    {
                        data: 'position',
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
                order: [[1, 'desc']]
            });
            editC('#contacts', table);
             deleteC('#contacts', table);

        }
    })
        .catch(function (err) {
            console.log(err);
        });
}

//get one contact for id
function getContact(id){
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];

    axios.get(`http://localhost:4000/api/contacts/${id}`, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(function (res) {
        if (res.status == 200) {
            data = (res.data);           
            document.getElementById('name').value = data.name;
            document.getElementById('clients').value = data.client;
            document.getElementById('lastname').value = data.lastname;
            document.getElementById('numberPhone').value = data.numberPhone;
            document.getElementById('email').value = data.email;
            document.getElementById('position').value = data.position;
        }
        console.log(res);
    })
    .catch(function (err) {
        console.log(err);
    })
}

//call getContact and charge data in the inputs to update
var editC = function (tbody, table) {
    $(tbody).on("click", "button.edit", async function () {
        var dataTable = table.row($(this).parents("tr")).data();
        getContact(dataTable._id);
        $('#btnUpdateContact').attr('hidden',false)
        $('#btnSaveContact').attr('hidden',true)
    });
}

//call deleteClient and ask you want delete contact
var deleteC = function (tbody, table) {
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
              swal("Poof! Your contact has been deleted!", {
                icon: "success",
              });
              deleteClient(dataTable._id);

            } else {
              swal("Your contact is safe!");
            }
          });
        drawTable();
    });
}

//clear input and reset attr of buttons
$("#cancel").click(function (){
    $('#btnUpdateContact').attr('hidden',true)
    $('#btnSaveContact').attr('hidden',false)
    clearInput();
});

function clearInput(){
    document.getElementById('name').value= "";
    document.getElementById('clients').value = "";
    document.getElementById('lastname').value = "";
    document.getElementById('email').value = "";
    document.getElementById('position').value = "";
    document.getElementById('numberPhone').value = "";
}