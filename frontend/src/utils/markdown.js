import DOMPurify from 'dompurify';

// Безопасное отображение HTML от Markdown
export const sanitizeHtml = (html) => {
  if (!html) return '';
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr',
      'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
      'a', 'strong', 'em', 'del', 'table', 'thead', 'tbody',
      'tr', 'th', 'td', 'img', 'input', 'span'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'id', 'type',
      'checked', 'disabled', 'data-*', 'value', 'name'
    ],
    FORBID_TAGS: ['script', 'style', 'iframe', 'frame', 'object', 'embed'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
  });
}; 