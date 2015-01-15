$(function() {
  //hide adminForm at DOMReady
  $(".adminForm").hide();
  $(".mySidebar .nav a").click(function(event) {
    //remove .active class from other nav items,
    $(this).parent().siblings().removeClass("active");
    //and add it to my parent
    $(this).parent().addClass("active");

    /*
      $(this).attr("class") = contentListLink || adminFormLink;
    */
    var classToShow = $(this).attr("class").substr(0, $(this).attr("class").length-4);
    /*
      classToShow = contentList || adminForm;
    */
    console.log("classToShow: ", classToShow);
    //hide all sections in main .row except .mySidebar
    $("main .row").children().not(".mySidebar").hide();
    //and show the section the link relates to
    $("."+classToShow).fadeIn(500);

    //stop link from behaving as it always does
    event.preventDefault();
  });
});







