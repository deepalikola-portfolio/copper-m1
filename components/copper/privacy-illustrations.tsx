// Original SVG scenes for the privacy flip cards. Fronts are floating
// illustrations; backs are small animated diagrams that play once a card is
// flipped (see the pc-* rules in app/globals.css). All colors are brand colors.
import type { ReactNode } from "react";

const NIGHT = "#1c2333";
const COPPER = "#b87333";
const SAND = "#efe3d0";
const SUNSET = "#e8663d";
const YELLOW = "#f2c230";
const TEAL = "#4a8c82";

type Mood = "calm" | "talk" | "think" | "happy";

/** Mr. Copper, drawn in a 100 x 120 box. Place it with a transform. */
function MrCopper({ mood = "happy" }: { mood?: Mood }) {
  return (
    <g>
      <line
        x1="50"
        y1="15"
        x2="50"
        y2="5"
        stroke={NIGHT}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="50" cy="5" r="5" fill={TEAL} className="pc-anim pc-glow" />
      <rect x="28" y="64" width="44" height="42" rx="18" fill={COPPER} />
      <circle cx="50" cy="86" r="9" fill="none" stroke={SAND} strokeWidth="4" />
      <ellipse cx="22" cy="82" rx="7" ry="11" fill={COPPER} />
      <ellipse cx="78" cy="82" rx="7" ry="11" fill={COPPER} />
      <circle cx="14" cy="40" r="7" fill={COPPER} />
      <circle cx="86" cy="40" r="7" fill={COPPER} />
      <rect x="16" y="14" width="68" height="52" rx="24" fill={COPPER} />
      <rect x="25" y="23" width="50" height="32" rx="16" fill={NIGHT} />
      {mood === "calm" && (
        <g stroke={YELLOW} strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d="M34 40 q5 -6 10 0" />
          <path d="M56 40 q5 -6 10 0" />
        </g>
      )}
      {mood === "talk" && (
        <g fill={YELLOW}>
          <circle cx="40" cy="38" r="4.5" />
          <circle cx="60" cy="38" r="4.5" />
          <rect x="42" y="46" width="16" height="4" rx="2" />
        </g>
      )}
      {mood === "think" && (
        <g fill={YELLOW}>
          <circle cx="42" cy="36" r="4.5" />
          <circle cx="62" cy="36" r="4.5" />
          <rect x="44" y="47" width="10" height="3" rx="1.5" />
        </g>
      )}
      {mood === "happy" && (
        <g fill={YELLOW}>
          <circle cx="40" cy="37" r="4.5" />
          <circle cx="60" cy="37" r="4.5" />
          <path
            d="M42 46 q8 7 16 0"
            stroke={YELLOW}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      )}
    </g>
  );
}

function Scene({ children, h = 200 }: { children: ReactNode; h?: number }) {
  return (
    <svg
      viewBox={`0 0 320 ${h}`}
      aria-hidden="true"
      focusable="false"
      className="h-auto w-full"
    >
      {children}
    </svg>
  );
}

/* ---------------------------------------------------------------- fronts */

