
document.addEventListener('DOMContentLoaded', () =>{
    document.addEventListener('click', function(e){
        if (e.target.id === "burger")
        {
            if (document.getElementsByClassName('submenu')[0].id === "submenu")
            {
                document.getElementsByClassName('submenu')[0].id = "submenu__active";
            }
            else{
                document.getElementsByClassName('submenu')[0].id = "submenu"; 
            }
        }
        else{
            document.getElementsByClassName('submenu')[0].id = "submenu";
        }
    });
});