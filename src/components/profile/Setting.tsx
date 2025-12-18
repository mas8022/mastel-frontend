"use client";

import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Setting = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="pt-4 border-t space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">Settings</h3>

      <div className="flex items-center justify-between rounded-lg border p-3 cursor-pointer select-none">
        {theme === "dark" ? (
          <div className="flex items-center gap-3">
            <Sun className="h-4 w-4 text-violet-400" />
            <span className="text-sm">Sun Mode</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Moon className="h-4 w-4 text-violet-400" />
            <span className="text-sm">Dark Mode</span>
          </div>
        )}

        <Switch
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
      </div>
    </div>
  );
};

export default Setting;
