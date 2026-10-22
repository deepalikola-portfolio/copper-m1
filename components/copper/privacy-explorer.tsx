"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  ForgetVisual,
  ListeningScene,
  ListeningVisual,
  MemoryScene,
  NotesScene,
  NotesVisual,
  TrainingScene,
  TrainingVisual,
  WakeWordScene,
  WakeWordVisual,
} from "@/components/copper/privacy-illustrations";
import { cn } from "@/lib/utils";

type PrivacyExplorerProps = {
  wakeWord: string;
  freeMemory: string;
  plusMemory: string;
};

type CardContent = {
  id: string;
  question: string;
  front: ReactNode;
  example: ReactNode;
  visual: ReactNode;
  takeaway: string;
  span: string;
};

function buildCards({
  wakeWord,
  freeMemory,
  plusMemory,
}: PrivacyExplorerProps): CardContent[] {
  return [
    {
      id: "listening",
      question: "Is Mr. Copper listening to everything I say?",
      front: <ListeningScene />,
      example: (
        <>
          Imagine you&apos;re chatting with friends in your living room. Copper
          listens locally for &ldquo;{wakeWord},&rdquo; but nothing is sent to
          the cloud until you say those words.
        </>
      ),
      visual: <ListeningVisual wakeWord={wakeWord} />,
      takeaway: "Your conversations stay local until you activate Copper.",
      span: "lg:col-span-2",
    },
    {
      id: "wake-word",
      question: `What happens after I say '${wakeWord}'?`,
      front: <WakeWordScene />,
      example: (
        <>
          Say, &ldquo;{wakeWord}, what&apos;s the weather tomorrow?&rdquo; Your
          request goes to Copper Cloud and is saved for {freeMemory} on Free or{" "}
          {plusMemory} on Copper Plus.
        </>
      ),
      visual: (
        <WakeWordVisual freeMemory={freeMemory} plusMemory={plusMemory} />
      ),
      takeaway: "Know what's saved. Delete it anytime.",
      span: "lg:col-span-2",
    },
    {
      // Reworded from "...without sending my recordings to the cloud?": the
      // policy only says where transcription happens, not that nothing is uploaded.
      id: "notes",
      question: "Where does Copper Notes turn my voice into text?",
      front: <NotesScene />,
      example: (
        <>
          Imagine recording your next big idea using Copper Notes. Your
          recording is transcribed on your device. Transcripts and summaries are
          stored for {freeMemory} on Free or {plusMemory} on Copper Plus.
        </>
      ),
      visual: <NotesVisual />,
      takeaway: "On-device transcription. Clear retention periods.",
      span: "lg:col-span-2",
    },
    {
      id: "forget",
      question: "Can I make Mr. Copper forget something?",
      front: <MemoryScene />,
      example: (
        <>
          Imagine you asked Copper to remember a household preference but
          changed your mind. Open the Copper app and delete it from Household
          Memory.
        </>
      ),
      visual: <ForgetVisual />,
      takeaway: "You decide what Copper remembers.",
      span: "lg:col-span-3",
    },
    {
      id: "training",
      question: "Is Mr. Copper using my conversations to train AI?",
      front: <TrainingScene />,
      example: (
        <>
          Copper State Labs doesn&apos;t sell your recordings or use them to
          train models unless you choose to opt in.
        </>
      ),
      visual: <TrainingVisual />,
      takeaway: "Your voice. Your choice.",
      span: "lg:col-span-3",
    },
  ];
}

