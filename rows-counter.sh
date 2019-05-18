#!/bin/bash

excludeDir = "./node_modules/*", "./public/img/*", "./LICENSE", "./.git/*", "./public/js/ckeditor/*", "package*" #пока не придумал как юзнуть абстрактно

find . -not -path "./node_modules/*" -not -path "./public/img/*" -not -path "./LICENSE" -not -path "./.git/*" -not -path "./public/js/ckeditor/*" -not -name "package*" -type f | xargs wc -l | grep "total"