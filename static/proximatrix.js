function docReady(fn) {
    if(document.readyState === "complete" || document.readyState === "interactive"){
        setTimeout(fn, 1);
    }else{
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function(){

    const trainSelect = document.getElementById("trainSelect");

    trainSelect.addEventListener("click", function(){
        const checked = [];
        var elems = document.querySelectorAll('[name=attribute]');

        for (var i = 0; i < elems.length; i++){
            if(elems[i].checked){
                checked.push(elems[i].value);
            }
        }

        var jsonData = {
            "exec": 0,
            "scaling": 0,
            "attributes": [],
            "startendnum": []
        }

        for (var i = 0; i < checked.length; i++){
            jsonData["attributes"].push(checked[i]);
        }

        xhr = new XMLHttpRequest();

        xhr.open('POST', '/dashboard/proximity_matrix', true);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8')

        xhr.onload = function(){
            if(xhr.status >= 200 && xhr.status < 400){
                console.log("Success");
            }else if(xhr.status != 200){
                alert("Request failed. returned status of " + xhr.status);
            }
        };

        xhr.send(JSON.stringify(jsonData));

    });

    const trainPCA = document.getElementById("trainScaling")

    trainPCA.addEventListener("click", function(){
        const checked = [];
        var elems = document.querySelectorAll('[name=attribute]');

        for (var i = 0; i < elems.length; i++){
            var isChecked = elems[i].checked;

            if(elems[i].checked){
                checked.push(elems[i].value);
            }
        }
        
        var jsonData = {
            "exec": 0,
            "scaling": 1,
            "attributes": [],
            "startendnum": []
        }

        for (var i = 0; i < checked.length; i++){
            jsonData["attributes"].push(checked[i]);
        }

        xhr = new XMLHttpRequest();

        xhr.open('POST', '/dashboard/proximity_matrix', true);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8')

        xhr.onload = function(){
            if(xhr.status >= 200 && xhr.status < 400){

                console.log("Success");

            }else if(xhr.status != 200){
                alert("Request failed. returned status of " + xhr.status);
            }
        };

        xhr.send(JSON.stringify(jsonData));

    });

    const rangeButton = document.getElementById("rangeButton");

    var table = new gridjs.Grid({
        data: []
    }).render(document.getElementById("proxi_table"));

    rangeButton.addEventListener("click", function(){

        var firstNum = document.getElementById("firstRange").value;
        var lastNum = document.getElementById("lastRange").value;

        var jsonData = {
            "exec": 1,
            "scaling": -1,
            "attributes": [],
            "startendnum": [firstNum, lastNum]
        }

        console.log(jsonData)

        xhr = new XMLHttpRequest();

        xhr.open('POST', '/dashboard/proximity_matrix', true);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.responseType = 'json';

        xhr.onload = function(){
            if(xhr.status >= 200 && xhr.status < 400){
                table.updateConfig({
                    data: this.response,
                    resizeable: true
                }).forceRender();
                /* var table = new gridjs.Grid({
                    data: this.response
                }).render(document.getElementById("proxi_table")); */
            }else if(xhr.status != 200){
                alert("Request failed. returned status of " + xhr.status);
            }
        };

        xhr.send(JSON.stringify(jsonData));

    });
    
    const clearButton = document.getElementById("clearTable");

    clearButton.addEventListener("click", function(){
        table.updateConfig({
            data: []
        }).forceRender();
    });

});
