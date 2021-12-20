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
    var inputDataDiv = document.getElementById("dataInput");
    var checked = queryCheckbox("attribute");

    for(i in checked){
        var inputText = document.createElement("input");
        inputText.setAttribute("type", "input");
        inputText.setAttribute("id", checked[i]);

        var inputLabel = document.createElement("label");
        inputLabel.appendChild(document.createTextNode(checked[i]));
        inputLabel.appendChild(inputText);
        inputLabel.appendChild(document.createElement("br"));

        inputDataDiv.appendChild(inputLabel);
    }

    var inputNewButton = document.getElementById("inputNewData");
    inputNewButton.style.display = "block";

}

docReady(function(){

    const attribute_submit = document.getElementById("attribute_submit");

    attribute_submit.addEventListener("click", function(){
        var checked = queryCheckbox("attribute");
        var categoricalBorder = document.getElementById("categorical_border")
        var categoricalDiv = document.getElementById("categoricalLabelDiv");
        removeAllChildNodes(categoricalDiv);

        //var kFormDiv = document.getElementById("KForm");
        //kFormDiv.style.display = "block";

        for(i in checked){
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("name", "categorical");
            checkbox.setAttribute("value", checked[i]);

            var label = document.createElement("label");
            label.appendChild(document.createTextNode("  " + checked[i]));

            categoricalDiv.appendChild(checkbox);
            categoricalDiv.appendChild(label);

            categoricalDiv.appendChild(document.createElement("br"));
        }

        categoricalBorder.style.display = "block";

        var categorical_title = document.getElementById("categorical_title");
        categorical_title.style.display = "block";

        var KForm = document.getElementById("KForm");
        KForm.style.display = "block";

    });

    var submitBtn = document.getElementById("categoricalButton");

    submitBtn.addEventListener("click", function(){
        var checkedAttr = [];
        var checkedLabel = [];
        var kValue = document.getElementById("inputK").value

        checkedAttr = queryCheckbox("attribute");
        checkedLabel = queryCheckbox("categorical");

        jsonData = {
            "clustering": 1,
            "k": kValue,
            "calc": 0,
            "scale": 0,
            "attribute": checkedAttr,
            "labeled": checkedLabel
        }

        xhr = new XMLHttpRequest();

        xhr.open('POST', '/dashboard/clustering', true);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

        xhr.onload = function(){
            if(xhr.status >= 200 && xhr.status < 400){
                console.log("Clustering success");
                var dataInput = document.getElementById("dataInput");
                removeAllChildNodes(dataInput);
                dataInput.style.display = "block";
                createInputElement();
            }else if(xhr.status != 200){
                alert("Request failed. returned status of " + xhr.status);
            }
        };

        xhr.send(JSON.stringify(jsonData));

    });

    const scaleButton = document.getElementById("categoricalButtonScale");

    scaleButton.addEventListener("click", function(){
        var checkedAttr = [];
        var checkedLabel = [];
        var kValue = document.getElementById("inputK").value

        checkedAttr = queryCheckbox("attribute");
        checkedLabel = queryCheckbox("categorical");
        
        jsonData = {
            "clustering": 1,
            "k": kValue,
            "calc": 0,
            "scale": 1,
            "attribute": checkedAttr,
            "labeled": checkedLabel
        }

        xhr = new XMLHttpRequest();

        xhr.open('POST', '/dashboard/clustering', true);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

        xhr.onload = function(){
            if(xhr.status >= 200 && xhr.status < 400){
                console.log("Clustering success");
                var dataInput = document.getElementById("dataInput");
                removeAllChildNodes(dataInput);
                dataInput.style.display = "block";
                createInputElement();
            }else if(xhr.status != 200){
                alert("Request failed. returned status of " + xhr.status);
            }
        };

        xhr.send(JSON.stringify(jsonData));

    });

    const refreshButton = document.getElementById("refreshImage");

    refreshButton.addEventListener("click", function(){
         document.getElementById("visImg").src = "/static/images/cluster_vis.png?" + new Date().getTime();
    });

    const inputNewButton = document.getElementById("inputNewData");

    inputNewButton.addEventListener("click", function(){
        var checked = queryCheckbox("attribute");
        var values = [];

        for(i in checked){
            values.push(document.getElementById(checked[i]).value);
        }

        jsonData = {
            "calc": 1,
            "values": values
        }

        xhr = new XMLHttpRequest();

        xhr.open('POST', '/dashboard/clustering', true);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

        xhr.onload = function(){
            if(xhr.status >= 200 && xhr.status < 400){
                console.log(this.response)
            }else if(xhr.status != 200){
                alert("Request failed. returned status of " + xhr.status);
            }
        };

        xhr.send(JSON.stringify(jsonData));

    });

});
