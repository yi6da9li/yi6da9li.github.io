# -*- coding: utf-8 -*-
import json, re, html

# 1) raw terms: (name, english_definition)
raw = json.load(open('_glossary_raw.json', encoding='utf-8'))

# 2) Chinese term names (中文译名)
src = open('_build_glossary.py', encoding='utf-8').read()
i = src.index('zh = {')
b = src.index('{', i)
depth = 0; j = b
for k in range(b, len(src)):
    if src[k] == '{':
        depth += 1
    elif src[k] == '}':
        depth -= 1
        if depth == 0:
            j = k; break
zh = eval(src[b:j+1])
zh.update(json.load(open('zh_extra.json', encoding='utf-8')))

# 3) Chinese definitions (中文释义) authored
def_cn = {}
for fn in ['def_cn_A.json','def_cn_B.json','def_cn_C.json','def_cn_DI.json','def_cn_LT.json','def_cn_UZ.json']:
    def_cn.update(json.load(open(fn, encoding='utf-8')))

cjk = re.compile(r'[\u4e00-\u9fff]')
damco_terms = {'Damco Consolidation Containers (DCC)', 'Damco Project Management Methodology (DPMM)'}

rows = []
missing_name = 0
missing_def = 0
for name, desc in raw:
    n = html.unescape(name)
    n = re.sub(r'\s+', ' ', n).strip()
    if n in damco_terms:
        continue
    letter = n[0].upper()
    # Chinese term name
    zname = zh.get(n) or zh.get(n.replace(' )', ')'))
    if not zname:
        missing_name += 1
    # Chinese definition
    if cjk.search(desc):
        # extract clean Chinese starting at first CJK char
        m = cjk.search(desc)
        cn_def = desc[m.start():].strip()
        cn_def = re.sub(r'\s+', ' ', cn_def)
    else:
        cn_def = def_cn.get(n, '')
        if not cn_def:
            missing_def += 1
            cn_def = '（待补译）'
    rows.append((letter, n, zname, cn_def))

# sort by letter then term
rows.sort(key=lambda r: (r[0], r[1].lower()))

# 4) write markdown
out = []
out.append('# 航运术语表 · 中英对照（A–Z）')
out.append('')
out.append('> 来源：Maersk 航运术语表（https://www.maersk.com.cn/support/glossaries/shipping-terms）。')
out.append('> 字段：英文术语 | 中文对应术语 | 中文释义。原始英文释义已去除；原英文释义中含中文的术语已补回并提取其中文释义，含「丹马士」的术语已剔除。')
out.append('> 共 %d 条术语。' % len(rows))
out.append('')
out.append('| 字母 | 英文术语 | 中文对应术语 | 中文释义 |')
out.append('| --- | --- | --- | --- |')
for letter, n, zname, cn_def in rows:
    out.append('| %s | %s | %s | %s |' % (letter, n, zname, cn_def))

open('航运术语表-中英对照.md', 'w', encoding='utf-8').write('\n'.join(out))
print('total rows:', len(rows))
print('missing name:', missing_name)
print('missing def (pending):', missing_def)
# per-letter count
from collections import Counter
print('per-letter:', dict(sorted(Counter(r[0] for r in rows).items())))
