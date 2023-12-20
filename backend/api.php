<?php
$servername = "localhost";
$username = "root";
$password = ""; 
$database = "slproject";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");

require 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// GET Search
function fetchDataSearch() {
  global $conn;
  $searchQuery = isset($_GET['search']) ? $_GET['search'] : '';

  if (!empty($searchQuery)) {
    $sql = "SELECT transactions.*, categories.sale_category_name 
            FROM transactions
            INNER JOIN categories ON transactions.sale_category_id = categories.sale_category_id
            WHERE sale_vehicles_number LIKE '%$searchQuery%'";
  } else {
    header('Content-Type: application/json');
    echo json_encode([]);
    return;
  }

  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
      $data = [];
      while ($row = $result->fetch_assoc()) {
          $data[] = $row;
      }
      $json_data = json_encode($data);
      header('Content-Type: application/json');
      echo $json_data;
  } else {
      header('Content-Type: application/json');
      echo json_encode([]);
  }
}

//GET REPORTS

function fetchMonthlySalesData() {
  error_log("fetchMonthlySalesData() blev kaldt.");
  global $conn;
  $fromDate = isset($_GET['fromDate']) ? $_GET['fromDate'] : '';
  $toDate = isset($_GET['toDate']) ? $_GET['toDate'] : '';


  if (empty($fromDate) || empty($toDate)) {
    header('Content-Type: application/json');
    echo json_encode([]);
    return;
  }

  $fromDate = date('Y-m-d', strtotime($fromDate));
  $toDate = date('Y-m-d', strtotime($toDate));

  $sql = "SELECT DATE_FORMAT(sale_date, '%Y-%m-%d') AS month, COUNT(sale_transaktion_id) AS sales_count
  FROM transactions
  WHERE sale_date BETWEEN '$fromDate' AND '$toDate'
  GROUP BY month
  ORDER BY month";
  $result = $conn->query($sql);


  if ($result->num_rows > 0) {
    $data = [];
    while ($row = $result->fetch_assoc()) {
      $data[$row['month']] = $row['sales_count'];
    }
  
    header('Content-Type: application/json');
    echo json_encode(['fromDate' => $fromDate, 'toDate' => $toDate, 'result' => $data]);
 }  else {
      header('Content-Type: application/json');
    echo json_encode(['fromDate' => $fromDate, 'toDate' => $toDate, 'result' => []]); 
  }
}

// POST Data
function handlePostRequest() {
  global $conn;

  $rawData = file_get_contents("php://input");
  $data = json_decode($rawData);

   $sale_date = $data->sale_date;
  $sale_time = $data->sale_time;
  $sale_category_id = $data->sale_category_id;
  $sale_item = $data->sale_item;
  $sale_quantity = $data->sale_quantity;
  $sale_price = $data->sale_price;
  $sale_total = $data->sale_total;
  $sale_paid = $data->sale_paid;
  $sale_balance = $data->sale_balance;
  $sale_vehicles_number = $data->sale_vehicles_number;

  $sql = "INSERT INTO transactions (sale_date, sale_time, sale_item, sale_category_id, sale_quantity, sale_price, sale_total, sale_paid, sale_balance, sale_vehicles_number) VALUES ('$sale_date', '$sale_time', '$sale_item', '$sale_category_id', '$sale_quantity', '$sale_price', '$sale_total', '$sale_paid', '$sale_balance', '$sale_vehicles_number')";

  if ($conn->query($sql) === TRUE) {
    $response = ["message" => "Data added."];
    echo json_encode($response);
  } else {
    $response = ["error" => "Error: " . $conn->error];
    echo json_encode($response);
  }
}
  

//LOGIN

