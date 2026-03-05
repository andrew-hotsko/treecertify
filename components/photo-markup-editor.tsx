"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pencil,
  Circle,
  Type,
  Undo2,
  Redo2,
  Trash2,
  Save,
  X,
  MousePointer2,
  MoveRight,
  Loader2,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ToolMode = "select" | "draw" | "arrow" | "circle" | "text";

/* eslint-disable @typescript-eslint/no-explicit-any */
type FabricModule = any;
type FabricCanvas = any;
/* eslint-enable @typescript-eslint/no-explicit-any */

interface PhotoMarkupEditorProps {
  photoUrl: string;
  photoId: string;
  propertyId: string;
  treeId: string;
  onSave: (annotatedUrl: string) => void;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Color palette
// ---------------------------------------------------------------------------

const COLORS = [
  { name: "Red", value: "#ef4444" },
  { name: "Yellow", value: "#eab308" },
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
];

const LINE_WIDTHS = [2, 4, 6];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PhotoMarkupEditor({
  photoUrl,
  photoId,
  propertyId,
  treeId,
  onSave,
  onClose,
}: PhotoMarkupEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);
  // Store the dynamically-imported fabric module so mouse handlers can use it
  const fabricRef = useRef<FabricModule | null>(null);

  const [tool, setTool] = useState<ToolMode>("draw");
  const [color, setColor] = useState("#ef4444");
  const [lineWidth, setLineWidth] = useState(4);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Undo / redo stacks (JSON snapshots)
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Arrow drawing state
  const isDrawingArrow = useRef(false);
  const arrowStart = useRef<{ x: number; y: number } | null>(null);
  const tempArrowLine = useRef<FabricCanvas | null>(null);

  // Circle drawing state
  const isDrawingCircle = useRef(false);
  const circleStart = useRef<{ x: number; y: number } | null>(null);
  const tempCircle = useRef<FabricCanvas | null>(null);

  // Keep current tool/color/lineWidth in refs so event handlers stay up to date
  const toolRef = useRef(tool);
  const colorRef = useRef(color);
  const lineWidthRef = useRef(lineWidth);
  useEffect(() => { toolRef.current = tool; }, [tool]);
  useEffect(() => { colorRef.current = color; }, [color]);
  useEffect(() => { lineWidthRef.current = lineWidth; }, [lineWidth]);

