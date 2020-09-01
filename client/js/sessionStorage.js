function SessionStorageDB(name){
    let DB = (sessionStorage.getItem(name)) ? JSON.parse(sessionStorage.getItem(name)) : [];

    return {
        get: () => {
            return DB;
        },
        push: (obj) => {
            DB.push(obj);
            sessionStorage.setItem(name, JSON.stringify(DB));
        },
        set: (colection) => {
            DB = colection;
            sessionStorage.setItem(name, JSON.stringify(DB));
        },
        delete: () => {
            DB = [];
            sessionStorage.setItem(name, JSON.stringify(DB));
        },
        deleteById: (id) => {
            let result = DB.filter(users => users.id != id);
            sessionStorage.setItem(name, JSON.stringify(result));
        }
    }
}


function logout(){
    let sessionStorage = new SessionStorageDB('token');
    sessionStorage.delete();
    location.href = "/"
}