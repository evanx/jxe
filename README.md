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
   this.table = parent.table({style: featureStyle.table});
   this.tr0 = this.table.tr();
   var featureLink = this.processArticleLink(this.featureItem.link);
   this.td = this.tr0.td({width: '309', valign: 'top', bgcolor: '#000',
   style: 'max-width:50%'});
   this.table = this.td.table({cellpadding: 20});
   this.tr = this.table.tr({});
   this.td = this.tr.td({});
   this.td.h1({style: featureStyle.h1}, this.featureItem.title);
   this.td.p({style: featureStyle.description}, this.featureItem.description);
   this.td.a({href: featureLink,
      style: featureStyle.featureLink}, 'Full story');
   this.td = this.tr0.td();
   this.td.img({src: this.featureItem.image,
      width: '420', height: '240',
      style: featureStyle.featureImage});
   return this.table;
};

...

Letter.prototype.buildDocument = function () {
   this.html = new Element().html();
   this.head = this.html.head();
   this.head.title(this.letterInfo.title);
   this.head.meta({'http-equiv': 'X-UA-Compatible', content: 'IE=edge'})
   this.head.meta({name: 'viewport', 
      content: 'width=device-width, initial-scale=1, maximum-scale=1'});
   this.body = this.html.body();
   this.containerTable = this.body.table(
           {style: 'font-family:Arial,sans-serif;color:#333'});
   this.bodyTable = this.containerTable.tr().td({align: 'center'}).table(
           {cellspacing: 10, 
           style: 'font-family:Arial,sans-serif;max-width:728px'});
   this.header(this.bodyTable.tr().td({bgcolor: '#ebeff1'}));
   this.feature(this.bodyTable.tr().td());
   this.letterInfo.sections.forEach(function (section, index) {
      if (th.data[section.category].length > 1) {
         th.section(th.bodyTable, section, index);
      }
   });
   this.footer(this.bodyTable.tr().td());
   return this.html.render();
};

```
