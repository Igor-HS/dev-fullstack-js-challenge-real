import "./style.css";
import {Link} from "react-router-dom";


const NotFoundPage = () => {
    
    return (
        <>
            <div className='content-page padding-left-right-20'>
                <h1>Error 404</h1>
                <p>Desculpe, mas não conseguimos encontrar a página que você solicitou!</p>
                <Link id="btnVoltarInicio" to="/" className='btn btn-warning margin-right-10'>VOLTAR AO INÍCIO</Link>
            </div>
        </>
    )
}

export default NotFoundPage;