export function ListeningScene() {
  return (
    <Scene>
      <ellipse
        cx="160"
        cy="176"
        rx="130"
        ry="10"
        className="fill-foreground/10"
      />
      <g className="pc-float">
        <rect x="34" y="84" width="180" height="76" rx="22" fill={TEAL} />
        <rect x="22" y="100" width="30" height="62" rx="14" fill={TEAL} />
        <rect x="196" y="100" width="30" height="62" rx="14" fill={TEAL} />
        <rect
          x="52"
          y="120"
          width="144"
          height="40"
          rx="14"
          fill={TEAL}
          fillOpacity="0.75"
        />
        {/* friend one */}
        <rect x="70" y="92" width="38" height="46" rx="16" fill={SUNSET} />
        <circle cx="89" cy="78" r="14" fill={SAND} />
        <circle cx="84" cy="77" r="1.8" fill={NIGHT} />
        <circle cx="94" cy="77" r="1.8" fill={NIGHT} />
        <path
          d="M84 83 q5 4 10 0"
          stroke={NIGHT}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        {/* friend two */}
        <rect x="124" y="92" width="38" height="46" rx="16" fill={YELLOW} />
        <circle cx="143" cy="78" r="14" fill={SAND} />
        <circle cx="138" cy="77" r="1.8" fill={NIGHT} />
        <circle cx="148" cy="77" r="1.8" fill={NIGHT} />
        <path
          d="M138 83 q5 4 10 0"
          stroke={NIGHT}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        {/* chat bubbles stay in the room */}
        <rect
          x="52"
          y="30"
          width="58"
          height="26"
          rx="13"
          className="fill-card stroke-foreground/20"
        />
        <g fill={COPPER}>
          <circle cx="68" cy="43" r="3" />
          <circle cx="81" cy="43" r="3" />
          <circle cx="94" cy="43" r="3" />
        </g>
        <rect
          x="118"
          y="20"
          width="50"
          height="24"
          rx="12"
          className="fill-card stroke-foreground/20"
        />
        <g fill={TEAL}>
          <circle cx="132" cy="32" r="2.6" />
          <circle cx="143" cy="32" r="2.6" />
          <circle cx="154" cy="32" r="2.6" />
        </g>
        <rect
          x="236"
          y="120"
          width="60"
          height="42"
          rx="10"
          className="fill-secondary stroke-foreground/15"
        />
      </g>
      <g transform="translate(240 66) scale(0.5)">
        <g className="pc-float pc-delay-2">
          <MrCopper mood="calm" />
        </g>
      </g>
      <text x="272" y="64" fontSize="14" fontWeight="800" fill={COPPER}>
        z
      </text>
      <text x="282" y="52" fontSize="11" fontWeight="800" fill={COPPER}>
        z
      </text>
    </Scene>
  );
}

export function WakeWordScene() {
  return (
    <Scene>
      <ellipse
        cx="110"
        cy="182"
        rx="70"
        ry="9"
        className="fill-foreground/10"
      />
      <g transform="translate(40 52) scale(1.1)">
        <g className="pc-float">
          <MrCopper mood="talk" />
        </g>
      </g>
      <g className="pc-float pc-delay-1">
        <path
          d="M168 40 h120 a16 16 0 0 1 16 16 v40 a16 16 0 0 1 -16 16 h-84 l-24 22 v-22 h-12 a16 16 0 0 1 -16 -16 v-40 a16 16 0 0 1 16 -16z"
          fill={SUNSET}
        />
        <text
          x="236"
          y="84"
          textAnchor="middle"
          fontSize="19"
          fontWeight="800"
          fill={NIGHT}
        >
          Hey Copper!
        </text>
        <g stroke={YELLOW} strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d="M160 128 q-10 8 0 16" />
          <path d="M150 122 q-18 14 0 28" />
        </g>
      </g>
      <circle
        cx="300"
        cy="30"
        r="7"
        fill={YELLOW}
        className="pc-float pc-delay-2"
      />
      <circle
        cx="176"
        cy="22"
        r="5"
        fill={TEAL}
        className="pc-float pc-delay-3"
      />
    </Scene>
  );
}

