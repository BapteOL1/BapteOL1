"""Récupère, en lecture seule et sans hâte, le contenu public du WordPress
de nathalierives.com via son API REST (/wp-json/wp/v2/).

Usage : python3 -I outils/wp_export.py <dossier_de_sortie>
"""
import json
import sys
import time
from pathlib import Path

import requests

BASE = "https://www.nathalierives.com/wp-json/wp/v2"
UA = "Mozilla/5.0 (inventaire refonte nathalierives.com; lecture seule)"
PAUSE = 2.0  # secondes entre deux requêtes : le serveur est ancien


def fetch_all(session, kind, params=None):
    out, page = [], 1
    while True:
        p = {"per_page": 100, "page": page, **(params or {})}
        r = session.get(f"{BASE}/{kind}", params=p, timeout=60)
        if r.status_code == 400:  # au-delà de la dernière page
            break
        r.raise_for_status()
        batch = r.json()
        out.extend(batch)
        total_pages = int(r.headers.get("X-WP-TotalPages", "1"))
        print(f"{kind} page {page}/{total_pages} : {len(batch)}", flush=True)
        if page >= total_pages:
            break
        page += 1
        time.sleep(PAUSE)
    return out


def main(dest):
    dest = Path(dest)
    dest.mkdir(parents=True, exist_ok=True)
    s = requests.Session()
    s.headers["User-Agent"] = UA
    for kind in ("categories", "users", "pages", "posts", "media"):
        data = fetch_all(s, kind)
        (dest / f"wp_{kind}.json").write_text(
            json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
        time.sleep(PAUSE)


if __name__ == "__main__":
    main(sys.argv[1])
