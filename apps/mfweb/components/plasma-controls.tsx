"use client";

import { useState } from "react";
import { Slider } from "@repo/ui/components/slider";
import { Label } from "@repo/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import {
  RefreshCw,
  ZapIcon,
  PaletteIcon,
  WavesIcon,
  ZoomInIcon,
} from "lucide-react";

export type ColorTheme =
  | "rainbow"
  | "sunset"
  | "cyberpunk"
  | "matrix"
  | "retro"
  | "monochrome";
export type PlasmaParams = {
  speed: number;
  scale: number;
  turbulence: number;
  colorTheme: ColorTheme;
  wave1: number;
  wave2: number;
  wave3: number;
  wave4: number;
};

const defaultParams: PlasmaParams = {
  speed: 0.03,
  scale: 16,
  turbulence: 1,
  colorTheme: "rainbow",
  wave1: 16,
  wave2: 8,
  wave3: 16,
  wave4: 8,
};

interface PlasmaControlsProps {
  onChange: (params: PlasmaParams) => void;
  defaultParams?: PlasmaParams;
}

export default function PlasmaControls({
  onChange,
  defaultParams: inputParams,
}: PlasmaControlsProps) {
  const [params, setParams] = useState<PlasmaParams>(
    inputParams || defaultParams
  );

  const updateParams = (newParams: Partial<PlasmaParams>) => {
    const updatedParams = { ...params, ...newParams };
    setParams(updatedParams);
    onChange(updatedParams);
  };

  const resetParams = () => {
    setParams(defaultParams);
    onChange(defaultParams);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Plasma Controls</CardTitle>
          <Button
            variant="outline"
            size="icon"
            onClick={resetParams}
            title="Reset to defaults"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="speed" className="flex items-center gap-2">
                    <ZapIcon className="h-4 w-4" /> Speed
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {params.speed.toFixed(2)}
                  </span>
                </div>
                <Slider
                  id="speed"
                  min={0.01}
                  max={0.1}
                  step={0.01}
                  value={[params.speed]}
                  onValueChange={([speed]) => updateParams({ speed })}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="scale" className="flex items-center gap-2">
                    <ZoomInIcon className="h-4 w-4" /> Scale
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {params.scale.toFixed(1)}
                  </span>
                </div>
                <Slider
                  id="scale"
                  min={4}
                  max={32}
                  step={1}
                  value={[params.scale]}
                  onValueChange={([scale]) => updateParams({ scale })}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <PaletteIcon className="h-4 w-4" /> Color Theme
                </Label>
                <RadioGroup
                  value={params.colorTheme}
                  onValueChange={(value) =>
                    updateParams({ colorTheme: value as ColorTheme })
                  }
                  className="grid grid-cols-3 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rainbow" id="rainbow" />
                    <Label htmlFor="rainbow" className="cursor-pointer">
                      Rainbow
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sunset" id="sunset" />
                    <Label htmlFor="sunset" className="cursor-pointer">
                      Sunset
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cyberpunk" id="cyberpunk" />
                    <Label htmlFor="cyberpunk" className="cursor-pointer">
                      Cyberpunk
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="matrix" id="matrix" />
                    <Label htmlFor="matrix" className="cursor-pointer">
                      Matrix
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="retro" id="retro" />
                    <Label htmlFor="retro" className="cursor-pointer">
                      Retro
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monochrome" id="monochrome" />
                    <Label htmlFor="monochrome" className="cursor-pointer">
                      Monochrome
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="turbulence"
                    className="flex items-center gap-2"
                  >
                    <WavesIcon className="h-4 w-4" /> Turbulence
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {params.turbulence.toFixed(1)}
                  </span>
                </div>
                <Slider
                  id="turbulence"
                  min={0.1}
                  max={3}
                  step={0.1}
                  value={[params.turbulence]}
                  onValueChange={([turbulence]) => updateParams({ turbulence })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="wave1" className="text-xs">
                      Wave 1
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {params.wave1}
                    </span>
                  </div>
                  <Slider
                    id="wave1"
                    min={4}
                    max={32}
                    step={1}
                    value={[params.wave1]}
                    onValueChange={([wave1]) => updateParams({ wave1 })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="wave2" className="text-xs">
                      Wave 2
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {params.wave2}
                    </span>
                  </div>
                  <Slider
                    id="wave2"
                    min={4}
                    max={32}
                    step={1}
                    value={[params.wave2]}
                    onValueChange={([wave2]) => updateParams({ wave2 })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="wave3" className="text-xs">
                      Wave 3
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {params.wave3}
                    </span>
                  </div>
                  <Slider
                    id="wave3"
                    min={4}
                    max={32}
                    step={1}
                    value={[params.wave3]}
                    onValueChange={([wave3]) => updateParams({ wave3 })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="wave4" className="text-xs">
                      Wave 4
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {params.wave4}
                    </span>
                  </div>
                  <Slider
                    id="wave4"
                    min={4}
                    max={32}
                    step={1}
                    value={[params.wave4]}
                    onValueChange={([wave4]) => updateParams({ wave4 })}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
