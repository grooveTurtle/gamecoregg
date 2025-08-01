# apps/frontend/Dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm ci --only=production

# 빌드
COPY . .
RUN npm run build

# 프로덕션 이미지
FROM node:22-alpine AS runner

WORKDIR /app

RUN apk add --no-cache curl

# 비 root 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 빌드 결과물 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# 소유권 변경
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]