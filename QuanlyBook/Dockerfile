# Dùng image Node.js nhẹ 
FROM node:20-alpine AS builder

# Thư mục làm việc 
WORKDIR /app

# Copy file cần để cài package 
COPY package*.json ./

# Cài dependencies
RUN npm ci

# Copy toàn bộ source code và Build TypeScript sang JS 
COPY . .
RUN npm run build

# Tạo stage production nhẹ 
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Cài lại chỉ các dependency cần thiết cho production, bỏ qua devDependencies
COPY package*.json ./

# Cài deps production
RUN npm ci --omit=dev

# Copy thư mục dist (đã build ở stage builder) sang stage production
COPY --from=builder /app/dist ./dist

# Nếu có thư mục dữ liệu như prisma/, migrations/, uploads/ thì bạn copy thêm dòng này
# COPY --from=builder /app/prisma ./prisma

# Tạo user và group “app” trong container
RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 3000

CMD ["node", "dist/main.js"]
