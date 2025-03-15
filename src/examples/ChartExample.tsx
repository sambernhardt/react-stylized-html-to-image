import { useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useHtmlToImage } from "../hooks/useHtmlToImage";
import { Button } from "@/components/ui/button";
import { useSystemTheme } from "../hooks/useSystemTheme";
import { HugeiconsIcon } from "@hugeicons/react";
import { Chart01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { ExampleWrapper } from "./ExampleWrapper";
import { toast } from "sonner";
const chartData = {
  editorial: [
    { name: "Q1", value: 2100 },
    { name: "Q2", value: 1800 },
    { name: "Q3", value: 2400 },
    { name: "Q4", value: 3200 },
  ],
  crypto: [
    { name: "Jan", value: 1200 },
    { name: "Feb", value: 1600 },
    { name: "Mar", value: 1400 },
    { name: "Apr", value: 2100 },
    { name: "May", value: 1900 },
    { name: "Jun", value: 2400 },
    { name: "Jul", value: 2200 },
  ],
  magazine: [
    { name: "2019", value: 4500 },
    { name: "2020", value: 3800 },
    { name: "2021", value: 5200 },
    { name: "2022", value: 6100 },
    { name: "2023", value: 7400 },
  ],
  modern: [
    { name: "Mon", value: 1200 },
    { name: "Tue", value: 900 },
    { name: "Wed", value: 1500 },
    { name: "Thu", value: 1800 },
    { name: "Fri", value: 2100 },
    { name: "Sat", value: 1600 },
    { name: "Sun", value: 1400 },
  ],
};

const themes = {
  editorial: {
    name: "Editorial",
    background: "bg-neutral-100",
    chartColor: "#525252",
    cardBackground: "bg-white",
    logo: (
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center bg-neutral-100`}
      >
        <HugeiconsIcon
          icon={Chart01Icon}
          className="text-neutral-900 w-6 h-6"
        />
      </div>
    ),
    data: chartData.editorial,
    title: "Quarterly Revenue Analysis",
    subtitle: "Year-over-year growth metrics for 2023",
    titleStyle: "font-[Playfair_Display] text-neutral-900 text-2xl",
    subtitleStyle: "font-[Playfair_Display] text-neutral-600 text-sm",
    sourceText:
      "Data sourced from quarterly financial reports. Figures represent consolidated revenue across all business units, adjusted for seasonal variations and extraordinary items.",
    sourceTextStyle: "text-neutral-500",
    gridColor: "#e5e5e5",
    textColor: "#525252",
    borderColor: "#e5e5e5",
    borderStyle: "border-neutral-200",
  },
  modern: {
    name: "Modern",
    background: "bg-neutral-800",
    chartColor: "#ffffff",
    cardBackground: "bg-black",
    logo: (
      <HugeiconsIcon icon={ArrowUpRight01Icon} className="text-white w-6 h-6" />
    ),
    data: chartData.modern,
    title: "Weekly User Activity",
    subtitle: "Active users by day of week",
    titleStyle: "font-[Big_Shoulders] text-white text-3xl uppercase",
    subtitleStyle: "text-neutral-500 text-sm",
    sourceText:
      "User activity metrics collected through our analytics platform. Active users defined as those who performed at least one meaningful interaction. Data normalized across time zones.",
    sourceTextStyle: "text-neutral-600",
    borderStyle: "border-neutral-800",
    gridColor: "#262626",
    textColor: "#737373",
    borderColor: "#262626",
  },
  ethereum: {
    name: "Crypto",
    background: "bg-gradient-to-r from-indigo-900/80 to-indigo-800/80",
    chartColor: "#818cf8",
    cardBackground: "bg-[#0a0b29]",
    logo: (
      <img
        src="https://m.media-amazon.com/images/I/51T9i1l0IYL.jpg"
        className="w-[30px] h-[30px] rounded-full object-cover"
        alt="Logo"
        loading="eager"
      />
    ),
    data: chartData.crypto,
    title: "Ethereum Price Movement",
    subtitle: "Historical price data in USD (thousands)",
    titleStyle: "font-[Geist] text-indigo-50 text-xl",
    subtitleStyle: "font-[Geist_Mono] text-indigo-200/50 text-xs font-normal",
    sourceText:
      "Price data aggregated from major cryptocurrency exchanges. Values represent daily closing prices, normalized and averaged across exchanges. Excludes flash crashes and extreme outliers.",
    sourceTextStyle: "text-indigo-300/50",
    gridColor: "#1e1b4b",
    textColor: "#818cf8",
    borderColor: "#1e1b4b",
    borderStyle: "border-indigo-900/50",
  },
};

const Chart = ({
  theme,
  data,
}: {
  isDarkMode: boolean;
  theme: typeof themes.editorial;
  data: typeof chartData.editorial;
}) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
      <XAxis
        dataKey="name"
        tick={{
          fill: theme.textColor,
          fontSize: 11,
          opacity: 0.6,
        }}
        tickSize={3}
      />
      <YAxis
        tick={{
          fill: theme.textColor,
          fontSize: 11,
          opacity: 0.6,
        }}
        tickSize={3}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: theme.cardBackground,
          color: theme.textColor,
          border: `1px solid ${theme.borderColor}`,
        }}
      />
      <Bar dataKey="value" fill={theme.chartColor} />
    </BarChart>
  </ResponsiveContainer>
);

export const ChartExample = () => {
  const { theme } = useSystemTheme();
  const [selectedTheme, setSelectedTheme] =
    useState<keyof typeof themes>("editorial");
  const [showLogo, setShowLogo] = useState(false);
  const [showSources, setShowSources] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const { copyImage, downloadImage } = useHtmlToImage({
    ref: contentRef,
    onSuccess: () => toast.success("Image copied to clipboard"),
    onError: () => toast.error("Failed to copy image"),
  });
  const [padding, setPadding] = useState(32);

  const isDarkMode = theme === "dark";
  const currentTheme = themes[selectedTheme];

  const content = (
    <div
      ref={contentRef}
      className={`${currentTheme.background}`}
      style={{ padding: `${padding}px` }}
    >
      <div className={`w-full ${currentTheme.cardBackground} p-8 rounded-lg`}>
        <div className="mb-4 flex items-center gap-4">
          {showLogo && currentTheme.logo}
          <div>
            <h2 className={currentTheme.titleStyle}>{currentTheme.title}</h2>
            <p className={currentTheme.subtitleStyle}>
              {currentTheme.subtitle}
            </p>
          </div>
        </div>

        <div className="w-full h-60">
          <Chart
            isDarkMode={isDarkMode}
            theme={currentTheme}
            data={currentTheme.data}
          />
        </div>

        {showSources && (
          <div
            className={`mt-4 text-[10px] ${currentTheme.sourceTextStyle} border-t pt-4 ${currentTheme.borderStyle}`}
          >
            <p>{currentTheme.sourceText}</p>
          </div>
        )}
      </div>
    </div>
  );

  const sidebar = (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
          Theme
        </p>
        <div className="flex flex-col gap-2">
          {Object.entries(themes).map(([key, theme]) => (
            <Button
              key={key}
              onClick={() => setSelectedTheme(key as keyof typeof themes)}
              variant={selectedTheme === key ? "default" : "outline"}
              size="sm"
            >
              <div
                className={`w-3 h-3 rounded-full flex items-center justify-center ${theme.background}`}
              />
              {theme.name}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm block text-neutral-700 dark:text-neutral-300 mb-2">
          Padding
        </label>
        <div className="flex flex-wrap gap-2">
          {[8, 16, 32, 48, 64].map((value) => (
            <Button
              key={value}
              onClick={() => setPadding(value)}
              variant={padding === value ? "default" : "outline"}
              size="sm"
            >
              {value}px
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="show-logo"
            checked={showLogo}
            onCheckedChange={(checked) => setShowLogo(checked as boolean)}
          />
          <label
            htmlFor="show-logo"
            className="text-sm font-medium leading-none text-neutral-700 dark:text-neutral-300"
          >
            Show chart logo
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="show-sources"
            checked={showSources}
            onCheckedChange={(checked) => setShowSources(checked as boolean)}
          />
          <label
            htmlFor="show-sources"
            className="text-sm font-medium leading-none text-neutral-700 dark:text-neutral-300"
          >
            Show sources
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <ExampleWrapper
      handleCopyImage={() => copyImage()}
      handleDownloadImage={() => downloadImage("chart-example.png")}
      title="Charts"
      subtitle="Share charts with additional context or branding"
      content={content}
      sidebar={sidebar}
    />
  );
};
