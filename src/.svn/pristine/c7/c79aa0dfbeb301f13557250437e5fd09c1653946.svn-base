<?php

    include("../inc/dbconnCollection.php");
    $page=$_GET['page'];
    $start=$page*8;
    $sql="select * from tjgoods limit $start,8";
    $result=$mysqli->query($sql);
    if($result->num_rows>0){
        while($row=mysqli_fetch_assoc($result)){
            $sp[]=$row;
        }
        $data["goods"]=$sp;
        $data["success"]=1;
    }else{
        $data["success"]=0;
    }
    echo json_encode($data)
?>