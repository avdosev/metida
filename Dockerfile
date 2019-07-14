FROM ubuntu:18.04
MAINTAINER Alex Yurev <github.com/Sapfir0>


ENV PACKAGES="\
    npm \
    nodejs \
    mysql-server \
    mysql-client \
    "

RUN apt-get update \
 && apt-get install --upgrade ${PACKAGES} -qy
 
RUN mysql_secure_installation \
 && mysql << EOF \
        create database usersDB2;  \
        create user 'metidaSQL'@'localhost' identified with mysql_native_password by '123456'; \
        grant all privileges on usersDB2.* to 'metidaSQL'@'localhost'; \
    EOF
 


COPY . /metida

RUN cd metida \
 && npm install

WORKDIR /metida
EXPOSE 7080
ENTRYPOINT ["npm"]
CMD ["start"]



