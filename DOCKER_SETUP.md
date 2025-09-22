# 🐳 Docker Setup - DFCom Products

## Arquivos Criados

### Dockerfiles
- `api/Dockerfile` - Produção da API (multi-stage build)
- `api/Dockerfile.dev` - Desenvolvimento da API (hot reload + debug)
- `web/Dockerfile` - Produção do Frontend (build estático + Nginx)
- `web/Dockerfile.dev` - Desenvolvimento do Frontend (Vite dev server)

### Docker Compose
- `docker-compose.yml` - Ambiente de produção
- `docker-compose.dev.yml` - Ambiente de desenvolvimento

### Configurações
- `api/.dockerignore` - Arquivos ignorados no build da API
- `web/.dockerignore` - Arquivos ignorados no build do Frontend
- `.env.docker` - Variáveis de ambiente para Docker
- `mongo-init/init-db.js` - Script de inicialização do MongoDB

### Scripts
- `docker-scripts.ps1` - Script PowerShell para facilitar comandos
- `README.md` - Documentação completa

## 🚀 Como Usar

### 1. Produção (Recomendado para teste)
```bash
# Iniciar todos os serviços
docker-compose up -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f
```

**Acessos:**
- Frontend: http://localhost
- Backend: http://localhost:3000
- MongoDB: localhost:27017

### 2. Desenvolvimento
```bash
# Iniciar ambiente de desenvolvimento
docker-compose -f docker-compose.dev.yml up -d
```

**Acessos:**
- Frontend: http://localhost:5173 (Vite dev server)
- Backend: http://localhost:3000 (NestJS com hot reload)
- Debug: localhost:9229 (Node.js debugger)

### 3. Usando o Script PowerShell
```powershell
# Produção
.\docker-scripts.ps1 prod

# Desenvolvimento
.\docker-scripts.ps1 dev

# Parar tudo
.\docker-scripts.ps1 stop

# Limpar tudo
.\docker-scripts.ps1 clean
```

## 🔧 Características Implementadas

### Segurança
- ✅ Usuários não-root nos containers
- ✅ Multi-stage builds para reduzir superfície de ataque
- ✅ Headers de segurança no Nginx
- ✅ Validação de esquemas no MongoDB

### Performance
- ✅ Nginx otimizado para SPA React
- ✅ Compressão Gzip
- ✅ Cache de assets estáticos
- ✅ Índices otimizados no MongoDB

### Desenvolvimento
- ✅ Hot reload para API e Frontend
- ✅ Debug port exposto para a API
- ✅ Volumes para código fonte
- ✅ Logs estruturados

### Produção
- ✅ Health checks para todos os serviços
- ✅ Restart policies
- ✅ Volumes persistentes
- ✅ Networks isoladas

## 📊 Monitoramento

### Health Checks
Todos os serviços têm health checks configurados:

```bash
# Verificar saúde dos serviços
docker-compose ps
```

### Logs
```bash
# Todos os serviços
docker-compose logs -f

# Serviço específico
docker-compose logs -f api
docker-compose logs -f web
docker-compose logs -f mongodb
```

## 🗄️ Banco de Dados

### Configuração Automática
- Database: `dfcom`
- Collections: `products`, `reviews`
- Índices otimizados criados automaticamente
- Validação de esquemas configurada

### Acesso Direto
```bash
# Conectar ao MongoDB
docker exec -it dfcom-mongodb mongosh -u admin -p admin123 --authenticationDatabase admin

# Usar database
use dfcom

# Listar collections
show collections
```

## 🔄 Comandos Úteis

```bash
# Rebuild completo
docker-compose build --no-cache
docker-compose up -d

# Apenas MongoDB
docker-compose up -d mongodb

# Parar e limpar volumes
docker-compose down -v

# Ver uso de recursos
docker stats

# Inspecionar networks
docker network ls
docker network inspect dfcom-network
```

## 🚨 Troubleshooting

### Porta em uso
Se a porta 3000 estiver em uso:
```bash
# Parar processo na porta 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Problemas de build
```bash
# Limpar cache do Docker
docker system prune -a

# Rebuild sem cache
docker-compose build --no-cache
```

### Problemas de conexão
```bash
# Verificar networks
docker network inspect dfcom-network

# Verificar DNS interno
docker exec dfcom-api nslookup mongodb
```

## ✅ Teste Rápido

1. **Iniciar ambiente:**
   ```bash
   docker-compose up -d
   ```

2. **Aguardar inicialização (30-60 segundos)**

3. **Testar endpoints:**
   - Frontend: http://localhost
   - API Health: http://localhost:3000
   - Criar produto via API: POST http://localhost:3000/product

4. **Verificar logs:**
   ```bash
   docker-compose logs -f
   ```

O setup está completo e pronto para uso! 🎉
