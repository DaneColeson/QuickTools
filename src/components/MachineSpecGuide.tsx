import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useUnit } from "./UnitContext"; // Import global unit context

type MachineSpecs = {
  [key: string]: {
    force: { ton: number; usTon: number };
    bendingLength: { mm: number; in: number };
    distanceBetweenFrames: { mm: number; in: number };
    tableWidth: { mm: number; in: number };
    openHeight: { mm: number; in: number };
    ramStroke: { mm: number; in: number };
    throatDepth: { mm: number; in: number };
    ramSpeeds: {
      approach: { mmSec: number; inMin: number };
      bending: { mmSec: number; inMin: number };
      return: { mmSec: number; inMin: number };
    };
    backgaugeSpeed: {
      frontBack: { mmSec: number; inMin: number };
      sideSide: { mmSec: number; inMin: number };
      upDown: { mmSec: number; inMin: number };
    };
    machineSize: {
      length: { mm: number; in: number };
      width: { mm: number; in: number };
      height: { mm: number; in: number };
    };
    power: { kva: number };
    weight: { kg: number; lbs: number };
  };
};

const machineSpecs: MachineSpecs = {
  BB306: {
    force: { ton: 28, usTon: 30.8 },
    bendingLength: { mm: 630, in: 24.8 },
    distanceBetweenFrames: { mm: 700, in: 27.6 },
    tableWidth: { mm: 100, in: 3.9 },
    openHeight: { mm: 430, in: 16.9 },
    ramStroke: { mm: 150, in: 5.9 },
    throatDepth: { mm: 200, in: 7.9 },
    ramSpeeds: {
      approach: { mmSec: 95, inMin: 224.4 },
      bending: { mmSec: 20.0, inMin: 47.2 },
      return: { mmSec: 95, inMin: 224.4 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 850, inMin: 2007.9 },
      sideSide: { mmSec: 850, inMin: 2007.9 },
      upDown: { mmSec: 200, inMin: 472.4 },
    },
    machineSize: {
      length: { mm: 1358, in: 53.5 },
      width: { mm: 826, in: 32.5 },
      height: { mm: 2408, in: 94.8 },
    },
    power: { kva: 11.0 },
    weight: { kg: 2800, lbs: 6160.0 },
  },
  BB4013: {
    force: { ton: 36, usTon: 39.6 },
    bendingLength: { mm: 1260, in: 49.6 },
    distanceBetweenFrames: { mm: 1300, in: 51.2 },
    tableWidth: { mm: 100, in: 3.9 },
    openHeight: { mm: 430, in: 16.9 },
    ramStroke: { mm: 150, in: 5.9 },
    throatDepth: { mm: 100, in: 3.9 },
    ramSpeeds: {
      approach: { mmSec: 100, inMin: 236.2 },
      bending: { mmSec: 20.0, inMin: 47.2 },
      return: { mmSec: 100, inMin: 236.2 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 850, inMin: 2007.9 },
      sideSide: { mmSec: 850, inMin: 2007.9 },
      upDown: { mmSec: 200, inMin: 472.4 },
    },
    machineSize: {
      length: { mm: 1350, in: 53.1 },
      width: { mm: 1430, in: 56.3 },
      height: { mm: 2380, in: 93.7 },
    },
    power: { kva: 15.0 },
    weight: { kg: 3500, lbs: 7700.0 },
  },
  BB6013: {
    force: { ton: 55, usTon: 60.5 },
    bendingLength: { mm: 1300, in: 51.2 },
    distanceBetweenFrames: { mm: 900, in: 35.4 },
    tableWidth: { mm: 100, in: 3.9 },
    openHeight: { mm: 430, in: 16.9 },
    ramStroke: { mm: 150, in: 5.9 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 95, inMin: 224.4 },
      bending: { mmSec: 20.0, inMin: 47.2 },
      return: { mmSec: 95, inMin: 224.4 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 850, inMin: 2007.9 },
      sideSide: { mmSec: 850, inMin: 2007.9 },
      upDown: { mmSec: 200, inMin: 472.4 },
    },
    machineSize: {
      length: { mm: 1615, in: 63.6 },
      width: { mm: 1435, in: 56.5 },
      height: { mm: 2600, in: 102.4 },
    },
    power: { kva: 20.0 },
    weight: { kg: 4500, lbs: 9900.0 },
  },
  BB6020: {
    force: { ton: 55, usTon: 60.5 },
    bendingLength: { mm: 2100, in: 82.7 },
    distanceBetweenFrames: { mm: 1700, in: 66.9 },
    tableWidth: { mm: 100, in: 3.9 },
    openHeight: { mm: 430, in: 16.9 },
    ramStroke: { mm: 150, in: 5.9 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 95, inMin: 224.4 },
      bending: { mmSec: 20.0, inMin: 47.2 },
      return: { mmSec: 95, inMin: 224.4 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 850, inMin: 2007.9 },
      sideSide: { mmSec: 850, inMin: 2007.9 },
      upDown: { mmSec: 200, inMin: 472.4 },
    },
    machineSize: {
      length: { mm: 1615, in: 63.6 },
      width: { mm: 2425, in: 95.5 },
      height: { mm: 2600, in: 102.4 },
    },
    power: { kva: 20.0 },
    weight: { kg: 5000, lbs: 11000.0 },
  },
  BH8525: {
    force: { ton: 85, usTon: 93.5 },
    bendingLength: { mm: 2600, in: 102.4 },
    distanceBetweenFrames: { mm: 2200, in: 86.6 },
    tableWidth: { mm: 170, in: 6.7 },
    openHeight: { mm: 530, in: 20.9 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 200, inMin: 472.4 },
      bending: { mmSec: 10.0, inMin: 23.6 },
      return: { mmSec: 200, inMin: 472.4 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 850, inMin: 2007.9 },
      sideSide: { mmSec: 850, inMin: 2007.9 },
      upDown: { mmSec: 200, inMin: 472.4 },
    },
    machineSize: {
      length: { mm: 1595, in: 62.8 },
      width: { mm: 2830, in: 111.4 },
      height: { mm: 2950, in: 116.1 },
    },
    power: { kva: 9.0 },
    weight: { kg: 7000, lbs: 15400.0 },
  },
  BH13530: {
    force: { ton: 135, usTon: 148.5 },
    bendingLength: { mm: 3100, in: 122.0 },
    distanceBetweenFrames: { mm: 2700, in: 106.3 },
    tableWidth: { mm: 170, in: 6.7 },
    openHeight: { mm: 530, in: 20.9 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 200, inMin: 472.4 },
      bending: { mmSec: 10.0, inMin: 23.6 },
      return: { mmSec: 200, inMin: 472.4 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 850, inMin: 2007.9 },
      sideSide: { mmSec: 850, inMin: 2007.9 },
      upDown: { mmSec: 200, inMin: 472.4 },
    },
    machineSize: {
      length: { mm: 1670, in: 65.7 },
      width: { mm: 3350, in: 131.9 },
      height: { mm: 2990, in: 117.7 },
    },
    power: { kva: 12.0 },
    weight: { kg: 9000, lbs: 19800.0 },
  },
  BH18530: {
    force: { ton: 185, usTon: 203.5 },
    bendingLength: { mm: 3100, in: 122.0 },
    distanceBetweenFrames: { mm: 2700, in: 106.3 },
    tableWidth: { mm: 170, in: 6.7 },
    openHeight: { mm: 530, in: 20.9 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 200, inMin: 472.4 },
      bending: { mmSec: 10.0, inMin: 23.6 },
      return: { mmSec: 200, inMin: 472.4 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 850, inMin: 2007.9 },
      sideSide: { mmSec: 850, inMin: 2007.9 },
      upDown: { mmSec: 200, inMin: 472.4 },
    },
    machineSize: {
      length: { mm: 1780, in: 70.1 },
      width: { mm: 3570, in: 140.6 },
      height: { mm: 2990, in: 117.7 },
    },
    power: { kva: 22.0 },
    weight: { kg: 16000, lbs: 35200.0 },
  },
  BH25030: {
    force: { ton: 250, usTon: 275.0 },
    bendingLength: { mm: 3100, in: 122.0 },
    distanceBetweenFrames: { mm: 2700, in: 106.3 },
    tableWidth: { mm: 210, in: 8.3 },
    openHeight: { mm: 530, in: 20.9 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 200, inMin: 472.4 },
      bending: { mmSec: 10.0, inMin: 23.6 },
      return: { mmSec: 200, inMin: 472.4 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 850, inMin: 2007.9 },
      sideSide: { mmSec: 850, inMin: 2007.9 },
      upDown: { mmSec: 200, inMin: 472.4 },
    },
    machineSize: {
      length: { mm: 1885, in: 74.2 },
      width: { mm: 3620, in: 142.5 },
      height: { mm: 3095, in: 121.9 },
    },
    power: { kva: 27.0 },
    weight: { kg: 17500, lbs: 38500.0 },
  },
  BH18540: {
    force: { ton: 185, usTon: 203.5 },
    bendingLength: { mm: 4100, in: 161.4 },
    distanceBetweenFrames: { mm: 3700, in: 145.7 },
    tableWidth: { mm: 210, in: 8.3 },
    openHeight: { mm: 530, in: 20.9 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 200, inMin: 472.4 },
      bending: { mmSec: 10.0, inMin: 23.6 },
      return: { mmSec: 200, inMin: 472.4 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 850, inMin: 2007.9 },
      sideSide: { mmSec: 850, inMin: 2007.9 },
      upDown: { mmSec: 200, inMin: 472.4 },
    },
    machineSize: {
      length: { mm: 1775, in: 69.9 },
      width: { mm: 4570, in: 179.9 },
      height: { mm: 3130, in: 123.2 },
    },
    power: { kva: 22.0 },
    weight: { kg: 20000, lbs: 44000.0 },
  },
  BH25040: {
    force: { ton: 250, usTon: 275.0 },
    bendingLength: { mm: 4100, in: 161.4 },
    distanceBetweenFrames: { mm: 3700, in: 145.7 },
    tableWidth: { mm: 210, in: 8.3 },
    openHeight: { mm: 530, in: 20.9 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 200, inMin: 472.4 },
      bending: { mmSec: 10.0, inMin: 23.6 },
      return: { mmSec: 200, inMin: 472.4 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 850, inMin: 2007.9 },
      sideSide: { mmSec: 850, inMin: 2007.9 },
      upDown: { mmSec: 200, inMin: 472.4 },
    },
    machineSize: {
      length: { mm: 1900, in: 74.8 },
      width: { mm: 4620, in: 181.9 },
      height: { mm: 3095, in: 121.9 },
    },
    power: { kva: 27.0 },
    weight: { kg: 22000, lbs: 48400.0 },
  },
  PA13530: {
    force: { ton: 135, usTon: 148.5 },
    bendingLength: { mm: 3000, in: 118.1 },
    distanceBetweenFrames: { mm: 2550, in: 100.4 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 500, in: 19.7 },
    ramStroke: { mm: 260, in: 10.2 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 150, inMin: 354.3 },
      bending: { mmSec: 10.0, inMin: 23.6 },
      return: { mmSec: 100, inMin: 236.2 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 400, inMin: 944.9 },
      upDown: { mmSec: 50, inMin: 118.1 },
    },
    machineSize: {
      length: { mm: 2180, in: 85.8 },
      width: { mm: 4700, in: 185.0 },
      height: { mm: 2960, in: 116.5 },
    },
    power: { kva: 18.0 },
    weight: { kg: 9100, lbs: 20020.0 },
  },
  PA13540: {
    force: { ton: 135, usTon: 148.5 },
    bendingLength: { mm: 4000, in: 157.5 },
    distanceBetweenFrames: { mm: 3150, in: 124.0 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 500, in: 19.7 },
    ramStroke: { mm: 260, in: 10.2 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 150, inMin: 354.3 },
      bending: { mmSec: 10.0, inMin: 23.6 },
      return: { mmSec: 100, inMin: 236.2 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 400, inMin: 944.9 },
      upDown: { mmSec: 50, inMin: 118.1 },
    },
    machineSize: {
      length: { mm: 2180, in: 85.8 },
      width: { mm: 5780, in: 227.6 },
      height: { mm: 3120, in: 122.8 },
    },
    power: { kva: 18.0 },
    weight: { kg: 11500, lbs: 25300.0 },
  },
  PA16030: {
    force: { ton: 160, usTon: 176.0 },
    bendingLength: { mm: 3000, in: 118.1 },
    distanceBetweenFrames: { mm: 2550, in: 100.4 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 500, in: 19.7 },
    ramStroke: { mm: 260, in: 10.2 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 150, inMin: 354.3 },
      bending: { mmSec: 10.0, inMin: 23.6 },
      return: { mmSec: 100, inMin: 236.2 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 400, inMin: 944.9 },
      upDown: { mmSec: 50, inMin: 118.1 },
    },
    machineSize: {
      length: { mm: 2180, in: 85.8 },
      width: { mm: 4700, in: 185.0 },
      height: { mm: 2960, in: 116.5 },
    },
    power: { kva: 18.0 },
    weight: { kg: 9300, lbs: 20460.0 },
  },
  PA16040: {
    force: { ton: 160, usTon: 176.0 },
    bendingLength: { mm: 4000, in: 157.5 },
    distanceBetweenFrames: { mm: 3150, in: 124.0 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 500, in: 19.7 },
    ramStroke: { mm: 260, in: 10.2 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 150, inMin: 354.3 },
      bending: { mmSec: 10.0, inMin: 23.6 },
      return: { mmSec: 100, inMin: 236.2 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 400, inMin: 944.9 },
      upDown: { mmSec: 50, inMin: 118.1 },
    },
    machineSize: {
      length: { mm: 2180, in: 85.8 },
      width: { mm: 5780, in: 227.6 },
      height: { mm: 3120, in: 122.8 },
    },
    power: { kva: 18.0 },
    weight: { kg: 11700, lbs: 25740.0 },
  },
  PA22030: {
    force: { ton: 220, usTon: 242.0 },
    bendingLength: { mm: 3000, in: 118.1 },
    distanceBetweenFrames: { mm: 2550, in: 100.4 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 500, in: 19.7 },
    ramStroke: { mm: 260, in: 10.2 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 130, inMin: 307.1 },
      bending: { mmSec: 8.0, inMin: 18.9 },
      return: { mmSec: 85, inMin: 200.8 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 400, inMin: 944.9 },
      upDown: { mmSec: 50, inMin: 118.1 },
    },
    machineSize: {
      length: { mm: 2180, in: 85.8 },
      width: { mm: 4700, in: 185.0 },
      height: { mm: 3050, in: 120.1 },
    },
    power: { kva: 18.0 },
    weight: { kg: 11200, lbs: 24640.0 },
  },
  PA22040: {
    force: { ton: 220, usTon: 242.0 },
    bendingLength: { mm: 4000, in: 157.5 },
    distanceBetweenFrames: { mm: 3150, in: 124.0 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 500, in: 19.7 },
    ramStroke: { mm: 260, in: 10.2 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 130, inMin: 307.1 },
      bending: { mmSec: 8.0, inMin: 18.9 },
      return: { mmSec: 85, inMin: 200.8 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 400, inMin: 944.9 },
      upDown: { mmSec: 50, inMin: 118.1 },
    },
    machineSize: {
      length: { mm: 2180, in: 85.8 },
      width: { mm: 5780, in: 227.6 },
      height: { mm: 3120, in: 122.8 },
    },
    power: { kva: 18.0 },
    weight: { kg: 13500, lbs: 29700.0 },
  },
  PH30030: {
    force: { ton: 300, usTon: 330.0 },
    bendingLength: { mm: 3100, in: 122.0 },
    distanceBetweenFrames: { mm: 2550, in: 100.4 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 500, in: 19.7 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 120, inMin: 283.5 },
      bending: { mmSec: 8.0, inMin: 18.9 },
      return: { mmSec: 100, inMin: 236.2 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 500, inMin: 1181.1 },
      upDown: { mmSec: 55, inMin: 129.9 },
    },
    machineSize: {
      length: { mm: 2080, in: 81.9 },
      width: { mm: 3800, in: 149.6 },
      height: { mm: 3270, in: 128.7 },
    },
    power: { kva: 22.5 },
    weight: { kg: 13500, lbs: 29700.0 },
  },
  PH30040: {
    force: { ton: 300, usTon: 330.0 },
    bendingLength: { mm: 4100, in: 161.4 },
    distanceBetweenFrames: { mm: 3150, in: 124.0 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 500, in: 19.7 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 140, inMin: 330.7 },
      bending: { mmSec: 8.0, inMin: 18.9 },
      return: { mmSec: 100, inMin: 236.2 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 500, inMin: 1181.1 },
      upDown: { mmSec: 55, inMin: 129.9 },
    },
    machineSize: {
      length: { mm: 2080, in: 81.9 },
      width: { mm: 4800, in: 189.0 },
      height: { mm: 3570, in: 140.6 },
    },
    power: { kva: 22.5 },
    weight: { kg: 17000, lbs: 37400.0 },
  },
  PH30050: {
    force: { ton: 300, usTon: 330.0 },
    bendingLength: { mm: 5100, in: 200.8 },
    distanceBetweenFrames: { mm: 4150, in: 163.4 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 500, in: 19.7 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 150, inMin: 354.3 },
      bending: { mmSec: 8.0, inMin: 18.9 },
      return: { mmSec: 100, inMin: 236.2 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 500, inMin: 1181.1 },
      upDown: { mmSec: 55, inMin: 129.9 },
    },
    machineSize: {
      length: { mm: 2120, in: 83.5 },
      width: { mm: 5800, in: 228.3 },
      height: { mm: 3770, in: 148.4 },
    },
    power: { kva: 22.5 },
    weight: { kg: 27000, lbs: 59400.0 },
  },
  PH30060: {
    force: { ton: 300, usTon: 330.0 },
    bendingLength: { mm: 6100, in: 240.2 },
    distanceBetweenFrames: { mm: 5100, in: 200.8 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 500, in: 19.7 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 150, inMin: 354.3 },
      bending: { mmSec: 8.0, inMin: 18.9 },
      return: { mmSec: 100, inMin: 236.2 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 500, inMin: 1181.1 },
      upDown: { mmSec: 55, inMin: 129.9 },
    },
    machineSize: {
      length: { mm: 2120, in: 83.5 },
      width: { mm: 6800, in: 267.7 },
      height: { mm: 3950, in: 155.5 },
    },
    power: { kva: 22.5 },
    weight: { kg: 33000, lbs: 72600.0 },
  },
  PH40030: {
    force: { ton: 400, usTon: 440.0 },
    bendingLength: { mm: 3100, in: 122.0 },
    distanceBetweenFrames: { mm: 2550, in: 100.4 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 500, in: 19.7 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 120, inMin: 283.5 },
      bending: { mmSec: 9.0, inMin: 21.3 },
      return: { mmSec: 95, inMin: 224.4 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 500, inMin: 1181.1 },
      upDown: { mmSec: 55, inMin: 129.9 },
    },
    machineSize: {
      length: { mm: 2150, in: 84.6 },
      width: { mm: 3820, in: 150.4 },
      height: { mm: 3400, in: 133.9 },
    },
    power: { kva: 37.5 },
    weight: { kg: 17250, lbs: 37950.0 },
  },
  PH40040: {
    force: { ton: 400, usTon: 440.0 },
    bendingLength: { mm: 4100, in: 161.4 },
    distanceBetweenFrames: { mm: 3150, in: 124.0 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 500, in: 19.7 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 140, inMin: 330.7 },
      bending: { mmSec: 9.0, inMin: 21.3 },
      return: { mmSec: 95, inMin: 224.4 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 500, inMin: 1181.1 },
      upDown: { mmSec: 55, inMin: 129.9 },
    },
    machineSize: {
      length: { mm: 2150, in: 84.6 },
      width: { mm: 4820, in: 189.8 },
      height: { mm: 3660, in: 144.1 },
    },
    power: { kva: 37.5 },
    weight: { kg: 22500, lbs: 49500.0 },
  },
  PH40050: {
    force: { ton: 400, usTon: 440.0 },
    bendingLength: { mm: 5100, in: 200.8 },
    distanceBetweenFrames: { mm: 4150, in: 163.4 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 500, in: 19.7 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 150, inMin: 354.3 },
      bending: { mmSec: 9.0, inMin: 21.3 },
      return: { mmSec: 95, inMin: 224.4 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 500, inMin: 1181.1 },
      upDown: { mmSec: 55, inMin: 129.9 },
    },
    machineSize: {
      length: { mm: 2200, in: 86.6 },
      width: { mm: 5820, in: 229.1 },
      height: { mm: 3830, in: 150.8 },
    },
    power: { kva: 37.5 },
    weight: { kg: 30000, lbs: 66000.0 },
  },
  PH40060: {
    force: { ton: 400, usTon: 440.0 },
    bendingLength: { mm: 6100, in: 240.2 },
    distanceBetweenFrames: { mm: 5100, in: 200.8 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 500, in: 19.7 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 150, inMin: 354.3 },
      bending: { mmSec: 9.0, inMin: 21.3 },
      return: { mmSec: 95, inMin: 224.4 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 500, inMin: 1181.1 },
      upDown: { mmSec: 55, inMin: 129.9 },
    },
    machineSize: {
      length: { mm: 2200, in: 86.6 },
      width: { mm: 6820, in: 268.5 },
      height: { mm: 4000, in: 157.5 },
    },
    power: { kva: 37.5 },
    weight: { kg: 40000, lbs: 88000.0 },
  },
  PH50040: {
    force: { ton: 500, usTon: 550.0 },
    bendingLength: { mm: 4100, in: 161.4 },
    distanceBetweenFrames: { mm: 3150, in: 124.0 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 530, in: 20.9 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 80, inMin: 189.0 },
      bending: { mmSec: 8.5, inMin: 20.1 },
      return: { mmSec: 75, inMin: 177.2 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 500, inMin: 1181.1 },
      upDown: { mmSec: 55, inMin: 129.9 },
    },
    machineSize: {
      length: { mm: 2380, in: 93.7 },
      width: { mm: 4400, in: 173.2 },
      height: { mm: 3650, in: 143.7 },
    },
    power: { kva: 37.5 },
    weight: { kg: 32000, lbs: 70400.0 },
  },
  PH50050: {
    force: { ton: 500, usTon: 550.0 },
    bendingLength: { mm: 5100, in: 200.8 },
    distanceBetweenFrames: { mm: 4150, in: 163.4 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 530, in: 20.9 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 80, inMin: 189.0 },
      bending: { mmSec: 8.5, inMin: 20.1 },
      return: { mmSec: 75, inMin: 177.2 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 500, inMin: 1181.1 },
      upDown: { mmSec: 55, inMin: 129.9 },
    },
    machineSize: {
      length: { mm: 2380, in: 93.7 },
      width: { mm: 5900, in: 232.3 },
      height: { mm: 4000, in: 157.5 },
    },
    power: { kva: 37.5 },
    weight: { kg: 40000, lbs: 88000.0 },
  },
  PH50060: {
    force: { ton: 500, usTon: 550.0 },
    bendingLength: { mm: 6100, in: 240.2 },
    distanceBetweenFrames: { mm: 5150, in: 202.8 },
    tableWidth: { mm: 60, in: 2.4 },
    openHeight: { mm: 530, in: 20.9 },
    ramStroke: { mm: 250, in: 9.8 },
    throatDepth: { mm: 400, in: 15.7 },
    ramSpeeds: {
      approach: { mmSec: 70, inMin: 165.4 },
      bending: { mmSec: 7.5, inMin: 17.7 },
      return: { mmSec: 75, inMin: 177.2 },
    },
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181.1 },
      sideSide: { mmSec: 500, inMin: 1181.1 },
      upDown: { mmSec: 55, inMin: 129.9 },
    },
    machineSize: {
      length: { mm: 2380, in: 93.7 },
      width: { mm: 7000, in: 275.6 },
      height: { mm: 4280, in: 168.5 },
    },
    power: { kva: 37.5 },
    weight: { kg: 45000, lbs: 99000.0 },
  },
};

