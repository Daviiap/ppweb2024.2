#!/bin/bash

flyway migrate -locations=filesystem:./migrations
