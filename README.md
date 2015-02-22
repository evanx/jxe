## jxe

Node Element class for rendering HTML

### example 

See https://github.com/evanx/jxe/blob/master/test/example.js

```javascript
   function buildHtmlElement(spec, style) {
      var html = new Element().html();
      html.head();
      html.body();
      html.elements.head.title(spec.title);
      html.elements.body.h1({style: style.h1}, spec.title);
      spec.sections.forEach(function (section) {
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
