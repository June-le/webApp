<?php
    header('content-type:test/html;charset=utf-8');
    $mysqli = new mysqli('localhost','root','root','yunbiao');
    $mysqli->set_charset('utf8');
    if ($mysqli->connect_errno) {
        die();
    };
    $page = $_GET['page'];
    $sql = "select * from jingpai1";
    $result = $mysqli->query($sql);
    if($result->num_rows > 0){
        while($row = mysqli_fetch_assoc($result)){
            $data[] = $row;
        }
    }
    echo json_encode($data);
?>