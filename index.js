const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── GitHub permanent storage ─────────────────────────────────
const INITIAL_DATA = {
  "2341.9011": {
    "liefertermin": [],
    "tz_bom": [
      {
        "stage_art": "2341.1011",
        "menge_per_stk": 0.5,
        "maschine": "M1055",
        "s_zt": 4,
        "r_zt": 38
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2341.2011",
        "menge_per_stk": 1,
        "maschine": "M3050",
        "s_zt": 3,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": "EG 12"
  },
  "2341.9012": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 25,
        "menge": 10
      },
      {
        "year": 2026,
        "kw": 26,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 27,
        "menge": 10
      },
      {
        "year": 2026,
        "kw": 28,
        "menge": 10
      },
      {
        "year": 2026,
        "kw": 29,
        "menge": 40
      },
      {
        "year": 2026,
        "kw": 35,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 37,
        "menge": 10
      },
      {
        "year": 2026,
        "kw": 38,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 40,
        "menge": 10
      },
      {
        "year": 2026,
        "kw": 41,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 43,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 44,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 45,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 46,
        "menge": 10
      },
      {
        "year": 2026,
        "kw": 47,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 48,
        "menge": 10
      },
      {
        "year": 2026,
        "kw": 49,
        "menge": 10
      },
      {
        "year": 2026,
        "kw": 50,
        "menge": 10
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2341.1011",
        "menge_per_stk": 0.5,
        "maschine": "M1055",
        "s_zt": 4,
        "r_zt": 38
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2341.2013",
        "menge_per_stk": 1,
        "maschine": "M3050",
        "s_zt": 3,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": "EG 12"
  },
  "2342.9012": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 26,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 29,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 37,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 40,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 44,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 47,
        "menge": 50
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2342.1012",
        "menge_per_stk": 0.25,
        "maschine": "M1585",
        "s_zt": 4,
        "r_zt": 90
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2342.2012",
        "menge_per_stk": 1,
        "maschine": "M3050",
        "s_zt": 1.5,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": "EG 12"
  },
  "2454.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 25,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 28,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 29,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 38,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 41,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 44,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 47,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 50,
        "menge": 50
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2454.1001",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 1.5,
        "r_zt": 90
      },
      {
        "stage_art": "2454.1002",
        "menge_per_stk": 1,
        "maschine": "M1585",
        "s_zt": 1.25,
        "r_zt": 35
      },
      {
        "stage_art": "2454.1003",
        "menge_per_stk": 1,
        "maschine": "M1585",
        "s_zt": 1.25,
        "r_zt": 35
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2454.2001",
        "menge_per_stk": 1,
        "maschine": "M1429",
        "s_zt": 5.17,
        "r_zt": 45
      },
      {
        "stage_art": "2454.2002",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 1.78,
        "r_zt": 45
      },
      {
        "stage_art": "2454.2003",
        "menge_per_stk": 1,
        "maschine": "M1567",
        "s_zt": 1.78,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": "9000001"
  },
  "2455.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 24,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 27,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 29,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 37,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 41,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 44,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 47,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 50,
        "menge": 50
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2455.1001",
        "menge_per_stk": 1,
        "maschine": "M1585",
        "s_zt": 0.75,
        "r_zt": 90
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2455.2001",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 2.98,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": "EG 12"
  },
  "2456.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 24,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 27,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 29,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 36,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 39,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 43,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 46,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 49,
        "menge": 50
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2456.1001",
        "menge_per_stk": 0.5,
        "maschine": "M1585",
        "s_zt": 1.5,
        "r_zt": 90
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2456.2001",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 3.08,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": "EG 12"
  },
  "2457.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 25,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 28,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 35,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 38,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 42,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 45,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 48,
        "menge": 50
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2457.1001",
        "menge_per_stk": 0.5,
        "maschine": "M2735",
        "s_zt": 1.5,
        "r_zt": 90
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2457.2001",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 1.15,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": "EG 12"
  },
  "2458.9003": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 23,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 24,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 26,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 27,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 29,
        "menge": 60
      },
      {
        "year": 2026,
        "kw": 36,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 37,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 38,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 40,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 41,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 42,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 44,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 45,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 46,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 47,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 49,
        "menge": 20
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2458.1001",
        "menge_per_stk": 0.25,
        "maschine": "M2735",
        "s_zt": 3,
        "r_zt": 90
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2458.2003",
        "menge_per_stk": 1,
        "maschine": "M1429",
        "s_zt": 1.79,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": "EG 12"
  },
  "2459.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 24,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 27,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 29,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 38,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 40,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 44,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 47,
        "menge": 50
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2459.1001",
        "menge_per_stk": 1,
        "maschine": "M2735",
        "s_zt": 0.75,
        "r_zt": 90
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2459.2001",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 2.5,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.14,
    "mo_a_platz": "EG 12"
  },
  "2460.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 24,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 27,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 29,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 37,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 40,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 44,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 47,
        "menge": 50
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2460.1001",
        "menge_per_stk": 1,
        "maschine": "M1585",
        "s_zt": 2.5,
        "r_zt": 90
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2460.2001",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 3.07,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": "EG 12"
  },
  "2461.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 25,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 28,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 35,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 38,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 42,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 45,
        "menge": 50
      },
      {
        "year": 2026,
        "kw": 48,
        "menge": 50
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2461.1001",
        "menge_per_stk": 1,
        "maschine": "M2735",
        "s_zt": 1.67,
        "r_zt": 90
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2461.2001",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 1.4,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": "EG 12"
  },
  "2521.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 23,
        "menge": 24
      },
      {
        "year": 2026,
        "kw": 48,
        "menge": 24
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2521.1001",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 90
      },
      {
        "stage_art": "2521.1002",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 90
      },
      {
        "stage_art": "2521.1003",
        "menge_per_stk": 0.25,
        "maschine": "M435",
        "s_zt": 1.5,
        "r_zt": 90
      },
      {
        "stage_art": "2521.1004",
        "menge_per_stk": 0.5,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 90
      },
      {
        "stage_art": "2521.1005",
        "menge_per_stk": 0.5,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 90
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2521.2001",
        "menge_per_stk": 1,
        "maschine": "M2080",
        "s_zt": 4,
        "r_zt": 45
      },
      {
        "stage_art": "2521.2002",
        "menge_per_stk": 1,
        "maschine": "M1429",
        "s_zt": 2,
        "r_zt": 45
      },
      {
        "stage_art": "2521.2003",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 0.4,
        "r_zt": 45
      },
      {
        "stage_art": "2521.2004",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 4,
        "r_zt": 45
      },
      {
        "stage_art": "2521.2005",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 3,
        "r_zt": 45
      },
      {
        "stage_art": "2521.2006",
        "menge_per_stk": 1,
        "maschine": "unbekannt",
        "s_zt": 3,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.875,
    "mo_a_platz": "EG 12"
  },
  "2522.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 29,
        "menge": 25
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2522.1001",
        "menge_per_stk": 1,
        "maschine": "M1585",
        "s_zt": 4,
        "r_zt": 90
      },
      {
        "stage_art": "2521.1003",
        "menge_per_stk": 0.5,
        "maschine": "M435",
        "s_zt": 1.5,
        "r_zt": 90
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2522.2001",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 3,
        "r_zt": 45
      },
      {
        "stage_art": "2521.2003",
        "menge_per_stk": 2,
        "maschine": "M3045",
        "s_zt": 0.4,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.28,
    "mo_a_platz": "EG 12"
  },
  "2522.9002": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 27,
        "menge": 25
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2521.1003",
        "menge_per_stk": 0.5,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2522.1001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2522.2001",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2521.2003",
        "menge_per_stk": 2,
        "maschine": "M3045",
        "s_zt": null,
        "r_zt": null
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": null
  },
  "2522.9003": {
    "liefertermin": [],
    "tz_bom": [
      {
        "stage_art": "2522.1001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2521.1003",
        "menge_per_stk": 0.5,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2522.2001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2521.2003",
        "menge_per_stk": 2,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": null
  },
  "2523.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 27,
        "menge": 24
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2523.1001",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 90
      },
      {
        "stage_art": "2523.1002",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 90
      },
      {
        "stage_art": "2521.1005",
        "menge_per_stk": 0.5,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 90
      },
      {
        "stage_art": "2521.1004",
        "menge_per_stk": 0.5,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 90
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2523.2001",
        "menge_per_stk": 1,
        "maschine": "M2080",
        "s_zt": 4,
        "r_zt": 45
      },
      {
        "stage_art": "2523.2002",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 2,
        "r_zt": 45
      },
      {
        "stage_art": "2523.2005",
        "menge_per_stk": 1,
        "maschine": "unbekannt",
        "s_zt": 3,
        "r_zt": 45
      },
      {
        "stage_art": "2523.2006",
        "menge_per_stk": 1,
        "maschine": "unbekannt",
        "s_zt": 3,
        "r_zt": 45
      },
      {
        "stage_art": "2523.2004",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 3,
        "r_zt": 30
      }
    ],
    "mo_s_zt": 0.875,
    "mo_a_platz": "EG 12"
  },
  "2524.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 23,
        "menge": 25
      },
      {
        "year": 2026,
        "kw": 29,
        "menge": 25
      },
      {
        "year": 2026,
        "kw": 39,
        "menge": 25
      },
      {
        "year": 2026,
        "kw": 44,
        "menge": 25
      },
      {
        "year": 2026,
        "kw": 48,
        "menge": 25
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2524.1001",
        "menge_per_stk": 1,
        "maschine": "M1585",
        "s_zt": 3,
        "r_zt": 90
      },
      {
        "stage_art": "2521.1003",
        "menge_per_stk": 0.25,
        "maschine": "M435",
        "s_zt": 1.5,
        "r_zt": 90
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2524.2001",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 3.2,
        "r_zt": 45
      },
      {
        "stage_art": "2521.2003",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 0.4,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.5384615384615384,
    "mo_a_platz": "EG 12"
  },
  "2525.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 29,
        "menge": 25
      },
      {
        "year": 2026,
        "kw": 38,
        "menge": 25
      },
      {
        "year": 2026,
        "kw": 44,
        "menge": 25
      },
      {
        "year": 2026,
        "kw": 48,
        "menge": 25
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2525.1001",
        "menge_per_stk": 1,
        "maschine": "M1585",
        "s_zt": 4,
        "r_zt": 90
      },
      {
        "stage_art": "2525.1002",
        "menge_per_stk": 1,
        "maschine": "M1585",
        "s_zt": 4,
        "r_zt": 90
      },
      {
        "stage_art": "2525.1003",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 90
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2525.2001",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 3,
        "r_zt": 45
      },
      {
        "stage_art": "2525.2002",
        "menge_per_stk": 1,
        "maschine": "M1429",
        "s_zt": 3.5,
        "r_zt": 45
      },
      {
        "stage_art": "2525.2003",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 1.33,
        "r_zt": 45
      },
      {
        "stage_art": "2525.2004",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 1.33,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.5384615384615384,
    "mo_a_platz": "EG 12"
  },
  "2541.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 24,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 28,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 35,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 42,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 47,
        "menge": 20
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2541.1001",
        "menge_per_stk": 1,
        "maschine": "M2735",
        "s_zt": 3,
        "r_zt": 90
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2541.2001",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 1.67,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": "EG 12"
  },
  "2541.9002": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 25,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 29,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 35,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 39,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 44,
        "menge": 20
      },
      {
        "year": 2026,
        "kw": 50,
        "menge": 20
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2541.1001",
        "menge_per_stk": 1,
        "maschine": "M2735",
        "s_zt": 3,
        "r_zt": 90
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2541.2002",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 1.53,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": "EG 12"
  },
  "2544.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 26,
        "menge": 24
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2544.1001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2544.1002",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2544.2001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2544.2002",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "mo_s_zt": 0.54,
    "mo_a_platz": "#N/A"
  },
  "2601.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 27,
        "menge": 15
      },
      {
        "year": 2026,
        "kw": 39,
        "menge": 15
      },
      {
        "year": 2026,
        "kw": 45,
        "menge": 15
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2601.1001",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 4,
        "r_zt": 60
      },
      {
        "stage_art": "2601.1002",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 4,
        "r_zt": 60
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2601.2001",
        "menge_per_stk": 1,
        "maschine": "M2080",
        "s_zt": 3,
        "r_zt": 45
      },
      {
        "stage_art": "2601.2002",
        "menge_per_stk": 1,
        "maschine": "M2080",
        "s_zt": 3,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": "EG 12"
  },
  "2602.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 27,
        "menge": 15
      },
      {
        "year": 2026,
        "kw": 39,
        "menge": 15
      },
      {
        "year": 2026,
        "kw": 46,
        "menge": 15
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2602.1001",
        "menge_per_stk": 1,
        "maschine": "M2735",
        "s_zt": 3,
        "r_zt": 60
      },
      {
        "stage_art": "2602.1002",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 60
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2602.2001",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 3.25,
        "r_zt": 45
      },
      {
        "stage_art": "2602.2002",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 2.08,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.4666666666666667,
    "mo_a_platz": "EG 12"
  },
  "2603.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 27,
        "menge": 15
      },
      {
        "year": 2026,
        "kw": 38,
        "menge": 15
      },
      {
        "year": 2026,
        "kw": 45,
        "menge": 15
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2603.1001",
        "menge_per_stk": 1,
        "maschine": "M2735",
        "s_zt": 3,
        "r_zt": 60
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2603.2001",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 2.63,
        "r_zt": 45
      },
      {
        "stage_art": "2603.2002",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 1.02,
        "r_zt": 30
      }
    ],
    "mo_s_zt": 0.875,
    "mo_a_platz": "EG 12"
  },
  "2604.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 28,
        "menge": 15
      },
      {
        "year": 2026,
        "kw": 39,
        "menge": 15
      },
      {
        "year": 2026,
        "kw": 46,
        "menge": 15
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2604.1001",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 60
      },
      {
        "stage_art": "2604.1002",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 60
      },
      {
        "stage_art": "2604.1003",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 60
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2604.2001",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 3,
        "r_zt": 45
      },
      {
        "stage_art": "2604.2002",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 3,
        "r_zt": 45
      },
      {
        "stage_art": "2604.2003",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 4,
        "r_zt": 30
      }
    ],
    "mo_s_zt": 1.75,
    "mo_a_platz": "EG 12"
  },
  "2605.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 27,
        "menge": 15
      },
      {
        "year": 2026,
        "kw": 39,
        "menge": 15
      },
      {
        "year": 2026,
        "kw": 46,
        "menge": 15
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2605.1001",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 60
      },
      {
        "stage_art": "2605.1002",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 60
      },
      {
        "stage_art": "2605.1003",
        "menge_per_stk": 1,
        "maschine": "M2735",
        "s_zt": 3,
        "r_zt": 60
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2605.2001",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 4.17,
        "r_zt": 45
      },
      {
        "stage_art": "2605.2002",
        "menge_per_stk": 1,
        "maschine": "M1429",
        "s_zt": 2.5,
        "r_zt": 45
      },
      {
        "stage_art": "2603.2002",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 1.02,
        "r_zt": 30
      },
      {
        "stage_art": "2605.2003",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 3,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 1.4,
    "mo_a_platz": "EG 12"
  },
  "2664.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 28,
        "menge": 25
      },
      {
        "year": 2026,
        "kw": 45,
        "menge": 25
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2664.1001",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 3,
        "r_zt": 60
      },
      {
        "stage_art": "2664.1002",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 4,
        "r_zt": 60
      },
      {
        "stage_art": "2664.1003",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 4,
        "r_zt": 60
      },
      {
        "stage_art": "2664.1004",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 4,
        "r_zt": 60
      },
      {
        "stage_art": "2664.1005",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 4,
        "r_zt": 60
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2664.2001",
        "menge_per_stk": 1,
        "maschine": "M2080",
        "s_zt": 5,
        "r_zt": 45
      },
      {
        "stage_art": "2664.2002",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 2,
        "r_zt": 45
      },
      {
        "stage_art": "2664.2003",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 2,
        "r_zt": 45
      },
      {
        "stage_art": "2664.2004",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 2,
        "r_zt": 45
      },
      {
        "stage_art": "2664.2005",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 1,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.84,
    "mo_a_platz": "EG 12"
  },
  "2665.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 24,
        "menge": 25
      },
      {
        "year": 2026,
        "kw": 37,
        "menge": 25
      },
      {
        "year": 2026,
        "kw": 50,
        "menge": 25
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2665.1001",
        "menge_per_stk": 1,
        "maschine": "M1585",
        "s_zt": 6,
        "r_zt": 60
      },
      {
        "stage_art": "2665.1002",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 4,
        "r_zt": 60
      },
      {
        "stage_art": "2665.1003",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 4,
        "r_zt": 60
      },
      {
        "stage_art": "2665.1004",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 4,
        "r_zt": 60
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2665.2001",
        "menge_per_stk": 1,
        "maschine": "M2080",
        "s_zt": 2.3,
        "r_zt": 45
      },
      {
        "stage_art": "2665.2002",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 2.03,
        "r_zt": 45
      },
      {
        "stage_art": "2665.2003",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 2,
        "r_zt": 45
      },
      {
        "stage_art": "2665.2004",
        "menge_per_stk": 1,
        "maschine": "unbekannt",
        "s_zt": 2,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.84,
    "mo_a_platz": "EG 12"
  },
  "2666.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 26,
        "menge": 25
      },
      {
        "year": 2026,
        "kw": 40,
        "menge": 25
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2666.1001",
        "menge_per_stk": 1,
        "maschine": "M2735",
        "s_zt": 2.5,
        "r_zt": 60
      },
      {
        "stage_art": "2666.1002",
        "menge_per_stk": 1,
        "maschine": "M2735",
        "s_zt": 2.5,
        "r_zt": 60
      },
      {
        "stage_art": "2666.1003",
        "menge_per_stk": 1,
        "maschine": "M1055",
        "s_zt": 4,
        "r_zt": 60
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2666.2001",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 3,
        "r_zt": 45
      },
      {
        "stage_art": "2666.2002",
        "menge_per_stk": 1,
        "maschine": "M1056",
        "s_zt": 3,
        "r_zt": 45
      },
      {
        "stage_art": "2666.2003",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 2,
        "r_zt": 45
      },
      {
        "stage_art": "2666.2004",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 2,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 1.1666666666666667,
    "mo_a_platz": "EG 12"
  },
  "2667.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 26,
        "menge": 25
      },
      {
        "year": 2026,
        "kw": 39,
        "menge": 25
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2667.1001",
        "menge_per_stk": 1,
        "maschine": "M2735",
        "s_zt": 3,
        "r_zt": 60
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2667.2001",
        "menge_per_stk": 1,
        "maschine": "M3045",
        "s_zt": 2.5,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": "EG 12"
  },
  "2668.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 25,
        "menge": 25
      },
      {
        "year": 2026,
        "kw": 38,
        "menge": 25
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2668.1001",
        "menge_per_stk": 1,
        "maschine": "M2735",
        "s_zt": 3,
        "r_zt": 60
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2668.2001",
        "menge_per_stk": 1,
        "maschine": "unbekannt",
        "s_zt": 3.5,
        "r_zt": 45
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": "EG 12"
  },
  "2669.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 26,
        "menge": 25
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2669.1001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2669.1002",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2669.2001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2669.2002",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "mo_s_zt": 0.59,
    "mo_a_platz": null
  },
  "2720.9001": {
    "liefertermin": [],
    "tz_bom": [
      {
        "stage_art": "2720.1001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2720.1002",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2720.1003",
        "menge_per_stk": 0.5,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2720.1004",
        "menge_per_stk": 0.5,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2720.2001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2720.2002",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2720.2003",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2720.2004",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2720.2005",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "mo_s_zt": 0.88,
    "mo_a_platz": null
  },
  "2721.9001": {
    "liefertermin": [],
    "tz_bom": [
      {
        "stage_art": "2720.1003",
        "menge_per_stk": 0.5,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2720.1004",
        "menge_per_stk": 0.5,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2721.1001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2721.1002",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2721.2001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2721.2002",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2721.2003",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2721.2004",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2721.2005",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "mo_s_zt": 0.88,
    "mo_a_platz": null
  },
  "2724.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 27,
        "menge": 10
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2724.1001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2724.1002",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2724.1003",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2724.1004",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2724.2001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2724.2002",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2724.2003",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2724.2004",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "mo_s_zt": 0.42,
    "mo_a_platz": null
  },
  "2725.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 26,
        "menge": 10
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2725.1001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2725.2001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": null
  },
  "2727.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 24,
        "menge": 4
      },
      {
        "year": 2026,
        "kw": 29,
        "menge": 6
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2727.1001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2727.2001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "mo_s_zt": 0.1,
    "mo_a_platz": null
  },
  "2728.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 27,
        "menge": 10
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2728.1001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2728.1002",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2728.2001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      },
      {
        "stage_art": "2728.2002",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "mo_s_zt": 0.1,
    "mo_a_platz": null
  },
  "2729.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 26,
        "menge": 10
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2729.1001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2729.2001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": null
  },
  "2730.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 26,
        "menge": 10
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2730.1001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2730.2001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": null
  },
  "2731.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 26,
        "menge": 10
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2731.1001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2731.2001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": null
  },
  "2732.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 26,
        "menge": 10
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2732.1001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2732.2001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": null
  },
  "2733.9001": {
    "liefertermin": [
      {
        "year": 2026,
        "kw": 26,
        "menge": 10
      }
    ],
    "tz_bom": [
      {
        "stage_art": "2733.1001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "fr_bom": [
      {
        "stage_art": "2733.2001",
        "menge_per_stk": 1,
        "maschine": null,
        "s_zt": null,
        "r_zt": null
      }
    ],
    "mo_s_zt": 0.7,
    "mo_a_platz": null
  }
};

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO  = process.env.GITHUB_REPO || 'vishalmodgill4712-hub/bw-planungstool';
const DATA_FILE    = 'planungsdaten.json';
const GITHUB_API   = `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE}`;

let memoryCache = null; // in-memory cache to reduce GitHub API calls
const sessions  = {};   // in-memory sessions (reset on restart is fine)

