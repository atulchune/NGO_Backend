import NodeCache from 'node-cache';

// Standard TTL is 10 minutes
export const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
