## jxe

Node Element class for rendering HTML

### example 

The following illustrates server-side rendering of a newsletter using Node.

```javascript
function Letter(letterInfo) {
   this.letterInfo = letterInfo;
}

var featureStyle = {
   table: {
      'border-collapse':'collapse', 
      'padding': '0', 
      'margin': '0', 
      'width': '100%'
   },
   h1: {
      'font-size': '16px',
      'color': '#FFF',
      'padding-top': '0px'
   },
   ...
};

Letter.prototype.feature = function (parent) {
   var elements = {};
   elements.table = parent.table({style: featureStyle.table});
   elements.tr0 = elements.table.tr();
   var featureLink = elements.processArticleLink(elements.featureItem.link);
   elements.td = elements.tr0.td({width: '309', valign: 'top', bgcolor: '#000',
      style: 'max-width:50%'});
   elements.table = elements.td.table({cellpadding: 20});
   elements.tr = elements.table.tr({});
   elements.td = elements.tr.td({});
   elements.td.h1({style: featureStyle.h1}, elements.featureItem.title);
   elements.td.p({style: featureStyle.description}, elements.featureItem.description);
   elements.td.a({href: featureLink,
      style: featureStyle.featureLink}, 'Full story');
   elements.td = elements.tr0.td();
   elements.td.img({src: elements.featureItem.image,
      width: '420', height: '240',
      style: featureStyle.featureImage});
   return elements.table;
};

...

Letter.prototype.buildDocument = function () {
   var elements = {};
   elements.html = new Element().html();
   elements.head = elements.html.head();
   elements.head.title(elements.letterInfo.title);
   elements.head.meta({'http-equiv': 'X-UA-Compatible', content: 'IE=edge'})
   elements.head.meta({name: 'viewport', 
      content: 'width=device-width, initial-scale=1, maximum-scale=1'});
   elements.body = elements.html.body();
   elements.containerTable = elements.body.table(
           {style: 'font-family:Arial,sans-serif;color:#333'});
   elements.bodyTable = elements.containerTable.tr().td({align: 'center'}).table(
           {cellspacing: 10, 
           style: 'font-family:Arial,sans-serif;max-width:728px'});
   elements.header(elements.bodyTable.tr().td({bgcolor: '#ebeff1'}));
   elements.feature(elements.bodyTable.tr().td());
   elements.letterInfo.sections.forEach(function (section, index) {
      if (th.data[section.category].length > 1) {
         th.section(th.bodyTable, section, index);
      }
   });
   elements.footer(elements.bodyTable.tr().td());
   return elements.html.render();
};

```
