//delete Client
function deleteClient(id) {
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    axios.delete(`http://localhost:4000/api/clients/${id}`, {
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

//add client
$("#btnSaveClient").click(function () {
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    var name = document.getElementById('name').value;
    var legalCertificate = document.getElementById('legalCertificate').value;
    var webSite = document.getElementById('webSite').value;
    var address = document.getElementById('address').value;
    var numberPhone = document.getElementById('numberPhone').value;
    var sector = document.getElementById('sector').value;

    axios.post('http://localhost:4000/api/clients', { 'name': name, 'legalCertificate': legalCertificate, 'webSite': webSite, 'address': address, 'numberPhone': numberPhone, 'sector': sector }, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(function (res) {
            if (res.status == 201) {
                swal('Client created correctly', "", "success");
                drawTable();  
                clearInput();              
            }
        })
        .catch(function (err) {
            console.log(err);
        })
});

window.onload = function () {
    drawTable();
}

//draw table with all clients
var drawTable = function () {
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    axios.get('http://localhost:4000/api/clients', {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    }).then(function (res) {
        if (res.status == 200) {
            var table = $("#clients").DataTable({
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
                        data: 'legalCertificate',
                        render: function (data) {
                            return data;
                        }
                    },

                    {
                        data: 'webSite',
                        render: function (data) {
                            return data;

                        }
                    },
                    {
                        data: 'address',
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
                        data: 'sector',
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
            editC('#clients', table);
            deleteC('#clients', table);

        }
    })
        .catch(function (err) {
            console.log(err);
        });
}

function getClient(id){
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];

    axios.get(`http://localhost:4000/api/clients/${id}`, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(function (res) {
        if (res.status == 200) {
            data = (res.data);
            document.getElementById('name').value = data.name;
            document.getElementById('webSite').value = data.webSite;
            document.getElementById('legalCertificate').value = data.legalCertificate;
            document.getElementById('numberPhone').value = data.legalCertificate;
            document.getElementById('address').value = data.address;
            document.getElementById('sector').value = data.sector;
        }
        console.log(res);
    })
    .catch(function (err) {
        console.log(err);
    })
}

//call getClient and charge data in the inputs to update
var editC = function (tbody, table) {
    $(tbody).on("click", "button.edit", async function () {
        var dataTable = table.row($(this).parents("tr")).data();
        getClient(dataTable._id);
        $('#btnUpdateClient').attr('hidden',false)
        $('#btnSaveClient').attr('hidden',true)
        console.log(dataTable);
    });
}

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
              swal("Poof! Your client has been deleted!", {
                icon: "success",
              });
              deleteClient(dataTable._id);

            } else {
              swal("Your client is safe!");
            }
          });
        drawTable();
    });
}
//clear input and reset attr of buttons
$("#cancel").click(function (){
    $('#btnUpdateClient').attr('hidden',true)
    $('#btnSaveClient').attr('hidden',false)
    clearInput();
});

function clearInput(){
    document.getElementById('name').value = "";
    document.getElementById('legalCertificate').value = "";
    document.getElementById('webSite').value = "";
    document.getElementById('address').value = "";
    document.getElementById('numberPhone').value = "";
    document.getElementById('sector').value = "";
}