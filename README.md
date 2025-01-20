# Monorepo 工程

## 推荐包管理工具

[`fnm`](https://github.com/Schniz/fnm)，因为他会根据项目的`.node-version`文件定义的`node`版本自动切换`node`版本。

- `Windows` 安装
  1. 推荐使用`powershell7`终端
  
    ```bash
    #PowerShell 终端输入
    winget search Microsoft.PowerShell
    ```

  2. 安装`fnm`
  
  ```bash
  winget install Schniz.fnm
  # 或者
  scoop install fnm
  ```

  3. 配置`shell`环境(自动切换版本功能)

    ```bash
    #创建配置文件
    if (-not (Test-Path $profile)) { New-Item $profile -Force }
    #编辑配置文件
    Invoke-Item $profile
    #复制下面配置到配置文件中
    fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
    ```

## 目录结构

- "apps/\*" 所有应用包
- "packages/\*" 所有基础工具包
- "components/\*" 所有组件包
- "common/\*" 暂未定义

## 基本用法

```bash
# 在 workspace 上添加依赖
pnpm add <package-name> -w

# 为某个包安装依赖包(本地包或者npm.js包)
# 1.控制终端根目录进入该包目录
# 2. 安装
pnpm add <package-name>

# workspace 运行脚本命令
# 在跟目录`package.json`添加脚本命令
# "<package-name>:dev": "pnpm --filter <package-name> dev",
# 例：
"app-one:dev": "pnpm --filter app-one dev",

# 测试部署配置参考you-gao-tou package.json 脚本配置
```

## Turbo 加速工具用法

```bash
# 该命令会同时运行build和check-types，所有包都会被检查
pnpm turbo build check-types
```

其他功能使用与普通包一致
在`workspace`目录使用`pnpm i`为所有包安装依赖。

> NOTE: `app-one` 和 `component-one` 是用于验证测试方案的包。
