import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PrivacyExplorer } from "@/components/copper/privacy-explorer";

const props = {
  wakeWord: "Hey Copper",
  freeMemory: "30 days",
  plusMemory: "12 months",
};

const cardFor = (id: string) =>
  document.querySelector<HTMLElement>(
    `[data-testid="privacy-card"][data-card="${id}"]`,
  )!;

afterEach(cleanup);

describe("PrivacyExplorer flip cards", () => {
  it("shows five question cards, none flipped, with 0 of 5 explored", () => {
    render(<PrivacyExplorer {...props} />);
    const cards = screen.getAllByTestId("privacy-card");
    expect(cards).toHaveLength(5);
    for (const card of cards) expect(card.dataset.flipped).toBe("false");
    expect(screen.getByText("0 of 5 explored")).toBeTruthy();
  });

  it("flips a card when its question is clicked, and flips back", () => {
    render(<PrivacyExplorer {...props} />);
    const card = cardFor("listening");
    const front = within(card).getByRole("button", {
      name: /listening to everything/i,
    });
    expect(front.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(front);
    expect(card.dataset.flipped).toBe("true");
    expect(screen.getByText("1 of 5 explored")).toBeTruthy();

    fireEvent.click(within(card).getByRole("button", { name: /flip back/i }));
    expect(card.dataset.flipped).toBe("false");
    // exploring is remembered after flipping back
    expect(screen.getByText("1 of 5 explored")).toBeTruthy();
  });

  it("flips back with Escape", () => {
    render(<PrivacyExplorer {...props} />);
    const card = cardFor("forget");
    fireEvent.click(
      within(card).getByRole("button", { name: /make mr\. copper forget/i }),
    );
    expect(card.dataset.flipped).toBe("true");
    fireEvent.keyDown(card, { key: "Escape" });
    expect(card.dataset.flipped).toBe("false");
  });

  it("counts every card once and celebrates when all five are explored", () => {
    render(<PrivacyExplorer {...props} />);
    for (const card of screen.getAllByTestId("privacy-card")) {
      const front = within(card).getAllByRole("button")[0];
      fireEvent.click(front);
      fireEvent.click(front);
    }
    expect(screen.getByText(/explored all five/i)).toBeTruthy();
  });

  it("states the policy from the props, without overpromising", () => {
    render(<PrivacyExplorer {...props} />);
    const text = document.body.textContent ?? "";
    expect(text).toContain(
      "nothing is sent to the cloud until you say those words",
    );
    expect(text).toContain(
      "saved for 30 days on Free or 12 months on Copper Plus",
    );
    expect(text).toContain("transcribed on your device");
    expect(text).toContain("delete it from Household Memory");
    expect(text).toContain("unless you choose to opt in");
    expect(text).not.toMatch(/never\s+record/i);
    expect(text).not.toMatch(/never (reach|leave|sent|uploaded)/i);
  });

  it("uses a clearly labelled placeholder for the privacy settings button", () => {
    render(<PrivacyExplorer {...props} />);
    const cta = screen.getByRole("button", {
      name: /explore privacy settings/i,
    });
    expect(cta.getAttribute("aria-disabled")).toBe("true");
    expect(screen.getByText(/placeholder/i)).toBeTruthy();
  });
});
