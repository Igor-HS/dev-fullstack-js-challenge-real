module.exports = class StudentsController {
    
    
    
    constructor(app){
        this.app = app;
    }

    listAction = (req, res) => {
        let query = this.app.database("students");

        let search = req.params.searchQuery;
        if(search){
            query.where("ra", search).orWhere("nome", "like", `%${search}%`).orWhere("cpf", search);

        }

        return query.select().then((data)=>{
            res.send(data);
        });
    }


    findAction = (req, res) => {
        return this.app.database("students").select().where({ra : req.params.ra }).first().then((response)=>{
            res.send(response);
          })
    }


    createAction = async (req,res) => {
        if(req.body.name == ""){
            return res.status(400).send({
              result: false,
              message: "O nome é um campo obrigatório!"
            });
          }
          if(req.body.email == ""){
            return res.status(400).send({
              result: false,
              message: "O email é um campo obrigatório!"
            });
          }
          if(req.body.ra == ""){
            return res.status(400).send({
              result: false,
              message: "O ra é um campo obrigatório!"
            });
          }
          if(req.body.cpf == ""){
            return res.status(400).send({
              result: false,
              message: "O cpf é um campo obrigatório!"
            });
          }
        
          // validando se é realmente inteiro
          if(parseInt(req.body.ra) != req.body.ra){
            return res.status(400).send({
              result: false,
              message: "O RA deve ser um numero inteiro!"
            });
          }
        
          if(parseInt(req.body.cpf) != req.body.cpf){
            return res.status(400).send({
              result: false,
              message: "O CPF deve ser um numero inteiro!"
            });
        
          }
          
          const userExists = await this.app.database("students").select().where({
            ra: req.body.ra
          }).first();
        
          if(userExists){
            return res.status(400).send({
              result: false,
              message: "Desculpe, mas já existe um estudante cadastrado com esse RA."
            })
          }
        
          console.log(userExists);
        
          return this.app.database("students").insert({
            nome: req.body.name,
            ra: req.body.ra,
            email: req.body.email,
            cpf: req.body.cpf,
          }).then((response)=>{
            if(response){
              res.send({
                result: true,
                message:`O estudante foi cadastrado com sucesso!`
              });
            }else{
              res.status(500).send({
                result: false,
                message:`Não foi possível cadastrar o estudante.`
              });
            }
          })

    }


    editAction = async (req,res) => {
        if(req.body.name == ""){
            return res.status(400).send({
              result: false,
              message: "O nome é um campo obrigatório!"
            });
          }
          if(req.body.email == ""){
            return res.status(400).send({
              result: false,
              message: "O email é um campo obrigatório!"
            });
          }
        
          const userFound = await this.app.database("students").select().where({ra: req.params.ra}).first();
        
          if(!userFound){
            return res.status(400).send({
              result: false,
              message: "O estudante informado não existe"
            })
          }
        
          const studentUpdate = await this.app.database("students").update({
            email: req.body.email,
            nome: req.body.name
          }).where({
            ra: req.params.ra
          });
        
          if(studentUpdate){
            res.send({
              result: true,
              message: "O estudante foi atualizado com sucesso!"
            });
          }else{
            res.status(500).send({
              result: false,
              message: "Desculpa, mas não conseguimos atualizar o estudante!"
            });
          }   
    }

    deleteAction = (req,res) => {
        return this.app.database("students").where({ra: req.params.ra}).del().then((response)=>{
            if(response){
              res.send({
                result: true,
                message:`O estudante #${req.params.ra} foi excluido com sucesso!`
              });
            }else{
              res.send({
                result: false,
                message:`Não foi possível excluir o estudante.`
              });
            }
        })
    }

}