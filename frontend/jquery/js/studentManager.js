$(document).ready(function(){

    if(isEditingMode()){
        setReadOnlyFields();
        fetchStudent();
    }else{
        $(".loader").hide("fast");
        $(".content-page").show("slow");
    }
    
    $("#studentForm").submit((event)=>{
        event.preventDefault();
        const body = {
            name: $(this).find("#name").val(),
            ra: $(this).find("#ra").val(),
            cpf: $(this).find("#cpf").val(),
            email:event.target.email.value
        };

        let methodEndpoint;
        let urlEndpoint;

        if(isEditingMode()){
            methodEndpoint = 'PUT';
            urlEndpoint = `http://localhost:3000/students/edit/${getRAFromURL()}`;
        }else{
            methodEndpoint = 'POST';
            urlEndpoint = "http://localhost:3000/students/save";
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
            document.location.href = 'studentsList.html';
        })        
    })    
});

function setReadOnlyFields(){
    const studentForm = $("#studentForm");
    studentForm.find("#ra").attr('readonly', true);
    studentForm.find("#ra").css('background-color', '#dddddd');
    studentForm.find("#cpf").attr('readonly', true);
    studentForm.find("#cpf").css('background-color', '#dddddd');

}

function fetchStudent(){
  
    fetch(`http://localhost:3000/students/find/${getRAFromURL()}`).then(function(response){
        return response.json();
    }).then(function(data){

        const studentForm = $("#studentForm");

        studentForm.find('#name').val(data.nome);
        studentForm.find('#email').val(data.email);
        studentForm.find('#ra').val(data.ra);
        studentForm.find('#cpf').val(data.cpf);

        $(".loader").hide("fast");
        $(".content-page").show("slow");
    })
    
}

function isEditingMode(){
    const urlSearch = new URLSearchParams(window.location.search);
    return urlSearch.has('ra');
}

function getRAFromURL(){
    const urlSearch = new URLSearchParams(window.location.search);
    return urlSearch.get('ra');
}