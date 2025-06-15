# 現代網頁佈局設計筆記

> 本筆記記錄現代網頁設計中關於佈局、CSS技巧和字型選用的關鍵要素。

## 目錄
1. [佈局基礎](#佈局基礎)
2. [Flexbox vs Grid](#flexbox-vs-grid)
3. [響應式設計](#響應式設計)
4. [字型設計](#字型設計)
5. [性能優化](#性能優化)
6. [設計案例分析](#設計案例分析)

## 佈局基礎

### 容器概念

現代網頁佈局的核心是「容器」概念，通常由以下結構組成：

```css
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}
```

這種容器模式提供以下優勢：
- 內容居中對齊
- 兩側邊距自動調整
- 限制最大寬度，確保在大螢幕上有合理的閱讀體驗
- 內部填充防止內容與螢幕邊緣直接接觸

### 區塊佈局

將頁面分成有意義的區塊，每個區塊專注於特定內容：

```html
<header class="header">
    <!-- 網站標題、導航等 -->
</header>

<section class="main-content">
    <!-- 主要內容 -->
</section>

<aside class="sidebar">
    <!-- 側邊欄內容 -->
</aside>

<footer class="footer">
    <!-- 頁腳信息 -->
</footer>
```

## Flexbox vs Grid

### Flexbox (彈性盒子)

Flexbox 是一維佈局系統，特別適合處理一行或一列的項目排列：

```css
.flex-container {
    display: flex;
    justify-content: space-between; /* 水平分布 */
    align-items: center; /* 垂直居中 */
    flex-wrap: wrap; /* 允許換行 */
}

.flex-item {
    flex: 1; /* 均等分配空間 */
}
```

**適用場景**：
- 導航菜單
- 卡片列表
- 垂直或水平居中
- 不規則大小的元素佈局

### CSS Grid

Grid 是二維佈局系統，非常適合整體頁面結構佈局：

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 三等分列 */
    grid-gap: 20px; /* 網格間距 */
}

.grid-item {
    grid-column: span 2; /* 佔據兩列 */
}
```

**適用場景**：
- 整體頁面結構
- 圖片畫廊
- 複雜的儀表板佈局
- 需要精確控制行列的佈局

### 最佳實踐：組合使用

現代網頁設計中，通常結合使用 Grid 和 Flexbox：
- Grid 用於定義主要頁面結構
- Flexbox 用於處理內部元素的排列

```css
.page {
    display: grid;
    grid-template-areas: 
        "header header"
        "sidebar content"
        "footer footer";
    grid-template-columns: 300px 1fr;
}

.navigation {
    display: flex;
    justify-content: space-between;
}
```

## 響應式設計

### 媒體查詢基礎

使用媒體查詢根據螢幕尺寸調整佈局：

```css
/* 基本樣式（適用於所有尺寸） */
.container {
    padding: 20px;
}

/* 平板電腦 */
@media (max-width: 768px) {
    .container {
        padding: 15px;
    }
}

/* 手機 */
@media (max-width: 480px) {
    .container {
        padding: 10px;
    }
}
```

### 常用斷點

現代響應式設計常用的斷點：

| 裝置類型 | 斷點 |
|----------|------|
| 大螢幕顯示器 | 1200px+ |
| 桌面電腦 | 992px - 1199px |
| 平板電腦 | 768px - 991px |
| 大型手機 | 576px - 767px |
| 小型手機 | < 576px |

### 流動單位

使用相對單位而非固定像素：

```css
body {
    font-size: 16px; /* 基準字型大小 */
}

h1 {
    font-size: 2rem; /* 32px */
}

.container {
    width: 90%; /* 相對於父元素寬度 */
    max-width: 1200px; /* 最大寬度上限 */
}

.padding-element {
    padding: 5%; /* 相對於父元素寬度的填充 */
}
```

## 字型設計

### 網頁字型的選擇

#### 中文字型選擇考量

1. **可讀性優先**：
   - 襯線字體（如 Noto Serif TC）適合長篇閱讀內容
   - 無襯線字體（如 Noto Sans TC）適合介面元素和標題

2. **常用中文網頁字型組合**：

```css
/* 正文優先 */
body {
    font-family: 'Noto Serif TC', serif;
}

/* 介面優先 */
body {
    font-family: 'Noto Sans TC', sans-serif;
}

/* 混合使用 */
body {
    font-family: 'Noto Sans TC', sans-serif;
}

h1, h2, h3, blockquote {
    font-family: 'Noto Serif TC', serif;
}
```

3. **加載優化**：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;500;700&display=swap" rel="stylesheet">
```

### 字型權重與變體

合理使用字型權重創造視覺層次：

```css
h1 {
    font-weight: 700; /* 粗體 */
}

h2 {
    font-weight: 500; /* 中等粗細 */
}

p {
    font-weight: 400; /* 標準粗細 */
}

.light-text {
    font-weight: 300; /* 細體 */
}
```

### 字型大小與行高

良好的排版需要合適的字型大小和行高比例：

```css
body {
    font-size: 16px;
    line-height: 1.6; /* 行高是字型大小的1.6倍 */
}

h1 {
    font-size: 2.5rem;
    line-height: 1.2; /* 標題通常需要更緊湊的行高 */
}

p {
    font-size: 1rem;
    line-height: 1.8; /* 段落文字需要更寬鬆的行高 */
}
```

## 性能優化

### 字型加載優化

使用字型預加載和適當的字重選擇：

```html
<!-- 預連接字型服務器 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 只加載需要的字重 -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;500;700&display=swap" rel="stylesheet">
```

### CSS 優化技巧

1. **選擇器效率**：

```css
/* 低效 */
.header ul li a { ... }

/* 高效 */
.nav-link { ... }
```

2. **避免過度使用 `!important`**

3. **CSS 變數提升可維護性**：

```css
:root {
    --primary-color: #3a3a3a;
    --secondary-color: #f5f5f5;
    --font-body: 'Noto Sans TC', sans-serif;
    --font-heading: 'Noto Serif TC', serif;
}

.header {
    background-color: var(--primary-color);
    font-family: var(--font-heading);
}
```

## 設計案例分析

### 現代媒體網站佈局特點

分析一個典型的現代媒體網站，可以發現以下特點：

1. **清晰的視覺層次**：
   - 使用字型大小、權重和顏色創造內容層次
   - 標題使用襯線字體，正文使用無襯線字體形成對比

2. **卡片式設計**：
   - 內容被封裝在卡片中，具有微妙的陰影和邊框
   - 卡片懸停效果提升交互性

3. **適當的留白**：
   - 元素之間有充分的間距
   - 內容分區清晰，減少視覺疲勞

4. **漸進式加載**：
   - 重要資源優先加載
   - 使用預連接和預加載提升性能

5. **微妙的動畫**：
   - 使用簡單的過渡效果增強用戶體驗
   - 避免過度使用動畫造成干擾

### 設計技巧實例

```css
/* 卡片懸停效果 */
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

/* 漸變背景 */
.header {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* 精細排版 */
.article-title {
    font-family: 'Noto Serif TC', serif;
    font-weight: 700;
    font-size: 2rem;
    letter-spacing: -0.02em;
    margin-bottom: 0.5em;
}

.article-meta {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 0.875rem;
    color: #6c757d;
    margin-bottom: 2em;
}
```

---

筆記作者：lcslin  
最後更新：2025年6月15日
