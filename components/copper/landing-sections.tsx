import Image from "next/image";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
  getPrivacySummary,
  getProducts,
  type Product,
} from "@/lib/copper/catalog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TAGLINE = "From raw ideas to refined answers.";

const IMAGE_ALT: Record<string, string> = {
  "copper-home": "Copper Home smart speaker in polished copper",
  "copper-notes": "Copper Notes clip-on recorder in brushed copper",
};

const SHOWCASE_CAPTIONS: Record<string, string> = {
  "copper-home-desert-light":
    "Copper Home on a shelf in warm desert light, ready for the day.",
  "copper-notes-stone-desk":
    "Copper Notes clipped on at a stone desk, capturing every decision.",
  "copper-notes-golden-hour":
    "Copper Notes at golden hour, turning a long talk into clear notes.",
};

const SWATCH: Record<string, string> = {
  "Polished Copper": "bg-primary",
  "Brushed Copper": "bg-primary",
  "Patina Teal": "bg-accent",
  "Night Sky": "bg-[#1c2333]",
  "Desert Sand": "bg-[#efe3d0]",
};

function lifestyleAlt(product: Product, src: string) {
  return src.includes("stone-desk")
    ? `${product.name} clipped to a notebook on a stone desk`
    : src.includes("golden-hour")
      ? `${product.name} in a golden-hour Arizona setting`
      : `${product.name} on a shelf in warm desert light`;
}

export function Hero() {
  const products = getProducts();
  return (
    <section
      id="top"
      data-testid="hero"
      className="bg-secondary text-secondary-foreground"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div className="flex flex-col items-start gap-5">
          <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl">
            Home help that remembers what matters.
          </h1>
          <p className="text-lg sm:text-xl">{TAGLINE}</p>
          <a
            href="#products"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 px-6 text-base",
            )}
          >
            See products
          </a>
        </div>
        <div className="grid grid-cols-2 items-end gap-2 sm:gap-4">
          {products.map((product) => (
            <Image
              key={product.id}
              src={product.cutout}
              alt={IMAGE_ALT[product.id] ?? product.name}
              width={1254}
              height={1254}
              priority
              sizes="(min-width: 768px) 280px, 45vw"
              className="h-auto w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Products() {
  const products = getProducts();
  return (
    <section id="products" data-testid="products" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold">Meet the Copper family</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <article
              key={product.id}
              data-testid="product-card"
              data-product={product.id}
              className="bg-card text-card-foreground flex flex-col gap-4 rounded-2xl border p-6"
            >
              <Image
                src={product.cutout}
                alt={IMAGE_ALT[product.id] ?? product.name}
                width={1254}
                height={1254}
                sizes="(min-width: 768px) 320px, 80vw"
                className="mx-auto h-auto w-full max-w-xs"
              />
              <div>
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="text-muted-foreground">{product.type}</p>
              </div>
              <p className="text-3xl font-extrabold">
                {formatUsd(product.priceUsd)}
              </p>
              <ul className="flex flex-col gap-2">
                {product.features.map((feature) => (
                  <li key={feature.name}>
                    <span className="font-semibold">{feature.name}.</span>{" "}
                    <span className="text-muted-foreground">
                      {feature.description}
                    </span>
                  </li>
                ))}
              </ul>
              <ul
                aria-label={`${product.name} colors`}
                className="mt-auto flex flex-wrap gap-4 pt-2 text-sm"
              >
                {product.colors.map((color) => (
                  <li key={color} className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className={cn(
                        "size-4 rounded-full border",
                        SWATCH[color] ?? "bg-muted",
                      )}
                    />
                    {color}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Showcase() {
  const rows = getProducts().flatMap((product) =>
    product.lifestyle.map((src) => ({ product, src })),
  );
  return (
    <section
      id="showcase"
      data-testid="showcase"
      className="bg-muted text-foreground scroll-mt-16"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16">
        <h2 className="text-3xl font-bold">Made for life in Arizona</h2>
        {rows.map(({ product, src }, index) => {
          const key = src
            .split("/")
            .pop()!
            .replace(/\.png$/, "");
          return (
            <figure
              key={src}
              className="grid items-center gap-6 md:grid-cols-2 md:gap-10"
            >
              <Image
                src={src}
                alt={lifestyleAlt(product, src)}
                width={1672}
                height={941}
                sizes="(min-width: 768px) 560px, 100vw"
                className={cn(
                  "h-auto w-full rounded-2xl",
                  index % 2 === 1 && "md:order-2",
                )}
              />
              <figcaption className="text-xl font-medium">
                {SHOWCASE_CAPTIONS[key] ?? product.name}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

export function PlusPricing() {
  const plans = getPlans();
  return (
    <section id="plus" data-testid="plus-pricing" className="scroll-mt-16">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="mb-2 text-3xl font-bold">Free or Copper Plus</h2>
        <p className="text-muted-foreground mb-8">
          Start free, and upgrade when you want longer memory and Refined
          answers.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => {
            const plus = plan.id === "copper-plus";
            return (
              <div
                key={plan.id}
                className={cn(
                  "flex flex-col gap-4 rounded-2xl border p-6",
                  plus
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-card-foreground",
                )}
              >
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-3xl font-extrabold">
                  {formatUsd(plan.monthlyUsd)}
                  <span className="text-base font-medium">/month</span>
                </p>
                {plus && (
                  <p className="font-medium">
                    or {formatUsd(plan.annualUsd)}/year
                  </p>
                )}
                <ul className="flex flex-col gap-2">
                  <li>Memory kept: {formatMemory(plan.memoryDays)}</li>
                  <li>
                    Copper Notes recording:{" "}
                    {formatNotesHours(plan.notesHoursPerMonth)}
                  </li>
                  <li>
                    Refined answers:{" "}
                    {plan.refinedAnswers ? "Included" : "Not included"}
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PrivacySummary() {
  const privacy = getPrivacySummary();
  return (
    <section
      id="privacy"
      data-testid="privacy-summary"
      className="bg-accent text-accent-foreground scroll-mt-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-[1fr_auto]">
        <div>
          <h2 className="mb-2 text-3xl font-bold">
            Your privacy, plainly explained
          </h2>
          <p className="mb-6 font-medium">
            How Copper handles recordings under our {privacy.policy} privacy
            policy.
          </p>
          <ul className="flex list-disc flex-col gap-3 pl-5">
            {privacy.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <Image
          src="/assets/brand/copper-mascot.png"
          alt="Copper, the friendly robot mascot of Copper State Labs"
          width={1254}
          height={1254}
          sizes="200px"
          className="mx-auto h-auto w-40 md:w-52"
        />
      </div>
    </section>
  );
}
