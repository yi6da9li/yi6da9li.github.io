# -*- coding: utf-8 -*-
import json, re

MD = '航运术语表-中英对照.md'
OUT = 'glossary.html'

lines = open(MD, encoding='utf-8').read().split('\n')
data = []
pipes_issue = 0
for ln in lines:
    if not ln.startswith('|'):
        continue
    if re.match(r'^\|\s*---', ln):
        continue
    parts = [p.strip() for p in ln.split('|')]
    # parts: ['', 字母, 英文术语, 中文对应术语, 中文释义, '']
    if len(parts) < 6:
        # maybe a row in header region
        if parts[1:2] and parts[1] in ('字母', 'A') and len(parts) == 6:
            pass
        continue
    letter, en, zh, zdef = parts[1], parts[2], parts[3], parts[4]
    if letter == '字母':  # header
        continue
    if not re.match(r'^[A-Z0-9]$', letter):
        continue
    if en.count('|') or zh.count('|') or zdef.count('|'):
        pipes_issue += 1
    data.append({'l': letter, 'en': en, 'zh': zh, 'def': zdef})

print('parsed rows:', len(data))
print('rows with stray pipe:', pipes_issue)
# sanity: ensure no empty
empties = [d for d in data if not d['en'] or not d['zh']]
print('empty en/zh:', len(empties))

letters = sorted({d['l'] for d in data})
print('distinct letters:', letters)

# Build HTML
DATA_JSON = json.dumps(data, ensure_ascii=False)

HTML = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>航运术语表 · 中英对照 · 航运派 Trans Pi</title>
  <link rel="stylesheet" href="tool.css?v=transpi-glossary-20261001" />
  <style>
    .glossary-toolbar {
      position: sticky; top: 0; z-index: 20;
      background: rgba(10,22,40,.92); backdrop-filter: blur(6px);
      padding: 18px 0 14px; border-bottom: 1px solid #23344f;
      margin-bottom: 26px;
    }
    .glossary-search {
      display: flex; gap: 12px; align-items: center; flex-wrap: wrap;
    }
    .glossary-search input {
      flex: 1 1 320px;
      background: var(--navy-2); border: 1px solid #2a3a55; color: var(--text);
      border-radius: 999px; padding: 12px 18px; font-size: 15px; font-family: inherit;
    }
    .glossary-search input:focus { outline: none; border-color: var(--gold); }
    .glossary-count { color: var(--text-gray); font-size: 13px; white-space: nowrap; }
    .glossary-count b { color: var(--gold); }
    .alpha-nav {
      display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px;
    }
    .alpha-nav button {
      min-width: 34px; padding: 5px 8px; font-size: 13px;
      background: var(--navy-2); border: 1px solid #2a3a55; color: var(--text-gray);
      border-radius: 8px; cursor: pointer; font-family: inherit; transition: .15s;
    }
    .alpha-nav button:hover { border-color: var(--gold); color: var(--gold); }
    .alpha-nav button.active { background: var(--gold); color: #0a1628; border-color: var(--gold); font-weight: 700; }
    .glossary-list {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;
    }
    .g-item {
      background: var(--card-bg); border: 1px solid #23344f; border-radius: 12px;
      padding: 16px 18px; transition: .2s;
    }
    .g-item:hover { border-color: var(--gold); transform: translateY(-3px); box-shadow: 0 8px 22px rgba(212,175,55,.14); }
    .g-en { color: var(--gold); font-size: 16px; font-weight: 700; line-height: 1.35; }
    .g-zh { color: var(--text); font-size: 14px; font-weight: 600; margin: 4px 0 6px; }
    .g-def { color: var(--text-gray); font-size: 13px; line-height: 1.6; }
    .g-empty { color: var(--text-gray); text-align: center; padding: 60px 0; grid-column: 1/-1; }
    mark { background: rgba(212,175,55,.35); color: #fff; border-radius: 3px; padding: 0 2px; }
    .glossary-foot { color: var(--text-gray); font-size: 12px; margin-top: 36px; text-align: center; }
  </style>
</head>
<body>
  <div class="tool-page">
    <a class="tool-back" href="index.html">← 返回 航运派 Trans Pi</a>
    <h1 class="tool-h1">航运术语表 · 中英对照</h1>
    <p class="tool-sub">支持中英文实时搜索，可通过下方字母索引快速定位术语。输入英文缩写、中文名称或释义关键词即可实时筛选。</p>

    <div class="glossary-toolbar">
      <div class="glossary-search">
        <input id="q" type="search" placeholder="搜索：英文术语 / 中文名称 / 释义（如 FCL、提单、Incoterms）" autocomplete="off" />
        <span class="glossary-count">共 <b id="cnt">0</b> 条</span>
      </div>
      <div class="alpha-nav" id="alpha"></div>
    </div>

    <div class="glossary-list" id="list"></div>
    <p class="glossary-foot">数据来源：Maersk 航运术语表（maersk.com.cn） · 航运派 Trans Pi 整理</p>
  </div>

  <script>
    var GLOSSARY = __DATA__;
    var listEl = document.getElementById('list');
    var cntEl = document.getElementById('cnt');
    var qEl = document.getElementById('q');
    var alphaEl = document.getElementById('alpha');
    var currentLetter = '';
    var query = '';

    // build alphabet nav
    var letters = [];
    GLOSSARY.forEach(function(d){ if (letters.indexOf(d.l) < 0) letters.push(d.l); });
    letters.sort();
    var btns = ['全部'].concat(letters);
    btns.forEach(function(L){
      var b = document.createElement('button');
      b.textContent = L;
      b.dataset.l = (L === '全部') ? '' : L;
      if (L === '全部') b.classList.add('active');
      b.addEventListener('click', function(){
        currentLetter = b.dataset.l;
        [].forEach.call(alphaEl.children, function(x){ x.classList.remove('active'); });
        b.classList.add('active');
        render();
      });
      alphaEl.appendChild(b);
    });

    function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
    function hl(text, q){
      if (!q) return esc(text);
      var i = text.toLowerCase().indexOf(q.toLowerCase());
      if (i < 0) return esc(text);
      return esc(text.slice(0,i)) + '<mark>' + esc(text.slice(i, i+q.length)) + '</mark>' + esc(text.slice(i+q.length));
    }

    function render(){
      var q = query.trim().toLowerCase();
      var rows = GLOSSARY.filter(function(d){
        if (currentLetter && d.l !== currentLetter) return false;
        if (!q) return true;
        return (d.en + ' ' + d.zh + ' ' + d.def).toLowerCase().indexOf(q) >= 0;
      });
      cntEl.textContent = rows.length;
      if (!rows.length){
        listEl.innerHTML = '<div class="g-empty">没有匹配的术语，换个关键词试试～</div>';
        return;
      }
      listEl.innerHTML = rows.map(function(d){
        return '<div class="g-item">'
          + '<div class="g-en">' + hl(d.en, q) + '</div>'
          + '<div class="g-zh">' + hl(d.zh, q) + '</div>'
          + '<div class="g-def">' + hl(d.def, q) + '</div>'
          + '</div>';
      }).join('');
    }

    qEl.addEventListener('input', function(){ query = this.value; render(); });
    render();
  </script>
</body>
</html>
'''

HTML = HTML.replace('__DATA__', DATA_JSON)
open(OUT, 'w', encoding='utf-8').write(HTML)
print('written', OUT, 'bytes=', len(HTML))
