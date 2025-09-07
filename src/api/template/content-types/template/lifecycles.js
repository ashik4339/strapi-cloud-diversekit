// Helper function to generate slug from name
function generateSlug(name) {
  if (!name) return '';
  
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

module.exports = {
  async beforeCreate(event) {
    const { name } = event.params.data;

    // Auto-generate slug from name
    if (name && !event.params.data.slug) {
      event.params.data.slug = generateSlug(name);
    }
  },

  async beforeUpdate(event) {
    const { name } = event.params.data;

    // Auto-generate slug from name if name is being updated
    if (name) {
      event.params.data.slug = generateSlug(name);
    }
  },
};