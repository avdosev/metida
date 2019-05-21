#!/bin/bash
#RawAll=$(find . -not -path "./node_modules/*" -not -path "./rows-counter.sh" -not -path "./README.md" -not -path "./public/img/*" -not -path "./LICENSE" -not -path "./.git/*" -not -path "./public/js/ckeditor/*" -not -name "package*" -type f | xargs wc -l | grep "total") #тут пути, которые не учитываются ни в одном из рейтингов

#Rawfront=$(find ./public ./views -not -path "./public/json/*" -not -path "./public/img/*" -not -path "./public/js/*" -type f | xargs wc -l | grep "total")  
#find ./public ./views -not -path "./public/json/*" -not -path "./public/img/*" -not -path "./public/js/*" -type f | xargs wc -l 
RawAll=$(find . -not -path "./node_modules/*" -not -path "./rows-counter.sh" -not -path "./README.md" -not -path "./public/img/*" -not -path "./LICENSE" -not -path "./.git/*" -not -path "./public/js/ckeditor/*" -not -name "package*" -type f | xargs wc -l | grep "total") #тут пути, которые не учитываются ни в одном из рейтингов

Rawfront=$(find ./public ./views -not -path "./public/js/ckeditor/*" -type f | xargs wc -l | grep "total") #будем считать что фронтендеры написали /public/ и /views (забудем про севрерный рендеринг)


echo $Rawfront
allRows=$(expr match "$RawAll" '\(.[0-9]*\)') 
frontEnd=$(expr match "$Rawfront" '\(.[0-9]*\)')  # число останется только 
backEnd=$(expr $allRows - $frontEnd)

echo "Накал теч родил$allRows строк"
echo "На фронте написали$frontEnd строк"
echo "На беке написали $backEnd"

if [[ $backEnd -gt  $frontEnd ]]; then
    echo "Бекендеры снова перевыполняют план"
elif [[ $backEnd -lt $frontEnd ]]; then
    echo "Фронтендеры вперед!"
else
    echo "Omnes pares sunt, coram Deo"
fi
