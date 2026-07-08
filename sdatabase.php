<?php
// Database configuration and connection
class Database {
    private static $instance = null;
    private $connection;
    
    private $host;
    private $database;
    private $username;
    private $password;
    private $charset = 'utf8mb4';
    
    private function __construct() {
        // Hardcoded credentials
        $this->host     = 'localhost';
        $this->database = 'studyke_platform';
        $this->username = 'studyke';
        $this->password = '(@!vijay009@)';

        $dsn = "mysql:host={$this->host};dbname={$this->database};charset={$this->charset}";
        
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$this->charset}",
        ];
        
        try {
            $this->connection = new PDO($dsn, $this->username, $this->password, $options);
            $this->connection->exec("SET time_zone = '+00:00'");
        } catch (PDOException $e) {
            error_log("Database connection failed: " . $e->getMessage());
            throw new Exception("Database connection failed: Unable to connect to the database");
        }
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->connection;
    }
    
    public function isConnected() {
        try {
            $this->connection->query('SELECT 1');
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
    
    public function query($sql, $params = []) {
        try {
            $stmt = $this->connection->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            error_log("Database query failed: " . $e->getMessage() . " SQL: " . $sql);
            throw new Exception("Database query failed");
        }
    }
    
    public function fetchAll($sql, $params = []) {
        $stmt = $this->query($sql, $params);
        return $stmt->fetchAll();
    }
    
    public function fetchOne($sql, $params = []) {
        $stmt = $this->query($sql, $params);
        return $stmt->fetch();
    }
    
    public function execute($sql, $params = []) {
        $stmt = $this->query($sql, $params);
        return $stmt->rowCount();
    }
    
    public function lastInsertId() {
        return $this->connection->lastInsertId();
    }
    
    public function beginTransaction() {
        return $this->connection->beginTransaction();
    }
    
    public function commit() {
        return $this->connection->commit();
    }
    
    public function rollback() {
        return $this->connection->rollback();
    }
    
    public function initializeDatabase() {
        try {
            // Check if database exists, create if not
            $this->createDatabaseIfNotExists();
            
            // Run migration scripts
            $this->runMigrations();
            
            return true;
        } catch (Exception $e) {
            error_log("Database initialization failed: " . $e->getMessage());
            return false;
        }
    }
    
    private function createDatabaseIfNotExists() {
        $tempConnection = new PDO(
            "mysql:host={$this->host};charset={$this->charset}",
            $this->username,
            $this->password,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        
        $tempConnection->exec("CREATE DATABASE IF NOT EXISTS `{$this->database}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    }
    
    private function runMigrations() {
        $scriptsDir = __DIR__ . '/../../scripts/';
        $migrationFiles = glob($scriptsDir . '*.sql');
        sort($migrationFiles);
        
        foreach ($migrationFiles as $file) {
            if (strpos(basename($file), 'seed') !== false) {
                continue; // Skip seed files for now
            }
            
            $sql = file_get_contents($file);
            if ($sql) {
                $this->connection->exec($sql);
                error_log("Executed migration: " . basename($file));
            }
        }
    }
}
?>