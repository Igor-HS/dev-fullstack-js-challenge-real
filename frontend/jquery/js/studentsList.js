$(document).ready(function(){
    fetchStudentsList();
});

function fetchStudentsList(){
    fetch('http://localhost:3000/students/list')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        
        const table = $("#studentList tbody");
        data.map(function(student){
            table.append(`
                <tr>
                    <td>${student.ra}</td>
                    <td>${student.nome}</td>
                    <td>${student.cpf}</td>
                    <td>
                        <a href="studentManager.html?ra=${student.ra}">Editar</a>
                        <a href="#">Excluir</a>
                    </td>
                </tr>
            `);
        })

        $(".loader").hide("fast");
        $(".content-page").show("fast");
    });
}
