function docReady(fn) {
    if(document.readyState === "complete" || document.readyState === "interactive"){
        setTimeout(fn, 1);
    }else{
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function queryCheckbox(attributeName){
    var elems = document.querySelectorAll('[name='+attributeName+']');
    const checked = [];

    for(var i = 0; i < elems.length; i++){
        if(elems[i].checked){
            checked.push(elems[i].value);
        }
    }

    return checked;

}

function removeAllChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function createInputElement(){
    var inputDataDiv = document.getElementById("input_text");
    var checked = queryCheckbox("attribute");

    for(i in checked){
        var innerDiv = document.createElement("div");
        innerDiv.classList.add("flex", "items-center", "border-b", "border-red-500", "py-6");

        var inputLabel = document.createElement("label");
        inputLabel.appendChild(document.createTextNode(checked[i] + ": "));
        inputLabel.appendChild(document.createElement("br"));

        var inputText = document.createElement("input");
        inputText.setAttribute("type", "input");
        inputText.setAttribute("id", checked[i]);
        inputText.classList.add("ml-5", "focus:outline-none", "bg-white", "m-auto");

        innerDiv.appendChild(inputLabel);
        innerDiv.appendChild(inputText);

        inputDataDiv.appendChild(innerDiv);
    }

    /*
    var innerDiv = document.createElement("div");
    innerDiv.classList.add("flex", "items-center", "border-b", "border-red-500", "py-6");

    var inputLabel = document.createElement("label");
    inputLabel.appendChild(document.createTextNode("Prediction Result : "));
    inputLabel.appendChild(document.createElement("br"));

    var inputText = document.createElement("input");
    inputText.setAttribute("type", "input");
    inputText.setAttribute("id", "predResult");
    inputText.classList.add("ml-5", "focus:outline-none", "bg-white", "m-auto");

    innerDiv.appendChild(inputLabel);
    innerDiv.appendChild(inputText);

    inputDataDiv.appendChild(innerDiv);

*/
    var predResult_div = document.getElementById("predResult_div");
    predResult_div.style.display = "block";

}

docReady(function(){

    var ylabelButton = document.getElementById("ylabel_submit");

    ylabelButton.addEventListener("click", function(){
        var categoricalDiv = document.getElementById("categoricalLabelDiv");
        removeAllChildNodes(categoricalDiv);

        var ylabelChecked = document.getElementById("yLabel").value;
        var xlabelChecked = queryCheckbox("attribute");

        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "categorical");
        checkbox.setAttribute("value", ylabelChecked);

        var label = document.createElement("label");
        label.appendChild(document.createTextNode("  " + ylabelChecked));

        categoricalDiv.appendChild(checkbox);
        categoricalDiv.appendChild(label);
        categoricalDiv.appendChild(document.createElement("br"));

        /*
        for(i in ylabelChecked){
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("name", "categorical");
            checkbox.setAttribute("value", ylabelChecked[i]);

            var label = document.createElement("label");
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(ylabelChecked[i]));

            categoricalDiv.appendChild(label);
        }
        */

        for(i in xlabelChecked){
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("name", "categorical");
            checkbox.setAttribute("value", xlabelChecked[i]);

            var label = document.createElement("label");
            label.appendChild(document.createTextNode("  " + xlabelChecked[i]));

            categoricalDiv.appendChild(checkbox);
            categoricalDiv.appendChild(label);

            categoricalDiv.appendChild(document.createElement("br"));
        }

        categoricalDiv.style.display = "block";

        var categorical_border = document.getElementById("categorical_border");
        categorical_border.style.display = "block";

        var categorical_title = document.getElementById("categorical_title");
        categorical_title.style.display = "block";
        
        //var submitDiv = document.getElementById("train");
        //submitDiv.style.display = 'block';
        removeDiv = document.getElementById("input_text");
        removeAllChildNodes(removeDiv);
        createInputElement();

    });

    var submit = document.getElementById("Submit");

    submit.addEventListener("click", function(){

        var ylabelChecked = document.getElementById("yLabel").value;
        var xlabelChecked = queryCheckbox("attribute");
        var categoricalChecked = queryCheckbox("categorical");

        jsonData = {
            "input": 0,
            "classification": 1,
            "scale": 0,
            "x": xlabelChecked,
            "y": ylabelChecked,
            "categorical": categoricalChecked
        }

        xhr = new XMLHttpRequest();

        xhr.open('POST', '/dashboard/classification', true);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

        xhr.onload = function(){
            if(xhr.status >= 200 && xhr.status < 400){
                var dtlVis = document.getElementById("dtlVis");
                dtlVis.setAttribute("src", "/static/images/decision_tree.png");
                accuracy = document.getElementById("accuracyResult");
                accuracy.value = this.response;

                accuracyDiv = document.getElementById("accuracyResult_div");
                accuracyDiv.style.display = "block";

            }else if(xhr.status != 200){
                alert("Request failed. returned status of " + xhr.status);
            }
        }

        xhr.send(JSON.stringify(jsonData));

    });

    var inputNewData = document.getElementById("inputNewData");

    inputNewData.addEventListener("click", function(){

        var checked = queryCheckbox("attribute");
        var values = [];

        for(i in checked){
            values.push(document.getElementById(checked[i]).value);
        }

        console.log(values);

        jsonData = {
            "input": 1,
            "x": values
        }

        xhr = new XMLHttpRequest();

        xhr.open('POST', '/dashboard/classification', true);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

        xhr.onload = function(){
            if(xhr.status >= 200 && xhr.status < 400){
                var predResult = document.getElementById("predResult");
                predResult.value = this.response;
            }else if(xhr.status != 200){
                alert("Request failed. returned status of " + xhr.status);
            }
        };

        xhr.send(JSON.stringify(jsonData));

    });


    var refreshImg = document.getElementById("refreshImage");

    refreshImg.addEventListener("click", function(){
        console.log("WE");
        document.getElementById("dtlVis").src = "/static/images/decision_tree.png?" + new Date().getTime();
    });

});
