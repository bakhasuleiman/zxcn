const MarkdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItToc = require('markdown-it-table-of-contents');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItTaskLists = require('markdown-it-task-lists');

class MarkdownService {
  constructor() {
    this.md = new MarkdownIt({
      html: false,
      xhtmlOut: true,
      breaks: true,
      linkify: true,
      typographer: true
    });

    // Подключаем плагины
    this.md.use(markdownItAnchor, {
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '§'
    });
    
    this.md.use(markdownItToc, {
      includeLevel: [1, 2, 3],
      containerClass: 'table-of-contents',
      markerPattern: /^\[\[toc\]\]/im
    });
    
    this.md.use(markdownItFootnote);
    this.md.use(markdownItTaskLists, { enabled: true });
  }

  render(content) {
    if (!content) return '';
    return this.md.render(content);
  }
}

module.exports = new MarkdownService(); 