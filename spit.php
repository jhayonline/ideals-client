<?php

if ($argc < 2) {
    echo "Usage: php spit.php <path>\n";
    exit(1);
}

$path = $argv[1];
$outputFile = __DIR__ . '/content.txt';

if (!file_exists($path)) {
    echo "Path does not exist: $path\n";
    exit(1);
}

/**
 * Append a file's content to content.txt
 */
function appendFile($file, $outputFile)
{
    $handle = fopen($outputFile, 'a');

    if (!$handle) {
        echo "Could not open output file.\n";
        return;
    }

    fwrite($handle, $file . PHP_EOL);

    $content = @file_get_contents($file);
    if ($content === false) {
        fwrite($handle, "[Could not read file]\n\n");
    } else {
        fwrite($handle, $content . PHP_EOL . PHP_EOL);
    }

    fclose($handle);
}

/**
 * Process path recursively
 */
function processPath($path, $outputFile)
{
    if (is_file($path)) {
        appendFile($path, $outputFile);
        return;
    }

    if (is_dir($path)) {
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($path, RecursiveDirectoryIterator::SKIP_DOTS)
        );

        foreach ($iterator as $file) {
            if ($file->isFile()) {
                appendFile($file->getPathname(), $outputFile);
            }
        }
    }
}

processPath($path, $outputFile);

echo "Done. Content appended to content.txt\n";
