import { ArrowLeft, BookOpen, Search, Sparkles, TrendingUp, Clock, Star, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function WebsiteKnowledgeDetail() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Top Info Bar */}
      <div className="bg-[#0a0a1a] border-b border-amber-900/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-amber-200/60 hover:text-amber-200">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">返回展厅</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200">Mimo</span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-900/30 text-amber-400">官网</span>
            <span className="text-sm text-amber-200/60">知识科普网站</span>
          </div>
        </div>
      </div>

      {/* ====== 原型内容 ====== */}
      {/* Nav */}
      <nav className="border-b border-amber-900/20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span className="text-lg font-bold text-amber-100">智识星球</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-amber-200/60">
            <a href="#" className="text-amber-400">首页</a>
            <a href="#" className="hover:text-amber-300">科学</a>
            <a href="#" className="hover:text-amber-300">人文</a>
            <a href="#" className="hover:text-amber-300">技术</a>
            <a href="#" className="hover:text-amber-300">自然</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-900/20 border border-amber-800/30 text-sm text-amber-200/60">
              <Search className="w-3.5 h-3.5" />
              <span>搜索知识...</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent" />
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent mb-6">
            探索知识的边界
          </h1>
          <p className="text-lg text-amber-200/50 max-w-2xl mx-auto mb-8">
            从宇宙起源到量子力学，从人类文明到前沿科技，智识星球带你领略知识的无穷魅力。
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold rounded-lg hover:from-amber-400 hover:to-amber-500">
              开始探索
            </button>
            <button className="px-6 py-3 border border-amber-700/50 text-amber-300 rounded-lg hover:bg-amber-900/20">
              每日推荐
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Sparkles className="w-6 h-6" />, name: '物理学', count: '1,234 篇' },
              { icon: <BookOpen className="w-6 h-6" />, name: '生物学', count: '892 篇' },
              { icon: <TrendingUp className="w-6 h-6" />, name: '天文学', count: '567 篇' },
              { icon: <Clock className="w-6 h-6" />, name: '历史学', count: '1,456 篇' },
            ].map((cat) => (
              <div key={cat.name} className="p-5 rounded-xl bg-amber-900/10 border border-amber-800/20 hover:border-amber-700/40 transition-colors cursor-pointer group">
                <div className="text-amber-400 mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="text-amber-100 font-semibold mb-1">{cat.name}</h3>
                <p className="text-xs text-amber-200/40">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-amber-100 mb-8 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400" /> 精选文章
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: '黑洞的本质：时空的终极边界', category: '物理学', read: '12.5万', img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500' },
              { title: 'DNA双螺旋：生命的密码本', category: '生物学', read: '8.3万', img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500' },
              { title: '火星殖民：人类的下一个家园', category: '天文学', read: '15.2万', img: 'https://images.unsplash.com/photo-1614728853913-1e22ba0e982c?w=500' },
            ].map((article) => (
              <div key={article.title} className="rounded-xl overflow-hidden bg-amber-900/10 border border-amber-800/20 group cursor-pointer hover:border-amber-700/40 transition-colors">
                <div className="aspect-video overflow-hidden">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-5">
                  <span className="text-xs px-2 py-0.5 rounded border border-amber-700/50 text-amber-400">{article.category}</span>
                  <h3 className="text-amber-100 font-semibold mt-3 mb-2 group-hover:text-amber-400 transition-colors">{article.title}</h3>
                  <p className="text-xs text-amber-200/40">{article.read} 次阅读</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Recommend */}
      <section className="py-16 bg-amber-950/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-amber-100 mb-8">每日推荐</h2>
          <div className="space-y-4">
            {[
              { title: '量子计算机如何改变未来世界', tag: '前沿科技', time: '10 分钟阅读' },
              { title: '深海探秘：马里亚纳海沟的奇异生物', tag: '自然科学', time: '8 分钟阅读' },
              { title: '人工智能时代的伦理思考', tag: '科技人文', time: '12 分钟阅读' },
              { title: '宇宙大爆炸：138亿年的演化之旅', tag: '天文学', time: '15 分钟阅读' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-amber-900/10 border border-amber-800/20 hover:border-amber-700/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-amber-700/40">0{i + 1}</span>
                  <div>
                    <h3 className="text-amber-100 font-medium">{item.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-900/30 text-amber-400">{item.tag}</span>
                      <span className="text-xs text-amber-200/30">{item.time}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-amber-700/40" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-900/20 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-lg font-bold text-amber-100">智识星球</span>
          </div>
          <p className="text-sm text-amber-200/30 mb-6">让知识照亮前行的路</p>
          <div className="flex justify-center gap-6 text-sm text-amber-200/40">
            <a href="#" className="hover:text-amber-300">关于我们</a>
            <a href="#" className="hover:text-amber-300">投稿</a>
            <a href="#" className="hover:text-amber-300">合作</a>
            <a href="#" className="hover:text-amber-300">隐私政策</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
