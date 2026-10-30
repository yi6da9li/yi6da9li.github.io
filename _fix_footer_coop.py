import os, glob

ROOT = os.path.dirname(os.path.abspath(__file__))
OLD = 'href="index.html#footer" data-i18n="foot_coop"'
NEW = 'href="contact.html" data-i18n="foot_coop"'

files = [f for f in glob.glob(os.path.join(ROOT, "*.html"))
         if not os.path.basename(f).startswith("_")]
total = 0
changed = []
for f in files:
    with open(f, encoding="utf-8") as fh:
        data = fh.read()
    n = data.count(OLD)
    if n:
        data = data.replace(OLD, NEW)
        with open(f, "w", encoding="utf-8") as fh:
            fh.write(data)
        total += n
        changed.append((os.path.basename(f), n))

print("替换 foot_coop 指向 contact.html 完成：")
for name, n in changed:
    print(f"  {name}: {n} 处")
print(f"合计 {total} 处，涉及 {len(changed)} 个文件")
# 校验：不应再有 index.html#footer 的 foot_coop
leftover = 0
for f in files:
    with open(f, encoding="utf-8") as fh:
        if OLD in fh.read():
            leftover += 1
print("残留未改 foot_coop:", leftover)
