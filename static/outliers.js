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

docReady(function(){
    
    var attribute_submit = document.getElementById("attribute_submit")

    attribute_submit.addEventListener("click", function(){

        var checked = document.getElementById("attribute").value;

        jsonData = {
            "outlier": 1,
            "attribute": checked
        }

        xhr = new XMLHttpRequest();
        xhr.open('POST', '/dashboard/outliers', true);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

        xhr.onload = function(){

            if(xhr.status >= 200 && xhr.status < 400){
                var response = JSON.parse(this.response);
                console.log(response);
                
                var lowest = document.getElementById("lowest");
                lowest.value = response["lowest"].toString();

                var highest = document.getElementById("highest");
                highest.value = response["highest"].toString();

                var outliersList = document.getElementById("outliers");
                outliersList.value = response["outliers"].join(", ");

            }else if(xhr.status != 200){
                alert("Request failed. returned status of " + xhr.status);
            }

        };

        xhr.send(JSON.stringify(jsonData));

    });

});
