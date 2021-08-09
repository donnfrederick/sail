#
# local
#
FROM ruby:2.5.1-slim
ENV TZ=Asia/Tokyo
ENV RAILS_LOG_TO_STDOUT=1
RUN set -ex \
  && apt-get update \
  && apt-get install -y curl gnupg vim\
  && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update \
  && apt-get install -y nodejs yarn default-libmysqlclient-dev build-essential shared-mime-info libvips-dev \
  && gem install bundler
WORKDIR /app
COPY Gemfile Gemfile.lock /app/
RUN set -ex \
  && bundle install --jobs=2
EXPOSE 3000
CMD ["bash", "-c", "rm -f /tmp/server.pid && bundle exec rails s -p 3000 -b 0.0.0.0 --pid /tmp/server.pid"]