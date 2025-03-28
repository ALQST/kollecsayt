param(
    [string]$action
)

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

switch ($action) {
    "start" {
        Write-Host "Starting WordPress and MySQL containers..."
        docker-compose -f "$scriptPath\docker-compose.yml" up -d
        Write-Host "Containers are starting. WordPress will be available at: http://localhost:8000"
        Write-Host "Admin panel will be at: http://localhost:8000/wp-admin"
    }
    "stop" {
        Write-Host "Stopping WordPress and MySQL containers..."
        docker-compose -f "$scriptPath\docker-compose.yml" down
    }
    "logs" {
        Write-Host "Showing container logs..."
        docker-compose -f "$scriptPath\docker-compose.yml" logs -f
    }
    default {
        Write-Host "Usage: .\wp-docker.ps1 [start|stop|logs]"
    }
}
