@echo off
REM Simulação simples do Makefile para Windows

IF "%1"=="dev" (
    docker compose up --build
    GOTO END
)

IF "%1"=="prod" (
    docker compose -f docker-compose.yml up --build
    GOTO END
)

IF "%1"=="down" (
    docker compose down -v
    GOTO END
)

IF "%1"=="logs" (
    docker compose logs -f
    GOTO END
)

IF "%1"=="sh-backend" (
    docker compose exec backend sh
    GOTO END
)

IF "%1"=="sh-frontend" (
    docker compose exec frontend sh
    GOTO END
)

:END
