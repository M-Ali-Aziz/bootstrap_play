<?php

include_once("autoloader.php");

$cq = New ContentQueries("127.0.0.1","cms_example","root","mysql");

if (isset($_REQUEST["search_param"])) {
  echo(json_encode($cq->searchForPages($_REQUEST["search_param"])));
} else {
  echo(json_encode($cq->getAllPages()));
}