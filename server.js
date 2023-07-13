

var express = require('express');
const path = require('path');
const ejs = require('ejs');
var app = express();
var data_send=require('./public/js/index.js')


app.use(express.urlencoded());
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('/public'));
app.use(express.static('public/js'));
app.use(express.static('public/js'));
app.use(express.static('public/images'));
app.use(express.static('public/css'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', async function (req, res) {
    res.render('pages/page1');
});

app.post('/get_ingreds', async (req, res) => {
    res.json({ingredients: await get_ingredients()});
});

app.get('/recipe_all', async (req, res) => {
    var resp = await all_recipe();

    res.render('pages/all_recipe', {resp:resp});
});

app.post("/search_test", async function (req, res) {
    var inp = req.body.ingredients;
    inp=inp.split(',')
    var a;
    for (a in inp ) {
        inp[a] = parseInt(inp[a], 10);
    }
    var resp = await search_ingredient(inp);
    var ingredients = await get_ingredients();
    res.render('pages/page2', {inp: inp, all_ing: ingredients, resp:resp,data_send:data_send, temp:JSON.stringify(resp) });
    return resp;
});

app.get('/recipe', async function (req, res) {
    var id = req.query.id;
    var recipe = await get_recipe(id);
    res.render('pages/page3', {id:id, recipe: recipe});
});


app.listen(8080);
console.log('Server started at http://localhost:' + 8080);

var data = {"key": "aFAknt50EpAJXjeHRwutBVUpT8W2Tcj8",};
var fetch = require('node-fetch');
const {request} = require("express");



async function get_ingredients() {
    const response = await fetch('https://crifapi.theabhay27.repl.co/ingredients', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    });
    var resp = await response.json();
    return resp;
}

async function get_recipe(id) {
    var data = {"key": "aFAknt50EpAJXjeHRwutBVUpT8W2Tcj8",};
    var fetch = require('node-fetch');
    data["id"] = id;
    const response = await fetch('https://crifapi.theabhay27.repl.co/recipe_get', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    });
    var resp = await response.json();
    delete data["id"];
    return resp;
}

async function all_recipe() {
    const response = await fetch('https://crifapi.theabhay27.repl.co/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    var resp = await response.json();
    return resp;
}

async function testing() {
    var ing={"ingredients":[1,2,3,4,5,6,7,8,9,10,11,12,13]};
    const response = await fetch('http://localhost:8080/search_test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ing),
    })
    return response;
}

async function search_ingredient(ingred) {
    data["ingredients"] = ingred;
    const response = await fetch('https://crifapi.theabhay27.repl.co/search_ingred', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    });
    var resp = await response.json();
    delete data["ingredients"];
    return resp;

}

