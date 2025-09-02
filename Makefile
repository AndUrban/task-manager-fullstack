# Subir containers em modo desenvolvimento (override incluso)
dev:
	docker compose up --build

# Subir containers em modo produção (sem override)
prod:
	docker compose -f docker-compose.yml up --build

# Parar containers e remover volumes
down:
	docker compose down -v

# Ver logs
logs:
	docker compose logs -f

# Acessar container do backend
sh-backend:
	docker compose exec backend sh

# Acessar container do frontend
sh-frontend:
	docker compose exec frontend sh