export function NotesScene() {
  return (
    <Scene>
      <ellipse
        cx="160"
        cy="180"
        rx="130"
        ry="9"
        className="fill-foreground/10"
      />
      <g className="pc-float">
        <rect
          x="30"
          y="40"
          width="108"
          height="136"
          rx="14"
          fill={SAND}
          stroke={COPPER}
          strokeWidth="3"
        />
        <g fill={COPPER}>
          {[56, 76, 96, 116, 136, 156].map((y) => (
            <circle key={y} cx="30" cy={y} r="4" />
          ))}
        </g>
        <g
          className="stroke-foreground/30"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <line x1="52" y1="70" x2="120" y2="70" />
          <line x1="52" y1="90" x2="110" y2="90" />
          <line x1="52" y1="110" x2="118" y2="110" />
          <line x1="52" y1="130" x2="96" y2="130" />
        </g>
      </g>
      <g transform="translate(154 80)">
        {[12, 28, 18, 40, 24, 34, 14].map((height, i) => (
          <rect
            key={i}
            x={i * 14}
            y={40 - height / 2}
            width="8"
            height={height}
            rx="4"
            fill={i % 2 ? COPPER : SUNSET}
            className="pc-anim pc-wave"
            style={{
              animationDelay: `${i * 0.12}s`,
              animationPlayState: "running",
            }}
          />
        ))}
      </g>
      <g className="pc-float pc-delay-2">
        <rect x="236" y="128" width="62" height="44" rx="14" fill={COPPER} />
        <circle cx="267" cy="150" r="11" fill={NIGHT} />
        <circle
          cx="267"
          cy="150"
          r="14"
          fill="none"
          stroke={YELLOW}
          strokeWidth="3"
          className="pc-anim pc-glow"
          style={{ animationPlayState: "running" }}
        />
      </g>
    </Scene>
  );
}

export function MemoryScene() {
  const bubbles: { cx: number; cy: number; delay: string; icon: ReactNode }[] =
    [
      {
        cx: 54,
        cy: 54,
        delay: "pc-delay-1",
        icon: (
          <g stroke={YELLOW} strokeWidth="3" strokeLinecap="round" fill="none">
            <circle cx="54" cy="54" r="6" fill={YELLOW} />
            <path d="M54 40v4M54 64v4M40 54h4M64 54h4M44 44l3 3M61 61l3 3M64 44l-3 3M47 61l-3 3" />
          </g>
        ),
      },
      {
        cx: 268,
        cy: 62,
        delay: "pc-delay-2",
        icon: (
          <path
            d="M268 46 c8 12 12 18 12 24 a12 12 0 0 1 -24 0 c0 -6 4 -12 12 -24z"
            fill={TEAL}
          />
        ),
      },
      {
        cx: 244,
        cy: 150,
        delay: "pc-delay-3",
        icon: (
          <g>
            <circle cx="244" cy="146" r="8" fill={YELLOW} />
            <rect x="239" y="154" width="10" height="6" rx="2" fill={NIGHT} />
          </g>
        ),
      },
      {
        cx: 78,
        cy: 148,
        delay: "pc-delay-2",
        icon: <path d="M64 150 l14 -14 l14 14 v12 h-28z" fill={SUNSET} />,
      },
    ];
  return (
    <Scene>
      <ellipse
        cx="160"
        cy="184"
        rx="60"
        ry="8"
        className="fill-foreground/10"
      />
      {bubbles.map((bubble) => (
        <g key={bubble.cx} className={`pc-float ${bubble.delay}`}>
          <circle
            cx={bubble.cx}
            cy={bubble.cy}
            r="26"
            className="fill-card stroke-foreground/20"
          />
          {bubble.icon}
        </g>
      ))}
      <g transform="translate(112 44) scale(0.95)">
        <g className="pc-float">
          <MrCopper mood="think" />
        </g>
      </g>
      <g fill={COPPER} fillOpacity="0.6">
        <circle cx="106" cy="52" r="4" />
        <circle cx="96" cy="40" r="3" />
      </g>
    </Scene>
  );
}

export function TrainingScene() {
  return (
    <Scene>
      <ellipse
        cx="150"
        cy="184"
        rx="80"
        ry="9"
        className="fill-foreground/10"
      />
      <g transform="translate(96 60) scale(1)">
        <g className="pc-float">
          <MrCopper mood="think" />
        </g>
      </g>
      {[
        { x: 40, y: 70, size: 44, fill: COPPER, d: "pc-delay-1" },
        { x: 224, y: 56, size: 56, fill: SUNSET, d: "pc-delay-2" },
        { x: 252, y: 140, size: 34, fill: TEAL, d: "pc-delay-3" },
        { x: 64, y: 156, size: 30, fill: YELLOW, d: "pc-delay-2" },
      ].map((mark) => (
        <text
          key={`${mark.x}-${mark.y}`}
          x={mark.x}
          y={mark.y}
          fontSize={mark.size}
          fontWeight="800"
          fill={mark.fill}
          className={`pc-float ${mark.d}`}
        >
          ?
        </text>
      ))}
    </Scene>
  );
}

