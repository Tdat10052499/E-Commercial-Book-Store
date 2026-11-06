"""Sprint 1 burndown from the Jira snapshot (pm/sprints/S1/jira-snapshot-2026-11-01.md).

Remaining = sum of Original Estimate of tasks not Done (hours). Jira shows no task moved
before the Sprint ended; statuses were updated on 01/11/2026.
"""
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "pm" / "sprints" / "S1" / "evidence" / "burndown-S1.png"

DAYS = ["Fri 23/10", "Mon 26/10", "Tue 27/10", "Wed 28/10", "Thu 29/10", "Sun 01/11*"]
TOTAL = 48
PLAN = [round(TOTAL * (1 - i / 4), 1) for i in range(5)] + [None]
ACTUAL = [48, 48, 48, 48, 48, 10]


def main():
    plt.rcParams["font.family"] = "serif"
    fig, ax = plt.subplots(figsize=(7.5, 3.8), dpi=150)
    xs = range(len(DAYS))
    ax.plot(list(xs)[:5], PLAN[:5], "--", color="#8a8a8a", label="Plan (48 h → 0)")
    ax.plot(xs, ACTUAL, "-o", color="#1F3A5F", label="Actual (remaining h by Jira status)")
    ax.axvspan(4.5, 5.5, color="#f3d9d9", alpha=0.6)
    ax.annotate("Board updated after\nSprint end (01/11)", xy=(5, 10), xytext=(3.1, 26),
                arrowprops=dict(arrowstyle="->", color="#B42318"), color="#B42318", fontsize=8)
    ax.set_xticks(list(xs), DAYS, fontsize=8)
    ax.set_ylabel("Remaining work (h)")
    ax.set_ylim(0, 52)
    ax.set_title("Sprint 1 burndown – plan vs actual (source: Jira, 01/11/2026)", fontsize=10)
    ax.grid(axis="y", alpha=0.3)
    ax.legend(fontsize=8, loc="lower left")
    fig.tight_layout()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(OUT)
    print("wrote", OUT.relative_to(ROOT))


if __name__ == "__main__":
    main()
