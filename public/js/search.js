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

function clicked_remove(ids, id)
{
    ids.splice(ids.indexOf(id), 1);
    if(ids.length==0)
    {
        window.location.href='/';
    }
    else {
        sendData('/search_test', {ingredients: ids});
    }
}

function get_recipe_page(missing_recp, id) {
    sendData('/recipe', {
        rec_id: missing_recp[id]['recipe_id'],
        ing: missing_recp[id]['ingredients_quantity'],
        missing: missing_recp[id]['missing_ingreds']
    })
}
