<?php
    $host = 'db.mitchellansems.nl';
    $username = 'u4959p13800_dbuser';
    $password = 'ts6ICcJ2MO';
 
// Create connection
$conn = new mysqli($host, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";
?>