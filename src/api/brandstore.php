<?php

    include("../inc/dbconnCollection.php");
    $page=$_GET['page'];
    $start=$page*20;
    $sql="select * from store limit $start,20";
    $result=$mysqli->query($sql);
    if($result->num_rows>0){
        while($row=mysqli_fetch_assoc($result)){
            $list[]=$row;
        }
        $data["list"]=$list;
        $data["success"]=1;
    }else{
        $data["success"]=0;
    }
    echo json_encode($data)
?>