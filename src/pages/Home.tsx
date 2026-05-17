import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router'
import { Github, Heart, ExternalLink, Layers, Box, Monitor, Smartphone, LayoutDashboard, Upload, Code, Trash2, Lock, Unlock, RotateCcw, AlertTriangle } from 'lucide-react'
import { useAdmin, useDeletedPrototypes } from '../hooks/useAdmin'

interface Prototype {
  id: string
  model: 'KIMI' | 'Mimo' | 'ChatGPT' | 'Gemini'
  type: '官网' | 'APP' | '后台'
  title: string
  description: string
  tags: string[]
  thumbnail: string
  source: 'detail' | 'html'
  detailPath?: string
  htmlPath?: string
}

const modelFilters = ['全部模型', 'KIMI', 'Mimo', 'ChatGPT', 'Gemini'] as const
const typeFilters = ['全部类型', '官网', 'APP', '后台'] as const
const sourceFilters = ['全部来源', '内置原型', 'HTML原型'] as const

const modelBadgeClass: Record<string, string> = {
  KIMI: 'model-badge-kimi',
  Mimo: 'model-badge-mimo',
  ChatGPT: 'model-badge-chatgpt',
  Gemini: 'model-badge-gemini',
}

const typeIcon: Record<string, React.ReactNode> = {
  官网: <Monitor className="w-3.5 h-3.5" />,
  APP: <Smartphone className="w-3.5 h-3.5" />,
  后台: <LayoutDashboard className="w-3.5 h-3.5" />,
}

