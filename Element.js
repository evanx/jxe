
var elementNames = [
   'a',
   'article',
   'aside',
   'b',
   'br',
   'body',
   'container',
   'details',
   'div',
   'figure',
   'figcaption',
   'footer',
   'h1',
   'h2',
   'h3',
   'h4',
   'h5',
   'h6',
   'hr',
   'html',
   'head',
   'i',
   'img',
   'li',
   'link',
   'main',
   'mark',
   'meta',
   '',
   'ol',
   'p',
   'section',
   'script',
   'strong',
   'span',
   'summary',
   'table',
   'time',
   'title',
   'tr',
   'th',
   'td',
   'thead',
   'tbody',
   'tfoot',
   'ul'
];


function type(object) {
   if (object) {
      return object.constructor.name;
   }
}

log = function () {
};


function Element() {
   this.construct(arguments);
   log('Element', this);
   this.parent = this;
   this.root = this;
   this.elements = {};
   if (!this.content) {
      this.content = [];
   }
}

Element.prototype.construct = function (args) {
   if (!args || !args[0]) {
      this.name = 'root';
      return;
   }
   if (args[0][0]) {
      args = args[0];
   }
   if (type(args[0]) !== 'String') {
      throw new Error([args[0], typeof args[0], type(args[0])]);
   }
   this.name = args[0];
   if (type(args[1]) === 'Object') {
      this.attribs = args[1];
      if (args[2]) {
         this.content = args[2];
      }
   } else {
      this.content = args[1];
   }
   log('content type:', type(this.content));
}

Element.prototype.add = function (object) {
   this.content.push(object);
   return this;
};

Element.prototype.set = function (object) {
   this.content = [object];
   return this;
};

Element.prototype.length = function (object) {
   return this.content.length;
};

Element.prototype.addElement = function () {
   var element = new Element(arguments);
   element.parent = this;
   element.root = this.root;
   if (!this.content) {
      this.content = [];
   }
   this.content.push(element);
   this.root.elements[element.name] = element;
   this.elements[element.name] = element;
   if (element.attribs && element.attribs.id) {
      root.elements[element.attribs.id] = element;
   }
   return element;
};

Element.prototype.clear = function () {
   this.root = undefined;
   this.parent = undefined;
   this.elements = undefined;
   if (this.attribs && Object.keys(this.attribs).length === 0) {
      this.attribs = undefined;
   }
   if (this.content && this.content === []) {
      this.content = undefined;
   }
}

Element.prototype.clearAll = function () {
   this.clear();
   if (type(this.content) === 'Array') {
      this.content.forEach(function (child) {
         log('child', typeof child, type(child));
         if (type(child) === 'Element') {
            child.clearAll();
         }
      });
   }
};

function renderContent(content) {
   if (!content) {
      return '';
   }
   if (type(content) === 'Array') {
      var contentString = '';
      content.forEach(function (child) {
         log('child', typeof child, type(child));
         contentString += renderContent(child);
      });
      return contentString;
   } else if (type(content) === 'Element') {
      return content.render();
   } else {
      return content.toString();
   }
}

function isSingleton(name) {
   return name === 'img' || name === 'br' || name === 'hr';
}

function renderStyle(styleObject) {
   var styleString = '';
   for (var prop in styleObject) {
      if (styleString.length) {
         styleString += ';';
      }
      styleString += prop + ':' + styleObject[prop];
   }
   return styleString;
}

function renderAttribs(attribs) {
   var string = '';
   for (var prop in attribs) {
      var value = attribs[prop];
      if (prop === 'style' && typeof value === 'object') {
         value = renderStyle(value);
      }
      string += ' ' + prop + '="' + value + '"';
   }
   console.log('renderAttribs', string);
   return string;
}

Element.prototype.transform = function () {
   this.clearAll();
   return this;
}

Element.prototype.render = function () {
   this.clear();
   if (this.name === 'root') {
      return renderContent(this.content);
   }
   var contentString = '<' + this.name;
   if (this.attribs && Object.keys(this.attribs).length) {
      contentString += renderAttribs(this.attribs);
   }
   if (this.content) {
      contentString += '>';
      contentString += renderContent(this.content);
      contentString += '</' + this.name + '>';
   } else if (isSingleton(name)) {
      contentString += '/>';
   } else {
      contentString += '</' + this.name + '>';
   }
   return contentString;
};


function createElementFunctions() {
   elementNames.forEach(function (name) {
      Element.prototype[name] = function (attribs, content) {
         return this.addElement(name, attribs, content);
      };
   });
}

createElementFunctions();

module.exports = Element;


