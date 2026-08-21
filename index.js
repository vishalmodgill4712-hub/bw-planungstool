const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

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

let memoryCache = null;
const sessions  = {};

async function githubGet() {
  if (memoryCache) return memoryCache;
  console.log('Loading from GitHub:', GITHUB_REPO + '/' + DATA_FILE);
  const r = await fetch(GITHUB_API, {
    headers: { 'Authorization': `token ${GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json' }
  });
  console.log('GitHub GET status:', r.status);
  if (r.status === 404) {
    console.log('No saved data yet — using initial data');
    memoryCache = { plan: INITIAL_DATA, done_status: {}, updated_at: new Date().toISOString(), updated_by: 'system', sha: null };
    return memoryCache;
  }
  if (!r.ok) throw new Error('GitHub GET failed: ' + r.status);
  const file = await r.json();
  const content = Buffer.from(file.content, 'base64').toString('utf8');
  const parsed = JSON.parse(content);
  console.log('Loaded from GitHub — Artikel:', Object.keys(parsed.plan || {}).length, '| By:', parsed.updated_by);
  memoryCache = { ...parsed, sha: file.sha };
  return memoryCache;
}

async function githubSave(planData, doneStatus, username) {
  const now = new Date().toISOString();
  const payload = { plan: planData, done_status: doneStatus || {}, updated_at: now, updated_by: username };
  const content = Buffer.from(JSON.stringify(payload, null, 2)).toString('base64');
  if (!memoryCache || !memoryCache.sha) { try { await githubGet(); } catch(e) {} }
  const body = {
    message: `Gespeichert von ${username}`,
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
  console.log('Saved to GitHub by', username);
  return { ok: true, saved_at: now };
}

const USERS = [
  { name: 'Modu',        password: 'planung2026', role: 'planer' },
  { name: 'Planer',      password: 'planer123',   role: 'planer' },
  { name: 'Mitarbeiter', password: 'team123',     role: 'mitarbeiter' },
];

app.use(express.json({ limit: '20mb' }));

function auth(req, res, next) {
  const s = sessions[req.headers['x-auth-token']];
  if (!s) return res.status(401).json({ error: 'Not authenticated' });
  req.user = s;
  next();
}
function planersOnly(req, res, next) {
  if (req.user.role !== 'planer') return res.status(403).json({ error: 'Planer only' });
  next();
}

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

app.get('/api/plan', async (req, res) => {
  try { res.json(await githubGet()); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/plan', async (req, res) => {
  const { plan, done_status } = req.body || {};
  if (!plan) return res.status(400).json({ error: 'No data' });
  try { res.json(await githubSave(plan, done_status || {}, req.user.username)); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

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

  header { background: var(--bg); border-bottom: 2px solid var(--accent); padding: 12px 28px; display: flex; align-items: center; gap: 16px; box-shadow: var(--shadow-sm); }
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
  .sb-h { font-size: 10px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--accent); font-weight: 700; padding: 0 6px 0 8px; margin-bottom: 8px; border-left: 2px solid var(--accent); }
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
  .sum-card { background: var(--card); border: 1px solid var(--border); border-top: 3px solid transparent; border-radius: var(--radius); padding: 14px 16px; box-shadow: var(--shadow-sm); transition: border-top-color .15s; }
  .sum-card:hover { border-top-color: var(--accent); }
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

  .view-tabs { display: flex; gap: 2px; margin-bottom: 20px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 4px; width: fit-content; }
  .view-tab { background: transparent; border: none; border-radius: 6px; color: var(--muted); font-size: 12.5px; font-weight: 500; padding: 8px 16px; cursor: pointer; transition: all .12s; position: relative; }
  .view-tab:hover { color: var(--text); }
  .view-tab.active { background: var(--bg); color: var(--accent); font-weight: 700; box-shadow: var(--shadow-sm); }
  .view-tab.active::after { content: ''; position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); width: 20px; height: 2px; background: var(--accent); border-radius: 2px; }

  .gantt-wrap { overflow-x: auto; }
  table.gantt { width: 100%; border-collapse: collapse; min-width: 1300px; }
  .gantt th { background: var(--surface); border: 1px solid var(--border); padding: 7px 8px; font-size: 10.5px; font-weight: 600; text-align: center; color: var(--muted); white-space: nowrap; }
  #ganttTableModal thead { position: sticky; top: 0; z-index: 10; }
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

  .cb { display: inline-flex; align-items: center; justify-content: center; border-radius: 4px; font-size: 9.5px; font-weight: 700; padding: 3px 6px; letter-spacing: .2px; min-width: 38px; gap: 2px; margin: 1px; position: relative; cursor: pointer; }
  .cb:hover { opacity: .8; transform: scale(1.05); transition: all .1s; }
  .gantt-li-cell { display: flex; align-items: center; justify-content: center; gap: 2px; }
  .gantt-shift-btn { font-size: 10px; color: var(--muted); cursor: pointer; padding: 2px 3px; border-radius: 3px; opacity: 0; transition: opacity .15s; line-height: 1; }
  .gantt-li-cell:hover .gantt-shift-btn { opacity: 1; }
  .gantt-shift-btn:hover { background: var(--accent); color: #fff; opacity: 1 !important; }
  .cb.done-cell { opacity: .5; }
  .cb.done-cell::after { content: '✓'; position: absolute; top: -6px; right: -6px; background: var(--fest); color: #fff; border-radius: 50%; width: 14px; height: 14px; font-size: 9px; display: flex; align-items: center; justify-content: center; font-weight: 800; }
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

  /* ── Gantt Full-Screen Modal ───────────────────────────────── */
  #ganttModal { display:none; position:fixed; inset:0; z-index:2000; background:rgba(10,15,25,.75); backdrop-filter:blur(4px); }
  #ganttModal.open { display:flex; flex-direction:column; }
  .gantt-modal-inner { background:#f4f7fb; margin:16px; border-radius:14px; display:flex; flex-direction:column; flex:1; overflow:hidden; box-shadow:0 16px 64px rgba(0,0,0,.35); }
  .gantt-modal-header { background:#006EB7; padding:14px 22px; display:flex; align-items:center; gap:14px; flex-shrink:0; }
  .gantt-modal-title { font-family:Calibri,Arial,sans-serif; font-size:15px; font-weight:800; color:#fff; letter-spacing:.8px; text-transform:uppercase; flex:1; }
  .gantt-modal-close { background:rgba(255,255,255,.18); border:1px solid rgba(255,255,255,.3); border-radius:8px; width:34px; height:34px; cursor:pointer; font-size:16px; color:#fff; display:flex; align-items:center; justify-content:center; transition:background .12s; }
  .gantt-modal-close:hover { background:rgba(220,38,38,.85); border-color:transparent; }
  .gantt-modal-body { flex:1; overflow:auto; background:#fff; }
  #ganttTableModal { border-collapse:collapse; width:100%; font-family:Calibri,Arial,sans-serif; }
  #ganttTableModal thead th { position:sticky; top:0; background:#1e293b; color:#fff; font-size:11px; font-weight:700; padding:9px 8px; text-align:center; white-space:nowrap; z-index:10; border-right:1px solid #334155; }
  #ganttTableModal thead th.col-art { background:#006EB7; text-align:left; padding-left:16px; font-size:12px; letter-spacing:.3px; min-width:130px; }
  #ganttTableModal thead th.kw-curr { background:#f59e0b; color:#1c1c1c; font-weight:900; }
  #ganttTableModal .art-cell { background:#f0f6ff; border-right:3px solid #006EB7; font-size:12px; font-weight:800; color:#006EB7; padding:8px 12px; white-space:nowrap; vertical-align:middle; }
  #ganttTableModal .stage-row-li > td { background:#f0fdf4; border-bottom:1px solid #bbf7d0; }
  #ganttTableModal .stage-row-mo > td { background:#eff6ff; border-bottom:1px solid #bfdbfe; }
  #ganttTableModal .stage-row-fr > td { background:#fffbeb; border-bottom:1px solid #fde68a; }
  #ganttTableModal .stage-row-tz > td { background:#faf5ff; border-bottom:1px solid #e9d5ff; }
  #ganttTableModal .stage-cell { padding:4px; text-align:center; vertical-align:middle; border-right:1px solid #e2e8f0; min-width:68px; }
  #ganttTableModal .gantt-li-cell { display:flex; align-items:center; justify-content:center; gap:2px; }
  #ganttTableModal .cb { display:inline-flex; align-items:center; justify-content:center; border-radius:6px; font-size:10px; font-weight:800; padding:5px 8px; white-space:nowrap; position:relative; cursor:pointer; font-family:Calibri,Arial,sans-serif; transition:transform .1s,box-shadow .1s; }
  #ganttTableModal .cb:hover { transform:scale(1.1); box-shadow:0 2px 8px rgba(0,0,0,.2); }
  #ganttTableModal .cb-li { background:#16a34a; color:#fff; }
  #ganttTableModal .cb-mo { background:#0369a1; color:#fff; }
  #ganttTableModal .cb-fr { background:#b45309; color:#fff; }
  #ganttTableModal .cb-tz { background:#6d28d9; color:#fff; }
  #ganttTableModal .cb.done-cell { opacity:.4; }
  #ganttTableModal .cb.done-cell::after { content:'✓'; position:absolute; top:-7px; right:-7px; background:#16a34a; color:#fff; border-radius:50%; width:15px; height:15px; font-size:10px; display:flex; align-items:center; justify-content:center; font-weight:900; border:2px solid #fff; box-shadow:0 1px 3px rgba(0,0,0,.2); }
  #ganttTableModal .cb.draggable { cursor:grab; }
  #ganttTableModal .stage-cell.drag-target { background:rgba(0,110,183,.15) !important; outline:2px dashed #006EB7; outline-offset:-2px; }
  #ganttTableModal .fm { display:inline-block; width:5px; height:5px; background:#f59e0b; border-radius:50%; margin-left:3px; vertical-align:middle; }

  /* Drag styles */
  .cb.draggable { cursor:grab; }
  .cb.draggable:active { cursor:grabbing; }
  .cb.drag-over { outline:2px dashed var(--accent); outline-offset:2px; }
  .stage-cell.drag-target { background:rgba(0,110,183,.08); }
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

<div id="loginScreen" style="display:none">
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

<div id="appRoot">
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
  <div class="user-menu" style="display:none">
    <span class="user-name" id="userNameDisplay">—</span>
    <span class="role-badge" id="userRoleBadge">—</span>
    <button id="globalSaveBtn" class="btn-small btn-primary" onclick="globalSave()">💾 Speichern</button>
    <button class="logout-btn" onclick="logout()">Abmelden</button>
  </div>
</header>

<div class="main">
  <aside class="sidebar">
    
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
      <button class="view-tab" onclick="setView('dashboard',this)">Diese Woche</button>
      <button class="view-tab" onclick="setView('bom',this)">Stückliste</button>
      <button class="view-tab" onclick="setView('input',this)">Liefertermin</button>
      <button class="view-tab active" onclick="setView('gantt',this)">Gantt</button>
      <button class="view-tab" onclick="setView('kwoverview',this)">Erledigt</button>
      <button class="view-tab" onclick="setView('overload',this)">Überlast</button>
    </div>

    <!-- DASHBOARD VIEW (default) -->
    <div id="view-dashboard" class="hidden">
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

    <div id="view-gantt">
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

<!-- ── Gantt Full-Screen Modal ─────────────────────────────────── -->
<div id="ganttModal">
  <div class="gantt-modal-inner">
    <div class="gantt-modal-header">
      <div class="gantt-modal-title">📊 Gantt / KW-Übersicht</div>
      <div class="gantt-modal-actions">
        <div class="toggle-group" style="margin-right:8px">
          <button class="toggle-btn gantt-stage-btn active" data-stage="all" onclick="setFilter('all',this)">Alle</button>
          <button class="toggle-btn gantt-stage-btn" data-stage="TZ" onclick="setFilter('TZ',this)">Tiefziehen</button>
          <button class="toggle-btn gantt-stage-btn" data-stage="FR" onclick="setFilter('FR',this)">Fräsen</button>
          <button class="toggle-btn gantt-stage-btn" data-stage="MO" onclick="setFilter('MO',this)">Montage</button>
          <button class="toggle-btn gantt-stage-btn" data-stage="LI" onclick="setFilter('LI',this)">Lieferung</button>
        </div>
        <button class="gantt-modal-close" onclick="closeGanttModal()" title="Schließen">✕</button>
      </div>
    </div>
    <div style="padding:10px 20px 6px;border-bottom:1px solid #e5e7eb;background:#f9fafb;display:flex;align-items:center;gap:16px;flex-shrink:0">
      <span style="font-size:11px;color:#6b7280;font-weight:600;white-space:nowrap">KW-Fenster:</span>
      <input type="range" id="ganttSlider" min="-12" max="24" value="6" step="1"
        style="flex:1;accent-color:#006EB7"
        oninput="ganttOffset=parseInt(this.value);document.getElementById('ganttSliderLabel').textContent='KW '+(CURRENT_KW+ganttOffset>52?CURRENT_KW+ganttOffset-52:CURRENT_KW+ganttOffset+' – KW '+(CURRENT_KW+ganttOffset+20>52?CURRENT_KW+ganttOffset+20-52:CURRENT_KW+ganttOffset+19));renderGanttInto(computeDerived(),'ganttTableModal')">
      <span id="ganttSliderLabel" style="font-size:11px;color:#006EB7;font-weight:700;white-space:nowrap;min-width:80px"></span>
      <button onclick="ganttOffset=0;document.getElementById('ganttSlider').value=0;renderGanttInto(computeDerived(),'ganttTableModal')" style="background:#006EB7;color:#fff;border:none;border-radius:5px;padding:4px 10px;font-size:11px;cursor:pointer;font-weight:600">Heute</button>
    </div>
    <div class="gantt-modal-body" style="overflow:auto;position:relative">
      <table id="ganttTableModal" style="border-collapse:collapse;width:100%;font-family:Calibri,Arial,sans-serif;table-layout:fixed">
        <thead id="ganttTableModalHead" style="position:sticky;top:0;z-index:10"></thead>
        <tbody></tbody>
      </table>
    </div>
  </div>
</div>

<script>

// ═══════════════════════════════════════════════════════════
// DIRECT ACCESS — no login required
let AUTH_TOKEN = 'open';

async function apiLoadPlan() {
  const r = await fetch('/api/plan');
  if (!r.ok) throw new Error('Failed to load');
  return await r.json();
}

async function apiSavePlan(plan, doneStatus) {
  const r = await fetch('/api/plan', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({plan, done_status: doneStatus || {}})
  });
  if (!r.ok) { const d = await r.json(); throw new Error(d.error || 'Save failed'); }
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
  el._t = setTimeout(() => el.style.opacity = '0', 3500);
}

async function globalSave() {
  const btn = document.getElementById('globalSaveBtn');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Wird gespeichert...'; }
  try {
    await apiSavePlan(PLAN, DONE_STATUS);
    showToast('✓ Gespeichert — ' + new Date().toLocaleTimeString('de-DE'), false);
    if (btn) { btn.textContent = '✓ Gespeichert'; }
    setTimeout(() => { if (btn) { btn.disabled = false; btn.textContent = '💾 Speichern'; } }, 2000);
  } catch(e) {
    showToast('⚠ Fehler: ' + e.message, true);
    if (btn) { btn.disabled = false; btn.textContent = '💾 Speichern'; }
  }
}

const _sd = saveDraft;
saveDraft = async function() {
  _sd();
  try {
    await apiSavePlan(PLAN, DONE_STATUS);
    showToast('✓ Gespeichert — ' + new Date().toLocaleTimeString('de-DE'), false);
  } catch(e) {
    showToast('⚠ Fehler: ' + e.message, true);
  }
};

document.getElementById('currentKW').textContent = 'KW ' + CURRENT_KW + ' / ' + CURRENT_YEAR;

(async function start() {
  try {
    const loaded = await apiLoadPlan();
    PLAN = loaded.plan;
    DRAFT = JSON.parse(JSON.stringify(PLAN));
    if (loaded.done_status && Object.keys(loaded.done_status).length > 0) DONE_STATUS = loaded.done_status;
    showToast('✓ Daten geladen', false);
  } catch(e) {
    showToast('⚠ Konnte Daten nicht laden: ' + e.message, true);
  }
  const saveBtn = document.getElementById('globalSaveBtn');
  if (saveBtn) saveBtn.style.display = 'inline-block';
  renderAll();
})();

</script>
</body>
</html>
`;

app.use((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(FRONTEND_HTML);
});

app.listen(PORT, async () => {
  console.log('BW Planungstool running on port', PORT);
  if (!GITHUB_TOKEN) { console.error('GITHUB_TOKEN not set!'); return; }
  try {
    const data = await githubGet();
    console.log(data.sha ? 'GitHub connected OK' : 'GitHub connected — no saved data yet');
  } catch(e) {
    console.error('GitHub connection failed:', e.message);
  }
});
