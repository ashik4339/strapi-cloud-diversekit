'use strict';

/**
 * client-site service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::client-site.client-site');
