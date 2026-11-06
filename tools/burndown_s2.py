"""Sprint 2 burndown (plan vs actual remaining hours).

Remaining = sum of Original Estimate (plan h) of S2 tasks not Done, read from the repo, PR #8 and the
Jira snapshot pm/sprints/S2/jira-snapshot-2026-11-05.md. The S2 tasks were entered in Jira on 05/11 00:20,
so days 1–4 are reconstructed from task completion evidence (commits/files), not from board moves.
Update ACTUAL[4] (Thu 05/11) from Jira before submission and re-run.
"""
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "pm" / "sprints" / "S2" / "evidence" / "burndown-S2.png"

DAYS = ["Fri 30/10", "Mon 02/11", "Tue 03/11", "Wed 04/11", "Thu 05/11"]
TOTAL = 39.75
PLAN = [round(TOTAL * (1 - i / 4), 2) for i in range(5)]  # planned remaining: 39.75 h spread evenly over the 5 days
ACTUAL = [39.75, 39.75, 39.75, 30.75, 6.25]  # 04/11: T03, T04, T05, T21, T22 Done; 05/11: PR #8, #11, #12 merged


def main():
    plt.rcParams["font.family"] = "serif"
    fig, ax = plt.subplots(figsize=(7.5, 3.8), dpi=150)
    xs = list(range(len(DAYS)))
    ax.plot(xs, PLAN, "--", color="#8a8a8a", label=f"Plan ({TOTAL} h → 0)")
    known = [(x, y) for x, y in zip(xs, ACTUAL) if y is not None]
    ax.plot([k[0] for k in known], [k[1] for k in known], "-o", color="#1F3A5F", label="Actual (remaining h of tasks not Done)")
    for x, y in known:
        ax.annotate(f"{y:g}", (x, y), textcoords="offset points", xytext=(0, 6), ha="center", fontsize=7, color="#1F3A5F")
    ax.annotate("PRs #8, #11, #12\nmerged on 05/11", xy=(3.92, 9.5), xytext=(3.15, 35),
                arrowprops=dict(arrowstyle="->", color="#B42318"), color="#B42318", fontsize=8)
    ax.set_xticks(xs, DAYS, fontsize=8)
    ax.set_ylabel("Remaining work (h)")
    ax.set_ylim(0, 44)
    ax.set_title("Sprint 2 burndown – plan vs actual (Sprint end, 05/11/2026 23:59)", fontsize=10)
    ax.grid(axis="y", alpha=0.3)
    ax.legend(fontsize=8, loc="lower left")
    fig.tight_layout()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(OUT)
    print("wrote", OUT.relative_to(ROOT))


if __name__ == "__main__":
    main()
