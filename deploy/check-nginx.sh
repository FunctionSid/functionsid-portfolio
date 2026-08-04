#!/usr/bin/env bash
set -euo pipefail

command -v nginx >/dev/null 2>&1

echo "Nginx: $(nginx -v 2>&1)"
sudo nginx -t

echo "Nginx is installed and configuration syntax is valid."
