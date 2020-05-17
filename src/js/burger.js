
document.addEventListener('DOMContentLoaded', () =>{
    const burger = document.getElementsByClassName('submenu')[0]
    document.addEventListener('click', (event) => {
        
        if (event.target.id === "burger")  {
            if (burger.id === "submenu")  {
                burger.id = "submenu__active";
            } 
            else {
                burger.id = "submenu"; 
            }
        } 
        else  {
            burger.id = "submenu";
        }
    });
});