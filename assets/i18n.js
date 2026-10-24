/* ============================================================
   航运派 Trans Pi · 中英界面切换引擎
   ------------------------------------------------------------
   用法（在 HTML 中）：
     · 纯文本元素：  <h2 data-i18n="books_title">潮汐漫读</h2>
     · 含 <br> 等：  <p data-i18n-html="hero_sub">深耕…<br />以专业…</p>
     · 文档标题：    <title data-i18n-title="title_index">…</title>
     · 切换按钮：    <button class="lang-btn" data-lang="zh">中</button>
   语言来源优先级：URL ?lang=zh|en  >  localStorage('tp-lang')  >  默认中文
   只翻译界面骨架；文章正文/书目条目/工具内部界面保持中文。
   ============================================================ */
(function () {
  'use strict';

  var DICT = {
    zh: {
      /* ---- 共享骨架 ---- */
      brand_nav: '航运派',
      brand_footer: '航运派',
      nav_about: '关于',
      nav_column: '专栏',
      nav_books: '潮汐漫读',
      nav_tools: '实用工具',
      nav_contact: '联系',
      foot_about: '关于 William',
      foot_subscribe: '专栏订阅',
      foot_coop: '商务合作',
      foot_tagline: '传递资讯，更传递价值',
      foot_qr: '微信扫码 · 关注「航运派」公众号',
      foot_copy: '© 2026 航运派（Trans Pi）. 保留所有权利。',
      foot_legal1: '本网站原创的文字、图表与版式设计之著作权均归「航运派」及其主理人William 所有；未经书面授权，不得以任何形式转载、摘编或用于商业用途。',
      foot_legal2: '本站所引用的法规、政策原文均已注明来源，其著作权归原作者或相关官方机构所有；一切以官方发布的最新版本为准。',

      /* ---- 返回链接 ---- */
      back_home: '← 返回首页',
      back_column: '← 返回 · 专栏',
      back_tools: '← 返回 · 实用工具',
      back_knowledge: '← 返回 · 航运知识库',
      back_insight: '← 返回 · 行业洞察分析',
      back_site: '← 返回 航运派 Trans Pi',

      /* ---- 首页 Hero ---- */
      hero_tag: '国际航运物流专家',
      hero_sub: '深耕货代物流领域<br />以专业深度构建航运知识体系',
      slogan: '传递资讯，更传递价值',
      hero_cta1: '了解我的专栏',
      hero_cta2: '联系合作',

      /* ---- 专业背景与核心领域 ---- */
      about_title: '专业背景与核心领域',
      about_desc: '聚焦各航线的深度研究与实操经验沉淀',
      card_knowledge: '航运知识库',
      card_knowledge_d: '系统性梳理航运物流知识框架，打造可复用的方法论与最佳实践',
      card_insight: '行业洞察分析',
      card_insight_d: '追踪运价波动、港口动态与政策变化，提供具有前瞻性的市场解读',
      card_ieepa: '美国 IEEPA 关税时间线',
      card_ieepa_d: '2025–2026 年 IEEPA 关税从开征、法院裁决、最高法院审理到 CAPE 大规模退款的完整时间脉络，一键读懂关键节点',
      card_eu: '欧盟海关与关税法规',
      card_eu_d: 'UCC 法典、2026 海关改革、电商低值包裹新政与 AEO 认证——官方原文源 + 结构化速查，合规要点一图读懂',
      card_trade: '贸易协定专题',
      card_trade_d: 'RCEP、USMCA、CPTPP 三大协定的关税减让与原产地规则要点，官方原文源 + 结构化速查，一页读懂优惠关税怎么拿',
      card_hazmat: '美国 DOT 危险品法规',
      card_hazmat_d: 'PHMSA 危险品运输法规（HMR / 49 CFR）的框架、9 大类分类、危险信息传递与锂电池专项，官方原文源 + 结构化速查',

      /* ---- 实用工具 ---- */
      tools_title: '实用工具',
      tools_desc: '为航运从业者与 AI 爱好者整理的即开即用工具：世界时区对照、主流船公司直达、中国沿海主要港口业务操作 / 查询平台导航、货代报价单生成器、航运术语表中英对照、常用单位换算与实时汇率换算',
      tool_quote: '货代报价单生成器',
      tool_quote_d: '海运整柜 / 拼箱、空运、铁路与全程物流报价一键生成，支持多币种、Logo、条款与导出 PDF，专业又省时',
      tool_worldtime: '世界时间',
      tool_worldtime_d: '上海、新加坡、鹿特丹、洛杉矶等核心航运城市实时本地时间对照，跨时区沟通不再算错点',
      tool_carriers: '常见船公司查询链接',
      tool_carriers_d: 'Maersk、MSC、CMA CGM、中远海运、长荣等主流船公司官网直达，查船期、运价与提单一站搞定',
      tool_ports: '中国沿海港口平台导航',
      tool_ports_d: '环渤海、长三角、东南沿海、珠三角主要港口官方业务操作与查询平台一站直达：电子放箱、VGM、提货单、船期箱货查询、报关申报',
      tool_glossary: '航运术语表 · 中英对照',
      tool_glossary_d: '805 条航运核心术语中英文对照与释义，支持英文缩写、中文名称或释义关键词实时搜索，A–Z 字母索引快速定位，阅读本专栏文章时的随手速查工具',
      tool_units: '单位换算',
      tool_units_d: '货代物流常用单位一键互转：重量 kg↔lb、体积 CBM↔CBF、长度 英寸↔厘米、温度 ℃↔℉，输入即出结果、可交换单位',
      tool_fx: '实时汇率换算',
      tool_fx_d: '美元、人民币、欧元、港币、日元等 19 种货币一键互转，汇率来自公开接口的真实市场参考价，输入即出结果、可双向换算与交换',

      /* ---- 潮汐漫读 ---- */
      books_title: '潮汐漫读',
      books_subtitle: '随潮汐展卷，于书页远航',
      books_desc: '潮汐漫读，是属于航运人的书单自留地。这里既有集装箱革命、全球海运图景、航运先驱传记等行业经典，也收纳人文、历史与科幻佳作。不必只读海图与单证，在潮起潮落间慢读，于文字里看见更辽阔的世界。',
      books_more: '查看全部书目 →',
      books_page_desc: '潮汐漫读，是属于航运人的书单自留地。这里既有集装箱革命、全球海运图景、航运先驱传记等行业经典，也收纳人文、历史与科幻佳作。不必只读海图与单证，在潮起潮落间慢读，于文字里看见更辽阔的世界。',
      books_note: '以上为个人阅读推荐，书目信息与版本以出版社及官方最新公告为准；书目会不定期补充与调整。',

      /* ---- 数据说话 ---- */
      metrics_title: '数据说话',
      metric_years: '年行业深耕',
      metric_clients: '服务客户数',
      metric_articles: '专业文章',
      metric_satisfaction: '客户满意度',

      /* ---- 航运现场 ---- */
      gallery_title: '航运现场 · 实景记录',

      /* ---- 关于页 ---- */
      about_hero_title: '航运派 · William',
      about_hero_sub: '随潮汐展卷，于书页远航',
      about_brand_title: '航运派 · 品牌主张',
      about_pi_caption: '无限的可能性 · 永恒的探索',
      about_qr_title: '微信扫码 · 关注「航运派」',
      about_qr_sub: '公众号同步更新<br />航运洞察与实操笔记',
      about_expert_title: 'William · 专家简介',

      /* ---- 列表页 ---- */
      knowledge_title: '航运知识库',
      knowledge_desc: '系统性梳理航运物流知识框架，打造可复用的方法论与最佳实践。每一篇文章都是一次知识的沉淀，每一次阅读都是一次新的探索。',
      insight_title: '行业洞察分析',
      insight_desc: '追踪运价波动、港口动态与政策变化，提供具有前瞻性的市场解读。每周一期美加线港口汇总，给你最即时的行业脉搏。',

      /* ---- 文章页栏目标签 ---- */
      eyebrow_knowledge: '航运知识库',
      eyebrow_insight: '行业洞察分析',
      eyebrow_ieepa: '专栏 · IEEPA 关税',
      eyebrow_hazmat: '专栏 · 危险品法规',
      eyebrow_eu: '专栏 · 欧盟海关与关税',
      eyebrow_trade: '专栏 · 贸易协定',

      /* ---- 工具页标题/导语 ---- */
      toolh_worldtime: '世界时间',
      toolsub_worldtime: '核心航运城市实时本地时间对照，跨时区沟通、约会议、算截关不再算错点。每秒自动刷新。按大洲分组，同大洲依英文名首字母排列。',
      toolh_carriers: '常见船公司查询链接',
      toolsub_carriers: '主流班轮公司官网直达，查船期、运价、提单与 track & trace 一站搞定。点击卡片在新标签打开。',
      toolh_ports: '中国沿海主要港口业务操作 / 查询平台导航',
      toolsub_ports: '按环渤海及北方沿海、长三角、东南沿海、珠三角四大区域整理主要港口的官方业务操作与查询平台，涵盖电子放箱、VGM、提货单、船期箱货查询、报关申报等常用入口。点击网址在新标签打开。',
      toolh_units: '单位换算',
      toolsub_units: '货代与物流报价里最常用的单位换算：重量、体积、长度、温度一键互转。输入任意一侧数值，另一侧实时得出结果，支持单位交换。所有换算基于国际通用换算系数。',
      toolh_fx: '实时汇率换算',
      toolsub_fx: '航运报价、海运费结算与跨境付款常用的多币种一键互转。汇率来自 exchangerate-api.com 公开接口（以美元为基准，每日更新真实市场参考价），输入任意一侧金额，另一侧实时得出结果，支持双向换算与一键交换。',
      toolh_glossary: '航运术语表 · 中英对照',
      toolsub_glossary: '支持中英文实时搜索，可通过下方字母索引快速定位术语。输入英文缩写、中文名称或释义关键词即可实时筛选。',
      toolh_quote: '货代报价单生成器',

      /* ---- 文档标题 ---- */
      title_index: '航运派 · William | 国际航运物流专家',
      title_about: '关于航运派 · William | 国际航运物流专家',
      title_books: '潮汐漫读 | 航运派 · Trans Pi',
      title_knowledge: '航运知识库 | 航运派 · Trans Pi',
      title_insight: '行业洞察分析 | 航运派 · Trans Pi',
      title_tools_quote: '货代报价单生成器 · 航运派 Trans Pi',
      title_tools_worldtime: '世界时间 · 航运派 Trans Pi',
      title_tools_carriers: '常见船公司查询链接 · 航运派 Trans Pi',
      title_tools_ports: '中国沿海主要港口业务操作/查询平台导航 · 航运派 Trans Pi',
      title_tools_units: '单位换算 · 航运派 Trans Pi',
      title_tools_fx: '实时汇率换算 · 航运派 Trans Pi',
      title_glossary: '航运术语表 · 中英对照 · 航运派 Trans Pi'
    },

    en: {
      /* ---- Shared chrome ---- */
      brand_nav: 'Trans Pi',
      brand_footer: 'Trans Pi',
      nav_about: 'About',
      nav_column: 'Columns',
      nav_books: 'Tide Reads',
      nav_tools: 'Toolkit',
      nav_contact: 'Contact',
      foot_about: 'About William',
      foot_subscribe: 'Subscribe',
      foot_coop: 'Partnership',
      foot_tagline: 'Delivering Insights, Creating Value.',
      foot_qr: 'Scan to follow Trans Pi on WeChat',
      foot_copy: '© 2026 Trans Pi. All rights reserved.',
      foot_legal1: 'All original text, charts and layout designs on this site are copyrighted by Trans Pi and its founder William. No reproduction, excerpting or commercial use without written permission.',
      foot_legal2: 'Referenced regulations and policies are credited to their sources and remain the property of their authors or issuing bodies. Always refer to the latest official release.',

      /* ---- Back links ---- */
      back_home: '← Back to Home',
      back_column: '← Back · Columns',
      back_tools: '← Back · Toolkit',
      back_knowledge: '← Back · Knowledge Base',
      back_insight: '← Back · Industry Insights',
      back_site: '← Back to Trans Pi',

      /* ---- Hero ---- */
      hero_tag: 'International Shipping & Logistics Expert',
      hero_sub: 'Deeply rooted in freight forwarding &amp; logistics,<br />we build a professional, in-depth maritime knowledge system.',
      hero_cta1: 'Explore the Columns',
      hero_cta2: 'Contact for Partnerships',
      slogan: 'Delivering Insights, Creating Value.',

      /* ---- Expertise ---- */
      about_title: 'Expertise & Focus Areas',
      about_desc: 'Deep research and hands-on experience across every trade lane',
      card_knowledge: 'Knowledge Base',
      card_knowledge_d: 'A systematic shipping & logistics framework with reusable methods and best practices',
      card_insight: 'Industry Insights',
      card_insight_d: 'Tracking freight rates, port dynamics and policy shifts — forward-looking market reads',
      card_ieepa: 'U.S. IEEPA Tariff Timeline',
      card_ieepa_d: 'The full 2025–2026 arc of IEEPA tariffs — imposition, court rulings, the Supreme Court case and the mass CAPE refunds',
      card_eu: 'EU Customs & Tariff Rules',
      card_eu_d: 'The UCC, the 2026 customs reform, new e-commerce low-value parcel rules and AEO — official sources plus structured quick reference',
      card_trade: 'Trade Agreements',
      card_trade_d: 'Tariff concessions and rules of origin under RCEP, USMCA and CPTPP — how preferential duties are actually claimed',
      card_hazmat: 'U.S. DOT Dangerous Goods',
      card_hazmat_d: 'The PHMSA framework (HMR / 49 CFR): nine hazard classes, hazard communication and lithium battery specifics',

      /* ---- Tools ---- */
      tools_title: 'Toolkit',
      tools_desc: 'Ready-to-use tools for shipping professionals and AI enthusiasts: world clocks, direct carrier links, China coastal port platforms, a freight quotation builder, a bilingual shipping glossary, unit conversion and live FX rates',
      tool_quote: 'Freight Quotation Builder',
      tool_quote_d: 'One-click quotes for FCL, LCL, air, rail and door-to-door — multi-currency, logo, terms and PDF export',
      tool_worldtime: 'World Clock',
      tool_worldtime_d: 'Live local times across key shipping hubs — Shanghai, Singapore, Rotterdam, Los Angeles and more',
      tool_carriers: 'Carrier Links',
      tool_carriers_d: 'Direct links to Maersk, MSC, CMA CGM, COSCO, Evergreen and other majors — schedules, rates and B/Ls in one place',
      tool_ports: 'China Port Platforms',
      tool_ports_d: 'Official portals for ports around the Bohai Rim, Yangtze Delta, southeast coast and Pearl River Delta — e-release, VGM, D/O, schedules and customs filing',
      tool_glossary: 'Shipping Glossary (CN–EN)',
      tool_glossary_d: '805 core shipping terms with bilingual definitions; search by abbreviation, name or keyword, with an A–Z index',
      tool_units: 'Unit Converter',
      tool_units_d: 'Instant conversion of the units freight forwarders use daily: kg↔lb, CBM↔CBF, in↔cm, ℃↔℉',
      tool_fx: 'Live FX Converter',
      tool_fx_d: 'Convert 19 currencies — USD, CNY, EUR, HKD, JPY and more — at live market reference rates',

      /* ---- Tide Reading ---- */
      books_title: 'Tide Reads',
      books_subtitle: 'Read with the tide, sail through pages.',
      books_desc: 'Tide Reads is a curated reading space for maritime practitioners. We gather essential titles on containerisation, global shipping and shipping legends, alongside selected works of literature, history and science fiction. Beyond charts and documents, take your time to read with the tides, and discover broader horizons between pages.',
      books_more: 'View All Books →',
      books_page_desc: 'Tide Reads is a curated reading space for maritime practitioners. We gather essential titles on containerisation, global shipping and shipping legends, alongside selected works of literature, history and science fiction. Beyond charts and documents, take your time to read with the tides, and discover broader horizons between pages.',
      books_note: 'A personal reading list — editions and details follow the publishers\' latest releases, and the list is updated from time to time.',

      /* ---- By the Numbers ---- */
      metrics_title: 'By the Numbers',
      metric_years: 'Years in the industry',
      metric_clients: 'Clients served',
      metric_articles: 'Articles published',
      metric_satisfaction: 'Client satisfaction',

      /* ---- Gallery ---- */
      gallery_title: 'On the Ground · Shipping in Action',

      /* ---- About page ---- */
      about_hero_title: 'Trans Pi · William',
      about_hero_sub: 'Read with the tide, sail through pages.',
      about_brand_title: 'Trans Pi · Brand Belief',
      about_pi_caption: 'Infinite possibility, endless exploration',
      about_qr_title: 'Scan to follow Trans Pi on WeChat',
      about_qr_sub: 'Shipping insights and hands-on notes,<br />updated alongside the site',
      about_expert_title: 'William · Profile',

      /* ---- List pages ---- */
      knowledge_title: 'Knowledge Base',
      knowledge_desc: 'A systematic framework of shipping & logistics knowledge, with reusable methods and best practices. Every article is a deposit; every read, a new exploration.',
      insight_title: 'Industry Insights',
      insight_desc: 'Tracking freight rates, port dynamics and policy shifts, with forward-looking market reads. A weekly North America port roundup keeps you on the industry\'s pulse.',

      /* ---- Article eyebrows ---- */
      eyebrow_knowledge: 'Knowledge Base',
      eyebrow_insight: 'Industry Insights',
      eyebrow_ieepa: 'Column · IEEPA Tariffs',
      eyebrow_hazmat: 'Column · Dangerous Goods',
      eyebrow_eu: 'Column · EU Customs & Tariffs',
      eyebrow_trade: 'Column · Trade Agreements',

      /* ---- Tool pages ---- */
      toolh_worldtime: 'World Clock',
      toolsub_worldtime: 'Live local times in core shipping hubs — no more mental maths across time zones when booking meetings or counting cut-offs. Refreshes every second, grouped by continent and alphabetically within each.',
      toolh_carriers: 'Carrier Links',
      toolsub_carriers: 'Direct links to major liner websites — schedules, rates, bills of lading and track & trace in one place. Cards open in a new tab.',
      toolh_ports: 'China Coastal Port Platforms',
      toolsub_ports: 'Official operating and enquiry portals for major ports, grouped into four regions — Bohai Rim & north coast, Yangtze Delta, southeast coast and Pearl River Delta — covering e-release, VGM, delivery orders, vessel and container schedules and customs filing. Links open in a new tab.',
      toolh_units: 'Unit Converter',
      toolsub_units: 'The unit conversions freight quotes live on — weight, volume, length and temperature. Type on either side and the other updates instantly; swap units with one click. All factors follow international standards.',
      toolh_fx: 'Live FX Converter',
      toolsub_fx: 'Multi-currency conversion for freight quotes, ocean freight settlement and cross-border payments. Rates come from the public exchangerate-api.com feed (USD-based, updated daily with real market reference rates). Type on either side and the other updates instantly, with one-click swap.',
      toolh_glossary: 'Shipping Glossary (CN–EN)',
      toolsub_glossary: 'Search in Chinese or English, or jump straight to a term via the letter index below.',
      toolh_quote: 'Freight Quotation Builder',

      /* ---- Document titles ---- */
      title_index: 'Trans Pi · William | International Shipping & Logistics Expert',
      title_about: 'About Trans Pi · William | International Shipping & Logistics Expert',
      title_books: 'Tide Reads | Trans Pi',
      title_knowledge: 'Knowledge Base | Trans Pi',
      title_insight: 'Industry Insights | Trans Pi',
      title_tools_quote: 'Freight Quotation Builder · Trans Pi',
      title_tools_worldtime: 'World Clock · Trans Pi',
      title_tools_carriers: 'Carrier Links · Trans Pi',
      title_tools_ports: 'China Coastal Port Platforms · Trans Pi',
      title_tools_units: 'Unit Converter · Trans Pi',
      title_tools_fx: 'Live FX Converter · Trans Pi',
      title_glossary: 'Shipping Glossary (CN–EN) · Trans Pi'
    }
  };

  var LS_KEY = 'tp-lang';
  var LANG_SWITCH_HTML =
    '<div class="lang-switch" role="group" aria-label="Language / 语言">' +
      '<button type="button" class="lang-btn" data-lang="zh" aria-pressed="true">中</button>' +
      '<button type="button" class="lang-btn" data-lang="en" aria-pressed="false">EN</button>' +
    '</div>';

  function getLang() {
    try {
      var m = /[?&]lang=(zh|en)(?=&|$)/.exec(window.location.search);
      if (m) { try { localStorage.setItem(LS_KEY, m[1]); } catch (e) {} return m[1]; }
      var s = null;
      try { s = localStorage.getItem(LS_KEY); } catch (e) {}
      return (s === 'en' || s === 'zh') ? s : 'zh';
    } catch (e) { return 'zh'; }
  }

  function setLang(lang) {
    try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
    apply(lang);
  }

  function apply(lang) {
    var dict = DICT[lang] || DICT.zh;
    var nodes = document.querySelectorAll('[data-i18n],[data-i18n-html],[data-i18n-title]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var isTitle = el.hasAttribute('data-i18n-title');
      var key = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html') || el.getAttribute('data-i18n-title');
      if (!key) continue;

      /* 首次运行：快照原始中文，便于切回中文时精确还原 */
      if (!el.hasAttribute('data-i18n-snap')) {
        el.setAttribute('data-i18n-snap', '1');
        el.setAttribute('data-i18n-orig-html', el.innerHTML);
        el.setAttribute('data-i18n-orig-text', el.textContent);
      }

      var useHtml = el.hasAttribute('data-i18n-html');
      var value;
      if (lang === 'zh') {
        value = useHtml ? el.getAttribute('data-i18n-orig-html') : el.getAttribute('data-i18n-orig-text');
      } else {
        value = dict[key];
        if (value == null) continue; /* 未翻译则保持中文 */
      }
      if (value == null) continue;

      if (isTitle) { document.title = value; continue; }
      if (useHtml) { el.innerHTML = value; } else { el.textContent = value; }
    }

    /* 按钮态 */
    var btns = document.querySelectorAll('.lang-btn');
    for (var j = 0; j < btns.length; j++) {
      var b = btns[j];
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    }

    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');
    document.documentElement.setAttribute('data-lang', lang);
  }

  function boot() {
    /* 若页面漏插按钮（极端情况），自动补一个到导航/工具行 */
    if (!document.querySelector('.lang-btn')) {
      var host = document.querySelector('.nav-actions') || document.querySelector('.tool-topline') || document.body;
      if (host) {
        var tmp = document.createElement('div');
        tmp.innerHTML = LANG_SWITCH_HTML;
        host.appendChild(tmp.firstChild);
      }
    }
    document.addEventListener('click', function (ev) {
      var btn = ev.target && ev.target.closest ? ev.target.closest('.lang-btn') : null;
      if (!btn) return;
      ev.preventDefault();
      setLang(btn.getAttribute('data-lang'));
    });
    apply(getLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  /* 供其他脚本/调试使用 */
  window.TP_I18N = { dict: DICT, apply: apply, setLang: setLang, getLang: getLang };
})();
