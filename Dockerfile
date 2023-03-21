FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive

# Update and install ffmpeg
RUN apt-get update
RUN apt-get install -y software-properties-common

# Install ffmpeg
RUN apt-get install -y wget unzip
RUN wget https://github.com/vot/ffbinaries-prebuilt/releases/download/v4.2.1/ffmpeg-4.2.1-linux-64.zip
RUN unzip ffmpeg-4.2.1-linux-64
RUN mv ffmpeg /usr/bin/ffmpeg
RUN ffmpeg -version

# Install nodejs 12.x
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && apt-get install -y nodejs

# Set entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Install pm2
RUN npm install pm2 -g

# App files
COPY . /var/www/html

# Install dependencies.
RUN cd /var/www/html && npm install

WORKDIR /var/www/html

EXPOSE 80 1935 9080

ENTRYPOINT ["/entrypoint.sh"]