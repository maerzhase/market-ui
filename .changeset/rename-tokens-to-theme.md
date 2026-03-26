---
"@m3000/market": patch
---

Rename `tokens.css` export to `theme.css`.

The `./tokens.css` export has been replaced with `./theme.css`. Update your imports:

```diff
- @import "@m3000/market/tokens.css";
+ @import "@m3000/market/theme.css";
```
