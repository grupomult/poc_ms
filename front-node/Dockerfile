FROM node:9.11.1

RUN mkdir /site
ADD . /site
RUN cd /site ; npm install
WORKDIR /site
EXPOSE 9000