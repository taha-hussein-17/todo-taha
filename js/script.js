window.onload = function () {
    document.querySelector("#todo-text").focus()
}

/* Metthod for add todo  */
let addTodo = () => {
    let todoText = document.getElementById('todo-text').value;
    if (todoText != '') {
        setData(todoText); // handler for adding item into local storage
        listTodo(); // handler for showing item from local storage
        document.querySelector("#todo-text").focus()
        document.querySelector("#todo-text").value = ""
    } else {

        document.getElementById('todo-text').placeholder = "ي عم اكتب اي حاجة متبقاش اهبل !"
    }
}

/* handler for print todo  */
let listTodo = () => {
    let html = ``;
    let data = getData(); // handler for getting item from local storage
    if (data) {
        html += `<ol>`;
        data.forEach((value, item
        ) => {
            let daate = window.Date()
            html += `<li class = '  ' style = 'display: block;
                        padding: 0px 10px 10px 10px;
                        '>
                ${value} 
                &nbsp;&nbsp;&nbsp;
                    <button class= 'col-2' style =
                    '   float: right;
                    overflow: hidden;
                        padding: 4px 10px;
                        border-radius: 4px;
                        background-color: #e91e63;
                        color: #ffff;
                        font-weight: bold;
                        font-size: 14px;
                    '
                        onclick="removeData(${item})">Remove
                    </button> <span class = 'span'>${daate}</span></li>`;
        });
        html += `</ol>`;

    }
    document.getElementById('todo-item').innerHTML = html;
}

/* handler for get todo  */
let getData = (item = null) => {
    /*
    * localStorage.getItem(<itemname>) main method 
    * (predefined method of js) for getting item from localstorage
    */
    let data = JSON.parse(localStorage.getItem('mytodo'));
    if (data) {

        if (item) {
            if (data.indexOf(item) != -1) {
                return data[item];
            } else {
                return false;
            }
        }
        return data;
    }
    return false;
}

listTodo(); // call print handler for showing data into list 

/* handler for set data/item todo  */
let setData = (item) => {
    if (getData(item) != false) {
        document.getElementById('todo-text').placeholder = "   !! ي عم موجود قبل كدا"
    } else {
        let data = getData(); // call getdata handler for getting  data from list 
        data = (data != false) ? data : [];
        data.push(item);
        data = JSON.stringify(data);
        /*
        * localStorage.setItem(<itemname>,<itemvalue>) main method 
        * (predefined method of js) for set item into localstorage
        */
        localStorage.setItem('mytodo', data);
    }
}

/* handler for remove item from localstorage */
let removeData = (itemId) => {
    let data = getData();
    if (data) {
        let newData = data.filter((v, i) => { return i != itemId });
        newData = JSON.stringify(newData);
        localStorage.setItem('mytodo', newData);
        listTodo();
    } else {
        alert("no data found");
    }

}

