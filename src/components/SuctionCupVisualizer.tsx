import React, { useEffect, useRef } from "react";
import { useUnit } from "./UnitContext";

interface SuctionCupVisualizerProps {
  length: number;
  width: number;
  thickness: number;
  cupsX: number;
  cupsY: number;
  cupModel: { diameter: number };
  spacing: number;
  offsetX: number;
  weightSafety: number;
  momentSafety: number;
}

const SuctionCupVisualizer: React.FC<SuctionCupVisualizerProps> = ({ length, width, thickness, cupsX, cupsY, cupModel, spacing, offsetX, weightSafety, momentSafety }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { unit } = useUnit();
  const conversionFactor = unit === "in" ? 1 : 25.4;
  const scale = unit === "in" ? 5 : 100;
  const unitLabel = unit === "in" ? "in" : "mm";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pxPerUnit = 5;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Convert values to pixels
    const partLength = (length / conversionFactor) * pxPerUnit;
    const partWidth = (width / conversionFactor) * pxPerUnit;
    const partThickness = (thickness / conversionFactor) * pxPerUnit;
    const cupSpacing = (spacing / conversionFactor) * pxPerUnit;
    const cupDiameter = (cupModel.diameter / conversionFactor) * pxPerUnit;
    const offsetXPx = (offsetX / conversionFactor) * pxPerUnit;

    // Center part in canvas
    const xOffset = (canvasWidth - partLength) / 2;
    const yOffsetTop = (canvasHeight / 4) - partWidth / 2;
    const yOffsetSide = (3 * canvasHeight / 4) - partThickness / 2;

    // Draw top-down view (length x width)
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(xOffset, yOffsetTop, partLength, partWidth);
    
    // Draw grid scale
    ctx.strokeStyle = "gray";
    ctx.setLineDash([5, 5]);
    for (let i = xOffset; i < xOffset + partLength; i += scale * pxPerUnit) {
      ctx.beginPath();
      ctx.moveTo(i, yOffsetTop);
      ctx.lineTo(i, yOffsetTop + partWidth);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Draw suction cups centered
    ctx.fillStyle = "blue";
    for (let i = 0; i < cupsX; i++) {
      for (let j = 0; j < cupsY; j++) {
        const cupX = xOffset + partLength / 2 + (i - (cupsX - 1) / 2) * cupSpacing;
        const cupY = yOffsetTop + partWidth / 2 + (j - (cupsY - 1) / 2) * cupSpacing;
        ctx.beginPath();
        ctx.arc(cupX, cupY, cupDiameter / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw side profile (length x thickness)
    ctx.strokeStyle = "black";
    ctx.strokeRect(xOffset, yOffsetSide, partLength, partThickness);
    
    // Draw suction cup offset line
    ctx.strokeStyle = "red";
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(xOffset + partLength / 2, yOffsetTop);
    ctx.lineTo(xOffset + offsetXPx, yOffsetTop + partWidth);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Display calculated values
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.fillText(`Weight Safety Factor: ${weightSafety.toFixed(2)}`, 10, 20);
    ctx.fillText(`Moment Safety: ${momentSafety}`, 10, 40);
    ctx.fillText(`Offset: ${offsetX}${unitLabel}`, 10, 60);
  }, [length, width, thickness, cupsX, cupsY, cupModel, spacing, offsetX, unit, weightSafety, momentSafety]);

  return <canvas ref={canvasRef} width={600} height={400} style={{ border: "1px solid black" }} />;
};

export default SuctionCupVisualizer;
