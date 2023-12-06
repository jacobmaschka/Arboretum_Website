// Function to load data from an XML file
function loadXMLDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myParser(this);
        }
    };
    xhttp.open("GET", "1.xml", true);
    xhttp.send();
}

loadXMLDoc();


// Array to store data about trees
var treeData = [];

// Function to parse the XML and extract tree data
function myParser(xml) {
    var xmlDoc = xml.responseXML;
    var items = xmlDoc.getElementsByTagName("ThemeEntityAbridgedData");

    for (var i = 0; i < items.length; i++) {
        var displayName = items[i].getElementsByTagName("DisplayName")[0].innerHTML;
        var entityId = items[i].getElementsByTagName("EntityId")[0].innerHTML;
        var imagePath = items[i].getElementsByTagName("DefaultImagePath")[0].innerHTML;
        
        treeData.push({
            name: displayName,
            id: entityId,
            image: imagePath
        });
    }
}


// Variable to track the current selection index in the suggestions
var currentSelectionIndex = -1;

// Event listener for the DOM content loaded event
document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');
    // Event listener for input event on the search bar
    searchInput.addEventListener('input', function(event) {
        updateSuggestions(this.value);
    });

    // Event listener for keydown events to handle navigation and selection in the suggestions
    searchInput.addEventListener('keydown', function(event) {
        var suggestionsDiv = document.getElementById('suggestions');
        var suggestions = Array.from(suggestionsDiv.getElementsByTagName('div'));

        // Event handling for the Enter key
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the form from being submitted

            // Check if a suggestion is highlighted, then select it
            if (currentSelectionIndex >= 0 && suggestions[currentSelectionIndex]) {
                suggestions[currentSelectionIndex].click();
            } else {
                // If no suggestion is highlighted, check if the input matches a tree name
                var exactMatch = treeData.find(function(tree) {
                    return tree.name.toLowerCase() === searchInput.value.toLowerCase();
                });

                // If there's an exact match, display its details
                if (exactMatch) {
                    displayDetails(exactMatch);
                }
            }
        } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            // Handling arrow key navigation in the suggestions list
            event.preventDefault(); // Prevent the default input behavior
            var move = event.key === "ArrowDown" ? 1 : -1;
            currentSelectionIndex = (currentSelectionIndex + move + suggestions.length) % suggestions.length;
            highlightSelection(suggestions, currentSelectionIndex);
        }


    });
});


// Function to update the suggestions based on the input
function updateSuggestions(input) {
    var filteredData = treeData.filter(function(tree) {
        return tree.name.toLowerCase().includes(input.toLowerCase());
    });

    displaySuggestions(filteredData);
}


// Function to display the suggestions
function displaySuggestions(suggestions) {
    var suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    suggestions.forEach(function(suggestion, index) {
        var div = document.createElement('div');
        div.textContent = suggestion.name;
        // Click event for each suggestion to display its details
        div.onclick = function() {
            document.getElementById('searchInput').value = suggestion.name;
            suggestionsDiv.style.display = 'none';
            displayDetails(suggestion);
        };
        suggestionsDiv.appendChild(div);
    });

    suggestionsDiv.style.display = suggestions.length > 0 ? 'block' : 'none';
}


// Function to display the details of a selected tree
function displayDetails(tree) {
    document.getElementById('suggestions').style.display = 'none';
    
    var detailsDiv = document.getElementById('treeDetailsSearch');
    detailsDiv.innerHTML = '';

    var nameElement = document.createElement('h3');
    nameElement.textContent = tree.name + " (ID: " + tree.id + ")";

    saveTree(tree.id)
}


// Function to highlight the current selection in the suggestions list
function highlightSelection(suggestions, index) {
    suggestions.forEach(function(suggestion, idx) {
        suggestion.classList.toggle('highlighted', index === idx);
    });
    // Scroll the highlighted suggestion into view
    if (suggestions[index]) {
        suggestions[index].scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
}


// If the search bar is empty, hide the suggestions div
document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('searchInput');
    var suggestionsDiv = document.getElementById('suggestions');

    searchInput.addEventListener('input', function () {
        // Check if the input value is empty
        if (searchInput.value.trim() == '') {
            // Set the display property of the suggestions div to "none"
            suggestionsDiv.style.display = 'none';
        } 
    });
});


// Sams javascript code
let txt3
let txt4
let txt2
let txt
let txt5
let treeid

function unhide(alphabetLoc){
    
    
    if(document.getElementById(alphabetLoc).style.display == "inline"){

        document.getElementById(alphabetLoc).style.display = "none"

    }
    else{
        document.getElementById(alphabetLoc).style.display = "inline"
    }


}

