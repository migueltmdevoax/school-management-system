#!/bin/bash
# Cron job: 0 2 * * * /path/to/backup.sh
# Se ejecuta todos los días a las 2am

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/school-saas"
DB_NAME="school_db"
DB_USER="postgres"

mkdir -p $BACKUP_DIR

pg_dump -U $DB_USER $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Mantener solo los últimos 7 backups
ls -t $BACKUP_DIR/backup_*.sql | tail -n +8 | xargs -r rm

echo "✅ Backup completado: backup_$DATE.sql"