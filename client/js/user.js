/**
 * add user
 */
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
            }
        })
        .catch(function (err) {
            console.log(err);
        })
});

window.onload = function(){
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
        console.log(data);

        let table = document.getElementById('users');
        table.innerHTML = `
            <thead">
                <tr class="text-center">
                    <th style="display:none;">ID</th>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th>Username</th>
                    <th>Actions</th>
                </tr>
            </thead><tbody>`;

            if (data.length == 0) {
				table.innerHTML += `Not found users registered`
			} else {
				for (let item of data) {
					table.innerHTML += `<td>${item.name}</td>
                    <td>${item.lastname}</td>
                    <td>${item.username}</td>
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

