<?php
    if(isset($_POST["submit"])){
        $movie = $_POST["movieName"];
        if(!empty($movie)) {
			$url = "./data.json";
            $data = file_get_contents($url);
            $json_ar = json_decode($data, true);
            foreach ($json_ar as $key => $value) {
                $new = array_push($value, $movie);
            }
            $json_ar["movies"] = $value;
            file_put_contents($url, json_encode($json_ar));
        }
        header("location:".$_SERVER[HTTP_REFERER]);
    }