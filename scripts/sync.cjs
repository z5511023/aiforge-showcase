#!/usr/bin/env node
/**
 * AIForge 自动同步脚本
 * 
 * 用法：
 *   npm run sync           # 自动 add + commit + push
 *   npm run sync "描述"    # 自定义提交描述
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// 颜色输出
const C = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
}

function log(color, msg) {
  console.log(`${color}${msg}${C.reset}`)
}

// 读取 .env 文件
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env')
  if (!fs.existsSync(envPath)) {
    log(C.red, '错误：找不到 .env 文件')
    log(C.gray, '请确保项目根目录有 .env 文件，包含：')
    log(C.gray, '  GITHUB_TOKEN=ghp_xxx')
    log(C.gray, '  GITHUB_REPO=z5511023/aiforge-showcase')
    process.exit(1)
  }

  const env = {}
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const match = line.match(/^([A-Z_]+)=(.+)$/)
    if (match) env[match[1]] = match[2].trim()
  })
  return env
}

// 延迟函数（兼容 Windows/Mac/Linux）
function sleepMs(ms) {
  const start = Date.now()
  while (Date.now() - start < ms) {}
}

// 执行命令，带重试
function run(cmd, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return execSync(cmd, { stdio: 'pipe', encoding: 'utf8', cwd: path.resolve(__dirname, '..') })
    } catch (err) {
      if (i === retries - 1) throw err
      log(C.yellow, `  失败，3秒后重试...`)
      sleepMs(3000)
    }
  }
}

// 主流程
async function main() {
  log(C.cyan, '\n  ╔══════════════════════════════════════╗')
  log(C.cyan, '  ║     AIForge 自动同步到 GitHub      ║')
  log(C.cyan, '  ╚══════════════════════════════════════╝\n')

  // 1. 读取配置
  log(C.blue, '[1/5] 读取配置...')
  const env = loadEnv()
  const token = env.GITHUB_TOKEN
  const repo = env.GITHUB_REPO

  if (!token || !repo) {
    log(C.red, '错误：.env 中缺少 GITHUB_TOKEN 或 GITHUB_REPO')
    process.exit(1)
  }

  if (!token.startsWith('ghp_')) {
    log(C.yellow, '警告：Token 格式可能不正确，应以 ghp_ 开头')
  }

  // 2. 检查 git 状态
  log(C.blue, '[2/5] 检查文件变更...')
  let status
  try {
    status = execSync('git status --short', { encoding: 'utf8', cwd: path.resolve(__dirname, '..') })
  } catch {
    log(C.red, '错误：当前目录不是 git 仓库，请先运行 git init')
    process.exit(1)
  }

  if (!status.trim()) {
    log(C.green, '没有文件变更，无需同步。')
    process.exit(0)
  }

  log(C.gray, `发现 ${status.trim().split('\n').length} 个变更文件`)

  // 3. git add
  log(C.blue, '[3/5] 添加文件到暂存区...')
  try {
    run('git add .')
    log(C.green, '  ✓ 文件已添加')
  } catch (err) {
    log(C.red, `  ✗ 失败: ${err.message}`)
    process.exit(1)
  }

  // 4. git commit
  log(C.blue, '[4/5] 创建提交...')
  const message = process.argv[2] || `auto sync: ${new Date().toLocaleString('zh-CN')}`
  try {
    run(`git commit -m "${message.replace(/"/g, '\\"')}"`)
    log(C.green, `  ✓ 已提交: ${message}`)
  } catch (err) {
    // 可能是 nothing to commit
    if (err.stderr?.includes('nothing to commit')) {
      log(C.yellow, '  没有可提交的内容')
      process.exit(0)
    }
    log(C.red, `  ✗ 失败: ${err.stderr || err.message}`)
    process.exit(1)
  }

  // 5. git push
  log(C.blue, '[5/5] 推送到 GitHub（最多重试3次）...')

  const remoteUrl = `https://${token}@github.com/${repo}.git`
  const originalUrl = (() => {
    try {
      return execSync('git remote get-url origin', { encoding: 'utf8', cwd: path.resolve(__dirname, '..') }).trim()
    } catch {
      return null
    }
  })()

  // 设置带 token 的 remote URL
  try {
    execSync(`git remote set-url origin ${remoteUrl}`, { cwd: path.resolve(__dirname, '..') })
    log(C.gray, '  已配置 Token 认证')
  } catch (err) {
    // 如果没有 remote，添加
    log(C.gray, '  添加远程仓库...')
    try {
      execSync(`git remote add origin ${remoteUrl}`, { cwd: path.resolve(__dirname, '..') })
    } catch (err2) {
      log(C.red, `  ✗ 配置远程仓库失败: ${err2.stderr || err2.message}`)
      process.exit(1)
    }
  }

  // 推送
  let pushed = false
  try {
    execSync('git push origin main', { stdio: 'pipe', encoding: 'utf8', cwd: path.resolve(__dirname, '..') })
    log(C.green, '  ✓ 推送成功！')
    pushed = true
  } catch (err) {
    log(C.yellow, '  常规推送失败，尝试 force push...')
    try {
      execSync('git push origin main --force', { stdio: 'pipe', encoding: 'utf8', cwd: path.resolve(__dirname, '..') })
      log(C.green, '  ✓ Force push 成功！')
      pushed = true
    } catch (err2) {
      log(C.red, '  ✗ 推送失败')
      log(C.red, `    ${err2.stderr || err2.message}`)
    }
  }

  // 恢复原来的 remote URL（如果有）
  if (originalUrl && originalUrl !== remoteUrl) {
    try {
      execSync(`git remote set-url origin ${originalUrl}`, { cwd: path.resolve(__dirname, '..') })
    } catch { /* ignore */ }
  }

  if (!pushed) {
    log(C.yellow, '\n  建议：')
    log(C.gray, '  1. 检查网络连接（GitHub 访问可能需要代理）')
    log(C.gray, '  2. 检查 Token 是否有 repo 权限')
    log(C.gray, '  3. 手动运行: git push origin main')
    process.exit(1)
  }

  // 完成
  log(C.cyan, '\n  ══════════════════════════════════════')
  log(C.green, '  同步完成！')
  log(C.gray, `  仓库: https://github.com/${repo}`)
  log(C.gray, `  页面: https://${repo.split('/')[0]}.github.io/${repo.split('/')[1]}`)
  log(C.cyan, '  ══════════════════════════════════════\n')
}

main().catch(err => {
  log(C.red, `\n意外错误: ${err.message}`)
  process.exit(1)
})