function handleLoginRequest() {
  global $conn;

  $rawData = file_get_contents("php://input");
  $data = json_decode($rawData);

  if (!isset($data->email) || !isset($data->password)) {
    echo json_encode(array("error" => "Manglende e-mail eller adgangskode"));
    return;
  }

  $email = $data->email;
  $password = $data->password;
  $sql = "SELECT * FROM users WHERE user_email = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $email);
  $stmt->execute();

  $result = $stmt->get_result();

  if ($result->num_rows == 1) {
    $user = $result->fetch_assoc();

    if ($user !== null && password_verify($password, $user['user_password'])) {
      $key = "b95a43b6-ab91-4370-98ba-e808cf898735";
      $kid = "22a0ea6f-f0f3-4581-93b5-b3fa8dc65d1d";
      $now = time();
      $expires = $now + 3600;

      $payload = array(
        "user_id" => $user['user_id'],
        "user_name" => $user['user_name'],
        "user_email" => $user['user_email'],
        "kid" => $kid
      );

      $token = JWT::encode($payload, $key, 'HS256');

      echo json_encode(array("token" => $token));
    } else {
      error_log("Forkert adgangskode for bruger med e-mail: " . $email);
      echo json_encode(array("error" => "Forkert adgangskode"));
    }
  } else {
    error_log("Bruger blev ikke fundet for e-mail: " . $email);
    echo json_encode(array("error" => "Bruger blev ikke fundet"));
  }
}


// GET userdata
/* function fetchUserData() {
  global $conn;
  $token = getBearerToken();
  $key = "b95a43b6-ab91-4370-98ba-e808cf898735";
  error_log($key);
  error_log($token);
  if ($token) {
    $decoded = JWT::decode($token, $key, ['HS256']); // Brug korrekt format for at specificere algoritmen

    print_r($decoded);
    $user_id = $decoded->user_id;
    $sql = "SELECT user_id, user_name, user_email FROM users WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();

    $result = $stmt->get_result();
    error_log(print_r($result, true)); 
    if ($result->num_rows == 1) {
      $user = $result->fetch_assoc();
      echo json_encode($user);
    } else {
      echo json_encode(array("error" => "Bruger blev ikke fundet"));
    }
  }
} */



//Login PUT
function handleUpdateUserData() {
  global $conn;

  $token = getBearerToken();
  $key = "b95a43b6-ab91-4370-98ba-e808cf898735";

  try {
    $decoded = JWT::decode($token, $key, array('HS256'));
    $user_id = $decoded->user_id;

    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData);

    if (!isset($data->userName) || !isset($data->userEmail)) {
      echo json_encode(array("error" => "Manglende brugernavn eller email"));
      return;
    }

    $userName = $data->userName;
    $userEmail = $data->userEmail;

    $sql = "UPDATE users SET user_name = ?, user_email = ? WHERE user_id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $userName, $userEmail, $user_id);

    if ($stmt->execute()) {
      echo json_encode(array("message" => "Brugeroplysninger er opdateret."));
    } else {
      echo json_encode(array("error" => "Fejl ved opdatering af brugeroplysninger"));
    }
  } catch (Exception $e) {
    echo json_encode(array("error" => "Uautoriseret handling"));
  }
}

function getBearerToken() {
  $headers = apache_request_headers();
  if (isset($headers['Authorization'])) {
    $authHeader = $headers['Authorization'];
    return str_replace('Bearer ', '', $authHeader);
  } else {
    return null;
  }
}


/* if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $rawData = file_get_contents("php://input");
  $data = json_decode($rawData);

  if (isset($data->login) && $data->login === true) {
    handleLoginRequest();
  } elseif (isset($data->updateUserData) && $data->updateUserData === true) {
    handleUpdateUserData();
  } else {
    handlePostRequest();
  }
} elseif (isset($_GET['userdata'])) {
  fetchUserData();
} elseif (isset($_GET['monthlySales'])) {
  fetchMonthlySalesData();
} else {
  fetchDataSearch();
} */

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $rawData = file_get_contents("php://input");
  $data = json_decode($rawData);

  if (isset($data->login) && $data->login === true) {
    handleLoginRequest();
  } else {
    handlePostRequest();
  }
} elseif (isset($_GET['userdata'])) {
  handleUpdateUserData();
} elseif (isset($_GET['monthlySales'])) {
  fetchMonthlySalesData();
} else {
  fetchDataSearch();
}


?>