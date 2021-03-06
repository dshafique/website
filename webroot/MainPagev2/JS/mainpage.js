var clicked = false;
function favorite(){
    var favorite = document.getElementById("favorite");
    if(clicked==false){
        favorite.style.color = "yellow";
        clicked = true;
    }else{
        favorite.style.color = "white";
        clicked = false;
    }
}


function displayFileUpload(){
    document.getElementById("file").setAttribute("style","visibility: visible");
}

var fileClose = document.getElementById("file-close");
fileClose.onclick = function(){
    document.getElementById("file").setAttribute("style","visibility: hidden");
}

document.getElementById("fileName").onchange = function(evt){
    var target = evt.target || window.event.srcElement, files =target.files;

    if(FileReader && files && files.length){
        var reader = new FileReader();
        reader.onload = function(){
            document.getElementById("profileImg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
        document.getElementById("file").setAttribute("style","visibility: hidden");
    }else{
        alert("File not supported"); 
    }
}
var view = {
    Title: "View Stars",
    Step1: "Get a telescope",
    Step2: "Set a viewing angle",
    Step3: "Look through the lense",
    Video: "../media/video/stars.mp4",
    Picture: "../media/images/stars.jpg"
};

function addItem(container, template) {
    container.append(Mustache.render(template, view));
};
  
/*This runs on start of the website.*/
$(() => {
    const tmpl = $('#project_template').html()
    const container = $('#activitySpace');
    for(let i=0; i<9; i++) { addItem(container, tmpl); }
});

//Get project data from a json format. This will eventually call the database that will return
//json data.
function getProjects() {
    var $deferredNotesRequest = $.getJSON("../data/testprojects.json", {format: "json"});
}

//when getProjects request is done render each of the project tiles.
$.when(getProjects()).done(function(response){
    var $projects = response.projectProperties //projectProperties is the name in the json file.
    $projects.forEach(function(item){
        createProject(item.project);
    });
});

