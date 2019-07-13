FROM ubuntu:18.04
MAINTAINER Alex Yurev <github.com/Sapfir0>


ENV PACKAGES="\
    npm \
    mysql-server \
    mysql-client \
    "

RUN apt-get update \
 && apt-get install --upgrade ${PACKAGES} -qy


COPY . /metida

RUN cd metida \
 && npm install

WORKDIR /metida
EXPOSE 7080
ENTRYPOINT ["npm"]
CMD ["start"]



