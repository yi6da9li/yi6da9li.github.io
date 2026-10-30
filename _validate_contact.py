import sys, re, html.parser, os

ROOT = os.path.dirname(os.path.abspath(__file__))

class V(html.parser.HTMLParser):
    VOID = {"area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"}
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack=[]
        self.errors=[]
    def handle_starttag(self,tag,attrs):
        if tag in self.VOID: return
        self.stack.append(tag)
    def handle_endtag(self,tag):
        if tag in self.VOID: return
        if not self.stack:
            self.errors.append(f"extra </{tag}>"); return
        if self.stack[-1]==tag:
            self.stack.pop()
        elif tag in self.stack:
            # pop until match
            while self.stack and self.stack[-1]!=tag:
                self.errors.append(f"unclosed <{self.stack[-1]}> before </{tag}>")
                self.stack.pop()
            if self.stack: self.stack.pop()
        else:
            self.errors.append(f"stray </{tag}>")

def check_file(path, must_have=None):
    with open(path,encoding="utf-8") as f:
        data=f.read()
    p=V(); p.feed(data)
    if p.stack:
        p.errors.append("unclosed at EOF: "+",".join(p.stack))
    ok = not p.errors
    print(f"\n=== {os.path.basename(path)} ===")
    if ok:
        print("  structure: OK (balanced)")
    else:
        print("  structure ERRORS:")
        for e in p.errors: print("   -",e)
    if must_have:
        for m in must_have:
            print(f"  contains {m!r}: {'YES' if m in data else 'NO (MISSING)'}")
    return ok

# 1. contact.html structure + key content
check_file(os.path.join(ROOT,"contact.html"),
           must_have=["mailto:business@transpi.cn","business@transpi.cn",
                      "data-i18n-title=\"title_contact\"","data-i18n-html=\"contact_note\"",
                      "contact.css?v=contact-20261028","assets/i18n.js?v=i18n5-20261028",
                      "id=\"copyEmailBtn\""])

# 2. index.html still references i18n5 + the three links point to contact.html
with open(os.path.join(ROOT,"index.html"),encoding="utf-8") as f:
    idx=f.read()
print("\n=== index.html ===")
for m in ["assets/i18n.js?v=i18n5-20261028",
          "<a href=\"contact.html\" data-i18n=\"nav_contact\"",
          "<a href=\"contact.html\" class=\"btn btn-secondary\" data-i18n=\"hero_cta2\"",
          "<a href=\"contact.html\" data-i18n=\"foot_coop\""]:
    print(f"  contains {m!r}: {'YES' if m in idx else 'NO'}")

# 3. i18n.js en dict has contact keys + still JS-valid
with open(os.path.join(ROOT,"assets","i18n.js"),encoding="utf-8") as f:
    i18=f.read()
print("\n=== i18n.js (en keys) ===")
for k in ["title_contact","contact_hero_title","contact_hero_sub","contact_section_title",
          "contact_card_label","contact_copy","contact_copied","contact_note"]:
    pat = '"'+k+'":'  # en dict uses double quotes
    print(f"  en has {k}: {'YES' if pat in i18 else 'NO'}")
print("  uses &ldquo; in contact_note:", "&ldquo;" in i18)
