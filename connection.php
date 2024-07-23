<?php

header('Content-Type: application/json');

$serverName = "DEEKSHITH\SQLEXPRESS02";
$connectionInfo = array("Database" => "quizapp", "CharacterSet" => "UTF-8");
$conn = sqlsrv_connect($serverName, $connectionInfo);

if ($conn) {
    $sql = "SELECT question, option1, option2, option3, option4, answer FROM QuestionsAnswers";
    $stmt = sqlsrv_query($conn, $sql);

    if ($stmt === false) {
        echo json_encode(array('error' => 'Query failed: ' . print_r(sqlsrv_errors(), true)));
        exit;
    }

    $questions = array();

    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        
        $row = array_map('utf8_encode', $row);
        
        $correctAnswer = $row['answer'];

        $answers = array(
            array('text' => $row['option1'], 'correct' => $correctAnswer === $row['option1']),
            array('text' => $row['option2'], 'correct' => $correctAnswer === $row['option2']),
            array('text' => $row['option3'], 'correct' => $correctAnswer === $row['option3']),
            array('text' => $row['option4'], 'correct' => $correctAnswer === $row['option4']),
        );

        $questions[] = array(
            'question' => $row['question'],
            'answers' => $answers
        );
    }

    $jsonOutput = json_encode($questions);
    if ($jsonOutput === false) {
        echo json_encode(array('error' => 'JSON encoding failed: ' . json_last_error_msg()));
        exit;
    }

    echo $jsonOutput;

    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);
} else {
    echo json_encode(array('error' => 'Connection failed: ' . print_r(sqlsrv_errors(), true)));
}

?>
