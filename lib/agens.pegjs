

Edge = Whitespace? String:label "[" Gid "]" "[" Gid:from "," Gid:to  "]" Props

String = S? ( [^ " \ U+0000-U+001F ] / Escape )*  S?

Escape = [\] ( [ " / \ b f n r t ] / UnicodeEscape )

UnicodeEscape = "u" [0-9A-Fa-f]{4}

Whitespace = [ U+0009 U+000A U+000D U+0020 ]+