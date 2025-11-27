# FROM node:18-alpine

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "run", "dev"]


# === 1. ビルドステージ ===
FROM node:20-alpine AS builder

# 1.1. 作業ディレクトリの設定
WORKDIR /usr/src/app

# 1.2. 依存関係ファイルのコピー
# キャッシュを有効にするため、package.jsonとロックファイルを先にコピー
COPY package.json package-lock.json ./

# 1.3. 依存関係のインストール (新しいライブラリはここで組み込まれる)
RUN npm install

# 1.4. ソースコード全体のコピー
COPY . .

EXPOSE 3000

# 1.5. 本番用アセットのビルド (create-react-appの場合など)
# 新しいライブラリに依存するため、このステップも再実行が必要
RUN npm run dev
# RUN npm run start


# # === 2. 実行ステージ (Nginxで静的アセットを配信する場合) ===
# FROM nginx:alpine

# # 2.1. ビルドステージで生成された静的アセットのみをコピー
# # /app/build がビルド結果のディレクトリだと仮定
# COPY --from=builder /app/build /usr/share/nginx/html

# # Nginxのデフォルト設定でコンテナを起動
# CMD ["nginx", "-g", "daemon off;"]
