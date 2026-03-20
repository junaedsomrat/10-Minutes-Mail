const adjectives = [
  'swift', 'bright', 'cool', 'dark', 'epic', 'fast', 'keen', 'bold',
  'calm', 'deep', 'fair', 'glad', 'hazy', 'icy', 'just', 'kind',
  'lazy', 'mild', 'neat', 'odd', 'pure', 'rare', 'sage', 'true',
  'vivid', 'warm', 'zen', 'alpha', 'beta', 'cyber', 'digi', 'flux',
  'nova', 'pixel', 'quantum', 'retro', 'sonic', 'turbo', 'ultra',
];

const nouns = [
  'panda', 'tiger', 'eagle', 'shark', 'wolf', 'raven', 'phoenix',
  'dragon', 'falcon', 'lynx', 'cobra', 'hawk', 'viper', 'fox',
  'bear', 'lion', 'owl', 'deer', 'crow', 'moth', 'star', 'moon',
  'byte', 'core', 'data', 'edge', 'grid', 'hub', 'node', 'volt',
  'wave', 'zone', 'spark', 'pulse', 'drift', 'glitch', 'nexus',
];

const domains = [
  'tmpbox.io',
  'quickmail.dev',
  'burnmail.co',
  'flashbox.net',
  'tempzone.org',
  'dropmail.cc',
];

export function generateEmailAddress(): string {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 999) + 1;
  const domain = domains[Math.floor(Math.random() * domains.length)];
  
  return `${adj}.${noun}${num}@${domain}`;
}
