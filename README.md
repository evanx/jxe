## jxe

Minimal `Element` class for rendering HTML in JavaScript.

### Example 

See https://github.com/evanx/jxe/blob/master/test/example.js

```javascript
   function buildHtmlElement(style, content) {
      var html = new Element().html();
      html.head();
      html.body();
      html.elements.head.title(content.title);
      html.elements.body.h1({style: style.h1}, content.title);
      content.sections.forEach(function (section) {
         html.elements.body.h2({style: style.h2}, section.title);
         var div = html.elements.body.div();
         section.items.forEach(function (item) {
            div.h3({style: 'font-size:12pt'}, item.title);
            div.p({style: 'font-size:11pt'}, item.description);
         });
      });
      return html;
   }
```

### Technical details

```shell
evans@boromir:~/jxe$ grep ';' Element.js | wc -l
83
```

```









```
