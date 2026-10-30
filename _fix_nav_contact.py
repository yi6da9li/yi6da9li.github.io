import os, glob

ROOT = os.path.dirname(os.path.abspath(__file__))
OLD = '<a href="index.html#footer" data-i18n="nav_contact">联系</a>'
NEW = '<a href="contact.html" data-i18n="nav_contact">联系</a>'

files = sorted(glob.glob(os.path.join(ROOT, "*.html")))
changed = 0
skipped = 0
for fp in files:
    name = os.path.basename(fp)
    if name in ("index.html", "contact.html"):  # 已正确，跳过
        skipped += 1
        continue
    with open(fp, "r", encoding="utf-8") as f:
        txt = f.read()
    if OLD in txt:
        txt = txt.replace(OLD, NEW)
        with open(fp, "w", encoding="utf-8") as f:
            f.write(txt)
        changed += 1
        print(f"CHANGED {name}")
    else:
        # 检查是否已经指向 contact.html（以防）
        if 'data-i18n="nav_contact"' in txt and 'href="contact.html"' in txt:
            print(f"ALREADY_OK {name}")
        else:
            print(f"NO_MATCH {name}")

print(f"\nTOTAL changed={changed}, skipped(index/contact)={skipped}")
