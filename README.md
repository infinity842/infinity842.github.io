# infinity842 の作品サイト

Gemini で作ったゲームやアプリを `https://infinity842.github.io/` に並べて公開するためのリポジトリである。

ビルド工程も外部の依存も持たない静的サイトで、GitHub Pages がリポジトリ直下をそのまま配信する。

## ディレクトリ構成

| パス | 役割 |
| --- | --- |
| `index.html` | 作品の一覧。`works/works.json` を読み込み、公開日の新しい順にカードを並べる |
| `play.html` | 再生ページ。`play.html?work=<slug>` で、`works.json` に載っている作品だけを枠（`sandbox="allow-scripts"` の iframe）の中で表示する |
| `assets/style.css` | 一覧と再生ページで共通のスタイル |
| `assets/works.js` | `works.json` を読み込む共通処理 |
| `assets/index.js` | 一覧ページの処理 |
| `assets/play.js` | 再生ページの処理 |
| `works/works.json` | 作品の一覧データ |
| `works/<slug>/index.html` | 作品そのもの（1作品1ファイル） |
| `.nojekyll` | GitHub Pages の Jekyll 処理を止めるための空ファイル |

一覧と再生ページは、このサイトの外へ通信しない。作品は枠の中で別のオリジンとして動くため、親ページや他の作品のデータには触れられない。枠の中では `localStorage` が使えない（例外になる）。

## 作品の追加のしかた

1. slug（URL に使う名前）を決める。英小文字・数字・ハイフンだけにする（例: `astral-drifter`）。
2. 作品の HTML を `works/<slug>/index.html` に置く。画像などを別ファイルにする場合は同じディレクトリに置く。
3. `works/works.json` の配列に1件足す。

```json
{
  "slug": "astral-drifter",
  "title": "ASTRAL DRIFTER",
  "description": "一覧のカードに出す短い説明",
  "publishedAt": "2026-11-15"
}
```

| キー | 内容 |
| --- | --- |
| `slug` | 手順 1 で決めた名前。ディレクトリ名と一致させる |
| `title` | 作品の題名 |
| `description` | カードに出す1文の説明 |
| `publishedAt` | 公開日。`YYYY-MM-DD` 形式 |

配列の並び順は問わない。表示は `publishedAt` の新しい順になる。

ローカルで確かめるときは、`fetch` と ES モジュールが `file://` では動かないため、リポジトリ直下で `python3 -m http.server` などの HTTP サーバーを起動して開く。
