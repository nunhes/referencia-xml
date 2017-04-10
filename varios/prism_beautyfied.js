var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
  Prism = function() {
    var e = /\blang(?:uage)?-(\w+)\b/i,
      t = _self.Prism = {
        util: {
          encode: function(e) {
            return e instanceof n ? new n(e.type, t.util.encode(e.content), e.alias) : "Array" === t.util.type(e) ? e.map(t.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
          },
          type: function(e) {
            return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
          },
          clone: function(e) {
            var n = t.util.type(e);
            switch (n) {
              case "Object":
                var a = {};
                for (var r in e) e.hasOwnProperty(r) && (a[r] = t.util.clone(e[r]));
                return a;
              case "Array":
                return e.map && e.map(function(e) {
                  return t.util.clone(e)
                })
            }
            return e
          }
        },
        languages: {
          extend: function(e, n) {
            var a = t.util.clone(t.languages[e]);
            for (var r in n) a[r] = n[r];
            return a
          },
          insertBefore: function(e, n, a, r) {
            r = r || t.languages;
            var i = r[e];
            if (2 == arguments.length) {
              a = arguments[1];
              for (var s in a) a.hasOwnProperty(s) && (i[s] = a[s]);
              return i
            }
            var o = {};
            for (var l in i)
              if (i.hasOwnProperty(l)) {
                if (l == n)
                  for (var s in a) a.hasOwnProperty(s) && (o[s] = a[s]);
                o[l] = i[l]
              }
            return t.languages.DFS(t.languages, function(t, n) {
              n === r[e] && t != e && (this[t] = o)
            }), r[e] = o
          },
          DFS: function(e, n, a, r) {
            r = r || {};
            for (var i in e) e.hasOwnProperty(i) && (n.call(e, i, e[i], a || i), "Object" !== t.util.type(e[i]) || r[e[i]] ? "Array" !== t.util.type(e[i]) || r[e[i]] || (r[e[i]] = !0, t.languages.DFS(e[i], n, i, r)) : (r[e[i]] = !0, t.languages.DFS(e[i], n, null, r)))
          }
        },
        plugins: {},
        highlightAll: function(e, n) {
          for (var a, r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), i = 0; a = r[i++];) t.highlightElement(a, e === !0, n)
        },
        highlightElement: function(n, a, r) {
          for (var i, s, o = n; o && !e.test(o.className);) o = o.parentNode;
          o && (i = (o.className.match(e) || [, ""])[1], s = t.languages[i]), n.className = n.className.replace(e, "").replace(/\s+/g, " ") + " language-" + i, o = n.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + i);
          var l = n.textContent,
            c = {
              element: n,
              language: i,
              grammar: s,
              code: l
            };
          if (!l || !s) return void t.hooks.run("complete", c);
          if (t.hooks.run("before-highlight", c), a && _self.Worker) {
            var u = new Worker(t.filename);
            u.onmessage = function(e) {
              c.highlightedCode = e.data, t.hooks.run("before-insert", c), c.element.innerHTML = c.highlightedCode, r && r.call(c.element), t.hooks.run("after-highlight", c), t.hooks.run("complete", c)
            }, u.postMessage(JSON.stringify({
              language: c.language,
              code: c.code,
              immediateClose: !0
            }))
          } else c.highlightedCode = t.highlight(c.code, c.grammar, c.language), t.hooks.run("before-insert", c), c.element.innerHTML = c.highlightedCode, r && r.call(n), t.hooks.run("after-highlight", c), t.hooks.run("complete", c)
        },
        highlight: function(e, a, r) {
          var i = t.tokenize(e, a);
          return n.stringify(t.util.encode(i), r)
        },
        tokenize: function(e, n, a) {
          var r = t.Token,
            i = [e],
            s = n.rest;
          if (s) {
            for (var o in s) n[o] = s[o];
            delete n.rest
          }
          e: for (var o in n)
            if (n.hasOwnProperty(o) && n[o]) {
              var l = n[o];
              l = "Array" === t.util.type(l) ? l : [l];
              for (var c = 0; c < l.length; ++c) {
                var u = l[c],
                  d = u.inside,
                  p = !!u.lookbehind,
                  E = 0,
                  g = u.alias;
                u = u.pattern || u;
                for (var m = 0; m < i.length; m++) {
                  var h = i[m];
                  if (i.length > e.length) break e;
                  if (!(h instanceof r)) {
                    u.lastIndex = 0;
                    var f = u.exec(h);
                    if (f) {
                      p && (E = f[1].length);
                      var T = f.index - 1 + E,
                        f = f[0].slice(E),
                        N = f.length,
                        A = T + N,
                        I = h.slice(0, T + 1),
                        S = h.slice(A + 1),
                        R = [m, 1];
                      I && R.push(I);
                      var O = new r(o, d ? t.tokenize(f, d) : f, g);
                      R.push(O), S && R.push(S), Array.prototype.splice.apply(i, R)
                    }
                  }
                }
              }
            }
          return i
        },
        hooks: {
          all: {},
          add: function(e, n) {
            var a = t.hooks.all;
            a[e] = a[e] || [], a[e].push(n)
          },
          run: function(e, n) {
            var a = t.hooks.all[e];
            if (a && a.length)
              for (var r, i = 0; r = a[i++];) r(n)
          }
        }
      },
      n = t.Token = function(e, t, n) {
        this.type = e, this.content = t, this.alias = n
      };
    if (n.stringify = function(e, a, r) {
        if ("string" == typeof e) return e;
        if ("Array" === t.util.type(e)) return e.map(function(t) {
          return n.stringify(t, a, e)
        }).join("");
        var i = {
          type: e.type,
          content: n.stringify(e.content, a, r),
          tag: "span",
          classes: ["token", e.type],
          attributes: {},
          language: a,
          parent: r
        };
        if ("comment" == i.type && (i.attributes.spellcheck = "true"), e.alias) {
          var s = "Array" === t.util.type(e.alias) ? e.alias : [e.alias];
          Array.prototype.push.apply(i.classes, s)
        }
        t.hooks.run("wrap", i);
        var o = "";
        for (var l in i.attributes) o += (o ? " " : "") + l + '="' + (i.attributes[l] || "") + '"';
        return "<" + i.tag + ' class="' + i.classes.join(" ") + '" ' + o + ">" + i.content + "</" + i.tag + ">"
      }, !_self.document) return _self.addEventListener ? (_self.addEventListener("message", function(e) {
      var n = JSON.parse(e.data),
        a = n.language,
        r = n.code,
        i = n.immediateClose;
      _self.postMessage(t.highlight(r, t.languages[a], a)), i && _self.close()
    }, !1), _self.Prism) : _self.Prism;
    var a = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
    return a && (t.filename = a.src, document.addEventListener && !a.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll)), _self.Prism
  }();
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism), Prism.languages.markup = {
    comment: /<!--[\w\W]*?-->/,
    prolog: /<\?[\w\W]+?\?>/,
    doctype: /<!DOCTYPE[\w\W]+?>/,
    cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
      pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/i,
          inside: {
            punctuation: /^<\/?/,
            namespace: /^[^\s>\/:]+:/
          }
        },
        "attr-value": {
          pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
          inside: {
            punctuation: /[=>"']/
          }
        },
        punctuation: /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: {
            namespace: /^[^\s>\/:]+:/
          }
        }
      }
    },
    entity: /&#?[\da-z]{1,8};/i
  }, Prism.hooks.add("wrap", function(e) {
    "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"))
  }), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//,
    atrule: {
      pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
      inside: {
        rule: /@[\w-]+/
      }
    },
    url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
    string: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
    property: /(\b|\B)[\w-]+(?=\s*:)/i,
    important: /\B!important\b/i,
    "function": /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/
  }, Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css), Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
    style: {
      pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
      lookbehind: !0,
      inside: Prism.languages.css,
      alias: "language-css"
    }
  }), Prism.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
      pattern: /\s*style=("|').*?\1/i,
      inside: {
        "attr-name": {
          pattern: /^\s*style/i,
          inside: Prism.languages.markup.tag.inside
        },
        punctuation: /^\s*=\s*['"]|['"]\s*$/,
        "attr-value": {
          pattern: /.+/i,
          inside: Prism.languages.css
        }
      },
      alias: "language-css"
    }
  }, Prism.languages.markup.tag)), Prism.languages.clike = {
    comment: [{
      pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
      lookbehind: !0
    }, {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: !0
    }],
    string: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    "class-name": {
      pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
      lookbehind: !0,
      inside: {
        punctuation: /(\.|\\)/
      }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    "boolean": /\b(true|false)\b/,
    "function": /[a-z0-9_]+(?=\()/i,
    number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
  }, Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
    "function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
  }), Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
      lookbehind: !0
    }
  }), Prism.languages.insertBefore("javascript", "class-name", {
    "template-string": {
      pattern: /`(?:\\`|\\?[^`])*`/,
      inside: {
        interpolation: {
          pattern: /\$\{[^}]+\}/,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation"
            },
            rest: Prism.languages.javascript
          }
        },
        string: /[\s\S]+/
      }
    }
  }), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
      pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
      lookbehind: !0,
      inside: Prism.languages.javascript,
      alias: "language-javascript"
    }
  }), Prism.languages.js = Prism.languages.javascript, Prism.languages.php = Prism.languages.extend("clike", {
    keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
    constant: /\b[A-Z0-9_]{2,}\b/,
    comment: {
      pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
      lookbehind: !0
    }
  }), Prism.languages.insertBefore("php", "class-name", {
    "shell-comment": {
      pattern: /(^|[^\\])#.*/,
      lookbehind: !0,
      alias: "comment"
    }
  }), Prism.languages.insertBefore("php", "keyword", {
    delimiter: /\?>|<\?(?:php)?/i,
    variable: /\$\w+\b/i,
    "package": {
      pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
      lookbehind: !0,
      inside: {
        punctuation: /\\/
      }
    }
  }), Prism.languages.insertBefore("php", "operator", {
    property: {
      pattern: /(->)[\w]+/,
      lookbehind: !0
    }
  }), Prism.languages.markup && (Prism.hooks.add("before-highlight", function(e) {
    "php" === e.language && (e.tokenStack = [], e.backupCode = e.code, e.code = e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi, function(t) {
      return e.tokenStack.push(t), "{{{PHP" + e.tokenStack.length + "}}}"
    }))
  }), Prism.hooks.add("before-insert", function(e) {
    "php" === e.language && (e.code = e.backupCode, delete e.backupCode)
  }), Prism.hooks.add("after-highlight", function(e) {
    if ("php" === e.language) {
      for (var t, n = 0; t = e.tokenStack[n]; n++) e.highlightedCode = e.highlightedCode.replace("{{{PHP" + (n + 1) + "}}}", Prism.highlight(t, e.grammar, "php").replace(/\$/g, "$$$$"));
      e.element.innerHTML = e.highlightedCode
    }
  }), Prism.hooks.add("wrap", function(e) {
    "php" === e.language && "markup" === e.type && (e.content = e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'))
  }), Prism.languages.insertBefore("php", "comment", {
    markup: {
      pattern: /<[^?]\/?(.*?)>/,
      inside: Prism.languages.markup
    },
    php: /\{\{\{PHP[0-9]+\}\}\}/
  })), Prism.languages.insertBefore("php", "variable", {
    "this": /\$this\b/,
    global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/,
    scope: {
      pattern: /\b[\w\\]+::/,
      inside: {
        keyword: /(static|self|parent)/,
        punctuation: /(::|\\)/
      }
    }
  }), Prism.languages.python = {
    "triple-quoted-string": {
      pattern: /"""[\s\S]+?"""|'''[\s\S]+?'''/,
      alias: "string"
    },
    comment: {
      pattern: /(^|[^\\])#.*/,
      lookbehind: !0
    },
    string: /("|')(?:\\?.)*?\1/,
    "function": {
      pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_][a-zA-Z0-9_]*(?=\()/g,
      lookbehind: !0
    },
    "class-name": {
      pattern: /(\bclass\s+)[a-z0-9_]+/i,
      lookbehind: !0
    },
    keyword: /\b(?:False|None|True|and|as|assert|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/,
    number: /\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
    punctuation: /[{}[\];(),.:]/,
    "built-in-function": /\b(?:abs|all|any|ascii|bin|bool|bytearray|bytes|callable|chr|classmethod|compile|complex|delattr|dict|dir|divmod|enumerate|eval|exec|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|isinstance|issubclass|iter|len|list|locals|map|max|memoryview|min|next|object|oct|open|ord|pow|print|property|range|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|vars|zip|__import__)\b/
  }, Prism.languages.sql = {
    comment: {
      pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|(?:--|\/\/|#).*)/,
      lookbehind: !0
    },
    string: {
      pattern: /(^|[^@\\])("|')(?:\\?[\s\S])*?\2/,
      lookbehind: !0
    },
    variable: /@[\w.$]+|@("|'|`)(?:\\?[\s\S])+?\1/,
    "function": /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,
    keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR VARYING|CHARACTER (?:SET|VARYING)|CHARSET|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|DATA(?:BASES?)?|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE(?: PRECISION)?|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE(?:D BY)?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEYS?|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL(?: CHAR VARYING| CHARACTER(?: VARYING)?| VARCHAR)?|NATURAL|NCHAR(?: VARCHAR)?|NEXT|NO(?: SQL|CHECK|CYCLE)?|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READ(?:S SQL DATA|TEXT)?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START(?:ING BY)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED BY|TEXT(?:SIZE)?|THEN|TIMESTAMP|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNPIVOT|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?)\b/i,
    "boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
    number: /\b-?(?:0x)?\d*\.?[\da-f]+\b/,
    operator: /[-+*\/=%^~]|&&?|\|?\||!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/
  },
  function() {
    function e(e, t) {
      return Array.prototype.slice.call((t || document).querySelectorAll(e))
    }

    function t(e, t) {
      return t = " " + t + " ", (" " + e.className + " ").replace(/[\n\t]/g, " ").indexOf(t) > -1
    }

    function n(e, n, a) {
      for (var i, s = n.replace(/\s+/g, "").split(","), o = +e.getAttribute("data-line-offset") || 0, l = r() ? parseInt : parseFloat, c = l(getComputedStyle(e).lineHeight), u = 0; i = s[u++];) {
        i = i.split("-");
        var d = +i[0],
          p = +i[1] || d,
          E = document.createElement("div");
        E.textContent = Array(p - d + 2).join(" \n"), E.className = (a || "") + " line-highlight", t(e, "line-numbers") || (E.setAttribute("data-start", d), p > d && E.setAttribute("data-end", p)), E.style.top = (d - o - 1) * c + "px", t(e, "line-numbers") ? e.appendChild(E) : (e.querySelector("code") || e).appendChild(E)
      }
    }

    function a() {
      var t = location.hash.slice(1);
      e(".temporary.line-highlight").forEach(function(e) {
        e.parentNode.removeChild(e)
      });
      var a = (t.match(/\.([\d,-]+)$/) || [, ""])[1];
      if (a && !document.getElementById(t)) {
        var r = t.slice(0, t.lastIndexOf(".")),
          i = document.getElementById(r);
        i && (i.hasAttribute("data-line") || i.setAttribute("data-line", ""), n(i, a, "temporary "), document.querySelector(".temporary.line-highlight").scrollIntoView())
      }
    }
    if ("undefined" != typeof self && self.Prism && self.document && document.querySelector) {
      var r = function() {
          var e;
          return function() {
            if ("undefined" == typeof e) {
              var t = document.createElement("div");
              t.style.fontSize = "13px", t.style.lineHeight = "1.5", t.style.padding = 0, t.style.border = 0, t.innerHTML = "&nbsp;<br />&nbsp;", document.body.appendChild(t), e = 38 === t.offsetHeight, document.body.removeChild(t)
            }
            return e
          }
        }(),
        i = 0;
      Prism.hooks.add("complete", function(t) {
        var r = t.element.parentNode,
          s = r && r.getAttribute("data-line");
        r && s && /pre/i.test(r.nodeName) && (clearTimeout(i), e(".line-highlight", r).forEach(function(e) {
          e.parentNode.removeChild(e)
        }), n(r, s), i = setTimeout(a, 1))
      }), window.addEventListener && window.addEventListener("hashchange", a)
    }
  }(),
  function() {
    "undefined" != typeof self && self.Prism && self.document && Prism.hooks.add("complete", function(e) {
      if (e.code) {
        var t = e.element.parentNode,
          n = /\s*\bline-numbers\b\s*/;
        if (t && /pre/i.test(t.nodeName) && (n.test(t.className) || n.test(e.element.className)) && !e.element.querySelector(".line-numbers-rows")) {
          n.test(e.element.className) && (e.element.className = e.element.className.replace(n, "")), n.test(t.className) || (t.className += " line-numbers");
          var a, r = e.code.match(/\n(?!$)/g),
            i = r ? r.length + 1 : 1,
            s = new Array(i + 1);
          s = s.join("<span></span>"), a = document.createElement("span"), a.className = "line-numbers-rows", a.innerHTML = s, t.hasAttribute("data-start") && (t.style.counterReset = "linenumber " + (parseInt(t.getAttribute("data-start"), 10) - 1)), e.element.appendChild(a)
        }
      }
    })
  }(),
  function() {
    "undefined" != typeof self && self.Prism && self.document && document.createRange && (Prism.hooks.add("before-highlight", function(e) {
      var t = !1,
        n = 0,
        a = [],
        r = function(e, i) {
          var s = {};
          i || (s.clone = e.cloneNode(!1), s.posOpen = n, a.push(s));
          for (var o = 0, l = e.childNodes.length; l > o; o++) {
            var c = e.childNodes[o];
            1 === c.nodeType ? r(c) : 3 === c.nodeType && (t || (c.data = c.data.replace(/^(?:\r?\n|\r)/, ""), t = !0), n += c.data.length)
          }
          i || (s.posClose = n)
        };
      r(e.element, !0), a && a.length && (e.keepMarkup = a)
    }), Prism.hooks.add("after-highlight", function(e) {
      if (e.keepMarkup && e.keepMarkup.length) {
        var t = function(e, n) {
          for (var a = 0, r = e.childNodes.length; r > a; a++) {
            var i = e.childNodes[a];
            if (1 === i.nodeType) {
              if (!t(i, n)) return !1
            } else 3 === i.nodeType && (!n.nodeStart && n.pos + i.data.length > n.node.posOpen && (n.nodeStart = i, n.nodeStartPos = n.node.posOpen - n.pos), n.nodeStart && n.pos + i.data.length >= n.node.posClose && (n.nodeEnd = i, n.nodeEndPos = n.node.posClose - n.pos), n.pos += i.data.length);
            if (n.nodeStart && n.nodeEnd) {
              var s = document.createRange();
              return s.setStart(n.nodeStart, n.nodeStartPos), s.setEnd(n.nodeEnd, n.nodeEndPos), n.node.clone.appendChild(s.extractContents()), s.insertNode(n.node.clone), s.detach(), !1
            }
          }
          return !0
        };
        e.keepMarkup.forEach(function(n) {
          t(e.element, {
            node: n,
            pos: 0
          })
        })
      }
    }))
  }();
