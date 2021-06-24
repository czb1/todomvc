function bt2(){
    document.getElementById("subpage").style["opacity"]="1"
    document.getElementById("subpage").style["zIndex"]="999"
}

function bt1(){
    model.data.todos.forEach(todo => {
        todo.completed = true;
    }); 
    model.flush();
    update();
     
}

function buttt(){
    model.data.todos.forEach(todo => {
        todo.completed = false;
    }); 
    model.flush();
    update();
}


function bt3(){
    model.data.todos.forEach((todo, index) => {
        if(todo.completed){
            model.data.todos.splice(index, 1);
        }
        if(model.data.todos.length!=0 && model.data.todos[0].completed){
            model.data.todos.splice(0,1);  
        }
    model.flush();
    update();
    })

}


function subbt3(){
    document.getElementById("subpage").style["opacity"]="0"
    document.getElementById("subpage").style["zIndex"]="-100"
}

function subbt2(){
    let todoInput=document.getElementById("todo-input")
    let inputText = todoInput.value;
    if(inputText != ""){
        todoInput.value = "";       // 清空输入框
        var myDate = new Date();
        /* 在Model中添加一条todo */
        model.data.todos.push({
            content: inputText,
            time: myDate.getFullYear().toString()+"-"+(myDate.getMonth()+1).toString()+"-"+myDate.getDate().toString(),
            completed: false
        });

        model.flush();
        update();
        document.getElementById("subpage").style["opacity"]="0"
        document.getElementById("subpage").style["zIndex"]="-100"
    } else {
        alert("输入不能为空");
    }
    
   
}


window.model = {
    data: {
        todos: [
        ],
    }
}


function addt(todo,todoIndex,todoList){
    
    
    let todoGroup = document.createElement('div');
    todoGroup.classList.add('todo-group');
    todoGroup.setAttribute('id', "todo-" + todoIndex);
    
    let todog = document.createElement('div');
    todog.classList.add('tg');
    todog.setAttribute('id', "todo-tg" + todoIndex);
    
    let textP = document.createElement('p');
    textP.setAttribute('id', "todo-text-" + todoIndex);
    textP.classList.add("tdt");
    if(todo.completed){
        textP.classList.add('completed');
    }
    let textPt = document.createElement('p');
    textPt.setAttribute('id', "todo-time-" + todoIndex);
    textPt.classList.add("tdtt");
    let timg = document.createElement('p');
    timg.setAttribute('id', "todo-time-" + todoIndex);
    timg.classList.add("ti");
    if(todo.completed){
        timg.innerHTML="已完成"
    }
    else{
        timg.innerHTML="待完成"
    }
    var myDate = new Date();

    textPt.innerHTML=myDate.getFullYear().toString()+"-"+(myDate.getMonth()+1).toString()+"-"+myDate.getDate().toString()+"-"+myDate.getHours().toString()+":"+myDate.getMinutes().toString();
    textP.innerHTML = todo.content;
    
    todog.appendChild(textP);
    todog.appendChild(textPt);
    todoGroup.appendChild(todog);
    todoGroup.appendChild(timg);
    edittodo(textP,todoIndex,todo.content);
    tig(timg,todoIndex);
    todoList.insertBefore(todoGroup, todoList.firstElementChild);

}

function update() {
    let activeNum = 0;
    let todoList = document.getElementById("todos");
    todoList.innerHTML = '';

    model.data.todos.forEach((todo, todoIndex) => {
        if(!todo.completed){
            activeNum++;
        }
        addt(todo,todoIndex,todoList);
    
            
    });
    upcount(activeNum)
}
function upcount(activeNum){
    let todoCounter = document.getElementById('todocount');
    if(activeNum==0){
        document.getElementById('todocount').innerHTML="无待办事项";
    }
    else{
        todoCounter.innerHTML=activeNum.toString()+' '+"件待办事项"
    }

}

function tig(elem, index) {
    elem.addEventListener('touchend', function (event) {
            elem.parentNode.removeChild(elem);
            model.data.todos.splice(index, 1);
            model.flush();
            update();
    })
}
let editcontent='';
function edittodo(elem, index,content){
    elem.addEventListener('touchend', function (event) {
        editcontent=content;
        document.getElementById("edittodopage").style["opacity"]="1"
        document.getElementById("edittodopage").style["zIndex"]="999"
        
    })
}


(function(){
    if(!window.localStorage){
        alert("您的浏览器不支持Local Storage");
        return false;
    } else {
        let key = "todos";
        Object.assign(model, {
            init: function(callback){
                let data = window.localStorage.getItem(key);
                if(data){ 
                    model.data = JSON.parse(data);
                }
                if(callback) { callback(); }
            },
            flush: function(callback){
                window.localStorage.setItem(key, JSON.stringify(model.data));
                if(callback) { callback(); }
            }
        });
    }
})();


function fbt(){
    document.getElementById("findtodo").style["opacity"]="1"
    document.getElementById("findtodo").style["zIndex"]="999"

}



function find2(){
    while(findtag){
        var box=document.getElementById("clonetodo")
        box.remove();
        findtag--;
    }
    let todoInput=document.getElementById("find-input")
    let inputText = todoInput.value;
    let todoList = document.getElementById("todofind");
    let tag=0;
    if(inputText == ""){
        alert("输入不能为空");
    }
    if(inputText != ""){
        todoInput.value = "";    

        model.data.todos.forEach((todo, todoIndex) => {
            if(todo.time==inputText){
                tag=1;
                findtag++;
                console.log(todoIndex)
                todoGroup=document.getElementById("todo-" + todoIndex)
                var clonedNode = todoGroup.cloneNode(true);
                clonedNode.setAttribute("id", "clonetodo");
                todoList.insertBefore(clonedNode, todoList.firstElementChild);
            }
            if(todo.content==inputText){
                tag=1;
                findtag++;
                console.log(todoIndex)
                todoGroup=document.getElementById("todo-" + todoIndex)
                var clonedNode = todoGroup.cloneNode(true);
                clonedNode.setAttribute("id", "clonetodo");
                todoList.insertBefore(clonedNode, todoList.firstElementChild);
            }
            
        })
    if(tag==0){
        alert("未找到想要查找的todo")
    }

}
    }
let findtag=0;
function find1(){
    while(findtag){
        var box=document.getElementById("clonetodo")
        box.remove();
        findtag--;
    }
    document.getElementById("findtodo").style["opacity"]="0"
    document.getElementById("findtodo").style["zIndex"]="-100"

}

function editbt2(){
    
    let todoInput=document.getElementById("edit-input")
    let inputText = todoInput.value;
    if(inputText != ""){
        todoInput.value = "";       // 清空输入框
        model.data.todos.forEach((todo, todoIndex) => {
            if(todo.content==editcontent){
                todo.content=inputText
                editcontent=''
            }

        })
        model.flush();
        update();
        document.getElementById("edittodopage").style["opacity"]="0"
        document.getElementById("edittodopage").style["zIndex"]="-100"
    } else {
        alert("输入不能为空");
    }
}

function editbt3(){
    document.getElementById("edittodopage").style["opacity"]="0"
    document.getElementById("edittodopage").style["zIndex"]="-100"
}

window.onload = function(){
    
    model.init(function(){
        update();
    });
};