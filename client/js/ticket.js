 function deleteTicket(id){
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    axios.delete(`http://localhost:4000/api/supportTicket/${id}`, {
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

$("#btnSaveTicket").click(function () {
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    
    var titleProblem = document.getElementById('titleProblem').value;
    var detailProblem = document.getElementById('detailProblem').value;
    var whoReportProblem = document.getElementById('whoReportProblem').value;
    var client = document.getElementById('client').value;
    var state = document.getElementById('state').value;
    
    axios.post('http://localhost:4000/api/supportTicket',{'titleProblem':titleProblem,'detailProblem':detailProblem,'whoReportProblem':whoReportProblem,'client':client,'state':state },{
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
    loadClients()
    drawTable()
}

var drawTable = function () {
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    
   axios.get('http://localhost:4000/api/supportTicket',{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(function(res) {
    if(res.status==200) {
        data = res.data;
        var table = $("#tickets").DataTable({
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
                    data: 'titleProblem',
                    render: function (data) {
                        return data;
                    }
                },
                {
                    data: 'detailProblem',
                    render: function (data) {
                        return data;
                    }
                },
                {
                    data: 'whoReportProblem',
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
                    data: 'state',
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
        editT('#tickets', table);
        deleteT('#tickets', table);
    }
    }).catch(function (err) {
        console.log(err);
    });
}
var editT = function (tbody, table) {
    $(tbody).on("click", "button.edit", async function () {
        var dataTable = table.row($(this).parents("tr")).data();
        console.log(dataTable);
    });
}

var deleteT = function (tbody, table) {
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
              swal("Poof! Your ticket file has been deleted!", {
                icon: "success",
              });
              deleteTicket(dataTable._id);

            } else {
              swal("Your ticket file is safe!");
            }
          });
        drawTable();
    });
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