type Unit = "mm" | "in";

interface UnitContextType {
  unit: Unit;
  toggleUnit: () => void;
}

const MachineSpecGuide: React.FC = () => {
  const { unit, toggleUnit } = useUnit(); // Use the global unit context
  const [selectedMachine, setSelectedMachine] = useState<keyof typeof machineSpecs | "">("");
  return (
    <div className="machine-spec-container">
      <h2>Machine Spec Guide</h2>

      {/* Global Toggle Switch */}
      <div className="unit-toggle">
        <span>mm</span>
        <label className="switch">
          <input type="checkbox" checked={unit === "in" as Unit} onChange={toggleUnit} />
          <span className="slider round"></span>
        </label>
        <span>inch</span>
      </div>

      <label>Select a Machine:</label>
      <select value={selectedMachine} onChange={(e) => setSelectedMachine(e.target.value)}>
        <option value="">-- Select --</option>
        {Object.keys(machineSpecs).map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>

      {selectedMachine && (
        <table className="machine-spec-table">
          <tbody>
            <tr><td><b>Force</b></td><td>{machineSpecs[selectedMachine].force.ton} Ton, {machineSpecs[selectedMachine].force.usTon} US Ton</td></tr>
            <tr><td><b>Bending Length</b></td><td>{machineSpecs[selectedMachine].bendingLength[unit as keyof typeof machineSpecs.BB306.bendingLength]} {unit}</td></tr>
            <tr><td><b>Distance Between Frames</b></td><td>{machineSpecs[selectedMachine].distanceBetweenFrames[unit as keyof typeof machineSpecs.BB306.distanceBetweenFrames]} {unit}</td></tr>
            <tr><td><b>Table Width</b></td><td>{machineSpecs[selectedMachine].tableWidth[unit as keyof typeof machineSpecs.BB306.tableWidth]} {unit}</td></tr>
            <tr><td><b>Open Height w/o Tool Holders</b></td><td>{machineSpecs[selectedMachine].openHeight[unit as keyof typeof machineSpecs.BB306.openHeight]} {unit}</td></tr>
            <tr><td><b>Ram Stroke</b></td><td>{machineSpecs[selectedMachine].ramStroke[unit as keyof typeof machineSpecs.BB306.ramStroke]} {unit}</td></tr>
            <tr><td><b>Throat Depth</b></td><td>{machineSpecs[selectedMachine].throatDepth[unit as keyof typeof machineSpecs.BB306.throatDepth]} {unit}</td></tr>
            
            <tr><td colSpan={2}><b>Ram Speeds</b></td></tr>
            <tr><td>Approach</td><td>{machineSpecs[selectedMachine].ramSpeeds.approach[unit === "mm" ? "mmSec" : "inMin"]} {unit === "mm" ? "mm/sec" : "in/min"}</td></tr>
            <tr><td>Bending</td><td>{machineSpecs[selectedMachine].ramSpeeds.bending[unit === "mm" ? "mmSec" : "inMin"]} {unit === "mm" ? "mm/sec" : "in/min"}</td></tr>
            <tr><td>Return</td><td>{machineSpecs[selectedMachine].ramSpeeds.return[unit === "mm" ? "mmSec" : "inMin"]} {unit === "mm" ? "mm/sec" : "in/min"}</td></tr>
            
            <tr><td colSpan={2}><b>Backgauge Speed</b></td></tr>
            <tr><td>Front to Back</td><td>{machineSpecs[selectedMachine].backgaugeSpeed.frontBack[unit === "mm" ? "mmSec" : "inMin"]} {unit === "mm" ? "mm/sec" : "in/min"}</td></tr>
            <tr><td>Side to Side</td><td>{machineSpecs[selectedMachine].backgaugeSpeed.sideSide[unit === "mm" ? "mmSec" : "inMin"]} {unit === "mm" ? "mm/sec" : "in/min"}</td></tr>
            <tr><td>Up and Down</td><td>{machineSpecs[selectedMachine].backgaugeSpeed.upDown[unit === "mm" ? "mmSec" : "inMin"]} {unit === "mm" ? "mm/sec" : "in/min"}</td></tr>
            
            <tr><td colSpan={2}><b>Machine Size</b></td></tr>
            <tr><td>Length</td><td>{machineSpecs[selectedMachine].machineSize.length[unit as keyof typeof machineSpecs.BB306.machineSize.length]} {unit}</td></tr>
            <tr><td>Width</td><td>{machineSpecs[selectedMachine].machineSize.width[unit as keyof typeof machineSpecs.BB306.machineSize.width]} {unit}</td></tr>
            <tr><td>Height</td><td>{machineSpecs[selectedMachine].machineSize.height[unit as keyof typeof machineSpecs.BB306.machineSize.height]} {unit}</td></tr>
            
            <tr><td><b>Power Requirements</b></td><td>{machineSpecs[selectedMachine].power.kva} kVA</td></tr>
            <tr><td><b>Machine Weight</b></td><td>{machineSpecs[selectedMachine].weight.kg} kg, {machineSpecs[selectedMachine].weight.lbs} lbs</td></tr>
          </tbody>
        </table>
      )}
      {/* Home Button */}
                  <Link to="/" className="button home-button">
                      Home
                  </Link>
    </div>
  );
};

export default MachineSpecGuide;
