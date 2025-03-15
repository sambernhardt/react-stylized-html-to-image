import { useRef, useState } from "react";
import { useHtmlToImage } from "../hooks/useHtmlToImage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HugeiconsIcon } from "@hugeicons/react";
import { CopyIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { ExampleWrapper } from "./ExampleWrapper";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const blogStyles = {
  tech: {
    container: "bg-white dark:bg-neutral-800",
    overlay: "from-white dark:from-neutral-800",
    heading: "font-[Geist_Mono] text-2xl text-neutral-900 dark:text-white",
    meta: "font-[Geist_Mono] text-xs text-neutral-500 dark:text-neutral-400",
    body: "font-[Geist_Mono] text-sm text-neutral-700 dark:text-neutral-300 leading-7",
    blockquoteContainer:
      "py-2 px-6 border-l-4 border-neutral-300 dark:border-neutral-700",
    blockquote:
      "font-[Big_Shoulders] text-3xl font-medium leading-relaxed tracking-tight text-indigo-800 dark:text-indigo-200",
    displayName: "Tech Editorial",
    headingText: "The Future of Web Development",
    firstParagraph:
      "Web development continues to evolve at a rapid pace. With new frameworks, tools, and methodologies emerging every year, developers must stay adaptable and committed to continuous learning. The landscape of modern web development is increasingly complex, requiring mastery of not just core technologies like HTML, CSS, and JavaScript, but also understanding of build tools, testing frameworks, and deployment strategies. This evolution has led to the rise of specialized roles and the need for deeper collaboration between frontend and backend teams.",
    blockquoteText:
      "AI and machine learning are fundamentally reshaping how we build and architect applications for the web, ushering in a new era of development.",
    secondParagraph:
      "This collaboration between human creativity and machine efficiency is leading to unprecedented productivity gains. Projects that once took weeks can now be completed in days, allowing developers to focus on solving more complex problems and delivering better user experiences. The integration of AI-powered tools has revolutionized everything from code completion to testing, while cloud platforms have made deployment and scaling more accessible than ever. These advances are democratizing web development, enabling smaller teams to build and maintain sophisticated applications that would have required much larger teams in the past.",
    author: "Alex Chen",
  },
  minimal: {
    container: "bg-neutral-50 dark:bg-neutral-900",
    overlay: "from-neutral-50 dark:from-neutral-900",
    heading:
      "font-sans text-2xl font-normal text-neutral-900 dark:text-neutral-100",
    meta: "font-sans text-xs text-neutral-500 dark:text-neutral-400",
    body: "font-sans text-sm text-neutral-700 dark:text-neutral-300 leading-7",
    blockquoteContainer: "py-3 px-2",
    blockquote:
      "font-[Inter] text-2xl text-balance tracking-tight leading-snug text-neutral-800 dark:text-neutral-200",
    displayName: "Minimal",
    headingText: "Finding Clarity Through Minimalism",
    firstParagraph:
      "Minimalism isn't about empty spaces and white walls. It's about intentionality and purpose in every choice we make, from the objects we own to the way we spend our time. The philosophy extends far beyond aesthetic choices, influencing how we approach work, relationships, and personal growth. In our increasingly complex world, the principles of minimalism offer a framework for making deliberate choices about what we allow into our lives, helping us distinguish between what adds value and what creates unnecessary complexity.",
    blockquoteText:
      "True minimalism is not about emptiness, but about making room for what matters most. Every choice becomes intentional, every element essential.",
    secondParagraph:
      "By embracing minimalist principles, we create space—both physical and mental—to focus on what truly adds value to our lives. This intentional approach leads to clearer thinking, better decisions, and more meaningful experiences. The practice of minimalism has evolved beyond simple decluttering into a comprehensive lifestyle philosophy that encourages mindful consumption, purposeful living, and the pursuit of quality over quantity. Research has shown that people who adopt minimalist practices often report reduced stress levels, improved focus, and greater overall life satisfaction.",
    author: "Marie Winters",
  },
  editorial: {
    container: "bg-white dark:bg-neutral-900",
    overlay: "from-white dark:from-neutral-900",
    heading:
      "font-[Playfair_Display] text-xl font-bold text-black dark:text-white",
    meta: "font-[Inter] text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider",
    body: "font-[Inter] text-sm text-neutral-700 dark:text-neutral-300 leading-7",
    blockquoteContainer: "py-2 px-0",
    blockquote:
      "font-[Playfair_Display] italic text-2xl leading-tight text-black dark:text-white",
    displayName: "Editorial",
    headingText: "The Hidden Meanings in Modern Television",
    firstParagraph:
      "A seemingly mundane office setting becomes the backdrop for one of the most compelling narratives in recent television history, proving that extraordinary stories can emerge from ordinary places. The show's masterful use of visual metaphor and symbolic imagery creates layers of meaning that reward careful viewing and analysis. Through its meticulous attention to detail in set design, costume choices, and character development, the series constructs a rich tapestry of social commentary that speaks to contemporary workplace dynamics and human psychology.",
    blockquoteText:
      "Through the lens of visual storytelling, we discover profound truths about the human condition and our shared experiences that words alone could never fully capture or express.",
    secondParagraph:
      "The show's visual language has resonated deeply with audiences, sparking conversations about identity, conformity, and the human experience in contemporary workplaces. Each frame is carefully composed to reinforce thematic elements, while subtle recurring motifs build a coherent visual vocabulary that enhances the narrative. The production team's commitment to authenticity extends beyond surface-level details, incorporating historically accurate elements that ground the story in a specific time and place while maintaining its universal appeal. Critics have particularly praised the way the show uses its office setting to explore broader themes of power, ambition, and the search for meaning in modern life.",
    author: "Rebecca Thompson",
  },
  news: {
    container: "bg-white dark:bg-black",
    overlay: "from-white dark:from-black",
    heading:
      "font-[Unbounded] text-xl font-black text-black dark:text-white leading-tight",
    meta: "font-[Inter] text-xs font-medium text-neutral-600 dark:text-neutral-400",
    body: "font-[Inter] text-sm text-neutral-800 dark:text-neutral-300 leading-7",
    blockquoteContainer:
      "py-6 px-6 border border-dashed border-black dark:border-yellow-500",
    blockquote:
      "font-[Roboto_Condensed] text-3xl font-medium leading-tight tracking-tight",
    displayName: "News Media",
    headingText: "Reimagining Urban Infrastructure",
    firstParagraph:
      "Cities face unprecedented challenges in maintaining and upgrading aging infrastructure. From transportation networks to utility systems, the complexity of urban development requires innovative solutions that balance immediate needs with long-term sustainability. Our engineering teams conduct thorough assessments of existing infrastructure, analyzing structural integrity, capacity requirements, and environmental impact. This data-driven approach ensures that infrastructure investments deliver maximum value while minimizing disruption to city residents.",
    blockquoteText:
      "Smart infrastructure isn't just about building new - it's about reimagining what we already have.",
    secondParagraph:
      "Modern urban infrastructure must go beyond basic functionality to create sustainable, resilient cities. Smart technologies are revolutionizing how we monitor and maintain critical systems, from water management to traffic flow. By integrating sensors, data analytics, and automated systems, cities can predict maintenance needs, optimize resource usage, and respond quickly to emergencies. This technological transformation represents a fundamental shift in how we approach urban planning, promising more efficient, livable cities for future generations.",
    author: "Marcus Rivera",
  },
  modern: {
    container: "bg-black dark:bg-black",
    overlay: "from-black dark:from-black",
    heading:
      "font-[Inter] text-xl font-bold text-white dark:text-white leading-tight",
    meta: "font-[Inter] text-xs font-medium text-neutral-400 dark:text-neutral-400",
    body: "font-[Inter] text-sm text-neutral-300 dark:text-neutral-300 leading-7",
    blockquoteContainer: "py-8 px-6 text-center",
    blockquote:
      "font-[DM_Sans] text-3xl font-bold leading-tight text-white dark:text-white",
    displayName: "Dark UI",
    headingText: "The Evolution of Digital Creation",
    firstParagraph:
      "Modern tools are revolutionizing the creative process, making it possible for anyone to bring their ideas to life. The key is finding the balance between accessibility and power, enabling both rapid prototyping and polished execution. The democratization of creative tools has led to an explosion of innovation across industries, from graphic design to 3D modeling. This transformation has been particularly evident in the rise of no-code platforms and AI-assisted creation tools that lower the barrier to entry while maintaining professional-grade capabilities.",
    blockquoteText:
      "In the digital age, creativity knows no bounds. The only limit is your imagination.",
    secondParagraph:
      "As technology evolves, the focus shifts from mere functionality to the quality of interaction. The modern creator demands tools that not only work but enhance their creative flow. This evolution has sparked a renaissance in user interface design, where the emphasis is increasingly on creating immersive, intuitive experiences that feel natural and responsive. The integration of machine learning algorithms has enabled smart tools that can anticipate user needs and adapt to individual workflows, while improvements in real-time collaboration features have made remote creative work more efficient than ever before.",
    author: "Sarah Kim",
  },
  magazine: {
    container: "bg-white dark:bg-black",
    overlay: "from-white dark:from-black",
    heading:
      "font-[Cormorant] text-5xl font-light text-black dark:text-white leading-tight",
    meta: "font-[Syne] text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400",
    body: "font-[Syne] text-sm text-neutral-700 dark:text-neutral-300 leading-7",
    blockquoteContainer:
      "py-8 px-6 border-l-[12px] border-yellow-400 dark:border-yellow-400",
    blockquote:
      "font-[Cormorant] text-3xl italic font-light leading-tight text-black dark:text-white",
    displayName: "Magazine",
    headingText: "The Rebirth of Print in a Digital Age",
    firstParagraph:
      "Against all predictions of its demise, print media is experiencing a renaissance as readers increasingly seek refuge from the endless scroll of digital content in the tactile pleasure and focused experience that only physical publications can provide. This revival is particularly evident in the luxury magazine sector, where high-quality paper stocks, innovative printing techniques, and careful attention to design create immersive reading experiences that digital media cannot replicate. The trend reflects a broader cultural shift toward mindful consumption and appreciation for craftsmanship in an age of mass production and digital ephemera.",
    blockquoteText:
      "In a world of fleeting digital moments, print endures as a testament to the timeless power of tangible storytelling.",
    secondParagraph:
      "This revival is not merely nostalgic but represents a sophisticated consumer response to digital fatigue, with independent magazines leading the way by offering carefully curated content, innovative design, and a physical artifact that commands attention in ways that pixels on a screen simply cannot. The success of these publications has challenged conventional wisdom about the future of media, demonstrating that print and digital can coexist and complement each other. Publishers are increasingly adopting hybrid models that combine the permanence and tactile appeal of print with the immediacy and interactivity of digital platforms, creating rich, multi-channel experiences that engage readers across multiple touchpoints.",
    author: "Isabella Laurent",
  },
};

export const BlogPostExample = () => {
  const [selectedStyle, setSelectedStyle] =
    useState<keyof typeof blogStyles>("tech");
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);
  const { downloadImage, copyImage } = useHtmlToImage({
    ref: quoteRef,
    onSuccess: () => toast.success("Image copied to clipboard"),
    onError: () => toast.error("Failed to copy image"),
  });
  const [showIsCopied, setShowIsCopied] = useState(false);

  const handleCopyImage = async () => {
    setIsTakingScreenshot(true);
    await copyImage();
    setIsTakingScreenshot(false);
    setShowIsCopied(true);
    setTimeout(() => {
      setShowIsCopied(false);
    }, 2000);
  };

  const currentStyle = blogStyles[selectedStyle];

  const content = (
    <div
      className={`${currentStyle.container} p-6 rounded-lg flex items-center h-[450px]`}
    >
      <div className="relative w-full max-w-[500px] mx-auto">
        {/* Content above blockquote */}
        <div className="absolute bottom-[100%] pb-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className={currentStyle.heading}>
                {currentStyle.headingText}
              </h1>
              <div className={currentStyle.meta}>
                {currentStyle.author} • May 15, 2023
              </div>
            </div>

            <p className={currentStyle.body}>{currentStyle.firstParagraph}</p>
          </div>
        </div>

        {/* Centered blockquote */}
        <div className="w-full">
          <div className={currentStyle.blockquoteContainer}>
            <blockquote className={currentStyle.blockquote}>
              {currentStyle.blockquoteText}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleCopyImage}
                      variant="ghost"
                      className="inline-flex opacity-50 ml-3"
                      style={{
                        width: "14px",
                        height: "14px",
                        padding: "0",
                      }}
                    >
                      {showIsCopied ? (
                        <HugeiconsIcon icon={Tick02Icon} />
                      ) : (
                        <HugeiconsIcon icon={CopyIcon} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy quote</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </blockquote>
            <div className={`${currentStyle.meta} mt-4`}>
              {currentStyle.displayName} • May 15, 2023
            </div>
          </div>
        </div>

        {/* Content below blockquote */}
        <div className="absolute top-[100%] pt-6">
          <div className="flex flex-col gap-6">
            <p className={currentStyle.body}>{currentStyle.secondParagraph}</p>
          </div>
        </div>
      </div>

      {/* Screenshot container */}
      <div
        ref={quoteRef}
        className={`fixed top-0 left-0 z-[-1] p-6 ${currentStyle.container}`}
        style={{
          width: "600px",
          visibility: isTakingScreenshot ? "visible" : "hidden",
        }}
      >
        <div className={`${currentStyle.blockquoteContainer}`}>
          <blockquote className={currentStyle.blockquote}>
            <span className="ml-[-15px] w-[5px] opacity-50">&quot; </span>
            {currentStyle.blockquoteText}
            <span className="opacity-50"> &quot;</span>
          </blockquote>
          <div className={`${currentStyle.meta} mt-4`}>
            {currentStyle.displayName} • May 15, 2023
          </div>
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-b ${currentStyle.overlay} to-transparent pointer-events-none`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t to-transparent ${currentStyle.overlay} pointer-events-none`}
      ></div>
    </div>
  );

  const sidebar = (
    <>
      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
        Style
      </p>
      <div className="flex flex-col gap-2">
        {Object.entries(blogStyles).map(([key, style]) => (
          <Button
            key={key}
            onClick={() => setSelectedStyle(key as keyof typeof blogStyles)}
            variant={selectedStyle === key ? "default" : "outline"}
            size="sm"
          >
            {style.displayName}
          </Button>
        ))}
      </div>
    </>
  );

  return (
    <ExampleWrapper
      handleCopyImage={handleCopyImage}
      handleDownloadImage={() => downloadImage("blog-post.png")}
      title="Pull quotes"
      subtitle="Copy pull quotes in a branded style"
      content={content}
      sidebar={sidebar}
    />
  );
};
