import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { ArrowLeft, Upload, FileCode, Lock, Unlock, Check, Download, AlertCircle, Eye, EyeOff } from 'lucide-react'

const ADMIN_PASSWORD = 'aiforge2025' // 管理员密码

interface PrototypeForm {
  id: string
  model: 'KIMI' | 'Mimo' | 'ChatGPT' | 'Gemini'
  type: '官网' | 'APP' | '后台'
  title: string
  description: string
  tags: string
  source: 'html' | 'detail'
}

const initialForm: PrototypeForm = {
  id: '',
  model: 'KIMI',
  type: '官网',
  title: '',
  description: '',
  tags: '',
  source: 'html',
}

export default function AddPrototype() {
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [form, setForm] = useState<PrototypeForm>(initialForm)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [generatedConfig, setGeneratedConfig] = useState('')
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setPasswordError('')
    } else {
      setPasswordError('密码错误，请重试')
    }
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.name.endsWith('.html') || file.name.endsWith('.htm')) {
        setUploadedFile(file)
      } else {
        alert('请上传 HTML 文件 (.html 或 .htm)')
      }
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setUploadedFile(files[0])
    }
  }

  const generateConfig = () => {
    const tags = form.tags.split(/[,，]/).map(t => t.trim()).filter(Boolean)
    const config = {
      id: form.id || `prototype-${Date.now()}`,
      model: form.model,
      type: form.type,
      title: form.title,
      description: form.description,
      tags: tags.length > 0 ? tags : ['自定义'],
      thumbnail: `/prototypes/website-car-kimi.jpg`,
      source: form.source,
      ...(form.source === 'html' ? {
        htmlPath: `/prototypes-html/${form.id || 'my-prototype'}/index.html`
      } : {
        detailPath: `/prototype/${form.id || 'my-prototype'}`
      })
    }
    setGeneratedConfig(JSON.stringify(config, null, 2))
  }

  const downloadFiles = () => {
    if (!uploadedFile && form.source === 'html') {
      alert('请先上传 HTML 文件')
      return
    }

    // Create a zip-like experience by downloading individual files
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile)
      const a = document.createElement('a')
      a.href = url
      a.download = 'index.html'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }

    // Download config as JSON
    if (generatedConfig) {
      const blob = new Blob([generatedConfig], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'prototype-config.json'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }

    alert('文件已下载！请将 HTML 文件放入 public/prototypes-html/你的原型名/ 目录，并将配置添加到 prototypes.json')
  }

  const copyConfig = () => {
    navigator.clipboard.writeText(generatedConfig).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Password gate
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-[600px] mx-auto px-6 h-14 flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">返回展厅</span>
            </button>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">管理员验证</h1>
              <p className="text-sm text-gray-500">此页面需要管理员权限才能访问</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">请输入管理密码</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setPasswordError('')
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="管理密码"
                  autoFocus
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {passwordError && (
                <div className="flex items-center gap-1.5 mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {passwordError}
                </div>
              )}
              <button
                onClick={handleLogin}
                className="w-full mt-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                验证进入
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                提示：密码请联系项目管理员获取
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[900px] mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">返回展厅</span>
          </button>
          <div className="flex items-center gap-2 text-sm text-emerald-600">
            <Unlock className="w-4 h-4" />
            管理员模式
          </div>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">添加新原型</h1>
          <p className="text-sm text-gray-500">填写表单并上传 HTML 文件，自动生成配置</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">原型 ID <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                placeholder="my-prototype"
              />
              <p className="text-xs text-gray-400 mt-1">唯一标识，英文+数字，如 my-awesome-proto</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">模型标签 <span className="text-red-500">*</span></label>
              <select
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-white"
              >
                <option value="KIMI">KIMI</option>
                <option value="Mimo">Mimo</option>
                <option value="ChatGPT">ChatGPT</option>
                <option value="Gemini">Gemini</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">产品类型 <span className="text-red-500">*</span></label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-white"
              >
                <option value="官网">官网</option>
                <option value="APP">APP</option>
                <option value="后台">后台</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">原型来源</label>
              <select
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-white"
              >
                <option value="html">HTML 文件（外部原型）</option>
                <option value="detail">React 组件（内置页面）</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">原型标题 <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              placeholder="我的超酷原型"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">描述 <span className="text-red-500">*</span></label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm resize-none"
              placeholder="这是一个用KIMI设计的官网原型，采用了白蓝渐变风格..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">标签</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              placeholder="自定义, 深色主题, 企业官网（用逗号分隔）"
            />
          </div>

          {/* File Upload */}
          {form.source === 'html' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">上传 HTML 文件</label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  dragOver
                    ? 'border-blue-500 bg-blue-50'
                    : uploadedFile
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-400 bg-gray-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".html,.htm"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {uploadedFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <FileCode className="w-10 h-10 text-emerald-600" />
                    <p className="text-sm font-medium text-emerald-700">{uploadedFile.name}</p>
                    <p className="text-xs text-emerald-500">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-10 h-10 text-gray-400" />
                    <p className="text-sm text-gray-600">拖拽 HTML 文件到此处，或 <span className="text-blue-600">点击选择</span></p>
                    <p className="text-xs text-gray-400">支持 .html / .htm 格式</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            onClick={generateConfig}
            className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            生成配置
          </button>
        </div>

        {/* Generated Config */}
        {generatedConfig && (
          <div className="bg-slate-900 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <h3 className="text-white font-semibold">已生成配置</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyConfig}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Unlock className="w-4 h-4" />}
                  {copied ? '已复制' : '复制'}
                </button>
                <button
                  onClick={downloadFiles}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  下载文件
                </button>
              </div>
            </div>
            <pre className="text-sm text-slate-300 overflow-x-auto leading-relaxed">{generatedConfig}</pre>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            部署步骤
          </h3>
          <ol className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
              <span>点击<strong>"下载文件"</strong>获取 HTML 文件和配置 JSON</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
              <span>将 HTML 文件放入 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">{'public/prototypes-html/'}{form.id || 'your-id'}{'/index.html'}</code></span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
              <span>将生成的 JSON 配置复制粘贴到 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">public/prototypes.json</code> 的 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">prototypes</code> 数组中</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">4</span>
              <span>提交代码到 GitHub，首页自动更新</span>
            </li>
          </ol>
        </div>
      </main>
    </div>
  )
}
