# Anki Flashcards — Coder's Field Guide: Functional TypeScript

Spaced-repetition flashcards to accompany each chapter.  
Cards are multiple-choice, front-heavy style — code or question on the front, single correct answer on the back.

---

## First-time setup (do this once)

### 1. Create the deck

Open Anki and create a deck named exactly:

```
Coder's Field Guide::Functional TypeScript
```

The `::` creates a nested deck. You will see `Coder's Field Guide` as a parent with `Functional TypeScript` inside it.

### 2. Apply the card stylesheet

This makes all cards look clean and professional, with responsive font sizes and night mode support.

1. Import `chapter-00-anki.txt` first (this creates the card type)
2. In Anki, click **Browse**
3. Select any card from the deck
4. Click **Cards...** at the top of the editor
5. Select all the text in the **Styling** section and replace it with the contents of `ANKI-CARD-STYLES.css`
6. Click **Close** — all cards update immediately

You only need to do this once. The stylesheet applies to all cards in the deck, including future imports.

---

## Importing a new chapter

When you finish a chapter, import its cards:

1. **File → Import**
2. Select `chapter-XX-anki.txt`
3. Set **Field separator** to `Tab`
4. Enable **Allow HTML in fields**
5. Set **Deck** to `Coder's Field Guide::Functional TypeScript`
6. Click **Import**

Anki deduplicates automatically — reimporting a file will not create duplicate cards.

---

## Files in this folder

| File | Cards | Topics |
|---|---|---|
| `chapter-00-anki.txt` | 7 | Tooling, tsconfig, ts-node, @types/node |
| `chapter-01-anki.txt` | 8 | Types, let/const, arrays, forEach, template literals |
| `chapter-02-anki.txt` | 7 | process.stdin, event-driven programming, switch |
| `chapter-03-anki.txt` | 8 | push vs spread, map(), pure functions, three styles |
| `chapter-04-anki.txt` | 8 | export/import, AAA pattern, toEqual/toBe, union types |
| `chapter-05-anki.txt` | 6 | ATDD workflow, acceptance vs unit tests |
| `chapter-05a-anki.txt` | 7 | Fragile Test Problem, Application layer, YAGNI |
| `chapter-06-anki.txt` | 8 | interface vs type, destructuring, spread on objects |
| `ANKI-CARD-STYLES.css` | — | Card stylesheet (apply once, see above) |

---

## Tags

Each card is tagged so you can filter in Anki's Card Browser:

- `ch00` through `ch06` — filter by chapter
- `types`, `arrays`, `functional`, `immutability` — filter by concept
- `testing`, `jest`, `atdd` — filter by testing topic
- `nodejs`, `events` — filter by Node.js topics
- `concept` — the one explanation card per chapter (no multiple choice)
