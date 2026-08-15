const IMPACT_AREA_RULES = [
  {
    name: "Authentication",
    patterns: [
      /(^|\/)auth(entication)?(\/|\.|$)/i,
      /(^|\/)login(\/|\.|$)/i,
      /(^|\/)session(\/|\.|$)/i,
      /(^|\/)jwt(\/|\.|$)/i,
      /(^|\/)oauth(\/|\.|$)/i,
    ],
  },

  {
    name: "API",
    patterns: [
      /(^|\/)api(\/|\.|$)/i,
      /(^|\/)routes?(\/|\.|$)/i,
      /(^|\/)controllers?(\/|\.|$)/i,
      /(^|\/)middleware(\/|\.|$)/i,
    ],
  },

  {
  name: "Database",
  patterns: [
    /(^|\/)database(\/|\.|$)/i,
    /(^|\/)db(\/|\.|$)/i,
    /(^|\/)repositories?(\/|\.|$)/i,
    /(^|\/)[^/]+\.repository\.[^/]+$/i,
    /(^|\/)models?(\/|\.|$)/i,
    /(^|\/)[^/]+\.model\.[^/]+$/i,
    /(^|\/)prisma(\/|\.|$)/i,
    /schema\.prisma$/i,
  ],
},

  {
  name: "Frontend",
  patterns: [
    /(^|\/)components?(\/|\.|$)/i,
    /(^|\/)pages?(\/|\.|$)/i,
    /(^|\/)views?(\/|\.|$)/i,
    /(^|\/)hooks?(\/|\.|$)/i,
    /(^|\/)contexts?(\/|\.|$)/i,

    // Common frontend root files
    /(^|\/)App\.(jsx?|tsx?)$/i,
    /(^|\/)main\.(jsx?|tsx?)$/i,
    /(^|\/)index\.(jsx?|tsx?)$/i,
  ],
},

  {
    name: "Deployment",
    patterns: [
      /(^|\/)dockerfile$/i,
      /(^|\/)docker-compose(\..*)?$/i,
      /(^|\/)\.github\/workflows(\/|$)/i,
      /(^|\/)deployment(\/|\.|$)/i,
      /(^|\/)deploy(\/|\.|$)/i,
      /(^|\/)k8s(\/|\.|$)/i,
      /(^|\/)kubernetes(\/|\.|$)/i,
    ],
  },

  {
    name: "Configuration",
    patterns: [
      /(^|\/)config(\/|\.|$)/i,
      /(^|\/)\.env/i,
      /package\.json$/i,
      /package-lock\.json$/i,
      /pnpm-lock\.yaml$/i,
      /yarn\.lock$/i,
    ],
  },

  {
    name: "Testing",
    patterns: [
      /\.(test|spec)\.[^/]+$/i,
      /(^|\/)tests?(\/|\.|$)/i,
      /(^|\/)__tests__(\/|$)/i,
    ],
  },
];

module.exports = {
  IMPACT_AREA_RULES,
};