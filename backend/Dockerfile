# FROM php:8.2-fpm

# RUN apt-get update && apt-get install -y \
#     git \
#     curl \
#     libpng-dev \
#     libonig-dev \
#     libxml2-dev \
#     zip \
#     unzip \
#     && docker-php-ext-install pdo_mysql mbstring gd

# COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# WORKDIR /var/www/html

# COPY . .
# RUN composer install

# EXPOSE 8000

# CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]


# === 1. ビルドステージ (PHPとComposerの環境) ===
FROM php:8.3-fpm-alpine AS builder

# 1.1. 必要なOSパッケージとツールのインストール
RUN apk update && apk add --no-cache \
    git \
    unzip \
    pcre-dev \
    # ...
    && rm -rf /var/cache/apk/*

# 1.2. Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 1.3. 作業ディレクトリの設定
WORKDIR /var/www/html

# 1.4. 依存関係ファイルのコピー
COPY composer.json composer.lock ./

# 1.6. ソースコード全体のコピー
COPY . .

# 1.5. 依存関係のインストール (新しいライブラリはここで組み込まれる)
# RUN composer install --no-dev --optimize-autoloader
RUN composer install

EXPOSE 8000

# 1.7. Laravelのキャッシュ/設定ファイルの最適化
RUN php artisan config:cache && php artisan route:cache


# # === 2. 実行ステージ (軽量なPHP-FPM環境) ===
# FROM php:8.3-fpm-alpine

# # 2.1. 必要なOSパッケージのインストール (ランタイムに必要なもののみ)
# RUN apk update && apk add \
#     ...

# # 2.2. ビルドステージから必要なファイルすべてをコピー
# COPY --from=builder /var/www/html /var/www/html

# # 2.3. ストレージディレクトリのパーミッション設定
# RUN chown -R www-data:www-data /var/www/html/storage \
#     && chown -R www-data:www-data /var/www/html/bootstrap/cache

# # PHP-FPMでコンテナを起動
# CMD ["php-fpm"]
