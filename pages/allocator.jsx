// Vibe Coded Alert
import React, { useCallback, useEffect, useRef, useState } from "react";

import { DM_Mono, Fraunces } from "next/font/google";
import Link from "next/link";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--allocator-mono",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "600"],
  style: ["italic", "normal"],
  variable: "--allocator-serif",
});

// Constants
const BUCKETS = ["stock", "bond", "dry", "spec"];
const COLORS = {
  stock: "#b8d4a0",
  bond: "#7ab4d4",
  dry: "#d4b87a",
  spec: "#d4847a",
};
const LABELS = {
  stock: "Stock Funds",
  bond: "Bonds",
  dry: "Cash",
  spec: "Speculative",
};
const THRESHOLD = 10;

// Utility functions
const parseFloatOrZero = (val) => parseFloat(val) || 0;

export default function Allocator() {
  // State
  const [targets, setTargets] = useState({
    stock: 57.5,
    bond: 20,
    dry: 20,
    spec: 2.5,
  });
  const [channels, setChannels] = useState({});
  const [newIncome, setNewIncome] = useState("");
  const [dipHigh, setDipHigh] = useState("");
  const [dipCurrent, setDipCurrent] = useState("");
  const [dipCash, setDipCash] = useState("");
  const [dipDeployments, setDipDeployments] = useState([]);
  const [storageStatus, setStorageStatus] = useState({
    ok: false,
    msg: "Loading...",
  });
  const [collapsibles, setCollapsibles] = useState({});

  // Canvas refs
  const pieCurrentRef = useRef(null);
  const piePreviewRef = useRef(null);
  const channelIdRef = useRef(0);

  // Add channel - use counter for unique IDs to avoid Date.now() collisions
  const addChannel = (defaults = {}) => {
    const id = ++channelIdRef.current;
    const newChannel = {
      name: defaults.name || "",
      stock: defaults.initialValues?.stock || 0,
      bond: defaults.initialValues?.bond || 0,
      dry: defaults.initialValues?.dry || 0,
      spec: defaults.initialValues?.spec || 0,
    };
    setChannels((prev) => ({ ...prev, [id]: newChannel }));
    return id;
  };

  // Seed default channels
  const seedDefaultChannels = () => {
    if (Object.keys(channels).length === 0) {
      addChannel({ name: "Fmarket", buckets: ["stock", "bond"] });
      addChannel({ name: "Cash", buckets: ["dry"] });
      addChannel({ name: "Speculative", buckets: ["spec"] });
    }
  };

  // Initialize storage
  useEffect(() => {
    loadAll();
  }, []);

  // Load from storage
  const loadAll = () => {
    try {
      const savedTargets = localStorage.getItem("allocator-targets");
      if (savedTargets) {
        setTargets(JSON.parse(savedTargets));
      }

      const dipSave = localStorage.getItem("allocator-dips-save");
      if (dipSave) {
        setDipDeployments(JSON.parse(dipSave));
      }

      const savedDipHigh = localStorage.getItem("allocator-dip-high");
      if (savedDipHigh) setDipHigh(savedDipHigh);

      const savedDipCurrent = localStorage.getItem("allocator-dip-current");
      if (savedDipCurrent) setDipCurrent(savedDipCurrent);

      const savedDipCash = localStorage.getItem("allocator-dip-cash");
      if (savedDipCash) setDipCash(savedDipCash);

      const savedChannels = localStorage.getItem("allocator-channels");
      if (savedChannels) {
        const chData = JSON.parse(savedChannels);
        // Find max ID from saved channels to init ref properly
        const maxId = Object.keys(chData).reduce(
          (max, key) => Math.max(max, parseInt(key) || 0),
          0
        );
        channelIdRef.current = maxId;
        // Build channels in a single state update to avoid batching issues
        const loadedChannels = {};
        Object.entries(chData).forEach(([id, ch]) => {
          loadedChannels[id] = {
            name: ch.name || "",
            stock: ch.stock || 0,
            bond: ch.bond || 0,
            dry: ch.dry || 0,
            spec: ch.spec || 0,
          };
        });
        setChannels(loadedChannels);
      } else {
        seedDefaultChannels();
      }

      setStorageStatus({ ok: true, msg: "Data loaded" });
    } catch (e) {
      setStorageStatus({ ok: false, msg: "No saved data" });
      seedDefaultChannels();
    }
  };

  // Save to storage
  const saveAll = () => {
    try {
      localStorage.setItem("allocator-targets", JSON.stringify(targets));
      localStorage.setItem("allocator-channels", JSON.stringify(channels));
      localStorage.setItem("allocator-dip-high", dipHigh);
      localStorage.setItem("allocator-dip-current", dipCurrent);
      localStorage.setItem("allocator-dip-cash", dipCash);
      localStorage.setItem("allocator-dips-save", JSON.stringify(dipDeployments));
      setStorageStatus({
        ok: true,
        msg: `Saved · ${new Date().toLocaleDateString("en-GB")}`,
      });
    } catch (e) {
      setStorageStatus({ ok: false, msg: "Save failed" });
    }
  };

  // Remove channel
  const removeChannel = (id) => {
    setChannels((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  // Update channel
  const updateChannel = (id, field, value) => {
    setChannels((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: field === "name" ? value : parseFloatOrZero(value),
      },
    }));
  };

  // Get current totals
  const getCurrent = useCallback(() => {
    const totals = { stock: 0, bond: 0, dry: 0, spec: 0 };
    Object.values(channels).forEach((ch) => {
      BUCKETS.forEach((b) => (totals[b] += ch[b] || 0));
    });
    return totals;
  }, [channels]);

  // Calculate preview - simplified: deploy purely by target weights every month
  const getPreview = useCallback(() => {
    const income = parseFloatOrZero(newIncome);
    if (income <= 0) return null;

    const c = getCurrent();
    const newTotal = BUCKETS.reduce((s, b) => s + c[b], 0) + income;

    // Deploy based purely on target weights - no decisions, no drift correction
    const deploy = {};
    BUCKETS.forEach((b) => {
      deploy[b] = (targets[b] / 100) * income;
    });

    return { deploy, newTotal };
  }, [newIncome, getCurrent, targets]);

  // Calculate dip
  const getDipCalc = useCallback(() => {
    const high = parseFloatOrZero(dipHigh);
    const cur = parseFloatOrZero(dipCurrent);
    const cash = parseFloatOrZero(dipCash);

    if (!high || !cur || !cash) return null;

    const drop = Math.max(0, ((high - cur) / high) * 100);
    let tierIdx = 0;
    let pct = 0;

    // Tier 1: 10-20% drop → 25% of cash (fixed)
    if (drop >= 10 && drop < 20) {
      tierIdx = 1;
      pct = 0.25;
    }
    // Tier 2: 20-30% drop → 33% of remaining
    else if (drop >= 20 && drop < 30) {
      tierIdx = 2;
      pct = 0.33;
    }
    // Tier 3: 30-40% drop → 50% of remaining
    else if (drop >= 30 && drop < 40) {
      tierIdx = 3;
      pct = 0.5;
    }
    // Tier 4: 40%+ drop → 100% of remaining
    else if (drop >= 40) {
      tierIdx = 4;
      pct = 1.0;
    }

    // Calculate deployment based on tier logic
    let deployAmt = 0;
    let remaining = cash;

    if (tierIdx === 1) {
      // Tier 1: Fixed 25% of cash
      deployAmt = cash * 0.25;
      remaining = cash * 0.75;
    } else if (tierIdx === 2) {
      // Tier 2: 33% of cash
      deployAmt = cash * 0.33;
      remaining = cash * 0.67;
    } else if (tierIdx === 3) {
      // Tier 3: 50% of cash
      deployAmt = cash * 0.5;
      remaining = cash * 0.5;
    } else if (tierIdx === 4) {
      // Tier 4: 100% of cash
      deployAmt = cash;
      remaining = 0;
    }

    const shouldBlock = dipDeployments.some((d) => d.tier >= tierIdx && d.tier > 0);

    return { drop, tierIdx, pct, deployAmt, remaining, shouldBlock };
  }, [dipHigh, dipCurrent, dipCash, dipDeployments]);

  // Calculate gain - simplified: trim to be within watch limit (5%)
  const getGainCalc = useCallback(() => {
    const c = getCurrent();
    const total = BUCKETS.reduce((s, b) => s + c[b], 0);
    if (total === 0) return null;

    // Check if in drawdown (below 52-week high) AND at least tier 1 has been deployed
    const dipHighVal = parseFloatOrZero(dipHigh);
    const dipCurrentVal = parseFloatOrZero(dipCurrent);
    const hasDipEpisode = dipDeployments.length > 0 && dipDeployments.some((d) => d.tier >= 1);
    const inDrawdown =
      hasDipEpisode && dipHighVal > 0 && dipCurrentVal > 0 && dipCurrentVal < dipHighVal;

    const stocksPct = (c.stock / total) * 100;
    const over = Math.max(0, stocksPct - targets.stock);

    // Suspend trimming when in drawdown
    if (inDrawdown) {
      return { stocksPct, over, trimAmt: 0, stocksAfter: c.stock, inDrawdown };
    }

    // Only trim if exceeds threshold (10%), trim back to within watch limit (5%)
    const watchLimit = THRESHOLD * 0.5; // 5%
    let trimAmt = 0;
    if (over > THRESHOLD) {
      // Trim back to target + watch limit
      const targetAfterPct = targets.stock + watchLimit;
      const targetAfterVND = (targetAfterPct / 100) * total;
      trimAmt = Math.max(0, c.stock - targetAfterVND);
    }

    const stocksAfter = c.stock - trimAmt;

    return { stocksPct, over, trimAmt, stocksAfter, inDrawdown };
  }, [getCurrent, targets, dipHigh, dipCurrent]);

  // Draw pie chart
  const drawPie = useCallback((canvasRef, data) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width,
      H = canvas.height;
    const cx = W / 2,
      cy = H / 2,
      r = Math.min(W, H) / 2 - 4;
    ctx.clearRect(0, 0, W, H);

    const total = data.reduce((s, d) => s + d.value, 0);
    if (total === 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = "#2a2b27";
      ctx.fill();
      return;
    }

    let start = -Math.PI / 2;
    data.forEach((d) => {
      const slice = (d.value / total) * Math.PI * 2;
      if (slice < 0.001) return;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start + 0.025, start + slice - 0.025);
      ctx.closePath();
      ctx.fillStyle = d.color;
      ctx.fill();
      start += slice;
    });

    // Donut hole
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.52, 0, Math.PI * 2);
    ctx.fillStyle = "#161714";
    ctx.fill();
  }, []);

  // Update pie charts
  useEffect(() => {
    const c = getCurrent();
    if (pieCurrentRef.current) {
      drawPie(
        pieCurrentRef,
        BUCKETS.map((b) => ({
          label: LABELS[b],
          color: COLORS[b],
          value: c[b],
        }))
      );
    }
  }, [channels, drawPie, getCurrent]);

  useEffect(() => {
    const preview = getPreview();
    if (preview && piePreviewRef.current) {
      const afterData = BUCKETS.map((b) => ({
        label: LABELS[b],
        color: COLORS[b],
        value: getCurrent()[b] + preview.deploy[b],
      }));
      drawPie(piePreviewRef, afterData);
    }
  }, [newIncome, channels, getPreview, drawPie, getCurrent]);

  // Toggle collapsible
  const toggleCollapsible = (id) => {
    setCollapsibles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Reset dip save
  const resetDipSave = () => {
    setDipDeployments([]);
    localStorage.setItem("allocator-dips-save", JSON.stringify([]));
    setStorageStatus({ ok: true, msg: `Saved · ${new Date().toLocaleDateString("en-GB")}` });
  };

  // Save dip deployment
  const saveDipDeployment = () => {
    const high = parseFloatOrZero(dipHigh);
    const cur = parseFloatOrZero(dipCurrent);
    if (!high || !cur) return;

    const drop = ((high - cur) / high) * 100;
    let tierIdx = 0;
    let pct = 0;

    // Tier 1: 10-20% drop → 25% of cash (fixed)
    if (drop >= 10 && drop < 20) {
      tierIdx = 1;
      pct = 0.25;
    } else if (drop >= 20 && drop < 30) {
      tierIdx = 2;
      pct = 0.33;
    } else if (drop >= 30 && drop < 40) {
      tierIdx = 3;
      pct = 0.5;
    } else if (drop >= 40) {
      tierIdx = 4;
      pct = 1.0;
    }

    // Calculate deployment based on tier logic
    const cash = parseFloatOrZero(dipCash);
    let deployAmt = 0;

    if (tierIdx === 1) {
      deployAmt = cash * 0.25;
    } else if (tierIdx === 2) {
      deployAmt = cash * 0.33;
    } else if (tierIdx === 3) {
      deployAmt = cash * 0.5;
    } else if (tierIdx === 4) {
      deployAmt = cash;
    }

    const newDeployment = {
      tier: tierIdx,
      pct,
      deployAmt,
      high,
      current: cur,
      drop,
      date: new Date().toLocaleDateString("en-GB"),
    };

    // Update state and persist immediately to localStorage
    const updatedDeployments = [...dipDeployments, newDeployment];
    setDipDeployments(updatedDeployments);
    localStorage.setItem("allocator-dips-save", JSON.stringify(updatedDeployments));
    setStorageStatus({ ok: true, msg: `Saved · ${new Date().toLocaleDateString("en-GB")}` });
  };

  // Render bar
  const renderBar = (segs) => {
    return segs.map((s, i) => (
      <div
        key={i}
        className="h-1 flex-1 rounded-full transition-all duration-500"
        style={{ background: s.color }}
      />
    ));
  };

  // Computed values
  const currentTotals = getCurrent();
  const grandTotal = BUCKETS.reduce((s, b) => s + currentTotals[b], 0);
  const preview = getPreview();
  const dipCalc = getDipCalc();
  const gainCalc = getGainCalc();

  const totalTargets = targets.stock + targets.bond + targets.dry + targets.spec;
  const isTargetValid = Math.abs(totalTargets - 100) < 0.01;

  return (
    <div
      className={`${dmMono.variable} ${fraunces.variable} min-h-screen`}
      style={{
        background: "#0e0f0c",
        color: "#e8e6df",
        fontFamily: "var(--allocator-mono), monospace",
      }}
    >
      {/* Header */}
      <header className="border-b border-[#2a2b27] px-4 py-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 flex items-center justify-between">
            <Link
              href="/"
              className="text-sm text-[#6b6a62] transition-colors hover:text-[#d4b87a]"
            >
              ← Back to Portfolio
            </Link>
            <span className="text-xs uppercase tracking-widest text-[#6b6a62]">VND</span>
          </div>
          <h1
            className="font-serif text-3xl font-light leading-tight"
            style={{ fontFamily: "var(--allocator-serif), serif" }}
          >
            Portfolio <em className="text-[#d4b87a]">Allocator</em>
          </h1>
          <p className="mt-1 text-xs uppercase tracking-wider text-[#6b6a62]">
            Monthly deployment + dip & gain calculator
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-6">
        {/* Storage Bar */}
        <div className="flex items-center gap-3 py-3 text-xs">
          <div
            className={`h-1.5 w-1.5 rounded-full ${
              storageStatus.ok ? "bg-[#b8d4a0]" : "bg-[#6b6a62]"
            }`}
          />
          <span className="text-[#6b6a62]">{storageStatus.msg}</span>
          <button
            onClick={saveAll}
            className="ml-auto rounded border border-[#2a2b27] px-3 py-1 text-xs uppercase tracking-wider text-[#6b6a62] transition-colors hover:border-[#d4b87a] hover:text-[#d4b87a]"
          >
            Save session →
          </button>
        </div>

        {/* How to Use */}
        <Card borderLeft="border-l-4 border-l-[#d4b87a]">
          <CollapsibleSection
            id="intro"
            title="How to use this tool"
            isOpen={collapsibles["intro"]}
            onToggle={() => toggleCollapsible("intro")}
            accentColor="text-[#d4b87a]"
          >
            <div className="space-y-3">
              {[
                {
                  num: "01",
                  bold: "Set target allocation",
                  text: " — your long-term anchors. Never change during a dip or rally.",
                },
                {
                  num: "02",
                  bold: "Enter current holdings",
                  text: " — input values across Fmarket, Cash, and Speculative accounts.",
                },
                {
                  num: "03",
                  bold: "Deploy monthly income",
                  text: " — enter salary. Tool splits it by target weights automatically.",
                },
                {
                  num: "04",
                  bold: "Weekly check",
                  text: " — open dip or gain calculator. If a tier is crossed, calculate and save deployment.",
                },
                {
                  num: "05",
                  bold: "Save session",
                  text: " — hit Save to persist your data across visits.",
                },
              ].map((step, i) => (
                <div key={i} className="flex gap-3 text-sm text-[#6b6a62]">
                  <span className="font-medium text-[#d4b87a]">{step.num}</span>
                  <span>
                    <strong className="text-[#e8e6df]">{step.bold}</strong>
                    {step.text}
                  </span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </Card>

        {/* Target Allocation */}
        <Card>
          <div className="mb-4 text-xs uppercase tracking-widest text-[#6b6a62]">
            Target Allocation
          </div>

          <div className="space-y-3">
            {BUCKETS.map((b) => (
              <div key={b} className="flex items-center gap-4">
                <div className="flex flex-1 items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full" style={{ background: COLORS[b] }} />
                  {LABELS[b]}
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    value={targets[b]}
                    onChange={(e) =>
                      setTargets((prev) => ({
                        ...prev,
                        [b]: parseFloatOrZero(e.target.value),
                      }))
                    }
                    onFocus={(e) => e.target.select()}
                    className="w-full rounded border border-[#2a2b27] bg-[#0e0f0c] px-2 py-1.5 text-right text-sm focus:border-[#d4b87a] focus:outline-none"
                    min="0"
                    max="100"
                    step="0.5"
                  />
                </div>
                <div className="w-8 text-right text-xs text-[#6b6a62]">%</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4 border-t border-[#2a2b27] pt-3">
            <span className="text-xs uppercase tracking-widest text-[#6b6a62]">Total</span>
            <span className={`font-medium ${isTargetValid ? "text-[#b8d4a0]" : "text-[#d4847a]"}`}>
              {totalTargets.toFixed(1)}%
            </span>
            <div />
          </div>
          <div className="my-4 border-b border-[#2a2b27]" />
          <CollapsibleSection
            id="bucket"
            title="Bucket guide"
            isOpen={collapsibles["bucket"]}
            onToggle={() => toggleCollapsible("bucket")}
            small
          >
            <div className="space-y-3">
              {[
                {
                  key: "stock",
                  label: "Stock Funds",
                  desc: "Core growth. Open-ended equity funds. Long-term horizon, highest return potential.",
                },
                {
                  key: "bond",
                  label: "Bonds",
                  desc: "Capital preservation. Fixed income that beats inflation (~3–4% VND).",
                },
                {
                  key: "dry",
                  label: "Cash",
                  desc: "Liquid reserve. T+0/T+1 only. Used for dip deployment. Never drop below 10%.",
                },
                {
                  key: "spec",
                  label: "Speculative",
                  desc: "Bitcoin and high-volatility assets. Accept full loss risk.",
                },
              ].map((bucket) => (
                <div key={bucket.key} className="flex gap-3 text-sm">
                  <div
                    className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                    style={{ background: COLORS[bucket.key] }}
                  />
                  <span>
                    <span style={{ color: COLORS[bucket.key] }}>{bucket.label}</span>{" "}
                    <span className="text-[#6b6a62]">— {bucket.desc}</span>
                  </span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </Card>

        {/* Current Portfolio */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-[#6b6a62]">
              Current Portfolio — by Channel
            </span>
            <button
              onClick={() =>
                Object.keys(channels).forEach((id) => {
                  setChannels((prev) => ({
                    ...prev,
                    [id]: { ...prev[id], stock: 0, bond: 0, dry: 0, spec: 0 },
                  }));
                })
              }
              className="rounded border border-[#2a2b27] px-2 py-1 text-xs uppercase tracking-wider text-[#6b6a62] transition-colors hover:border-[#d4847a] hover:text-[#d4847a]"
            >
              ✕ Clear all
            </button>
          </div>

          {Object.entries(channels).map(([id, ch]) => (
            <div key={id} className="mb-4 rounded border border-[#2a2b27] bg-[#0e0f0c] p-4">
              <div className="mb-3 flex items-center justify-between">
                <input
                  type="text"
                  value={ch.name}
                  onChange={(e) => updateChannel(id, "name", e.target.value)}
                  placeholder="Channel name"
                  className="w-40 border-b border-[#2a2b27] bg-transparent pb-1 text-sm focus:border-[#d4b87a] focus:outline-none"
                />
                <button
                  onClick={() => removeChannel(id)}
                  className="text-xs text-[#6b6a62] transition-colors hover:text-[#d4847a]"
                >
                  ✕ remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-x-9 gap-y-3">
                {BUCKETS.map((b) => (
                  <div key={b} className="flex items-center gap-2">
                    <label className="flex min-w-0 flex-1 items-center gap-1.5 text-xs text-[#6b6a62]">
                      <div
                        className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: COLORS[b] }}
                      />
                      <span className="truncate">{LABELS[b]}</span>
                    </label>
                    <input
                      type="number"
                      value={ch[b] || ""}
                      onChange={(e) => updateChannel(id, b, e.target.value)}
                      onFocus={(e) => e.target.select()}
                      placeholder="0"
                      className="w-16 rounded border border-[#2a2b27] bg-[#0e0f0c] px-1.5 py-1 text-right text-xs focus:border-[#d4b87a] focus:outline-none"
                      min="0"
                      step="0.5"
                    />
                    <span className="text-xs text-[#6b6a62]">M</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={() => addChannel()}
            className="w-full rounded border border-dashed border-[#2a2b27] py-2 text-xs uppercase tracking-widest text-[#6b6a62] transition-colors hover:border-[#d4b87a] hover:text-[#d4b87a]"
          >
            + Add Channel
          </button>

          {/* Channel Totals */}
          {grandTotal > 0 && (
            <>
              <div className="mt-4 flex flex-wrap gap-4 border-t border-[#2a2b27] pt-3">
                {BUCKETS.map((b) => (
                  <div key={b} className="flex items-center gap-1.5 text-xs">
                    <div className="h-1.5 w-1.5 rounded-full" style={{ background: COLORS[b] }} />
                    <span className="text-[#6b6a62]">{LABELS[b]}</span>
                    <span className="font-medium">{currentTotals[b].toFixed(1)}M</span>
                  </div>
                ))}
                <div className="ml-auto flex items-center gap-1.5 text-xs">
                  <span className="text-[#6b6a62]">Total</span>
                  <span className="font-medium text-[#d4b87a]">{grandTotal.toFixed(1)}M</span>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="mt-4 flex items-center gap-6">
                <div className="flex-shrink-0">
                  <canvas ref={pieCurrentRef} width="110" height="110" />
                </div>
                <div className="flex-1 space-y-1.5">
                  {BUCKETS.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-xs">
                      <div className="h-1.5 w-1.5 rounded-full" style={{ background: COLORS[b] }} />
                      <span className="text-[#6b6a62]">{LABELS[b]}</span>
                      <span className="ml-auto font-medium" style={{ color: COLORS[b] }}>
                        {grandTotal > 0 ? ((currentTotals[b] / grandTotal) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drift Section */}
              <div className="mt-4 border-t border-[#1e1f1c] pt-4">
                <div className="mb-3 border-b border-[#2a2b27] pb-2 text-xs uppercase tracking-widest text-[#6b6a62]">
                  Current Drift vs Target
                </div>
                {BUCKETS.map((b) => {
                  const pct = grandTotal > 0 ? (currentTotals[b] / grandTotal) * 100 : 0;
                  const drift = pct - targets[b];
                  const abs = Math.abs(drift);
                  const dc =
                    drift > THRESHOLD
                      ? "text-[#d4847a]"
                      : drift < -THRESHOLD
                        ? "text-[#d4b87a]"
                        : "text-[#6b6a62]";
                  const ac =
                    abs > THRESHOLD
                      ? "bg-[#3a1f1a] text-[#d4847a]"
                      : abs > THRESHOLD * 0.5
                        ? "bg-[#2e2a1a] text-[#d4b87a]"
                        : "bg-[#1a2e1a] text-[#b8d4a0]";
                  const at =
                    abs > THRESHOLD ? "Rebalance" : abs > THRESHOLD * 0.5 ? "Watch" : "On target";
                  return (
                    <div
                      key={b}
                      className="flex items-center gap-4 border-b border-[#1e1f1c] py-2 text-sm"
                    >
                      <div className="flex flex-1 items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ background: COLORS[b] }} />
                        {LABELS[b]}
                      </div>
                      <div className={`text-xs ${dc}`}>
                        {drift >= 0 ? "+" : ""}
                        {drift.toFixed(1)}%
                      </div>
                      <div className="w-12 text-right font-medium">{pct.toFixed(1)}%</div>
                      <div>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${ac}`}>{at}</span>
                      </div>
                    </div>
                  );
                })}
                <div className="mt-3 flex h-1 overflow-hidden rounded-full">
                  {renderBar(
                    BUCKETS.map((b) => ({
                      color: COLORS[b],
                      pct: grandTotal > 0 ? (currentTotals[b] / grandTotal) * 100 : 0,
                    }))
                  )}
                </div>
              </div>
            </>
          )}
          <div className="my-4 border-b border-[#2a2b27]" />
          <CollapsibleSection
            id="legend"
            title="Drift status guide"
            isOpen={collapsibles["legend"]}
            onToggle={() => toggleCollapsible("legend")}
            small
          >
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#1a2e1a] px-1.5 py-0.5 uppercase tracking-wider text-[#b8d4a0]">
                  On target
                </span>
                <span className="text-[#6b6a62]">Within ±5% of target. No action needed.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#2e2a1a] px-1.5 py-0.5 uppercase tracking-wider text-[#d4b87a]">
                  Watch
                </span>
                <span className="text-[#6b6a62]">5–10% drift. Monitor monthly.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#3a1f1a] px-1.5 py-0.5 uppercase tracking-wider text-[#d4847a]">
                  Rebalance
                </span>
                <span className="text-[#6b6a62]">
                  Exceeds 10%. Use gain trimming or wait for dip to deploy.
                </span>
              </div>
            </div>
          </CollapsibleSection>
        </Card>

        {/* Deploy Income */}
        <Card>
          <div className="mb-4 text-xs uppercase tracking-widest text-[#6b6a62]">
            Deploy New Income
          </div>

          <div className="mb-4 flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="number"
                value={newIncome}
                onChange={(e) => setNewIncome(e.target.value)}
                onFocus={(e) => e.target.select()}
                placeholder="e.g. 5"
                className="w-full rounded border border-[#2a2b27] bg-[#0e0f0c] px-4 py-2 pr-12 text-lg focus:border-[#d4b87a] focus:outline-none"
                min="0"
                step="0.5"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs tracking-wider text-[#6b6a62]">
                VND (M)
              </span>
            </div>
          </div>

          {preview && (
            <>
              {/* Recommended Split */}
              <div className="mb-4">
                <div className="mb-3 border-b border-[#2a2b27] pb-2 text-xs uppercase tracking-widest text-[#6b6a62]">
                  Recommended Split
                </div>
                {BUCKETS.map((b) => {
                  const amt = preview.deploy[b];
                  const pct =
                    parseFloatOrZero(newIncome) > 0 ? (amt / parseFloatOrZero(newIncome)) * 100 : 0;
                  return (
                    <div
                      key={b}
                      className="flex items-center gap-4 border-b border-[#1e1f1c] py-2 text-sm"
                    >
                      <div className="flex flex-1 items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ background: COLORS[b] }} />
                        {LABELS[b]}
                      </div>
                      <div
                        className={`font-medium ${amt < 0.001 ? "text-[#6b6a62]" : ""}`}
                        style={{ color: amt < 0.001 ? undefined : COLORS[b] }}
                      >
                        {amt < 0.001 ? "— skip" : `${amt.toFixed(2)}M`}
                      </div>
                      <div className="w-10 text-right text-xs text-[#6b6a62]">
                        {pct.toFixed(0)}%
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Portfolio After */}
              <div className="border-t border-[#2a2b27] pt-4">
                <div className="mb-3 text-xs uppercase tracking-widest text-[#6b6a62]">
                  Portfolio After Deployment
                </div>

                {/* Preview Pie */}
                <div className="mb-4 flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <canvas ref={piePreviewRef} width="110" height="110" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {BUCKETS.map((b) => {
                      const after = currentTotals[b] + preview.deploy[b];
                      const ap = preview.newTotal > 0 ? (after / preview.newTotal) * 100 : 0;
                      return (
                        <div key={b} className="flex items-center gap-2 text-xs">
                          <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: COLORS[b] }}
                          />
                          <span className="text-[#6b6a62]">{LABELS[b]}</span>
                          <span className="ml-auto font-medium" style={{ color: COLORS[b] }}>
                            {ap.toFixed(1)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Preview Table */}
                <div className="text-xs">
                  <div className="grid grid-cols-4 gap-2 border-b border-[#1e1f1c] py-2 uppercase tracking-wider text-[#6b6a62]">
                    <div>Bucket</div>
                    <div className="text-right">Now</div>
                    <div className="text-right">After</div>
                    <div className="text-right">After % / Drift</div>
                  </div>
                  {BUCKETS.map((b) => {
                    const after = currentTotals[b] + preview.deploy[b];
                    const ap = preview.newTotal > 0 ? (after / preview.newTotal) * 100 : 0;
                    const delta = ap - targets[b];
                    return (
                      <div
                        key={b}
                        className="grid grid-cols-4 items-center gap-2 border-b border-[#1e1f1c] py-2 text-sm"
                      >
                        <div className="flex items-center gap-1.5">
                          <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: COLORS[b] }}
                          />
                          {LABELS[b]}
                        </div>
                        <div className="text-right text-[#6b6a62]">
                          {currentTotals[b].toFixed(1)}M
                        </div>
                        <div className="text-right font-medium" style={{ color: COLORS[b] }}>
                          {after.toFixed(1)}M
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-medium" style={{ color: COLORS[b] }}>
                            {ap.toFixed(1)}%
                          </span>
                          <span className="text-xs text-[#6b6a62]">
                            ({delta >= 0 ? "+" : ""}
                            {delta.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-[#2a2b27] pt-3 text-sm">
                  <span className="text-xs uppercase tracking-widest text-[#6b6a62]">
                    Portfolio Total
                  </span>
                  <span className="font-medium text-[#d4b87a]">
                    {preview.newTotal.toFixed(2)}M VND
                  </span>
                </div>

                {/* Cash Warning */}
                {preview.newTotal > 0 &&
                  ((currentTotals.dry + preview.deploy.dry) / preview.newTotal) * 100 < 10 && (
                    <div className="mt-3 rounded border border-[#3a2f0a] bg-[#1e1a0f] p-2 text-xs text-[#d4b87a]">
                      ⚠ Cash will be below 10% after this deployment.
                    </div>
                  )}
              </div>
            </>
          )}
          <div className="my-4 border-b border-[#2a2b27]" />
        </Card>

        {/* Dip Calculator */}
        <Card borderLeft="border-l-4 border-l-[#d4847a]">
          <div className="mb-4 text-xs uppercase tracking-widest text-[#d4847a]">
            Dip Deployment Calculator
          </div>
          {/* Saved Banner */}
          {dipDeployments.length > 0 && (
            <div className="mb-4 rounded border border-[#b8d4a0] bg-[#13180f] p-3 text-xs">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#b8d4a0]" />
                  <span className="font-medium text-[#b8d4a0]">
                    {dipDeployments.length} deployment{dipDeployments.length > 1 ? "s" : ""} this
                    episode
                  </span>
                </div>
                <span className="text-[#6b6a62]">
                  52w High: {dipDeployments[0].high.toFixed(0)} pts
                </span>
              </div>
              <div className="space-y-1">
                {dipDeployments.map((d, i) => (
                  <div key={i} className="flex justify-between text-[#6b6a62]">
                    <span>
                      [{d.date}]{" "}
                      {
                        [
                          "Tier 1 (25% fixed)",
                          "Tier 2 (33% remaining)",
                          "Tier 3 (50% remaining)",
                          "Tier 4 (100% remaining)",
                        ][d.tier - 1]
                      }
                    </span>
                    <span>{d.deployAmt.toFixed(2)}M VND</span>
                  </div>
                ))}
              </div>
              <button
                onClick={resetDipSave}
                className="mt-2 text-[#6b6a62] transition-colors hover:text-[#d4847a]"
              >
                ✕ Reset (new episode)
              </button>
            </div>
          )}
          <div className="my-4 grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wider text-[#6b6a62]">
                52-week High
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={dipHigh}
                  onChange={(e) => setDipHigh(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  placeholder="e.g. 1900"
                  className="w-full rounded border border-[#2a2b27] bg-[#0e0f0c] px-3 py-2 pr-10 text-sm focus:border-[#d4b87a] focus:outline-none"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#6b6a62]">
                  pts
                </span>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wider text-[#6b6a62]">
                Current VN-Index
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={dipCurrent}
                  onChange={(e) => setDipCurrent(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  placeholder="e.g. 1615"
                  className="w-full rounded border border-[#2a2b27] bg-[#0e0f0c] px-3 py-2 pr-10 text-sm focus:border-[#d4b87a] focus:outline-none"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#6b6a62]">
                  pts
                </span>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wider text-[#6b6a62]">
                Deployable Cash
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={dipCash}
                  onChange={(e) => setDipCash(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  placeholder="e.g. 30"
                  className="w-full rounded border border-[#2a2b27] bg-[#0e0f0c] px-3 py-2 pr-14 text-sm focus:border-[#d4b87a] focus:outline-none"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#6b6a62]">
                  M VND
                </span>
              </div>
            </div>
          </div>

          {dipCalc && (
            <>
              {/* Gauge */}
              <div className="mb-4">
                <div
                  className="mb-1 font-serif text-3xl font-light transition-colors"
                  style={{
                    fontFamily: "var(--allocator-serif), serif",
                    color:
                      dipCalc.drop < 10
                        ? "#6b6a62"
                        : dipCalc.drop < 20
                          ? "#d4b87a"
                          : dipCalc.drop < 30
                            ? "#e09060"
                            : dipCalc.drop < 40
                              ? "#d4847a"
                              : "#ff5555",
                  }}
                >
                  −{dipCalc.drop.toFixed(1)}%
                </div>
                <div className="mb-2 text-xs text-[#6b6a62]">drop from 52-week high</div>
                <div className="h-2 overflow-hidden rounded-full bg-[#2a2b27]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((dipCalc.drop / 50) * 100, 100)}%`,
                      background:
                        dipCalc.drop < 10
                          ? "#6b6a62"
                          : dipCalc.drop < 20
                            ? "#d4b87a"
                            : dipCalc.drop < 30
                              ? "#e09060"
                              : dipCalc.drop < 40
                                ? "#d4847a"
                                : "#ff5555",
                    }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-xs text-[#6b6a62]">
                  <span>0%</span>
                  <span>10%</span>
                  <span>20%</span>
                  <span>30%</span>
                  <span>40%+</span>
                </div>
              </div>

              {/* Tiers */}
              <div className="mb-4 space-y-2">
                {[
                  {
                    range: "< 10% drop",
                    label: "Normal DCA only",
                    pct: "0%",
                  },
                  {
                    range: "10–20% drop",
                    label: "Mild dip",
                    pct: "25%",
                  },
                  {
                    range: "20–30% drop",
                    label: "Moderate dip",
                    pct: "33%",
                  },
                  {
                    range: "30–40% drop",
                    label: "Deep dip",
                    pct: "50%",
                  },
                  {
                    range: "40%+ drop",
                    label: "Crash",
                    pct: "100%",
                  },
                ].map((tier, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-[95px_1fr_auto] gap-3 p-2.5 border rounded text-xs transition-colors ${
                      i === dipCalc.tierIdx
                        ? "border-[#d4847a] bg-[#1c0f0f]"
                        : dipDeployments.some((d) => d.tier === i && i !== dipCalc.tierIdx)
                          ? "border-[#d4b87a]"
                          : "border-[#2a2b27] bg-[#0e0f0c]"
                    }`}
                  >
                    <div
                      className={`${
                        i === dipCalc.tierIdx ? "text-[#d4847a] font-medium" : "text-[#6b6a62]"
                      }`}
                    >
                      {tier.range}
                    </div>
                    <div className="text-[#6b6a62]">{tier.label}</div>
                    <div className={`text-right ${i === dipCalc.tierIdx ? "text-[#d4b87a]" : ""}`}>
                      {tier.pct}
                    </div>
                  </div>
                ))}
              </div>

              {/* Result */}
              <div className="mb-4 rounded border border-[#2a2b27] bg-[#0e0f0c] p-4">
                {dipCalc.pct === 0 ? (
                  <div className="py-3 text-center text-sm text-[#6b6a62]">
                    Market is less than 10% off its 52-week high.
                    <br />
                    Stick to regular monthly income deployment only.
                  </div>
                ) : dipCalc.shouldBlock ? (
                  <div className="py-3 text-sm text-[#6b6a62]">
                    Already deployed at this tier or higher. {dipDeployments.length} total
                    deployment{dipDeployments.length > 1 ? "s" : ""} this episode. Wait for deeper
                    drop or reset for new episode.
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between border-b border-[#1e1f1c] py-1.5 text-sm">
                      <span className="text-[#6b6a62]">Deploy into Stock Funds</span>
                      <span className="font-medium" style={{ color: COLORS.stock }}>
                        {dipCalc.deployAmt.toFixed(2)}M VND
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#1e1f1c] py-1.5 text-sm">
                      <span className="text-[#6b6a62]">Cash remaining after</span>
                      <span className="font-medium" style={{ color: COLORS.dry }}>
                        {dipCalc.remaining.toFixed(2)}M VND
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 text-sm">
                      <span className="text-[#6b6a62]">Do monthly income first, then this</span>
                      <span className="text-xs text-[#6b6a62]">separate action</span>
                    </div>
                  </div>
                )}

                {dipCalc.pct > 0 && !dipCalc.shouldBlock && dipCalc.remaining < 5 && (
                  <div className="mt-3 rounded border border-[#3a2f0a] bg-[#1e1a0f] p-2 text-xs text-[#d4b87a]">
                    ⚠ Cash will be very thin. Only proceed if emergency fund is fully separate.
                  </div>
                )}
              </div>

              {dipCalc.pct > 0 && !dipCalc.shouldBlock && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={saveDipDeployment}
                    className="rounded bg-[#d4b87a] px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#0e0f0c] transition-opacity hover:opacity-85"
                  >
                    ✓ Save deployment
                  </button>
                  <span className="text-xs leading-tight text-[#6b6a62]">
                    Only press after you&apos;ve
                    <br />
                    executed the trade
                  </span>
                </div>
              )}
            </>
          )}
          <div className="my-4 border-b border-[#2a2b27]" />
          <CollapsibleSection
            id="dip-explain"
            title="How dip deployment works"
            isOpen={collapsibles["dip-explain"]}
            onToggle={() => toggleCollapsible("dip-explain")}
            small
          >
            <div className="space-y-2 text-sm text-[#6b6a62]">
              <p>
                When VN-Index drops from its 52-week high, deploy extra cash{" "}
                <strong className="text-[#e8e6df]">on top of</strong> monthly income — into stock
                funds only.
              </p>
              <p>
                <strong className="text-[#e8e6df]">52-week high</strong> — highest VN-Index closing
                price in the past year.
              </p>
              <p>
                <strong className="text-[#e8e6df]">
                  One deploy per tier per drawdown episode.
                </strong>{" "}
                Only deploy again when the index drops into the next tier.
              </p>
              <p>
                <strong className="text-[#e8e6df]">Save button</strong> — hit Save only after
                you&apos;ve executed the trade.
              </p>
            </div>
          </CollapsibleSection>
        </Card>

        {/* Gain Calculator */}
        <Card borderLeft="border-l-4 border-l-[#b8d4a0]">
          <div className="mb-4 text-xs uppercase tracking-widest text-[#b8d4a0]">Gain Trimming</div>

          {!gainCalc ? (
            <div className="py-2 text-sm text-[#6b6a62]">
              Enter your current portfolio values above to see gain trimming recommendations.
            </div>
          ) : (
            <>
              {/* Gauge */}
              <div className="mb-4">
                <div
                  className="mb-1 font-serif text-3xl font-light transition-colors"
                  style={{
                    fontFamily: "var(--allocator-serif), serif",
                    color:
                      gainCalc.over < 5
                        ? "#6b6a62"
                        : gainCalc.over < 10
                          ? "#b8d4a0"
                          : gainCalc.over < 15
                            ? "#d4b87a"
                            : "#d4847a",
                  }}
                >
                  {gainCalc.over > 0 ? `+${gainCalc.over.toFixed(1)}%` : "On target"}
                </div>
                <div className="mb-2 text-xs text-[#6b6a62]">stocks above target allocation</div>
                <div className="h-2 overflow-hidden rounded-full bg-[#2a2b27]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((gainCalc.over / 20) * 100, 100)}%`,
                      background:
                        gainCalc.over < 5
                          ? "#6b6a62"
                          : gainCalc.over < 10
                            ? "#b8d4a0"
                            : gainCalc.over < 15
                              ? "#d4b87a"
                              : "#d4847a",
                    }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-xs text-[#6b6a62]">
                  <span>0%</span>
                  <span>5%</span>
                  <span>10%</span>
                  <span>15%</span>
                  <span>20%+</span>
                </div>
              </div>

              {/* Result */}
              <div className="rounded border border-[#2a2b27] bg-[#0e0f0c] p-4">
                {gainCalc.trimAmt === 0 ? (
                  <div className="py-3 text-center text-sm text-[#6b6a62]">
                    {gainCalc.inDrawdown && gainCalc.over > 0 ? (
                      <>
                        Market is in drawdown. Stock trimming suspended — do not trim stocks when
                        market is down.
                      </>
                    ) : (
                      <>
                        Stocks are within 5% of target ({gainCalc.stocksPct.toFixed(1)}% vs{" "}
                        {targets.stock}% target).
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between border-b border-[#1e1f1c] py-1.5 text-sm">
                      <span className="text-[#6b6a62]">Current stock allocation</span>
                      <span className="font-medium text-[#d4847a]">
                        {gainCalc.stocksPct.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#1e1f1c] py-1.5 text-sm">
                      <span className="text-[#6b6a62]">Target allocation</span>
                      <span className="font-medium text-[#6b6a62]">{targets.stock}%</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1e1f1c] py-1.5 text-sm">
                      <span className="text-[#6b6a62]">Trim from Stock Funds</span>
                      <span className="font-medium text-[#d4b87a]">
                        {gainCalc.trimAmt.toFixed(2)}M VND
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#1e1f1c] py-1.5 text-sm">
                      <span className="text-[#6b6a62]">Move proceeds to Cash</span>
                      <span className="font-medium" style={{ color: COLORS.dry }}>
                        {gainCalc.trimAmt.toFixed(2)}M VND
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 text-sm">
                      <span className="text-[#6b6a62]">Stocks after trim</span>
                      <span className="font-medium" style={{ color: COLORS.stock }}>
                        {gainCalc.stocksAfter.toFixed(2)}M (
                        {((gainCalc.stocksAfter / grandTotal) * 100).toFixed(1)}
                        %)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          <div className="my-4 border-b border-[#2a2b27]" />
          <CollapsibleSection
            id="gain-explain"
            title="How gain trimming works"
            isOpen={collapsibles["gain-explain"]}
            onToggle={() => toggleCollapsible("gain-explain")}
            small
          >
            <div className="space-y-2 text-sm text-[#6b6a62]">
              <p>
                When stocks run above your target allocation, you&apos;re carrying more risk than
                intended.
              </p>
              <p>
                <strong className="text-[#e8e6df]">Trim to watch limit (5%):</strong> If drift
                exceeds 5%, trim back to be within the watch limit. Proceeds always go to cash.
              </p>
              <p>
                <strong className="text-[#e8e6df]">Drawdown-aware:</strong> Stock trimming is
                suspended during a dip episode when VN-Index is below its 52-week high.
              </p>
            </div>
          </CollapsibleSection>
        </Card>
      </main>
    </div>
  );
}

// Collapsible Section Component
function CollapsibleSection({
  className,
  title,
  isOpen,
  onToggle,
  children,
  small = false,
  accentColor = "text-[#6b6a62]",
}) {
  return (
    <div className={className}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-2 ${
          small ? "text-xs" : "text-xs"
        } uppercase tracking-wider ${accentColor} hover:text-[#e8e6df] transition-colors`}
      >
        <div className="flex gap-2">
          <svg
            className="h-5 w-5 text-[#6b6a62] transition-colors hover:text-[#d4b87a]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-sans text-sm capitalize italic">{title}</span>
        </div>
        <span className={`ml-auto transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100 pt-4" : "max-h-0 opacity-0 pt-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// Card Component
function Card({ children, borderLeft = "" }) {
  return (
    <div className={`bg-[#161714] border border-[#2a2b27] rounded p-5 ${borderLeft}`}>
      {children}
    </div>
  );
}
