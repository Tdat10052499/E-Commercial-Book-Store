"""Sprint 3 tracker – reads the task table in pm/sprints/S3/sprint-backlog.md (the only source).

Usage (from the repo root, after `git pull`):
  python tools/s3_tracker.py today [chinh|dat]     tasks planned for today + tasks that slipped
  python tools/s3_tracker.py status              plan vs actual remaining hours per day
  python tools/s3_tracker.py burndown            writes pm/sprints/S3/evidence/burndown-S3.png (needs matplotlib)
  python tools/s3_tracker.py plan                rewrites pm/sprints/S3/daily-plan.md from the backlog

When a task is finished, fill its "Done on" (dd/mm) and "Actual h" cells in the backlog, commit, push.
"""
import re
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BACKLOG = ROOT / "pm" / "sprints" / "S3" / "sprint-backlog.md"
PLAN_MD = ROOT / "pm" / "sprints" / "S3" / "daily-plan.md"
PNG = ROOT / "pm" / "sprints" / "S3" / "evidence" / "burndown-S3.png"

START = date(2026, 11, 6)  # D1 = Fri 06/11
DAYS = [(f"D{i + 1}", START + timedelta(days=i)) for i in range(7)]
WEEKDAY = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]


def label(d):
    return f"{WEEKDAY[d.weekday()]} {d:%d/%m}"


def today_gmt7():
    return datetime.now(timezone(timedelta(hours=7))).date()


def tasks():
    """Rows of the '## Tasks' table: id, item, description, owner, est, planned day key, done date, actual, status."""
    text = BACKLOG.read_text(encoding="utf-8")
    section = text.split("## Tasks", 1)[1].split("\n## ", 1)[0]
    out = []
    for line in section.splitlines():
        if not line.startswith("| S3-"):
            continue
        c = [x.strip() for x in line.strip().strip("|").split("|")]
        done = None
        m = re.match(r"(\d{1,2})/(\d{1,2})", c[6])
        if m:
            done = date(2026, int(m.group(2)), int(m.group(1)))
        out.append({"id": c[0], "item": c[1], "desc": c[2], "owner": c[3], "est": float(c[4]),
                    "day": c[5].split()[0], "done": done, "actual": c[7], "status": c[8]})
    return out


def remaining(ts):
    total = sum(t["est"] for t in ts)
    plan, actual, r = [total], [total], total
    for key, d in DAYS:
        r -= sum(t["est"] for t in ts if t["day"] == key)
        plan.append(round(r, 2))
        actual.append(round(total - sum(t["est"] for t in ts if t["done"] and t["done"] <= d), 2)
                      if d <= today_gmt7() else None)
    return plan, actual


def fmt(x):
    return f"{x:g}"


ALIASES = {"chinh": "Chính", "chính": "Chính", "dat": "Đạt", "đạt": "Đạt"}


def cmd_today(who=None):
    who = ALIASES.get(who.lower(), who) if who else None
    ts, now = tasks(), today_gmt7()
    key = next((k for k, d in DAYS if d == now), None)
    mine = (lambda t: True) if not who else (lambda t: t["owner"] in (who, "Both"))
    print(f"Today: {label(now)}" + (f" ({key})" if key else " (outside Sprint 3)"))
    for t in ts:
        if mine(t) and not t["done"] and t["day"] == key:
            print(f"  [ ] {t['id']} {t['owner']:5} {fmt(t['est'])} h  {t['desc'][:110]}")
    late = [t for t in ts if mine(t) and not t["done"] and dict(DAYS)[t["day"]] < now]
    if late:
        print("Slipped (planned earlier, not done):")
        for t in late:
            print(f"  [!] {t['id']} {t['owner']:5} planned {t['day']}  {t['desc'][:100]}")


def cmd_status():
    plan, actual = remaining(tasks())
    print(f"{'Day':12} {'Plan h':>7} {'Actual h':>9}")
    print(f"{'Start':12} {fmt(plan[0]):>7} {fmt(actual[0]):>9}")
    for (key, d), p, a in zip(DAYS, plan[1:], actual[1:]):
        print(f"{key + ' ' + label(d):12} {fmt(p):>7} {fmt(a) if a is not None else '-':>9}")


def cmd_burndown():
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    plan, actual = remaining(tasks())
    xs = list(range(len(plan)))
    names = ["Start"] + [label(d) for _, d in DAYS]
    fig, ax = plt.subplots(figsize=(7.5, 3.8), dpi=150)
    ax.plot(xs, plan, "--", color="#8a8a8a", label=f"Plan ({fmt(plan[0])} h → 0, by planned day)")
    known = [(x, y) for x, y in zip(xs, actual) if y is not None]
    if known:
        ax.plot([k[0] for k in known], [k[1] for k in known], "-o", color="#1F3A5F", label="Actual (remaining h)")
        for x, y in known:
            ax.annotate(fmt(y), (x, y), textcoords="offset points", xytext=(0, 6), ha="center", fontsize=7, color="#1F3A5F")
    ax.set_xticks(xs, names, fontsize=8)
    ax.set_ylabel("Remaining work (h)")
    ax.set_ylim(0, plan[0] * 1.1)
    ax.set_title(f"Sprint 3 burndown – plan vs actual (as of {label(today_gmt7())})", fontsize=10)
    ax.grid(axis="y", alpha=0.3)
    ax.legend(fontsize=8, loc="upper right")
    fig.tight_layout()
    PNG.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(PNG)
    print("wrote", PNG.relative_to(ROOT))


def cmd_plan():
    ts = tasks()
    plan, _ = remaining(ts)
    out = ["# Sprint 3 – Daily plan\n",
           "*What each member finishes each day. Generated from `sprint-backlog.md` (the source); "
           "if the backlog changes, run `python tools/s3_tracker.py plan`.*\n"]
    for i, (key, d) in enumerate(DAYS):
        dt = [t for t in ts if t["day"] == key]

        def hours(o):
            return sum(t["est"] if t["owner"] == o else (t["est"] / 2 if t["owner"] == "Both" else 0) for t in dt)
        out.append(f"## {key} – {label(d)}  (Chính {fmt(hours('Chính'))} h · Đạt {fmt(hours('Đạt'))} h)\n")
        for o in ("Chính", "Đạt", "Both"):
            rows = [t for t in dt if t["owner"] == o]
            if rows:
                out.append(f"**{o}**")
                out += [f"- [{'x' if t['done'] else ' '}] {t['id']} ({fmt(t['est'])} h) – {t['desc']}" for t in rows]
                out.append("")
        out.append(f"*End of {key}: plan remaining {fmt(plan[i + 1])} h.*\n")
    PLAN_MD.write_text("\n".join(out), encoding="utf-8")
    print("wrote", PLAN_MD.relative_to(ROOT))


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    args = sys.argv[1:] or ["today"]
    {"today": lambda: cmd_today(args[1] if len(args) > 1 else None), "status": cmd_status,
     "burndown": cmd_burndown, "plan": cmd_plan}[args[0]]()
