function docReady(fn){
    if(document.readyState === "complete" || document.readyState === "interactive"){
        setTimeout(fn, 1);
    }else{
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function(){

    const submit_btn = document.getElementById("submit_btn");

    submit_btn.addEventListener("click", function(){

    })

});
