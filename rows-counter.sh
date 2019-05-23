#!/bin/bash

#Скрипт для лулзов и посмеяться над кем-нибудь

RawAll=$(find . -not -path "./node_modules/*" -not -path "./rows-counter.sh" -not -path "./README.md" -not -path "./public/img/*" -not -path "./LICENSE" -not -path "./.git/*" -not -path "./public/js/ckeditor/*" -not -name "package*" -type f | xargs wc -l | grep "total") #тут пути, которые не учитываются ни в одном из рейтингов

RawDesigners=$(find ./public ./views -not -path "./public/json/*" -not -path "./public/img/*" -not -path "./public/js/*" -type f | xargs wc -l | grep "total")

allRows=${RawAll/total/}
designersRows=${RawDesigners/total/}
codersRows=$(expr $allRows - $designersRows)

echo "Накал теч родил$allRows строк"
echo "Дизайнеры написали$designersRows строк"
echo "Кодеры написали $codersRows"

if [[ $codersRows -gt  $designersRows ]]; then
    echo "Бекендеры снова перевыполняют план"
elif [[ $codersRows -lt $designersRows ]]; then
    echo "Фронтендеры вперед!"
else
    echo "Omnes pares sunt, coram Deo"
fi
