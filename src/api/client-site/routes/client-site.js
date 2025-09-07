'use strict';

/**
 * client-site router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::client-site.client-site');
