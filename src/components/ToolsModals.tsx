import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Timer as TimerIcon, 
  Clock, 
  Globe, 
  Calendar as CalIcon, 
  Boxes, 
  Play, 
  Pause, 
  RotateCcw, 
  Flag, 
  Bell,
  Volume2,
  VolumeX,
  Check,
  Search
} from 'lucide-react';
import { periodicElements, electronConfigs } from '../data/elements';
import { math } from '../utils/mathInstance';

// ================= STOPWATCH MODAL =================
export const StopwatchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [elapsed, setElapsed] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<string[]>([]);
  const startRef = useRef<number>(0);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (running) {
      startRef.current = Date.now() - elapsed;
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startRef.current);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  if (!isOpen) return null;

  const formatTime = (ms: number) => {
    const millis = ms % 1000;
    const totalSecs = Math.floor(ms / 1000);
    const secs = totalSecs % 60;
    const mins = Math.floor(totalSecs / 60) % 60;
    const hours = Math.floor(totalSecs / 3600);
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
  };

  const handleReset = () => {
    setRunning(false);
    setElapsed(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (!running) return;
    setLaps((prev) => [formatTime(elapsed), ...prev]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-col w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <TimerIcon className="w-4 h-4" />
            Precision Stopwatch
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div id="stopwatchDisplay" className="font-mono text-3xl font-bold text-center py-6 text-cyan-300 bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
          {formatTime(elapsed)}
        </div>

        <div className="grid grid-cols-4 gap-2 my-4">
          <button
            onClick={() => setRunning(!running)}
            className={`py-2 rounded-lg font-semibold text-xs flex items-center justify-center gap-1 transition ${
              running ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={handleLap}
            disabled={!running}
            className="py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1"
          >
            <Flag className="w-3.5 h-3.5" />
            Lap
          </button>
          <button
            onClick={handleReset}
            className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1 col-span-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        <div id="lapList" className="max-h-36 overflow-y-auto space-y-1 font-mono text-xs">
          {laps.map((lap, i) => (
            <div key={i} className="flex justify-between px-3 py-1 bg-slate-950/60 rounded border border-slate-800/80">
              <span className="text-slate-500">Lap {laps.length - i}</span>
              <span className="text-cyan-300 font-semibold">{lap}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ================= COUNTDOWN TIMER MODAL =================
export const TimerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(5);
  const [seconds, setSeconds] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(300);
  const [running, setRunning] = useState<boolean>(false);
  const [alarm, setAlarm] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const alarmIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize / unlock AudioContext on user gesture
  const ensureAudioContext = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
      return audioCtxRef.current;
    } catch {
      return null;
    }
  };

  // Play crisp double-chime alarm beep via Web Audio API
  const playAlarmBurst = () => {
    if (muted) return;
    const ctx = ensureAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const beepOffsets = [0, 0.16, 0.32];

    beepOffsets.forEach((offset, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(idx === 2 ? 1174.66 : 880, now + offset); // A5 -> D6 chime

      gain.gain.setValueAtTime(0.001, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.32, now + offset + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.13);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.14);
    });
  };

  // Trigger hardware vibration pattern
  const triggerVibration = () => {
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        navigator.vibrate([350, 150, 350, 150, 500]);
      }
    } catch {
      // Ignore if blocked or unsupported
    }
  };

  const stopAlarm = () => {
    setAlarm(false);
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        navigator.vibrate(0);
      }
    } catch {
      // Ignore
    }
  };

  // Countdown tick loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (running && remaining > 0) {
      interval = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            setRunning(false);
            setAlarm(true);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running, remaining]);

  // Continuous alarm ring + hardware vibration while alarm is active
  useEffect(() => {
    if (alarm) {
      playAlarmBurst();
      triggerVibration();
      alarmIntervalRef.current = setInterval(() => {
        playAlarmBurst();
        triggerVibration();
      }, 1500);
    } else {
      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
        alarmIntervalRef.current = null;
      }
    }

    return () => {
      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
        alarmIntervalRef.current = null;
      }
    };
  }, [alarm, muted]);

  // Cleanup vibration on unmount
  useEffect(() => {
    return () => {
      try {
        if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
          navigator.vibrate(0);
        }
      } catch {
        // Ignore
      }
    };
  }, []);

  if (!isOpen) return null;

  const updateInputTime = (h: number, m: number, s: number) => {
    const safeH = Math.max(0, Math.min(99, h));
    const safeM = Math.max(0, Math.min(59, m));
    const safeS = Math.max(0, Math.min(59, s));
    setHours(safeH);
    setMinutes(safeM);
    setSeconds(safeS);
    if (!running) {
      stopAlarm();
      setRemaining(safeH * 3600 + safeM * 60 + safeS);
    }
  };

  const handleStart = () => {
    ensureAudioContext();
    let target = remaining;
    if (target <= 0) {
      target = hours * 3600 + minutes * 60 + seconds;
      if (target <= 0) return;
      setRemaining(target);
    }
    stopAlarm();
    setRunning(true);
  };

  const handleReset = () => {
    setRunning(false);
    stopAlarm();
    const total = hours * 3600 + minutes * 60 + seconds;
    setRemaining(total > 0 ? total : 300);
  };

  const handleClose = () => {
    stopAlarm();
    onClose();
  };

  const formatRemaining = () => {
    const h = Math.floor(remaining / 3600);
    const m = Math.floor((remaining % 3600) / 60);
    const s = remaining % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className={`flex flex-col w-full max-w-sm bg-slate-900 border rounded-2xl shadow-2xl p-5 text-slate-100 transition ${
        alarm ? 'border-rose-500 shadow-rose-500/30 timer-vibrate' : 'border-slate-800'
      }`}>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Clock className="w-4 h-4" />
            Countdown Timer
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="p-1 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition"
              title={muted ? 'Unmute Alarm Sound' : 'Mute Alarm Sound'}
            >
              {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button onClick={handleClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!running && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <input
              id="timerHours"
              type="number"
              min="0"
              max="99"
              value={hours}
              onChange={(e) => updateInputTime(parseInt(e.target.value, 10) || 0, minutes, seconds)}
              className="w-16 px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-center font-mono text-sm"
              placeholder="HH"
            />
            <span className="font-mono text-slate-500">:</span>
            <input
              id="timerMinutes"
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => updateInputTime(hours, parseInt(e.target.value, 10) || 0, seconds)}
              className="w-16 px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-center font-mono text-sm"
              placeholder="MM"
            />
            <span className="font-mono text-slate-500">:</span>
            <input
              id="timerSeconds"
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => updateInputTime(hours, minutes, parseInt(e.target.value, 10) || 0)}
              className="w-16 px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-center font-mono text-sm"
              placeholder="SS"
            />
          </div>
        )}

        <div id="timerDisplay" className={`font-mono text-4xl font-bold text-center py-6 rounded-xl border shadow-inner ${
          alarm ? 'bg-rose-950/60 text-rose-300 border-rose-500 animate-pulse' : 'bg-slate-950 text-cyan-300 border-slate-800'
        }`}>
          {formatRemaining()}
        </div>

        {alarm && (
          <div className="mt-3 flex flex-col items-center gap-2">
            <div className="text-center font-bold text-rose-400 text-sm flex items-center justify-center gap-1.5">
              <Bell className="w-4 h-4 animate-bounce" />
              Time's Up! Alarm Ringing & Vibrating
            </div>
            <button
              type="button"
              onClick={stopAlarm}
              className="w-full py-2 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-lg text-xs shadow-lg shadow-rose-500/30 transition"
            >
              Stop Alarm & Vibration
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={running ? () => setRunning(false) : handleStart}
            className="py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition"
          >
            {running ? 'Pause' : 'Start Timer'}
          </button>
          <button
            onClick={handleReset}
            className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold border border-slate-700 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

// ================= WORLD CLOCK MODAL =================
export const WorldClockModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const cities = [
    { name: '🇮🇳 New Delhi / India', zone: 'Asia/Kolkata' },
    { name: '🇬🇧 London', zone: 'Europe/London' },
    { name: '🇺🇸 New York', zone: 'America/New_York' },
    { name: '🇯🇵 Tokyo', zone: 'Asia/Tokyo' },
    { name: '🇦🇺 Sydney', zone: 'Australia/Sydney' },
    { name: '🇫🇷 Paris', zone: 'Europe/Paris' },
    { name: '🇦🇪 Dubai', zone: 'Asia/Dubai' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-col w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Globe className="w-4 h-4" />
            World Clock
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div id="worldClockContent" className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {cities.map((city) => {
            const timeStr = now.toLocaleTimeString([], { timeZone: city.zone, hour12: true });
            const dateStr = now.toLocaleDateString([], { timeZone: city.zone, weekday: 'short', month: 'short', day: 'numeric' });
            return (
              <div key={city.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div>
                  <div className="text-xs font-semibold text-slate-200">{city.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{dateStr}</div>
                </div>
                <div className="font-mono text-sm font-bold text-cyan-300">{timeStr}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ================= CALENDAR MODAL =================
export const CalendarModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-col w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <CalIcon className="w-4 h-4" />
            Calendar & Date Tool
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3">
          <label className="text-xs text-slate-400">Select Date:</label>
          <input
            id="calendarPicker"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-cyan-200 font-mono focus:outline-none focus:border-cyan-400"
          />

          <div className="text-xs text-slate-300 font-mono mt-2 pt-2 border-t border-slate-800">
            Selected: <span className="text-cyan-400">{new Date(selectedDate).toDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================= VECTOR CALCULATOR MODAL =================
export const VectorModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onApplyResult: (val: string) => void;
}> = ({ isOpen, onClose, onApplyResult }) => {
  const [v1, setV1] = useState<string>('1, 2, 3');
  const [v2, setV2] = useState<string>('4, 5, 6');
  const [result, setResult] = useState<string>('');

  if (!isOpen) return null;

  const parseVec = (str: string) => str.split(',').map((s) => Number(s.trim()));

  const handleOp = (op: number) => {
    try {
      const a = parseVec(v1);
      const b = parseVec(v2);

      let res = '';
      if (op === 1) {
        // Addition
        const sum = [a[0] + b[0], a[1] + b[1], (a[2] || 0) + (b[2] || 0)];
        res = `[${sum.join(', ')}]`;
      } else if (op === 2) {
        // Subtraction
        const diff = [a[0] - b[0], a[1] - b[1], (a[2] || 0) - (b[2] || 0)];
        res = `[${diff.join(', ')}]`;
      } else if (op === 3) {
        // Dot product
        const dot = a[0] * b[0] + a[1] * b[1] + (a[2] || 0) * (b[2] || 0);
        res = `${dot}`;
      } else if (op === 4) {
        // Cross product
        const cross = [
          a[1] * (b[2] || 0) - (a[2] || 0) * b[1],
          (a[2] || 0) * b[0] - a[0] * (b[2] || 0),
          a[0] * b[1] - a[1] * b[0],
        ];
        res = `[${cross.join(', ')}]`;
      } else if (op === 5) {
        // Magnitude |a|
        const mag = Math.sqrt(a.reduce((acc, v) => acc + v * v, 0));
        res = `${mag.toFixed(4)}`;
      } else if (op === 6) {
        // Unit vector a
        const mag = Math.sqrt(a.reduce((acc, v) => acc + v * v, 0));
        const unit = a.map((v) => (v / mag).toFixed(4));
        res = `[${unit.join(', ')}]`;
      } else if (op === 7) {
        // Angle between vectors
        const dot = a[0] * b[0] + a[1] * b[1] + (a[2] || 0) * (b[2] || 0);
        const magA = Math.sqrt(a.reduce((acc, v) => acc + v * v, 0));
        const magB = Math.sqrt(b.reduce((acc, v) => acc + v * v, 0));
        const angleRad = Math.acos(dot / (magA * magB));
        const angleDeg = (angleRad * 180) / Math.PI;
        res = `${angleDeg.toFixed(2)}° (${angleRad.toFixed(4)} rad)`;
      } else if (op === 8) {
        // Projection of a on b
        const dot = a[0] * b[0] + a[1] * b[1] + (a[2] || 0) * (b[2] || 0);
        const magB2 = b.reduce((acc, v) => acc + v * v, 0);
        const proj = b.map((v) => ((dot / magB2) * v).toFixed(4));
        res = `[${proj.join(', ')}]`;
      }

      setResult(res);
      onApplyResult(res);
    } catch {
      setResult('Vector error');
    }
  };

  return (
    <div id="vectorMenu" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-col w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Boxes className="w-4 h-4" />
            3D Vector Calculator
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Vector A (x, y, z):</label>
            <input
              type="text"
              value={v1}
              onChange={(e) => setV1(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-cyan-300"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Vector B (x, y, z):</label>
            <input
              type="text"
              value={v2}
              onChange={(e) => setV2(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-cyan-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-medium">
          <button onClick={() => handleOp(1)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-left">1. Vector A + B</button>
          <button onClick={() => handleOp(2)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-left">2. Vector A − B</button>
          <button onClick={() => handleOp(3)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-left">3. Dot Product A · B</button>
          <button onClick={() => handleOp(4)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-left">4. Cross Product A × B</button>
          <button onClick={() => handleOp(5)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-left">5. Magnitude |A|</button>
          <button onClick={() => handleOp(6)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-left">6. Unit Vector Â</button>
          <button onClick={() => handleOp(7)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-left">7. Angle Between</button>
          <button onClick={() => handleOp(8)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-left">8. Projection A on B</button>
        </div>

        {result && (
          <div className="mt-4 p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-center font-mono text-xs text-cyan-300">
            Result: {result}
          </div>
        )}
      </div>
    </div>
  );
};

// ================= PERIODIC TABLE MODAL =================
export const PeriodicTableModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState<string>('');
  const [selectedEl, setSelectedEl] = useState<(typeof periodicElements)[0] | null>(null);

  if (!isOpen) return null;

  const filtered = periodicElements.filter((el) => {
    const q = search.toLowerCase();
    return (
      el.symbol.toLowerCase().includes(q) ||
      el.name.toLowerCase().includes(q) ||
      el.atomicNumber.toString() === q
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-col w-full max-w-4xl h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <div className="font-bold text-sm text-cyan-400">Interactive Periodic Table (118 Elements)</div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search element symbol, name, or atomic number..."
            className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-cyan-200"
          />
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 p-1">
          {filtered.map((el) => (
            <button
              key={el.atomicNumber}
              onClick={() => setSelectedEl(el)}
              className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 text-left transition flex flex-col justify-between"
            >
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>{el.atomicNumber}</span>
                <span>Gr {el.group}</span>
              </div>
              <div className="text-base font-bold text-cyan-300 my-1">{el.symbol}</div>
              <div className="text-[11px] text-slate-300 truncate">{el.name}</div>
              <div className="text-[10px] font-mono text-slate-400">{el.mass.toFixed(2)}</div>
            </button>
          ))}
        </div>

        {selectedEl && (
          <div className="mt-3 p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-cyan-300">{selectedEl.name} ({selectedEl.symbol})</span> · Atomic #{selectedEl.atomicNumber} · Mass: {selectedEl.mass} u
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                Electron Config: {electronConfigs[selectedEl.atomicNumber] || 'Standard'}
              </div>
            </div>
            <button
              onClick={() => setSelectedEl(null)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ================= ALPHA VARIABLES MODAL =================
export const AlphaModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  variables: Record<string, number>;
  onStore: (key: string) => void;
  onRecall: (key: string) => void;
  currentDisplay: string;
}> = ({ isOpen, onClose, variables, onStore, onRecall, currentDisplay }) => {
  if (!isOpen) return null;
  const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'X', 'Y', 'M'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-col w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <div className="font-bold text-sm text-cyan-400">ALPHA Memory Variables</div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="text-xs text-slate-400 mb-3">
          Current Display: <span className="font-mono text-cyan-300 font-bold">{currentDisplay || '0'}</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 max-h-72 overflow-y-auto">
          {keys.map((k) => (
            <div key={k} className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col justify-between gap-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-amber-300">{k}</span>
                <span className="font-mono text-xs text-slate-300 truncate max-w-[60px]">{variables[k] || 0}</span>
              </div>
              <div className="grid grid-cols-2 gap-1 pt-1 border-t border-slate-800/60">
                <button
                  onClick={() => onStore(k)}
                  className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-bold rounded transition"
                  title="Store current display value here"
                >
                  STO
                </button>
                <button
                  onClick={() => { onRecall(k); onClose(); }}
                  className="px-2 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-bold rounded transition"
                  title="Recall variable into display"
                >
                  RCL
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ================= SEQUENCE CALCULATOR MODAL =================
export const SequenceModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onApplyResult: (val: string) => void;
}> = ({ isOpen, onClose, onApplyResult }) => {
  const [seqType, setSeqType] = useState<'arithmetic' | 'geometric'>('arithmetic');
  const [a, setA] = useState<string>('2');
  const [d, setD] = useState<string>('3'); // difference or ratio
  const [n, setN] = useState<string>('10');
  const [result, setResult] = useState<string>('');

  if (!isOpen) return null;

  const handleCompute = () => {
    const aVal = Number(a) || 0;
    const diffVal = Number(d) || 0;
    const nVal = Number(n) || 1;

    if (seqType === 'arithmetic') {
      const nth = aVal + (nVal - 1) * diffVal;
      const sum = (nVal / 2) * (2 * aVal + (nVal - 1) * diffVal);
      setResult(`a_${nVal} = ${nth}, S_${nVal} = ${sum}`);
    } else {
      const nth = aVal * Math.pow(diffVal, nVal - 1);
      const sum = diffVal !== 1 ? (aVal * (1 - Math.pow(diffVal, nVal))) / (1 - diffVal) : aVal * nVal;
      let infSum = '';
      if (Math.abs(diffVal) < 1) {
        infSum = `, S_∞ = ${(aVal / (1 - diffVal)).toFixed(4)}`;
      }
      setResult(`a_${nVal} = ${nth}, S_${nVal} = ${sum}${infSum}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-col w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <div className="font-bold text-sm text-cyan-400">Sequence Calculator (SEQ)</div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex gap-2 mb-3">
          <button
            onClick={() => { setSeqType('arithmetic'); setResult(''); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border ${
              seqType === 'arithmetic' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            Arithmetic (AP)
          </button>
          <button
            onClick={() => { setSeqType('geometric'); setResult(''); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border ${
              seqType === 'geometric' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            Geometric (GP)
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">First Term (a₁):</label>
            <input type="text" value={a} onChange={(e) => setA(e.target.value)} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg font-mono" />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">{seqType === 'arithmetic' ? 'Common Difference (d):' : 'Common Ratio (r):'}</label>
            <input type="text" value={d} onChange={(e) => setD(e.target.value)} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg font-mono" />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Term Index (n):</label>
            <input type="text" value={n} onChange={(e) => setN(e.target.value)} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg font-mono" />
          </div>
          <button onClick={handleCompute} className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition mt-2">
            Calculate Sequence
          </button>
        </div>

        {result && (
          <div className="mt-3 p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs font-mono text-cyan-300 flex items-center justify-between">
            <span className="truncate max-w-[200px]">{result}</span>
            <button
              onClick={() => { onApplyResult(result); onClose(); }}
              className="px-2 py-1 bg-cyan-500 text-slate-950 font-bold rounded text-[11px]"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ================= PHYSICAL CONSTANTS MODAL =================
export const ConstantsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onInsert: (val: string) => void;
}> = ({ isOpen, onClose, onInsert }) => {
  if (!isOpen) return null;

  const constantsList = [
    { name: 'Speed of Light in Vacuum', symbol: 'c', val: '299792458', unit: 'm/s' },
    { name: 'Planck Constant', symbol: 'h', val: '6.62607015e-34', unit: 'J·s' },
    { name: 'Reduced Planck Constant', symbol: 'ħ', val: '1.054571817e-34', unit: 'J·s' },
    { name: 'Gravitational Constant', symbol: 'G', val: '6.6743e-11', unit: 'N·m²/kg²' },
    { name: 'Avogadro Constant', symbol: 'N_A', val: '6.02214076e23', unit: 'mol⁻¹' },
    { name: 'Elementary Charge', symbol: 'e', val: '1.602176634e-19', unit: 'C' },
    { name: 'Boltzmann Constant', symbol: 'k_B', val: '1.380649e-23', unit: 'J/K' },
    { name: 'Universal Gas Constant', symbol: 'R', val: '8.314462618', unit: 'J/(mol·K)' },
    { name: 'Standard Acceleration of Gravity', symbol: 'g', val: '9.80665', unit: 'm/s²' },
    { name: 'Electron Mass', symbol: 'm_e', val: '9.1093837e-31', unit: 'kg' },
    { name: 'Proton Mass', symbol: 'm_p', val: '1.67262192e-27', unit: 'kg' },
    { name: 'Vacuum Permittivity', symbol: 'ε_0', val: '8.8541878128e-12', unit: 'F/m' },
    { name: 'Vacuum Permeability', symbol: 'μ_0', val: '1.25663706212e-6', unit: 'N/A²' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-col w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <div className="font-bold text-sm text-cyan-400">Physical & Fundamental Constants</div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
          {constantsList.map((c) => (
            <div key={c.symbol} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  <span className="font-mono text-cyan-300 mr-2">{c.symbol}</span>
                  {c.name}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {c.val} <span className="text-slate-500">{c.unit}</span>
                </div>
              </div>
              <button
                onClick={() => { onInsert(c.val); onClose(); }}
                className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold rounded border border-cyan-500/30 transition"
              >
                Insert
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ================= PROGRAMMING BITWISE MODAL =================
export const ProgrammingModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onInsert: (val: string) => void;
}> = ({ isOpen, onClose, onInsert }) => {
  const [valA, setValA] = useState<string>('12');
  const [valB, setValB] = useState<string>('10');
  const [res, setRes] = useState<string>('');

  if (!isOpen) return null;

  const a = parseInt(valA, 10) || 0;
  const b = parseInt(valB, 10) || 0;

  const op = (type: string) => {
    let out = 0;
    if (type === 'AND') out = a & b;
    else if (type === 'OR') out = a | b;
    else if (type === 'XOR') out = a ^ b;
    else if (type === 'NOT') out = ~a;
    else if (type === 'SHL') out = a << (b || 1);
    else if (type === 'SHR') out = a >> (b || 1);
    setRes(`${out} (BIN: ${out.toString(2)}, HEX: 0x${out.toString(16).toUpperCase()})`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-col w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <div className="font-bold text-sm text-cyan-400">Programmer Bitwise Tool (PROG)</div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">Operand A (Dec):</label>
            <input type="text" value={valA} onChange={(e) => setValA(e.target.value)} className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded font-mono" />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Operand B (Dec/Shift):</label>
            <input type="text" value={valB} onChange={(e) => setValB(e.target.value)} className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded font-mono" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold mb-3">
          <button onClick={() => op('AND')} className="py-2 bg-slate-800 hover:bg-slate-700 rounded">AND</button>
          <button onClick={() => op('OR')} className="py-2 bg-slate-800 hover:bg-slate-700 rounded">OR</button>
          <button onClick={() => op('XOR')} className="py-2 bg-slate-800 hover:bg-slate-700 rounded">XOR</button>
          <button onClick={() => op('NOT')} className="py-2 bg-slate-800 hover:bg-slate-700 rounded">~NOT A</button>
          <button onClick={() => op('SHL')} className="py-2 bg-slate-800 hover:bg-slate-700 rounded">A &lt;&lt; B</button>
          <button onClick={() => op('SHR')} className="py-2 bg-slate-800 hover:bg-slate-700 rounded">A &gt;&gt; B</button>
        </div>

        {res && (
          <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs font-mono text-cyan-300 flex items-center justify-between">
            <span className="truncate max-w-[200px]">{res}</span>
            <button onClick={() => { onInsert(res.split(' ')[0]); onClose(); }} className="px-2 py-1 bg-cyan-500 text-slate-950 font-bold rounded text-[11px]">
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ================= NUMERICAL TABLE MODAL =================
export const TableModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  initialFunc: string;
}> = ({ isOpen, onClose, initialFunc }) => {
  const [expr, setExpr] = useState<string>(initialFunc || 'x^2 - 4');
  const [start, setStart] = useState<string>('-3');
  const [end, setEnd] = useState<string>('3');
  const [step, setStep] = useState<string>('1');
  const [rows, setRows] = useState<{ x: number; y: number | string }[]>([]);

  if (!isOpen) return null;

  const handleGenerate = () => {
    const s = Number(start) || 0;
    const e = Number(end) || 0;
    const st = Number(step) || 1;
    const list: { x: number; y: number | string }[] = [];
    for (let x = s; x <= e + 1e-9; x += st) {
      try {
        const y = Number(math.evaluate(expr, { x }));
        list.push({ x: Number(x.toFixed(2)), y: Number.isFinite(y) ? Number(y.toFixed(4)) : 'Undef' });
      } catch {
        list.push({ x, y: 'Error' });
      }
    }
    setRows(list);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-col w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <div className="font-bold text-sm text-cyan-400">TABLE Generator f(x)</div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-2 mb-3 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">Function f(x):</label>
            <input type="text" value={expr} onChange={(e) => setExpr(e.target.value)} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded font-mono" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-slate-400 block mb-1">Start:</label>
              <input type="text" value={start} onChange={(e) => setStart(e.target.value)} className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded font-mono text-center" />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">End:</label>
              <input type="text" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded font-mono text-center" />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Step:</label>
              <input type="text" value={step} onChange={(e) => setStep(e.target.value)} className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded font-mono text-center" />
            </div>
          </div>
          <button onClick={handleGenerate} className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition mt-2">
            Generate Table
          </button>
        </div>

        {rows.length > 0 && (
          <div className="max-h-48 overflow-y-auto border border-slate-800 rounded-xl bg-slate-950/70 font-mono text-xs">
            <div className="grid grid-cols-2 p-2 font-bold text-cyan-300 border-b border-slate-800 bg-slate-900/60">
              <div>x</div>
              <div>f(x)</div>
            </div>
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-2 p-1.5 px-2 border-b border-slate-800/40 text-slate-300">
                <div>{r.x}</div>
                <div className="text-cyan-400">{r.y}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

