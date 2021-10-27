#!/bin/bash

echo "-------- START PG_RESTORE --------"
pg_restore -U dvdrental -c -d dvdrental -v --no-owner --no-privileges "/backup/dvdrental.tar"
echo "-------- END PG_RESTORE --------"