/* ----------------------------------------------------------------- backs */

function Cloud({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M20 44 a16 16 0 0 1 2 -31 a22 22 0 0 1 42 4 a15 15 0 0 1 2 27z"
        fill={TEAL}
        fillOpacity="0.9"
      />
      <text
        x="43"
        y="62"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        className="fill-muted-foreground"
      >
        Copper Cloud
      </text>
    </g>
  );
}

function Back({
  children,
  label,
  h = 150,
}: {
  children: ReactNode;
  label: string;
  h?: number;
}) {
  return (
    <svg
      viewBox={`0 0 320 ${h}`}
      role="img"
      aria-label={label}
      className="h-auto w-full"
    >
      {children}
    </svg>
  );
}

export function ListeningVisual({ wakeWord }: { wakeWord: string }) {
  const bubble = (y: number, h: number, stroke: string) => ({
    y,
    h,
    stroke,
  });
  const first = bubble(14, 26, SUNSET);
  const second = bubble(46, 38, YELLOW);
  const third = bubble(90, 38, SUNSET);
  return (
    <Back
      h={200}
      label={`Two people in a living room talk about running out of coriander. Nothing leaves the room until one says "${wakeWord}, add coriander to the shopping list." Then Mr. Copper lights up and the request travels to the cloud.`}
    >
      <rect
        x="6"
        y="4"
        width="206"
        height="192"
        rx="18"
        className="fill-secondary stroke-foreground/20"
        strokeDasharray="5 5"
      />
      <text
        x="206"
        y="196"
        textAnchor="end"
        fontSize="8.5"
        fontWeight="700"
        className="fill-muted-foreground"
      >
        Your living room
      </text>

      {/* the conversation stays in the room */}
      <g className="pc-anim pc-say-1">
        <rect
          x="14"
          y={first.y}
          width="150"
          height={first.h}
          rx="13"
          className="fill-card"
          stroke={first.stroke}
          strokeWidth="1.5"
        />
        <text
          x="24"
          y={first.y + 17}
          fontSize="10.5"
          fontWeight="600"
          className="fill-foreground"
        >
          We ran out of coriander.
        </text>
      </g>
      <g className="pc-anim pc-say-2">
        <rect
          x="40"
          y={second.y}
          width="164"
          height={second.h}
          rx="13"
          className="fill-card"
          stroke={second.stroke}
          strokeWidth="1.5"
        />
        <text
          x="50"
          y={second.y + 16}
          fontSize="10.5"
          fontWeight="600"
          className="fill-foreground"
        >
          Oh okay, I&apos;ll add it
        </text>
        <text
          x="50"
          y={second.y + 30}
          fontSize="10.5"
          fontWeight="600"
          className="fill-foreground"
        >
          to the list.
        </text>
      </g>
      <g className="pc-anim pc-say-3">
        <rect
          x="14"
          y={third.y}
          width="170"
          height={third.h}
          rx="13"
          fill={SUNSET}
        />
        <text
          x="24"
          y={third.y + 16}
          fontSize="10.5"
          fontWeight="800"
          fill={NIGHT}
        >
          {wakeWord}, add coriander
        </text>
        <text
          x="24"
          y={third.y + 30}
          fontSize="10.5"
          fontWeight="800"
          fill={NIGHT}
        >
          to the shopping list.
        </text>
      </g>

      {/* two people on the couch */}
      <g>
        <rect x="26" y="146" width="26" height="36" rx="11" fill={SUNSET} />
        <circle
          cx="39"
          cy="138"
          r="9"
          fill={SAND}
          stroke={NIGHT}
          strokeOpacity="0.3"
        />
        <rect x="82" y="146" width="26" height="36" rx="11" fill={YELLOW} />
        <circle
          cx="95"
          cy="138"
          r="9"
          fill={SAND}
          stroke={NIGHT}
          strokeOpacity="0.3"
        />
        <rect x="18" y="170" width="98" height="14" rx="7" fill={TEAL} />
      </g>

      {/* Mr. Copper: asleep, then shines and wakes on the wake word */}
      <g transform="translate(173 150)">
        <g className="pc-anim pc-halo">
          <circle r="34" fill={YELLOW} fillOpacity="0.35" />
          <circle r="28" fill="none" stroke={YELLOW} strokeWidth="3" />
        </g>
        <g transform="translate(-24 -22) scale(0.48)">
          <g className="pc-anim pc-sleep">
            <MrCopper mood="calm" />
          </g>
          <g className="pc-anim pc-awake">
            <MrCopper mood="talk" />
          </g>
        </g>
      </g>

      {/* then the request goes to the cloud */}
      <line
        x1="196"
        y1="136"
        x2="256"
        y2="70"
        className="stroke-foreground/25"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <Cloud x={238} y={16} />
      <circle
        cx="196"
        cy="136"
        r="6"
        fill={SUNSET}
        className="pc-anim pc-travel-c"
      />
    </Back>
  );
}

