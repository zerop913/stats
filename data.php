<?php
$jsonData = file_get_contents('./data.json');
$data = json_decode($jsonData, true);
$columnStats = [];

if ($data) {
    $rowCount = count($data);

    // Инициализация статистики по каждому столбцу
    foreach ($data[0] as $header) {
        $columnName = $header[0];
        $columnStats[$columnName] = [];
    }

    // Сбор статистики
    foreach ($data as $entry) {
        foreach ($entry as $column) {
            $columnName = $column[0];
            $columnValue = $column[1];

            if (empty($columnValue)) {
                continue;
            }

            if (!isset($columnStats[$columnName][$columnValue])) {
                $columnStats[$columnName][$columnValue] = 0;
            }

            $columnStats[$columnName][$columnValue]++;
        }
    }

    // Удаление столбцов с уникальными значениями
    foreach ($columnStats as $columnName => $values) {
        if (count($values) === 1) {
            unset($columnStats[$columnName]);
        }
    }
}

header('Content-Type: application/json');
echo json_encode($columnStats);
