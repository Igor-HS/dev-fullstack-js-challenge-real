import React from "react";
import "./style.css";

class StudentListPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            studentsList: [],
        };
    }
    
    componentDidMount(){
        console.log("componentDidMount was called");
        this.fetchStudentsList();
    }

    fetchStudentsList = (searchQuery = "") => {
        /* $(".loader").show("fast");
        $(".content-page").hide("fast"); */
    
        fetch(`http://localhost:3006/students/list/${searchQuery}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({ studentsList: data });
            console.log(data);
            
            /* $(".loader").hide("fast");
            $(".content-page").show("fast"); */

        }).catch((error) =>{
            console.log(error);
            alert("Desculpe, mas não conseguimos estabelecer conexão com o nosso servidor");
        })
    }

    render(){
        console.log("Render was called");
        return (
            <div className="padding-left-right-20">
                <div className="top-actions">
                    <form id="formSearchStudent" className="form-search">
                        <input type="text" name="searchInput" id="searchInput"/>
                        <button>Pesquisar</button>
                    </form>
                    <a className="btn btn-dark" href="studentManager.html">Cadastrar Aluno</a>
                </div>
                <table id="studentList" className="table-list">
                    <thead>
                        <tr>
                            <th>Registro Acadêmico</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.studentsList.map(function(student){
                            return (
                                <tr>
                                    <td>{student.ra}</td>
                                    <td>{student.nome}</td>
                                    <td>{student.cpf}</td>
                                    <td>
                                        <a href={`studentManager.html?ra=${student.ra}`}>Editar</a>
                                        <a class="removeStudent" data-ra={student.ra} href="/#">Excluir</a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}



/* const StudentListPage = () => {

    return (

        <div className="padding-left-right-20">
            <div className="top-actions">
                <form id="formSearchStudent" className="form-search">
                    <input type="text" name="searchInput" id="searchInput"/>
                    <button>Pesquisar</button>
                </form>
                <a class="btn btn-dark" href="studentManager.html">Cadastrar Aluno</a>
            </div>
            <table id="studentList" className="table-list">
                <thead>
                    <tr>
                        <th>Registro Acadêmico</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                          
                </tbody>
            </table>
        </div>
    );
} */

export default StudentListPage;