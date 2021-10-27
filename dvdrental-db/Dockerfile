FROM postgres

COPY dvdrental.tar /backup/dvdrental.tar
COPY init.sh /docker-entrypoint-initdb.d/init.sh

ENV POSTGRES_USER=dvdrental
ENV POSTGRES_PASSWORD=dvdrental
ENV POSTGRES_DB=dvdrental
