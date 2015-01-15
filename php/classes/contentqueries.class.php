<?php

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
    return $this->query($sql, $page_data);
  }

  public function getAllPages() {
    $sql = "SELECT * FROM pages";
    return $this->query($sql);
  }

  public function searchForPages($search_param) {
    $search_param = array(":search_param" => "%".$search_param."%");
    $sql = "SELECT * FROM pages WHERE title LIKE :search_param";
    return $this->query($sql, $search_param);
  }
}