export function WakeWordVisual({
  freeMemory,
  plusMemory,
}: {
  freeMemory: string;
  plusMemory: string;
}) {
  return (
    <Back
      label={`A voice request travels from Mr. Copper to Copper Cloud and is saved for ${freeMemory} on Free or ${plusMemory} on Copper Plus.`}
    >
      <g transform="translate(10 4) scale(0.5)">
        <MrCopper mood="talk" />
      </g>
      <line
        x1="72"
        y1="38"
        x2="236"
        y2="38"
        className="stroke-foreground/25"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <circle
        cx="76"
        cy="38"
        r="6"
        fill={SUNSET}
        className="pc-anim pc-travel-b"
      />
      <Cloud x={236} y={8} />
      <g fontSize="10" fontWeight="700">
        <text x="10" y="98" className="fill-muted-foreground">
          Free · {freeMemory}
        </text>
        <rect
          x="10"
          y="104"
          width="300"
          height="8"
          rx="4"
          className="fill-foreground/10"
        />
        <rect
          x="10"
          y="104"
          width="38"
          height="8"
          rx="4"
          fill={COPPER}
          className="pc-anim pc-grow"
        />
        <text x="10" y="132" className="fill-muted-foreground">
          Copper Plus · {plusMemory}
        </text>
        <rect
          x="10"
          y="138"
          width="300"
          height="8"
          rx="4"
          className="fill-foreground/10"
        />
        <rect
          x="10"
          y="138"
          width="300"
          height="8"
          rx="4"
          fill={TEAL}
          className="pc-anim pc-grow"
          style={{ animationDelay: "0.3s" }}
        />
      </g>
    </Back>
  );
}

