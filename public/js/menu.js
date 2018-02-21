function showpage(idpage){
    //alert(idpage);

    if (idpage==0)
    {
        $("#home").show();
        $("#map_canvas").hide();
        $("#youtube").hide();
    }
    if (idpage==1)
    {
        $("#home").hide();
        $("#map_canvas").show();
        $("#youtube").hide();
    }
    if (idpage==2)
    {
        $("#home").hide();
        $("#map_canvas").hide();
        $("#youtube").show();
    }
}