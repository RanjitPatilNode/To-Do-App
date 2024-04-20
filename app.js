const adduserBtn = document.getElementById("adduser");

const buttontext = adduserBtn.innerText;

const usernameTextField = document.getElementById("username");

const recordsDisplay = document.getElementById("records")

let userArray = []
let edit_id = null;

let objstr = localStorage.getItem("todo");
console.log(objstr);
if (objstr != null) {
    userArray = JSON.parse(objstr)
}
displaytodo();

adduserBtn.onclick = () => {
    const name = usernameTextField.value;
    if (edit_id != null) {
        userArray.splice(edit_id, 1, { 'name': name })
        edit_id = null;
    } else {

        userArray.push({ 'name': name })
    }
    // console.log(userArray)
    savetodo(userArray)
    usernameTextField.value = '';
    adduserBtn.innerText = buttontext
}
function savetodo(userArray) {
    let str = JSON.stringify(userArray);
    localStorage.setItem('todo', str)
    displaytodo();
}
function displaytodo() {
    let statment = '';
    userArray.forEach((user, i) => {
        statment += `
        <tr>
        <th scope="row">${i+1}</th>
           <td>${user.name}</td>
           <td> <i class="btn text-white fa fa-edit btn-info mx-2" onclick ='edittodo(${i})' ></i>
                <i class=" btn btn-danger text-white fa fa-trash" onclick = 'delettodo (${i})'></i> 
                </td>
           </tr>
        `
    });
    recordsDisplay.innerHTML = statment;
}
function edittodo(id) {
    edit_id = id;
    usernameTextField.value = userArray[id].name  
    adduserBtn.innerText = 'Save Changes';
}

function delettodo(id) {
    userArray.splice(id, 1);
    savetodo(userArray);
}