function loadXMLDoc1(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Action to be performed when the document is read;

            myParser2(this)
            

        }
    };
    xhttp.open("GET", "1.xml", true);
    xhttp.send();
}


function loadXMLDoc2(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Action to be performed when the document is read;

            showtree(this)

        }
    };
    xhttp.open("GET", "1.xml", true);
    xhttp.send();
}


function loadXMLDoc3(id){

    var xhttp = new XMLHttpRequest();
    var urlPart1 = id
    var urlPart2 = ".xml"
    var treeUrl = urlPart1.concat(urlPart2)

    xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {
            // Action to be performed when the document is read;

            treeDetails(this)
            

        }
        else{

            txt3 = ""
            document.getElementById("treeDetails").innerHTML = txt3
            txt4 = ""



        }

    };
    xhttp.open("GET", "treeXmls/"+treeUrl, true);
    xhttp.send();
}

function treeDetails(xml3){


    xmlDoc3 = xml3.responseXML

    x3 = xmlDoc3.getElementsByTagName("AttributeValuesData")
    x4 = xmlDoc3.getElementsByTagName("ResourceData")
    x5 = xmlDoc3.getElementsByTagName("LocationData")
    

    for(i=0; i < x3.length; i++)
    {
        
        if(x3[i].childNodes[2].innerHTML == "1") {

            txt3 += "<dl>" + "<dt>" + x3[i].childNodes[0].innerHTML + "</dt>" + "<dd>" + "Yes" + "</dd>" + "</dl>"

        }
        else if(x3[i].childNodes[2].innerHTML == "0"){

            txt3 += "<dl>" + "<dt>" + x3[i].childNodes[0].innerHTML + "</dt>" + "<dd>" + "No" + "</dd>" + "</dl>"

        }
        else{

            txt3 += "<dl>" + "<dt>" + x3[i].childNodes[0].innerHTML + "</dt>" + "<dd>" + x3[i].childNodes[2].innerHTML + "</dd>" + "</dl>"

        }

    }

    document.getElementById("treeDetails").innerHTML = txt3

    for(i=0; i < x4.length; i++){

        if(x4[i].childNodes[5].innerHTML == "Image"){

            txt4 += "<img id = currentTreeimg src =" + x4[i].childNodes[3].innerHTML +  ">"

        }


    }
    if(txt4 == ""){

        txt4 = "<p id = noimgText>This tree has no additional images</p>"


    }

    txt5 = x5[0].childNodes[3].innerHTML.toLowerCase().replace(/[\[\]']+/g,'')
    
}

function currentTreeimgButton(){

    document.getElementById("treeInfo").innerHTML = ""
    document.getElementById("treeDetails").innerHTML = txt4
    document.getElementById("currentTreeButtonimg").disabled = true
    document.getElementById("currentTreeButtonimg").style.opacity = "0.33"
    document.getElementById("currentTreeButtonimg").style.cursor = "auto"
    document.getElementById("currentTreeButtonDetails").disabled = false
    document.getElementById("currentTreeButtonDetails").style.opacity = "100"
    document.getElementById("currentTreeButtonDetails").style.cursor = "pointer"
    document.getElementById("map").innerHTML = ""
    document.getElementById("map").style.display = "none"
    document.getElementById("currentTreeButtonLocation").disabled = false
    document.getElementById("currentTreeButtonLocation").style.opacity = "100"
    document.getElementById("currentTreeButtonLocation").style.cursor = "pointer"

}

function currentTreeDetailsButton(){

    currentTreeButtonsReset()
    document.getElementById("treeInfo").innerHTML = txt2
    document.getElementById("treeDetails").innerHTML = txt3
    document.getElementById("currentTreeButtonDetails").disabled = true
    document.getElementById("currentTreeButtonDetails").style.opacity = "0.33"
    document.getElementById("currentTreeButtonDetails").style.cursor = "auto"

}

function currentTreeLocationButton(){

    initMap(txt5)
    document.getElementById("treeInfo").innerHTML = ""
    document.getElementById("treeDetails").innerHTML = ""
    document.getElementById("map").style.display = "block"
    document.getElementById("currentTreeButtonLocation").disabled = true
    document.getElementById("currentTreeButtonLocation").style.opacity = "0.33"
    document.getElementById("currentTreeButtonLocation").style.cursor = "auto"
    document.getElementById("currentTreeButtonDetails").disabled = false
    document.getElementById("currentTreeButtonDetails").style.opacity = "100"
    document.getElementById("currentTreeButtonDetails").style.cursor = "pointer"
    document.getElementById("currentTreeButtonimg").disabled = false
    document.getElementById("currentTreeButtonimg").style.opacity = "100"
    document.getElementById("currentTreeButtonimg").style.cursor = "pointer"


}


function currentTreeButtonsReset(){


    document.getElementById("currentTreeButtonimg").disabled = false
    document.getElementById("currentTreeButtonimg").style.opacity = "100"
    document.getElementById("currentTreeButtonimg").style.cursor = "pointer"
    document.getElementById("currentTreeButtonDetails").disabled = true
    document.getElementById("currentTreeButtonDetails").style.opacity = "0.33"
    document.getElementById("currentTreeButtonDetails").style.cursor = "auto"
    document.getElementById("map").innerHTML = ""
    document.getElementById("map").style.display = "none"
    document.getElementById("currentTreeButtonLocation").disabled = false
    document.getElementById("currentTreeButtonLocation").style.opacity = "100"
    document.getElementById("currentTreeButtonLocation").style.cursor = "pointer"


}


function saveTree(id){

    treeid = id
    loadXMLDoc2()
    loadXMLDoc3(treeid)
    document.body.style.overflow = "hidden"
    document.getElementById("myForm").style.display = "block"
    document.getElementById("footer").style.display = "none"
    currentTreeButtonsReset()
}

function showtree(xml2){

    xmlDoc2 = xml2.responseXML

    txt2 = ""

    x2 = xmlDoc2.getElementsByTagName("ThemeEntityAbridgedData")

    for(i=0; i < x2.length; i++)
    {

        if(x2[i].childNodes[2].innerHTML == treeid){

            if(x2[i].childNodes[0].innerHTML == ""){

                txt2 += "<img id = treeimg src = stockTree.jpg >"

            }
            else{

                txt2 += "<img id = treeimg src =" + x[i].childNodes[0].innerHTML +  ">"

            }

            document.getElementById("treeInfo").innerHTML = txt2
            
            // handles if an unexpected error occurs when loading the tree image.
            treeImg = document.getElementById("treeimg")
            treeImg.addEventListener("error", function(event){

                event.target.src = "stockTree.jpg"
                event.onerror = null

            })

            break
        }
        

    }

}


function myParser2(xml){

    xmlDoc = xml.responseXML

    txt = ""

    x = xmlDoc.getElementsByTagName("ThemeEntityAbridgedData")
    

    for(i=0; i < x.length; i++)
    {

        txt = ""

        switch(x[i].childNodes[1].innerHTML.charAt(0)){

            case "A":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentA").innerHTML += txt
                break
            
            case "B":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentB").innerHTML += txt
                break
            
            case "C":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentC").innerHTML += txt
                break

            case "D":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentD").innerHTML += txt
                break
            
            case "E":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentE").innerHTML += txt
                break
            
            case "F":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentF").innerHTML += txt
                break
            
            case "G":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentG").innerHTML += txt
                break
            
            case "H":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentH").innerHTML += txt
                break
            
            case "I":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentI").innerHTML += txt
                break

            case "J":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentJ").innerHTML += txt
                break
            
            case "K":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentK").innerHTML += txt
                break
            
            case "L":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentL").innerHTML += txt
                break
            
            case "M":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentM").innerHTML += txt
                break
            
            case "N":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentN").innerHTML += txt
                break
            
            case "O":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentO").innerHTML += txt
                break

            case "P":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentP").innerHTML += txt
                break
            
            case "Q":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentQ").innerHTML += txt
                break
            
            case "R":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentR").innerHTML += txt
                break
            
            case "S":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentS").innerHTML += txt
                break
            
            case "T":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentT").innerHTML += txt
                break
            
            case "U":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentU").innerHTML += txt
                break

            case "V":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentV").innerHTML += txt
                break
            
            case "W":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentW").innerHTML += txt
                break
            
            case "X":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentX").innerHTML += txt
                break    

            case "Y":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentY").innerHTML += txt
                break
            
            case "Z":
                txt += "<button id = trees" + " onclick= saveTree("+ "'" + x[i].childNodes[2].innerHTML + "'" +")>" + x[i].childNodes[1].innerHTML + "</button>"
                document.getElementById("contentZ").innerHTML += txt
                break  
            
        }

    }

}


// some of this code comes from google maps api documentation
function initMap(cord) {

    var objcord = JSON.parse(cord)

    var numlat = Number(objcord.lat)
    var numlng = Number(objcord.lng)

    var macc = {lat:numlat,lng:numlng}

    var map = new google.maps.Map(

        document.getElementById("map"), {zoom: 20, center: macc});

    var marker = new google.maps.Marker({position: macc, map: map});

    map.setMapTypeId("satellite")
    map.setOptions({scrollwheel:true})
    

  }

// some of this code comes from w3Schools how to Popup form

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.body.style.overflow = "auto"
    document.getElementById("footer").style.display = "block"
  }
