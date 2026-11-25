// IIFE (Immediately Invoked Function Expression), same as class
(function()
{
    function Start(){
        console.log("App started....");

        // Delete confirmation: find every Delete button (querySelectorAll, Ch 9)
        let deleteButtons = document.querySelectorAll('.btn-delete');

        for (let button of deleteButtons) {
            // Run this when a Delete button is clicked (addEventListener, Ch 9)
            button.addEventListener('click', function(event) {
                // confirm() shows OK / Cancel (Ch 8 slide 14)
                if (!confirm("Are you sure you want to delete this device?")) {
                    // Cancel: stop the link so nothing is deleted (preventDefault, Ch 9)
                    event.preventDefault();
                }
            });
        }
    }
    window.addEventListener("load", Start);
})();