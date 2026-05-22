// utils/pricingData.js

const pricingData = {
  cursor: {
    displayName: "Cursor",

    plans: {
      hobby: {
        name: "Hobby",
        monthlyPricePerSeat: 0,
      },

      pro: {
        name: "Pro",
        monthlyPricePerSeat: 20,
      },

      business: {
        name: "Business",
        monthlyPricePerSeat: 40,
      },

      enterprise: {
        name: "Enterprise",
        monthlyPricePerSeat: 60,
      },
    },
  },

  githubCopilot: {
    displayName: "GitHub Copilot",

    plans: {
      individual: {
        name: "Individual",
        monthlyPricePerSeat: 10,
      },

      business: {
        name: "Business",
        monthlyPricePerSeat: 19,
      },

      enterprise: {
        name: "Enterprise",
        monthlyPricePerSeat: 39,
      },
    },
  },

  claude: {
    displayName: "Claude",

    plans: {
      free: {
        name: "Free",
        monthlyPricePerSeat: 0,
      },

      pro: {
        name: "Pro",
        monthlyPricePerSeat: 20,
      },

      max: {
        name: "Max",
        monthlyPricePerSeat: 100,
      },

      team: {
        name: "Team",
        monthlyPricePerSeat: 30,
      },

      enterprise: {
        name: "Enterprise",
        monthlyPricePerSeat: 75,
      },

      api: {
        name: "API Direct",
        monthlyPricePerSeat: null,
      },
    },
  },

  chatgpt: {
    displayName: "ChatGPT",

    plans: {
      plus: {
        name: "Plus",
        monthlyPricePerSeat: 20,
      },

      team: {
        name: "Team",
        monthlyPricePerSeat: 30,
      },

      enterprise: {
        name: "Enterprise",
        monthlyPricePerSeat: 60,
      },

      api: {
        name: "API Direct",
        monthlyPricePerSeat: null,
      },
    },
  },

  anthropicApi: {
    displayName: "Anthropic API",

    plans: {
      direct: {
        name: "Direct API",
        monthlyPricePerSeat: null,
      },
    },
  },

  openaiApi: {
    displayName: "OpenAI API",

    plans: {
      direct: {
        name: "Direct API",
        monthlyPricePerSeat: null,
      },
    },
  },

  gemini: {
    displayName: "Gemini",

    plans: {
      pro: {
        name: "Pro",
        monthlyPricePerSeat: 20,
      },

      ultra: {
        name: "Ultra",
        monthlyPricePerSeat: 50,
      },

      api: {
        name: "API Direct",
        monthlyPricePerSeat: null,
      },
    },
  },

  windsurf: {
    displayName: "Windsurf",

    plans: {
      free: {
        name: "Free",
        monthlyPricePerSeat: 0,
      },

      pro: {
        name: "Pro",
        monthlyPricePerSeat: 15,
      },

      teams: {
        name: "Teams",
        monthlyPricePerSeat: 35,
      },
    },
  },
};

module.exports = pricingData;