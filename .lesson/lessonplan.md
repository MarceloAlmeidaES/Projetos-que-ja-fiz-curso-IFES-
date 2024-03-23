Códificação
--------------------------
Demais arquivos(cliente e db) são os mesmos da prática das aulas anteriores da semana.

fornecedor.js 
deve ser colocado dentro da pasta models
-----------------------


const Sequelize = require('sequelize');
const database = require('../db');

const Fornecedor = database.define('fornecedor', {
id: {
type: Sequelize.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey: true
},

nome: {
type: Sequelize.STRING,
allowNull: false
},
telefone: {
type: Sequelize.STRING,
allowNull: false
},
email:{
type: Sequelize.STRING,
allowNull:false
}
});
module.exports = Fornecedor;

--------------------------
formFornecedor.html 
deve ser colocado dentro da pasta views
-----------------------

<!DOCTYPE html>
<html>

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
<title>Cadastro de Fornecedores</title>

</head>

<body>
<center><H4><p>Cadastro de Fornecedores</p></h4></center>

<form action="/addfornecedor" method="POST">
<div class="row justify-content-center">
<div class="col-8">
<label for="nome2" class="form-label">Nome:</label>
<input type="text" name="nome" class="form-control" id="nome">
</div>
<div class="col-8">
<label for="telefone" class="form-label">Telefone</label>
<input type="text" name="telefone" class="form-control" id="telefone">
</div>
<div class="col-8">
<label for="email" class="form-label">Email:</label>
<input type="text" name="email" class="form-control" id="email">
</div>
<div class="col-8">
<button type="submit" class="btn btn-primary">Cadastrar</button>
</div>
</div>
</form>
</body>
</html>

--------------------------
index.js 

-----------------------

// importando bibliotecas e arquivos
const database = require('./db');
const Cliente = require('./models/cliente');

//Atividade Prática
const Fornecedor = require('./models/fornecedor');

/// criando o servidor
const express = require('express');
const app = express();
const porta = 9443;
const bodyParser = require('body-parser');
// Setar os valores da view e engine
app.set('view engine','html');
app.engine('html',require('ejs').renderFile);
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));


// Definindo rotas
app.get('/', (req, res) =>{
res.send('Bem vindo ao cadastro de clientes.');
});

app.get("/cadcliente",function(req, res){
res.render('formCliente');
})

app.post("/addcliente", function(req, res){
Cliente.create({
nome: req.body.nome,
nascimento: req.body.nascimento,
cidade: req.body.cidade,
telefone: req.body.telefone
}).then(function(){
res.send("Cliente cadastrado com sucesso!");
})
})

//definindo rotas da atividade prática
app.get("/cadfornecedor",function(req, res){
res.render('formFornecedor');
})

app.post("/addfornecedor", function(req, res){
Fornecedor.create({
nome: req.body.nome,
telefone: req.body.telefone,
email: req.body.email
}).then(function(){
res.send("Fornecedor cadastrado com sucesso!");
})
})

app.listen(porta, () => { console.log('Servidor rodando') });


(async () => {

try {
const resultado = await database.sync();
console.log(resultado);
const fornecedores = await Fornecedor.findAll();
console.log("Lista de Fornecedores \n", fornecedores);
} catch (error) {
console.log(error);
}
})();