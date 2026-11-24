// IIFE (Immediately Invoked Function Expression), same as class
(function()
{
    function Start(){
        console.log("App started....");
    }
    window.addEventListener("load", Start);
})();