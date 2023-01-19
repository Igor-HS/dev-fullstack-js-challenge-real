import React from "react";
import "./style.css";
import Loader from "../../shared/Loader";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';

class StudentListPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            studentsList: [],
            isLoading: true,
            formSearch: {
                searchInput: "",
            }
        };
    }
    
    componentDidMount(){
        this.fetchStudentsList();
    }


    onClickRemoveStudent = (ra) => {

        Swal.fire({
            title: 'Você realmente deseja excluir esse estudante?',
            text: "Você não será capaz de reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!'
          }).then((result) => {
            if (result.isConfirmed) {
                this.deleteStudent(ra);
            }
        })
    }

    deleteStudent = (ra) => {
        this.setState({isLoading: true});
        fetch(`http://localhost:3006/students/delete/${ra}`,{
                method:'DELETE'
            }).then((response)=>{
                return response.json();
            }).then((data)=>{

                Swal.fire({
                    icon: 'success',
                    title: 'Estudante excluído',
                    text: data.message,
                })

                this.fetchStudentsList();
            });
    }
        
    onSubmitFormSearch = (event) => {
        event.preventDefault();
        this.fetchStudentsList(event.target.searchInput.value);        
    }

    fetchStudentsList = (searchQuery = "") => {
        this.setState({isLoading: true});
    
        fetch(`http://localhost:3006/students/list/${searchQuery}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({ 
                studentsList: data,
                isLoading: false
            });

        }).catch((error) =>{
            console.log(error);
            alert("Desculpe, mas não conseguimos estabelecer conexão com o nosso servidor");
        })
    }

    render(){
        if(this.state.isLoading){
            return <Loader />;
        }


        return (
            <>
            <header className="main-header">
                <span>Lista de Alunos</span>
            </header>
            <div className="padding-left-right-20">            
                <div className="card">
                    <form onSubmit= { this.onSubmitFormSearch } id="formSearchStudent" className="form-search">
                        <input type="text" name="searchInput" id="searchInput"
                        placeholder="Pesquisar"
                        value={this.state.formSearch.searchInput}
                        onChange={(event)=>{
                            this.setState({
                                formSearch:{
                                    searchInput: event.target.value
                                }
                            })
                        }}
                        />
                        <button>Pesquisar</button>
                    </form>
                    <Link to="/student/add" className="btn btn-dark">
                    Cadastrar Aluno
                    </Link>
                </div>
                <div className="card">
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
                            {this.state.studentsList.map((student) => {
                                return (
                                    <tr key={student.ra}>
                                        <td>{student.ra}</td>
                                        <td>{student.nome}</td>
                                        <td>{student.cpf}</td>
                                        <td>
                                            <Link className="action-link" to={`/student/edit/${student.ra}`}>
                                                Editar
                                            </Link>
                                            <a className="removeStudent action-link" onClick={() => {this.onClickRemoveStudent(student.ra)}} href="/#">Excluir</a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            </>
        );
    }
}

export default StudentListPage;