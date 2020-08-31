 //delete support ticket
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
            drawTable();
        }
        console.log(res);
    })
    .catch(function (err) {
        console.log(err);
    })
 }
// save support ticket
$("#btnSaveTicket").click(function () {
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    
    var titleProblem =     document.getElementById('titleProblem').value;
    var detailProblem =    document.getElementById('detailProblem').value;
    var whoReportProblem = document.getElementById('whoReportProblem').value;
    var client =           document.getElementById('client').value;
    var state =            document.getElementById('state').value;
    
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

// load all data of tickets
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

//load one tickets for id
function getTicket(id){
    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];

    axios.get(`http://localhost:4000/api/supportTicket/${id}`, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(function (res) {
        if (res.status == 200) {
            data = (res.data);           
            document.getElementById('titleProblem').value = data.titleProblem;
            document.getElementById('detailProblem').value = data.detailProblem;
            document.getElementById('whoReportProblem').value = data.whoReportProblem;
            document.getElementById('client').value = data.client;
            document.getElementById('state').value = data.state;
        }
        console.log(res);
    })
    .catch(function (err) {
        console.log(err);
    })
}

//call getTicket and charge data in the inputs to update
var editT = function (tbody, table) {
    $(tbody).on("click", "button.edit", async function () {
        var dataTable = table.row($(this).parents("tr")).data();
        getTicket(dataTable._id);
        $('#btnUpdateTicket').attr('hidden',false)
        $('#btnSaveTicket').attr('hidden',true)
    });
}
//call deleteTickets
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

//load clients to select
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

function clearInput(){
    document.getElementById('titleProblem').value = "";
    document.getElementById('detailProblem').value = "";
    document.getElementById('whoReportProblem').value = "";
    document.getElementById('client').value = "";
    document.getElementById('state').value = "";
}

//changes atrr of buttons
$("#cancel").click(function (){
    $('#btnUpdateTicket').attr('hidden',true)
    $('#btnSaveTicket').attr('hidden',false)
    clearInput();
});