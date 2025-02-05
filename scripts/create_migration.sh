#!/bin/bash
TIMESTAMP=$(date +"%Y%m%d%H%M%S")

if [ -z "${name}" ]; then
	echo "Error: Inform the 'name' variable when running the command"
	exit 1
fi

DIR=./migrations

if [ ! -d "$DIR" ]; then
    echo "Error: migrations path does not exist."
	exit 1
fi

echo "-- Migration file created on ${TIMESTAMP}" > "./migrations/V${TIMESTAMP}__${name}.sql"
echo "INFO: ./migrations/V${TIMESTAMP}__${name}.sql created"
