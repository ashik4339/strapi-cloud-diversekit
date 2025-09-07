// @ts-ignore
const readingTime = require('reading-time');

module.exports = {
  async beforeCreate(event) {
    const { content } = event.params.data;

    // Auto add date if not set
    if (!event.params.data.postDate) {
      event.params.data.postDate = new Date();
    }

    // Calculate reading time
    if (content) {
      const stats = readingTime(content);
      event.params.data.readingTime = Math.ceil(stats.minutes); // number of minutes
    }
  },

  async beforeUpdate(event) {
    const { content } = event.params.data;

    // Recalculate reading time on update
    if (content) {
      const stats = readingTime(content);
      event.params.data.readingTime = Math.ceil(stats.minutes);
    }
  },
};
