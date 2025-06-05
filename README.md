# example-app-router

> info
> 这是`next-intl`官方提供的示例

An example that showcases basic usage of `next-intl` with the App Router, including internationalized routing.

[Demo](https://next-intl-example-app-router.vercel.app/)

## Deploy your own

By deploying to [Vercel](https://vercel.com), you can check out the example in action. Note that you'll be prompted to create a new GitHub repository as part of this, allowing you to make subsequent changes.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/amannn/next-intl/tree/main/examples/example-app-router)

## 注意

在 Next.js 项目中，`src/app/layout.tsx`、`src/app/page.tsx` 和 `src/app/[locale]/layout.tsx` 并不是重复文件，它们各自承担不同的职责，共同构成国际化路由的完整结构。以下是它们的区别和必要性：

---

### **1. 文件分工**
| 文件路径                          | 作用                                                                 | 是否必须？               |
|-----------------------------------|----------------------------------------------------------------------|--------------------------|
| `src/app/layout.tsx`              | **根布局**：包裹所有子路由，提供全局 HTML 结构（如 `<html>`、`<body>`）。 | 是（但可以简化为 `children` 透传） |
| `src/app/page.tsx`                | **根页面**：处理根路径（如 `/`）的重定向逻辑（如跳转到默认语言 `/en`）。   | 可选（依赖路由设计）     |
| `src/app/[locale]/layout.tsx`     | **语言布局**：初始化多语言环境，定义语言路由的共享布局（如导航栏）。       | 是（多语言项目必需）     |

---

### **2. 具体分析**
#### **(1) `src/app/layout.tsx`（根布局）**
- **作用**：提供最外层的 HTML 结构，适用于所有路由。
- **你的代码**：当前仅透传 `children`，因为实际布局由 `[locale]/layout.tsx` 处理。
  ```tsx
  export default function RootLayout({ children }: Props) {
    return children; // 透传给子路由的布局
  }
  ```
- **必要性**：即使内容简单，也是必需的（尤其是存在 `not-found.tsx` 时）。

#### **(2) `src/app/page.tsx`（根页面）**
- **作用**：访问根路径 `/` 时，重定向到默认语言（如 `/en`）。
  ```tsx
  export default function RootPage() {
    redirect('/DE'); // 重定向到德语
  }
  ```
- **必要性**：可选。如果直接访问 `/en` 或 `/zh`，此文件不会触发。

#### **(3) `src/app/[locale]/layout.tsx`（语言布局）**
- **作用**：
  - 设置语言环境（`setRequestLocale`）。
  - 加载翻译配置（`NextIntlClientProvider`）。
  - 定义语言路由的共享布局（如导航栏）。
  ```tsx
  export default function LocaleLayout({ children, params }: Props) {
    setRequestLocale(params.locale); // 设置语言
    return (
      <html lang={params.locale}>
        <body>
          <NextIntlClientProvider> {/* 提供翻译 */}
            <Navigation /> {/* 共享导航栏 */}
            {children} {/* 子页面（如 [locale]/page.tsx） */}
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }
  ```
- **必要性**：多语言项目的核心，不可省略。

---

### **3. 为什么需要多个布局文件？**
- **分层设计**：
  - 根布局（`app/layout.tsx`）处理全局结构。
  - 语言布局（`app/[locale]/layout.tsx`）处理语言相关的逻辑。
- **灵活性**：
  - 根布局可以独立扩展（如添加全局错误边界）。
  - 语言布局可以专注于国际化需求。

---

### **4. 常见误区**
#### **Q: 能否合并 `app/layout.tsx` 和 `app/[locale]/layout.tsx`？**
- **不建议**。Next.js 的 App Router 要求根布局必须存在，且动态路由（如 `[locale]`）的布局需分开管理。

#### **Q: 根页面 `app/page.tsx` 是否可以删除？**
- **可以**，但需确保用户访问 `/` 时有其他重定向逻辑（如中间件）。

---

### **5. 你的项目结构优化建议**
- 保持当前文件结构，这是 Next.js 国际化推荐的最佳实践。
- 如果根路径无需重定向，可删除 `app/page.tsx`，改用中间件跳转：
  ```ts
  // middleware.ts
  export function middleware(request: NextRequest) {
    const locale = getLocale(request); // 获取用户首选语言
    return NextResponse.redirect(`/${locale}`);
  }
  ```

---

### **总结**
- **非重复**：三个文件各司其职，分别处理全局、根路径和语言路由的逻辑。
- **必要性**：`layout.tsx` 是框架强制要求，`[locale]/layout.tsx` 是多语言的核心。
- **优化**：根页面 (`page.tsx`) 可替换为中间件，但需权衡实现复杂度。