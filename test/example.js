
var Element = require('../Element');

function constructLetter(letterSpec) {
   var that = {};
   var style = {
      table: {
         'padding': '0',
         'margin': '0',
         'width': '100%'
      },
      h1: {
         'font-size': '16px',
      },
      h2: {
         'font-size': '14px',
      }
   };
   function buildHtmlElement() {
      var html = new Element().html();
      html.head();
      html.body();
      html.elements.head.title(letterSpec.title);
      html.elements.body.h1({style: style.h1}, letterSpec.title);
      letterSpec.sections.forEach(function (section) {
         html.elements.body.h2({style: style.h2}, section.title);
         var div = html.elements.body.div();
         section.items.forEach(function (item) {
            div.h3({style: 'font-size:12pt'}, item.title);
            div.p({style: 'font-size:11pt'}, item.description);
         });
      });
      return html;
   }
   that.buildHtmlElement = buildHtmlElement;
   return that;
}


function test() {
   var letterSpec = {
      title: 'Lifestyle Newsletter',
      sections: [
         {
            title: 'Tonight',
            items: [
               {
                  title: 'Story 1',
                  description: 'About story 1'
               },
               {
                  title: 'Story 2',
                  description: 'About story 2'
               }
            ]
         },
         {
            title: 'Entertainment',
            items: [
               {
                  title: 'Entertainment Story 1',
                  description: 'About story 1'
               },
               {
                  title: 'Entertainment Story 2',
                  description: 'About story 2'
               }
            ]
         }
      ]
   };
   var htmlElement = constructLetter(letterSpec).buildHtmlElement();
   console.log('json:\n', JSON.stringify(htmlElement.transform(), null, 2));
   console.log('html:\n', htmlElement.render());
}

test();
