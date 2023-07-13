var checked_ings=[];
var arrayValue=[];
var flag=0;
var data = {"key": "aFAknt50EpAJXjeHRwutBVUpT8W2Tcj8",};




async function get_ingredients() {
    const response = await fetch('https://crifapi.amoghsingh.repl.co/ingredients', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    });
    var resp = await response.json();
    return resp;
}


async function searchFunction() {
    if (flag==0) {
        arrayValue = await get_ingredients();
        flag=1;
    }

    document.getElementById('showResponse').innerHTML = '';
    const input_text= document.getElementById('1').value.toLowerCase();

    var response = [];
    var searchValue= input_text.split(',');
    searchValue.forEach(async function(search_str) {

    if (search_str !== '') {
        response =response.concat( arrayValue.filter(({name}) => name.toLowerCase().includes(search_str)));
    }
    });
    console.log(response);
    response.forEach(function (ing) {
        var check_flag = '';
        if (checked_ings.includes(ing['ID'])) {
            check_flag = 'checked';

        }
        let render_body = `<div
  class="my-component"
  style="
    position: relative;
    height: 33px;
    overflow: visible;
    margin: 10px;
    margin-left: 0px;
  "
>
  <div
    
    style="
      left: 0px;
      top: 0px;
      position: absolute;
      overflow: visible;
      width: 57px;
      white-space: nowrap;
      text-align: left;
      font-family: Segoe UI;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      color: rgba(112, 112, 112, 1);
    "
  >
    <span class="${ing['ID']}">${ing['name']}</span>

  </div>
  <input type="checkbox" id="${ing['ID']}" ${check_flag} onclick="clickedcheck(${ing['ID']})" class="check_ing" style="float: right; height: 30px; width: 30px; outline-width: 22px; font-size: 22px;">

</div>
`
        document.getElementById('showResponse').innerHTML += render_body;
    })
}

function del_item(item_id,id) {
    document.getElementById(item_id).remove();
    if(document.getElementById(item_id)!=null)
    {
        document.getElementsByClassName(item_id).checked=false;
    }
    checked_ings.splice(checked_ings.indexOf(id),1);
    searchFunction();
}

function clickedcheck(id) {
    var elem = document.getElementById(id);
    var item_id, name;
    if (elem.checked) {
        checked_ings.push(id);
        document.getElementById('1').value='';
        name = document.getElementsByClassName(id);
        name = name[0].innerHTML;
        item_id = id + name;
        let checkbox_item = `<div class="inst px-4 remove_ing" id="${item_id}" style="margin: 10px"><p class="inst-data"><button  onclick="del_item('${item_id}',${id})" style="border: none"><i class="fas fa-times"></i></button>  ${name}</p></div>`
        var checklist = document.getElementById('ingredient_list');
        checklist.innerHTML += checkbox_item;
        searchFunction();
    } else {
        checked_ings.pop(id);
        name = document.getElementsByClassName(id);
        name = name[0].innerHTML;
        item_id = id + name;
        document.getElementById(item_id).remove();

    }
}




function sendData(path, parameters, method='post') {

    const form = document.createElement('form');
    form.method = method;
    form.action = path;
    document.body.appendChild(form);

    for (const key in parameters) {
        const formField = document.createElement('input');
        formField.type = 'hidden';
        formField.name = key;
        formField.value = parameters[key];

        form.appendChild(formField);
    }
    form.submit();
}

function search_recipe(){
    sendData('/search_test',{'ingredients':Array(checked_ings)});
}

