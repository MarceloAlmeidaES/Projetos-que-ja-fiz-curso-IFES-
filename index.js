// IMPORTANDO BIBLIOTECAS E ARQUIVOS
const database = require("./db");
const Fornecedor = require("./models/fornecedor");

// CRIANDO SERVIDOR
const express = require("express");
const app = express();
const porta = 9443;
const bodyParser = require("body-parser");

// SETANDO OS VALORES DE VIEW E ENGINE
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// DEFININDO ROTAS
app.get("/", (req, res) => {
	res.render('formFornecedor');
});

app.post("/addfornecedor", function(req, res) {
	Fornecedor.create({
		nome: req.body.nome,
		telefone: req.body.telefone,
		email: req.body.email
	}).then(function() {
		res.render('sucessoFornecedor');
	});
});
app.listen(porta, () => {
	console.log("Servidor rodando");
});


(async () => {
	try {
		// const resultado = await database.sync();
		// console.log(resultado);
		const fornecedor = await Fornecedor.findAll();
		console.log("Lista de Fornecedores: \n", fornecedor);
	} catch (error) {
		console.log(error);
	}
})();