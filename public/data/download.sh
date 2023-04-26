#!/usr/bin/env bash

set -eu -o pipefail

wget 'https://github.com/owid/poverty-data/blob/main/datasets/pip_dataset.csv?raw=true' -O poverty.csv
wget 'https://raw.githubusercontent.com/owid/owid-datasets/master/datasets/Population%20by%20age%20group%20to%202100%20(based%20on%20UNWPP%2C%202017%20medium%20scenario)/Population%20by%20age%20group%20to%202100%20(based%20on%20UNWPP%2C%202017%20medium%20scenario).csv' -O age.csv

