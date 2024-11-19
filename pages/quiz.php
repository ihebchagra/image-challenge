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

// Prepare data for Alpine.js
$quizData = json_encode([
    'choices' => $quiz['choices'],
    'explanation' => $quiz['explanation'],
    'source' => $quiz['source'],
    'sourceUrl' => $quiz['source_url'],
    'date' => $quiz['date']  // Add date to Alpine data
]);
?>
<link rel="stylesheet" href="../styles/quiz.css">

<div x-data='<?php echo $quizData; ?>'>
    <h1>Quiz d'Images Par Iheb Chagra</h1>
    <h2>Le <span x-text="new Date(date).toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    }).replace(/^([\d]+)\s/,'$1 ').replace(/^\w/, c => c.toUpperCase())"></span></h2>


    <image-grid>
        <img src="<?php echo htmlspecialchars($quiz['image1_url']); ?>"
            alt="<?php echo htmlspecialchars($quiz['image1_alt']); ?>">
        <img src="<?php echo htmlspecialchars($quiz['image2_url']); ?>"
            alt="<?php echo htmlspecialchars($quiz['image2_alt']); ?>">
    </image-grid>
    <p>
        <?php echo nl2br(htmlspecialchars($quiz['description'])); ?>
        <strong><?php echo htmlspecialchars($quiz['question']); ?></strong>
    </p>

    <multiple-choice>
        <div style="text-align: center; margin: 1rem;">
            <nav-button @click="window.location.href='/quiz?id=<?php echo rand(1, $totalQuizzes); ?>'">
                Quiz Aléatoire
            </nav-button>
        </div>
    </multiple-choice>


</div>