<?php
// Read JSON file
$jsonData = file_get_contents(__DIR__ . '/../data/quizzes.json');
$data = json_decode($jsonData, true);

// Get total number of quizzes
$totalQuizzes = count($data['quizzes']);

// Get latest quiz ID
$latestQuizId = $data['quizzes'][$totalQuizzes - 1]['id'];

// Get quiz ID from URL parameter, default to latest
$quizId = $_GET['id'] ?? $latestQuizId;

// Find the quiz by ID
$quiz = null;
foreach ($data['quizzes'] as $q) {
    if ($q['id'] == $quizId) {
        $quiz = $q;
        break;
    }
}

// If quiz not found, show error or redirect
if (!$quiz) {
    die('Quiz not found');
}

// Get random quiz ID that's different from current
$randomId = $quizId;
while ($randomId == $quizId) {
    $randomId = rand(1, $totalQuizzes);
}

// Prepare data for Alpine.js
$quizData = json_encode([
    'choices' => $quiz['choices'],
    'explanation' => $quiz['explanation'],
    'source' => $quiz['source'],
    'sourceUrl' => $quiz['source_url'],
    'date' => $quiz['date'],
    'images' => $quiz['images']  // Add images array to Alpine data
]);

// Prepare data for other quizzes, excluding the current one
$otherQuizzes = array_filter($data['quizzes'], function ($q) use ($quizId) {
    return $q['id'] != $quizId;
});

// Limit to a maximum of 3 other quizzes
$otherQuizzes = array_slice($otherQuizzes, 0, 3);
?>
<div x-data='<?php echo htmlspecialchars($quizData); ?>'>
    <h1>Quiz d'Images Hebdomadaire par Iheb Chagra</h1>
    <h2>Le <?php echo $quiz['date']; ?></h2>


    <image-grid>
        <?php foreach ($quiz['images'] as $image): ?>
        <img src="<?php echo htmlspecialchars($image['url']); ?>" alt="<?php echo htmlspecialchars($image['alt']); ?>">
        <?php endforeach; ?>
    </image-grid>
    <p>
        <?php echo nl2br(htmlspecialchars($quiz['description'])); ?>
        <strong><?php echo htmlspecialchars($quiz['question']); ?></strong>
    </p>

    <multiple-choice>
        <div style="text-align: center; margin: 1rem;">
            <nav-button @click="window.location.href='/quiz?id=<?php echo $randomId; ?>'">
                Quiz Aléatoire
            </nav-button>
        </div>
    </multiple-choice>

    <other-quizzes>
        <?php foreach ($otherQuizzes as $otherQuiz): ?>
        <div class="quiz-box">
            <img src="<?php echo htmlspecialchars($otherQuiz['images'][0]['url']); ?>"
                alt="<?php echo htmlspecialchars($otherQuiz['images'][0]['alt']); ?>">
            <p><?php echo htmlspecialchars($otherQuiz['date']); ?></p>
            <a href="/quiz?id=<?php echo $otherQuiz['id']; ?>">Voir le Quiz</a>
        </div>
        <?php endforeach; ?>
    </other-quizzes>
</div>