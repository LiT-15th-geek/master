FROM ruby:3.1.0

ENV LANG=C.UTF-8 \
  TZ=Asia/Tokyo

WORKDIR /app

# PostgreSQLのクライアントをインストール
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
# RailsのバージョンはGemfileに依存
RUN bundle lock --add-platform x86_64-linux
RUN bundle install

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]