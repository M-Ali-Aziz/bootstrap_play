$(function() {
  //hide adminForm at DOMReady
  $(".adminForm").hide();
  //always getPages at DOMReady
  getPages();

  //navbar navbarSearchForm submitHandler
  $(".navbarSearchForm").submit(function() {
    var search_param = $(this).find('input[type="text"]').val();
    getPages(search_param);

    return false;
  });

  //adminForm form submitHandler
  $(".adminForm form").submit(function() {
    //prepare adminFormData to be sent with AJAX
    var adminFormData = {
      ":title" : $(this).find("#page_title").val(),
      ":body" : $(this).find("#page_body").val(),
      ":user_id" : 1
    };

    insertNewPage(adminFormData);

    //empty the form once we're done with the information in it
    $(this).reset();
    return false;
  });

  //sidebar nav clickhandler
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
      type: "get",
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

  function insertNewPage(adminFormData) {
    $.ajax({
      url: "php/save_content.php",
      type: "post",
      dataType: "json",
      data: {
        "page_data" : adminFormData
      },
      success: function(data) {
        console.log("insertNewPage success: ", data);
        $(".contentListLink").click();
      },
      error: function(data) {
        console.log("insertNewPage error: ", data);
      }
    });
  }

});









