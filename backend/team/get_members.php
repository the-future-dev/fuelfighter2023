<?php
require_once '../core/connect.php';


$year = $_GET["year"];
$group = $_GET["group"];

if($group == "Marketing " && $year == 2023){
  $group = "Marketing & Finance";
}

// write sql query to get members per year
$result = $conn->query("SELECT members.firstname,members.lastname, member_in_team.position_description, members.image, members.email, members.study, members.linkedin, members.year FROM(members 
INNER JOIN (member_in_team INNER JOIN teams ON member_in_team.team_id = teams.team_id)  
ON members.member_id=member_in_team.member_id) WHERE teams.year = $year AND teams.name = '$group'order by member_in_team.order asc");


$members = [];
while($row = $result->fetch_assoc()) {
    $members[] = $row; 
  }

echo json_encode($members);