async function githubGet() {
  if (memoryCache) return memoryCache;
  const r = await fetch(GITHUB_API, {
    headers: { 'Authorization': `token ${GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json' }
  });
  if (r.status === 404) {
    memoryCache = { plan: INITIAL_DATA, updated_at: new Date().toISOString(), updated_by: 'system', sha: null };
    return memoryCache;
  }
  if (!r.ok) throw new Error('GitHub GET failed: ' + r.status);
  const file = await r.json();
  const content = Buffer.from(file.content, 'base64').toString('utf8');
  memoryCache = { ...JSON.parse(content), sha: file.sha };
  return memoryCache;
}

async function githubSave(planData, username) {
  const now = new Date().toISOString();
  const payload = { plan: planData, updated_at: now, updated_by: username };
  const content = Buffer.from(JSON.stringify(payload, null, 2)).toString('base64');
  if (!memoryCache || !memoryCache.sha) { try { await githubGet(); } catch(e) {} }
  const body = {
    message: `Gespeichert von ${username} (${new Date().toLocaleString('de-DE')})`,
    content,
    ...(memoryCache && memoryCache.sha ? { sha: memoryCache.sha } : {})
  };
  const r = await fetch(GITHUB_API, {
    method: 'PUT',
    headers: { 'Authorization': `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github.v3+json' },
    body: JSON.stringify(body)
  });
  if (!r.ok) { const e = await r.json(); throw new Error(e.message || r.status); }
  const result = await r.json();
  memoryCache = { ...payload, sha: result.content.sha };
  console.log('✓ Saved to GitHub by', username);
  return { ok: true, saved_at: now };
}

// ─── Users ────────────────────────────────────────────────────
const USERS = [
  { name: 'Modu',        password: 'planung2026', role: 'planer' },
  { name: 'Planer',      password: 'planer123',   role: 'planer' },
  { name: 'Mitarbeiter', password: 'team123',     role: 'mitarbeiter' },
];

// ─── Middleware ───────────────────────────────────────────────
app.use(express.json({ limit: '20mb' }));

function auth(req, res, next) {
  const token = req.headers['x-auth-token'];
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  const s = sessions[token];
  if (!s) return res.status(401).json({ error: 'Invalid session' });
  req.user = s;
  next();
}
function planersOnly(req, res, next) {
  if (req.user.role !== 'planer') return res.status(403).json({ error: 'Planer only' });
  next();
}

// ─── API Routes ───────────────────────────────────────────────
app.post('/api/login', (req, res) => {
  const { username='', password='' } = req.body || {};
  const user = USERS.find(u => u.name.toLowerCase() === username.toLowerCase().trim() && u.password === password);
  if (!user) return res.status(401).json({ error: 'Benutzername oder Passwort falsch.' });
  const token = crypto.randomBytes(32).toString('hex');
  sessions[token] = { username: user.name, role: user.role };
  res.json({ token, username: user.name, role: user.role });
});

app.post('/api/logout', auth, (req, res) => {
  delete sessions[req.headers['x-auth-token']];
  res.json({ ok: true });
});

app.get('/api/plan', auth, async (req, res) => {
  try { res.json(await githubGet()); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/plan', auth, planersOnly, async (req, res) => {
  const { plan } = req.body || {};
  if (!plan) return res.status(400).json({ error: 'No data' });
  try { res.json(await githubSave(plan, req.user.username)); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// ─── Frontend ─────────────────────────────────────────────────
const FRONTEND_HTML = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Produktionsplanung — Bruno Weisser GmbH</title>
<style>
  :root {
    --bg: #ffffff; --surface: #f7f8fa; --card: #ffffff; --border: #e2e6ec; --border-strong: #c9cfd9;
    --accent: #006EB7; --accent-dark: #005590; --accent2: #676C6E; --fest: #16a34a; --warn: #d97706; --danger: #dc2626;
    --text: #1c2024; --muted: #676C6E; --muted-light: #9aa0a3;
    --tz-c: #676C6E; --fr-c: #b45309; --mo-c: #006EB7; --li-c: #16a34a;
    --font: Calibri, 'Segoe UI', Arial, sans-serif;
    --font-head: Calibri, 'Segoe UI', Arial, sans-serif;
    --font-mono: Calibri, 'Segoe UI', Arial, sans-serif;
    --radius: 9px; --radius-sm: 6px;
    --shadow-sm: 0 1px 2px rgba(20,24,31,.04), 0 1px 1px rgba(20,24,31,.03);
    --shadow-md: 0 2px 6px rgba(20,24,31,.06), 0 1px 2px rgba(20,24,31,.04);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--surface); color: var(--text); font-family: var(--font); font-size: 14px; line-height: 1.45; -webkit-font-smoothing: antialiased; }
  code, .mono { font-family: var(--font-mono); }
  h1, h2, h3, .sec-title, .cap-title, .logo-text { font-family: var(--font-head); }

  header { background: var(--bg); border-bottom: 1px solid var(--border); padding: 12px 28px; display: flex; align-items: center; gap: 16px; box-shadow: var(--shadow-sm); }
  .logo { font-size: 15px; font-weight: 700; letter-spacing: -.1px; color: var(--text); display: flex; align-items: center; gap: 12px; }
  .logo img.logo-mark-img { height: 34px; width: auto; display: block; }
  .logo-text { font-family: var(--font-head); font-weight: 700; font-size: 14px; letter-spacing: .2px; color: var(--text); line-height: 1.25; }
  .logo-text .logo-sub { display: block; font-family: var(--font); font-weight: 500; font-size: 10.5px; color: var(--muted); letter-spacing: .3px; text-transform: uppercase; margin-top: 1px; }
  .logo .logo-mark { width: 26px; height: 26px; border-radius: 7px; background: var(--accent); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800; flex-shrink: 0; }
  .sub { color: var(--muted); font-size: 11.5px; margin-top: 2px; }
  .kw-badge { margin-left: auto; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 6px 14px; font-size: 12px; color: var(--muted); display:flex; align-items:center; gap:10px; }
  .kw-badge strong { color: var(--text); font-family: var(--font-mono); font-weight: 600; }
  .kw-nav { display:flex; gap:2px; }
  .kw-nav button { background: var(--bg); border: 1px solid var(--border); color:var(--text); width:23px; height:23px; border-radius:5px; cursor:pointer; font-size:13px; transition: all .12s; }
  .kw-nav button:hover { background: var(--accent); border-color: var(--accent); color: #fff; }

  .main { display: flex; height: calc(100vh - 58px); overflow: hidden; }

  .sidebar { width: 252px; min-width: 252px; background: var(--bg); border-right: 1px solid var(--border); overflow-y: auto; padding: 18px 12px; display: flex; flex-direction: column; gap: 18px; }
  .sb-h { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: var(--muted-light); font-weight: 700; padding: 0 4px; margin-bottom: 6px; }
  .filter-group { display: flex; flex-direction: column; gap: 3px; }
  .filter-btn { background: transparent; border: 1px solid transparent; border-radius: var(--radius-sm); padding: 7px 10px; color: var(--muted); cursor: pointer; text-align: left; font-size: 12px; font-weight: 500; transition: all .12s; display: flex; align-items: center; gap: 8px; }
  .filter-btn:hover { background: var(--surface); color: var(--text); }
  .filter-btn.active { background: var(--surface); border-color: var(--border); color: var(--text); font-weight: 600; }
  .dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

  .cap-input-group { display: flex; flex-direction: column; gap: 6px; }
  .cap-input-group label { font-size: 11px; color: var(--muted); }
  .cap-input-group input { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text); padding: 7px 10px; font-size: 13px; font-weight: 600; font-family: var(--font-mono); width: 100%; }
  .cap-input-group input:focus { border-color: var(--accent); outline: none; box-shadow: 0 0 0 3px rgba(29,78,216,.08); }
  .cap-zone-normal { background: rgba(34,197,94,.08); border: 1px solid rgba(34,197,94,.25); border-radius: var(--radius-sm); padding: 8px 10px; }
  .cap-zone-normal label { color: #15803d; font-weight: 600; }
  .cap-zone-warn { background: rgba(217,119,6,.08); border: 1px solid rgba(217,119,6,.25); border-radius: var(--radius-sm); padding: 8px 10px; }
  .cap-zone-warn label { color: #92400e; font-weight: 600; }

  .search-box { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text); padding: 8px 10px; font-size: 12px; width: 100%; font-family: var(--font-mono); }
  .search-box::placeholder { color: var(--muted-light); font-family: var(--font); }
  .search-box:focus { border-color: var(--accent); outline: none; box-shadow: 0 0 0 3px rgba(29,78,216,.08); }

  .legend { display: flex; flex-direction: column; gap: 7px; padding: 0 4px; }
  .leg-row { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--muted); }
  .leg-swatch { width: 24px; height: 12px; border-radius: 3px; flex-shrink: 0; }

  .stat-mini { display:flex; flex-direction:column; gap:5px; font-size:11.5px; color:var(--muted); padding: 0 4px;}
  .stat-mini b { color: var(--text); font-family: var(--font-mono); }

  .content { flex: 1; overflow: auto; padding: 22px 26px; }

  .summary-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 20px; }
  .sum-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 16px; box-shadow: var(--shadow-sm); }
  .sum-card.alert-card { border-color: var(--danger); background: rgba(220,38,38,.04); }
  .sum-card .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: .6px; color: var(--muted); font-weight: 600; margin-bottom: 6px; }
  .sum-card .val { font-size: 21px; font-weight: 700; font-family: var(--font-mono); letter-spacing: -.3px; }
  .sum-card .sv { font-size: 11px; color: var(--muted); margin-top: 3px; }

  .cap-section { margin-bottom: 20px; }
  .cap-chart-wrap { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 12px 16px 6px; margin-bottom: 12px; box-shadow: var(--shadow-sm); }
  .cap-chart-wrap svg { width: 100%; height: auto; display: block; }
  .cap-title { font-size: 14px; font-weight: 700; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; color: var(--text); letter-spacing: -.1px; }
  .cap-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .cap-grid { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 8px; }
  .cap-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 10px 10px; min-width: 0; box-shadow: var(--shadow-sm); overflow: hidden; }
  .cap-card.over { border-color: var(--danger); background: rgba(220,38,38,.04); }
  .cap-card.warn { border-color: var(--warn); background: rgba(217,119,6,.04); }
  .cap-kw { font-size: 11px; font-weight: 700; color: var(--muted); margin-bottom: 6px; display: flex; justify-content: space-between; gap: 4px; white-space: nowrap; overflow: hidden; }
  .cap-kw span { color: var(--text); flex-shrink: 0; }
  .cap-bar-bg { background: var(--border); border-radius: 4px; height: 8px; margin-bottom: 5px; overflow: hidden; }
  .cap-bar-fill { height: 100%; border-radius: 4px; transition: width .3s; }
  .cap-detail { font-size: 10px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cap-detail .over-txt { color: var(--danger); font-weight: 700; }
  .cap-detail .ok-txt { color: var(--fest); }
  .cap-detail .warn-txt { color: var(--warn); }

  .view-tabs { display: flex; gap: 4px; margin-bottom: 18px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 4px; width: fit-content; }
  .view-tab { background: transparent; border: none; border-radius: 6px; color: var(--muted); font-size: 12.5px; font-weight: 500; padding: 7px 15px; cursor: pointer; transition: all .12s; }
  .view-tab:hover { color: var(--text); }
  .view-tab.active { background: var(--bg); color: var(--text); font-weight: 600; box-shadow: var(--shadow-sm); }

  .gantt-wrap { overflow-x: auto; }
  table.gantt { width: 100%; border-collapse: collapse; min-width: 1300px; }
  .gantt th { background: var(--surface); border: 1px solid var(--border); padding: 7px 8px; font-size: 10.5px; font-weight: 600; text-align: center; color: var(--muted); white-space: nowrap; }
  .gantt th.kw-fest { color: var(--fest); }
  .gantt th.kw-flex { color: var(--warn); }
  .gantt th.kw-curr { color: var(--accent); border-bottom: 2px solid var(--accent); }
  .gantt th.col-art { text-align: left; width: 150px; }
  .gantt th.col-info { width: 55px; }
  .gantt td { border: 1px solid var(--border); padding: 4px 5px; vertical-align: middle; }
  .gantt tr:hover td { background: rgba(29,78,216,.04); }
  .gantt tr.stage-row-li td { background: rgba(34,197,94,.04); }
  .gantt tr.stage-row-mo td { background: rgba(29,78,216,.04); }
  .gantt tr.stage-row-fr td { background: rgba(245,158,11,.04); }
  .gantt tr.stage-row-tz td { background: rgba(139,92,246,.04); }
  .gantt tr.stage-row-li:first-child td,
  td.art-cell { border-top: 2px solid var(--accent); }
  td.art-cell { font-size: 12px; }
  td.info-cell { text-align: center; color: var(--muted); font-size: 11px; }
  td.stage-cell { text-align: center; padding: 2px 3px; }

  .cb { display: inline-flex; align-items: center; justify-content: center; border-radius: 4px; font-size: 9.5px; font-weight: 700; padding: 3px 6px; letter-spacing: .2px; min-width: 38px; gap: 2px; margin: 1px; }
  .cb-wide { flex-direction: column; min-width: 58px; font-family: Calibri, 'Segoe UI', Arial, sans-serif; line-height: 1.5; padding: 4px 6px; text-align: center; }
  .cb-tz { background: rgba(139,92,246,.18); border: 1px solid rgba(139,92,246,.45); color: #6d28d9; }
  .cb-fr { background: rgba(245,158,11,.14); border: 1px solid rgba(245,158,11,.4); color: #92400e; }
  .cb-mo { background: rgba(29,78,216,.18); border: 1px solid rgba(29,78,216,.45); color: #1e40af; }
  .cb-li { background: rgba(34,197,94,.13); border: 1px solid rgba(34,197,94,.4); color: #15803d; }
  .fm { display:inline-block; width:5px; height:5px; border-radius:50%; background:var(--fest); margin-left:2px; vertical-align:middle; }

  .art-name { font-size: 12px; color: var(--text); display: block; }
  .art-nr { font-family: Calibri, 'Segoe UI', Arial, sans-serif; font-size: 10px; color: var(--muted); display: block; }
  .kombi-badge { font-size: 9px; background: rgba(6,182,212,.14); border: 1px solid rgba(6,182,212,.3); color: var(--accent2); border-radius: 3px; padding: 1px 5px; margin-left: 5px; }

  table.detail { width: 100%; border-collapse: collapse; margin-top: 4px; }
  .detail thead th { background: var(--surface); border: 1px solid var(--border); padding: 8px 10px; font-size: 10px; color: var(--muted); text-align: left; letter-spacing: .5px; text-transform: uppercase; position: sticky; top:0; }
  .detail tbody td { border: 1px solid var(--border); padding: 6px 10px; font-size: 12px; vertical-align: middle; }
  .detail tbody tr:hover td { background: rgba(29,78,216,.04); }

  .stage-pill { display: inline-flex; align-items: center; gap: 5px; border-radius: 4px; padding: 3px 8px; font-size: 10px; font-weight: 600; }
  .pill-tz { background: rgba(139,92,246,.18); color: #6d28d9; }
  .pill-fr { background: rgba(245,158,11,.14); color: #92400e; }
  .pill-mo { background: rgba(29,78,216,.18); color: #1e40af; }
  .pill-li { background: rgba(34,197,94,.13); color: #15803d; }

  .st-fest { color: var(--fest); font-weight: 700; font-size: 11px; }
  .st-flex { color: var(--warn); font-size: 11px; }
  .st-est { color: var(--muted); font-size: 10px; font-style: italic; }

  .sec-title { font-size: 14px; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; color: var(--text); letter-spacing: -.1px; }
  .sec-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }

  .hidden { display: none !important; }

  /* INPUT VIEW */
  .input-toolbar { display: flex; gap: 10px; margin-bottom: 14px; align-items: center; flex-wrap: wrap; }
  .btn-small { background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: var(--radius-sm); padding: 7px 13px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all .12s; }
  .btn-small:hover { border-color: var(--border-strong); box-shadow: var(--shadow-sm); }
  .btn-primary { background: var(--accent); border: 1px solid var(--accent); color: #fff; font-weight: 600; }
  .btn-primary:hover { background: var(--accent-dark); border-color: var(--accent-dark); box-shadow: var(--shadow-sm); }
  .btn-danger { color: var(--danger); }

  table.input-table { width: 100%; border-collapse: collapse; }
  .input-table thead th { background: var(--surface); border: 1px solid var(--border); padding: 7px 8px; font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: .5px; position: sticky; top: 0; z-index: 2;}
  .input-table tbody td { border: 1px solid var(--border); padding: 4px 6px; vertical-align: middle; }
  .input-table tbody tr:hover td { background: rgba(29,78,216,.04); }
  .input-table input[type=text], .input-table input[type=number] {
    background: var(--bg); border: 1px solid var(--border); border-radius: 4px; color: var(--text);
    padding: 4px 6px; font-size: 11.5px; width: 100%; font-family: Calibri, 'Segoe UI', Arial, sans-serif;
  }
  .input-table input:focus { border-color: var(--accent); outline: none; }
  .kw-chip-row { display: flex; flex-wrap: wrap; gap: 3px; align-items: center; }
  .kw-chip { display:inline-flex; align-items:center; gap:4px; background: rgba(34,197,94,.12); border:1px solid rgba(34,197,94,.35); border-radius:4px; padding:2px 5px; font-size: 10.5px; }
  .kw-chip input { width: 40px !important; background: transparent !important; border: none !important; padding: 0 !important; color: var(--text) !important; font-size: 10.5px !important; }
  .kw-chip .menge-in { width: 36px !important; }
  .kw-chip .x-btn { cursor: pointer; color: var(--danger); font-weight: 700; padding: 0 2px; }
  .add-kw-btn { background: var(--card); border: 1px dashed var(--border); color: var(--accent2); border-radius: 4px; padding: 2px 7px; font-size: 11px; cursor: pointer; }
  .add-kw-btn:hover { border-color: var(--accent2); }
  .row-del { color: var(--danger); cursor: pointer; font-weight:700; padding: 2px 6px; }
  .derived-cell { font-size: 10.5px; color: var(--muted); }
  .derived-chip { display:inline-block; background: var(--card); border:1px solid var(--border); border-radius:3px; padding:1px 5px; margin: 1px; font-size:10px; }
  .derived-chip.tz { border-color: rgba(139,92,246,.4); color:#6d28d9; }
  .derived-chip.fr { border-color: rgba(245,158,11,.4); color:#92400e; }
  .derived-chip.mo { border-color: rgba(29,78,216,.4); color:#1e40af; }
  .combine-note { font-size: 9.5px; color: var(--accent2); margin-top:2px; }

  .bom-row { display:flex; align-items:center; gap:4px; background: var(--bg); border:1px solid var(--border); border-radius:4px; padding:3px 5px; margin-bottom:3px; flex-wrap:wrap; }
  .bom-row input.bom-art { width:70px; font-family:Calibri,'Segoe UI',Arial,sans-serif; }
  .bom-row input.bom-factor { width:42px; }
  .bom-row .bom-label { font-size:9.5px; color:var(--muted); }
  .bom-row .x-btn { cursor:pointer; color:var(--danger); font-weight:700; padding:0 2px; margin-left:auto; }
  .bom-add-btn { background: var(--card); border: 1px dashed var(--border); color: var(--accent2); border-radius: 4px; padding: 2px 8px; font-size: 10.5px; cursor: pointer; }
  .bom-add-btn:hover { border-color: var(--accent2); }
  .bom-qty { font-size: 9.5px; color: var(--muted); margin-left: 4px; }

  /* DASHBOARD */
  .dash-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
  .dash-col { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 10px; min-height: 120px; }
  .dash-col-head { font-size: 12px; font-weight: 700; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid var(--border); }
  .dash-col-head.tz { color: var(--tz-c); }
  .dash-col-head.fr { color: var(--fr-c); }
  .dash-col-head.mo { color: var(--mo-c); }
  .dash-col-head.li { color: var(--li-c); }
  .dash-item { background: var(--bg); border: 1px solid var(--border); border-radius: 6px; padding: 6px 8px; margin-bottom: 6px; font-size: 11.5px; }
  .dash-item.done { opacity: .5; }
  .dash-item .di-art { font-family: Calibri, 'Segoe UI', Arial, sans-serif; font-weight: 600; display:block; }
  .di-stageart { font-family: Calibri, 'Segoe UI', Arial, sans-serif; font-weight: 700; font-size: 12px; color: var(--accent); display: block; }
  .dash-item .di-meta { color: var(--muted); font-size: 10.5px; display:flex; justify-content:space-between; align-items:center; margin-top:3px; }
  .dash-item .di-check { cursor: pointer; display:flex; align-items:center; gap:4px; }
  .dash-item .di-check input { cursor: pointer; }
  .dash-empty { color: var(--muted); font-size: 11px; text-align: center; padding: 14px 0; }
  .late-row td { color: var(--danger); }
  .late-badge { background: rgba(239,68,68,.15); color: var(--danger); border: 1px solid rgba(239,68,68,.4); border-radius: 4px; padding: 2px 7px; font-size: 10px; font-weight: 700; }
  .done-badge { background: rgba(34,197,94,.15); color: var(--fest); border: 1px solid rgba(34,197,94,.4); border-radius: 4px; padding: 2px 7px; font-size: 10px; font-weight: 700; }

  /* BOM MASTER TABLE */
  .bom-master-row { display:flex; align-items:center; gap:5px; background: var(--bg); border:1px solid var(--border); border-radius:4px; padding:5px 7px; margin-bottom:4px; flex-wrap:wrap; }
  .bom-master-row .bmf { display:flex; flex-direction:column; gap:1px; }
  .bom-master-row .bmf label { font-size:8.5px; color:var(--muted); text-transform:uppercase; letter-spacing:.3px; }
  .bom-master-row input { background: var(--card); border:1px solid var(--border); border-radius:3px; color:var(--text); padding:3px 5px; font-size:11px; font-family:Calibri,'Segoe UI',Arial,sans-serif; }
  .bom-master-row input.w-art { width: 92px; }
  .bom-master-row input.w-masch { width: 88px; }
  .bom-master-row input.w-time { width: 48px; }
  .bom-master-row .x-btn { margin-left:auto; align-self:center; }
  .mo-master-box { display:flex; flex-direction:column; gap:8px; padding: 6px 8px; }
  .mo-field { display:flex; flex-direction:column; gap:3px; }
  .mo-field label { font-size:10px; color:var(--muted); text-transform:uppercase; letter-spacing:.3px; }
  .mo-field input { background: var(--bg); border:1.5px solid var(--border); border-radius:5px; color:var(--text); padding:7px 9px; font-size:13px; font-family:Calibri,'Segoe UI',Arial,sans-serif; width: 100%; }
  .mo-field input:focus { border-color: var(--accent); outline: none; }

  .offset-row { display:flex; align-items:center; gap:5px; margin-bottom:5px; }
  .offset-row label { font-size:9.5px; color:var(--muted); white-space:nowrap; }
  .offset-in { width:38px !important; }

  .lief-week-block { background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 8px 10px; margin-bottom: 8px; }
  .lief-week-head { margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px dashed var(--border); }
  .lief-week-stages { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .lws-col { display: flex; flex-direction: column; gap: 4px; }
  .lws-col .derived-chip { display: block; }

  /* KW OVERVIEW TABLE (Geplant vs Erledigt) */
  table.kwov-table { width:100%; border-collapse:collapse; }
  .kwov-table th { background: var(--surface); border:1px solid var(--border); padding:8px 10px; font-size:11px; color:var(--accent); font-weight:700; text-align:center; }
  .kwov-table th.kwov-kw-col { text-align:left; width:90px; }
  .kwov-table td { border:1px solid var(--border); padding:6px 8px; text-align:center; font-size:11.5px; vertical-align:middle; }
  .kwov-table td.kwov-kw { font-weight:700; text-align:left; font-family:Calibri,'Segoe UI',Arial,sans-serif; }
  .kwov-table tr.kwov-current td.kwov-kw { color: var(--accent); }
  .kwov-cell-empty { color: var(--muted); }
  .kwov-cell-done { background: rgba(34,197,94,.08); color: var(--fest); font-weight:600; }
  .kwov-cell-partial { background: rgba(217,119,6,.08); color: var(--warn); font-weight:600; }
  .kwov-cell-late { background: rgba(220,38,38,.10); color: var(--danger); font-weight:700; }
  .kwov-cell-pending { background: rgba(29,78,216,.06); color: var(--text); }
  .kwov-ge { font-size:10px; display:block; }
  .kwov-clickable { cursor: pointer; border-radius: 5px; padding: 4px 6px; transition: opacity .15s; }
  .kwov-clickable:hover { opacity: .75; outline: 1px solid var(--accent); }

  .kwov-detail-panel { margin-top: 16px; background: var(--card); border: 1.5px solid var(--accent); border-radius: 10px; overflow: hidden; }
  .kwov-detail-header { background: var(--surface); padding: 10px 14px; font-size: 13px; font-weight: 700; color: var(--accent); display: flex; justify-content: space-between; align-items: center; }
  .kwov-detail-close { cursor: pointer; font-size: 18px; color: var(--muted); line-height: 1; padding: 0 4px; }
  .kwov-detail-close:hover { color: var(--danger); }
  .kwov-detail-body { padding: 10px 14px; max-height: 320px; overflow-y: auto; }
  .kwov-detail-item { background: var(--bg); border: 1px solid var(--border); border-radius: 6px; padding: 7px 10px; margin-bottom: 6px; font-size: 12px; }
  .kwov-detail-item.done { opacity: .55; }
  .kwov-detail-art { font-family: Calibri, 'Segoe UI', Arial, sans-serif; font-weight: 600; display: block; }
  .kwov-detail-meta { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 11px; color: var(--muted); }

  .toggle-group { display: inline-flex; background: var(--card); border: 1px solid var(--border); border-radius: 6px; overflow: hidden; }
  .toggle-btn { background: transparent; border: none; color: var(--muted); padding: 6px 14px; font-size: 11.5px; cursor: pointer; transition: all .15s; }
  .toggle-btn.active { background: var(--accent); color: #fff; }
  .tzfr-status-ontime { color: var(--fest); font-weight: 700; font-size: 11px; }
  .tzfr-status-late { color: var(--danger); font-weight: 700; font-size: 11px; }
  .tzfr-status-pending { color: var(--muted); font-size: 11px; }
  .tzfr-kw-chip { display:inline-block; background: var(--bg); border:1px solid var(--border); border-radius:3px; padding:1px 6px; margin:1px; font-size:10.5px; font-family:Calibri,'Segoe UI',Arial,sans-serif; }
  .tzfr-kw-chip.done { border-color: var(--fest); color: var(--fest); }
  .tzfr-kw-chip.late { border-color: var(--danger); color: var(--danger); }

  .overload-table thead th { color: var(--danger); }
  .overload-table tbody tr:hover td { background: rgba(220,38,38,.05); }
  .ov-shift-btn { background: var(--accent); color: #fff; border: none; border-radius: 5px; padding: 5px 10px; font-size: 10.5px; cursor: pointer; white-space: nowrap; }
  .ov-shift-btn:hover { opacity: .85; }
  .ov-shift-btn:disabled { background: var(--border); color: var(--muted); cursor: not-allowed; }

  .import-status { border-radius: 8px; padding: 10px 14px; font-size: 12px; }
  .import-status.success { background: rgba(34,197,94,.08); border: 1px solid var(--fest); color: var(--fest); }
  .import-status.error { background: rgba(220,38,38,.08); border: 1px solid var(--danger); color: var(--danger); }

  /* LOGIN SCREEN */
  #loginScreen { position: fixed; inset: 0; background: var(--surface); display: flex; align-items: center; justify-content: center; z-index: 1000; }
  .login-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow-md); padding: 36px 40px; width: 100%; max-width: 360px; }
  .login-logo { display: flex; align-items: center; margin-bottom: 14px; }
  .login-logo-img { height: 38px; width: auto; }
  .login-title { font-family: var(--font-head); font-size: 17px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
  .login-sub { font-size: 12px; color: var(--muted); margin: 4px 0 24px; }
  .login-field { margin-bottom: 14px; }
  .login-field label { display: block; font-size: 11px; font-weight: 600; color: var(--muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: .4px; }
  .login-field input { width: 100%; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 10px 12px; font-size: 13px; color: var(--text); }
  .login-field input:focus { border-color: var(--accent); outline: none; box-shadow: 0 0 0 3px rgba(29,78,216,.08); }
  .login-btn { width: 100%; background: var(--accent); border: 1px solid var(--accent); color: #fff; font-weight: 600; font-size: 13px; padding: 11px; border-radius: var(--radius-sm); cursor: pointer; margin-top: 6px; transition: all .12s; }
  .login-btn:hover { background: var(--accent-dark); }
  .login-error { color: var(--danger); font-size: 12px; margin-top: 12px; display: none; }
  .login-error.show { display: block; }
  .role-badge { font-size: 10.5px; font-weight: 700; padding: 3px 9px; border-radius: 5px; text-transform: uppercase; letter-spacing: .3px; }
  .role-badge.planer { background: rgba(29,78,216,.1); color: var(--accent); }
  .role-badge.mitarbeiter { background: rgba(107,115,128,.12); color: var(--muted); }
  .user-menu { display: flex; align-items: center; gap: 10px; margin-left: 14px; padding-left: 14px; border-left: 1px solid var(--border); }
  .user-menu .user-name { font-size: 12.5px; font-weight: 600; color: var(--text); }
  .logout-btn { background: transparent; border: 1px solid var(--border); color: var(--muted); border-radius: var(--radius-sm); padding: 5px 11px; font-size: 11.5px; cursor: pointer; }
  .logout-btn:hover { border-color: var(--danger); color: var(--danger); }
  .readonly-note { background: rgba(217,119,6,.07); border: 1px solid var(--warn); color: #92400e; border-radius: var(--radius-sm); padding: 9px 13px; font-size: 12px; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
  .readonly-locked { opacity: .6; pointer-events: none; user-select: none; filter: grayscale(.15); }

  .save-bar { display: flex; align-items: center; justify-content: space-between; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 9px 14px; margin-bottom: 14px; transition: all .15s; }
  .save-bar.dirty { background: rgba(217,119,6,.07); border-color: var(--warn); }
  .save-status { font-size: 12px; color: var(--muted); font-weight: 500; }
  .save-bar.dirty .save-status { color: #92400e; font-weight: 600; }
  .save-bar-actions { display: flex; gap: 8px; }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
</head>
<body>

<div id="loginScreen">
  <div class="login-card">
    <div class="login-logo"><img class="login-logo-img" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzODkuNzYgODkuMjkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM4OS43NiA4OS4yOTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMwMDZFQjc7fQoJLnN0MXtmaWxsOiM2NzZDNkU7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMDcuMTgsNTguNDJjLTAuNjMsMC0wLjg4LTAuMjUtMC44OC0wLjg4VjM0LjYxYzAtMC42LDAuMjUtMC44NCwwLjg4LTAuODRIMTE2YzYuMzcsMCw5LjM1LDEuOTMsOS4zNSw2LjQ0CgkJYzAsMy4wNS0xLjYxLDQuNjItMy4zNiw1LjE1YzIuMjQsMC42LDQuMTMsMi4yOCw0LjEzLDUuOTJjMCw1LjExLTMuNDMsNy4xNC05Ljg4LDcuMTRIMTA3LjE4eiBNMTE1Ljk3LDQzLjkyCgkJYzMuNCwwLDQuNjItMC45NSw0LjYyLTMuMjJjMC0yLjE3LTEuMjMtMy4wNS00LjY5LTMuMDVoLTQuNzZ2Ni4yN0gxMTUuOTd6IE0xMTYsNTQuNWMzLjkyLDAsNS4yOS0wLjkxLDUuMjktMy41CgkJYzAtMi40Mi0xLjI2LTMuNC01LjE1LTMuNGgtNS4wMXY2LjlIMTE2eiIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEzOS41NywzMy43N2M2Ljc5LDAsMTAuMjMsMi40MiwxMC4yMyw4LjNjMCw0LjI3LTIuMzEsNi42NS02LjAyLDcuNDZsNS45NSw3LjgxCgkJYzAuMzgsMC40OSwwLjE3LDEuMDktMC41MiwxLjA5aC0zLjMzYy0wLjYzLDAtMC45MS0wLjI4LTEuMjMtMC43bC01LjY3LTcuNTNoLTMuMjZ2Ny4zNWMwLDAuNjMtMC4yOCwwLjg4LTAuODgsMC44OGgtMy4xMgoJCWMtMC42MywwLTAuODgtMC4yNS0wLjg4LTAuODhWMzQuNjFjMC0wLjYsMC4yNS0wLjg0LDAuODgtMC44NEgxMzkuNTd6IE0xMzkuNDYsNDYuMTNjMy45OSwwLDUuNDMtMS4zLDUuNDMtNC4wNgoJCWMwLTIuOTgtMS41NC00LjEtNS4zOS00LjFoLTMuNzh2OC4xNkgxMzkuNDZ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTU0LjM1LDQ5LjQ5VjM0LjYxYzAtMC42LDAuMjgtMC44NCwwLjg4LTAuODRoMy4xNWMwLjYzLDAsMC44OCwwLjI1LDAuODgsMC44NHYxNC40NgoJCWMwLDMuNDMsMS4zNyw1LjM2LDQuODMsNS4zNmMzLjQzLDAsNC44My0xLjkzLDQuODMtNS4zNlYzNC42MWMwLTAuNiwwLjI1LTAuODQsMC44NC0wLjg0aDMuMTljMC41NiwwLDAuODQsMC4yNSwwLjg0LDAuODR2MTQuODgKCQljMCw2LjA2LTMuMjIsOS4zNS05LjcsOS4zNUMxNTcuNTcsNTguODQsMTU0LjM1LDU1LjU1LDE1NC4zNSw0OS40OXoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOTguOTMsNTcuNTVjMCwwLjYzLTAuMjgsMC44OC0wLjg0LDAuODhoLTMuMTVjLTAuNiwwLTAuODQtMC4xNy0xLjA5LTAuNmwtOS44NC0xNS44N3YxNS41OQoJCWMwLDAuNjMtMC4yNSwwLjg4LTAuODQsMC44OGgtMy4wMWMtMC42MywwLTAuODgtMC4yNS0wLjg4LTAuODhWMzQuNjFjMC0wLjYsMC4yNS0wLjg0LDAuODgtMC44NGgzLjA4YzAuNjMsMCwwLjg4LDAuMTQsMS4xMiwwLjU2CgkJbDkuODQsMTUuOVYzNC42MWMwLTAuNiwwLjI1LTAuODQsMC44NC0wLjg0aDMuMDVjMC41NiwwLDAuODQsMC4yNSwwLjg0LDAuODFWNTcuNTV6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjI1LjQ3LDQ2LjFjMCw4LjUxLTQuMDYsMTIuNzEtMTAuOTYsMTIuNzFjLTYuODMsMC0xMC44OS00LjItMTAuODktMTIuNzFjMC04LjUxLDQuMDYtMTIuNzUsMTAuOTMtMTIuNzUKCQlTMjI1LjQ3LDM3LjU5LDIyNS40Nyw0Ni4xeiBNMjIwLjQ2LDQ2LjFjMC01LjY0LTEuOTYtOC40OC01LjkyLTguNDhjLTMuOTksMC01Ljk1LDIuODQtNS45NSw4LjQ4YzAsNS42NCwxLjk2LDguNDQsNS45NSw4LjQ0CgkJQzIxOC41LDU0LjU0LDIyMC40Niw1MS43MywyMjAuNDYsNDYuMXoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNTcuOTcsMzMuNzdjMC42NywwLDAuOTUsMC4yNSwxLjA5LDAuNzdsMy4xOSwxMS44bDEuNTgsNi4zN2gwLjFsMS40Ny02LjNsMy4xMi0xMS44NwoJCWMwLjE0LTAuNTMsMC40Ni0wLjc3LDEuMDItMC43N2gzLjMzYzAuNTYsMCwwLjgxLDAuMzUsMC42MywwLjk4bC02LjQxLDIyLjgzYy0wLjE3LDAuNi0wLjQ2LDAuODQtMS4xMiwwLjg0aC0zLjY4CgkJYy0wLjYsMC0wLjkxLTAuMjUtMS4wOS0wLjg0bC0zLjI5LTExLjI0bC0xLjM3LTUuNDZoLTAuMWwtMS40LDUuNDZsLTMuMjYsMTEuMjRjLTAuMTQsMC41Ni0wLjQ5LDAuODQtMS4wOSwwLjg0aC0zLjY4CgkJYy0wLjY3LDAtMC45NS0wLjI4LTEuMTItMC44NGwtNi40NC0yMi44M2MtMC4xOC0wLjYzLDAuMS0wLjk4LDAuNjctMC45OGgzLjMzYzAuNTYsMCwwLjg4LDAuMjUsMS4wMiwwLjc3bDMuMTIsMTEuODdsMS40Nyw2LjI3CgkJaDAuMDdsMS41OC02LjM0bDMuMjItMTEuOGMwLjE0LTAuNTMsMC40Mi0wLjc3LDEuMDktMC43N0gyNTcuOTd6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjgyLjU5LDQ3Ljg4djYuMzRoOS45NWMwLjYsMCwwLjg4LDAuMjUsMC44OCwwLjg0djIuNDljMCwwLjYzLTAuMjgsMC44OC0wLjg4LDAuODhoLTEzLjkKCQljLTAuNjMsMC0wLjg4LTAuMjUtMC44OC0wLjg4VjM0LjYxYzAtMC42LDAuMjUtMC44NCwwLjg0LTAuODRoMTMuOGMwLjYsMCwwLjg4LDAuMjUsMC44OCwwLjg0djIuNDljMCwwLjYtMC4yOCwwLjg4LTAuODgsMC44OAoJCWgtOS44MXY1Ljg1aDkuMzVjMC41NiwwLDAuODQsMC4zMiwwLjg0LDAuODh2Mi4zMWMwLDAuNTYtMC4yOCwwLjg4LTAuODQsMC44OEgyODIuNTl6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjk4LjIxLDM0LjYxYzAtMC42LDAuMjQtMC44NCwwLjg0LTAuODRoMy4xOWMwLjU2LDAsMC44OCwwLjI1LDAuODgsMC44NHYyMi45NGMwLDAuNjMtMC4zMiwwLjg4LTAuODgsMC44OAoJCWgtMy4xOWMtMC42LDAtMC44NC0wLjI1LTAuODQtMC44OFYzNC42MXoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zMTUuOTMsNTguNzRjLTMuMjIsMC02LjA2LTAuNi03LjYtMS4zN2MtMC40OS0wLjI1LTAuNzQtMC40OS0wLjUzLTEuMDVsMC44NC0yLjI0CgkJYzAuMTctMC41MiwwLjQ2LTAuNzcsMS4wNS0wLjUyYzEuMjYsMC41MiwzLjIyLDEuMDUsNS41NywxLjA1YzMuMDUsMCw1LjE1LTAuOTEsNS4xNS0yLjk0YzAtMi4wMy0yLjIxLTIuODQtNC45NC0zLjg5CgkJYy0zLjc1LTEuNC03LjI4LTIuODQtNy4yOC03LjY3YzAtNC40NSwzLjA1LTYuNzIsOC45LTYuNzJjMy4wMSwwLDUuMzIsMC42LDYuNjksMS4yM2MwLjQ5LDAuMjUsMC43NCwwLjQ5LDAuNTMsMS4wNWwtMC44MSwyLjE3CgkJYy0wLjIxLDAuNTMtMC40OSwwLjctMS4xMiwwLjQ5Yy0xLjI2LTAuNDktMi45MS0wLjc3LTQuODMtMC43N2MtMi45OCwwLTQuNDUsMC44MS00LjQ1LDIuNjZjMCwyLDIsMi42Niw0LjY5LDMuNzUKCQljMy44OSwxLjU4LDcuNTMsMi45MSw3LjUzLDcuNzdTMzIxLjMyLDU4Ljc0LDMxNS45Myw1OC43NHoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zMzYuNjksNTguNzRjLTMuMjIsMC02LjA2LTAuNi03LjYtMS4zN2MtMC40OS0wLjI1LTAuNzQtMC40OS0wLjUzLTEuMDVsMC44NC0yLjI0CgkJYzAuMTctMC41MiwwLjQ2LTAuNzcsMS4wNS0wLjUyYzEuMjYsMC41MiwzLjIyLDEuMDUsNS41NywxLjA1YzMuMDUsMCw1LjE1LTAuOTEsNS4xNS0yLjk0YzAtMi4wMy0yLjIxLTIuODQtNC45NC0zLjg5CgkJYy0zLjc1LTEuNC03LjI4LTIuODQtNy4yOC03LjY3YzAtNC40NSwzLjA1LTYuNzIsOC45LTYuNzJjMy4wMSwwLDUuMzIsMC42LDYuNjksMS4yM2MwLjQ5LDAuMjUsMC43NCwwLjQ5LDAuNTMsMS4wNWwtMC44MSwyLjE3CgkJYy0wLjIxLDAuNTMtMC40OSwwLjctMS4xMiwwLjQ5Yy0xLjI2LTAuNDktMi45MS0wLjc3LTQuODMtMC43N2MtMi45OCwwLTQuNDUsMC44MS00LjQ1LDIuNjZjMCwyLDIsMi42Niw0LjY5LDMuNzUKCQljMy44OSwxLjU4LDcuNTMsMi45MSw3LjUzLDcuNzdTMzQyLjA5LDU4Ljc0LDMzNi42OSw1OC43NHoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNTUuMjksNDcuODh2Ni4zNGg5Ljk1YzAuNiwwLDAuODgsMC4yNSwwLjg4LDAuODR2Mi40OWMwLDAuNjMtMC4yOCwwLjg4LTAuODgsMC44OGgtMTMuOQoJCWMtMC42MywwLTAuODgtMC4yNS0wLjg4LTAuODhWMzQuNjFjMC0wLjYsMC4yNS0wLjg0LDAuODQtMC44NGgxMy44YzAuNiwwLDAuODgsMC4yNSwwLjg4LDAuODR2Mi40OWMwLDAuNi0wLjI4LDAuODgtMC44OCwwLjg4CgkJaC05LjgxdjUuODVoOS4zNWMwLjU2LDAsMC44NCwwLjMyLDAuODQsMC44OHYyLjMxYzAsMC41Ni0wLjI4LDAuODgtMC44NCwwLjg4SDM1NS4yOXoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNzkuNDIsMzMuNzdjNi43OSwwLDEwLjIzLDIuNDIsMTAuMjMsOC4zYzAsNC4yNy0yLjMxLDYuNjUtNi4wMiw3LjQ2bDUuOTUsNy44MQoJCWMwLjM5LDAuNDksMC4xNywxLjA5LTAuNTIsMS4wOWgtMy4zM2MtMC42MywwLTAuOTEtMC4yOC0xLjIzLTAuN2wtNS42Ny03LjUzaC0zLjI2djcuMzVjMCwwLjYzLTAuMjgsMC44OC0wLjg4LDAuODhoLTMuMTIKCQljLTAuNjMsMC0wLjg4LTAuMjUtMC44OC0wLjg4VjM0LjYxYzAtMC42LDAuMjUtMC44NCwwLjg4LTAuODRIMzc5LjQyeiBNMzc5LjMxLDQ2LjEzYzMuOTksMCw1LjQzLTEuMyw1LjQzLTQuMDYKCQljMC0yLjk4LTEuNTQtNC4xLTUuMzktNC4xaC0zLjc4djguMTZIMzc5LjMxeiIvPgo8L2c+CjxnPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTExNy4xNCw2Ni4zMmMwLjE0LTAuMTQsMC4yMi0wLjIsMC40NS0wLjJoMC44MWMwLjI1LDAsMC4yOCwwLjIyLDAuMTQsMC4zNmwtMTAuMiw4Ljg2bDEwLjQ4LDEwLjA2CgkJYzAuMTQsMC4xNCwwLjE0LDAuMzYtMC4wOSwwLjM2aC0wLjg3Yy0wLjIsMC0wLjMxLTAuMDgtMC40NS0wLjIybC05Ljk4LTkuNXY5LjQ3YzAsMC4xNy0wLjA4LDAuMjUtMC4yNSwwLjI1aC0wLjY1CgkJYy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNVY2Ni4zN2MwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgwLjY1YzAuMTcsMCwwLjI1LDAuMDgsMC4yNSwwLjI1djguMzVMMTE3LjE0LDY2LjMyeiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEyMi4xNiw3MS43OGMwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgwLjYyYzAuMTcsMCwwLjIyLDAuMDgsMC4yMiwwLjI1djguOTdjMCwyLjYxLDEuMTUsNC4yNiw0LjEyLDQuMjYKCQljMi44NiwwLDQuOTMtMS45MSw0LjkzLTQuNjV2LTguNTdjMC0wLjE3LDAuMDgtMC4yNSwwLjI1LTAuMjVoMC42MmMwLjE3LDAsMC4yMiwwLjA4LDAuMjIsMC4yNXYxMy43M2MwLDAuMTctMC4wNiwwLjI1LTAuMjIsMC4yNQoJCWgtMC42MmMtMC4xNywwLTAuMjUtMC4wOC0wLjI1LTAuMjV2LTIuNTVjLTAuNSwxLjMyLTEuOTMsMy4wOC01LjEsMy4wOGMtMy40NywwLTUuMDQtMS45OS01LjA0LTUuMTZWNzEuNzh6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTQ5Ljc5LDg1LjUxYzAsMC4xNy0wLjA4LDAuMjUtMC4yNSwwLjI1aC0wLjU5Yy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNXYtOS4yMgoJCWMwLTIuNDktMS4xOC00LjA2LTQuMDktNC4wNmMtMywwLTUuMTMsMS45Ni01LjEzLDQuNjh2OC42YzAsMC4xNy0wLjA4LDAuMjUtMC4yNSwwLjI1aC0wLjU5Yy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNVY3MS43OAoJCWMwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgwLjU5YzAuMTcsMCwwLjI1LDAuMDgsMC4yNSwwLjI1djIuNDljMC41OS0xLjMyLDIuMDUtMy4wOCw1LjMtMy4wOGMzLjQyLDAsNS4wMiwxLjk2LDUuMDIsNS4wMlY4NS41MQoJCXoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNTguMzEsODYuMDVjLTEuNzQsMC0zLjQyLTAuMzQtNC42LTAuODFjLTAuMTQtMC4wOC0wLjIyLTAuMTQtMC4xNy0wLjI4bDAuMi0wLjUxCgkJYzAuMDYtMC4xNCwwLjExLTAuMjIsMC4zMS0wLjE0YzEuMTUsMC40NSwyLjY5LDAuNzYsNC4yLDAuNzZjMi43NSwwLDQuMDYtMC45Miw0LjA2LTIuOGMwLTIuMDUtMS44NS0yLjYxLTQuMjMtMy41CgkJYy0yLjIxLTAuODQtNC40Ni0xLjQzLTQuNDYtNC4xOGMwLTIuMTMsMS40My0zLjM5LDQuNjUtMy4zOWMxLjc5LDAsMy4yMiwwLjM0LDQuMiwwLjc4YzAuMTcsMC4wNiwwLjIyLDAuMTQsMC4xNywwLjI4bC0wLjIsMC41CgkJYy0wLjAzLDAuMTEtMC4wOCwwLjItMC4yOCwwLjExYy0xLjAxLTAuMzktMi4zLTAuNy0zLjgxLTAuN2MtMi41MiwwLTMuNjQsMC44MS0zLjY0LDIuNDFjMCwxLjk5LDEuNjUsMi40NywzLjkyLDMuMzEKCQljMi40NywwLjkyLDQuNzQsMS43OSw0Ljc0LDQuMzdDMTYzLjM4LDg0LjczLDE2MS42NSw4Ni4wNSwxNTguMzEsODYuMDV6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTY5LjEsNzIuNTR2OS4xNmMwLDIuNDksMC42MiwzLjIyLDIuNjQsMy4yMmMwLjY0LDAsMS4wOS0wLjExLDEuNTEtMC4yYzAuMi0wLjAzLDAuMjUsMC4wNiwwLjI4LDAuMgoJCWwwLjE0LDAuNDhjMC4wNiwwLjE0LTAuMDMsMC4yMi0wLjE3LDAuMjVjLTAuMzksMC4xNC0xLjE1LDAuMjgtMS44OCwwLjI4Yy0yLjYxLDAtMy42Mi0xLjA5LTMuNjItNC4xNXYtOS4yNWgtMi4zMwoJCWMtMC4xNywwLTAuMjUtMC4wOC0wLjI1LTAuMjV2LTAuNWMwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgyLjM1di0zLjkyYzAtMC4xNywwLjA2LTAuMjUsMC4yMi0wLjI1aDAuNTkKCQljMC4xNywwLDAuMjUsMC4wOCwwLjI1LDAuMjV2My45Mmg0LjE1YzAuMTcsMCwwLjI1LDAuMDgsMC4yNSwwLjI1djAuNWMwLDAuMTctMC4wOCwwLjI1LTAuMjUsMC4yNUgxNjkuMXoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xODAuNyw4Ni4wNWMtMS43NCwwLTMuNDItMC4zNC00LjYtMC44MWMtMC4xNC0wLjA4LTAuMjItMC4xNC0wLjE3LTAuMjhsMC4yLTAuNTEKCQljMC4wNi0wLjE0LDAuMTEtMC4yMiwwLjMxLTAuMTRjMS4xNSwwLjQ1LDIuNjksMC43Niw0LjIsMC43NmMyLjc1LDAsNC4wNi0wLjkyLDQuMDYtMi44YzAtMi4wNS0xLjg1LTIuNjEtNC4yMy0zLjUKCQljLTIuMjEtMC44NC00LjQ2LTEuNDMtNC40Ni00LjE4YzAtMi4xMywxLjQzLTMuMzksNC42NS0zLjM5YzEuNzksMCwzLjIyLDAuMzQsNC4yLDAuNzhjMC4xNywwLjA2LDAuMjIsMC4xNCwwLjE3LDAuMjhsLTAuMiwwLjUKCQljLTAuMDMsMC4xMS0wLjA4LDAuMi0wLjI4LDAuMTFjLTEuMDEtMC4zOS0yLjMtMC43LTMuODEtMC43Yy0yLjUyLDAtMy42NCwwLjgxLTMuNjQsMi40MWMwLDEuOTksMS42NSwyLjQ3LDMuOTIsMy4zMQoJCWMyLjQ3LDAuOTIsNC43NCwxLjc5LDQuNzQsNC4zN0MxODUuNzgsODQuNzMsMTg0LjA0LDg2LjA1LDE4MC43LDg2LjA1eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE5MS40OSw3Mi41NHY5LjE2YzAsMi40OSwwLjYyLDMuMjIsMi42NCwzLjIyYzAuNjQsMCwxLjA5LTAuMTEsMS41MS0wLjJjMC4yLTAuMDMsMC4yNSwwLjA2LDAuMjgsMC4yCgkJbDAuMTQsMC40OGMwLjA2LDAuMTQtMC4wMywwLjIyLTAuMTcsMC4yNWMtMC4zOSwwLjE0LTEuMTUsMC4yOC0xLjg4LDAuMjhjLTIuNjEsMC0zLjYyLTEuMDktMy42Mi00LjE1di05LjI1aC0yLjMzCgkJYy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNXYtMC41YzAtMC4xNywwLjA4LTAuMjUsMC4yNS0wLjI1aDIuMzV2LTMuOTJjMC0wLjE3LDAuMDYtMC4yNSwwLjIyLTAuMjVoMC41OQoJCWMwLjE3LDAsMC4yNSwwLjA4LDAuMjUsMC4yNXYzLjkyaDQuMTVjMC4xNywwLDAuMjUsMC4wOCwwLjI1LDAuMjV2MC41YzAsMC4xNy0wLjA4LDAuMjUtMC4yNSwwLjI1SDE5MS40OXoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xOTguNTgsNzguNjJjMC00Ljc0LDIuMzgtNy40Myw2LjQ1LTcuNDNjNC4wNiwwLDYuNDUsMi42OSw2LjQ1LDcuNDNjMCw0Ljc0LTIuMzgsNy40My02LjQ1LDcuNDMKCQlDMjAwLjk2LDg2LjA1LDE5OC41OCw4My4zNSwxOTguNTgsNzguNjJ6IE0yMTAuMzIsNzguNjJjMC00LjE4LTEuODUtNi40Mi01LjMtNi40MmMtMy40NywwLTUuMzIsMi4yNC01LjMyLDYuNDIKCQljMCw0LjE4LDEuODUsNi40Miw1LjMyLDYuNDJDMjA4LjQ4LDg1LjA0LDIxMC4zMiw4Mi43OSwyMTAuMzIsNzguNjJ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjIxLjM0LDcxLjUzYzAuMTcsMCwwLjI1LDAuMDgsMC4yNSwwLjI1djAuNWMwLDAuMTctMC4wOCwwLjI1LTAuMjUsMC4yNWgtMy43NnYxMi45OAoJCWMwLDAuMTctMC4wOCwwLjI1LTAuMjUsMC4yNWgtMC41OWMtMC4xNywwLTAuMjUtMC4wOC0wLjI1LTAuMjVWNzIuNTRoLTIuMzNjLTAuMTcsMC0wLjIyLTAuMDgtMC4yMi0wLjI1di0wLjUKCQljMC0wLjE3LDAuMDYtMC4yNSwwLjIyLTAuMjVoMi4zM3YtMS42YzAtMi41OCwxLjE1LTMuOTgsMy40Mi0zLjk4YzAuNzYsMCwxLjM0LDAuMTEsMS43NywwLjI4YzAuMTEsMC4wMywwLjIsMC4wOCwwLjE3LDAuMjUKCQlsLTAuMDYsMC40OGMtMC4wMywwLjE0LTAuMDgsMC4yNS0wLjI4LDAuMmMtMC40NS0wLjE3LTAuODctMC4yMi0xLjUxLTAuMjJjLTEuNjgsMC0yLjQxLDEuMDQtMi40MSwzLjA4djEuNTFIMjIxLjM0eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIzMC43LDcxLjUzYzAuMTcsMCwwLjI1LDAuMDgsMC4yNSwwLjI1djAuNWMwLDAuMTctMC4wOCwwLjI1LTAuMjUsMC4yNWgtMy43NnYxMi45OAoJCWMwLDAuMTctMC4wOCwwLjI1LTAuMjUsMC4yNWgtMC41OWMtMC4xNywwLTAuMjUtMC4wOC0wLjI1LTAuMjVWNzIuNTRoLTIuMzNjLTAuMTcsMC0wLjIyLTAuMDgtMC4yMi0wLjI1di0wLjUKCQljMC0wLjE3LDAuMDYtMC4yNSwwLjIyLTAuMjVoMi4zM3YtMS42YzAtMi41OCwxLjE1LTMuOTgsMy40Mi0zLjk4YzAuNzYsMCwxLjM0LDAuMTEsMS43NywwLjI4YzAuMTEsMC4wMywwLjIsMC4wOCwwLjE3LDAuMjUKCQlsLTAuMDYsMC40OGMtMC4wMywwLjE0LTAuMDgsMC4yNS0wLjI4LDAuMmMtMC40NS0wLjE3LTAuODctMC4yMi0xLjUxLTAuMjJjLTEuNjgsMC0yLjQxLDEuMDQtMi40MSwzLjA4djEuNTFIMjMwLjd6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjM4LjE4LDg1Ljc3Yy0wLjE0LDAtMC4yMi0wLjA4LTAuMjgtMC4yMmwtNS4wNy0xMy43M2MtMC4wNi0wLjE3LDAtMC4yOCwwLjItMC4yOGgwLjY1CgkJYzAuMTQsMCwwLjIyLDAuMDgsMC4yOCwwLjIybDIuOTQsNy45M2wxLjY1LDQuODJoMC4wNmwxLjY1LTQuODJsMi45NC03LjkzYzAuMDYtMC4xNCwwLjExLTAuMjIsMC4yOC0wLjIyaDAuNjcKCQljMC4yLDAsMC4yMiwwLjExLDAuMTcsMC4yOGwtNS4xLDEzLjczYy0wLjA2LDAuMTQtMC4xMSwwLjIyLTAuMjgsMC4yMkgyMzguMTh6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjU3Ljc0LDg0LjE3YzAuMTctMC4xMSwwLjI4LDAsMC4zNCwwLjE0bDAuMiwwLjQ4YzAuMDYsMC4xNC0wLjAzLDAuMi0wLjE3LDAuMjgKCQljLTEuMDksMC41OS0yLjYzLDEuMDQtNC40LDEuMDRjLTQuMzcsMC02Ljc4LTIuOC02Ljc4LTcuNDVjMC00LjcxLDIuMjQtNy40NSw2LjI1LTcuNDVjMy45NSwwLDUuOTQsMi44Niw1Ljk0LDYuNzh2MC45MgoJCWMwLDAuMi0wLjA4LDAuMjUtMC4yNSwwLjI1aC0xMC44MmMwLjExLDMuNjcsMi4wMiw1Ljk3LDUuNjksNS45N0MyNTUuNDQsODUuMTIsMjU2LjY1LDg0Ljc2LDI1Ny43NCw4NC4xN3ogTTI0OC4wNSw3OC4yaDkuOTgKCQl2LTAuMjVjMC0zLjM5LTEuNDktNS43Ny00Ljg1LTUuNzdDMjQ5Ljg3LDcyLjE3LDI0OC4xMyw3NC4zLDI0OC4wNSw3OC4yeiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTI2NC4wNSw3MS41M2MwLjE3LDAsMC4yNSwwLjA4LDAuMjUsMC4yNXYzLjM2YzAuNDUtMS40MywyLjEzLTMuNzMsNC45OS0zLjczYzAuMTQsMCwwLjIyLDAuMDYsMC4yMiwwLjIyCgkJdjAuNzNjMCwwLjE3LTAuMDgsMC4yMi0wLjIyLDAuMjJjLTAuMTEsMC0wLjI1LTAuMDMtMC40Mi0wLjAzYy0yLjQxLDAtNC41NywyLjc3LTQuNTcsNS41MnY3LjQzYzAsMC4xNy0wLjA4LDAuMjUtMC4yNSwwLjI1aC0wLjYyCgkJYy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNVY3MS43OGMwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNUgyNjQuMDV6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjgzLjM2LDg1LjUxYzAsMC4xNy0wLjA4LDAuMjUtMC4yNSwwLjI1aC0wLjU2Yy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNXYtMi42MQoJCWMtMC40OCwxLjEyLTEuODIsMy4wOC01LjYzLDMuMDhjLTMuMTQsMC00Ljc2LTEuNjMtNC43Ni0zLjk4YzAtNC4wMSw0LjM3LTQuNCwxMC40LTQuNTR2LTEuMzRjMC0yLjY5LTEuMTItMy45Mi00LjE1LTMuOTIKCQljLTEuNzQsMC0zLjM2LDAuMzktNC42OCwwLjk4Yy0wLjE3LDAuMDYtMC4yNS0wLjAzLTAuMzEtMC4xNGwtMC4xNy0wLjUzYy0wLjA2LTAuMTQsMC0wLjIyLDAuMTQtMC4yOAoJCWMxLjM0LTAuNTksMy4yMi0xLjA0LDUuMDctMS4wNGMzLjY0LDAsNS4xNiwxLjY1LDUuMTYsNC44OFY4NS41MXogTTI4Mi4yOSw3OC4zN2MtNS4xMywwLjItOS4zMywwLjMxLTkuMzMsMy42MQoJCWMwLDEuNzQsMS4yMywzLjA2LDMuODEsMy4wNmMzLjY0LDAsNS41Mi0yLjEzLDUuNTItNC43MVY3OC4zN3oiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yODkuMDUsNzEuNTNjMC4xNywwLDAuMjUsMC4wOCwwLjI1LDAuMjV2My4zNmMwLjQ1LTEuNDMsMi4xMy0zLjczLDQuOTktMy43M2MwLjE0LDAsMC4yMiwwLjA2LDAuMjIsMC4yMgoJCXYwLjczYzAsMC4xNy0wLjA4LDAuMjItMC4yMiwwLjIyYy0wLjExLDAtMC4yNS0wLjAzLTAuNDItMC4wM2MtMi40MSwwLTQuNTcsMi43Ny00LjU3LDUuNTJ2Ny40M2MwLDAuMTctMC4wOCwwLjI1LTAuMjUsMC4yNWgtMC42MgoJCWMtMC4xNywwLTAuMjUtMC4wOC0wLjI1LTAuMjVWNzEuNzhjMC0wLjE3LDAuMDgtMC4yNSwwLjI1LTAuMjVIMjg5LjA1eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTI5OS4yMiw4NS41MWMwLDAuMTctMC4wNiwwLjI1LTAuMjIsMC4yNWgtMC42MmMtMC4xNywwLTAuMjUtMC4wOC0wLjI1LTAuMjVWNjYuMzcKCQljMC0wLjE3LDAuMDgtMC4yNSwwLjI1LTAuMjVoMC42MmMwLjE3LDAsMC4yNSwwLjA4LDAuMjUsMC4yNXY4LjNjMC44NC0yLjI0LDIuOC0zLjQ3LDUuNDQtMy40N2MzLjkyLDAsNi4xOSwyLjY2LDYuMTksNy40MwoJCWMwLDQuNzktMi4yNyw3LjQzLTYuMTksNy40M2MtMi42MywwLTQuNi0xLjE1LTUuNDYtMy40MlY4NS41MXogTTMwNC41Nyw4NS4wNGMzLjM5LDAsNS4xOS0yLjE5LDUuMTktNi40MgoJCWMwLTQuMjMtMS43OS02LjQyLTUuMTktNi40MmMtMy40MiwwLTUuMzIsMi4yNy01LjMyLDYuNDJDMjk5LjI1LDgyLjc3LDMwMS4xNSw4NS4wNCwzMDQuNTcsODUuMDR6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzI0Ljk3LDg0LjE3YzAuMTctMC4xMSwwLjI4LDAsMC4zNCwwLjE0bDAuMiwwLjQ4YzAuMDYsMC4xNC0wLjAzLDAuMi0wLjE3LDAuMjgKCQljLTEuMDksMC41OS0yLjYzLDEuMDQtNC40LDEuMDRjLTQuMzcsMC02Ljc4LTIuOC02Ljc4LTcuNDVjMC00LjcxLDIuMjQtNy40NSw2LjI1LTcuNDVjMy45NSwwLDUuOTQsMi44Niw1Ljk0LDYuNzh2MC45MgoJCWMwLDAuMi0wLjA4LDAuMjUtMC4yNSwwLjI1aC0xMC44MmMwLjExLDMuNjcsMi4wMiw1Ljk3LDUuNjksNS45N0MzMjIuNjcsODUuMTIsMzIzLjg4LDg0Ljc2LDMyNC45Nyw4NC4xN3ogTTMxNS4yOCw3OC4yaDkuOTgKCQl2LTAuMjVjMC0zLjM5LTEuNDktNS43Ny00Ljg1LTUuNzdDMzE3LjEsNzIuMTcsMzE1LjM2LDc0LjMsMzE1LjI4LDc4LjJ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzMxLjU5LDY5LjA2YzAsMC4xNy0wLjA2LDAuMjUtMC4yMiwwLjI1aC0wLjYyYy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNXYtMi4zOAoJCWMwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgwLjYyYzAuMTcsMCwwLjIyLDAuMDgsMC4yMiwwLjI1VjY5LjA2eiBNMzMxLjU5LDg1LjUxYzAsMC4xNy0wLjA2LDAuMjUtMC4yMiwwLjI1aC0wLjYyCgkJYy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNVY3MS43OGMwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgwLjYyYzAuMTcsMCwwLjIyLDAuMDgsMC4yMiwwLjI1Vjg1LjUxeiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMzOC40Miw3Mi41NHY5LjE2YzAsMi40OSwwLjYyLDMuMjIsMi42NCwzLjIyYzAuNjQsMCwxLjA5LTAuMTEsMS41MS0wLjJjMC4yLTAuMDMsMC4yNSwwLjA2LDAuMjgsMC4yCgkJbDAuMTQsMC40OGMwLjA2LDAuMTQtMC4wMywwLjIyLTAuMTcsMC4yNWMtMC4zOSwwLjE0LTEuMTUsMC4yOC0xLjg4LDAuMjhjLTIuNjEsMC0zLjYyLTEuMDktMy42Mi00LjE1di05LjI1SDMzNQoJCWMtMC4xNywwLTAuMjUtMC4wOC0wLjI1LTAuMjV2LTAuNWMwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgyLjM1di0zLjkyYzAtMC4xNywwLjA2LTAuMjUsMC4yMi0wLjI1aDAuNTkKCQljMC4xNywwLDAuMjUsMC4wOCwwLjI1LDAuMjV2My45Mmg0LjE1YzAuMTcsMCwwLjI1LDAuMDgsMC4yNSwwLjI1djAuNWMwLDAuMTctMC4wOCwwLjI1LTAuMjUsMC4yNUgzMzguNDJ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzQ2LjE2LDcxLjc4YzAtMC4xNywwLjA4LTAuMjUsMC4yNS0wLjI1aDAuNjJjMC4xNywwLDAuMjIsMC4wOCwwLjIyLDAuMjV2OC45N2MwLDIuNjEsMS4xNSw0LjI2LDQuMTIsNC4yNgoJCWMyLjg2LDAsNC45My0xLjkxLDQuOTMtNC42NXYtOC41N2MwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgwLjYyYzAuMTcsMCwwLjIyLDAuMDgsMC4yMiwwLjI1djEzLjczYzAsMC4xNy0wLjA2LDAuMjUtMC4yMiwwLjI1CgkJaC0wLjYyYy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNXYtMi41NWMtMC41LDEuMzItMS45MywzLjA4LTUuMSwzLjA4Yy0zLjQ3LDAtNS4wNC0xLjk5LTUuMDQtNS4xNlY3MS43OHoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zNzMuNzksODUuNTFjMCwwLjE3LTAuMDgsMC4yNS0wLjI1LDAuMjVoLTAuNTljLTAuMTcsMC0wLjI1LTAuMDgtMC4yNS0wLjI1di05LjIyCgkJYzAtMi40OS0xLjE4LTQuMDYtNC4wOS00LjA2Yy0zLDAtNS4xMywxLjk2LTUuMTMsNC42OHY4LjZjMCwwLjE3LTAuMDgsMC4yNS0wLjI1LDAuMjVoLTAuNTljLTAuMTcsMC0wLjI1LTAuMDgtMC4yNS0wLjI1VjcxLjc4CgkJYzAtMC4xNywwLjA4LTAuMjUsMC4yNS0wLjI1aDAuNTljMC4xNywwLDAuMjUsMC4wOCwwLjI1LDAuMjV2Mi40OWMwLjU5LTEuMzIsMi4wNS0zLjA4LDUuMy0zLjA4YzMuNDIsMCw1LjAyLDEuOTYsNS4wMiw1LjAyVjg1LjUxCgkJeiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTM4OS43Niw4My43OGMwLDMuNjQtMi4yNyw1LjQxLTUuODYsNS40MWMtMS42MywwLTMuMzktMC4zMS00LjY4LTAuOTVjLTAuMTQtMC4wNi0wLjItMC4xNC0wLjE3LTAuMjUKCQlsMC4yMi0wLjUzYzAuMDMtMC4xMSwwLjExLTAuMjIsMC4zMS0wLjE0YzEuMzQsMC41OSwyLjg2LDAuODcsNC4zMiwwLjg3YzIuOTcsMCw0Ljc2LTEuMzcsNC43Ni00LjQ4di0yLjMzCgkJYy0wLjc2LDIuMDUtMi42NiwzLjI1LTUuMDQsMy4yNWMtMy41LDAtNS44My0yLjM1LTUuODMtNi43YzAtNC4zNywyLjI3LTYuNzMsNS44LTYuNzNjMi4zOCwwLDQuMzIsMS4xOCw1LjA3LDMuMTF2LTIuNTIKCQljMC0wLjE3LDAuMDgtMC4yNSwwLjI1LTAuMjVoMC41OWMwLjE3LDAsMC4yNSwwLjA4LDAuMjUsMC4yNVY4My43OHogTTM4My43NCw3Mi4xN2MtMy4wNSwwLTQuODIsMS45My00LjgyLDUuNzUKCQljMCwzLjc4LDEuNzcsNS43Miw0LjgyLDUuNzJjMy4xMSwwLDQuOTMtMi4yMSw0LjkzLTUuOTFDMzg4LjY3LDc0LjA1LDM4Ni44NSw3Mi4xNywzODMuNzQsNzIuMTd6Ii8+CjwvZz4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjEuMDEsMzYuMjFWNS42OWMwLTAuMTQsMC4xMS0wLjI1LDAuMjUtMC4yNWg1Mi44YzEuNi0wLjY3LDMuMTUtMS4zLDQuNjUtMS44OUgyMC4xNQoJCWMtMC41NiwwLTEuMDEsMC40NS0xLjAxLDEuMDF2MzMuMDhDMTkuNzYsMzcuMTUsMjAuMzksMzYuNjgsMjEuMDEsMzYuMjF6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODUuMjksMzQuNDlWODMuNmMwLDAuMTQtMC4xMSwwLjI1LTAuMjUsMC4yNUgyMS4yNmMtMC4xNCwwLTAuMjUtMC4xMS0wLjI1LTAuMjV2LTYuOTcKCQljLTAuNjQsMC41Ny0xLjI3LDEuMTMtMS44OCwxLjY4djYuNDJjMCwwLjU2LDAuNDUsMS4wMSwxLjAxLDEuMDFoNjYuMDFjMC41NiwwLDEuMDEtMC40NSwxLjAxLTEuMDFWMzMuNwoJCUM4Ni41NCwzMy45Niw4NS45MSwzNC4yMiw4NS4yOSwzNC40OXoiLz4KPC9nPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTA1Ljk0LDAuMjRjLTAuMjMtMC4xOS0wLjUzLTAuMjctMC44My0wLjIyYy0wLjEzLDAuMDItMTMuMTUsMi40My0zMi40OCwxMC45NAoJYy0xNy44MSw3Ljg0LTQ0LjgxLDIyLjYzLTcyLjMsNDguNTZDMC4xMiw1OS43LDAsNTkuOTcsMCw2MC4yNXYyOC4wMmMwLDAuNDIsMC4yNiwwLjgsMC42NSwwLjk1YzAuMTIsMC4wNSwwLjI0LDAuMDcsMC4zNywwLjA3CgljMC4yOCwwLDAuNTYtMC4xMiwwLjc1LTAuMzNjMC40Ni0wLjUxLDQ2LjY0LTUxLjE3LDEwMy43OC02Ni4yOGMwLjQ1LTAuMTIsMC43Ni0wLjUyLDAuNzYtMC45OVYxLjAyCglDMTA2LjMsMC43MiwxMDYuMTcsMC40MywxMDUuOTQsMC4yNHoiLz4KPC9zdmc+Cg==" alt="Bruno Weisser Logo"></div><div class="login-title">Produktionsplanung</div>
    <div class="login-sub">Bitte melden Sie sich an, um fortzufahren.</div>
    <div class="login-field">
      <label>Benutzername</label>
      <input type="text" id="loginUser" placeholder="z.B. Modu" onkeydown="if(event.key==='Enter')document.getElementById('loginPass').focus()">
    </div>
    <div class="login-field">
      <label>Passwort</label>
      <input type="password" id="loginPass" placeholder="••••••••" onkeydown="if(event.key==='Enter')attemptLogin()">
    </div>
    <button class="login-btn" onclick="attemptLogin()">Anmelden</button>
    <div class="login-error" id="loginError">Benutzername oder Passwort ist falsch.</div>
  </div>
</div>

<div id="appRoot" class="hidden">
<header>
  <div class="logo">
    <img class="logo-mark-img" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzODkuNzYgODkuMjkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM4OS43NiA4OS4yOTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMwMDZFQjc7fQoJLnN0MXtmaWxsOiM2NzZDNkU7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMDcuMTgsNTguNDJjLTAuNjMsMC0wLjg4LTAuMjUtMC44OC0wLjg4VjM0LjYxYzAtMC42LDAuMjUtMC44NCwwLjg4LTAuODRIMTE2YzYuMzcsMCw5LjM1LDEuOTMsOS4zNSw2LjQ0CgkJYzAsMy4wNS0xLjYxLDQuNjItMy4zNiw1LjE1YzIuMjQsMC42LDQuMTMsMi4yOCw0LjEzLDUuOTJjMCw1LjExLTMuNDMsNy4xNC05Ljg4LDcuMTRIMTA3LjE4eiBNMTE1Ljk3LDQzLjkyCgkJYzMuNCwwLDQuNjItMC45NSw0LjYyLTMuMjJjMC0yLjE3LTEuMjMtMy4wNS00LjY5LTMuMDVoLTQuNzZ2Ni4yN0gxMTUuOTd6IE0xMTYsNTQuNWMzLjkyLDAsNS4yOS0wLjkxLDUuMjktMy41CgkJYzAtMi40Mi0xLjI2LTMuNC01LjE1LTMuNGgtNS4wMXY2LjlIMTE2eiIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEzOS41NywzMy43N2M2Ljc5LDAsMTAuMjMsMi40MiwxMC4yMyw4LjNjMCw0LjI3LTIuMzEsNi42NS02LjAyLDcuNDZsNS45NSw3LjgxCgkJYzAuMzgsMC40OSwwLjE3LDEuMDktMC41MiwxLjA5aC0zLjMzYy0wLjYzLDAtMC45MS0wLjI4LTEuMjMtMC43bC01LjY3LTcuNTNoLTMuMjZ2Ny4zNWMwLDAuNjMtMC4yOCwwLjg4LTAuODgsMC44OGgtMy4xMgoJCWMtMC42MywwLTAuODgtMC4yNS0wLjg4LTAuODhWMzQuNjFjMC0wLjYsMC4yNS0wLjg0LDAuODgtMC44NEgxMzkuNTd6IE0xMzkuNDYsNDYuMTNjMy45OSwwLDUuNDMtMS4zLDUuNDMtNC4wNgoJCWMwLTIuOTgtMS41NC00LjEtNS4zOS00LjFoLTMuNzh2OC4xNkgxMzkuNDZ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTU0LjM1LDQ5LjQ5VjM0LjYxYzAtMC42LDAuMjgtMC44NCwwLjg4LTAuODRoMy4xNWMwLjYzLDAsMC44OCwwLjI1LDAuODgsMC44NHYxNC40NgoJCWMwLDMuNDMsMS4zNyw1LjM2LDQuODMsNS4zNmMzLjQzLDAsNC44My0xLjkzLDQuODMtNS4zNlYzNC42MWMwLTAuNiwwLjI1LTAuODQsMC44NC0wLjg0aDMuMTljMC41NiwwLDAuODQsMC4yNSwwLjg0LDAuODR2MTQuODgKCQljMCw2LjA2LTMuMjIsOS4zNS05LjcsOS4zNUMxNTcuNTcsNTguODQsMTU0LjM1LDU1LjU1LDE1NC4zNSw0OS40OXoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOTguOTMsNTcuNTVjMCwwLjYzLTAuMjgsMC44OC0wLjg0LDAuODhoLTMuMTVjLTAuNiwwLTAuODQtMC4xNy0xLjA5LTAuNmwtOS44NC0xNS44N3YxNS41OQoJCWMwLDAuNjMtMC4yNSwwLjg4LTAuODQsMC44OGgtMy4wMWMtMC42MywwLTAuODgtMC4yNS0wLjg4LTAuODhWMzQuNjFjMC0wLjYsMC4yNS0wLjg0LDAuODgtMC44NGgzLjA4YzAuNjMsMCwwLjg4LDAuMTQsMS4xMiwwLjU2CgkJbDkuODQsMTUuOVYzNC42MWMwLTAuNiwwLjI1LTAuODQsMC44NC0wLjg0aDMuMDVjMC41NiwwLDAuODQsMC4yNSwwLjg0LDAuODFWNTcuNTV6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjI1LjQ3LDQ2LjFjMCw4LjUxLTQuMDYsMTIuNzEtMTAuOTYsMTIuNzFjLTYuODMsMC0xMC44OS00LjItMTAuODktMTIuNzFjMC04LjUxLDQuMDYtMTIuNzUsMTAuOTMtMTIuNzUKCQlTMjI1LjQ3LDM3LjU5LDIyNS40Nyw0Ni4xeiBNMjIwLjQ2LDQ2LjFjMC01LjY0LTEuOTYtOC40OC01LjkyLTguNDhjLTMuOTksMC01Ljk1LDIuODQtNS45NSw4LjQ4YzAsNS42NCwxLjk2LDguNDQsNS45NSw4LjQ0CgkJQzIxOC41LDU0LjU0LDIyMC40Niw1MS43MywyMjAuNDYsNDYuMXoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNTcuOTcsMzMuNzdjMC42NywwLDAuOTUsMC4yNSwxLjA5LDAuNzdsMy4xOSwxMS44bDEuNTgsNi4zN2gwLjFsMS40Ny02LjNsMy4xMi0xMS44NwoJCWMwLjE0LTAuNTMsMC40Ni0wLjc3LDEuMDItMC43N2gzLjMzYzAuNTYsMCwwLjgxLDAuMzUsMC42MywwLjk4bC02LjQxLDIyLjgzYy0wLjE3LDAuNi0wLjQ2LDAuODQtMS4xMiwwLjg0aC0zLjY4CgkJYy0wLjYsMC0wLjkxLTAuMjUtMS4wOS0wLjg0bC0zLjI5LTExLjI0bC0xLjM3LTUuNDZoLTAuMWwtMS40LDUuNDZsLTMuMjYsMTEuMjRjLTAuMTQsMC41Ni0wLjQ5LDAuODQtMS4wOSwwLjg0aC0zLjY4CgkJYy0wLjY3LDAtMC45NS0wLjI4LTEuMTItMC44NGwtNi40NC0yMi44M2MtMC4xOC0wLjYzLDAuMS0wLjk4LDAuNjctMC45OGgzLjMzYzAuNTYsMCwwLjg4LDAuMjUsMS4wMiwwLjc3bDMuMTIsMTEuODdsMS40Nyw2LjI3CgkJaDAuMDdsMS41OC02LjM0bDMuMjItMTEuOGMwLjE0LTAuNTMsMC40Mi0wLjc3LDEuMDktMC43N0gyNTcuOTd6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjgyLjU5LDQ3Ljg4djYuMzRoOS45NWMwLjYsMCwwLjg4LDAuMjUsMC44OCwwLjg0djIuNDljMCwwLjYzLTAuMjgsMC44OC0wLjg4LDAuODhoLTEzLjkKCQljLTAuNjMsMC0wLjg4LTAuMjUtMC44OC0wLjg4VjM0LjYxYzAtMC42LDAuMjUtMC44NCwwLjg0LTAuODRoMTMuOGMwLjYsMCwwLjg4LDAuMjUsMC44OCwwLjg0djIuNDljMCwwLjYtMC4yOCwwLjg4LTAuODgsMC44OAoJCWgtOS44MXY1Ljg1aDkuMzVjMC41NiwwLDAuODQsMC4zMiwwLjg0LDAuODh2Mi4zMWMwLDAuNTYtMC4yOCwwLjg4LTAuODQsMC44OEgyODIuNTl6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjk4LjIxLDM0LjYxYzAtMC42LDAuMjQtMC44NCwwLjg0LTAuODRoMy4xOWMwLjU2LDAsMC44OCwwLjI1LDAuODgsMC44NHYyMi45NGMwLDAuNjMtMC4zMiwwLjg4LTAuODgsMC44OAoJCWgtMy4xOWMtMC42LDAtMC44NC0wLjI1LTAuODQtMC44OFYzNC42MXoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zMTUuOTMsNTguNzRjLTMuMjIsMC02LjA2LTAuNi03LjYtMS4zN2MtMC40OS0wLjI1LTAuNzQtMC40OS0wLjUzLTEuMDVsMC44NC0yLjI0CgkJYzAuMTctMC41MiwwLjQ2LTAuNzcsMS4wNS0wLjUyYzEuMjYsMC41MiwzLjIyLDEuMDUsNS41NywxLjA1YzMuMDUsMCw1LjE1LTAuOTEsNS4xNS0yLjk0YzAtMi4wMy0yLjIxLTIuODQtNC45NC0zLjg5CgkJYy0zLjc1LTEuNC03LjI4LTIuODQtNy4yOC03LjY3YzAtNC40NSwzLjA1LTYuNzIsOC45LTYuNzJjMy4wMSwwLDUuMzIsMC42LDYuNjksMS4yM2MwLjQ5LDAuMjUsMC43NCwwLjQ5LDAuNTMsMS4wNWwtMC44MSwyLjE3CgkJYy0wLjIxLDAuNTMtMC40OSwwLjctMS4xMiwwLjQ5Yy0xLjI2LTAuNDktMi45MS0wLjc3LTQuODMtMC43N2MtMi45OCwwLTQuNDUsMC44MS00LjQ1LDIuNjZjMCwyLDIsMi42Niw0LjY5LDMuNzUKCQljMy44OSwxLjU4LDcuNTMsMi45MSw3LjUzLDcuNzdTMzIxLjMyLDU4Ljc0LDMxNS45Myw1OC43NHoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zMzYuNjksNTguNzRjLTMuMjIsMC02LjA2LTAuNi03LjYtMS4zN2MtMC40OS0wLjI1LTAuNzQtMC40OS0wLjUzLTEuMDVsMC44NC0yLjI0CgkJYzAuMTctMC41MiwwLjQ2LTAuNzcsMS4wNS0wLjUyYzEuMjYsMC41MiwzLjIyLDEuMDUsNS41NywxLjA1YzMuMDUsMCw1LjE1LTAuOTEsNS4xNS0yLjk0YzAtMi4wMy0yLjIxLTIuODQtNC45NC0zLjg5CgkJYy0zLjc1LTEuNC03LjI4LTIuODQtNy4yOC03LjY3YzAtNC40NSwzLjA1LTYuNzIsOC45LTYuNzJjMy4wMSwwLDUuMzIsMC42LDYuNjksMS4yM2MwLjQ5LDAuMjUsMC43NCwwLjQ5LDAuNTMsMS4wNWwtMC44MSwyLjE3CgkJYy0wLjIxLDAuNTMtMC40OSwwLjctMS4xMiwwLjQ5Yy0xLjI2LTAuNDktMi45MS0wLjc3LTQuODMtMC43N2MtMi45OCwwLTQuNDUsMC44MS00LjQ1LDIuNjZjMCwyLDIsMi42Niw0LjY5LDMuNzUKCQljMy44OSwxLjU4LDcuNTMsMi45MSw3LjUzLDcuNzdTMzQyLjA5LDU4Ljc0LDMzNi42OSw1OC43NHoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNTUuMjksNDcuODh2Ni4zNGg5Ljk1YzAuNiwwLDAuODgsMC4yNSwwLjg4LDAuODR2Mi40OWMwLDAuNjMtMC4yOCwwLjg4LTAuODgsMC44OGgtMTMuOQoJCWMtMC42MywwLTAuODgtMC4yNS0wLjg4LTAuODhWMzQuNjFjMC0wLjYsMC4yNS0wLjg0LDAuODQtMC44NGgxMy44YzAuNiwwLDAuODgsMC4yNSwwLjg4LDAuODR2Mi40OWMwLDAuNi0wLjI4LDAuODgtMC44OCwwLjg4CgkJaC05LjgxdjUuODVoOS4zNWMwLjU2LDAsMC44NCwwLjMyLDAuODQsMC44OHYyLjMxYzAsMC41Ni0wLjI4LDAuODgtMC44NCwwLjg4SDM1NS4yOXoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNzkuNDIsMzMuNzdjNi43OSwwLDEwLjIzLDIuNDIsMTAuMjMsOC4zYzAsNC4yNy0yLjMxLDYuNjUtNi4wMiw3LjQ2bDUuOTUsNy44MQoJCWMwLjM5LDAuNDksMC4xNywxLjA5LTAuNTIsMS4wOWgtMy4zM2MtMC42MywwLTAuOTEtMC4yOC0xLjIzLTAuN2wtNS42Ny03LjUzaC0zLjI2djcuMzVjMCwwLjYzLTAuMjgsMC44OC0wLjg4LDAuODhoLTMuMTIKCQljLTAuNjMsMC0wLjg4LTAuMjUtMC44OC0wLjg4VjM0LjYxYzAtMC42LDAuMjUtMC44NCwwLjg4LTAuODRIMzc5LjQyeiBNMzc5LjMxLDQ2LjEzYzMuOTksMCw1LjQzLTEuMyw1LjQzLTQuMDYKCQljMC0yLjk4LTEuNTQtNC4xLTUuMzktNC4xaC0zLjc4djguMTZIMzc5LjMxeiIvPgo8L2c+CjxnPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTExNy4xNCw2Ni4zMmMwLjE0LTAuMTQsMC4yMi0wLjIsMC40NS0wLjJoMC44MWMwLjI1LDAsMC4yOCwwLjIyLDAuMTQsMC4zNmwtMTAuMiw4Ljg2bDEwLjQ4LDEwLjA2CgkJYzAuMTQsMC4xNCwwLjE0LDAuMzYtMC4wOSwwLjM2aC0wLjg3Yy0wLjIsMC0wLjMxLTAuMDgtMC40NS0wLjIybC05Ljk4LTkuNXY5LjQ3YzAsMC4xNy0wLjA4LDAuMjUtMC4yNSwwLjI1aC0wLjY1CgkJYy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNVY2Ni4zN2MwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgwLjY1YzAuMTcsMCwwLjI1LDAuMDgsMC4yNSwwLjI1djguMzVMMTE3LjE0LDY2LjMyeiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEyMi4xNiw3MS43OGMwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgwLjYyYzAuMTcsMCwwLjIyLDAuMDgsMC4yMiwwLjI1djguOTdjMCwyLjYxLDEuMTUsNC4yNiw0LjEyLDQuMjYKCQljMi44NiwwLDQuOTMtMS45MSw0LjkzLTQuNjV2LTguNTdjMC0wLjE3LDAuMDgtMC4yNSwwLjI1LTAuMjVoMC42MmMwLjE3LDAsMC4yMiwwLjA4LDAuMjIsMC4yNXYxMy43M2MwLDAuMTctMC4wNiwwLjI1LTAuMjIsMC4yNQoJCWgtMC42MmMtMC4xNywwLTAuMjUtMC4wOC0wLjI1LTAuMjV2LTIuNTVjLTAuNSwxLjMyLTEuOTMsMy4wOC01LjEsMy4wOGMtMy40NywwLTUuMDQtMS45OS01LjA0LTUuMTZWNzEuNzh6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTQ5Ljc5LDg1LjUxYzAsMC4xNy0wLjA4LDAuMjUtMC4yNSwwLjI1aC0wLjU5Yy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNXYtOS4yMgoJCWMwLTIuNDktMS4xOC00LjA2LTQuMDktNC4wNmMtMywwLTUuMTMsMS45Ni01LjEzLDQuNjh2OC42YzAsMC4xNy0wLjA4LDAuMjUtMC4yNSwwLjI1aC0wLjU5Yy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNVY3MS43OAoJCWMwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgwLjU5YzAuMTcsMCwwLjI1LDAuMDgsMC4yNSwwLjI1djIuNDljMC41OS0xLjMyLDIuMDUtMy4wOCw1LjMtMy4wOGMzLjQyLDAsNS4wMiwxLjk2LDUuMDIsNS4wMlY4NS41MQoJCXoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNTguMzEsODYuMDVjLTEuNzQsMC0zLjQyLTAuMzQtNC42LTAuODFjLTAuMTQtMC4wOC0wLjIyLTAuMTQtMC4xNy0wLjI4bDAuMi0wLjUxCgkJYzAuMDYtMC4xNCwwLjExLTAuMjIsMC4zMS0wLjE0YzEuMTUsMC40NSwyLjY5LDAuNzYsNC4yLDAuNzZjMi43NSwwLDQuMDYtMC45Miw0LjA2LTIuOGMwLTIuMDUtMS44NS0yLjYxLTQuMjMtMy41CgkJYy0yLjIxLTAuODQtNC40Ni0xLjQzLTQuNDYtNC4xOGMwLTIuMTMsMS40My0zLjM5LDQuNjUtMy4zOWMxLjc5LDAsMy4yMiwwLjM0LDQuMiwwLjc4YzAuMTcsMC4wNiwwLjIyLDAuMTQsMC4xNywwLjI4bC0wLjIsMC41CgkJYy0wLjAzLDAuMTEtMC4wOCwwLjItMC4yOCwwLjExYy0xLjAxLTAuMzktMi4zLTAuNy0zLjgxLTAuN2MtMi41MiwwLTMuNjQsMC44MS0zLjY0LDIuNDFjMCwxLjk5LDEuNjUsMi40NywzLjkyLDMuMzEKCQljMi40NywwLjkyLDQuNzQsMS43OSw0Ljc0LDQuMzdDMTYzLjM4LDg0LjczLDE2MS42NSw4Ni4wNSwxNTguMzEsODYuMDV6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTY5LjEsNzIuNTR2OS4xNmMwLDIuNDksMC42MiwzLjIyLDIuNjQsMy4yMmMwLjY0LDAsMS4wOS0wLjExLDEuNTEtMC4yYzAuMi0wLjAzLDAuMjUsMC4wNiwwLjI4LDAuMgoJCWwwLjE0LDAuNDhjMC4wNiwwLjE0LTAuMDMsMC4yMi0wLjE3LDAuMjVjLTAuMzksMC4xNC0xLjE1LDAuMjgtMS44OCwwLjI4Yy0yLjYxLDAtMy42Mi0xLjA5LTMuNjItNC4xNXYtOS4yNWgtMi4zMwoJCWMtMC4xNywwLTAuMjUtMC4wOC0wLjI1LTAuMjV2LTAuNWMwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgyLjM1di0zLjkyYzAtMC4xNywwLjA2LTAuMjUsMC4yMi0wLjI1aDAuNTkKCQljMC4xNywwLDAuMjUsMC4wOCwwLjI1LDAuMjV2My45Mmg0LjE1YzAuMTcsMCwwLjI1LDAuMDgsMC4yNSwwLjI1djAuNWMwLDAuMTctMC4wOCwwLjI1LTAuMjUsMC4yNUgxNjkuMXoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xODAuNyw4Ni4wNWMtMS43NCwwLTMuNDItMC4zNC00LjYtMC44MWMtMC4xNC0wLjA4LTAuMjItMC4xNC0wLjE3LTAuMjhsMC4yLTAuNTEKCQljMC4wNi0wLjE0LDAuMTEtMC4yMiwwLjMxLTAuMTRjMS4xNSwwLjQ1LDIuNjksMC43Niw0LjIsMC43NmMyLjc1LDAsNC4wNi0wLjkyLDQuMDYtMi44YzAtMi4wNS0xLjg1LTIuNjEtNC4yMy0zLjUKCQljLTIuMjEtMC44NC00LjQ2LTEuNDMtNC40Ni00LjE4YzAtMi4xMywxLjQzLTMuMzksNC42NS0zLjM5YzEuNzksMCwzLjIyLDAuMzQsNC4yLDAuNzhjMC4xNywwLjA2LDAuMjIsMC4xNCwwLjE3LDAuMjhsLTAuMiwwLjUKCQljLTAuMDMsMC4xMS0wLjA4LDAuMi0wLjI4LDAuMTFjLTEuMDEtMC4zOS0yLjMtMC43LTMuODEtMC43Yy0yLjUyLDAtMy42NCwwLjgxLTMuNjQsMi40MWMwLDEuOTksMS42NSwyLjQ3LDMuOTIsMy4zMQoJCWMyLjQ3LDAuOTIsNC43NCwxLjc5LDQuNzQsNC4zN0MxODUuNzgsODQuNzMsMTg0LjA0LDg2LjA1LDE4MC43LDg2LjA1eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE5MS40OSw3Mi41NHY5LjE2YzAsMi40OSwwLjYyLDMuMjIsMi42NCwzLjIyYzAuNjQsMCwxLjA5LTAuMTEsMS41MS0wLjJjMC4yLTAuMDMsMC4yNSwwLjA2LDAuMjgsMC4yCgkJbDAuMTQsMC40OGMwLjA2LDAuMTQtMC4wMywwLjIyLTAuMTcsMC4yNWMtMC4zOSwwLjE0LTEuMTUsMC4yOC0xLjg4LDAuMjhjLTIuNjEsMC0zLjYyLTEuMDktMy42Mi00LjE1di05LjI1aC0yLjMzCgkJYy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNXYtMC41YzAtMC4xNywwLjA4LTAuMjUsMC4yNS0wLjI1aDIuMzV2LTMuOTJjMC0wLjE3LDAuMDYtMC4yNSwwLjIyLTAuMjVoMC41OQoJCWMwLjE3LDAsMC4yNSwwLjA4LDAuMjUsMC4yNXYzLjkyaDQuMTVjMC4xNywwLDAuMjUsMC4wOCwwLjI1LDAuMjV2MC41YzAsMC4xNy0wLjA4LDAuMjUtMC4yNSwwLjI1SDE5MS40OXoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xOTguNTgsNzguNjJjMC00Ljc0LDIuMzgtNy40Myw2LjQ1LTcuNDNjNC4wNiwwLDYuNDUsMi42OSw2LjQ1LDcuNDNjMCw0Ljc0LTIuMzgsNy40My02LjQ1LDcuNDMKCQlDMjAwLjk2LDg2LjA1LDE5OC41OCw4My4zNSwxOTguNTgsNzguNjJ6IE0yMTAuMzIsNzguNjJjMC00LjE4LTEuODUtNi40Mi01LjMtNi40MmMtMy40NywwLTUuMzIsMi4yNC01LjMyLDYuNDIKCQljMCw0LjE4LDEuODUsNi40Miw1LjMyLDYuNDJDMjA4LjQ4LDg1LjA0LDIxMC4zMiw4Mi43OSwyMTAuMzIsNzguNjJ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjIxLjM0LDcxLjUzYzAuMTcsMCwwLjI1LDAuMDgsMC4yNSwwLjI1djAuNWMwLDAuMTctMC4wOCwwLjI1LTAuMjUsMC4yNWgtMy43NnYxMi45OAoJCWMwLDAuMTctMC4wOCwwLjI1LTAuMjUsMC4yNWgtMC41OWMtMC4xNywwLTAuMjUtMC4wOC0wLjI1LTAuMjVWNzIuNTRoLTIuMzNjLTAuMTcsMC0wLjIyLTAuMDgtMC4yMi0wLjI1di0wLjUKCQljMC0wLjE3LDAuMDYtMC4yNSwwLjIyLTAuMjVoMi4zM3YtMS42YzAtMi41OCwxLjE1LTMuOTgsMy40Mi0zLjk4YzAuNzYsMCwxLjM0LDAuMTEsMS43NywwLjI4YzAuMTEsMC4wMywwLjIsMC4wOCwwLjE3LDAuMjUKCQlsLTAuMDYsMC40OGMtMC4wMywwLjE0LTAuMDgsMC4yNS0wLjI4LDAuMmMtMC40NS0wLjE3LTAuODctMC4yMi0xLjUxLTAuMjJjLTEuNjgsMC0yLjQxLDEuMDQtMi40MSwzLjA4djEuNTFIMjIxLjM0eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIzMC43LDcxLjUzYzAuMTcsMCwwLjI1LDAuMDgsMC4yNSwwLjI1djAuNWMwLDAuMTctMC4wOCwwLjI1LTAuMjUsMC4yNWgtMy43NnYxMi45OAoJCWMwLDAuMTctMC4wOCwwLjI1LTAuMjUsMC4yNWgtMC41OWMtMC4xNywwLTAuMjUtMC4wOC0wLjI1LTAuMjVWNzIuNTRoLTIuMzNjLTAuMTcsMC0wLjIyLTAuMDgtMC4yMi0wLjI1di0wLjUKCQljMC0wLjE3LDAuMDYtMC4yNSwwLjIyLTAuMjVoMi4zM3YtMS42YzAtMi41OCwxLjE1LTMuOTgsMy40Mi0zLjk4YzAuNzYsMCwxLjM0LDAuMTEsMS43NywwLjI4YzAuMTEsMC4wMywwLjIsMC4wOCwwLjE3LDAuMjUKCQlsLTAuMDYsMC40OGMtMC4wMywwLjE0LTAuMDgsMC4yNS0wLjI4LDAuMmMtMC40NS0wLjE3LTAuODctMC4yMi0xLjUxLTAuMjJjLTEuNjgsMC0yLjQxLDEuMDQtMi40MSwzLjA4djEuNTFIMjMwLjd6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjM4LjE4LDg1Ljc3Yy0wLjE0LDAtMC4yMi0wLjA4LTAuMjgtMC4yMmwtNS4wNy0xMy43M2MtMC4wNi0wLjE3LDAtMC4yOCwwLjItMC4yOGgwLjY1CgkJYzAuMTQsMCwwLjIyLDAuMDgsMC4yOCwwLjIybDIuOTQsNy45M2wxLjY1LDQuODJoMC4wNmwxLjY1LTQuODJsMi45NC03LjkzYzAuMDYtMC4xNCwwLjExLTAuMjIsMC4yOC0wLjIyaDAuNjcKCQljMC4yLDAsMC4yMiwwLjExLDAuMTcsMC4yOGwtNS4xLDEzLjczYy0wLjA2LDAuMTQtMC4xMSwwLjIyLTAuMjgsMC4yMkgyMzguMTh6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjU3Ljc0LDg0LjE3YzAuMTctMC4xMSwwLjI4LDAsMC4zNCwwLjE0bDAuMiwwLjQ4YzAuMDYsMC4xNC0wLjAzLDAuMi0wLjE3LDAuMjgKCQljLTEuMDksMC41OS0yLjYzLDEuMDQtNC40LDEuMDRjLTQuMzcsMC02Ljc4LTIuOC02Ljc4LTcuNDVjMC00LjcxLDIuMjQtNy40NSw2LjI1LTcuNDVjMy45NSwwLDUuOTQsMi44Niw1Ljk0LDYuNzh2MC45MgoJCWMwLDAuMi0wLjA4LDAuMjUtMC4yNSwwLjI1aC0xMC44MmMwLjExLDMuNjcsMi4wMiw1Ljk3LDUuNjksNS45N0MyNTUuNDQsODUuMTIsMjU2LjY1LDg0Ljc2LDI1Ny43NCw4NC4xN3ogTTI0OC4wNSw3OC4yaDkuOTgKCQl2LTAuMjVjMC0zLjM5LTEuNDktNS43Ny00Ljg1LTUuNzdDMjQ5Ljg3LDcyLjE3LDI0OC4xMyw3NC4zLDI0OC4wNSw3OC4yeiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTI2NC4wNSw3MS41M2MwLjE3LDAsMC4yNSwwLjA4LDAuMjUsMC4yNXYzLjM2YzAuNDUtMS40MywyLjEzLTMuNzMsNC45OS0zLjczYzAuMTQsMCwwLjIyLDAuMDYsMC4yMiwwLjIyCgkJdjAuNzNjMCwwLjE3LTAuMDgsMC4yMi0wLjIyLDAuMjJjLTAuMTEsMC0wLjI1LTAuMDMtMC40Mi0wLjAzYy0yLjQxLDAtNC41NywyLjc3LTQuNTcsNS41MnY3LjQzYzAsMC4xNy0wLjA4LDAuMjUtMC4yNSwwLjI1aC0wLjYyCgkJYy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNVY3MS43OGMwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNUgyNjQuMDV6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjgzLjM2LDg1LjUxYzAsMC4xNy0wLjA4LDAuMjUtMC4yNSwwLjI1aC0wLjU2Yy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNXYtMi42MQoJCWMtMC40OCwxLjEyLTEuODIsMy4wOC01LjYzLDMuMDhjLTMuMTQsMC00Ljc2LTEuNjMtNC43Ni0zLjk4YzAtNC4wMSw0LjM3LTQuNCwxMC40LTQuNTR2LTEuMzRjMC0yLjY5LTEuMTItMy45Mi00LjE1LTMuOTIKCQljLTEuNzQsMC0zLjM2LDAuMzktNC42OCwwLjk4Yy0wLjE3LDAuMDYtMC4yNS0wLjAzLTAuMzEtMC4xNGwtMC4xNy0wLjUzYy0wLjA2LTAuMTQsMC0wLjIyLDAuMTQtMC4yOAoJCWMxLjM0LTAuNTksMy4yMi0xLjA0LDUuMDctMS4wNGMzLjY0LDAsNS4xNiwxLjY1LDUuMTYsNC44OFY4NS41MXogTTI4Mi4yOSw3OC4zN2MtNS4xMywwLjItOS4zMywwLjMxLTkuMzMsMy42MQoJCWMwLDEuNzQsMS4yMywzLjA2LDMuODEsMy4wNmMzLjY0LDAsNS41Mi0yLjEzLDUuNTItNC43MVY3OC4zN3oiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yODkuMDUsNzEuNTNjMC4xNywwLDAuMjUsMC4wOCwwLjI1LDAuMjV2My4zNmMwLjQ1LTEuNDMsMi4xMy0zLjczLDQuOTktMy43M2MwLjE0LDAsMC4yMiwwLjA2LDAuMjIsMC4yMgoJCXYwLjczYzAsMC4xNy0wLjA4LDAuMjItMC4yMiwwLjIyYy0wLjExLDAtMC4yNS0wLjAzLTAuNDItMC4wM2MtMi40MSwwLTQuNTcsMi43Ny00LjU3LDUuNTJ2Ny40M2MwLDAuMTctMC4wOCwwLjI1LTAuMjUsMC4yNWgtMC42MgoJCWMtMC4xNywwLTAuMjUtMC4wOC0wLjI1LTAuMjVWNzEuNzhjMC0wLjE3LDAuMDgtMC4yNSwwLjI1LTAuMjVIMjg5LjA1eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTI5OS4yMiw4NS41MWMwLDAuMTctMC4wNiwwLjI1LTAuMjIsMC4yNWgtMC42MmMtMC4xNywwLTAuMjUtMC4wOC0wLjI1LTAuMjVWNjYuMzcKCQljMC0wLjE3LDAuMDgtMC4yNSwwLjI1LTAuMjVoMC42MmMwLjE3LDAsMC4yNSwwLjA4LDAuMjUsMC4yNXY4LjNjMC44NC0yLjI0LDIuOC0zLjQ3LDUuNDQtMy40N2MzLjkyLDAsNi4xOSwyLjY2LDYuMTksNy40MwoJCWMwLDQuNzktMi4yNyw3LjQzLTYuMTksNy40M2MtMi42MywwLTQuNi0xLjE1LTUuNDYtMy40MlY4NS41MXogTTMwNC41Nyw4NS4wNGMzLjM5LDAsNS4xOS0yLjE5LDUuMTktNi40MgoJCWMwLTQuMjMtMS43OS02LjQyLTUuMTktNi40MmMtMy40MiwwLTUuMzIsMi4yNy01LjMyLDYuNDJDMjk5LjI1LDgyLjc3LDMwMS4xNSw4NS4wNCwzMDQuNTcsODUuMDR6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzI0Ljk3LDg0LjE3YzAuMTctMC4xMSwwLjI4LDAsMC4zNCwwLjE0bDAuMiwwLjQ4YzAuMDYsMC4xNC0wLjAzLDAuMi0wLjE3LDAuMjgKCQljLTEuMDksMC41OS0yLjYzLDEuMDQtNC40LDEuMDRjLTQuMzcsMC02Ljc4LTIuOC02Ljc4LTcuNDVjMC00LjcxLDIuMjQtNy40NSw2LjI1LTcuNDVjMy45NSwwLDUuOTQsMi44Niw1Ljk0LDYuNzh2MC45MgoJCWMwLDAuMi0wLjA4LDAuMjUtMC4yNSwwLjI1aC0xMC44MmMwLjExLDMuNjcsMi4wMiw1Ljk3LDUuNjksNS45N0MzMjIuNjcsODUuMTIsMzIzLjg4LDg0Ljc2LDMyNC45Nyw4NC4xN3ogTTMxNS4yOCw3OC4yaDkuOTgKCQl2LTAuMjVjMC0zLjM5LTEuNDktNS43Ny00Ljg1LTUuNzdDMzE3LjEsNzIuMTcsMzE1LjM2LDc0LjMsMzE1LjI4LDc4LjJ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzMxLjU5LDY5LjA2YzAsMC4xNy0wLjA2LDAuMjUtMC4yMiwwLjI1aC0wLjYyYy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNXYtMi4zOAoJCWMwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgwLjYyYzAuMTcsMCwwLjIyLDAuMDgsMC4yMiwwLjI1VjY5LjA2eiBNMzMxLjU5LDg1LjUxYzAsMC4xNy0wLjA2LDAuMjUtMC4yMiwwLjI1aC0wLjYyCgkJYy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNVY3MS43OGMwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgwLjYyYzAuMTcsMCwwLjIyLDAuMDgsMC4yMiwwLjI1Vjg1LjUxeiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMzOC40Miw3Mi41NHY5LjE2YzAsMi40OSwwLjYyLDMuMjIsMi42NCwzLjIyYzAuNjQsMCwxLjA5LTAuMTEsMS41MS0wLjJjMC4yLTAuMDMsMC4yNSwwLjA2LDAuMjgsMC4yCgkJbDAuMTQsMC40OGMwLjA2LDAuMTQtMC4wMywwLjIyLTAuMTcsMC4yNWMtMC4zOSwwLjE0LTEuMTUsMC4yOC0xLjg4LDAuMjhjLTIuNjEsMC0zLjYyLTEuMDktMy42Mi00LjE1di05LjI1SDMzNQoJCWMtMC4xNywwLTAuMjUtMC4wOC0wLjI1LTAuMjV2LTAuNWMwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgyLjM1di0zLjkyYzAtMC4xNywwLjA2LTAuMjUsMC4yMi0wLjI1aDAuNTkKCQljMC4xNywwLDAuMjUsMC4wOCwwLjI1LDAuMjV2My45Mmg0LjE1YzAuMTcsMCwwLjI1LDAuMDgsMC4yNSwwLjI1djAuNWMwLDAuMTctMC4wOCwwLjI1LTAuMjUsMC4yNUgzMzguNDJ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzQ2LjE2LDcxLjc4YzAtMC4xNywwLjA4LTAuMjUsMC4yNS0wLjI1aDAuNjJjMC4xNywwLDAuMjIsMC4wOCwwLjIyLDAuMjV2OC45N2MwLDIuNjEsMS4xNSw0LjI2LDQuMTIsNC4yNgoJCWMyLjg2LDAsNC45My0xLjkxLDQuOTMtNC42NXYtOC41N2MwLTAuMTcsMC4wOC0wLjI1LDAuMjUtMC4yNWgwLjYyYzAuMTcsMCwwLjIyLDAuMDgsMC4yMiwwLjI1djEzLjczYzAsMC4xNy0wLjA2LDAuMjUtMC4yMiwwLjI1CgkJaC0wLjYyYy0wLjE3LDAtMC4yNS0wLjA4LTAuMjUtMC4yNXYtMi41NWMtMC41LDEuMzItMS45MywzLjA4LTUuMSwzLjA4Yy0zLjQ3LDAtNS4wNC0xLjk5LTUuMDQtNS4xNlY3MS43OHoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zNzMuNzksODUuNTFjMCwwLjE3LTAuMDgsMC4yNS0wLjI1LDAuMjVoLTAuNTljLTAuMTcsMC0wLjI1LTAuMDgtMC4yNS0wLjI1di05LjIyCgkJYzAtMi40OS0xLjE4LTQuMDYtNC4wOS00LjA2Yy0zLDAtNS4xMywxLjk2LTUuMTMsNC42OHY4LjZjMCwwLjE3LTAuMDgsMC4yNS0wLjI1LDAuMjVoLTAuNTljLTAuMTcsMC0wLjI1LTAuMDgtMC4yNS0wLjI1VjcxLjc4CgkJYzAtMC4xNywwLjA4LTAuMjUsMC4yNS0wLjI1aDAuNTljMC4xNywwLDAuMjUsMC4wOCwwLjI1LDAuMjV2Mi40OWMwLjU5LTEuMzIsMi4wNS0zLjA4LDUuMy0zLjA4YzMuNDIsMCw1LjAyLDEuOTYsNS4wMiw1LjAyVjg1LjUxCgkJeiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTM4OS43Niw4My43OGMwLDMuNjQtMi4yNyw1LjQxLTUuODYsNS40MWMtMS42MywwLTMuMzktMC4zMS00LjY4LTAuOTVjLTAuMTQtMC4wNi0wLjItMC4xNC0wLjE3LTAuMjUKCQlsMC4yMi0wLjUzYzAuMDMtMC4xMSwwLjExLTAuMjIsMC4zMS0wLjE0YzEuMzQsMC41OSwyLjg2LDAuODcsNC4zMiwwLjg3YzIuOTcsMCw0Ljc2LTEuMzcsNC43Ni00LjQ4di0yLjMzCgkJYy0wLjc2LDIuMDUtMi42NiwzLjI1LTUuMDQsMy4yNWMtMy41LDAtNS44My0yLjM1LTUuODMtNi43YzAtNC4zNywyLjI3LTYuNzMsNS44LTYuNzNjMi4zOCwwLDQuMzIsMS4xOCw1LjA3LDMuMTF2LTIuNTIKCQljMC0wLjE3LDAuMDgtMC4yNSwwLjI1LTAuMjVoMC41OWMwLjE3LDAsMC4yNSwwLjA4LDAuMjUsMC4yNVY4My43OHogTTM4My43NCw3Mi4xN2MtMy4wNSwwLTQuODIsMS45My00LjgyLDUuNzUKCQljMCwzLjc4LDEuNzcsNS43Miw0LjgyLDUuNzJjMy4xMSwwLDQuOTMtMi4yMSw0LjkzLTUuOTFDMzg4LjY3LDc0LjA1LDM4Ni44NSw3Mi4xNywzODMuNzQsNzIuMTd6Ii8+CjwvZz4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjEuMDEsMzYuMjFWNS42OWMwLTAuMTQsMC4xMS0wLjI1LDAuMjUtMC4yNWg1Mi44YzEuNi0wLjY3LDMuMTUtMS4zLDQuNjUtMS44OUgyMC4xNQoJCWMtMC41NiwwLTEuMDEsMC40NS0xLjAxLDEuMDF2MzMuMDhDMTkuNzYsMzcuMTUsMjAuMzksMzYuNjgsMjEuMDEsMzYuMjF6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODUuMjksMzQuNDlWODMuNmMwLDAuMTQtMC4xMSwwLjI1LTAuMjUsMC4yNUgyMS4yNmMtMC4xNCwwLTAuMjUtMC4xMS0wLjI1LTAuMjV2LTYuOTcKCQljLTAuNjQsMC41Ny0xLjI3LDEuMTMtMS44OCwxLjY4djYuNDJjMCwwLjU2LDAuNDUsMS4wMSwxLjAxLDEuMDFoNjYuMDFjMC41NiwwLDEuMDEtMC40NSwxLjAxLTEuMDFWMzMuNwoJCUM4Ni41NCwzMy45Niw4NS45MSwzNC4yMiw4NS4yOSwzNC40OXoiLz4KPC9nPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTA1Ljk0LDAuMjRjLTAuMjMtMC4xOS0wLjUzLTAuMjctMC44My0wLjIyYy0wLjEzLDAuMDItMTMuMTUsMi40My0zMi40OCwxMC45NAoJYy0xNy44MSw3Ljg0LTQ0LjgxLDIyLjYzLTcyLjMsNDguNTZDMC4xMiw1OS43LDAsNTkuOTcsMCw2MC4yNXYyOC4wMmMwLDAuNDIsMC4yNiwwLjgsMC42NSwwLjk1YzAuMTIsMC4wNSwwLjI0LDAuMDcsMC4zNywwLjA3CgljMC4yOCwwLDAuNTYtMC4xMiwwLjc1LTAuMzNjMC40Ni0wLjUxLDQ2LjY0LTUxLjE3LDEwMy43OC02Ni4yOGMwLjQ1LTAuMTIsMC43Ni0wLjUyLDAuNzYtMC45OVYxLjAyCglDMTA2LjMsMC43MiwxMDYuMTcsMC40MywxMDUuOTQsMC4yNHoiLz4KPC9zdmc+Cg==" alt="Bruno Weisser Logo">
    <div class="logo-text">Produktionsplanung<span class="logo-sub">Bruno Weisser GmbH &amp; Co. KG</span></div>
  </div>
  <div class="kw-badge">
    Aktuelle Woche:
    <div class="kw-nav"><button onclick="shiftCurrentKW(-1)">‹</button><button onclick="shiftCurrentKW(1)">›</button></div>
    <strong id="currentKW">—</strong>
  </div>
  <div class="user-menu">
    <span class="user-name" id="userNameDisplay">—</span>
    <span class="role-badge" id="userRoleBadge">—</span>
    <button id="globalSaveBtn" class="btn-small btn-primary" onclick="globalSave()" style="display:none">💾 Speichern</button>
    <button class="logout-btn" onclick="logout()">Abmelden</button>
  </div>
</header>

<div class="main">
  <aside class="sidebar">
    <div>
      <div class="sb-h">Produktionsstufe</div>
      <div class="filter-group">
        <button class="filter-btn active" data-stage="all" onclick="setFilter('all',this)"><span class="dot" style="background:var(--accent)"></span>Alle Stufen</button>
        <button class="filter-btn" data-stage="TZ" onclick="setFilter('TZ',this)"><span class="dot" style="background:var(--tz-c)"></span>Tiefziehen</button>
        <button class="filter-btn" data-stage="FR" onclick="setFilter('FR',this)"><span class="dot" style="background:var(--fr-c)"></span>Fräsen</button>
        <button class="filter-btn" data-stage="MO" onclick="setFilter('MO',this)"><span class="dot" style="background:var(--mo-c)"></span>Montage</button>
        <button class="filter-btn" data-stage="LI" onclick="setFilter('LI',this)"><span class="dot" style="background:var(--li-c)"></span>Lieferung</button>
      </div>
    </div>

    <div>
      <div class="sb-h">Artikel Suche</div>
      <input type="text" class="search-box" id="searchBox" placeholder="z.B. 2341.9012" oninput="renderAll()">
    </div>

    <div>
      <div class="sb-h">Montage Kapazität</div>
      <div class="cap-input-group">
        <label>Normal bis (Std./Woche)</label>
        <input type="number" id="capInput" value="40" min="1" max="300" onchange="renderAll()">
      </div>
      <div class="cap-input-group" style="margin-top:8px">
        <label>Warnung bis (Std./Woche)</label>
        <input type="number" id="capWarnInput" value="50" min="1" max="300" onchange="renderAll()">
      </div>
      <p style="font-size:10px;color:var(--muted);margin-top:7px;line-height:1.4">Bis zur 1. Grenze = normal (grün). Zwischen 1. und 2. Grenze = Warnung (gelb). Über der 2. Grenze = Überlast (rot).</p>
    </div>

    <div>
      <div class="sb-h">Plan-Übersicht</div>
      <div class="stat-mini">
        <div>Artikel gesamt: <b id="stat-total-art">—</b></div>
      </div>
    </div>

    <div>
      <div class="sb-h">Legende</div>
      <div class="legend">
        <div class="leg-row"><div class="leg-swatch" style="background:rgba(103,108,110,.3);border:1px solid #676C6E"></div>Tiefziehen</div>
        <div class="leg-row"><div class="leg-swatch" style="background:rgba(245,158,11,.3);border:1px solid #f59e0b"></div>Fräsen</div>
        <div class="leg-row"><div class="leg-swatch" style="background:rgba(0,110,183,.3);border:1px solid #006EB7"></div>Montage</div>
        <div class="leg-row"><div class="leg-swatch" style="background:rgba(34,197,94,.25);border:1px solid #22c55e"></div>Lieferung</div>
        <div class="leg-row" style="margin-top:4px">
          <span style="width:8px;height:8px;border-radius:50%;background:var(--fest);display:inline-block"></span> FEST &nbsp;
          <span style="width:8px;height:8px;border-radius:50%;background:var(--warn);display:inline-block"></span> FLEX
        </div>
      </div>
    </div>
  </aside>

  <main class="content">
    <div class="summary-row">
      <div class="sum-card">
        <div class="lbl">Artikel Gesamt</div>
        <div class="val" id="s-total" style="color:var(--accent)">—</div>
        <div class="sv" id="s-kw-lbl">im Plan</div>
      </div>
      <div class="sum-card">
        <div class="lbl">TZ diese Woche</div>
        <div class="val" id="s-tz" style="color:var(--tz-c)">—</div>
        <div class="sv">Stück Tiefziehen</div>
      </div>
      <div class="sum-card">
        <div class="lbl">FR diese Woche</div>
        <div class="val" id="s-fr" style="color:var(--fr-c)">—</div>
        <div class="sv">Stück Fräsen</div>
      </div>
      <div class="sum-card">
        <div class="lbl">MO diese Woche</div>
        <div class="val" id="s-mo" style="color:var(--mo-c)">—</div>
        <div class="sv">Std. Montage</div>
      </div>
      <div class="sum-card" id="s-over-card">
        <div class="lbl">Kapazität KW <span id="s-over-kw">—</span></div>
        <div class="val" id="s-over-val" style="color:var(--fest)">OK</div>
        <div class="sv" id="s-over-sub">keine Überlast</div>
      </div>
    </div>

    <div class="cap-section">
      <div class="cap-title">Montage-Kapazität pro KW (nächste 12 Wochen)</div>
      <div class="cap-chart-wrap">
        <svg id="capChart" viewBox="0 0 900 220" preserveAspectRatio="xMidYMid meet"></svg>
      </div>
      <div class="cap-grid" id="capGrid"></div>
    </div>

    <div class="view-tabs">
      <button class="view-tab active" onclick="setView('dashboard',this)">🏠 Diese Woche</button>
      <button class="view-tab" onclick="setView('bom',this)">📐 Stückliste</button>
      <button class="view-tab" onclick="setView('input',this)">✏️ Liefertermin Eingabe</button>
      <button class="view-tab" onclick="setView('gantt',this)">📊 Gantt / KW-Übersicht</button>
      <button class="view-tab" onclick="setView('kwoverview',this)">📅 Geplant vs. Erledigt</button>
      <button class="view-tab" onclick="setView('overload',this)">⚠️ Überlast</button>
    </div>

    <!-- DASHBOARD VIEW (default) -->
    <div id="view-dashboard">
      <div class="sec-title">KW <span id="dashKW">—</span> — Was diese Woche zu tun ist</div>
      <div class="dash-grid">
        <div class="dash-col">
          <div class="dash-col-head tz">🟣 Tiefziehen</div>
          <div id="dashTZ" class="dash-list"></div>
        </div>
        <div class="dash-col">
          <div class="dash-col-head fr">🟠 Fräsen</div>
          <div id="dashFR" class="dash-list"></div>
        </div>
        <div class="dash-col">
          <div class="dash-col-head mo">🔵 Montage</div>
          <div id="dashMO" class="dash-list"></div>
        </div>
        <div class="dash-col">
          <div class="dash-col-head li">🟢 Lieferung</div>
          <div id="dashLI" class="dash-list"></div>
        </div>
      </div>

      <div class="sec-title" style="margin-top:22px">⚠️ Verspätete Posten (geplante KW vorbei, nicht erledigt)</div>
      <table class="detail">
        <thead><tr>
          <th>Artikel-Nr</th><th>Stufe</th><th>Stufen-Art</th><th>Menge</th><th>Geplante KW</th><th>Wochen überfällig</th><th>Status</th>
        </tr></thead>
        <tbody id="lateBody"></tbody>
      </table>
    </div>

    <!-- BOM / STÜCKLISTE VIEW (master data, drives capacity) -->
    <div id="view-bom" class="hidden">
      <div class="sec-title">Stückliste — Stammdaten (Tiefziehen / Fräsen / Montage Zeiten)</div>
      <div id="bomReadonlyNote"></div>
      <div class="save-bar" id="bomSaveBar">
        <span class="save-status" id="bomSaveStatus">Alles gespeichert</span>
        <div class="save-bar-actions">
          <button class="btn-small" onclick="discardDraft()">Verwerfen</button>
          <button class="btn-small btn-primary" onclick="saveDraft()">💾 Speichern</button>
        </div>
      </div>
      <div class="input-toolbar" id="bomToolbarActions">
        <button class="btn-small btn-primary" onclick="document.getElementById('bomExcelImportInput').click()">📥 Aus Excel importieren</button>
        <input type="file" id="bomExcelImportInput" accept=".xlsx,.xls,.csv" style="display:none" onchange="handleBomExcelImport(this.files[0])">
        <button class="btn-small btn-danger" onclick="clearAllBom()">🗑 Alle Stücklisten löschen</button>
        <span style="font-size:11px;color:var(--muted)">Diese Zeiten (S-Zt./R-Zt.) bestimmen die Kapazitätsberechnung im Gantt-Chart. Änderungen hier wirken sich direkt auf alle Ansichten aus. Mehrere Tiefziehen-/Fräsen-Teile pro Artikel möglich.</span>
      </div>
      <div id="bomExcelImportStatus" style="margin-bottom:10px"></div>
      <div style="overflow-x:auto" id="bomTableWrap">
        <table class="input-table bom-master">
          <thead><tr>
            <th style="width:100px">Artikel-Nr</th>
            <th style="min-width:340px">Tiefziehen (Nr / Maschine / S-Zt. / R-Zt.)</th>
            <th style="min-width:340px">Fräsen (Nr / Maschine / S-Zt. / R-Zt.)</th>
            <th style="width:200px">Montage (S-Zt. / Arbeitsplatz)</th>
            <th style="width:30px"></th>
          </tr></thead>
          <tbody id="bomBody"></tbody>
        </table>
      </div>
    </div>

    <!-- INPUT VIEW -->
    <div id="view-input" class="hidden">
      <div class="sec-title">Liefertermin Kunde (W) — manuell eingeben</div>
      <div id="inputReadonlyNote"></div>
      <div class="save-bar" id="inputSaveBar">
        <span class="save-status" id="inputSaveStatus">Alles gespeichert</span>
        <div class="save-bar-actions">
          <button class="btn-small" onclick="discardDraft()">Verwerfen</button>
          <button class="btn-small btn-primary" onclick="saveDraft()">💾 Speichern</button>
        </div>
      </div>
      <div class="input-toolbar" id="inputToolbarActions">
        <button class="btn-small btn-primary" onclick="addNewArtikelRow()">+ Neuer Artikel</button>
        <button class="btn-small btn-primary" onclick="document.getElementById('excelImportInput').click()">📥 Aus Excel importieren</button>
        <input type="file" id="excelImportInput" accept=".xlsx,.xls,.csv" style="display:none" onchange="handleExcelImport(this.files[0])">
        <button class="btn-small btn-danger" onclick="clearAllLiefertermin()">🗑 Alle Liefertermine löschen</button>
        <span style="font-size:11px;color:var(--muted)">Pro Liefertermin-KW können Sie den Vorlauf für Montage, Fräsen und Tiefziehen individuell einstellen (z.B. diese Woche 1, nächste Woche 2 Wochen Vorlauf). Leer = Standard 1 Woche.</span>
      </div>
      <div id="excelImportStatus" style="margin-bottom:10px"></div>
      <div style="overflow-x:auto" id="inputTableWrap">
        <table class="input-table">
          <thead><tr>
            <th style="width:110px">Artikel-Nr</th>
            <th>Liefertermin-KW mit individuellem Vorlauf (Montage / Fräsen / Tiefziehen)</th>
            <th style="width:30px"></th>
          </tr></thead>
          <tbody id="inputBody"></tbody>
        </table>
      </div>
    </div>

    <div id="view-gantt" class="hidden">
      <div class="input-toolbar">
        <div class="toggle-group">
          <button class="toggle-btn gantt-stage-btn active" data-stage="all" onclick="setFilter('all',this)">Alle</button>
          <button class="toggle-btn gantt-stage-btn" data-stage="TZ" onclick="setFilter('TZ',this)">Tiefziehen</button>
          <button class="toggle-btn gantt-stage-btn" data-stage="FR" onclick="setFilter('FR',this)">Fräsen</button>
          <button class="toggle-btn gantt-stage-btn" data-stage="MO" onclick="setFilter('MO',this)">Montage</button>
          <button class="toggle-btn gantt-stage-btn" data-stage="LI" onclick="setFilter('LI',this)">Lieferung</button>
        </div>
      </div>
      <div class="gantt-wrap"><table class="gantt" id="ganttTable"></table></div>
    </div>

    <div id="view-kwoverview" class="hidden">
      <div class="sec-title">Geplant vs. Erledigt — alle Artikel & Stufen</div>
      <div class="input-toolbar">
        <div class="toggle-group">
          <button class="toggle-btn active" onclick="setTzFrFilter('all',this)">Alle</button>
          <button class="toggle-btn" onclick="setTzFrFilter('TZ',this)">Tiefziehen</button>
          <button class="toggle-btn" onclick="setTzFrFilter('FR',this)">Fräsen</button>
          <button class="toggle-btn" onclick="setTzFrFilter('MO',this)">Montage</button>
          <button class="toggle-btn" onclick="setTzFrFilter('LI',this)">Lieferung</button>
        </div>
        <span style="font-size:11px;color:var(--muted);margin-left:10px">Jede Zeile = ein Posten. Geplante KW vs. tatsächlich erledigt KW.</span>
      </div>
      <table class="detail">
        <thead><tr>
          <th>Stufe</th><th>Stufen-Art-Nr</th><th>Liefer-Artikel</th><th>Geplante KW</th><th>Tats. erledigt KW</th><th>Status</th>
        </tr></thead>
        <tbody id="tzfrOverviewBody"></tbody>
      </table>
    </div>

    <div id="view-overload" class="hidden">
      <div class="sec-title">Montage-Überlast — Warnungen & Verschiebevorschläge</div>
      <div class="input-toolbar">
        <span style="font-size:11px;color:var(--muted)">Zeigt alle KWs der nächsten 12 Wochen, in denen die Montage-Kapazität überschritten wird, mit den verursachenden Artikeln und einem Vorschlag, Fräsen/Tiefziehen 1 Woche früher zu produzieren.</span>
      </div>
      <div id="overloadActionPanel"></div>
    </div>
  </main>
</div>
</div>

<script>

// ═══════════════════════════════════════════════════════════
// SERVER CONNECTION — saves permanently to GitHub via server
// ═══════════════════════════════════════════════════════════
let AUTH_TOKEN = null;
try { AUTH_TOKEN = sessionStorage.getItem('bw_token'); } catch(e){}

async function apiLogin(username, password) {
  const r = await fetch('/api/login', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({username, password})
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error || 'Login failed');
  AUTH_TOKEN = d.token;
  sessionStorage.setItem('bw_token', AUTH_TOKEN);
  sessionStorage.setItem('bw_user', JSON.stringify({name:d.username, role:d.role}));
  return d;
}

async function apiLogout() {
  try { await fetch('/api/logout',{method:'POST',headers:{'x-auth-token':AUTH_TOKEN}}); } catch(e){}
  AUTH_TOKEN = null;
  sessionStorage.removeItem('bw_token');
  sessionStorage.removeItem('bw_user');
}

async function apiLoadPlan() {
  const r = await fetch('/api/plan', {headers:{'x-auth-token':AUTH_TOKEN}});
  if (!r.ok) throw new Error('Failed to load');
  return await r.json();
}

async function apiSavePlan(plan) {
  const r = await fetch('/api/plan', {
    method:'POST',
    headers:{'Content-Type':'application/json','x-auth-token':AUTH_TOKEN},
    body: JSON.stringify({plan})
  });
  if (!r.ok) { const d=await r.json(); throw new Error(d.error||'Save failed'); }
  return await r.json();
}

function showToast(msg, isError) {
  let el = document.getElementById('_toast');
  if (!el) {
    el = document.createElement('div');
    el.id = '_toast';
    el.style.cssText = 'position:fixed;bottom:22px;right:24px;padding:11px 18px;border-radius:8px;font-size:14px;font-family:Calibri,Arial,sans-serif;font-weight:600;z-index:9999;box-shadow:0 2px 10px rgba(0,0,0,.2);transition:opacity .4s';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.background = isError ? '#dc2626' : '#16a34a';
  el.style.color = '#fff';
  el.style.opacity = '1';
  clearTimeout(el._t);
  el._t = setTimeout(() => el.style.opacity='0', 3500);
}

// Global save function — always saves PLAN to GitHub permanently
async function globalSave() {
  const btn = document.getElementById('globalSaveBtn');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Wird gespeichert...'; }
  try {
    await apiSavePlan(PLAN);
    showToast('✓ Dauerhaft gespeichert — ' + new Date().toLocaleTimeString('de-DE'), false);
    if (btn) { btn.textContent = '✓ Gespeichert'; }
    setTimeout(() => { if(btn){btn.disabled=false; btn.textContent='💾 Speichern';} }, 2000);
  } catch(e) {
    showToast('⚠ Fehler beim Speichern: ' + e.message, true);
    if (btn) { btn.disabled = false; btn.textContent = '💾 Speichern'; }
  }
}

const INPUT_DATA = {"2341.9011": {"liefertermin": [], "tz_bom": [{"stage_art": "2341.1011", "menge_per_stk": 0.5, "maschine": "M1055", "s_zt": 4, "r_zt": 38}], "fr_bom": [{"stage_art": "2341.2011", "menge_per_stk": 1, "maschine": "M3050", "s_zt": 3, "r_zt": 45}], "mo_s_zt": 0.7, "mo_a_platz": "EG 12"}, "2341.9012": {"liefertermin": [{"year": 2026, "kw": 25, "menge": 10}, {"year": 2026, "kw": 26, "menge": 20}, {"year": 2026, "kw": 27, "menge": 10}, {"year": 2026, "kw": 28, "menge": 10}, {"year": 2026, "kw": 29, "menge": 40}, {"year": 2026, "kw": 35, "menge": 20}, {"year": 2026, "kw": 37, "menge": 10}, {"year": 2026, "kw": 38, "menge": 20}, {"year": 2026, "kw": 40, "menge": 10}, {"year": 2026, "kw": 41, "menge": 20}, {"year": 2026, "kw": 43, "menge": 20}, {"year": 2026, "kw": 44, "menge": 20}, {"year": 2026, "kw": 45, "menge": 20}, {"year": 2026, "kw": 46, "menge": 10}, {"year": 2026, "kw": 47, "menge": 20}, {"year": 2026, "kw": 48, "menge": 10}, {"year": 2026, "kw": 49, "menge": 10}, {"year": 2026, "kw": 50, "menge": 10}], "tz_bom": [{"stage_art": "2341.1011", "menge_per_stk": 0.5, "maschine": "M1055", "s_zt": 4, "r_zt": 38}], "fr_bom": [{"stage_art": "2341.2013", "menge_per_stk": 1, "maschine": "M3050", "s_zt": 3, "r_zt": 45}], "mo_s_zt": 0.7, "mo_a_platz": "EG 12"}, "2342.9012": {"liefertermin": [{"year": 2026, "kw": 26, "menge": 50}, {"year": 2026, "kw": 29, "menge": 50}, {"year": 2026, "kw": 37, "menge": 50}, {"year": 2026, "kw": 40, "menge": 50}, {"year": 2026, "kw": 44, "menge": 50}, {"year": 2026, "kw": 47, "menge": 50}], "tz_bom": [{"stage_art": "2342.1012", "menge_per_stk": 0.25, "maschine": "M1585", "s_zt": 4, "r_zt": 90}], "fr_bom": [{"stage_art": "2342.2012", "menge_per_stk": 1, "maschine": "M3050", "s_zt": 1.5, "r_zt": 45}], "mo_s_zt": 0.7, "mo_a_platz": "EG 12"}, "2454.9001": {"liefertermin": [{"year": 2026, "kw": 25, "menge": 50}, {"year": 2026, "kw": 28, "menge": 50}, {"year": 2026, "kw": 29, "menge": 50}, {"year": 2026, "kw": 38, "menge": 50}, {"year": 2026, "kw": 41, "menge": 50}, {"year": 2026, "kw": 44, "menge": 50}, {"year": 2026, "kw": 47, "menge": 50}, {"year": 2026, "kw": 50, "menge": 50}], "tz_bom": [{"stage_art": "2454.1001", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 1.5, "r_zt": 90}, {"stage_art": "2454.1002", "menge_per_stk": 1, "maschine": "M1585", "s_zt": 1.25, "r_zt": 35}, {"stage_art": "2454.1003", "menge_per_stk": 1, "maschine": "M1585", "s_zt": 1.25, "r_zt": 35}], "fr_bom": [{"stage_art": "2454.2001", "menge_per_stk": 1, "maschine": "M1429", "s_zt": 5.17, "r_zt": 45}, {"stage_art": "2454.2002", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 1.78, "r_zt": 45}, {"stage_art": "2454.2003", "menge_per_stk": 1, "maschine": "M1567", "s_zt": 1.78, "r_zt": 45}], "mo_s_zt": 0.7, "mo_a_platz": "9000001"}, "2455.9001": {"liefertermin": [{"year": 2026, "kw": 24, "menge": 50}, {"year": 2026, "kw": 27, "menge": 50}, {"year": 2026, "kw": 29, "menge": 50}, {"year": 2026, "kw": 37, "menge": 50}, {"year": 2026, "kw": 41, "menge": 50}, {"year": 2026, "kw": 44, "menge": 50}, {"year": 2026, "kw": 47, "menge": 50}, {"year": 2026, "kw": 50, "menge": 50}], "tz_bom": [{"stage_art": "2455.1001", "menge_per_stk": 1, "maschine": "M1585", "s_zt": 0.75, "r_zt": 90}], "fr_bom": [{"stage_art": "2455.2001", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 2.98, "r_zt": 45}], "mo_s_zt": 0.7, "mo_a_platz": "EG 12"}, "2456.9001": {"liefertermin": [{"year": 2026, "kw": 24, "menge": 50}, {"year": 2026, "kw": 27, "menge": 50}, {"year": 2026, "kw": 29, "menge": 50}, {"year": 2026, "kw": 36, "menge": 50}, {"year": 2026, "kw": 39, "menge": 50}, {"year": 2026, "kw": 43, "menge": 50}, {"year": 2026, "kw": 46, "menge": 50}, {"year": 2026, "kw": 49, "menge": 50}], "tz_bom": [{"stage_art": "2456.1001", "menge_per_stk": 0.5, "maschine": "M1585", "s_zt": 1.5, "r_zt": 90}], "fr_bom": [{"stage_art": "2456.2001", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 3.08, "r_zt": 45}], "mo_s_zt": 0.7, "mo_a_platz": "EG 12"}, "2457.9001": {"liefertermin": [{"year": 2026, "kw": 25, "menge": 50}, {"year": 2026, "kw": 28, "menge": 50}, {"year": 2026, "kw": 35, "menge": 50}, {"year": 2026, "kw": 38, "menge": 50}, {"year": 2026, "kw": 42, "menge": 50}, {"year": 2026, "kw": 45, "menge": 50}, {"year": 2026, "kw": 48, "menge": 50}], "tz_bom": [{"stage_art": "2457.1001", "menge_per_stk": 0.5, "maschine": "M2735", "s_zt": 1.5, "r_zt": 90}], "fr_bom": [{"stage_art": "2457.2001", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 1.15, "r_zt": 45}], "mo_s_zt": 0.7, "mo_a_platz": "EG 12"}, "2458.9003": {"liefertermin": [{"year": 2026, "kw": 23, "menge": 20}, {"year": 2026, "kw": 24, "menge": 20}, {"year": 2026, "kw": 26, "menge": 20}, {"year": 2026, "kw": 27, "menge": 20}, {"year": 2026, "kw": 29, "menge": 60}, {"year": 2026, "kw": 36, "menge": 20}, {"year": 2026, "kw": 37, "menge": 20}, {"year": 2026, "kw": 38, "menge": 20}, {"year": 2026, "kw": 40, "menge": 20}, {"year": 2026, "kw": 41, "menge": 20}, {"year": 2026, "kw": 42, "menge": 20}, {"year": 2026, "kw": 44, "menge": 20}, {"year": 2026, "kw": 45, "menge": 20}, {"year": 2026, "kw": 46, "menge": 20}, {"year": 2026, "kw": 47, "menge": 20}, {"year": 2026, "kw": 49, "menge": 20}], "tz_bom": [{"stage_art": "2458.1001", "menge_per_stk": 0.25, "maschine": "M2735", "s_zt": 3, "r_zt": 90}], "fr_bom": [{"stage_art": "2458.2003", "menge_per_stk": 1, "maschine": "M1429", "s_zt": 1.79, "r_zt": 45}], "mo_s_zt": 0.7, "mo_a_platz": "EG 12"}, "2459.9001": {"liefertermin": [{"year": 2026, "kw": 24, "menge": 50}, {"year": 2026, "kw": 27, "menge": 50}, {"year": 2026, "kw": 29, "menge": 50}, {"year": 2026, "kw": 38, "menge": 50}, {"year": 2026, "kw": 40, "menge": 50}, {"year": 2026, "kw": 44, "menge": 50}, {"year": 2026, "kw": 47, "menge": 50}], "tz_bom": [{"stage_art": "2459.1001", "menge_per_stk": 1, "maschine": "M2735", "s_zt": 0.75, "r_zt": 90}], "fr_bom": [{"stage_art": "2459.2001", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 2.5, "r_zt": 45}], "mo_s_zt": 0.14, "mo_a_platz": "EG 12"}, "2460.9001": {"liefertermin": [{"year": 2026, "kw": 24, "menge": 50}, {"year": 2026, "kw": 27, "menge": 50}, {"year": 2026, "kw": 29, "menge": 50}, {"year": 2026, "kw": 37, "menge": 50}, {"year": 2026, "kw": 40, "menge": 50}, {"year": 2026, "kw": 44, "menge": 50}, {"year": 2026, "kw": 47, "menge": 50}], "tz_bom": [{"stage_art": "2460.1001", "menge_per_stk": 1, "maschine": "M1585", "s_zt": 2.5, "r_zt": 90}], "fr_bom": [{"stage_art": "2460.2001", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 3.07, "r_zt": 45}], "mo_s_zt": 0.7, "mo_a_platz": "EG 12"}, "2461.9001": {"liefertermin": [{"year": 2026, "kw": 25, "menge": 50}, {"year": 2026, "kw": 28, "menge": 50}, {"year": 2026, "kw": 35, "menge": 50}, {"year": 2026, "kw": 38, "menge": 50}, {"year": 2026, "kw": 42, "menge": 50}, {"year": 2026, "kw": 45, "menge": 50}, {"year": 2026, "kw": 48, "menge": 50}], "tz_bom": [{"stage_art": "2461.1001", "menge_per_stk": 1, "maschine": "M2735", "s_zt": 1.67, "r_zt": 90}], "fr_bom": [{"stage_art": "2461.2001", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 1.4, "r_zt": 45}], "mo_s_zt": 0.7, "mo_a_platz": "EG 12"}, "2521.9001": {"liefertermin": [{"year": 2026, "kw": 23, "menge": 24}, {"year": 2026, "kw": 48, "menge": 24}], "tz_bom": [{"stage_art": "2521.1001", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 3, "r_zt": 90}, {"stage_art": "2521.1002", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 3, "r_zt": 90}, {"stage_art": "2521.1003", "menge_per_stk": 0.25, "maschine": "M435", "s_zt": 1.5, "r_zt": 90}, {"stage_art": "2521.1004", "menge_per_stk": 0.5, "maschine": "M1055", "s_zt": 3, "r_zt": 90}, {"stage_art": "2521.1005", "menge_per_stk": 0.5, "maschine": "M1055", "s_zt": 3, "r_zt": 90}], "fr_bom": [{"stage_art": "2521.2001", "menge_per_stk": 1, "maschine": "M2080", "s_zt": 4, "r_zt": 45}, {"stage_art": "2521.2002", "menge_per_stk": 1, "maschine": "M1429", "s_zt": 2, "r_zt": 45}, {"stage_art": "2521.2003", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 0.4, "r_zt": 45}, {"stage_art": "2521.2004", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 4, "r_zt": 45}, {"stage_art": "2521.2005", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 3, "r_zt": 45}, {"stage_art": "2521.2006", "menge_per_stk": 1, "maschine": "unbekannt", "s_zt": 3, "r_zt": 45}], "mo_s_zt": 0.875, "mo_a_platz": "EG 12"}, "2522.9001": {"liefertermin": [{"year": 2026, "kw": 29, "menge": 25}], "tz_bom": [{"stage_art": "2522.1001", "menge_per_stk": 1, "maschine": "M1585", "s_zt": 4, "r_zt": 90}, {"stage_art": "2521.1003", "menge_per_stk": 0.5, "maschine": "M435", "s_zt": 1.5, "r_zt": 90}], "fr_bom": [{"stage_art": "2522.2001", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 3, "r_zt": 45}, {"stage_art": "2521.2003", "menge_per_stk": 2, "maschine": "M3045", "s_zt": 0.4, "r_zt": 45}], "mo_s_zt": 0.28, "mo_a_platz": "EG 12"}, "2522.9002": {"liefertermin": [{"year": 2026, "kw": 27, "menge": 25}], "tz_bom": [{"stage_art": "2521.1003", "menge_per_stk": 0.5, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2522.1001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "fr_bom": [{"stage_art": "2522.2001", "menge_per_stk": 1, "maschine": "M1056", "s_zt": null, "r_zt": null}, {"stage_art": "2521.2003", "menge_per_stk": 2, "maschine": "M3045", "s_zt": null, "r_zt": null}], "mo_s_zt": 0.7, "mo_a_platz": null}, "2522.9003": {"liefertermin": [], "tz_bom": [{"stage_art": "2522.1001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2521.1003", "menge_per_stk": 0.5, "maschine": null, "s_zt": null, "r_zt": null}], "fr_bom": [{"stage_art": "2522.2001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2521.2003", "menge_per_stk": 2, "maschine": null, "s_zt": null, "r_zt": null}], "mo_s_zt": 0.7, "mo_a_platz": null}, "2523.9001": {"liefertermin": [{"year": 2026, "kw": 27, "menge": 24}], "tz_bom": [{"stage_art": "2523.1001", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 3, "r_zt": 90}, {"stage_art": "2523.1002", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 3, "r_zt": 90}, {"stage_art": "2521.1005", "menge_per_stk": 0.5, "maschine": "M1055", "s_zt": 3, "r_zt": 90}, {"stage_art": "2521.1004", "menge_per_stk": 0.5, "maschine": "M1055", "s_zt": 3, "r_zt": 90}], "fr_bom": [{"stage_art": "2523.2001", "menge_per_stk": 1, "maschine": "M2080", "s_zt": 4, "r_zt": 45}, {"stage_art": "2523.2002", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 2, "r_zt": 45}, {"stage_art": "2523.2005", "menge_per_stk": 1, "maschine": "unbekannt", "s_zt": 3, "r_zt": 45}, {"stage_art": "2523.2006", "menge_per_stk": 1, "maschine": "unbekannt", "s_zt": 3, "r_zt": 45}, {"stage_art": "2523.2004", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 3, "r_zt": 30}], "mo_s_zt": 0.875, "mo_a_platz": "EG 12"}, "2524.9001": {"liefertermin": [{"year": 2026, "kw": 23, "menge": 25}, {"year": 2026, "kw": 29, "menge": 25}, {"year": 2026, "kw": 39, "menge": 25}, {"year": 2026, "kw": 44, "menge": 25}, {"year": 2026, "kw": 48, "menge": 25}], "tz_bom": [{"stage_art": "2524.1001", "menge_per_stk": 1, "maschine": "M1585", "s_zt": 3, "r_zt": 90}, {"stage_art": "2521.1003", "menge_per_stk": 0.25, "maschine": "M435", "s_zt": 1.5, "r_zt": 90}], "fr_bom": [{"stage_art": "2524.2001", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 3.2, "r_zt": 45}, {"stage_art": "2521.2003", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 0.4, "r_zt": 45}], "mo_s_zt": 0.5384615384615384, "mo_a_platz": "EG 12"}, "2525.9001": {"liefertermin": [{"year": 2026, "kw": 29, "menge": 25}, {"year": 2026, "kw": 38, "menge": 25}, {"year": 2026, "kw": 44, "menge": 25}, {"year": 2026, "kw": 48, "menge": 25}], "tz_bom": [{"stage_art": "2525.1001", "menge_per_stk": 1, "maschine": "M1585", "s_zt": 4, "r_zt": 90}, {"stage_art": "2525.1002", "menge_per_stk": 1, "maschine": "M1585", "s_zt": 4, "r_zt": 90}, {"stage_art": "2525.1003", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 3, "r_zt": 90}], "fr_bom": [{"stage_art": "2525.2001", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 3, "r_zt": 45}, {"stage_art": "2525.2002", "menge_per_stk": 1, "maschine": "M1429", "s_zt": 3.5, "r_zt": 45}, {"stage_art": "2525.2003", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 1.33, "r_zt": 45}, {"stage_art": "2525.2004", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 1.33, "r_zt": 45}], "mo_s_zt": 0.5384615384615384, "mo_a_platz": "EG 12"}, "2541.9001": {"liefertermin": [{"year": 2026, "kw": 24, "menge": 20}, {"year": 2026, "kw": 28, "menge": 20}, {"year": 2026, "kw": 35, "menge": 20}, {"year": 2026, "kw": 42, "menge": 20}, {"year": 2026, "kw": 47, "menge": 20}], "tz_bom": [{"stage_art": "2541.1001", "menge_per_stk": 1, "maschine": "M2735", "s_zt": 3, "r_zt": 90}], "fr_bom": [{"stage_art": "2541.2001", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 1.67, "r_zt": 45}], "mo_s_zt": 0.7, "mo_a_platz": "EG 12"}, "2541.9002": {"liefertermin": [{"year": 2026, "kw": 25, "menge": 20}, {"year": 2026, "kw": 29, "menge": 20}, {"year": 2026, "kw": 35, "menge": 20}, {"year": 2026, "kw": 39, "menge": 20}, {"year": 2026, "kw": 44, "menge": 20}, {"year": 2026, "kw": 50, "menge": 20}], "tz_bom": [{"stage_art": "2541.1001", "menge_per_stk": 1, "maschine": "M2735", "s_zt": 3, "r_zt": 90}], "fr_bom": [{"stage_art": "2541.2002", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 1.53, "r_zt": 45}], "mo_s_zt": 0.7, "mo_a_platz": "EG 12"}, "2544.9001": {"liefertermin": [{"year": 2026, "kw": 26, "menge": 24}], "tz_bom": [{"stage_art": "2544.1001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2544.1002", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "fr_bom": [{"stage_art": "2544.2001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2544.2002", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "mo_s_zt": 0.54, "mo_a_platz": "#N/A"}, "2601.9001": {"liefertermin": [{"year": 2026, "kw": 27, "menge": 15}, {"year": 2026, "kw": 39, "menge": 15}, {"year": 2026, "kw": 45, "menge": 15}], "tz_bom": [{"stage_art": "2601.1001", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 4, "r_zt": 60}, {"stage_art": "2601.1002", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 4, "r_zt": 60}], "fr_bom": [{"stage_art": "2601.2001", "menge_per_stk": 1, "maschine": "M2080", "s_zt": 3, "r_zt": 45}, {"stage_art": "2601.2002", "menge_per_stk": 1, "maschine": "M2080", "s_zt": 3, "r_zt": 45}], "mo_s_zt": 0.7, "mo_a_platz": "EG 12"}, "2602.9001": {"liefertermin": [{"year": 2026, "kw": 27, "menge": 15}, {"year": 2026, "kw": 39, "menge": 15}, {"year": 2026, "kw": 46, "menge": 15}], "tz_bom": [{"stage_art": "2602.1001", "menge_per_stk": 1, "maschine": "M2735", "s_zt": 3, "r_zt": 60}, {"stage_art": "2602.1002", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 3, "r_zt": 60}], "fr_bom": [{"stage_art": "2602.2001", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 3.25, "r_zt": 45}, {"stage_art": "2602.2002", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 2.08, "r_zt": 45}], "mo_s_zt": 0.4666666666666667, "mo_a_platz": "EG 12"}, "2603.9001": {"liefertermin": [{"year": 2026, "kw": 27, "menge": 15}, {"year": 2026, "kw": 38, "menge": 15}, {"year": 2026, "kw": 45, "menge": 15}], "tz_bom": [{"stage_art": "2603.1001", "menge_per_stk": 1, "maschine": "M2735", "s_zt": 3, "r_zt": 60}], "fr_bom": [{"stage_art": "2603.2001", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 2.63, "r_zt": 45}, {"stage_art": "2603.2002", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 1.02, "r_zt": 30}], "mo_s_zt": 0.875, "mo_a_platz": "EG 12"}, "2604.9001": {"liefertermin": [{"year": 2026, "kw": 28, "menge": 15}, {"year": 2026, "kw": 39, "menge": 15}, {"year": 2026, "kw": 46, "menge": 15}], "tz_bom": [{"stage_art": "2604.1001", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 3, "r_zt": 60}, {"stage_art": "2604.1002", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 3, "r_zt": 60}, {"stage_art": "2604.1003", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 3, "r_zt": 60}], "fr_bom": [{"stage_art": "2604.2001", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 3, "r_zt": 45}, {"stage_art": "2604.2002", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 3, "r_zt": 45}, {"stage_art": "2604.2003", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 4, "r_zt": 30}], "mo_s_zt": 1.75, "mo_a_platz": "EG 12"}, "2605.9001": {"liefertermin": [{"year": 2026, "kw": 27, "menge": 15}, {"year": 2026, "kw": 39, "menge": 15}, {"year": 2026, "kw": 46, "menge": 15}], "tz_bom": [{"stage_art": "2605.1001", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 3, "r_zt": 60}, {"stage_art": "2605.1002", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 3, "r_zt": 60}, {"stage_art": "2605.1003", "menge_per_stk": 1, "maschine": "M2735", "s_zt": 3, "r_zt": 60}], "fr_bom": [{"stage_art": "2605.2001", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 4.17, "r_zt": 45}, {"stage_art": "2605.2002", "menge_per_stk": 1, "maschine": "M1429", "s_zt": 2.5, "r_zt": 45}, {"stage_art": "2603.2002", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 1.02, "r_zt": 30}, {"stage_art": "2605.2003", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 3, "r_zt": 45}], "mo_s_zt": 1.4, "mo_a_platz": "EG 12"}, "2664.9001": {"liefertermin": [{"year": 2026, "kw": 28, "menge": 25}, {"year": 2026, "kw": 45, "menge": 25}], "tz_bom": [{"stage_art": "2664.1001", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 3, "r_zt": 60}, {"stage_art": "2664.1002", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 4, "r_zt": 60}, {"stage_art": "2664.1003", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 4, "r_zt": 60}, {"stage_art": "2664.1004", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 4, "r_zt": 60}, {"stage_art": "2664.1005", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 4, "r_zt": 60}], "fr_bom": [{"stage_art": "2664.2001", "menge_per_stk": 1, "maschine": "M2080", "s_zt": 5, "r_zt": 45}, {"stage_art": "2664.2002", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 2, "r_zt": 45}, {"stage_art": "2664.2003", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 2, "r_zt": 45}, {"stage_art": "2664.2004", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 2, "r_zt": 45}, {"stage_art": "2664.2005", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 1, "r_zt": 45}], "mo_s_zt": 0.84, "mo_a_platz": "EG 12"}, "2665.9001": {"liefertermin": [{"year": 2026, "kw": 24, "menge": 25}, {"year": 2026, "kw": 37, "menge": 25}, {"year": 2026, "kw": 50, "menge": 25}], "tz_bom": [{"stage_art": "2665.1001", "menge_per_stk": 1, "maschine": "M1585", "s_zt": 6, "r_zt": 60}, {"stage_art": "2665.1002", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 4, "r_zt": 60}, {"stage_art": "2665.1003", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 4, "r_zt": 60}, {"stage_art": "2665.1004", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 4, "r_zt": 60}], "fr_bom": [{"stage_art": "2665.2001", "menge_per_stk": 1, "maschine": "M2080", "s_zt": 2.3, "r_zt": 45}, {"stage_art": "2665.2002", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 2.03, "r_zt": 45}, {"stage_art": "2665.2003", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 2, "r_zt": 45}, {"stage_art": "2665.2004", "menge_per_stk": 1, "maschine": "unbekannt", "s_zt": 2, "r_zt": 45}], "mo_s_zt": 0.84, "mo_a_platz": "EG 12"}, "2666.9001": {"liefertermin": [{"year": 2026, "kw": 26, "menge": 25}, {"year": 2026, "kw": 40, "menge": 25}], "tz_bom": [{"stage_art": "2666.1001", "menge_per_stk": 1, "maschine": "M2735", "s_zt": 2.5, "r_zt": 60}, {"stage_art": "2666.1002", "menge_per_stk": 1, "maschine": "M2735", "s_zt": 2.5, "r_zt": 60}, {"stage_art": "2666.1003", "menge_per_stk": 1, "maschine": "M1055", "s_zt": 4, "r_zt": 60}], "fr_bom": [{"stage_art": "2666.2001", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 3, "r_zt": 45}, {"stage_art": "2666.2002", "menge_per_stk": 1, "maschine": "M1056", "s_zt": 3, "r_zt": 45}, {"stage_art": "2666.2003", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 2, "r_zt": 45}, {"stage_art": "2666.2004", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 2, "r_zt": 45}], "mo_s_zt": 1.1666666666666667, "mo_a_platz": "EG 12"}, "2667.9001": {"liefertermin": [{"year": 2026, "kw": 26, "menge": 25}, {"year": 2026, "kw": 39, "menge": 25}], "tz_bom": [{"stage_art": "2667.1001", "menge_per_stk": 1, "maschine": "M2735", "s_zt": 3, "r_zt": 60}], "fr_bom": [{"stage_art": "2667.2001", "menge_per_stk": 1, "maschine": "M3045", "s_zt": 2.5, "r_zt": 45}], "mo_s_zt": 0.7, "mo_a_platz": "EG 12"}, "2668.9001": {"liefertermin": [{"year": 2026, "kw": 25, "menge": 25}, {"year": 2026, "kw": 38, "menge": 25}], "tz_bom": [{"stage_art": "2668.1001", "menge_per_stk": 1, "maschine": "M2735", "s_zt": 3, "r_zt": 60}], "fr_bom": [{"stage_art": "2668.2001", "menge_per_stk": 1, "maschine": "unbekannt", "s_zt": 3.5, "r_zt": 45}], "mo_s_zt": 0.7, "mo_a_platz": "EG 12"}, "2669.9001": {"liefertermin": [{"year": 2026, "kw": 26, "menge": 25}], "tz_bom": [{"stage_art": "2669.1001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2669.1002", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "fr_bom": [{"stage_art": "2669.2001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2669.2002", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "mo_s_zt": 0.59, "mo_a_platz": null}, "2720.9001": {"liefertermin": [], "tz_bom": [{"stage_art": "2720.1001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2720.1002", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2720.1003", "menge_per_stk": 0.5, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2720.1004", "menge_per_stk": 0.5, "maschine": null, "s_zt": null, "r_zt": null}], "fr_bom": [{"stage_art": "2720.2001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2720.2002", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2720.2003", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2720.2004", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2720.2005", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "mo_s_zt": 0.88, "mo_a_platz": null}, "2721.9001": {"liefertermin": [], "tz_bom": [{"stage_art": "2720.1003", "menge_per_stk": 0.5, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2720.1004", "menge_per_stk": 0.5, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2721.1001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2721.1002", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "fr_bom": [{"stage_art": "2721.2001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2721.2002", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2721.2003", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2721.2004", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2721.2005", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "mo_s_zt": 0.88, "mo_a_platz": null}, "2724.9001": {"liefertermin": [{"year": 2026, "kw": 27, "menge": 10}], "tz_bom": [{"stage_art": "2724.1001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2724.1002", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2724.1003", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2724.1004", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "fr_bom": [{"stage_art": "2724.2001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2724.2002", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2724.2003", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2724.2004", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "mo_s_zt": 0.42, "mo_a_platz": null}, "2725.9001": {"liefertermin": [{"year": 2026, "kw": 26, "menge": 10}], "tz_bom": [{"stage_art": "2725.1001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "fr_bom": [{"stage_art": "2725.2001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "mo_s_zt": 0.7, "mo_a_platz": null}, "2727.9001": {"liefertermin": [{"year": 2026, "kw": 24, "menge": 4}, {"year": 2026, "kw": 29, "menge": 6}], "tz_bom": [{"stage_art": "2727.1001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "fr_bom": [{"stage_art": "2727.2001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "mo_s_zt": 0.1, "mo_a_platz": null}, "2728.9001": {"liefertermin": [{"year": 2026, "kw": 27, "menge": 10}], "tz_bom": [{"stage_art": "2728.1001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2728.1002", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "fr_bom": [{"stage_art": "2728.2001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}, {"stage_art": "2728.2002", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "mo_s_zt": 0.1, "mo_a_platz": null}, "2729.9001": {"liefertermin": [{"year": 2026, "kw": 26, "menge": 10}], "tz_bom": [{"stage_art": "2729.1001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "fr_bom": [{"stage_art": "2729.2001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "mo_s_zt": 0.7, "mo_a_platz": null}, "2730.9001": {"liefertermin": [{"year": 2026, "kw": 26, "menge": 10}], "tz_bom": [{"stage_art": "2730.1001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "fr_bom": [{"stage_art": "2730.2001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "mo_s_zt": 0.7, "mo_a_platz": null}, "2731.9001": {"liefertermin": [{"year": 2026, "kw": 26, "menge": 10}], "tz_bom": [{"stage_art": "2731.1001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "fr_bom": [{"stage_art": "2731.2001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "mo_s_zt": 0.7, "mo_a_platz": null}, "2732.9001": {"liefertermin": [{"year": 2026, "kw": 26, "menge": 10}], "tz_bom": [{"stage_art": "2732.1001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "fr_bom": [{"stage_art": "2732.2001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "mo_s_zt": 0.7, "mo_a_platz": null}, "2733.9001": {"liefertermin": [{"year": 2026, "kw": 26, "menge": 10}], "tz_bom": [{"stage_art": "2733.1001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "fr_bom": [{"stage_art": "2733.2001", "menge_per_stk": 1, "maschine": null, "s_zt": null, "r_zt": null}], "mo_s_zt": 0.7, "mo_a_platz": null}};

// INPUT_DATA: { artikel: { liefertermin:[{year,kw,menge}], tz_bom:[{stage_art,menge_per_stk,maschine,s_zt,r_zt}], fr_bom:[...], mo_s_zt, mo_a_platz } }

// ─────────────────────────────────────────────
// LOGIN / USERS — simple soft access gate, NOT real security.
// Anyone who views the page source can read this list. This only deters
// accidental edits by colleagues; it does not protect sensitive data.
// Add or edit users here. role: 'planer' (full access) | 'mitarbeiter' (read-only)
// ─────────────────────────────────────────────
const USERS = [
  { name: 'Modu', password: 'planung2026', role: 'planer' },
  { name: 'Planer', password: 'planer123', role: 'planer' },
  { name: 'Mitarbeiter', password: 'team123', role: 'mitarbeiter' },
];

let CURRENT_USER = null; // { name, role }

function attemptLogin() {
  const nameInput = document.getElementById('loginUser').value.trim();
  const passInput = document.getElementById('loginPass').value;
  const match = USERS.find(u => u.name.toLowerCase() === nameInput.toLowerCase() && u.password === passInput);
  const errorEl = document.getElementById('loginError');
  if (!match) {
    errorEl.classList.add('show');
    return;
  }
  errorEl.classList.remove('show');
  CURRENT_USER = { name: match.name, role: match.role };
  sessionStorage.setItem('planungUser', JSON.stringify(CURRENT_USER));
  showApp();
}

function logout() {
  CURRENT_USER = null;
  sessionStorage.removeItem('planungUser');
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('appRoot').classList.add('hidden');
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
}

function showApp() {
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('appRoot').classList.remove('hidden');
  document.getElementById('userNameDisplay').textContent = CURRENT_USER.name;
  const badge = document.getElementById('userRoleBadge');
  badge.textContent = CURRENT_USER.role === 'planer' ? 'Planer' : 'Mitarbeiter';
  badge.className = 'role-badge ' + CURRENT_USER.role;
  applyRolePermissions();
  renderAll();
}

function isReadOnly() {
  return !CURRENT_USER || CURRENT_USER.role !== 'planer';
}

function applyRolePermissions() {
  const readOnly = isReadOnly();
  const bomNote = document.getElementById('bomReadonlyNote');
  const inputNote = document.getElementById('inputReadonlyNote');
  const inputToolbar = document.getElementById('inputToolbarActions');
  const bomToolbar = document.getElementById('bomToolbarActions');
  const bomWrap = document.getElementById('bomTableWrap');
  const inputWrap = document.getElementById('inputTableWrap');
  const bomSaveBar = document.getElementById('bomSaveBar');
  const inputSaveBar = document.getElementById('inputSaveBar');
  const noteHtml = '<div class="readonly-note">🔒 Sie sind als Mitarbeiter angemeldet (nur ansehen). Änderungen sind in diesem Bereich nicht möglich.</div>';
  if (bomNote) bomNote.innerHTML = readOnly ? noteHtml : '';
  if (inputNote) inputNote.innerHTML = readOnly ? noteHtml : '';
  if (inputToolbar) inputToolbar.style.display = readOnly ? 'none' : 'flex';
  if (bomToolbar) {
    // keep the explanatory text visible, just hide the action buttons for read-only users
    bomToolbar.querySelectorAll('button').forEach(btn => {
      btn.style.display = readOnly ? 'none' : 'inline-block';
    });
  }
  if (bomWrap) bomWrap.classList.toggle('readonly-locked', readOnly);
  if (inputWrap) inputWrap.classList.toggle('readonly-locked', readOnly);
  if (bomSaveBar) bomSaveBar.style.display = readOnly ? 'none' : 'flex';
  if (inputSaveBar) inputSaveBar.style.display = readOnly ? 'none' : 'flex';
}

// On page load, check if a session is already active (so refreshing the page doesn't log out)
(function restoreSession() {
  try {
    const saved = sessionStorage.getItem('planungUser');
    if (saved) {
      CURRENT_USER = JSON.parse(saved);
    }
  } catch (e) {}
})();

let CURRENT_KW = 24;
let CURRENT_YEAR = 2026;
const FEST_WEEKS = 6;
const KW_WINDOW = 14;

let PLAN = JSON.parse(JSON.stringify(INPUT_DATA));

// DRAFT is a working copy used only by the "Stückliste" and "Liefertermin Eingabe"
// tabs. Edits there only touch DRAFT; PLAN (which drives every calculation, chart,
// and other tab) is only updated when the user explicitly clicks "Speichern".
let DRAFT = JSON.parse(JSON.stringify(PLAN));
let draftDirty = false;

function markDraftDirty() {
  draftDirty = true;
  updateSaveBarState();
}

function updateSaveBarState() {
  ['bom', 'input'].forEach(view => {
    const bar = document.getElementById(view + 'SaveBar');
    if (!bar) return;
    bar.classList.toggle('dirty', draftDirty);
    const status = document.getElementById(view + 'SaveStatus');
    if (status) status.textContent = draftDirty ? 'Ungespeicherte Änderungen' : 'Alles gespeichert';
  });
}

function saveDraft() {
  PLAN = JSON.parse(JSON.stringify(DRAFT));
  draftDirty = false;
  updateSaveBarState();
  renderAll();
}

function discardDraft() {
  if (draftDirty && !confirm('Ungespeicherte Änderungen verwerfen?')) return;
  DRAFT = JSON.parse(JSON.stringify(PLAN));
  draftDirty = false;
  updateSaveBarState();
  renderAll();
}

// Tracks manual "erledigt" checkmarks: key = "stage|stageArtOrArt|year|kw" -> {done, doneAtYear, doneAtKw}
let DONE_STATUS = {};

function doneKey(stage, ident, year, kw) {
  return stage + '|' + ident + '|' + year + '|' + kw;
}
function isDone(stage, ident, year, kw) {
  const entry = DONE_STATUS[doneKey(stage, ident, year, kw)];
  return !!(entry && entry.done);
}
function getDoneAt(stage, ident, year, kw) {
  const entry = DONE_STATUS[doneKey(stage, ident, year, kw)];
  return (entry && entry.done) ? { year: entry.doneAtYear, kw: entry.doneAtKw } : null;
}
function toggleDone(stage, ident, year, kw) {
  const k = doneKey(stage, ident, year, kw);
  const wasDone = DONE_STATUS[k] && DONE_STATUS[k].done;
  if (wasDone) {
    DONE_STATUS[k] = { done: false };
  } else {
    DONE_STATUS[k] = { done: true, doneAtYear: CURRENT_YEAR, doneAtKw: CURRENT_KW };
  }
  renderAll();
}
function isPast(year, kw) {
  return absWeek(year, kw) < absWeek(CURRENT_YEAR, CURRENT_KW);
}
function getMoSzt(art) {
  // Returns the Montage S-Zt for an artikel. Respects an explicitly-set 0; only falls back
  // to the 0.5 default when the value is missing entirely (undefined/null).
  const v = PLAN[art].mo_s_zt;
  return (typeof v === 'number') ? v : 0.5;
}
function isLate(stage, ident, year, kw) {
  return isPast(year, kw) && !isDone(stage, ident, year, kw);
}
function weeksOverdue(year, kw) {
  return absWeek(CURRENT_YEAR, CURRENT_KW) > absWeek(year,kw)
    ? (CURRENT_YEAR - year) * 52 + (CURRENT_KW - kw)
    : 0;
}

function isFest(year, kw) {
  const diffWeeks = (year - CURRENT_YEAR)*52 + (kw - CURRENT_KW);
  return diffWeeks < FEST_WEEKS;
}
function absWeek(year, kw) { return year*100 + kw; }
function kwMinus(year, kw, n) {
  let k = kw - n, y = year;
  while (k < 1) { k += 52; y -= 1; }
  return {year:y, kw:k};
}

function shiftCurrentKW(delta) {
  let k = CURRENT_KW + delta, y = CURRENT_YEAR;
  if (k < 1) { k += 52; y -= 1; }
  if (k > 52) { k -= 52; y += 1; }
  CURRENT_KW = k; CURRENT_YEAR = y;
  document.getElementById('currentKW').textContent = \`KW \${CURRENT_KW} / \${CURRENT_YEAR}\`;
  renderAll();
}

let activeFilter = 'all';
let activeView = 'dashboard';
let tzfrFilter = 'all';

function setFilter(f, btn) {
  activeFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.gantt-stage-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // keep the sidebar filter button in sync with whichever control was clicked
  document.querySelectorAll('.filter-btn').forEach(b => {
    if (b.getAttribute('data-stage') === f) b.classList.add('active');
  });
  document.querySelectorAll('.gantt-stage-btn').forEach(b => {
    if (b.getAttribute('data-stage') === f) b.classList.add('active');
  });
  renderAll();
}
function setView(v, btn) {
  // If entering an editing tab with no unsaved changes, refresh the draft from
  // PLAN so any changes made elsewhere (e.g. the "1 Woche früher" quick action) are visible.
  if ((v === 'bom' || v === 'input') && !draftDirty) {
    DRAFT = JSON.parse(JSON.stringify(PLAN));
  }
  activeView = v;
  document.querySelectorAll('.view-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('view-dashboard').classList.toggle('hidden', v !== 'dashboard');
  document.getElementById('view-bom').classList.toggle('hidden', v !== 'bom');
  document.getElementById('view-input').classList.toggle('hidden', v !== 'input');
  document.getElementById('view-gantt').classList.toggle('hidden', v !== 'gantt');
  document.getElementById('view-kwoverview').classList.toggle('hidden', v !== 'kwoverview');
  document.getElementById('view-overload').classList.toggle('hidden', v !== 'overload');
  renderAll();
}

function getOffsets() {
  // Global default lead times (weeks): used only when a Liefertermin-week has no individual override set.
  return { mo: 1, fr: 1, tz: 1 };
}

function getArtikelList() {
  const q = (document.getElementById('searchBox')?.value || '').trim().toLowerCase();
  let arts = Object.keys(PLAN);
  if (q) arts = arts.filter(a => a.toLowerCase().includes(q));
  arts.sort();
  return arts;
}

function getArtikelListFrom(source) {
  const q = (document.getElementById('searchBox')?.value || '').trim().toLowerCase();
  let arts = Object.keys(source);
  if (q) arts = arts.filter(a => a.toLowerCase().includes(q));
  arts.sort();
  return arts;
}

function ensureBomDefault(art, field, source) {
  source = source || PLAN;
  // if an artikel has no BOM rows at all, give it one default row with auto-derived stage_art
  if (source[art][field].length === 0) {
    const prefix = field === 'tz_bom' ? '1' : '2';
    const parts = art.split('.');
    const base = parts[0];
    const suffix = (parts[1] || '0001').slice(-3).padStart(3,'0');
    source[art][field].push({ stage_art: base + '.' + prefix + suffix, menge_per_stk: 1, maschine: null, s_zt: null, r_zt: null });
  }
  return source[art][field];
}

// ─────────────────────────────────────────────
// DERIVATION ENGINE
// Liefertermin (manual) -> Montage (Lief - offMO)
// For each BOM-Teil in fr_bom / tz_bom: KW = Montage(or Fräsen) - offset, Menge = Montage-Menge * menge_per_stk
// Tiefziehen is derived from Fräsen's own timing (Fräsen - offTZ), using the SAME factor chain as if it fed Fräsen quantity (factor applied at TZ's own bom)
// Combine: when multiple Liefer-Artikel share the same stage_art, their computed quantities are SUMMED
// ─────────────────────────────────────────────
function computeDerived(source) {
  source = source || PLAN;
  const off = getOffsets();
  const arts = Object.keys(source);

  function getWeekOffset(w, field) {
    // field: 'mo_offset', 'fr_offset', 'tz_offset' - per-Liefertermin-week override, falls back to global
    const override = w[field];
    if (typeof override === 'number') return override;
    return field === 'mo_offset' ? off.mo : field === 'fr_offset' ? off.fr : off.tz;
  }

  const montageByArt = {}; // art -> [{year,kw,menge}]
  arts.forEach(art => {
    montageByArt[art] = source[art].liefertermin.map(w => {
      const moOff = getWeekOffset(w, 'mo_offset');
      const mw = kwMinus(w.year, w.kw, moOff);
      return {year: mw.year, kw: mw.kw, menge: w.menge, srcWeek: w};
    });
  });

  // For each artikel, for each BOM line, compute its own weekly quantities (KW shifted, qty = montage qty * factor)
  // fraesenLines: art -> [{stage_art, factor, maschine, s_zt, r_zt, weeks:[{year,kw,menge}]}]
  function computeBomLines(field, offsetField, baseWeeksByArt) {
    const out = {}; // art -> array of line objects (own contribution)
    arts.forEach(art => {
      ensureBomDefault(art, field, source);
      const lines = source[art][field];
      out[art] = lines.map(line => {
        const factor = (typeof line.menge_per_stk === 'number') ? line.menge_per_stk : 1;
        const weeks = baseWeeksByArt[art].map(w => {
          const weekOffset = getWeekOffset(w.srcWeek, offsetField);
          const sw = kwMinus(w.year, w.kw, weekOffset);
          return {year: sw.year, kw: sw.kw, menge: +(w.menge * factor).toFixed(4), srcWeek: w.srcWeek};
        });
        return { stage_art: line.stage_art, factor, maschine: line.maschine, s_zt: line.s_zt, r_zt: line.r_zt, weeks };
      });
    });
    return out;
  }

  const fraesenLines = computeBomLines('fr_bom', 'fr_offset', montageByArt);
  // Tiefziehen timing is based on Fräsen's own KW per artikel, using each Liefertermin-week's own fr_offset
  const montageShiftedForTz = {};
  arts.forEach(art => {
    montageShiftedForTz[art] = montageByArt[art].map(w => {
      const frOff = getWeekOffset(w.srcWeek, 'fr_offset');
      const fw = kwMinus(w.year, w.kw, frOff);
      return {year: fw.year, kw: fw.kw, menge: w.menge, srcWeek: w.srcWeek};
    });
  });
  const tiefziehenLines = computeBomLines('tz_bom', 'tz_offset', montageShiftedForTz);

  // Build combined groups by stage_art across ALL lines of ALL artikel
  function buildCombinedGroups(linesByArt) {
    const groups = {}; // stage_art -> { artikel: Set, weeksMap: {year-kw: total}, maschine, s_zt, r_zt }
    Object.entries(linesByArt).forEach(([art, lines]) => {
      lines.forEach(line => {
        const sa = line.stage_art;
        if (!groups[sa]) groups[sa] = { artikel: new Set(), weeksMap: {}, maschine: line.maschine, s_zt: line.s_zt, r_zt: line.r_zt };
        groups[sa].artikel.add(art);
        line.weeks.forEach(w => {
          const key = w.year + '-' + w.kw;
          groups[sa].weeksMap[key] = (groups[sa].weeksMap[key] || 0) + w.menge;
        });
      });
    });
    // convert sets to arrays
    Object.values(groups).forEach(g => g.artikel = Array.from(g.artikel));
    return groups;
  }

  const fraesenGroups = buildCombinedGroups(fraesenLines);
  const tiefziehenGroups = buildCombinedGroups(tiefziehenLines);

  return { montageByArt, fraesenLines, tiefziehenLines, fraesenGroups, tiefziehenGroups };
}

// ─────────────────────────────────────────────
// BOM MASTER TABLE — Stückliste (drives capacity calc)
// ─────────────────────────────────────────────
function renderBomTable() {
  const arts = getArtikelListFrom(DRAFT);
  let html = '';

  arts.forEach(art => {
    const d = DRAFT[art];
    ensureBomDefault(art, 'tz_bom', DRAFT);
    ensureBomDefault(art, 'fr_bom', DRAFT);

    const tzHtml = d.tz_bom.map((line, idx) => \`
      <div class="bom-master-row">
        <div class="bmf"><label>Nr</label><input class="w-art" type="text" value="\${line.stage_art||''}" onchange="updateBom('\${art}','tz_bom',\${idx},'stage_art',this.value)"></div>
        <div class="bmf"><label>Masch.</label><input class="w-masch" type="text" value="\${line.maschine||''}" onchange="updateBom('\${art}','tz_bom',\${idx},'maschine',this.value)"></div>
        <div class="bmf"><label>S-Zt.</label><input class="w-time" type="number" step="0.01" value="\${line.s_zt??''}" onchange="updateBom('\${art}','tz_bom',\${idx},'s_zt',this.value)"></div>
        <div class="bmf"><label>R-Zt.</label><input class="w-time" type="number" step="1" value="\${line.r_zt??''}" onchange="updateBom('\${art}','tz_bom',\${idx},'r_zt',this.value)"></div>
        <div class="bmf"><label>Faktor</label><input class="w-time" type="number" step="0.01" value="\${line.menge_per_stk??1}" onchange="updateBom('\${art}','tz_bom',\${idx},'menge_per_stk',this.value)"></div>
        <span class="x-btn" onclick="removeBomLine('\${art}','tz_bom',\${idx})">×</span>
      </div>\`).join('') + \`<span class="bom-add-btn" onclick="addBomLine('\${art}','tz_bom')">+ Tiefziehen-Teil</span>\`;

    const frHtml = d.fr_bom.map((line, idx) => \`
      <div class="bom-master-row">
        <div class="bmf"><label>Nr</label><input class="w-art" type="text" value="\${line.stage_art||''}" onchange="updateBom('\${art}','fr_bom',\${idx},'stage_art',this.value)"></div>
        <div class="bmf"><label>Masch.</label><input class="w-masch" type="text" value="\${line.maschine||''}" onchange="updateBom('\${art}','fr_bom',\${idx},'maschine',this.value)"></div>
        <div class="bmf"><label>S-Zt.</label><input class="w-time" type="number" step="0.01" value="\${line.s_zt??''}" onchange="updateBom('\${art}','fr_bom',\${idx},'s_zt',this.value)"></div>
        <div class="bmf"><label>R-Zt.</label><input class="w-time" type="number" step="1" value="\${line.r_zt??''}" onchange="updateBom('\${art}','fr_bom',\${idx},'r_zt',this.value)"></div>
        <div class="bmf"><label>Faktor</label><input class="w-time" type="number" step="0.01" value="\${line.menge_per_stk??1}" onchange="updateBom('\${art}','fr_bom',\${idx},'menge_per_stk',this.value)"></div>
        <span class="x-btn" onclick="removeBomLine('\${art}','fr_bom',\${idx})">×</span>
      </div>\`).join('') + \`<span class="bom-add-btn" onclick="addBomLine('\${art}','fr_bom')">+ Fräsen-Teil</span>\`;

    const moHtml = \`<div class="mo-master-box">
      <div class="mo-field"><label>S-Zt. (h/Stk)</label><input type="number" step="0.01" value="\${d.mo_s_zt??''}" onchange="updateMoField('\${art}','mo_s_zt',this.value)"></div>
      <div class="mo-field"><label>Arbeitsplatz</label><input type="text" value="\${d.mo_a_platz||''}" onchange="updateMoField('\${art}','mo_a_platz',this.value)"></div>
    </div>\`;

    html += \`<tr>
      <td style="font-family:Calibri,'Segoe UI',Arial,sans-serif;font-weight:600">\${art}</td>
      <td>\${tzHtml}</td>
      <td>\${frHtml}</td>
      <td>\${moHtml}</td>
      <td><span class="row-del" onclick="clearArtikelBom('\${art}')" title="Stückliste für diesen Artikel löschen (Liefertermine bleiben erhalten)">🗑</span></td>
    </tr>\`;
  });

  document.getElementById('bomBody').innerHTML = html || '<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:20px">Keine Artikel</td></tr>';
  updateSaveBarState();
}

// ─────────────────────────────────────────────
// INPUT TABLE
// ─────────────────────────────────────────────
function renderInputTable() {
  const D = computeDerived(DRAFT);
  const off = getOffsets();
  const arts = getArtikelListFrom(DRAFT);
  let html = '';

  arts.forEach(art => {
    const d = DRAFT[art];
    ensureBomDefault(art, 'fr_bom', DRAFT);
    ensureBomDefault(art, 'tz_bom', DRAFT);

    const liefRowsHtml = d.liefertermin.map((w, idx) => {
      const moW = D.montageByArt[art][idx];
      const frWeeksForThis = (D.fraesenLines[art]||[]).map(line => line.weeks[idx]).filter(Boolean);
      const tzWeeksForThis = (D.tiefziehenLines[art]||[]).map(line => line.weeks[idx]).filter(Boolean);

      const moOffVal = (typeof w.mo_offset === 'number') ? w.mo_offset : '';
      const frOffVal = (typeof w.fr_offset === 'number') ? w.fr_offset : '';
      const tzOffVal = (typeof w.tz_offset === 'number') ? w.tz_offset : '';

      const frChips = (D.fraesenLines[art]||[]).map((line,i) => {
        const lw = line.weeks[idx];
        if (!lw) return '';
        return \`<span class="derived-chip fr">\${line.stage_art}: KW\${lw.kw}=\${lw.menge}</span>\`;
      }).join(' ') || '<span class="derived-cell">—</span>';

      const tzChips = (D.tiefziehenLines[art]||[]).map((line,i) => {
        const lw = line.weeks[idx];
        if (!lw) return '';
        return \`<span class="derived-chip tz">\${line.stage_art}: KW\${lw.kw}=\${lw.menge}</span>\`;
      }).join(' ') || '<span class="derived-cell">—</span>';

      return \`<div class="lief-week-block">
        <div class="lief-week-head">
          <span class="kw-chip">
            KW<input type="number" value="\${w.kw}" min="1" max="53" onchange="updateLiefWeek('\${art}',\${idx},'kw',this.value)" style="width:30px">
            /<input type="number" value="\${w.year}" onchange="updateLiefWeek('\${art}',\${idx},'year',this.value)" style="width:40px">
            :<input class="menge-in" type="number" value="\${w.menge}" min="0" onchange="updateLiefWeek('\${art}',\${idx},'menge',this.value)">
            <span class="x-btn" onclick="removeLiefWeek('\${art}',\${idx})">×</span>
          </span>
        </div>
        <div class="lief-week-stages">
          <div class="lws-col">
            <div class="offset-row"><label>MO Vorlauf (Wo.):</label><input class="offset-in" type="number" min="0" max="8" placeholder="\${off.mo}" value="\${moOffVal}" onchange="updateWeekOffset('\${art}',\${idx},'mo_offset',this.value)"></div>
            <span class="derived-chip mo">KW\${moW.kw}=\${moW.menge}</span>
          </div>
          <div class="lws-col">
            <div class="offset-row"><label>FR Vorlauf (Wo.):</label><input class="offset-in" type="number" min="0" max="8" placeholder="\${off.fr}" value="\${frOffVal}" onchange="updateWeekOffset('\${art}',\${idx},'fr_offset',this.value)"></div>
            \${frChips}
          </div>
          <div class="lws-col">
            <div class="offset-row"><label>TZ Vorlauf (Wo.):</label><input class="offset-in" type="number" min="0" max="8" placeholder="\${off.tz}" value="\${tzOffVal}" onchange="updateWeekOffset('\${art}',\${idx},'tz_offset',this.value)"></div>
            \${tzChips}
          </div>
        </div>
      </div>\`;
    }).join('');

    html += \`<tr>
      <td>
        <input type="text" value="\${art}" onchange="renameArtikel('\${art}', this.value)" style="font-weight:600">
      </td>
      <td colspan="4">
        \${liefRowsHtml}
        <span class="add-kw-btn" onclick="addLiefWeek('\${art}')">+ Liefertermin-KW</span>
      </td>
      <td><span class="row-del" onclick="deleteArtikel('\${art}')">🗑</span></td>
    </tr>\`;
  });

  document.getElementById('inputBody').innerHTML = html || '<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:20px">Keine Artikel</td></tr>';
  updateSaveBarState();
}

function renderDraftView() {
  if (activeView === 'bom') renderBomTable();
  if (activeView === 'input') renderInputTable();
  markDraftDirty();
}
function updateLiefWeek(art, idx, field, value) {
  const w = DRAFT[art].liefertermin[idx];
  if (field === 'menge') w.menge = parseFloat(value) || 0;
  else w[field] = parseInt(value) || w[field];
  renderDraftView();
}
function removeLiefWeek(art, idx) {
  DRAFT[art].liefertermin.splice(idx, 1);
  renderDraftView();
}
function addLiefWeek(art) {
  DRAFT[art].liefertermin.push({year: CURRENT_YEAR, kw: CURRENT_KW + 4, menge: 10});
  renderDraftView();
}
function updateBom(art, field, idx, key, value) {
  const line = DRAFT[art][field][idx];
  if (key === 'menge_per_stk' || key === 's_zt' || key === 'r_zt') {
    line[key] = value.trim() === '' ? null : (parseFloat(value) || 0);
  } else {
    line[key] = value.trim();
  }
  renderDraftView();
}
function updateMoField(art, key, value) {
  if (key === 'mo_s_zt') {
    const v = value.trim();
    DRAFT[art][key] = v === '' ? 0.5 : (parseFloat(v) === 0 ? 0 : (parseFloat(v) || 0.5));
  }
  else DRAFT[art][key] = value.trim();
  renderDraftView();
}
function updateWeekOffset(art, idx, field, value) {
  // field: 'mo_offset' | 'fr_offset' | 'tz_offset' - applies to a specific liefertermin week entry
  const v = value.trim();
  DRAFT[art].liefertermin[idx][field] = v === '' ? null : (parseInt(v) || 0);
  renderDraftView();
}
function addBomLine(art, field) {
  const prefix = field === 'tz_bom' ? '1' : '2';
  const parts = art.split('.');
  const base = parts[0];
  const suffix = (parts[1] || '0001').slice(-3).padStart(3,'0');
  DRAFT[art][field].push({ stage_art: base + '.' + prefix + suffix + 'b', menge_per_stk: 1, maschine: null, s_zt: null, r_zt: null });
  renderDraftView();
}
function removeBomLine(art, field, idx) {
  DRAFT[art][field].splice(idx, 1);
  renderDraftView();
}
function clearAllBom() {
  if (!confirm('Wirklich die komplette Stückliste (Tiefziehen, Fräsen, Montage-Zeiten) für ALLE Artikel löschen? Artikel-Nr und Liefertermine bleiben erhalten — beide Bereiche sind getrennt. Dies betrifft den aktuellen Entwurf — solange Sie nicht auf "Speichern" klicken, bleiben die Originaldaten erhalten und können mit "Verwerfen" wiederhergestellt werden.')) return;
  Object.keys(DRAFT).forEach(art => {
    DRAFT[art].tz_bom = [];
    DRAFT[art].fr_bom = [];
    DRAFT[art].mo_s_zt = 0.5;
    DRAFT[art].mo_a_platz = null;
  });
  renderDraftView();
}
function clearAllLiefertermin() {
  if (!confirm('Wirklich ALLE Liefertermin-Einträge für ALLE Artikel löschen? Die Stückliste (Tiefziehen/Fräsen/Montage) bleibt erhalten. Dies betrifft den aktuellen Entwurf — solange Sie nicht auf "Speichern" klicken, bleiben die Originaldaten erhalten und können mit "Verwerfen" wiederhergestellt werden.')) return;
  Object.keys(DRAFT).forEach(art => {
    DRAFT[art].liefertermin = [];
  });
  renderDraftView();
}
function addNewArtikelRow() {
  let n = 1;
  let newKey = 'NEU-' + n;
  while (DRAFT[newKey]) { n++; newKey = 'NEU-' + n; }
  DRAFT[newKey] = {
    liefertermin: [{year: CURRENT_YEAR, kw: CURRENT_KW + 4, menge: 10}],
    tz_bom: [], fr_bom: [],
    mo_s_zt: 0.7, mo_a_platz: null
  };
  renderDraftView();
}

// ─────────────────────────────────────────────
// EXCEL IMPORT — Liefertermin (KW, Artikel-Nr, Menge)
// Replaces all existing liefertermin entries for each artikel found in the file.
// New artikel not yet in DRAFT are created automatically (no BOM data yet).
// Imported rows go into the DRAFT, just like manual edits — review and click
// "Speichern" to apply them.
// ─────────────────────────────────────────────
function showImportStatus(message, isError, targetId) {
  const el = document.getElementById(targetId || 'excelImportStatus');
  el.innerHTML = \`<div class="import-status \${isError ? 'error' : 'success'}">\${message}</div>\`;
}

function findColumnIndex(headerRow, candidates) {
  for (let i = 0; i < headerRow.length; i++) {
    const cell = (headerRow[i] || '').toString().trim().toLowerCase();
    if (candidates.some(c => cell === c || cell.includes(c))) return i;
  }
  return -1;
}

function normalizeArtikelKey(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number') {
    // Excel sometimes stores "2341.9012" as a float; format consistently
    return Number.isInteger(v) ? String(v) : v.toString();
  }
  return v.toString().trim();
}

function handleExcelImport(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const wb = XLSX.read(data, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true });

      if (!rows.length) { showImportStatus('Die Datei enthält keine Zeilen.', true); return; }

      const header = rows[0];
      const kwIdx = findColumnIndex(header, ['kw', 'woche', 'week']);
      const artIdx = findColumnIndex(header, ['artikel', 'artikel-nr', 'artikelnummer', 'article']);
      const mengeIdx = findColumnIndex(header, ['menge', 'qty', 'quantity', 'stück', 'stueck']);

      if (kwIdx === -1 || artIdx === -1 || mengeIdx === -1) {
        showImportStatus('Spalten nicht erkannt. Bitte stellen Sie sicher, dass die Datei Spalten für KW, Artikel-Nr und Menge enthält (Reihenfolge egal).', true);
        return;
      }

      // Group imported rows by artikel: art -> [{year, kw, menge}]
      const importedByArt = {};
      let skipped = 0;
      for (let r = 1; r < rows.length; r++) {
        const row = rows[r];
        if (!row || row.length === 0) continue;
        const art = normalizeArtikelKey(row[artIdx]);
        const kw = parseInt(row[kwIdx]);
        const menge = parseFloat(row[mengeIdx]);
        if (!art || !kw || isNaN(menge)) { skipped++; continue; }
        if (!importedByArt[art]) importedByArt[art] = [];
        importedByArt[art].push({ year: CURRENT_YEAR, kw, menge });
      }

      const importedArts = Object.keys(importedByArt);
      if (!importedArts.length) {
        showImportStatus('Keine gültigen Zeilen gefunden (KW, Artikel-Nr und Menge müssen ausgefüllt sein).', true);
        return;
      }

      let newCount = 0, updatedCount = 0;
      importedArts.forEach(art => {
        // sort each artikel's imported weeks chronologically
        importedByArt[art].sort((a,b) => absWeek(a.year,a.kw) - absWeek(b.year,b.kw));
        if (DRAFT[art]) {
          // Replace existing liefertermin entries entirely, per artikel
          DRAFT[art].liefertermin = importedByArt[art];
          updatedCount++;
        } else {
          // Create new artikel with empty BOM (to be filled in later via Stückliste tab)
          DRAFT[art] = {
            liefertermin: importedByArt[art],
            tz_bom: [], fr_bom: [],
            mo_s_zt: 0.5, mo_a_platz: null
          };
          newCount++;
        }
      });

      let msg = \`Import in Entwurf übernommen: \${updatedCount} Artikel aktualisiert, \${newCount} neue Artikel angelegt. Bitte prüfen und auf "Speichern" klicken, um die Änderungen zu übernehmen.\`;
      if (skipped > 0) msg += \` \${skipped} Zeile(n) übersprungen (unvollständig).\`;
      showImportStatus(msg, false);
      renderDraftView();
    } catch (err) {
      showImportStatus('Fehler beim Lesen der Datei: ' + err.message, true);
    }
  };
  reader.readAsArrayBuffer(file);
  // reset the file input so the same file can be re-selected if needed
  document.getElementById('excelImportInput').value = '';
}

// ─────────────────────────────────────────────
// EXCEL IMPORT — Stückliste (BOM): one row per Artikel (or multiple rows for
// multi-part BOM), columns: Artikel-Nr, Tiefziehen-Nr, TZ-Maschine, TZ-S-Zt,
// TZ-R-Zt, TZ-Faktor, Fräsen-Nr, FR-Maschine, FR-S-Zt, FR-R-Zt, FR-Faktor,
// Montage-S-Zt, Arbeitsplatz. Replaces the complete BOM for each artikel found.
// ─────────────────────────────────────────────
function parseNumOrNull(v) {
  if (v === null || v === undefined || v === '') return null;
  const n = parseFloat(v);
  return isNaN(n) ? null : n;
}

function handleBomExcelImport(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const wb = XLSX.read(data, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true });

      if (!rows.length) { showImportStatus('Die Datei enthält keine Zeilen.', true, 'bomExcelImportStatus'); return; }

      const header = rows[0];
      const artIdx = findColumnIndex(header, ['artikel-nr', 'artikelnummer', 'artikel', 'article']);
      const tzNrIdx = findColumnIndex(header, ['tiefziehen-nr', 'tiefziehennr', 'tiefziehen nr', 'tz-nr', 'tz nr']);
      const tzMaschIdx = findColumnIndex(header, ['tz-maschine', 'tz maschine', 'tiefziehen-maschine']);
      const tzSztIdx = findColumnIndex(header, ['tz-s-zt', 'tz s-zt', 'tz szt']);
      const tzRztIdx = findColumnIndex(header, ['tz-r-zt', 'tz r-zt', 'tz rzt']);
      const tzFaktorIdx = findColumnIndex(header, ['tz-faktor', 'tz faktor']);
      const frNrIdx = findColumnIndex(header, ['fräsen-nr', 'fraesen-nr', 'fräsennr', 'fr-nr', 'fr nr']);
      const frMaschIdx = findColumnIndex(header, ['fr-maschine', 'fr maschine', 'fräsen-maschine', 'fraesen-maschine']);
      const frSztIdx = findColumnIndex(header, ['fr-s-zt', 'fr s-zt', 'fr szt']);
      const frRztIdx = findColumnIndex(header, ['fr-r-zt', 'fr r-zt', 'fr rzt']);
      const frFaktorIdx = findColumnIndex(header, ['fr-faktor', 'fr faktor']);
      const moSztIdx = findColumnIndex(header, ['montage-s-zt', 'montage s-zt', 'mo-s-zt', 'montage szt']);
      const aPlatzIdx = findColumnIndex(header, ['arbeitsplatz', 'a-platz']);

      if (artIdx === -1) {
        showImportStatus('Spalte "Artikel-Nr" nicht erkannt. Bitte prüfen Sie die Spaltenüberschriften.', true, 'bomExcelImportStatus');
        return;
      }

      // Group imported rows by artikel: art -> { tz_bom:[...], fr_bom:[...], mo_s_zt, mo_a_platz }
      const importedByArt = {};
      let skipped = 0;
      for (let r = 1; r < rows.length; r++) {
        const row = rows[r];
        if (!row || row.length === 0) continue;
        const art = normalizeArtikelKey(row[artIdx]);
        if (!art) { skipped++; continue; }

        if (!importedByArt[art]) importedByArt[art] = { tz_bom: [], fr_bom: [], mo_s_zt: null, mo_a_platz: null };
        const entry = importedByArt[art];

        const tzNr = tzNrIdx > -1 ? normalizeArtikelKey(row[tzNrIdx]) : null;
        if (tzNr) {
          entry.tz_bom.push({
            stage_art: tzNr,
            maschine: tzMaschIdx > -1 ? (row[tzMaschIdx] || null) : null,
            s_zt: tzSztIdx > -1 ? parseNumOrNull(row[tzSztIdx]) : null,
            r_zt: tzRztIdx > -1 ? parseNumOrNull(row[tzRztIdx]) : null,
            menge_per_stk: tzFaktorIdx > -1 ? (parseNumOrNull(row[tzFaktorIdx]) ?? 1) : 1,
          });
        }
        const frNr = frNrIdx > -1 ? normalizeArtikelKey(row[frNrIdx]) : null;
        if (frNr) {
          entry.fr_bom.push({
            stage_art: frNr,
            maschine: frMaschIdx > -1 ? (row[frMaschIdx] || null) : null,
            s_zt: frSztIdx > -1 ? parseNumOrNull(row[frSztIdx]) : null,
            r_zt: frRztIdx > -1 ? parseNumOrNull(row[frRztIdx]) : null,
            menge_per_stk: frFaktorIdx > -1 ? (parseNumOrNull(row[frFaktorIdx]) ?? 1) : 1,
          });
        }
        if (moSztIdx > -1) {
          const v = parseNumOrNull(row[moSztIdx]);
          if (v !== null) entry.mo_s_zt = v;
        }
        if (aPlatzIdx > -1 && row[aPlatzIdx]) {
          entry.mo_a_platz = row[aPlatzIdx].toString().trim();
        }
      }

      const importedArts = Object.keys(importedByArt);
      if (!importedArts.length) {
        showImportStatus('Keine gültigen Zeilen gefunden (Artikel-Nr muss ausgefüllt sein).', true, 'bomExcelImportStatus');
        return;
      }

      let newCount = 0, updatedCount = 0;
      importedArts.forEach(art => {
        const imp = importedByArt[art];
        if (DRAFT[art]) {
          // Replace the complete BOM for this artikel
          DRAFT[art].tz_bom = imp.tz_bom;
          DRAFT[art].fr_bom = imp.fr_bom;
          if (imp.mo_s_zt !== null) DRAFT[art].mo_s_zt = imp.mo_s_zt;
          if (imp.mo_a_platz !== null) DRAFT[art].mo_a_platz = imp.mo_a_platz;
          updatedCount++;
        } else {
          // New artikel from BOM import has no Liefertermin yet — can be added later
          DRAFT[art] = {
            liefertermin: [],
            tz_bom: imp.tz_bom,
            fr_bom: imp.fr_bom,
            mo_s_zt: imp.mo_s_zt !== null ? imp.mo_s_zt : 0.5,
            mo_a_platz: imp.mo_a_platz,
          };
          newCount++;
        }
      });

      let msg = \`Import in Entwurf übernommen: \${updatedCount} Artikel aktualisiert, \${newCount} neue Artikel angelegt. Bitte prüfen und auf "Speichern" klicken, um die Änderungen zu übernehmen.\`;
      if (skipped > 0) msg += \` \${skipped} Zeile(n) übersprungen (Artikel-Nr fehlte).\`;
      showImportStatus(msg, false, 'bomExcelImportStatus');
      renderDraftView();
    } catch (err) {
      showImportStatus('Fehler beim Lesen der Datei: ' + err.message, true, 'bomExcelImportStatus');
    }
  };
  reader.readAsArrayBuffer(file);
  document.getElementById('bomExcelImportInput').value = '';
}

function deleteArtikel(art) {
  if (confirm('Artikel ' + art + ' wirklich löschen?')) {
    delete DRAFT[art];
    renderDraftView();
  }
}
function clearArtikelBom(art) {
  if (confirm('Stückliste (Tiefziehen, Fräsen, Montage) für Artikel ' + art + ' löschen? Artikel-Nr und Liefertermine bleiben erhalten.')) {
    DRAFT[art].tz_bom = [];
    DRAFT[art].fr_bom = [];
    DRAFT[art].mo_s_zt = 0.5;
    DRAFT[art].mo_a_platz = null;
    renderDraftView();
  }
}
function renameArtikel(oldKey, newKey) {
  newKey = newKey.trim();
  if (!newKey || newKey === oldKey) { renderDraftView(); return; }
  if (DRAFT[newKey]) { alert('Artikel ' + newKey + ' existiert bereits!'); renderDraftView(); return; }
  DRAFT[newKey] = DRAFT[oldKey];
  delete DRAFT[oldKey];
  renderDraftView();
}

// ─────────────────────────────────────────────
// SUMMARY
// ─────────────────────────────────────────────
function renderSummary() {
  const cap = parseFloat(document.getElementById('capInput').value) || 40;
  const capWarn = parseFloat(document.getElementById('capWarnInput').value) || (cap + 10);
  const D = computeDerived();
  const arts = Object.keys(PLAN);

  document.getElementById('s-total').textContent = arts.length;
  document.getElementById('s-kw-lbl').textContent = \`KW \${CURRENT_KW}/\${CURRENT_YEAR} aktiv\`;

  const curKey = CURRENT_YEAR + '-' + CURRENT_KW;
  let tzSum = 0, frSum = 0;
  Object.values(D.tiefziehenGroups).forEach(g => { tzSum += g.weeksMap[curKey] || 0; });
  Object.values(D.fraesenGroups).forEach(g => { frSum += g.weeksMap[curKey] || 0; });
  document.getElementById('s-tz').textContent = tzSum ? tzSum.toFixed(1) : '—';
  document.getElementById('s-fr').textContent = frSum ? frSum.toFixed(1) : '—';

  const moMap = {};
  arts.forEach(art => {
    const szt = getMoSzt(art);
    (D.montageByArt[art] || []).forEach(w => {
      const key = w.year + '-' + w.kw;
      moMap[key] = (moMap[key] || 0) + szt * w.menge;
    });
  });
  document.getElementById('s-mo').textContent = (moMap[curKey] || 0).toFixed(1) + ' h';

  // Only consider the same visible 12-week window as the capacity chart/cards below,
  // so the warning card always matches what's actually shown on screen.
  const visibleWeeks = [];
  for (let i = 0; i < 12; i++) {
    let k = CURRENT_KW + i, y = CURRENT_YEAR;
    if (k > 52) { k -= 52; y += 1; }
    visibleWeeks.push(y + '-' + k);
  }
  let worstKey = null, worstDiff = 0;
  visibleWeeks.forEach(key => {
    const h = moMap[key] || 0;
    const diff = h - capWarn;
    if (diff > worstDiff) { worstDiff = diff; worstKey = key; }
  });
  const overCard = document.getElementById('s-over-card');
  if (worstKey) {
    const kwNum = worstKey.split('-')[1];
    overCard.classList.add('alert-card');
    document.getElementById('s-over-kw').textContent = kwNum;
    document.getElementById('s-over-val').style.color = 'var(--danger)';
    document.getElementById('s-over-val').textContent = '+' + worstDiff.toFixed(1) + 'h';
    document.getElementById('s-over-sub').textContent = 'Überlast — Umplanung nötig';
  } else {
    overCard.classList.remove('alert-card');
    document.getElementById('s-over-kw').textContent = '—';
    document.getElementById('s-over-val').style.color = 'var(--fest)';
    document.getElementById('s-over-val').textContent = 'OK';
    document.getElementById('s-over-sub').textContent = 'Keine Überlast';
  }

  document.getElementById('stat-total-art').textContent = arts.length;

  return { D, moMap };
}

function renderCapacity(moMap, D) {
  const cap = parseFloat(document.getElementById('capInput').value) || 40;
  const capWarn = parseFloat(document.getElementById('capWarnInput').value) || (cap + 10);
  const weeks = [];
  for (let i = 0; i < 12; i++) {
    let k = CURRENT_KW + i, y = CURRENT_YEAR;
    if (k > 52) { k -= 52; y += 1; }
    weeks.push({year:y, kw:k});
  }
  const grid = document.getElementById('capGrid');
  grid.innerHTML = weeks.map(({year,kw}) => {
    const key = year + '-' + kw;
    const used = moMap[key] || 0;
    const pct = Math.min((used / capWarn) * 100, 100);
    const over = used > capWarn;
    const nearFull = !over && used > cap;
    const festKW = isFest(year, kw);
    const barColor = over ? 'var(--danger)' : nearFull ? 'var(--warn)' : 'var(--mo-c)';
    const cardCls = over ? 'cap-card over' : nearFull ? 'cap-card warn' : 'cap-card';
    const statusTxt = over
      ? \`<span class="over-txt">+\${(used-capWarn).toFixed(1)}h ÜBERLAST</span>\`
      : nearFull ? \`<span class="warn-txt">+\${(used-cap).toFixed(1)}h Warnung (\${used.toFixed(1)}h)</span>\`
      : used > 0 ? \`<span class="ok-txt">\${used.toFixed(1)}h / \${cap}h</span>\`
      : \`<span style="color:var(--muted)">frei</span>\`;
    return \`<div class="\${cardCls}">
      <div class="cap-kw">KW \${kw} \${festKW?'🔒':''}<span>\${used>0?Math.round(pct)+'%':''}</span></div>
      <div class="cap-bar-bg"><div class="cap-bar-fill" style="width:\${pct}%;background:\${barColor}"></div></div>
      <div class="cap-detail">\${statusTxt}</div>
    </div>\`;
  }).join('');

  renderCapacityChart(weeks, moMap, cap, capWarn);
  renderOverloadPanel(weeks, moMap, cap, capWarn, D);
}

function renderOverloadPanel(weeks, moMap, cap, capWarn, D) {
  const panel = document.getElementById('overloadActionPanel');
  const overloadedWeeks = weeks.filter(({year,kw}) => (moMap[(year+'-'+kw)]||0) > capWarn);
  if (!overloadedWeeks.length) { panel.innerHTML = ''; return; }

  const rows = [];
  overloadedWeeks.forEach(({year,kw}) => {
    const key = year+'-'+kw;
    const used = moMap[key];
    const over = used - capWarn;
    // find artikel + specific liefertermin week contributing montage hours this week
    const contributors = [];
    Object.keys(PLAN).forEach(art => {
      const w = (D.montageByArt[art]||[]).find(x => x.year===year && x.kw===kw);
      if (w && w.menge) {
        const szt = getMoSzt(art);
        const liefIdx = PLAN[art].liefertermin.indexOf(w.srcWeek);
        contributors.push({ art, hours: szt * w.menge, liefIdx, liefKw: w.srcWeek.kw, liefYear: w.srcWeek.year });
      }
    });
    contributors.sort((a,b) => b.hours - a.hours);

    contributors.forEach((c, i) => {
      rows.push(\`<tr>
        <td style="font-weight:700;color:var(--danger)">\${i===0 ? 'KW'+kw+'/'+year : ''}</td>
        <td><span class="late-badge">+\${over.toFixed(1)}h Überlast</span></td>
        <td style="font-family:Calibri,'Segoe UI',Arial,sans-serif;font-weight:600">\${c.art}</td>
        <td style="text-align:center">KW\${c.liefKw}/\${c.liefYear}</td>
        <td style="text-align:center">\${c.hours.toFixed(1)}h</td>
        <td><button class="ov-shift-btn" onclick="shiftArtikelEarlier('\${c.art}',\${c.liefIdx})">→ Fräsen/Tiefziehen 1 Woche früher</button></td>
      </tr>\`);
    });
  });

  panel.innerHTML = \`
    <table class="detail overload-table">
      <thead><tr>
        <th>KW</th><th>Warnung</th><th>Artikel</th><th>Liefertermin</th><th>Montage Std.</th><th>Aktion</th>
      </tr></thead>
      <tbody>\${rows.join('')}</tbody>
    </table>\`;
}

function shiftArtikelEarlier(art, liefIdx) {
  const off = getOffsets();
  const w = PLAN[art].liefertermin[liefIdx];
  if (!w) return;
  const curFr = (typeof w.fr_offset === 'number') ? w.fr_offset : off.fr;
  const curTz = (typeof w.tz_offset === 'number') ? w.tz_offset : off.tz;
  w.fr_offset = curFr + 1;
  w.tz_offset = curTz + 1;
  // Keep the draft copy in sync so a later "Speichern" in Liefertermin Eingabe
  // doesn't silently undo this quick fix.
  if (DRAFT[art] && DRAFT[art].liefertermin[liefIdx]) {
    DRAFT[art].liefertermin[liefIdx].fr_offset = w.fr_offset;
    DRAFT[art].liefertermin[liefIdx].tz_offset = w.tz_offset;
  }
  renderAll();
}

function renderCapacityChart(weeks, moMap, cap, capWarn) {
  const svg = document.getElementById('capChart');
  if (!svg) return;

  const W = 900, H = 220;
  const padL = 40, padR = 16, padT = 18, padB = 30;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const n = weeks.length;
  const barSlot = chartW / n;
  const barW = Math.min(barSlot * 0.55, 36);

  const values = weeks.map(({year,kw}) => moMap[(year+'-'+kw)] || 0);
  const maxVal = Math.max(capWarn * 1.2, ...values, 1);

  function yFor(v) { return padT + chartH - (v / maxVal) * chartH; }

  // background zone bands: green (0..cap), yellow (cap..capWarn), red (capWarn..max)
  const capY = yFor(cap);
  const capWarnY = yFor(capWarn);
  const chartTop = padT;
  const chartBottom = padT + chartH;
  const zoneBands = \`
    <rect x="\${padL}" y="\${chartTop.toFixed(1)}" width="\${chartW.toFixed(1)}" height="\${Math.max(capWarnY-chartTop,0).toFixed(1)}" fill="var(--danger)" opacity="0.06"/>
    <rect x="\${padL}" y="\${capWarnY.toFixed(1)}" width="\${chartW.toFixed(1)}" height="\${Math.max(capY-capWarnY,0).toFixed(1)}" fill="var(--warn)" opacity="0.08"/>
    <rect x="\${padL}" y="\${capY.toFixed(1)}" width="\${chartW.toFixed(1)}" height="\${Math.max(chartBottom-capY,0).toFixed(1)}" fill="var(--fest)" opacity="0.06"/>\`;

  // gridlines (4 horizontal)
  let gridLines = '';
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const v = (maxVal / steps) * i;
    const y = yFor(v);
    gridLines += \`<line x1="\${padL}" y1="\${y}" x2="\${W-padR}" y2="\${y}" stroke="var(--border)" stroke-width="1"/>\`;
    gridLines += \`<text x="\${padL-8}" y="\${y+3}" text-anchor="end" font-size="9" fill="var(--muted)">\${Math.round(v)}</text>\`;
  }

  // bars
  let bars = '';
  let labels = '';
  weeks.forEach(({year,kw}, i) => {
    const v = values[i];
    const x = padL + i * barSlot + (barSlot - barW)/2;
    const y = yFor(v);
    const barH = (padT + chartH) - y;
    const over = v > capWarn;
    const nearFull = !over && v > cap;
    const color = over ? 'var(--danger)' : nearFull ? 'var(--warn)' : 'var(--mo-c)';
    const isCur = (year===CURRENT_YEAR && kw===CURRENT_KW);
    bars += \`<rect x="\${x.toFixed(1)}" y="\${y.toFixed(1)}" width="\${barW.toFixed(1)}" height="\${Math.max(barH,0).toFixed(1)}" fill="\${color}" rx="2" opacity="\${isCur?1:0.85}"/>\`;
    if (v > 0) {
      bars += \`<text x="\${(x+barW/2).toFixed(1)}" y="\${(y-4).toFixed(1)}" text-anchor="middle" font-size="9" fill="var(--text)" font-weight="600">\${v.toFixed(0)}</text>\`;
    }
    const labelColor = isCur ? 'var(--accent)' : 'var(--muted)';
    labels += \`<text x="\${(x+barW/2).toFixed(1)}" y="\${H-padB+14}" text-anchor="middle" font-size="9.5" fill="\${labelColor}" font-weight="\${isCur?700:400}">KW\${kw}</text>\`;
  });

  // two threshold lines (dashed): normal/warning boundary, and warning/overload boundary
  const capLine = \`<line x1="\${padL}" y1="\${capY.toFixed(1)}" x2="\${W-padR}" y2="\${capY.toFixed(1)}" stroke="var(--warn)" stroke-width="1.5" stroke-dasharray="6,4"/>
    <text x="\${W-padR}" y="\${(capY-5).toFixed(1)}" text-anchor="end" font-size="9.5" fill="var(--warn)" font-weight="700">Normal: \${cap}h</text>
    <line x1="\${padL}" y1="\${capWarnY.toFixed(1)}" x2="\${W-padR}" y2="\${capWarnY.toFixed(1)}" stroke="var(--danger)" stroke-width="1.5" stroke-dasharray="6,4"/>
    <text x="\${W-padR}" y="\${(capWarnY-5).toFixed(1)}" text-anchor="end" font-size="9.5" fill="var(--danger)" font-weight="700">Überlast: \${capWarn}h</text>\`;

  svg.innerHTML = \`
    \${zoneBands}
    \${gridLines}
    \${bars}
    \${capLine}
    \${labels}
    <line x1="\${padL}" y1="\${padT}" x2="\${padL}" y2="\${padT+chartH}" stroke="var(--border)" stroke-width="1"/>
    <line x1="\${padL}" y1="\${padT+chartH}" x2="\${W-padR}" y2="\${padT+chartH}" stroke="var(--border)" stroke-width="1"/>
  \`;
}

// ─────────────────────────────────────────────
// GANTT
// ─────────────────────────────────────────────
function renderGantt(D) {
  const weeks = [];
  for (let i = 0; i < KW_WINDOW; i++) {
    let k = CURRENT_KW + i, y = CURRENT_YEAR;
    if (k > 52) { k -= 52; y += 1; }
    weeks.push({year:y, kw:k});
  }
  const arts = getArtikelList();
  const showTZ = activeFilter === 'all' || activeFilter === 'TZ';
  const showFR = activeFilter === 'all' || activeFilter === 'FR';
  const showMO = activeFilter === 'all' || activeFilter === 'MO';
  const showLI = activeFilter === 'all' || activeFilter === 'LI';

  let html = '<thead><tr><th class="col-art">Artikel / Stufe</th>';
  weeks.forEach(({year,kw}) => {
    const isCur = (year===CURRENT_YEAR && kw===CURRENT_KW);
    const cls = isCur ? 'kw-curr' : isFest(year,kw) ? 'kw-fest' : 'kw-flex';
    html += \`<th class="\${cls}">KW\${kw}\${isCur?' ◀':isFest(year,kw)?' 🔒':''}</th>\`;
  });
  html += '</tr></thead><tbody>';

  arts.forEach(art => {
    const d = PLAN[art];
    const rowCount = (showLI?1:0) + (showMO?1:0) + (showFR?Math.max(d.fr_bom.length,1):0) + (showTZ?Math.max(d.tz_bom.length,1):0);
    let firstRow = true;

    function artCell() {
      if (firstRow) {
        firstRow = false;
        return \`<td class="art-cell" rowspan="\${rowCount}"><span class="art-name">\${art}</span></td>\`;
      }
      return '';
    }

    if (showLI) {
      html += \`<tr class="stage-row-li">\${artCell()}\`;
      weeks.forEach(({year,kw}) => {
        const w = d.liefertermin.find(x => x.year===year && x.kw===kw);
        html += \`<td class="stage-cell">\${w ? \`<span class="cb cb-li">LI:\${w.menge}\${isFest(year,kw)?'<span class="fm"></span>':''}</span>\` : ''}</td>\`;
      });
      html += '</tr>';
    }
    if (showMO) {
      html += \`<tr class="stage-row-mo">\${artCell()}\`;
      weeks.forEach(({year,kw}) => {
        const w = (D.montageByArt[art]||[]).find(x => x.year===year && x.kw===kw);
        html += \`<td class="stage-cell">\${w ? \`<span class="cb cb-mo">MO:\${w.menge}\${isFest(year,kw)?'<span class="fm"></span>':''}</span>\` : ''}</td>\`;
      });
      html += '</tr>';
    }
    if (showFR) {
      const frLines = D.fraesenLines[art] && D.fraesenLines[art].length ? D.fraesenLines[art] : [{stage_art:'—', weeks:[]}];
      frLines.forEach(line => {
        html += \`<tr class="stage-row-fr">\${artCell()}\`;
        weeks.forEach(({year,kw}) => {
          const w = line.weeks.find(x => x.year===year && x.kw===kw);
          html += \`<td class="stage-cell">\${(w && w.menge) ? \`<span class="cb cb-fr cb-wide">\${line.stage_art}<br>FR:\${w.menge}\${isFest(year,kw)?'<span class="fm"></span>':''}</span>\` : ''}</td>\`;
        });
        html += '</tr>';
      });
    }
    if (showTZ) {
      const tzLines = D.tiefziehenLines[art] && D.tiefziehenLines[art].length ? D.tiefziehenLines[art] : [{stage_art:'—', weeks:[]}];
      tzLines.forEach(line => {
        html += \`<tr class="stage-row-tz">\${artCell()}\`;
        weeks.forEach(({year,kw}) => {
          const w = line.weeks.find(x => x.year===year && x.kw===kw);
          html += \`<td class="stage-cell">\${(w && w.menge) ? \`<span class="cb cb-tz cb-wide">\${line.stage_art}<br>TZ:\${w.menge}\${isFest(year,kw)?'<span class="fm"></span>':''}</span>\` : ''}</td>\`;
        });
        html += '</tr>';
      });
    }
  });
  html += '</tbody>';
  document.getElementById('ganttTable').innerHTML = html;
}

// ─────────────────────────────────────────────
// DETAIL TABLE
// ─────────────────────────────────────────────
function renderDetail(D) {
  const arts = getArtikelList();
  let rows = '';
  const seenFrStage = new Set(), seenTzStage = new Set();

  arts.forEach(art => {
    const d = PLAN[art];

    if (activeFilter === 'all' || activeFilter === 'LI') {
      d.liefertermin.forEach(w => {
        const fest = isFest(w.year, w.kw);
        rows += rowHtml(art, 'LI', 'Lieferung', 'pill-li', '—', w.menge, '—', w.kw, w.year, fest, null);
      });
    }
    if (activeFilter === 'all' || activeFilter === 'MO') {
      (D.montageByArt[art]||[]).forEach(w => {
        const fest = isFest(w.year, w.kw);
        const std = (getMoSzt(art) * w.menge).toFixed(1) + 'h';
        rows += rowHtml(art, 'MO', 'Montage', 'pill-mo', d.mo_a_platz||'—', w.menge, std, w.kw, w.year, fest, null);
      });
    }
    if (activeFilter === 'all' || activeFilter === 'FR') {
      (D.fraesenLines[art]||[]).forEach(line => {
        if (seenFrStage.has(line.stage_art)) return;
        seenFrStage.add(line.stage_art);
        const g = D.fraesenGroups[line.stage_art];
        Object.entries(g.weeksMap).sort().forEach(([key,menge]) => {
          const [year,kw] = key.split('-').map(Number);
          const fest = isFest(year, kw);
          const label = g.artikel.length > 1 ? g.artikel.join('+') : art;
          rows += rowHtml(label, 'FR', 'Fräsen', 'pill-fr', line.stage_art+' / '+(line.maschine||'—'), menge.toFixed(2), '—', kw, year, fest, null);
        });
      });
    }
    if (activeFilter === 'all' || activeFilter === 'TZ') {
      (D.tiefziehenLines[art]||[]).forEach(line => {
        if (seenTzStage.has(line.stage_art)) return;
        seenTzStage.add(line.stage_art);
        const g = D.tiefziehenGroups[line.stage_art];
        Object.entries(g.weeksMap).sort().forEach(([key,menge]) => {
          const [year,kw] = key.split('-').map(Number);
          const fest = isFest(year, kw);
          const label = g.artikel.length > 1 ? g.artikel.join('+') : art;
          rows += rowHtml(label, 'TZ', 'Tiefziehen', 'pill-tz', line.stage_art+' / '+(line.maschine||'—'), menge.toFixed(2), '—', kw, year, fest, null);
        });
      });
    }
  });
  document.getElementById('detailBody').innerHTML = rows || '<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:20px">Keine Daten</td></tr>';
}

function rowHtml(art, stKey, stLabel, pillCls, stageInfo, menge, std, kw, year, fest, kombi) {
  return \`<tr>
    <td style="font-family:Calibri,'Segoe UI',Arial,sans-serif;font-size:11px">\${art}</td>
    <td><span class="stage-pill \${pillCls}">\${stKey} · \${stLabel}</span></td>
    <td style="font-size:11px;color:var(--muted)">\${stageInfo}</td>
    <td style="text-align:center">\${menge}</td>
    <td style="text-align:center;color:var(--mo-c)">\${std}</td>
    <td style="text-align:center;font-weight:600">KW\${kw}/\${year}</td>
    <td style="text-align:center">—</td>
    <td class="\${fest?'st-fest':'st-flex'}">\${fest?'🔒 FEST':'~ FLEX'}</td>
    <td style="text-align:center;font-size:10px;color:var(--accent2)">\${kombi || '—'}</td>
  </tr>\`;
}

// ─────────────────────────────────────────────
// DASHBOARD — "Diese Woche" view + late detection
// ─────────────────────────────────────────────
function renderDashboard(D) {
  document.getElementById('dashKW').textContent = \`\${CURRENT_KW} / \${CURRENT_YEAR}\`;
  const curKey = CURRENT_YEAR + '-' + CURRENT_KW;
  const arts = getArtikelList();

  // TZ this week (deduplicated by stage_art)
  const tzItems = [];
  const seenTz = new Set();
  arts.forEach(art => {
    (D.tiefziehenLines[art]||[]).forEach(line => {
      if (seenTz.has(line.stage_art)) return;
      const g = D.tiefziehenGroups[line.stage_art];
      const menge = g.weeksMap[curKey];
      if (menge) {
        seenTz.add(line.stage_art);
        tzItems.push({ ident: line.stage_art, stageArt: line.stage_art, label: g.artikel.join('+'), menge, maschine: line.maschine });
      }
    });
  });

  // FR this week
  const frItems = [];
  const seenFr = new Set();
  arts.forEach(art => {
    (D.fraesenLines[art]||[]).forEach(line => {
      if (seenFr.has(line.stage_art)) return;
      const g = D.fraesenGroups[line.stage_art];
      const menge = g.weeksMap[curKey];
      if (menge) {
        seenFr.add(line.stage_art);
        frItems.push({ ident: line.stage_art, stageArt: line.stage_art, label: g.artikel.join('+'), menge, maschine: line.maschine });
      }
    });
  });

  // MO this week (per artikel, not combined)
  const moItems = [];
  arts.forEach(art => {
    const w = (D.montageByArt[art]||[]).find(x => x.year===CURRENT_YEAR && x.kw===CURRENT_KW);
    if (w) moItems.push({ ident: art, stageArt: null, label: art, menge: w.menge, maschine: PLAN[art].mo_a_platz });
  });

  // LI this week
  const liItems = [];
  arts.forEach(art => {
    const w = PLAN[art].liefertermin.find(x => x.year===CURRENT_YEAR && x.kw===CURRENT_KW);
    if (w) liItems.push({ ident: art, stageArt: null, label: art, menge: w.menge, maschine: null });
  });

  function renderDashList(containerId, items, stage) {
    const el = document.getElementById(containerId);
    if (!items.length) { el.innerHTML = '<div class="dash-empty">Keine Posten diese Woche</div>'; return; }
    el.innerHTML = items.map(it => {
      const done = isDone(stage, it.ident, CURRENT_YEAR, CURRENT_KW);
      const stageArtLine = it.stageArt ? \`<span class="di-stageart">\${it.stageArt}</span>\` : '';
      return \`<div class="dash-item \${done?'done':''}">
        \${stageArtLine}
        <span class="di-art">\${it.label}\${it.maschine ? ' <span style="color:var(--muted);font-weight:400">/ '+it.maschine+'</span>' : ''}</span>
        <div class="di-meta">
          <span>Menge: \${typeof it.menge==='number' ? it.menge.toFixed(it.menge%1?2:0) : it.menge}</span>
          <label class="di-check"><input type="checkbox" \${done?'checked':''} onchange="toggleDone('\${stage}','\${it.ident}',\${CURRENT_YEAR},\${CURRENT_KW})"> erledigt</label>
        </div>
      </div>\`;
    }).join('');
  }

  renderDashList('dashTZ', tzItems, 'TZ');
  renderDashList('dashFR', frItems, 'FR');
  renderDashList('dashMO', moItems, 'MO');
  renderDashList('dashLI', liItems, 'LI');

  // ── Late items: scan all stages, all weeks in the past, not done ──
  const lateRows = [];
  function scanLate(stage, label, pillCls, groupsOrItems, isGrouped) {
    if (isGrouped) {
      Object.entries(groupsOrItems).forEach(([stageArt, g]) => {
        Object.entries(g.weeksMap).forEach(([key, menge]) => {
          const [year, kw] = key.split('-').map(Number);
          if (isLate(stage, stageArt, year, kw) && menge) {
            lateRows.push({ art: g.artikel.join('+'), stage, label, pillCls, stageArt, menge, year, kw });
          }
        });
      });
    }
  }
  scanLate('TZ', 'Tiefziehen', 'pill-tz', D.tiefziehenGroups, true);
  scanLate('FR', 'Fräsen', 'pill-fr', D.fraesenGroups, true);
  // MO per artikel
  Object.keys(PLAN).forEach(art => {
    (D.montageByArt[art]||[]).forEach(w => {
      if (isLate('MO', art, w.year, w.kw) && w.menge) {
        lateRows.push({ art, stage:'MO', label:'Montage', pillCls:'pill-mo', stageArt: PLAN[art].mo_a_platz||'—', menge: w.menge, year:w.year, kw:w.kw });
      }
    });
  });
  // LI per artikel
  Object.keys(PLAN).forEach(art => {
    PLAN[art].liefertermin.forEach(w => {
      if (isLate('LI', art, w.year, w.kw) && w.menge) {
        lateRows.push({ art, stage:'LI', label:'Lieferung', pillCls:'pill-li', stageArt:'—', menge: w.menge, year:w.year, kw:w.kw });
      }
    });
  });

  lateRows.sort((a,b) => weeksOverdue(b.year,b.kw) - weeksOverdue(a.year,a.kw));

  const lateBody = document.getElementById('lateBody');
  if (!lateRows.length) {
    lateBody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--fest);padding:16px">✓ Keine Verspätungen — alles im Plan</td></tr>';
  } else {
    lateBody.innerHTML = lateRows.map(r => {
      const ov = weeksOverdue(r.year, r.kw);
      return \`<tr class="late-row">
        <td style="font-family:Calibri,'Segoe UI',Arial,sans-serif">\${r.art}</td>
        <td><span class="stage-pill \${r.pillCls}">\${r.stage} · \${r.label}</span></td>
        <td style="font-family:Calibri,'Segoe UI',Arial,sans-serif;color:var(--muted)">\${r.stageArt}</td>
        <td style="text-align:center">\${typeof r.menge==='number' ? r.menge.toFixed(r.menge%1?2:0) : r.menge}</td>
        <td style="text-align:center">KW\${r.kw}/\${r.year}</td>
        <td style="text-align:center"><span class="late-badge">+\${ov} Wo.</span></td>
        <td style="text-align:center"><label class="di-check"><input type="checkbox" onchange="toggleDone('\${r.stage}','\${r.stage==='MO'||r.stage==='LI'?r.art:r.stageArt}',\${r.year},\${r.kw})"> erledigt</label></td>
      </tr>\`;
    }).join('');
  }
}

function setTzFrFilter(f, btn) {
  tzfrFilter = f;
  btn.parentElement.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTzFrOverview(computeDerived());
}

function renderTzFrOverview(D) {
  const rows = [];

  function collect(groups, stage, stageLabel) {
    Object.entries(groups).forEach(([stageArt, g]) => {
      const weeks = Object.keys(g.weeksMap)
        .map(key => { const [year,kw] = key.split('-').map(Number); return {year,kw,menge:g.weeksMap[key]}; })
        .filter(w => w.menge)
        .sort((a,b) => absWeek(a.year,a.kw) - absWeek(b.year,b.kw));
      if (!weeks.length) return;

      let anyLate = false, allDone = true;
      const plannedChips = [];
      const actualChips = [];
      weeks.forEach(w => {
        const done = isDone(stage, stageArt, w.year, w.kw);
        const late = isPast(w.year, w.kw) && !done;
        if (late) anyLate = true;
        if (!done) allDone = false;
        const cls = done ? 'done' : late ? 'late' : '';
        plannedChips.push(\`<span class="tzfr-kw-chip \${cls}">KW\${w.kw}/\${w.year}</span>\`);
        if (done) {
          const at = getDoneAt(stage, stageArt, w.year, w.kw);
          const onTime = at && absWeek(at.year, at.kw) <= absWeek(w.year, w.kw);
          actualChips.push(\`<span class="tzfr-kw-chip \${onTime?'done':'late'}">KW\${at.kw}/\${at.year}</span>\`);
        } else {
          actualChips.push(\`<span class="tzfr-kw-chip">—</span>\`);
        }
      });

      let statusIcon;
      if (allDone) statusIcon = \`<span class="tzfr-status-ontime" title="Erledigt">✓</span>\`;
      else if (anyLate) statusIcon = \`<span class="tzfr-status-late" title="Verspätet">⚠</span>\`;
      else statusIcon = \`<span class="tzfr-status-pending" title="Ausstehend">…</span>\`;

      rows.push({ stage, stageLabel, stageArt, artikel: g.artikel.join(', '), plannedChips: plannedChips.join(' '), actualChips: actualChips.join(' '), statusIcon, sortKey: absWeek(weeks[0].year, weeks[0].kw) });
    });
  }

  // Montage and Lieferung are per-artikel (not grouped by a shared stage-Art-Nr like TZ/FR)
  function collectPerArtikel(weeksByArt, stage, stageLabel, labelFn) {
    Object.keys(PLAN).forEach(art => {
      const weeks = (weeksByArt[art] || []).filter(w => w.menge).sort((a,b) => absWeek(a.year,a.kw) - absWeek(b.year,b.kw));
      if (!weeks.length) return;

      let anyLate = false, allDone = true;
      const plannedChips = [];
      const actualChips = [];
      weeks.forEach(w => {
        const done = isDone(stage, art, w.year, w.kw);
        const late = isPast(w.year, w.kw) && !done;
        if (late) anyLate = true;
        if (!done) allDone = false;
        const cls = done ? 'done' : late ? 'late' : '';
        plannedChips.push(\`<span class="tzfr-kw-chip \${cls}">KW\${w.kw}/\${w.year}</span>\`);
        if (done) {
          const at = getDoneAt(stage, art, w.year, w.kw);
          const onTime = at && absWeek(at.year, at.kw) <= absWeek(w.year, w.kw);
          actualChips.push(\`<span class="tzfr-kw-chip \${onTime?'done':'late'}">KW\${at.kw}/\${at.year}</span>\`);
        } else {
          actualChips.push(\`<span class="tzfr-kw-chip">—</span>\`);
        }
      });

      let statusIcon;
      if (allDone) statusIcon = \`<span class="tzfr-status-ontime" title="Erledigt">✓</span>\`;
      else if (anyLate) statusIcon = \`<span class="tzfr-status-late" title="Verspätet">⚠</span>\`;
      else statusIcon = \`<span class="tzfr-status-pending" title="Ausstehend">…</span>\`;

      rows.push({ stage, stageLabel, stageArt: labelFn(art), artikel: art, plannedChips: plannedChips.join(' '), actualChips: actualChips.join(' '), statusIcon, sortKey: absWeek(weeks[0].year, weeks[0].kw) });
    });
  }

  if (tzfrFilter === 'all' || tzfrFilter === 'TZ') collect(D.tiefziehenGroups, 'TZ', 'Tiefziehen');
  if (tzfrFilter === 'all' || tzfrFilter === 'FR') collect(D.fraesenGroups, 'FR', 'Fräsen');
  if (tzfrFilter === 'all' || tzfrFilter === 'MO') collectPerArtikel(D.montageByArt, 'MO', 'Montage', art => PLAN[art].mo_a_platz || '—');
  if (tzfrFilter === 'all' || tzfrFilter === 'LI') {
    const liByArt = {};
    Object.keys(PLAN).forEach(art => { liByArt[art] = PLAN[art].liefertermin; });
    collectPerArtikel(liByArt, 'LI', 'Lieferung', () => '—');
  }

  rows.sort((a,b) => a.sortKey - b.sortKey);

  const pillCls = { TZ: 'pill-tz', FR: 'pill-fr', MO: 'pill-mo', LI: 'pill-li' };
  const body = rows.map(r => \`<tr>
    <td><span class="stage-pill \${pillCls[r.stage]}">\${r.stage}</span></td>
    <td style="font-family:Calibri,'Segoe UI',Arial,sans-serif;font-weight:600">\${r.stageArt}</td>
    <td style="font-family:Calibri,'Segoe UI',Arial,sans-serif;color:var(--muted);font-size:11px">\${r.artikel}</td>
    <td>\${r.plannedChips}</td>
    <td>\${r.actualChips}</td>
    <td style="text-align:center;font-size:15px">\${r.statusIcon}</td>
  </tr>\`).join('');

  document.getElementById('tzfrOverviewBody').innerHTML = body || '<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:20px">Keine Daten</td></tr>';
}

function renderAll() {
  const { D, moMap } = renderSummary();
  renderCapacity(moMap, D);
  if (activeView === 'dashboard') renderDashboard(D);
  if (activeView === 'bom') renderBomTable();
  if (activeView === 'input') renderInputTable();
  if (activeView === 'gantt') renderGantt(D);
  if (activeView === 'kwoverview') renderTzFrOverview(D);
}

if (CURRENT_USER) {
  showApp();
} else {
  document.getElementById('currentKW').textContent = \`KW \${CURRENT_KW} / \${CURRENT_YEAR}\`;
}

// Override attemptLogin to use real server auth
const _origAttemptLogin = attemptLogin;
attemptLogin = async function() {
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value;
  const errEl = document.getElementById('loginError');
  errEl.classList.remove('show');
  try {
    const user = await apiLogin(u, p);
    CURRENT_USER = {name: user.username, role: user.role};
    showToast('⏳ Daten werden geladen...', false);
    const {plan} = await apiLoadPlan();
    PLAN = plan;
    DRAFT = JSON.parse(JSON.stringify(PLAN));
    showToast('✓ Verbunden — Daten geladen', false);
    showApp();
    // Show global save button only for Planer
    const saveBtn = document.getElementById('globalSaveBtn');
    if (saveBtn) saveBtn.style.display = user.role === 'planer' ? 'inline-block' : 'none';
  } catch(e) {
    errEl.textContent = e.message || 'Benutzername oder Passwort falsch.';
    errEl.classList.add('show');
  }
};

// Also hook into existing saveDraft to auto-push to GitHub
const _origSaveDraft = saveDraft;
saveDraft = async function() {
  _origSaveDraft();
  try {
    await apiSavePlan(PLAN);
    showToast('✓ Dauerhaft gespeichert — ' + new Date().toLocaleTimeString('de-DE'), false);
  } catch(e) {
    showToast('⚠ Fehler beim Speichern: ' + e.message, true);
  }
};

// Override logout
const _origLogout = logout;
logout = async function() {
  await apiLogout();
  _origLogout();
};

// Auto-restore session on page reload
(async function() {
  if (AUTH_TOKEN) {
    try {
      const saved = sessionStorage.getItem('bw_user');
      if (saved) CURRENT_USER = JSON.parse(saved);
      const {plan} = await apiLoadPlan();
      PLAN = plan;
      DRAFT = JSON.parse(JSON.stringify(PLAN));
      showApp();
      const saveBtn = document.getElementById('globalSaveBtn');
      if (saveBtn && CURRENT_USER && CURRENT_USER.role === 'planer') saveBtn.style.display = 'inline-block';
    } catch(e) {
      AUTH_TOKEN = null;
      sessionStorage.removeItem('bw_token');
      sessionStorage.removeItem('bw_user');
    }
  }
})();

</script>
</body>
</html>
`;

app.use((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(FRONTEND_HTML);
});

app.listen(PORT, () => {
  console.log('✓ BW Planungstool running on port', PORT);
  console.log('  GitHub repo:', GITHUB_REPO);
  if (!GITHUB_TOKEN) console.warn('  ⚠ No GITHUB_TOKEN set — saves will fail!');
});
