## jxe

Node Element class for rendering HTML

### example 

```javascript

function Letter(letterInfo) {
   this.letterInfo = letterInfo;
}

function tableAttrs0(attribs) {
   return apply(attribs, {border: 0, cellpadding: 0, cellspacing: 0});
}

function tableAttrs100(attribs) {
   return apply(attribs, {border: 0, cellpadding: 0, cellspacing: 0, width: "100%"});
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
   description: {
      'font-size': '13px',
      'color': '#fff', 
      'padding-bottom': '5px'
   },
   featureLink: {
      'display': 'block', 
      'padding': '8px', 
      'background': '#ff6a00', 
      'font-size': '13px', 
      'color': '#FFF', 
      'text-decoration': 'none', 
      'width': '70px', 
      'text-align': 'center', 
      'font-weight': 'bold'
   },
   featureImage: {
      'outline-style': 'none', 
      'text-decoration': 'none', 
      '-ms-interpolation-mode': 'bicubic', 
      'height': 'auto', 
      'max-width': '100%', 
      'clear': 'both',
      'display': 'block',
      'color': '#fff !important',
      'float': 'right'
   },
};

Letter.prototype.feature = function (parent) {
   this.table = parent.table({style: featureStyle.table});
   this.tr0 = this.table.tr();
   var featureLink = this.processArticleLink(this.featureItem.link);
   if (this.deviceType !== 'mobile') {
      this.td = this.tr0.td({width: '309', valign: 'top', bgcolor: '#000',
         style: 'max-width:50%'});
      this.table = this.td.table(tableAttrs0({cellpadding: 20}));
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
   } else {
      this.td = this.tr0.td({width: '360', valign: 'top'});
      this.table = this.td.table(tableAttrs0());
      this.tr = this.table.tr({});
      this.td = this.tr.td({});
      this.td.a({href: featureLink}).img({src: this.featureItem.image,
         width: '420', style: featureStyle.featureImage});
   }
   return this.table;
};

...

Letter.prototype.buildDocument = function () {
   var th = this;
   this.firstCategory = this.letterInfo.sections[0].category;
   this.firstCategoryItems = this.data[this.firstCategory];
   this.featureItem = getFirstFeatureItem(this.firstCategoryItems);
   this.html = new Element().html();
   this.head = this.html.head();
   this.head.title(this.letterInfo.title);
   this.head.meta({"http-equiv": "X-UA-Compatible", content: "IE=edge"})
   this.head.meta({name: "viewport", 
      content: "width=device-width, initial-scale=1, maximum-scale=1"});
   this.body = this.html.body();
   this.containerTable = this.body.table(tableAttrs100(
           {style: "font-family:Arial,sans-serif;color:#333;"}));
   var style = 'max-width:728px';
   if (this.deviceType === 'mobile') {
   }
   this.bodyTable = this.containerTable.tr().td({align: "center"}).table(
           tableAttrs0({cellspacing: 10, style: 'font-family:Arial,sans-serif;' + style}));
   this.header0(this.bodyTable.tr().td({bgcolor: "#ebeff1"}));
   if (this.featureItem) {
      this.feature(this.bodyTable.tr().td());
   }
   this.letterInfo.sections.forEach(function (section, index) {
      if (th.data[section.category].length > 1) {
         th.section(th.bodyTable, section, index);
      }
   });
   this.footer0(this.bodyTable.tr().td());
   this.footer1(this.bodyTable.tr().td());
   return this.html.render();
};

```
