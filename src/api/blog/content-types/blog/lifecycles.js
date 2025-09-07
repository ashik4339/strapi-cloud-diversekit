// @ts-ignore
const readingTime = require('reading-time');

// Helper function to extract text from Strapi blocks format
function extractTextFromBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  return blocks.map(block => {
    if (block.type === 'paragraph' && block.children) {
      return block.children.map(child => child.text || '').join('');
    }
    if (block.type === 'heading' && block.children) {
      return block.children.map(child => child.text || '').join('');
    }
    if (block.type === 'list' && block.children) {
      return block.children.map(item => 
        item.children ? item.children.map(child => child.text || '').join('') : ''
      ).join(' ');
    }
    // Handle other block types as needed
    if (block.children) {
      return block.children.map(child => child.text || '').join('');
    }
    return '';
  }).join(' ');
}

// Helper function to generate slug from title
function generateSlug(title) {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

module.exports = {
  async beforeCreate(event) {
    const { content, title } = event.params.data;

    // Auto-generate slug from title
    if (title && !event.params.data.slug) {
      event.params.data.slug = generateSlug(title);
    }

    // Auto add date if not set
    if (!event.params.data.postDate) {
      event.params.data.postDate = new Date();
    }

    // Calculate reading time
    if (content) {
      const textContent = extractTextFromBlocks(content);
      if (textContent) {
        const stats = readingTime(textContent);
        event.params.data.readingTime = Math.ceil(stats.minutes); // number of minutes
      }
    }
  },

  async beforeUpdate(event) {
    const { content, title } = event.params.data;

    // Auto-generate slug from title if title is being updated
    if (title) {
      event.params.data.slug = generateSlug(title);
    }

    // Recalculate reading time on update
    if (content) {
      const textContent = extractTextFromBlocks(content);
      if (textContent) {
        const stats = readingTime(textContent);
        event.params.data.readingTime = Math.ceil(stats.minutes);
      }
    }
  },
};
