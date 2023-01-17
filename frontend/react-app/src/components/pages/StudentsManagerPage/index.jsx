import "./style.css"
import { useState } from "react";
import Loader from "../../shared/Loader";
import {Link, Navigate} from "react-router-dom";

const StudentManagerPage = () => {

    const [isRedirect, setIsRedirect] = useState(false);
    const [isLoading, updateIsLoading] = useState(false);

    const [name, updateName] = useState("");
    const [email, updateEmail] = useState("");
    const [cpf, updateCpf] = useState("");
    const [ra, updateRa] = useState("");

    const isEditingMode = () => {
        return false;
    }

    const getRAFromURL = () => {
        return 0;
    }


    const onSubmitForm = (event) => {
    
        event.preventDefault();
        const body = {
            name,
            ra,
            cpf,
            email
        };

        let methodEndpoint;
        let urlEndpoint;

        if(isEditingMode()){
            methodEndpoint = 'PUT';
            urlEndpoint = `http://localhost:3006/students/edit/${getRAFromURL()}`;
        }else{
            methodEndpoint = 'POST';
            urlEndpoint = "http://localhost:3006/students/save";
        }

        fetch(urlEndpoint, {
            method: methodEndpoint,
            body: JSON.stringify(body),
            headers : {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            alert(data.message);
            if(data.result){
                setIsRedirect(true);
            }
            
        })
    }

    if(isRedirect){
        return <Navigate to="/" />;
    }

    if(isLoading){
        return <Loader/>;
    }

    return (
        <>
        <header className="main-header">
            Cadastrar/Editar Aluno
        </header>
        
        <div className="content-page padding-left-right-20"> 
            <form id="studentForm" className="form" action="" method="post"
            onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input required type="text" name="name" id="name" value={name}
                    placeholder="Digite o seu nome"
                    onChange={(event)=>{
                        updateName(event.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input required type="email" name="email" id="email" value={email}
                    placeholder="Digite o seu email"
                    onChange={(event)=>{
                        updateEmail(event.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="ra">RA</label>
                    <input required type="number" name="ra" id="ra" value={ra}
                    placeholder="Digite o seu ra"
                    onChange={(event)=>{
                        updateRa(event.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="cpf">CPF</label>
                    <input required type="number" name="cpf" id="cpf" value ={cpf}
                    placeholder="Digite o seu cpf"
                    onChange={(event)=>{
                        updateCpf(event.target.value);
                    }}/>
                </div>
                <div className="actions">
                    <Link to="/" className="btn btn-warning margin-right-10">
                        Cancelar
                    </Link>
                    <button className="btn">Salvar</button>
                </div>
            </form>         
        </div>
        </>
    )
    
}

export default StudentManagerPage;