import { camera } from "@/types/canvas"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS = [
  "#059669",
  "#EF4444",
  "#3B82F6",
  "#F59E0B",
  "#8B5CF6",
  "#10B981",
  "#FDE047",
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length]
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent, 
  camera: camera,
) {
  return {
      x: Math.round(e.clientX) - camera.x,
      y: Math.round(e.clientY) - camera.y
  }
}
