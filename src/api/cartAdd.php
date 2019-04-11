<?php
include("../inc/dbconnming.php");
$id = $_POST["goodsID"];
$number = $_POST["goodsNum"];
echo $number;
$sql = "update car set num='$number' where id = '$id'";
$result = $mysqli->query($sql);
$aff=$mysqli->affected_rows;
 if($aff==1){
    $data["code"] = 1;
  }else{
    $data["code"] = 0;
  }
echo json_encode($data);
?>
