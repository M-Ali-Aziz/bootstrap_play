$(function() {
  //hide adminForm at DOMReady
  $(".adminForm").hide();
  //always getPages at DOMReady
  getPages();

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

    //hide all sections in main .row except .mySidebar
    $("main .row").children().not(".mySidebar").hide();
    //and show the section the link relates to
    $("."+classToShow).fadeIn(500);

    //if the user asked us to show the contentList, getPages() again.
    if (classToShow == "contentList") {
      getPages();
    }

    //stop link from behaving as it always does
    event.preventDefault();
  });

  function getPages(search_param) {
    $.ajax({
      url: "php/get_content.php",
      dataType: "json",
      data: {
        "search_param": search_param
      },
      success: listAllPages,
      error: function(data) {
        console.log("getPages error: ", data.responseText);
      }
    });
  }

  function listAllPages(data) {
    console.log("listAllPages success: ", data);
    $(".contentList table").children().not(".pageTableHeads").remove();
    for (var i = 0; i < data.length; i++) {
      var newTableRow = $("<tr/>");
      //append important page data to newTableRow
      newTableRow.append('<td><span class="badge">'+data[i].pid+"</span></td>");
      newTableRow.append('<td><strong>'+data[i].title+"</strong></td>");
      newTableRow.append('<td>'+data[i].user_id+"</td>");
      newTableRow.append('<td>'+data[i].created+"</td>");

      //append newTableRow to the contentList table
      $(".contentList table").append(newTableRow);
    }
  }

});









