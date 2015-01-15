<?php
//ContentQueries class extends PDOHelper, 
//aka gets all PDOHelpers methods
class ContentQueries extends PDOHelper {
  public function saveNewPage($page_data) {
    /*
      $page_data = array(
        ":title" => "String",
        ":body" => "String",
        ":user_id" => int,
      );
    */

    $sql = "INSERT INTO pages (title, body, user_id) VALUES (:title, :body, :user_id)";
    //since we are using prepared SQL statements, 
    //SQL and data is sent separately to the query method
    return $this->query($sql, $page_data);
  }

  public function getAllPages() {
    $sql = "SELECT * FROM pages";
    //since we are using prepared SQL statements, 
    //SQL and data is sent separately to the query method
    return $this->query($sql);
  }

  public function searchForPages($search_param) {
    $search_param = array(":search_param" => "%".$search_param."%");
    $sql = "SELECT * FROM pages WHERE title LIKE :search_param";
    //since we are using prepared SQL statements, 
    //SQL and data is sent separately to the query method
    return $this->query($sql, $search_param);
  }
}










