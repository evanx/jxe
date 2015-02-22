
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
   function buildHtmlDocument(   ) {
      var html = new Element().html();
      html.head();
      html.body();
      html.elements.head.title(letterSpec.title);
      html.elements.body.h1({style: style.h1}, letterSpec.title);
      letterSpec.sections.forEach(function (section) {
         html.elements.body.h2({style: style.h2}, section.title);
         var div = html.elements.body.div();
         section.items.forEach(function (item) {
            div.h3({style: 'font-size: 12pt'}, item.title);
            div.p({style: 'font-size: 11pt'}, item.description);
         });
      });
      console.log('json:\n', JSON.stringify(html.transform(), null, 2));
      return html.render();
   }
   that.buildHtmlDocument = buildHtmlDocument;
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
   var html = constructLetter(letterSpec).buildHtmlDocument();
}


test();
