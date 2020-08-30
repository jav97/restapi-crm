function deleteMeeting(id) {
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    axios.delete(`http://localhost:4000/api/meetings/${id}`, {
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

$("#btnSaveMeetings").click(function () {
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];

    var title =     document.getElementById('title').value;
    var date =      document.getElementById('date').value.trim();
    var hour =      document.getElementById('hour').value.trim();
    var user =      document.getElementById('users').value;
    var isVirtual = document.getElementById('isVirtual').value;
    var client =    document.getElementById('client').value;

    axios.post('http://localhost:4000/api/meetings',{'title':title,'date':date,'hour':hour,'user':user,'isVirtual':isVirtual, 'client': client},{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(function (res) {
            if (res.status == 201) {
                swal('Meeting created correctly', "", "success");
                drawTable();
                clearInput();
            }
        })
        .catch(function (err) {
            console.log(err);
        })
});

window.onload = function(){
    loadClients();
    loadUsers();
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
            jQuery('#client').append(`<option value="${data[i]._id}">${data[i].name}</option>`);
        }    
    }
    })
    .catch(function(err) {
    console.log(err);
    })
}
function loadUsers(){
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    
   axios.get('http://localhost:4000/api/users',{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(function(res) {
    if(res.status==200) {
        data = res.data;
        for(let i in data){
            jQuery('#users').append(`<option value="${data[i]._id}">${data[i].name}</option>`);
        }
       
    }
    })
    .catch(function(err) {
    console.log(err);
    })
}

var drawTable = function () {
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    
   axios.get('http://localhost:4000/api/meetings',{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(function(res) {
    if(res.status==200) {
        data = res.data;
        var table = $("#meetings").DataTable({
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
                    data: 'title',
                    render: function (data) {
                        return data;
                    }
                },
                {
                    data: 'date',
                    render: function (data) {
                        return data;
                    }
                },

                {
                    data: 'hour',
                    render: function (data) {
                        return data;

                    }
                },
                {
                    data: 'user',
                    render: function (data) {
                        let nameUser;
                        data.forEach(element => {
                            nameUser=element.name;
                        });
                        return nameUser;
                    }
                },
                {
                    data: 'isVirtual',
                    render: function (data) {
                        return data;

                    }
                },
                {
                    data: 'client',
                    render: function (data) {
                        let nameClient;
                        data.forEach(element => {
                            nameClient=element.name;
                        });
                        return nameClient;
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
        editM('#meetings', table);
        deleteM('#meetings', table);

        }
    })
        .catch(function (err) {
            console.log(err);
        });
}

var editM = function (tbody, table) {
    $(tbody).on("click", "button.edit", async function () {
        var dataTable = table.row($(this).parents("tr")).data();
        console.log(dataTable);
    });
}

var deleteM = function (tbody, table) {
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
              swal("Poof! Your meeting file has been deleted!", {
                icon: "success",
              });
              deleteMeeting(dataTable._id)
            } else {
              swal("Your meeting file is safe!");
            }
          });
        drawTable();
    });
}

function clearInput(){
    document.getElementById('date').value = "";
    document.getElementById('title').value = "";
    document.getElementById('users').value = "";
    document.getElementById('hour').value = "";
    document.getElementById('client').value = "";
    document.getElementById('isVirtual').value = "";
}