export default function Home() {
  const [prototypes, setPrototypes] = useState<Prototype[]>([])
  const [activeModel, setActiveModel] = useState<string>('全部模型')
  const [activeType, setActiveType] = useState<string>('全部类型')
  const [activeSource, setActiveSource] = useState<string>('全部来源')
  const [loading, setLoading] = useState(true)
  const { isAdmin, login, logout } = useAdmin()
  const { deletedIds, deleteProto, restoreProto, isDeleted, clearAll } = useDeletedPrototypes()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginPw, setLoginPw] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [showDeleted, setShowDeleted] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  useEffect(() => {
    fetch('/prototypes.json')
      .then(res => res.json())
      .then(data => {
        setPrototypes(data.prototypes || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load prototypes:', err)
        setLoading(false)
      })
  }, [])

  // Filter: active filters + not deleted
  const filtered = useMemo(() => {
    return prototypes.filter((p) => {
      const matchModel = activeModel === '全部模型' || p.model === activeModel
      const matchType = activeType === '全部类型' || p.type === activeType
      const matchSource = activeSource === '全部来源' ||
        (activeSource === 'HTML原型' && p.source === 'html') ||
        (activeSource === '内置原型' && p.source === 'detail')
      const matchDeleted = !isDeleted(p.id)
      return matchModel && matchType && matchSource && matchDeleted
    })
  }, [prototypes, activeModel, activeType, activeSource, isDeleted])

  // Deleted prototypes list
  const deletedPrototypes = useMemo(() => {
    return prototypes.filter(p => isDeleted(p.id))
  }, [prototypes, isDeleted])

  const buildLink = (proto: Prototype): string => {
    if (proto.source === 'html' && proto.htmlPath) {
      return proto.htmlPath
    }
    if (proto.detailPath) {
      return `#${proto.detailPath}`
    }
    return '#'
  }

  const isHtmlProto = (proto: Prototype) => proto.source === 'html'

  const handleLogin = () => {
    if (login(loginPw)) {
      setShowLoginModal(false)
      setLoginPw('')
      setLoginErr('')
    } else {
      setLoginErr('密码错误')
    }
  }

  const handleDelete = (id: string) => {
    deleteProto(id)
    setConfirmDelete(null)
  }

  const visibleCount = filtered.length
  const totalCount = prototypes.length
  const deletedCount = deletedIds.length

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1">管理员登录</h3>
            <p className="text-sm text-gray-500 mb-4">请输入管理密码进入管理模式</p>
            <input
              type="password"
              value={loginPw}
              onChange={(e) => { setLoginPw(e.target.value); setLoginErr('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
              placeholder="管理密码"
              autoFocus
            />
            {loginErr && <p className="text-sm text-red-600 mt-2">{loginErr}</p>}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => { setShowLoginModal(false); setLoginPw(''); setLoginErr('') }}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleLogin}
                className="flex-1 py-2.5 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
              >
                登录
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">确认删除</h3>
                <p className="text-sm text-gray-500">此操作将从首页隐藏该原型</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              删除后原型不会真正移除，只是不在首页显示。管理员可以随时恢复。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">AIForge 前端设计原型大横评</h1>
            {isAdmin && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                管理模式
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {isAdmin ? (
              <>
                {deletedCount > 0 && (
                  <button
                    onClick={() => setShowDeleted(!showDeleted)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-200 bg-amber-50 text-sm font-medium text-amber-700 hover:bg-amber-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    已删除 ({deletedCount})
                  </button>
                )}
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Unlock className="w-4 h-4" />
                  退出管理
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Lock className="w-4 h-4" />
                管理
              </button>
            )}
            <Link
              to="/add"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 bg-blue-50 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <Upload className="w-4 h-4" />
              添加原型
            </Link>
            <a
              href="https://github.com/z5511023/aiforge-showcase"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Box className="w-4 h-4 text-gray-400" />
            <strong className="text-gray-900">{totalCount}</strong> 个原型
            {deletedCount > 0 && (
              <span className="text-gray-400">（显示 {visibleCount}，隐藏 {deletedCount}）</span>
            )}
          </span>
          <span className="w-px h-4 bg-gray-200" />
          <span className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-gray-400" />
            <strong className="text-gray-900">3</strong> 种产品类型
          </span>
          <span className="w-px h-4 bg-gray-200" />
          <span className="flex items-center gap-1.5">
            <Monitor className="w-4 h-4 text-gray-400" />
            <strong className="text-gray-900">4</strong> 个AI模型
          </span>
          <span className="w-px h-4 bg-gray-200" />
          <span className="flex items-center gap-1.5">
            <Code className="w-4 h-4 text-gray-400" />
            <strong className="text-gray-900">{prototypes.filter(p => p.source === 'html').length}</strong> 个HTML原型
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-6">
        {/* Filters */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            {modelFilters.map((f) => (
              <button key={f} onClick={() => setActiveModel(f)}
                className={`filter-btn ${activeModel === f ? 'filter-btn-active' : 'filter-btn-inactive'}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {typeFilters.map((f) => (
              <button key={f} onClick={() => setActiveType(f)}
                className={`filter-btn ${activeType === f ? 'filter-btn-active' : 'filter-btn-inactive'}`}>
                {f === '全部类型' ? f : <span className="flex items-center gap-1.5">{typeIcon[f]}{f}</span>}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {sourceFilters.map((f) => (
              <button key={f} onClick={() => setActiveSource(f)}
                className={`filter-btn ${activeSource === f ? 'filter-btn-active' : 'filter-btn-inactive'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Deleted Prototypes Section */}
        {isAdmin && showDeleted && deletedCount > 0 && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-amber-900 flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                已隐藏的原型（{deletedCount} 个）
              </h3>
              <button
                onClick={clearAll}
                className="text-sm text-amber-700 hover:text-amber-900 font-medium"
              >
                全部恢复
              </button>
            </div>
            <div className="space-y-2">
              {deletedPrototypes.map(proto => (
                <div key={proto.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-100">
                  <div className="flex items-center gap-3">
                    <span className={modelBadgeClass[proto.model]}>{proto.model}</span>
                    <span className="text-sm text-gray-500">{typeIcon[proto.type]}</span>
                    <span className="text-sm font-medium text-gray-900">{proto.title}</span>
                  </div>
                  <button
                    onClick={() => restoreProto(proto.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm hover:bg-emerald-100 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    恢复显示
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((proto) => {
                const link = buildLink(proto)
                const CardContent = (
                  <div className="proto-card group h-full flex flex-col relative">
                    {/* Admin Delete Button */}
                    {isAdmin && (
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConfirmDelete(proto.id) }}
                        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
                        title="删除原型"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    )}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <img src={proto.thumbnail} alt={proto.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                          {typeIcon[proto.type]}{proto.type}
                        </span>
                        {isHtmlProto(proto) && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-600 text-white text-xs font-medium">
                            <Code className="w-3 h-3" />HTML
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className={modelBadgeClass[proto.model]}>{proto.model}</span>
                        <button onClick={(e) => e.preventDefault()} className="text-gray-300 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1.5">{proto.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-3 flex-1">{proto.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {proto.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-400">{isHtmlProto(proto) ? 'HTML Prototype' : 'AIForge Design'}</span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                          {isHtmlProto(proto) ? '查看原型' : '查看详情'}<ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                )

                return isHtmlProto(proto) ? (
                  <a key={proto.id} href={link} target="_blank" rel="noopener noreferrer" className="block">{CardContent}</a>
                ) : (
                  <Link key={proto.id} to={link.replace('#', '')} className="block">{CardContent}</Link>
                )
              })}
            </div>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Box className="w-12 h-12 mb-4 opacity-40" />
                <p className="text-base font-medium">暂无匹配的原型</p>
                <p className="text-sm mt-1">{deletedCount > 0 ? `${deletedCount} 个原型已被隐藏，点击"管理"查看` : '请尝试其他筛选条件'}</p>
              </div>
            )}
          </>
        )}

        {/* How to Add */}
        <div className="mt-12 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            如何添加自己的原型
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">方式一：HTML 原型（推荐）</h4>
              <ol className="space-y-1.5 list-decimal list-inside">
                <li>将你的原型导出为 HTML 文件</li>
                <li>放入 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">public/prototypes-html/你的原型名/</code> 目录</li>
                <li>在 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">prototypes.json</code> 中添加配置</li>
                <li>提交代码，首页自动显示</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">方式二：GitHub 网页上传</h4>
              <ol className="space-y-1.5 list-decimal list-inside">
                <li>在 GitHub 仓库中进入 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">public/prototypes-html/</code></li>
                <li>点击 <strong>添加文件 &rarr; 上传文件</strong></li>
                <li>上传你的 HTML 文件和截图</li>
                <li>编辑 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">prototypes.json</code> 注册新原型</li>
              </ol>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 font-mono">配置示例：</p>
            <pre className="text-xs text-gray-600 mt-2 overflow-x-auto">{'{\n  "id": "my-prototype",\n  "model": "KIMI",\n  "type": "官网",\n  "title": "我的原型",\n  "description": "描述...",\n  "tags": ["自定义"],\n  "thumbnail": "/prototypes/website-car-kimi.jpg",\n  "source": "html",\n  "htmlPath": "/prototypes-html/my-prototype/index.html"\n}'}</pre>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-[1440px] mx-auto px-6 py-6 flex items-center justify-between text-sm text-gray-400">
          <span>AIForge Design Showcase</span>
          <span>2025 Built with React + Tailwind CSS</span>
        </div>
      </footer>
    </div>
  )
}
