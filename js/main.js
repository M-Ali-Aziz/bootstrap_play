$(function() {



  /**
   * At DOMReady
   *
   */

  //hide adminForm immediately
  $(".adminForm").hide();
  //and getPages once
  getPages();



  /**
   * Submit && click handlers
   *
   */
   
  //navbar navbarSearchForm submitHandler
  $(".navbarSearchForm").submit(function() {
    //get search input field value
    var search_param = $(this).find('input[type="text"]').val();
    //and get pages with matching titles
    getPages(search_param);

    //return false to prevent page reload on form submit
    return false;
  });

  //adminForm form submitHandler
  $(".adminForm form").submit(function() {
    //prepare adminFormData to be sent with AJAX
    var adminFormData = {
      ":title" : $(this).find("#page_title").val(),
      ":body" : $(this).find("#page_body").val(),
      //":user_id" : 1 //this has been moved to PHP, 
      //keep user info in PHP for safety reasons
    };

    //send adminFormData with AJAX to DB
    insertNewPage(adminFormData);

    //empty the form once we're done with the information in it
    $(this).reset();

    //return false to prevent page reload on form submit
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
    //classToShow is always the same as $(this).attr("class") minus
    //the last four(4) characters (- "Link")
    var classToShow = $(this).attr("class").substr(0, $(this).attr("class").length-4);
    /*
      classToShow = contentList || adminForm;
    */

    //hide all sections in main .row except .mySidebar
    $("main .row").children().not(".mySidebar").hide();
    //and show the section the link relates to
    $("."+classToShow).fadeIn(500);

    //if the user asked us to show the contentList, 
    //getPages() again in case new content exists
    if (classToShow == "contentList") {
      getPages();
    }

    //stop link from behaving as it always does
    event.preventDefault();
  });



  /**
   * AJAX && DOM manipulation
   *
   */

  //function to getPages.
  function getPages(search_param) {
    $.ajax({
      url: "php/get_content.php",
      type: "get",
      dataType: "json",
      data: {
        //if search_param is NULL (undefined), the if-statement 
        //in get_content.php will be false
        "search_param": search_param
      },
      //on success, execute listAllPages function
      success: listAllPages,
      error: function(data) {
        console.log("getPages error: ", data.responseText);
      }
    });
  }

  //function to list pages
  function listAllPages(data) {
    console.log("listAllPages success: ", data);
    //remove all table rows in .contentList that does not 
    //have the .pageTableHeads class
    $(".contentList table tr").not(".pageTableHeads").remove();

    //and build new table rows from data
    for (var i = 0; i < data.length; i++) {
      //create new table row
      var newTableRow = $("<tr/>");
      //append important page data to newTableRow
      newTableRow.append('<td><span class="badge">'+data[i].pid+"</span></td>");
      newTableRow.append('<td><strong>'+data[i].title+"</strong></td>");
      newTableRow.append('<td>'+data[i].user_id+"</td>");
      newTableRow.append('<td>'+data[i].created+"</td>");

      //then append newTableRow to the contentList table
      $(".contentList table").append(newTableRow);
    }
  }

  //function to insert a new page into the DB
  function insertNewPage(adminFormData) {
    $.ajax({
      url: "php/save_content.php",
      type: "post",
      dataType: "json",
      data: {
        //this request must have data to get through the 
        //if-statement in save_content.php
        "page_data" : adminFormData
      },
      success: function(data) {
        console.log("insertNewPage success: ", data);
        //on success, click the .contentListLink class to
        //switch to the contentList and getPages again
        $(".contentListLink").click();
      },
      error: function(data) {
        console.log("insertNewPage error: ", data);
      }
    });
  }
});