export function NotesVisual() {
  return (
    <Back label="An audio waveform becomes written notes inside a phone, transcribed on the device.">
      <g transform="translate(8 36)">
        {[16, 40, 26, 58, 34, 48, 22, 36].map((height, i) => (
          <rect
            key={i}
            x={i * 14}
            y={39 - height / 2}
            width="8"
            height={height}
            rx="4"
            fill={i % 2 ? COPPER : SUNSET}
            className="pc-anim pc-wave"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </g>
      <path
        d="M128 75 h36 m-8 -8 l8 8 l-8 8"
        className="stroke-foreground/40"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect
        x="180"
        y="6"
        width="108"
        height="140"
        rx="20"
        className="fill-card stroke-foreground/30"
        strokeWidth="2.5"
      />
      <rect
        x="222"
        y="12"
        width="24"
        height="5"
        rx="2.5"
        className="fill-foreground/20"
      />
      <text
        x="234"
        y="38"
        textAnchor="middle"
        fontSize="10"
        fontWeight="800"
        fill={TEAL}
      >
        On your device
      </text>
      {[54, 72, 90, 108].map((y, i) => (
        <rect
          key={y}
          x="196"
          y={y}
          width={[76, 62, 70, 44][i]}
          height="8"
          rx="4"
          fill={i === 0 ? COPPER : SAND}
          stroke={COPPER}
          strokeOpacity="0.4"
          className="pc-anim pc-type"
          style={{ animationDelay: `${0.4 + i * 0.35}s` }}
        />
      ))}
    </Back>
  );
}

export function ForgetVisual() {
  return (
    <Back label="In the Copper app, a memory card is deleted from Household Memory and gently disappears.">
      <rect
        x="86"
        y="4"
        width="148"
        height="142"
        rx="22"
        className="fill-card stroke-foreground/30"
        strokeWidth="2.5"
      />
      <text
        x="160"
        y="28"
        textAnchor="middle"
        fontSize="10"
        fontWeight="800"
        fill={COPPER}
      >
        Household Memory
      </text>
      <g>
        <rect
          x="100"
          y="86"
          width="120"
          height="30"
          rx="10"
          fill={SAND}
          stroke={COPPER}
          strokeOpacity="0.5"
        />
        <text x="110" y="105" fontSize="9.5" fontWeight="600" fill={NIGHT}>
          Pause sprinklers for rain
        </text>
      </g>
      <g className="pc-anim pc-forget">
        <rect
          x="100"
          y="42"
          width="120"
          height="30"
          rx="10"
          fill={SAND}
          stroke={COPPER}
          strokeOpacity="0.5"
        />
        <text x="110" y="61" fontSize="9.5" fontWeight="600" fill={NIGHT}>
          Pool service: Tuesdays
        </text>
        <circle cx="206" cy="57" r="8" fill={SUNSET} />
        <path
          d="M202 53 l8 8 M210 53 l-8 8"
          stroke={NIGHT}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <g className="pc-anim pc-chip">
        <rect x="124" y="124" width="72" height="16" rx="8" fill={TEAL} />
        <text
          x="160"
          y="136"
          textAnchor="middle"
          fontSize="9"
          fontWeight="800"
          fill={NIGHT}
        >
          Deleted
        </text>
      </g>
      <g transform="translate(14 40) scale(0.5)">
        <MrCopper mood="happy" />
      </g>
    </Back>
  );
}

export function TrainingVisual() {
  const rows = [
    { y: 8, label: "Selling recordings", value: "No", dashed: false },
    { y: 78, label: "AI training", value: "Optional opt-in", dashed: true },
  ];
  return (
    <Back label="Two controls: selling recordings is No, and AI training is an optional opt-in.">
      {rows.map((row) => (
        <g key={row.label}>
          <rect
            x="8"
            y={row.y}
            width="304"
            height="60"
            rx="16"
            className="fill-card stroke-foreground/20"
          />
          <text
            x="26"
            y={row.y + 26}
            fontSize="12"
            fontWeight="800"
            className="fill-foreground"
          >
            {row.label}
          </text>
          <text
            x="26"
            y={row.y + 44}
            fontSize="11"
            fontWeight="700"
            fill={row.dashed ? TEAL : SUNSET}
          >
            {row.value}
          </text>
          <rect
            x="244"
            y={row.y + 17}
            width="48"
            height="26"
            rx="13"
            className={
              row.dashed
                ? "pc-anim pc-pulse fill-secondary stroke-accent"
                : "fill-secondary stroke-foreground/25"
            }
            strokeWidth="2"
            strokeDasharray={row.dashed ? "4 3" : undefined}
          />
          <circle
            cx="257"
            cy={row.y + 30}
            r="9"
            fill={row.dashed ? TEAL : COPPER}
          />
        </g>
      ))}
    </Back>
  );
}
