#!/usr/bin/env bash

set -eu -o pipefail

wget 'https://github.com/owid/poverty-data/blob/main/datasets/pip_dataset.csv?raw=true' -O poverty.csv
wget 'https://raw.githubusercontent.com/owid/owid-datasets/master/datasets/Population%20by%20age%20group%20to%202100%20(based%20on%20UNWPP%2C%202017%20medium%20scenario)/Population%20by%20age%20group%20to%202100%20(based%20on%20UNWPP%2C%202017%20medium%20scenario).csv' -O age.csv
wget 'https://raw.githubusercontent.com/owid/owid-datasets/master/datasets/Urban%20and%20rural%20population%201950-2050%20-%20UN%20World%20Urbanization%20Prospects%202018/Urban%20and%20rural%20population%201950-2050%20-%20UN%20World%20Urbanization%20Prospects%202018.csv' -O urban.csv
wget 'https://raw.githubusercontent.com/owid/owid-datasets/master/datasets/Number%20of%20people%20with%20and%20without%20energy%20access%20(OWID%20based%20on%20World%20Bank%2C%202021)/Number%20of%20people%20with%20and%20without%20energy%20access%20(OWID%20based%20on%20World%20Bank%2C%202021).csv' -O energyAccess.csv
