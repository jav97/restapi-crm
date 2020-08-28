$("#btnSaveClient").click(function () {

    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    var name = document.getElementById('name').value;
    var legalCertificate = document.getElementById('legalCertificate').value;
    var webSite = document.getElementById('webSite').value;
    var address = document.getElementById('address').value;
    var numberPhone = document.getElementById('numberPhone').value;
    var sector = document.getElementById('sector').value;

    axios.post('http://localhost:4000/api/supportTicket',{'name':name,'legalCertificate':legalCertificate,'webSite':webSite,'address':address,'numberPhone':numberPhone, 'sector': sector},{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(function (res) {
            if (res.status == 201) {
                swal('Client created correctly', "", "success");
            }
        })
        .catch(function (err) {
            console.log(err);
        })
});

window.onload = function(){
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
        console.log(data);

        let table = document.getElementById('tickets');
        table.innerHTML = `
            <thead">
                <tr class="text-center">
                    <th style="display:none;">ID</th>
                    <th>Title Problem</th>
                    <th>Details</th>
                    <th>Who Report Problem?</th>
                    <th>Client</th>
                    <th>State</th>
                    <th>Actions</th>
                </tr>
            </thead><tbody>`;

            if (data.length == 0) {
				table.innerHTML += `Not found tickets registered`
			} else {
				for (let item of data) {
					table.innerHTML += `<td>${item.titleProblem}</td>
                    <td>${item.detailProblem}</td>
                    <td>${item.whoReportProblem}</td>
                    <td>${item.client.name}</td>
                    <td>${item.state}</td>
                    <td><button class="btn btn-info" id="${item._id}"> <i class="fas fa-edit"></i></button> </td>
                    <td><button class="btn btn-danger" id="${item._id}"> <i class="fas fa-trash"></i></button> </td>`;
                }
                table.innerHTML += `</tbody>`;
			}
    }
    console.log(res);
    })
    .catch(function(err) {
    console.log(err);
    })
}