$("#btnSaveContact").click(function () {

    let sessionStorage = new SessionStorageDB('token');
    var token = sessionStorage.get()[0]['token'];
    
    var name = document.getElementById('name').value;
    var client = document.getElementById('client').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var numberPhone = document.getElementById('numberPhone').value;
    var position = document.getElementById('position').value;

    axios.post('http://localhost:4000/api/contacts',{'name':name,'client':client,'lastname':lastname,'email':email,'numberPhone':numberPhone, 'position': position},{
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
    
   axios.get('http://localhost:4000/api/contacts',{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(function(res) {
    if(res.status==200) {
        data = res.data;
        console.log(data);

        let table = document.getElementById('contacts');
        table.innerHTML = `
            <thead">
                <tr class="text-center">
                    <th style="display:none;">ID</th>
                    <th>Cliente</th>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Number Phone</th>
                    <th>Position</th>
                    <th>Actions</th>
                </tr>
            </thead><tbody>`;

            if (data.length == 0) {
				table.innerHTML += `Not found clients registered`
			} else {
				for (let item of data) {
					table.innerHTML += `<td>${item.client}</td>
                    <td>${item.name}</td>
                    <td>${item.lastname}</td>
                    <td>${item.email}</td>
                    <td>${item.numberPhone}</td>
                    <td>${item.position}</td>                    
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