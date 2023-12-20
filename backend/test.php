/* // GET all
function fetchData() {
  global $conn;

  $sql = "SELECT transactions.*, categories.sale_category_name 
          FROM transactions
          INNER JOIN categories ON transactions.sale_category_id = categories.sale_category_id";
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



if ($result->num_rows == 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['user_password'])) {
        $key = "a42a04e0-f4af-418e-9fae-6f0fc21679f0";
        $payload = array(
            "user_id" => $user['user_id'],
            "user_name" => $user['user_name'],
            "user_email" => $user['user_email']
        );
        $token = JWT::encode($payload, $key);
        echo json_encode(array("token" => $token));
    } else {
        echo json_encode(array("error" => "Forkert adgangskode"));
    }
} else {
    echo json_encode(array("error" => "Bruger blev ikke fundet"));
}



error_log("Response: " . json_encode($response));
/* // POST Sale
$rawData = file_get_contents("php://input");
$data = json_decode($rawData);


if (!empty($data)) {
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
  $response = ["message" => "Data add."];
  echo json_encode($response);
} else {
  $response = ["error" => "Error: " . $conn->error];
  echo json_encode($response);
}
}


fetchDataSearch();

//login
$rawLoginData = file_get_contents("php://input");
$dataLogin = json_decode($rawLoginData);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = $dataLogin->email;
  $password = $dataLogin->password;

  // Valider og rens brugerindtastning (for at forhindre SQL-injektion og andre angreb)

  $sql = "SELECT * FROM users WHERE user_email = '$email'";
  $result = $conn->query($sql);

  if ($result->num_rows == 1) {
      $user = $result->fetch_assoc();
      if (password_verify($password, $user['user_password'])) {
          $key = "a42a04e0-f4af-418e-9fae-6f0fc21679f0"; // Erstat med din hemmelige nøgle
          $payload = array(
              "user_id" => $user['user_id'],
              "user_name" => $user['user_name'],
              "user_email" => $user['user_email']
          );
          $token = JWT::encode($payload, $key);

          // Send JWT-token til frontend
          echo json_encode(array("token" => $token));
      } else {
          // Adgangskoden er forkert
          echo json_encode(array("error" => "Forkert adgangskode"));
      }
  } else {
      // Bruger blev ikke fundet
      echo json_encode(array("error" => "Bruger blev ikke fundet"));
  }
} */


// Login
/* function handleLoginRequest() {
  global $conn;

  $rawData = file_get_contents("php://input");
  $data = json_decode($rawData);

  error_log("Dekoder indkommende login-data: " . print_r($data, true));

  if (isset($data->email) && isset($data->password)) {
    $email = $data->email;
    $password = $data->password;

    $sql = "SELECT * FROM users WHERE user_email = '$email'";
    error_log("SQL-forespørgsel: " . $sql);
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
      $user = $result->fetch_assoc();
      if (password_verify($password, $user['user_password'])) {
          $key = "b95a43b6-ab91-4370-98ba-e808cf898735";
          $payload = array(
              "user_id" => $user['user_id'],
              "user_name" => $user['user_name'],
              "user_email" => $user['user_email']
          );
          $token = JWT::encode($payload, $key);
          echo json_encode(array("token" => $token));
      } else {
          echo json_encode(array("error" => "Forkert e-mail eller adgangskode"));
      }
  } else {
      echo json_encode(array("error" => "Bruger blev ikke fundet"));
  }
}
}
 */