function FlipCard({
  card,
  index,
  flipped,
  onFlip,
}: {
  card: CardContent;
  index: number;
  flipped: boolean;
  onFlip: (next: boolean) => void;
}) {
  const frontButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const firstRender = useRef(true);

  // Keep keyboard focus on the visible face after a flip.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    (flipped ? backButton : frontButton).current?.focus({
      preventScroll: true,
    });
  }, [flipped]);

  return (
    <li
      className={cn("pc-tilt", card.span)}
      onKeyDown={(event) => {
        if (event.key === "Escape" && flipped) onFlip(false);
      }}
    >
      <div
        data-testid="privacy-card"
        data-card={card.id}
        data-flipped={flipped}
        className="pc-flip"
      >
        <div className="pc-flip-inner">
          {/* front: the question */}
          <div className="pc-face" inert={flipped}>
            <button
              ref={frontButton}
              type="button"
              aria-expanded={flipped}
              onClick={() => onFlip(true)}
              className="from-card to-secondary/70 text-card-foreground flex h-full w-full flex-col justify-between gap-4 rounded-3xl border bg-gradient-to-br p-6 text-left shadow-xl shadow-foreground/10 outline-none focus-visible:ring-4 focus-visible:ring-ring/60"
            >
              <span className="text-primary text-xs font-bold tracking-widest uppercase">
                Question {index + 1} of 5
              </span>
              <span className="block text-2xl leading-snug font-extrabold text-balance sm:text-[1.7rem]">
                {card.question}
              </span>
              <span className="block">{card.front}</span>
              <span className="text-muted-foreground flex items-center gap-2 text-sm font-semibold">
                <span
                  aria-hidden
                  className="bg-primary inline-block size-2 rounded-full pc-anim pc-pulse-dot"
                  style={{ animationPlayState: "running" }}
                />
                Tap to reveal
              </span>
            </button>
          </div>

          {/* back: the example */}
          <div className="pc-face pc-back" inert={!flipped}>
            <div className="bg-card text-card-foreground border-primary/40 flex h-full flex-col gap-4 rounded-3xl border-2 p-6 shadow-xl shadow-foreground/10">
              <p className="text-primary text-xs font-bold tracking-widest uppercase">
                For example
              </p>
              <h3 className="sr-only">{card.question}</h3>
              <p className="text-base leading-relaxed">{card.example}</p>
              <div className="bg-secondary/60 rounded-2xl p-2">
                {card.visual}
              </div>
              <p className="bg-primary text-primary-foreground rounded-2xl px-4 py-3 text-center text-base font-extrabold text-balance">
                {card.takeaway}
              </p>
              <button
                ref={backButton}
                type="button"
                onClick={() => onFlip(false)}
                className="text-muted-foreground hover:text-foreground mt-auto self-start rounded-full border px-4 py-1.5 text-sm font-bold outline-none focus-visible:ring-4 focus-visible:ring-ring/60"
              >
                ← Flip back
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function PrivacyExplorer(props: PrivacyExplorerProps) {
  const cards = buildCards(props);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [explored, setExplored] = useState<Record<string, boolean>>({});
  const exploredCount = cards.filter((card) => explored[card.id]).length;

  const flip = (id: string, next: boolean) => {
    setFlipped((current) => ({ ...current, [id]: next }));
    if (next) setExplored((current) => ({ ...current, [id]: true }));
  };

  return (
    <div className="from-background via-secondary/40 to-background bg-gradient-to-b">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-primary mb-3 text-sm font-bold tracking-widest uppercase">
            Your privacy. Your questions. Answered.
          </p>
          <h2 className="text-4xl leading-tight font-extrabold text-balance sm:text-5xl">
            {props.wakeWord}, what happens to my data?
          </h2>
          <p className="text-muted-foreground mt-4 text-lg text-balance">
            Five questions you&apos;ve probably wondered about. Five answers you
            deserve to know.
          </p>
          <p className="mt-6 text-sm font-bold">
            Pick a question. Flip the card. See what happens.
          </p>
          <div
            className="mt-4 flex items-center justify-center gap-3"
            data-testid="privacy-progress"
          >
            <ol aria-hidden className="flex gap-2">
              {cards.map((card) => (
                <li
                  key={card.id}
                  className={cn(
                    "size-3 rounded-full border-2 transition-colors duration-500",
                    explored[card.id]
                      ? "bg-primary border-primary"
                      : "border-foreground/30",
                  )}
                />
              ))}
            </ol>
            <p
              className="text-muted-foreground text-sm font-semibold"
              aria-live="polite"
            >
              {exploredCount === cards.length
                ? "You've explored all five. You're in the know."
                : `${exploredCount} of ${cards.length} explored`}
            </p>
          </div>
        </header>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {cards.map((card, index) => (
            <FlipCard
              key={card.id}
              card={card}
              index={index}
              flipped={!!flipped[card.id]}
              onFlip={(next) => flip(card.id, next)}
            />
          ))}
        </ul>

        <div className="mx-auto mt-20 flex max-w-xl flex-col items-center text-center">
          <Image
            src="/assets/brand/copper-mascot.png"
            alt="Mr. Copper, the friendly Copper robot, waving"
            width={1254}
            height={1254}
            sizes="144px"
            className="mb-4 h-auto w-36"
          />
          <h3 className="text-3xl leading-tight font-extrabold text-balance sm:text-4xl">
            Ask freely. Stay informed. You&apos;re in control.
          </h3>
          <p className="text-muted-foreground mt-3 text-lg text-balance">
            Your everyday assistant, with privacy choices you can understand.
          </p>
          {/* No privacy-settings route exists yet, so this is a labelled placeholder. */}
          <button
            type="button"
            aria-disabled="true"
            aria-describedby="privacy-settings-note"
            className="bg-primary text-primary-foreground mt-6 h-12 cursor-not-allowed rounded-full px-8 text-base font-extrabold opacity-90"
          >
            Explore Privacy Settings
          </button>
          <p
            id="privacy-settings-note"
            className="text-muted-foreground mt-3 text-sm"
          >
            Placeholder: privacy settings aren&apos;t available on this page
            yet. For now, manage your recordings and memory in the Copper app.
          </p>
        </div>
      </div>
    </div>
  );
}
