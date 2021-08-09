# Sail
SailのサイトページとAjax API、LPをこのリポジトリで作成しています。

## 対象のサーバー環境
- Amazon Linux

※詳細は[GitHub Wiki (Server - 本番環境)](https://github.com/kayac/sail/wiki#server)を参照してください。

## ローカル環境の構築

### Requirements

lib   | version 
---|---
Ruby  | 2.5.1   
Rails | 5.2.5
MySQL | 5.6 or 8.x
vips  | latest  
Redis | latest
Node.js | 14.x ([こちら](https://github.com/heltecorp/sail/blob/b4ed06f201bacb7c7503dd7498758ff9316b2645/.circleci/config.yml#L35)にあわせて14.15.1の利用を推奨)
Bundler | 1.17.x
  
※開発推奨OSはMacintosh macOS 10.13 High Sierra以上です。
Windowsで開発するには、後述のDockerを使用してください。(ただし現在はDockerは要整備のため使用できません)

### Middleware installation (for macOS)

```
$ brew install readline rbenv ruby-build mysql vips redis

$ rbenv install 2.5.1
$ cd <YOUR_RAILS_ROOT>
$ rbenv local 2.5.1
```

### Setup rails application

#### Sailをチェックアウトする

```bash
$ git clone -b develop git@github.com:kayac/sail.git
```

※ ローカルから `master` ブランチへのプッシュ誤操作の防止のために、`-b develop` の指定を強く推奨します。

#### 環境設定を行う
Sailは `dotenv` を使用しています。ローカルでは環境設定を `.env` で行い、本番サーバーでは ElasticBeanstalkのConfigurationで行っています。

```bash
$ cp .env.example .env
```

※ サービス内設定 (「拡張設定」) については `app/models/site_config.rb` も参照してください。

#### Setup (bundle install, db:create, db:migrate etc...)

```
$ bin/setup
```

#### Load seed data

```
$ bin/rails db:seed
```

#### フロントエンドの環境準備

フロントエンドは Webpack を使用し、ビルドする必要があります。

Nodebrewをインストールします。

参照: [MacにNode.jsをインストール - Qiita](https://qiita.com/kyosuke5_20/items/c5f68fc9d89b84c0df09)

```bash
$ brew install nodebrew
```

Node.jsをインストールします。

```bash
$ nodebrew install-binary v14.15.1
```

Node.jsは `v14.x` をインストールする必要があります。

参照: [イシュー #989](https://github.com/kayac/sail/issues/989#issuecomment-491715943)

yarnをインストールします。

参照: [yarnをMACにインストール - Qiita](https://qiita.com/noboo/items/d7b540b4bff06d907a6b)

```bash
$ brew install yarn --without-node
```

Node.jsモジュールをインストールします。

```bash
$ yarn install
```

#### フロントエンドのビルド

下記でSailのフロントエンドのテストとスナップショットの更新を行います。

```bash
$ yarn test -u
```

※ 月が変わるとスナップショットの更新が必要になります。前月のスナップショットによるテストではCircleCIでテストが失敗するため、その場合は更新が必要です。

下記でSailのフロントエンドのビルドを行います。

```bash
$ yarn build-dev
```

#### LPのビルド

LPの更新をビルドする場合には下記を行います。

```bash
$ yarn build-guide
```

※ LPにはテストはありません。

#### Start rails server

ローカル環境でSailのサイトページを確認する場合は、MySQLサーバーとRedisサーバーを事前に起動しておく必要があります。

MySQLサーバーの起動
```bash
$ mysql.server start
```

Redisサーバーの起動
```bash
$ cd tmp
$ redis-server
```

※注意: `redis-server`を実行したディレクトリに`dump.rdb`が作成されてしまうため、`tmp`へ移動することをおすすめします。

MySQLサーバーとRedisサーバーが起動したことを確認してから、Railsサーバーを起動します。

```
$ bin/rails s
```

アクセスは下記のURLから可能です。
- http://localhost:3000

管理ページへのアクセスは下記のURLから可能です。
- http://localhost:3000/admin/

※ 管理ページにアクセスするには、`db/datasources/20181016025158/admin_user.yml` に自分のメールアドレスを追加する必要があります。

#### Reset local

```
$ rm -rf vendor/bundle
$ bundle install --path=./vendor/bundle
$ bin/rails db:drop && bin/rails db:create db:migrate db:seed
```
※エラーが起きた場合やバージョン違いによる不具合については、[GitHub Wiki (Server - ローカル環境について)](https://github.com/kayac/sail/wiki/%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E7%92%B0%E5%A2%83%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)も参照してください。


## Docker Compose
※注意: 現在 Docker はメンテナンス不足のため使用できません。

### Copy .env

```
$ cp docker/local/env .env
```

### Setup docker-compose

```
$ docker-compose build
$ docker-compose run --rm app bin/setup
$ docker-compose up
```

### Setup hosts

#### docker 環境にアクセスする

https://localhost:8443

### Usage

[詳しい使い方はこちら](/kayac/sail/wiki/docker-compose#%E4%BD%BF%E3%81%84%E6%96%B9)

## APIドキュメント
[APIドキュメントはこちら](doc/toc.md)

APIドキュメントを更新するには下記のコマンドを操作してください。

```
$ export AUTODOC=1
$ bundle exec rspec
```

## 開発のルール
開発のルールは [GitHub Wiki](https://github.com/kayac/sail/wiki/%E9%96%8B%E7%99%BA%E3%81%AE%E3%83%AB%E3%83%BC%E3%83%AB)を参照してください。

### コーディング規則
[`.rubocop.yml`](.rubocop.yml)を確認してください。

rubocopを使うには下記を実行します。

```bash

$ bin/bundle exec rubocop
```