  // ------------------------------------------------------------------
  // Save canvas state snapshot for undo
  // ------------------------------------------------------------------
  const pushUndo = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    undoStack.current.push(JSON.stringify(canvas.toJSON()));
    redoStack.current = [];
    setCanUndo(true);
    setCanRedo(false);
  }, []);

  // ------------------------------------------------------------------
  // Initialize Fabric canvas + attach mouse handlers (once)
  // ------------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;

    async function init() {
      const fabricModule = await import("fabric");
      if (cancelled || !canvasRef.current) return;

      fabricRef.current = fabricModule;

      const canvas = new fabricModule.Canvas(canvasRef.current, {
        isDrawingMode: true,
        width: 900,
        height: 600,
        selection: true,
      });

      fabricCanvasRef.current = canvas;

      // Load background image
      const img = await fabricModule.FabricImage.fromURL(photoUrl, {
        crossOrigin: "anonymous",
      });

      if (cancelled) return;

      // Scale image to fit canvas
      const scaleX = canvas.width! / (img.width || 1);
      const scaleY = canvas.height! / (img.height || 1);
      const scale = Math.min(scaleX, scaleY);

      img.set({
        scaleX: scale,
        scaleY: scale,
        originX: "left",
        originY: "top",
        left: (canvas.width! - (img.width || 1) * scale) / 2,
        top: (canvas.height! - (img.height || 1) * scale) / 2,
      });

      canvas.backgroundImage = img;
      canvas.renderAll();

      // Set up free drawing brush
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = "#ef4444";
        canvas.freeDrawingBrush.width = 4;
      }

      // Save initial state
      undoStack.current = [JSON.stringify(canvas.toJSON())];
      redoStack.current = [];
      setLoaded(true);

      // Listen for freehand path creation
      canvas.on("path:created", () => {
        pushUndo();
      });

      // ---- Mouse handlers for arrow / circle / text tools ----
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      canvas.on("mouse:down", (opt: any) => {
        const fb = fabricRef.current;
        if (!fb || !canvas) return;
        const pointer = canvas.getViewportPoint(opt.e);
        const t = toolRef.current;
        const c = colorRef.current;
        const lw = lineWidthRef.current;

        if (t === "arrow") {
          isDrawingArrow.current = true;
          arrowStart.current = { x: pointer.x, y: pointer.y };
          const line = new fb.Line(
            [pointer.x, pointer.y, pointer.x, pointer.y],
            { stroke: c, strokeWidth: lw, selectable: false, evented: false }
          );
          canvas.add(line);
          tempArrowLine.current = line;
        }

        if (t === "circle") {
          isDrawingCircle.current = true;
          circleStart.current = { x: pointer.x, y: pointer.y };
          const ellipse = new fb.Ellipse({
            left: pointer.x,
            top: pointer.y,
            rx: 0,
            ry: 0,
            fill: "transparent",
            stroke: c,
            strokeWidth: lw,
            selectable: false,
            evented: false,
          });
          canvas.add(ellipse);
          tempCircle.current = ellipse;
        }

        if (t === "text") {
          const text = new fb.IText("Label", {
            left: pointer.x,
            top: pointer.y,
            fontSize: 20,
            fill: c,
            fontFamily: "Arial",
            fontWeight: "bold",
            editable: true,
            selectable: true,
            evented: true,
          });
          canvas.add(text);
          canvas.setActiveObject(text);
          text.enterEditing();
          pushUndo();
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      canvas.on("mouse:move", (opt: any) => {
        if (!canvas) return;
        const pointer = canvas.getViewportPoint(opt.e);

        if (isDrawingArrow.current && tempArrowLine.current && arrowStart.current) {
          tempArrowLine.current.set({ x2: pointer.x, y2: pointer.y });
          canvas.renderAll();
        }

        if (isDrawingCircle.current && tempCircle.current && circleStart.current) {
          const rx = Math.abs(pointer.x - circleStart.current.x) / 2;
          const ry = Math.abs(pointer.y - circleStart.current.y) / 2;
          const left = Math.min(pointer.x, circleStart.current.x);
          const top = Math.min(pointer.y, circleStart.current.y);
          tempCircle.current.set({ rx, ry, left, top });
          canvas.renderAll();
        }
      });

      canvas.on("mouse:up", () => {
        const fb = fabricRef.current;
        if (!fb || !canvas) return;
        const c = colorRef.current;

        if (isDrawingArrow.current && tempArrowLine.current && arrowStart.current) {
          const line = tempArrowLine.current;
          const x1 = line.x1!;
          const y1 = line.y1!;
          const x2 = line.x2!;
          const y2 = line.y2!;

          const angle = Math.atan2(y2 - y1, x2 - x1);
          const headLen = 15;

          const head = new fb.Polygon(
            [
              { x: x2, y: y2 },
              {
                x: x2 - headLen * Math.cos(angle - Math.PI / 6),
                y: y2 - headLen * Math.sin(angle - Math.PI / 6),
              },
              {
                x: x2 - headLen * Math.cos(angle + Math.PI / 6),
                y: y2 - headLen * Math.sin(angle + Math.PI / 6),
              },
            ],
            { fill: c, stroke: c, strokeWidth: 1, selectable: false, evented: false }
          );

          canvas.add(head);
          pushUndo();

          isDrawingArrow.current = false;
          arrowStart.current = null;
          tempArrowLine.current = null;
        }

        if (isDrawingCircle.current && tempCircle.current) {
          pushUndo();
          isDrawingCircle.current = false;
          circleStart.current = null;
          tempCircle.current = null;
        }
      });
    }

    init();

    return () => {
      cancelled = true;
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoUrl]);

  // ------------------------------------------------------------------
  // Update brush when tool/color/lineWidth changes
  // ------------------------------------------------------------------
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    if (tool === "draw") {
      canvas.isDrawingMode = true;
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = color;
        canvas.freeDrawingBrush.width = lineWidth;
      }
    } else {
      canvas.isDrawingMode = false;
    }

    if (tool === "select") {
      canvas.selection = true;
      canvas.forEachObject((obj: FabricCanvas) => {
        obj.selectable = true;
        obj.evented = true;
      });
    } else {
      canvas.selection = false;
      canvas.forEachObject((obj: FabricCanvas) => {
        obj.selectable = false;
        obj.evented = false;
      });
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  }, [tool, color, lineWidth]);

  // ------------------------------------------------------------------
  // Undo / Redo
  // ------------------------------------------------------------------
  const handleUndo = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || undoStack.current.length <= 1) return;

    const current = undoStack.current.pop()!;
    redoStack.current.push(current);

    const prev = undoStack.current[undoStack.current.length - 1];
    canvas.loadFromJSON(prev).then(() => {
      canvas.renderAll();
      setCanUndo(undoStack.current.length > 1);
      setCanRedo(true);
    });
  }, []);

  const handleRedo = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || redoStack.current.length === 0) return;

    const next = redoStack.current.pop()!;
    undoStack.current.push(next);

    canvas.loadFromJSON(next).then(() => {
      canvas.renderAll();
      setCanUndo(true);
      setCanRedo(redoStack.current.length > 0);
    });
  }, []);

  // ------------------------------------------------------------------
  // Clear all annotations
  // ------------------------------------------------------------------
  const handleClearAll = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.getObjects().forEach((obj: FabricCanvas) => canvas.remove(obj));
    canvas.renderAll();
    pushUndo();
  }, [pushUndo]);

  // ------------------------------------------------------------------
  // Save annotated image
  // ------------------------------------------------------------------
  const handleSave = useCallback(async () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    setSaving(true);
    try {
      canvas.discardActiveObject();
      canvas.renderAll();

      const dataUrl = canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 1,
      });

      // Convert data URL to blob
      const resp = await fetch(dataUrl);
      const blob = await resp.blob();

      const formData = new FormData();
      formData.append("image", blob, "annotated.png");

      const res = await fetch(
        `/api/properties/${propertyId}/trees/${treeId}/photos/${photoId}/annotate`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to save annotation");

      const data = await res.json();
      onSave(data.url);
    } catch (err) {
      console.error("Save annotation failed:", err);
    } finally {
      setSaving(false);
    }
  }, [photoId, propertyId, treeId, onSave]);

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-w-[960px] max-h-[95vh] p-0 overflow-hidden">
        <DialogTitle className="sr-only">Photo Markup Editor</DialogTitle>

        <div className="flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center gap-1.5 p-2 border-b bg-neutral-100 flex-wrap">
            {/* Tool buttons */}
            <div className="flex items-center gap-0.5 border-r pr-2 mr-1">
              <ToolButton
                icon={<MousePointer2 className="h-4 w-4" />}
                label="Select"
                active={tool === "select"}
                onClick={() => setTool("select")}
              />
              <ToolButton
                icon={<Pencil className="h-4 w-4" />}
                label="Draw"
                active={tool === "draw"}
                onClick={() => setTool("draw")}
              />
              <ToolButton
                icon={<MoveRight className="h-4 w-4" />}
                label="Arrow"
                active={tool === "arrow"}
                onClick={() => setTool("arrow")}
              />
              <ToolButton
                icon={<Circle className="h-4 w-4" />}
                label="Circle"
                active={tool === "circle"}
                onClick={() => setTool("circle")}
              />
              <ToolButton
                icon={<Type className="h-4 w-4" />}
                label="Text"
                active={tool === "text"}
                onClick={() => setTool("text")}
              />
            </div>

            {/* Color picker */}
            <div className="flex items-center gap-1 border-r pr-2 mr-1">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  className={`h-6 w-6 rounded-full border-2 transition-all ${
                    color === c.value
                      ? "border-blue-500 scale-110"
                      : "border-neutral-300"
                  }`}
                  style={{ backgroundColor: c.value }}
                  onClick={() => setColor(c.value)}
                  title={c.name}
                />
              ))}
            </div>

            {/* Line width */}
            <div className="flex items-center gap-1 border-r pr-2 mr-1">
              {LINE_WIDTHS.map((w) => (
                <button
                  key={w}
                  className={`flex items-center justify-center h-7 w-7 rounded transition-colors ${
                    lineWidth === w
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-neutral-200"
                  }`}
                  onClick={() => setLineWidth(w)}
                  title={`${w}px`}
                >
                  <div
                    className="rounded-full bg-current"
                    style={{ width: w + 2, height: w + 2 }}
                  />
                </button>
              ))}
            </div>

            {/* Undo / Redo / Clear */}
            <div className="flex items-center gap-0.5 border-r pr-2 mr-1">
              <ToolButton
                icon={<Undo2 className="h-4 w-4" />}
                label="Undo"
                active={false}
                onClick={handleUndo}
                disabled={!canUndo}
              />
              <ToolButton
                icon={<Redo2 className="h-4 w-4" />}
                label="Redo"
                active={false}
                onClick={handleRedo}
                disabled={!canRedo}
              />
              <ToolButton
                icon={<Trash2 className="h-4 w-4" />}
                label="Clear All"
                active={false}
                onClick={handleClearAll}
              />
            </div>

            {/* Save / Cancel */}
            <div className="flex items-center gap-1.5 ml-auto">
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-3.5 w-3.5" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={saving}
                className="bg-forest hover:bg-forest-light"
              >
                <Save className="h-3.5 w-3.5" />
                {saving ? "Saving..." : "Save Markup"}
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex items-center justify-center bg-zinc-800 p-2 overflow-auto">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 z-10">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            )}
            <canvas ref={canvasRef} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Toolbar button helper
// ---------------------------------------------------------------------------

function ToolButton({
  icon,
  label,
  active,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={`flex items-center justify-center h-8 w-8 rounded transition-colors ${
        active
          ? "bg-blue-100 text-blue-700"
          : "hover:bg-neutral-200 text-neutral-600"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
      title={label}
    >
      {icon}
    </button>
  );
}
