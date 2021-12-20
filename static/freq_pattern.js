function docReady(fn) {
    if(document.readyState === "complete" || document.readyState === "interactive"){
        setTimeout(fn, 1);
    }else{
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function(){

    const uploadButton = document.getElementById("upload_file");

    uploadButton.addEventListener("click", function(){
        const formData = new FormData(document.getElementById("upload_form"))
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/dashboard/frequent_pattern', true);

        xhr.onload = function(){
            if(xhr.status >= 200 && xhr.status < 400){
                console.log("success");
            }else if(xhr.status != 200){
                alert("Request failed. returned status of " + xhr.status);
            }
        }

        xhr.send(formData);

    });

    const inputParams = document.getElementById("paramsButton");

    var table = new gridjs.Grid({
        data: []
    }).render(document.getElementById("fpTable"));

    inputParams.addEventListener("click", function(){
        var confidence = document.getElementById("confidence").value;
        var min_sup = document.getElementById("min_sup").value;
        
        var jsonData = {
            "inputParams": 1,
            "confidence": confidence,
            "min_sup": min_sup
        }

        xhr = new XMLHttpRequest();

        xhr.open('POST', '/dashboard/frequent_pattern', true);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

        xhr.onload = function(){
            if(xhr.status >= 200 && xhr.status < 400){
                table.updateConfig({
                    columns: ['Itemset 1', 'Itemset 2', 'Confidence'],
                    data: JSON.parse(this.response)
                }).forceRender(); 
            }else if(xhr.status != 200){
                alert("Request failed. returned status of " + xhr.status);
            }
        }

        xhr.send(JSON.stringify(jsonData));

    });

});
