function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var noteCard = "note-";
var noteModifyCard = "note-modify-";

function openUpdateCard(id) {
  document.getElementById(noteCard.concat(String(id))).style.display = "none";
  document.getElementById(noteModifyCard.concat(String(id))).style.display = "flex";
}

function closeUpdateCard(id) {
  document.getElementById(noteCard.concat(String(id))).style.display = "flex";
  document.getElementById(noteModifyCard.concat(String(id))).style.display = "none";
}
var card = "card-"
var tituloOriginal = "title-"
var textoOriginal = "details-" 
var tituloModificado = "modify-card-title-";
var textoModificado = "modify-card-text-";
var method = "method=";
var id = "id=";
var title = "title=";
var details = "details=";

function getData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     console.log(this.responseText);
    }
  };
  xhttp.open("GET", "", true);
  xhttp.send();
}

function UpdateDoc(modId) {
  var xhttp = new XMLHttpRequest();
  var request = "";
  var spacedTitle;
  var spacedDetails;
  var stringId = String(modId);
  method = method.concat("UPDATE");
  id = id.concat(stringId)
  spacedTitle = String(document.getElementById(tituloModificado.concat(stringId)).value);
  spacedDetails = String(document.getElementById(textoModificado.concat(stringId)).value);
  title = title.concat(spacedTitle.replace(/ /g, "+"));
  details = details.concat(spacedDetails.replace(/ /g, "+"));
  request = request.concat(method, "&", id, "&", title, "&", details);
  console.log(title);
  console.log(details);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(tituloOriginal.concat(stringId)).innerHTML = spacedTitle;
      document.getElementById(textoOriginal.concat(stringId)).innerHTML = spacedDetails;
      closeUpdateCard(modId);
    }
  };
  console.log(request);
  xhttp.open("POST", "", true);
  xhttp.send(request);
}

function DeleteCard(modId) {
  var xhttp = new XMLHttpRequest();
  var request = "";
  var stringId = String(modId);
  method = method.concat("DELETE");
  id = id.concat(stringId);
  request = request.concat(method, "&", id);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(card.concat(stringId)).style.display = "none";
    }
  };
  console.log(request)
  xhttp.open("POST", "", true);
  xhttp.send(request);
}

document.addEventListener("DOMContentLoaded", function () {
  // Faz textarea aumentar a altura automaticamente
  // Fonte: https://www.geeksforgeeks.org/how-to-create-auto-resize-textarea-using-javascript-jquery/#:~:text=It%20can%20be%20achieved%20by,height%20of%20an%20element%20automatically.
  let textareas = document.getElementsByClassName("autoresize");
  for (let i = 0; i < textareas.length; i++) {
    let textarea = textareas[i];
    function autoResize() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }

    textarea.addEventListener("input", autoResize, false);
  }

  // Sorteia classes de cores aleatoriamente para os cards
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    card.className += ` card-color-${getRandomInt(
      1,
      5
    )} card-rotation-${getRandomInt(1, 11)}`;
  }
});
