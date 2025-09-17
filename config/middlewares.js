module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      jsonLimit: '256mb',
      formLimit: '256mb',
      textLimit: '256mb',
      formidable: {
        maxFileSize: 250 * 1024 * 1024, // 250mb
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
