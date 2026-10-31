/* ==================== 1. CONSTANTS & MET FORMULAS ==================== */

// Exact Physics Formula for Dumbbell Exercises specified in instructions
function calculateDumbbellKcal(exercise, heightCm, bodyMass, dumbbellMass, reps) {
    const g = 9.81;
    const efficiency = 0.20;
    const correction = 2;
    const height = heightCm / 100;
    const dbMass = parseFloat(dumbbellMass) || 10;

    const config = {
        dumbbellSquats: {
            mass: bodyMass * 0.9 + dbMass,
            distance: height * 0.15
        },
        bicepCurls: {
            mass: dbMass,
            distance: height * 0.25
        },
        shoulderPress: {
            mass: dbMass,
            distance: height * 0.35
        }
    };

    const e = config[exercise];
    if (!e || reps < 0) return 0;
    const work = e.mass * g * e.distance;
    const res = (work * reps * correction) / (efficiency * 4184);
    return isNaN(res) ? 0 : res;
}

const EXERCISES_DATABASE = {
    "squats": { name: "Squats", category: "Strength", met: 3.8, secondsPerRep: 3, type: "reps", icon: "fa-person-dots-from-line", color: "from-blue-500 to-indigo-600" },
    "push_ups": { name: "Push-ups", category: "Strength", met: 3.8, secondsPerRep: 3, type: "reps", icon: "fa-dumbbell", color: "from-indigo-500 to-purple-600" },
    "sit_ups": { name: "Sit-ups", category: "Strength", met: 3.8, secondsPerRep: 3, type: "reps", icon: "fa-user-ninja", color: "from-purple-500 to-pink-600" },
    "lunges": { name: "Lunges", category: "Strength", met: 3.8, secondsPerRep: 3, type: "reps", icon: "fa-person-walking", color: "from-pink-500 to-rose-600" },
    "burpees": { name: "Burpees", category: "Cardio", met: 7.5, secondsPerRep: 6, type: "reps", icon: "fa-person-running", color: "from-amber-500 to-red-600" },
    "jumping_jacks": { name: "Jumping Jacks", category: "Cardio", met: 7.5, secondsPerRep: 1, type: "reps", icon: "fa-child-reaching", color: "from-orange-500 to-amber-600" },
    "skipping_rope": { name: "Skipping Rope", category: "Cardio", met: 11.0, secondsPerRep: 0.5, type: "reps", icon: "fa-bolt", color: "from-yellow-500 to-emerald-600" },
    "mountain_climbers": { name: "Mountain Climbers", category: "Cardio", met: 8.0, secondsPerRep: 1, type: "reps", icon: "fa-person-hiking", color: "from-emerald-500 to-teal-600" },
    "forward_bends": { name: "Forward Bends", category: "Flexibility", met: 2.3, secondsPerRep: 3, type: "reps", icon: "fa-person", color: "from-teal-500 to-cyan-600" },
    "plank": { name: "Plank", category: "Isometric", met: 2.8, secondsPerRep: 1, type: "seconds", icon: "fa-stopwatch", color: "from-cyan-500 to-blue-600", plankMultiplier: 3 },
    
    // Bodyweight Exercises
    "high_knees": { name: "High Knees", category: "Cardio", met: 7.5, secondsPerRep: 1, type: "reps", icon: "fa-person-running", color: "from-lime-500 to-green-600", customFormula: "high_knees" },
    "bicycle_crunches": { name: "Bicycle Crunches", category: "Core", met: 3.8, secondsPerRep: 2, type: "reps", icon: "fa-child", color: "from-emerald-500 to-teal-600", customFormula: "bicycle_crunches" },

    // Dumbbell Exercises
    "dumbbell_squats": { name: "1. Dumbbell Squats", desc: "Przysiady z hantlami trzymanymi po bokach lub przy klatce piersiowej.", category: "Legs", type: "reps", isDumbbell: true, dbKey: "dumbbellSquats", icon: "fa-dumbbell", color: "from-blue-600 to-slate-700" },
    "bicep_curls": { name: "2. Dumbbell Bicep Curls", desc: "Uginanie ramion z hantlami.", category: "Arms", type: "reps", isDumbbell: true, dbKey: "bicepCurls", icon: "fa-hand-fist", color: "from-purple-600 to-slate-700" },
    "shoulder_press": { name: "3. Dumbbell Shoulder Press", desc: "Wyciskanie hantli nad głowę.", category: "Shoulders", type: "reps", isDumbbell: true, dbKey: "shoulderPress", icon: "fa-child-reaching", color: "from-amber-600 to-slate-700" }
};

const WEEKLY_EVENTS_CONFIG = [
    { dayIdx: 1, dayName: "MONDAY", title: "Squat Monday", tag: "Legs", exKey: "squats", stages: [10, 25, 50, 100], unit: "REPS" },
    { dayIdx: 2, dayName: "TUESDAY", title: "Burpee Tuesday", tag: "Hard", exKey: "burpees", stages: [3, 5, 10, 20], unit: "REPS" },
    { dayIdx: 3, dayName: "WEDNESDAY", title: "Core Wednesday", tag: "Core", exKey: "bicycle_crunches", stages: [15, 30, 45, 60], unit: "REPS" },
    { dayIdx: 4, dayName: "THURSDAY", title: "Plank Thursday", tag: "Endurance", exKey: "plank", stages: [15, 30, 45, 90], unit: "SECONDS" },
    { dayIdx: 5, dayName: "FRIDAY", title: "Push-Up Friday", tag: "Upper body", exKey: "push_ups", stages: [10, 25, 50, 100], unit: "REPS" }
];

const LEVEL_XP_TABLE = [
    { lvl: 0, xp: 0 },
    { lvl: 1, xp: 100 },
    { lvl: 2, xp: 250 },
    { lvl: 3, xp: 500 },
    { lvl: 4, xp: 1000 },
    { lvl: 5, xp: 2000 },
    { lvl: 6, xp: 3750 },
    { lvl: 7, xp: 5000 },
    { lvl: 8, xp: 8875 },
    { lvl: 9, xp: 12500 },
    { lvl: 10, xp: 20000 }
];

// 10 NO-COPYRIGHT MUSIC TRACKS FROM PIXABAY
const NO_COPYRIGHT_PLAYLIST = [
    { title: "Power Fitness Synth", artist: "TimMoor (Pixabay)", url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a7315b.mp3?filename=synthwave-110023.mp3" },
    { title: "Energetic Beat", artist: "TimMoor (Pixabay)", url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=cyberpunk-2099-10701.mp3" },
    { title: "Heavy Gym Bass", artist: "AlexiAction (Pixabay)", url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=energetic-hip-hop-8303.mp3" },
    { title: "Action Workout Rock", artist: "RedSmitty (Pixabay)", url: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939bc99c1.mp3?filename=action-sport-123456.mp3" },
    { title: "Phonk Gym Motivation", artist: "AlexiAction (Pixabay)", url: "https://cdn.pixabay.com/download/audio/2023/04/18/audio_658bf4653e.mp3?filename=phonk-style-146608.mp3" },
    { title: "Cyberpunk Gym Drive", artist: "Prabesh (Pixabay)", url: "https://cdn.pixabay.com/download/audio/2022/11/06/audio_c2957b8fb9.mp3?filename=cyberpunk-game-beat-126292.mp3" },
    { title: "Aggressive Bassline", artist: "TimMoor (Pixabay)", url: "https://cdn.pixabay.com/download/audio/2022/08/02/audio_884b2c151b.mp3?filename=sport-electro-115264.mp3" },
    { title: "Techno Gym Energy", artist: "Julien_Matthias (Pixabay)", url: "https://cdn.pixabay.com/download/audio/2023/01/01/audio_166b1a99d9.mp3?filename=techno-energy-132338.mp3" },
    { title: "Hard Trap Workout", artist: "PrazKhanal (Pixabay)", url: "https://cdn.pixabay.com/download/audio/2022/06/15/audio_2448ca32e9.mp3?filename=sport-trap-113540.mp3" },
    { title: "Stamina Runner Beats", artist: "QubeSounds (Pixabay)", url: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_c2306f8c44.mp3?filename=running-motivation-112345.mp3" }
];

/* Calculate exact MET / Custom / Dumbbell Calories */
function calculateKcal(exKey, value, massKg, heightCm, dbMass = 10) {
    const ex = EXERCISES_DATABASE[exKey];
    if (!ex) return 0;
    const validDbMass = parseFloat(dbMass) || 10;

    // 1. Dumbbell Physics Formula
    if (ex.isDumbbell) {
        return calculateDumbbellKcal(ex.dbKey, heightCm, massKg, validDbMass, value);
    }

    // 2. High Knees
    if (ex.customFormula === "high_knees") {
        return (7.5 * 3.5 * massKg * value * 0.5) / 12000;
    }

    // 3. Bicycle Crunches
    if (ex.customFormula === "bicycle_crunches") {
        return (3.8 * 3.5 * massKg * value) / 12000;
    }

    // 4. Plank
    if (exKey === "plank") {
        const durationMinutes = (value * (ex.plankMultiplier || 3)) / 60;
        return (ex.met * 3.5 * massKg * durationMinutes) / 200;
    }

    // 5. Standard MET
    if (ex.type === "seconds") {
        return (ex.met * 3.5 * massKg * (value / 60)) / 200;
    } else {
        const durationMinutes = (value * ex.secondsPerRep) / 60;
        return (ex.met * 3.5 * massKg * durationMinutes) / 200;
    }
}

/* Calculate required reps/seconds to hit target Kcal */
function calculateTargetUnitsForKcal(exKey, targetKcal, massKg, dbMass = 10) {
    const ex = EXERCISES_DATABASE[exKey];
    if (!ex) return 10;

    if (ex.isDumbbell) {
        // Safe check for dumbbell exercises
        const singleRepKcal = calculateDumbbellKcal(ex.dbKey, state.height, massKg, dbMass, 1);
        if (singleRepKcal <= 0) return 15;
        return Math.max(1, Math.ceil(targetKcal / singleRepKcal));
    }

    if (ex.type === "seconds") {
        const requiredMinutes = (targetKcal * 200) / (ex.met * 3.5 * massKg);
        return Math.max(5, Math.round(requiredMinutes * 60));
    } else {
        const requiredMinutes = (targetKcal * 200) / (ex.met * 3.5 * massKg);
        const totalSeconds = requiredMinutes * 60;
        return Math.max(1, Math.round(totalSeconds / ex.secondsPerRep));
    }
}

/* ==================== 2. STATE MANAGEMENT ==================== */
let state = {
    mass: 70,
    height: 175,
    restTime: 15,
    theme: "multicolor",
    style: "round",
    points: 0,
    totalKcal: 0,
    totalWorkouts: 0,
    totalTimeSeconds: 0,
    exerciseStats: {},
    history: [],
    questsResetTime: Date.now() + 7 * 24 * 60 * 60 * 1000,
    completedQuests: {},
    savedRoutines: [
        { id: "preset_1", name: "Leg Day (100 Squats)", routine: [{ key: "squats", value: 100 }, { key: "lunges", value: 30 }] }
    ],
    completedEventStages: {}
};

let selectedRoutine = [];
let activeExecution = null;
let currentTrackIdx = 0;
let selectedQuestTemp = null;
let pendingDumbbellKey = null;

/* Load & Save LocalStorage */
function loadState() {
    const saved = localStorage.getItem("opengym_state_v3");
    if (saved) {
        try {
            state = { ...state, ...JSON.parse(saved) };
        } catch(e) { console.error("Error loading state", e); }
    }
    if (!state.exerciseStats) state.exerciseStats = {};
    if (Date.now() > state.questsResetTime) {
        state.completedQuests = {};
        state.questsResetTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
    }
    saveState();
}

function saveState() {
    localStorage.setItem("opengym_state_v3", JSON.stringify(state));
    updateUI();
}

/* ==================== 3. UI RENDER ENGINE ==================== */
function updateUI() {
    // Level computation
    let currentLvl = 0;
    for (let i = LEVEL_XP_TABLE.length - 1; i >= 0; i--) {
        if (state.points >= LEVEL_XP_TABLE[i].xp) {
            currentLvl = LEVEL_XP_TABLE[i].lvl;
            break;
        }
    }

    document.getElementById("userLevelNum").innerText = currentLvl;
    document.getElementById("profileLvl").innerText = currentLvl;
    document.getElementById("profileXP").innerText = state.points;
    
    // Profile Total Kcal Counter
    if (document.getElementById("profileTotalKcal")) {
        document.getElementById("profileTotalKcal").innerText = (state.totalKcal || 0).toFixed(1) + " kcal";
    }

    // Profile XP Bar
    const nextLvlObj = LEVEL_XP_TABLE[Math.min(currentLvl + 1, LEVEL_XP_TABLE.length - 1)];
    const currLvlObj = LEVEL_XP_TABLE[currentLvl];
    const minXp = currLvlObj.xp;
    const maxXp = nextLvlObj.xp;
    const progressPct = maxXp > minXp ? Math.min(100, Math.max(0, ((state.points - minXp) / (maxXp - minXp)) * 100)) : 100;

    document.getElementById("profileXPBar").style.width = progressPct + "%";
    document.getElementById("currentLevelMin").innerText = minXp + " XP";
    document.getElementById("nextLevelMax").innerText = maxXp + " XP";

    // Stats
    document.getElementById("statTotalKcal").innerText = (state.totalKcal || 0).toFixed(1);
    document.getElementById("statTotalWorkouts").innerText = state.totalWorkouts || 0;
    document.getElementById("statTotalTime").innerText = Math.round((state.totalTimeSeconds || 0) / 60) + "m";

    const bmi = (state.mass / Math.pow(state.height / 100, 2)).toFixed(1);
    document.getElementById("statBMI").innerText = isNaN(bmi) ? "N/A" : bmi;

    // Inputs
    document.getElementById("settingMass").value = state.mass;
    document.getElementById("settingHeight").value = state.height;
    document.getElementById("settingRestTime").value = state.restTime;
    document.getElementById("settingTheme").value = state.theme;
    document.getElementById("settingStyle").value = state.style;

    renderExercisesGrid();
    renderRoutineQueue();
    renderSavedRoutines();
    renderWeeklyEvents();
    renderHistoryLog();
    renderXPTable();
    renderQuests();
    renderDetailedProfileStats();
    applyGUITheme();
    applyGUIStyle();
}

function renderExercisesGrid() {
    const grid = document.getElementById("exerciseGrid");
    grid.innerHTML = "";
    Object.keys(EXERCISES_DATABASE).forEach(key => {
        const ex = EXERCISES_DATABASE[key];
        const card = document.createElement("div");
        card.className = `card-ui bg-gradient-to-br ${ex.color} p-3 rounded-2xl text-white cursor-pointer shadow-md hover:scale-105 transition-all flex flex-col justify-between min-h-[112px]`;
        card.onclick = () => handleExerciseSelect(key);
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <i class="fa-solid ${ex.icon} text-xl opacity-90"></i>
                <span class="text-[9px] font-black uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-full">${ex.category}</span>
            </div>
            <div class="mt-2">
                <h4 class="font-bold text-xs leading-tight">${ex.name}</h4>
                ${ex.desc ? `<p class="text-[10px] opacity-80 leading-snug mt-1">${ex.desc}</p>` : ''}
                <span class="text-[10px] opacity-75 font-medium block mt-1">${ex.isDumbbell ? 'Weight Input Needed' : 'Click to Add'}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

function handleExerciseSelect(key) {
    const ex = EXERCISES_DATABASE[key];
    if (ex.isDumbbell) {
        pendingDumbbellKey = key;
        openModal("dumbbellModal");
    } else {
        addToRoutine(key);
    }
}

function confirmDumbbellAddition() {
    if (!pendingDumbbellKey) return;
    const dbMass = parseFloat(document.getElementById("modalDumbbellMass").value) || 10;
    addToRoutine(pendingDumbbellKey, 15, dbMass);
    closeModal("dumbbellModal");
    pendingDumbbellKey = null;
}

function renderRoutineQueue() {
    const container = document.getElementById("routineList");
    const countBadge = document.getElementById("routineCountBadge");
    const startBtn = document.getElementById("startWorkoutBtn");

    countBadge.innerText = `${selectedRoutine.length} exercises selected`;

    if (selectedRoutine.length === 0) {
        container.innerHTML = `<div class="text-center py-8 text-slate-400 text-sm italic">No exercises added yet. Click an exercise above to build your workout!</div>`;
        startBtn.disabled = true;
        return;
    }

    startBtn.disabled = false;
    container.innerHTML = "";

    selectedRoutine.forEach((item, idx) => {
        const ex = EXERCISES_DATABASE[item.key];
        const dbMassVal = parseFloat(item.dbMass) || 10;
        const estKcal = calculateKcal(item.key, item.value, state.mass, state.height, dbMassVal).toFixed(1);
        
        const row = document.createElement("div");
        row.className = "flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-[var(--border-color)]";
        row.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="fa-solid ${ex.icon} text-blue-500 text-lg w-5 text-center"></i>
                <div>
                    <h5 class="font-bold text-xs text-slate-800 dark:text-slate-100">${ex.name} ${ex.isDumbbell ? `(${dbMassVal}kg dumbbell)` : ''}</h5>
                    <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">${estKcal} kcal est.</span>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <input type="number" min="1" value="${item.value}" onchange="updateRoutineVal(${idx}, this.value)" class="w-16 p-1 text-center font-extrabold text-xs bg-white dark:bg-slate-700 border border-[var(--border-color)] rounded-lg">
                <span class="text-xs text-slate-400 font-bold">${ex.type === "seconds" ? "sec" : "reps"}</span>
                <button onclick="removeFromRoutine(${idx})" class="p-1 text-rose-500 hover:text-rose-700 ml-1">
                    <i class="fa-solid fa-trash-can text-xs"></i>
                </button>
            </div>
        `;
        container.appendChild(row);
    });
}

function addToRoutine(exKey, value = null, dbMass = 10) {
    const ex = EXERCISES_DATABASE[exKey];
    const defaultVal = value !== null ? value : (ex.type === "seconds" ? 30 : 15);
    selectedRoutine.push({ key: exKey, value: defaultVal, dbMass: parseFloat(dbMass) || 10 });
    renderRoutineQueue();
}

function removeFromRoutine(idx) {
    selectedRoutine.splice(idx, 1);
    renderRoutineQueue();
}

function updateRoutineVal(idx, val) {
    selectedRoutine[idx].value = Math.max(1, parseInt(val) || 1);
    renderRoutineQueue();
}

function clearRoutine() {
    selectedRoutine = [];
    renderRoutineQueue();
}

/* CUSTOM SAVED ROUTINES LOGIC */
function renderSavedRoutines() {
    const container = document.getElementById("savedRoutinesList");
    container.innerHTML = "";

    if (!state.savedRoutines || state.savedRoutines.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400 italic col-span-2">No custom saved routines yet. Build a queue above and click "Save Routine"!</p>`;
        return;
    }

    state.savedRoutines.forEach((preset, idx) => {
        const card = document.createElement("div");
        card.className = "p-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-[var(--border-color)] flex items-center justify-between";
        card.innerHTML = `
            <div>
                <h4 class="font-bold text-xs text-slate-800 dark:text-slate-100">${preset.name}</h4>
                <span class="text-[10px] text-slate-400">${preset.routine.length} exercise(s)</span>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="loadSavedRoutine(${idx})" class="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm">
                    Load
                </button>
                <button onclick="deleteSavedRoutine(${idx})" class="text-rose-500 hover:text-rose-700 p-1">
                    <i class="fa-solid fa-trash text-xs"></i>
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function confirmSaveCustomRoutine() {
    if (selectedRoutine.length === 0) {
        alert("Add at least 1 exercise to the queue before saving!");
        return;
    }
    const nameInput = document.getElementById("customRoutineNameInput").value.trim();
    if (!nameInput) return;

    if (!state.savedRoutines) state.savedRoutines = [];
    state.savedRoutines.push({
        id: "preset_" + Date.now(),
        name: nameInput,
        routine: [...selectedRoutine]
    });

    document.getElementById("customRoutineNameInput").value = "";
    closeModal("saveRoutineModal");
    saveState();
}

function loadSavedRoutine(idx) {
    const preset = state.savedRoutines[idx];
    if (preset) {
        selectedRoutine = JSON.parse(JSON.stringify(preset.routine));
        renderRoutineQueue();
        switchTab('workout');
    }
}

function deleteSavedRoutine(idx) {
    state.savedRoutines.splice(idx, 1);
    saveState();
}

/* ==================== 4. WEEKLY EVENTS SYSTEM ==================== */
function renderWeeklyEvents() {
    const container = document.getElementById("eventsListContainer");
    container.innerHTML = "";

    const currentDayIdx = new Date().getDay();

    WEEKLY_EVENTS_CONFIG.forEach(evt => {
        const isToday = currentDayIdx === evt.dayIdx;
        const ex = EXERCISES_DATABASE[evt.exKey];

        const card = document.createElement("div");
        card.className = `p-4 rounded-2xl border ${isToday ? 'bg-emerald-500/10 border-emerald-500 shadow-md' : 'bg-slate-50 dark:bg-slate-800/30 border-[var(--border-color)] opacity-70'} space-y-3`;

        let stagesHTML = evt.stages.map(stageVal => {
            const stageKey = `evt_${evt.dayName}_${stageVal}`;
            const isDone = state.completedEventStages && state.completedEventStages[stageKey];
            
            if (isToday) {
                return `
                    <button onclick="runEventStage('${evt.exKey}', ${stageVal}, '${stageKey}', '${evt.title}')" class="px-3 py-1.5 rounded-xl border text-xs font-black transition-transform active:scale-95 flex items-center gap-1 ${isDone ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'bg-white dark:bg-slate-800 border-[var(--border-color)] text-slate-700 dark:text-slate-200'}">
                        <span>${stageVal}</span>
                        ${isDone ? '<i class="fa-solid fa-check text-[10px]"></i>' : ''}
                    </button>
                `;
            } else {
                return `
                    <button disabled class="px-3 py-1.5 rounded-xl border text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700 cursor-not-allowed flex items-center gap-1">
                        <i class="fa-solid fa-lock text-[10px]"></i>
                        <span>${stageVal}</span>
                    </button>
                `;
            }
        }).join('<span class="text-slate-400 font-bold">→</span>');

        card.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <span class="font-extrabold text-xs text-slate-500 uppercase">${evt.dayName}</span>
                    <span class="text-slate-400">—</span>
                    <span class="font-black text-sm text-slate-800 dark:text-slate-100">${evt.title}</span>
                    ${isToday ? '<span class="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">TODAY ACTIVE</span>' : '<span class="bg-slate-200 dark:bg-slate-700 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase"><i class="fa-solid fa-lock mr-1"></i>LOCKED</span>'}
                </div>
                <span class="text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${evt.tag === 'Legs' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : evt.tag === 'Hard' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'}">${evt.tag}</span>
            </div>

            <div class="flex items-center gap-2 overflow-x-auto py-1">
                ${stagesHTML}
            </div>

            <div class="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">
                ${ex ? ex.name.toUpperCase() : ''} • ${evt.unit}
            </div>
        `;
        container.appendChild(card);
    });
}

function runEventStage(exKey, val, stageKey, eventTitle) {
    selectedRoutine = [{ key: exKey, value: val, isEvent: true, eventStageKey: stageKey, eventTitle: eventTitle }];
    startRoutineExecution();
}

/* ==================== 5. 100s SPEED BLITZ ==================== */
let blitzTimerInterval = null;
let blitzSelectedExKey = null;

function open100sBlitzModal() {
    const select = document.getElementById("blitzExerciseSelect");
    select.innerHTML = "";
    Object.keys(EXERCISES_DATABASE).forEach(k => {
        const ex = EXERCISES_DATABASE[k];
        if (ex.type === "reps") {
            select.innerHTML += `<option value="${k}">${ex.name} (${ex.category})</option>`;
        }
    });

    document.getElementById("blitzSetupView").classList.remove("hidden");
    document.getElementById("blitzTimerView").classList.add("hidden");
    document.getElementById("blitzInputView").classList.add("hidden");

    openModal("blitzModal");
}

function start100sTimer() {
    blitzSelectedExKey = document.getElementById("blitzExerciseSelect").value;
    document.getElementById("blitzSetupView").classList.add("hidden");
    document.getElementById("blitzTimerView").classList.remove("hidden");

    let timeLeft = 100;
    document.getElementById("blitzCountdown").innerText = timeLeft;

    blitzTimerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("blitzCountdown").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(blitzTimerInterval);
            document.getElementById("blitzTimerView").classList.add("hidden");
            document.getElementById("blitzInputView").classList.remove("hidden");
        }
    }, 1000);
}

function submit100sResult() {
    const reps = parseInt(document.getElementById("blitzRepsInput").value) || 0;
    if (reps < 0) return;

    const kcal = calculateKcal(blitzSelectedExKey, reps, state.mass, state.height);
    const xp = Math.max(10, reps);

    state.totalKcal += kcal;
    state.totalWorkouts += 1;
    state.totalTimeSeconds += 100;
    state.points += xp;

    if (!state.exerciseStats[blitzSelectedExKey]) state.exerciseStats[blitzSelectedExKey] = 0;
    state.exerciseStats[blitzSelectedExKey] += reps;

    state.history.push({
        title: `100s Blitz: ${EXERCISES_DATABASE[blitzSelectedExKey].name}`,
        timestamp: Date.now(),
        duration: 2,
        kcal: kcal,
        points: xp
    });

    saveState();
    closeModal("blitzModal");
    alert(`Blitz Completed! 🎉\nReps: ${reps}\nBurned: ${kcal.toFixed(1)} kcal\nXP Earned: +${xp}`);
}

function renderHistoryLog() {
    const container = document.getElementById("historyList");
    if (state.history.length === 0) {
        container.innerHTML = `<p class="text-center py-6 text-slate-400 text-sm">No workout history logged yet.</p>`;
        return;
    }

    container.innerHTML = "";
    state.history.slice().reverse().forEach(entry => {
        const item = document.createElement("div");
        item.className = "flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-[var(--border-color)] text-xs";
        item.innerHTML = `
            <div>
                <span class="font-bold text-slate-800 dark:text-slate-200 block">${entry.title}</span>
                <span class="text-[10px] text-slate-400">${new Date(entry.timestamp).toLocaleDateString()} • ${entry.duration} min</span>
            </div>
            <div class="text-right">
                <span class="font-black text-emerald-600 dark:text-emerald-400 block">+${entry.kcal.toFixed(1)} kcal</span>
                <span class="text-[10px] text-amber-500 font-bold">+${entry.points} XP</span>
            </div>
        `;
        container.appendChild(item);
    });
}

function renderXPTable() {
    const container = document.getElementById("xpTableGrid");
    container.innerHTML = "";
    LEVEL_XP_TABLE.forEach(item => {
        const isReached = state.points >= item.xp;
        const cell = document.createElement("div");
        cell.className = `p-2 rounded-xl border text-center font-bold ${isReached ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400' : 'border-[var(--border-color)] text-slate-400'}`;
        cell.innerHTML = `
            <span class="block text-[10px] uppercase">Lvl ${item.lvl}</span>
            <span class="text-xs">${item.xp} XP</span>
        `;
        container.appendChild(cell);
    });
}

/* DETAILED PROFILES STATS ACCORDION */
function toggleProfileStatsAccordion() {
    const content = document.getElementById("statsAccordionContent");
    const icon = document.getElementById("statsAccordionIcon");
    if (content.classList.contains("hidden")) {
        content.classList.remove("hidden");
        icon.style.transform = "rotate(180deg)";
    } else {
        content.classList.add("hidden");
        icon.style.transform = "rotate(0deg)";
    }
}

function renderDetailedProfileStats() {
    const container = document.getElementById("detailedStatsList");
    if (!container) return;

    container.innerHTML = "";
    let hasAnyStats = false;

    Object.keys(EXERCISES_DATABASE).forEach(k => {
        const ex = EXERCISES_DATABASE[k];
        const val = state.exerciseStats[k] || 0;

        if (val > 0) hasAnyStats = true;

        let formattedVal = "";
        if (ex.isDumbbell) {
            formattedVal = `${(val / 1000).toFixed(3)} t podniesione`;
        } else if (k === "plank") {
            formattedVal = `${val} sekund deski`;
        } else {
            formattedVal = `${val} powtórzeń`;
        }

        const item = document.createElement("div");
        item.className = "flex justify-between items-center p-2 rounded-lg bg-white dark:bg-slate-800/80 border border-[var(--border-color)]";
        item.innerHTML = `
            <span class="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <i class="fa-solid ${ex.icon} text-blue-500 text-xs"></i> ${ex.name}
            </span>
            <span class="font-mono font-bold text-blue-600 dark:text-blue-400">${formattedVal}</span>
        `;
        container.appendChild(item);
    });

    if (!hasAnyStats) {
        container.innerHTML = `<p class="text-slate-400 text-center py-2 italic">Brak ukończonych ćwiczeń w historii.</p>`;
    }
}

/* ==================== 6. QUESTS SYSTEM (MANDATORY DUMBBELL MASS FIX FOR ALL QUESTS) ==================== */
function renderQuests() {
    const container = document.getElementById("questsList");
    container.innerHTML = "";

    const quests = [
        { id: "quest_10", title: "10 Kcal Quick Burn", type: "kcal", kcalTarget: 10, reward: 20, count: 1 },
        { id: "quest_50", title: "50 Kcal Endurance", type: "kcal", kcalTarget: 50, reward: 100, count: 4 },
        { id: "quest_100", title: "100 Kcal Beast Challenge", type: "kcal", kcalTarget: 100, reward: 200, count: 4 },
        
        // SHOULDER PRESS WEIGHT CHALLENGES
        { id: "quest_sp_100kg", title: "Shoulder Press 100kg Heavy Challenge", type: "weight_sp", targetKg: 100, cardStyle: "gradient-card-purple" },
        { id: "quest_sp_500kg", title: "Shoulder Press 500kg Power Challenge", type: "weight_sp", targetKg: 500, cardStyle: "gradient-card-orange" },
        { id: "quest_sp_1t", title: "Shoulder Press 1 Ton Titan Quest", type: "weight_sp", targetKg: 1000, cardStyle: "gradient-card-green" },
        { id: "quest_sp_5t", title: "Shoulder Press 5 Ton Challenge", type: "weight_sp", targetKg: 5000, fixedXP: 500, cardStyle: "gradient-card-dark-sweaty" }
    ];

    quests.forEach(q => {
        const isCompleted = state.completedQuests[q.id];
        const card = document.createElement("div");
        
        if (q.type === "kcal") {
            card.className = `card-ui bg-[var(--card-bg)] border border-[var(--border-color)] p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 ${isCompleted ? 'opacity-60' : ''}`;
            card.innerHTML = `
                <div class="space-y-2">
                    <div class="flex justify-between items-start">
                        <span class="text-xs font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-full">+${q.reward} XP</span>
                        <i class="fa-solid ${isCompleted ? 'fa-circle-check text-emerald-500' : 'fa-scroll text-amber-500'} text-xl"></i>
                    </div>
                    <h3 class="font-extrabold text-base text-slate-800 dark:text-slate-100">${q.title}</h3>
                    <p class="text-xs text-slate-500">Burn a total of ${q.kcalTarget} kcal using ${q.count} assigned exercise(s).</p>
                </div>

                <button onclick="openQuestDetails('${q.id}', ${q.kcalTarget}, ${q.reward}, ${q.count})" ${isCompleted ? 'disabled' : ''} class="w-full py-3 rounded-xl font-bold text-xs transition-all ${isCompleted ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md shadow-orange-500/20'}">
                    ${isCompleted ? 'COMPLETED THIS WEEK' : 'VIEW QUEST'}
                </button>
            `;
        } else if (q.type === "weight_sp") {
            const totalTarget = q.targetKg;
            const calculatedPoints = q.fixedXP !== undefined ? q.fixedXP : Math.round(totalTarget / 15);
            const is5t = totalTarget === 5000;
            
            card.className = `${q.cardStyle} p-5 rounded-2xl flex flex-col justify-between space-y-4 ${isCompleted ? 'opacity-60' : ''}`;
            card.innerHTML = `
                <div class="space-y-2">
                    <div class="flex justify-between items-start">
                        <span class="text-xs font-black uppercase tracking-wider ${is5t ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/50' : 'bg-white/20 text-white'} px-2.5 py-1 rounded-full">+${calculatedPoints} XP</span>
                        <i class="fa-solid ${isCompleted ? 'fa-circle-check text-emerald-400' : (is5t ? 'fa-fire-flame-curved text-blue-400 animate-pulse' : 'fa-dumbbell text-white')} text-xl"></i>
                    </div>
                    <h3 class="font-extrabold text-base text-white">${q.title}</h3>
                    <p class="text-xs text-white/80">Lift a cumulative ${totalTarget >= 1000 ? (totalTarget/1000)+'t' : totalTarget+'kg'} using Dumbbell Shoulder Press (1 rep = 1x dumbbell mass).</p>
                </div>

                <button onclick="openSpQuestDetails('${q.id}', ${totalTarget}, ${calculatedPoints})" ${isCompleted ? 'disabled' : ''} class="w-full py-3 rounded-xl font-bold text-xs transition-all ${isCompleted ? 'bg-white/20 text-white/50 cursor-not-allowed' : 'bg-white text-slate-900 hover:bg-slate-100 shadow-md'}">
                    ${isCompleted ? 'COMPLETED THIS WEEK' : 'CONFIGURE & VIEW QUEST'}
                </button>
            `;
        }
        container.appendChild(card);
    });
}

function openSpQuestDetails(questId, targetKg, rewardXP) {
    selectedQuestTemp = {
        questId,
        reward: rewardXP,
        targetKg: targetKg,
        isSpWeightQuest: true,
        dbMass: 0,
        routine: []
    };

    const modalBody = document.getElementById("questModalBody");
    modalBody.innerHTML = `
        <div class="text-center space-y-1">
            <h4 class="font-extrabold text-xl text-slate-800 dark:text-slate-100">${targetKg >= 1000 ? (targetKg/1000)+' Ton' : targetKg+' kg'} Shoulder Press Challenge</h4>
            <p class="text-xs text-amber-600 dark:text-amber-400 font-bold">+${rewardXP} XP Reward</p>
        </div>
        <div class="space-y-3 border-t border-b border-[var(--border-color)] py-3">
            <div class="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200 dark:border-amber-800/50 space-y-2">
                <label class="text-xs font-bold text-amber-800 dark:text-amber-300 block flex items-center gap-1.5">
                    <i class="fa-solid fa-circle-exclamation text-amber-500"></i> Wpisz wagę 1 hantla (Wymagane):
                </label>
                <div class="flex items-center gap-2">
                    <input type="number" id="spQuestDbMassInput" placeholder="np. 10" min="1" oninput="recalcSpQuestReps(${targetKg})" class="w-full bg-white dark:bg-slate-700 border border-[var(--border-color)] rounded-lg p-2 font-black text-sm text-slate-800 dark:text-white">
                    <span class="text-xs text-slate-400 font-bold shrink-0">kg</span>
                </div>
            </div>
            <div class="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl text-xs font-bold">
                <span class="flex items-center gap-2"><i class="fa-solid fa-child-reaching text-amber-500"></i> Required Reps:</span>
                <span class="text-blue-600 dark:text-blue-400 font-mono text-sm" id="spQuestRepsDisplay">Wpisz wagę hantla!</span>
            </div>
        </div>
    `;

    updateAcceptButtonState(false);
    openModal("questModal");
}

function recalcSpQuestReps(targetKg) {
    const inputVal = parseFloat(document.getElementById("spQuestDbMassInput").value);
    const display = document.getElementById("spQuestRepsDisplay");

    if (!inputVal || inputVal <= 0) {
        display.innerText = "Wpisz wagę hantla!";
        if (selectedQuestTemp) {
            selectedQuestTemp.dbMass = 0;
            selectedQuestTemp.routine = [];
        }
        updateAcceptButtonState(false);
        return;
    }

    const reps = Math.ceil(targetKg / inputVal);
    display.innerText = `${reps} reps (${inputVal}kg / rep)`;

    if (selectedQuestTemp) {
        selectedQuestTemp.dbMass = inputVal;
        selectedQuestTemp.routine = [{ key: "shoulder_press", value: reps, dbMass: inputVal, questId: selectedQuestTemp.questId, reward: selectedQuestTemp.reward }];
    }
    updateAcceptButtonState(true);
}

function openQuestDetails(questId, targetKcal, reward, count) {
    const exKeys = Object.keys(EXERCISES_DATABASE);
    const selectedKeys = [];
    
    for (let i = 0; i < count; i++) {
        const randKey = exKeys[Math.floor(Math.random() * exKeys.length)];
        selectedKeys.push(randKey);
    }

    const hasDumbbell = selectedKeys.some(k => EXERCISES_DATABASE[k].isDumbbell);

    selectedQuestTemp = { 
        questId, 
        reward, 
        targetKcal,
        count,
        selectedKeys,
        hasDumbbell,
        dbMass: hasDumbbell ? 0 : 10,
        routine: []
    };

    renderKcalQuestModalBody();
    openModal("questModal");
}

function renderKcalQuestModalBody() {
    if (!selectedQuestTemp) return;

    const modalBody = document.getElementById("questModalBody");
    const { targetKcal, reward, count, selectedKeys, hasDumbbell, dbMass } = selectedQuestTemp;

    let dbInputHTML = "";
    if (hasDumbbell) {
        dbInputHTML = `
            <div class="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200 dark:border-amber-800/50 space-y-2">
                <label class="text-xs font-bold text-amber-800 dark:text-amber-300 block flex items-center gap-1.5">
                    <i class="fa-solid fa-circle-exclamation text-amber-500"></i> Wyłosowano ćwiczenia z hantlami! Wpisz wagę 1 hantla:
                </label>
                <div class="flex items-center gap-2">
                    <input type="number" id="kcalQuestDbMassInput" placeholder="np. 10" min="1" value="${dbMass || ''}" oninput="updateKcalQuestDbMass()" class="w-full bg-white dark:bg-slate-700 border border-[var(--border-color)] rounded-lg p-2 font-black text-sm text-slate-800 dark:text-white">
                    <span class="text-xs text-slate-400 font-bold shrink-0">kg</span>
                </div>
            </div>
        `;
    }

    const isReady = !hasDumbbell || (dbMass && dbMass > 0);

    let tasksHTML = "";
    if (isReady) {
        const kcalPerEx = targetKcal / count;
        const validDbMass = hasDumbbell ? dbMass : 10;
        
        selectedQuestTemp.routine = selectedKeys.map(k => {
            const units = calculateTargetUnitsForKcal(k, kcalPerEx, state.mass, validDbMass);
            return { key: k, value: units, dbMass: validDbMass, questId: selectedQuestTemp.questId, reward };
        });

        tasksHTML = selectedQuestTemp.routine.map(item => {
            const ex = EXERCISES_DATABASE[item.key];
            return `
                <div class="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl text-xs font-bold">
                    <span class="flex items-center gap-2"><i class="fa-solid ${ex.icon} text-blue-500"></i> ${ex.name} ${ex.isDumbbell ? `(${validDbMass}kg)` : ''}</span>
                    <span class="text-blue-600 dark:text-blue-400 font-mono">${item.value} ${ex.type === 'seconds' ? 'sec' : 'reps'}</span>
                </div>
            `;
        }).join('');
    } else {
        selectedQuestTemp.routine = [];
        tasksHTML = `<p class="text-center py-3 text-amber-600 dark:text-amber-400 font-bold text-xs">Wpisz wagę hantla powyżej, aby wyliczyć powtórzenia!</p>`;
    }

    modalBody.innerHTML = `
        <div class="text-center space-y-1">
            <h4 class="font-extrabold text-xl text-slate-800 dark:text-slate-100">${targetKcal} Kcal Quest</h4>
            <p class="text-xs text-amber-600 dark:text-amber-400 font-bold">+${reward} XP Reward upon completion</p>
        </div>
        <div class="space-y-3 border-t border-b border-[var(--border-color)] py-3">
            ${dbInputHTML}
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Generated Required Tasks:</span>
            ${tasksHTML}
        </div>
    `;

    updateAcceptButtonState(isReady);
}

function updateKcalQuestDbMass() {
    const inputVal = parseFloat(document.getElementById("kcalQuestDbMassInput").value);
    if (selectedQuestTemp) {
        selectedQuestTemp.dbMass = inputVal && inputVal > 0 ? inputVal : 0;
        renderKcalQuestModalBody();
    }
}

function updateAcceptButtonState(isEnabled) {
    const btn = document.getElementById("acceptQuestBtn");
    if (btn) {
        btn.disabled = !isEnabled;
    }
}

function acceptSelectedQuest() {
    if (!selectedQuestTemp) return;

    if (selectedQuestTemp.hasDumbbell && (!selectedQuestTemp.dbMass || selectedQuestTemp.dbMass <= 0)) {
        alert("Wpisz prawidłową wagę hantli przed rozpoczęciem questa!");
        return;
    }

    if (selectedQuestTemp.isSpWeightQuest && (!selectedQuestTemp.dbMass || selectedQuestTemp.dbMass <= 0)) {
        alert("Wpisz prawidłową wagę hantli przed rozpoczęciem wyzwania!");
        return;
    }

    closeModal("questModal");
    selectedRoutine = selectedQuestTemp.routine;
    activeExecutionQuestId = selectedQuestTemp.questId;
    activeExecutionQuestReward = selectedQuestTemp.reward;
    startRoutineExecution();
}

let activeExecutionQuestId = null;
let activeExecutionQuestReward = 0;

/* ==================== 7. EXECUTION ENGINE ==================== */
let execInterval = null;
let execStartTime = 0;
let execElapsedSeconds = 0;
let execCurrentIndex = 0;
let execIsRest = false;
let execRestSecondsLeft = 0;

function startRoutineExecution() {
    if (selectedRoutine.length === 0) return;

    execCurrentIndex = 0;
    execElapsedSeconds = 0;
    execIsRest = false;

    document.getElementById("executionOverlay").classList.remove("hidden");
    
    execStartTime = Date.now();
    execInterval = setInterval(updateExecLoop, 1000);

    loadExecStep();
}

function updateExecLoop() {
    execElapsedSeconds++;
    const mins = String(Math.floor(execElapsedSeconds / 60)).padStart(2, '0');
    const secs = String(execElapsedSeconds % 60).padStart(2, '0');
    document.getElementById("execTimer").innerText = `${mins}:${secs}`;

    let totalKcalSoFar = 0;
    for (let i = 0; i < execCurrentIndex; i++) {
        const item = selectedRoutine[i];
        let kcal = calculateKcal(item.key, item.value, state.mass, state.height, item.dbMass || 10);
        totalKcalSoFar += kcal;
    }
    document.getElementById("execKcal").innerText = totalKcalSoFar.toFixed(1);

    if (execIsRest) {
        execRestSecondsLeft--;
        document.getElementById("execMainValue").innerText = execRestSecondsLeft;
        if (execRestSecondsLeft <= 0) {
            execIsRest = false;
            execCurrentIndex++;
            loadExecStep();
        }
    }
}

function loadExecStep() {
    if (execCurrentIndex >= selectedRoutine.length) {
        finishWorkoutExecution();
        return;
    }

    const step = selectedRoutine[execCurrentIndex];
    const ex = EXERCISES_DATABASE[step.key];

    document.getElementById("execMainValue").innerText = step.value;
    document.getElementById("execMainUnit").innerText = ex.type === "seconds" ? "seconds hold" : "reps target";
    document.getElementById("execExName").innerText = ex.name + (step.isEvent ? " (Event Stage)" : "");
    document.getElementById("execExIcon").className = `fa-solid ${ex.icon} text-3xl text-blue-500 mt-2`;

    const prevEx = execCurrentIndex > 0 ? EXERCISES_DATABASE[selectedRoutine[execCurrentIndex - 1].key].name : "None";
    const nextEx = execCurrentIndex < selectedRoutine.length - 1 ? EXERCISES_DATABASE[selectedRoutine[execCurrentIndex + 1].key].name : "Finish";
    
    document.getElementById("execPrevEx").innerText = prevEx;
    document.getElementById("execNextEx").innerText = nextEx;

    document.getElementById("execDoneBtn").innerText = "COMPLETE STEP";
    document.getElementById("execDoneBtn").className = "w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-500/30 text-lg transition-transform active:scale-95";
}

function nextExerciseStep() {
    if (execIsRest) {
        execIsRest = false;
        execCurrentIndex++;
        loadExecStep();
        return;
    }

    if (execCurrentIndex < selectedRoutine.length - 1 && state.restTime > 0) {
        execIsRest = true;
        execRestSecondsLeft = parseInt(state.restTime) || 15;
        document.getElementById("execMainValue").innerText = execRestSecondsLeft;
        document.getElementById("execMainUnit").innerText = "REST & RECOVER";
        document.getElementById("execExName").innerText = "Next: " + EXERCISES_DATABASE[selectedRoutine[execCurrentIndex + 1].key].name;
        document.getElementById("execDoneBtn").innerText = "SKIP REST";
        document.getElementById("execDoneBtn").className = "w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg text-lg";
    } else {
        execCurrentIndex++;
        loadExecStep();
    }
}

function finishWorkoutExecution() {
    clearInterval(execInterval);
    document.getElementById("executionOverlay").classList.add("hidden");

    let workoutKcal = 0;
    let gainedXP = 0;

    selectedRoutine.forEach(item => {
        let kcal = calculateKcal(item.key, item.value, state.mass, state.height, item.dbMass || 10);
        const ex = EXERCISES_DATABASE[item.key];

        if (!state.exerciseStats[item.key]) state.exerciseStats[item.key] = 0;

        if (ex.isDumbbell) {
            state.exerciseStats[item.key] += item.value * (item.dbMass || 10);
        } else {
            state.exerciseStats[item.key] += item.value;
        }
        
        if (item.isEvent) {
            if (item.key === "plank") {
                gainedXP += Math.round(item.value * 0.5);
            } else {
                gainedXP += item.value;
            }
            if (item.eventStageKey) {
                if (!state.completedEventStages) state.completedEventStages = {};
                state.completedEventStages[item.eventStageKey] = true;
            }
        } else if (!activeExecutionQuestId) {
            gainedXP += Math.max(1, Math.round(kcal));
        }

        workoutKcal += kcal;
    });

    if (activeExecutionQuestId) {
        gainedXP = activeExecutionQuestReward;
    }

    state.totalKcal += workoutKcal;
    state.totalWorkouts += 1;
    state.totalTimeSeconds += execElapsedSeconds;
    state.points += gainedXP;

    if (activeExecutionQuestId) {
        state.completedQuests[activeExecutionQuestId] = true;
    }

    state.history.push({
        title: selectedRoutine[0]?.isEvent ? `Event Completed: ${selectedRoutine[0].eventTitle}` : (activeExecutionQuestId ? `Quest Completed (+${activeExecutionQuestReward} XP)` : `Routine Workout (${selectedRoutine.length} exercises)`),
        timestamp: Date.now(),
        duration: Math.max(1, Math.round(execElapsedSeconds / 60)),
        kcal: workoutKcal,
        points: gainedXP
    });

    activeExecutionQuestId = null;
    selectedRoutine = [];
    saveState();

    alert(`Workout Finished! 🎉\n\nBurned: ${workoutKcal.toFixed(1)} kcal\nEarned: +${gainedXP} XP`);
}

function quitWorkoutExecution() {
    if (confirm("Are you sure you want to quit this workout session? Progress won't be logged.")) {
        clearInterval(execInterval);
        document.getElementById("executionOverlay").classList.add("hidden");
        activeExecutionQuestId = null;
    }
}

/* ==================== 8. MUSIC PLAYER ==================== */
const bgAudio = document.getElementById("bgAudio");

function loadTrack(idx) {
    currentTrackIdx = idx;
    const track = NO_COPYRIGHT_PLAYLIST[idx];
    bgAudio.src = track.url;
    document.getElementById("trackTitle").innerText = track.title;
    document.getElementById("trackAuthor").innerText = `Author: ${track.artist}`;
}

function toggleAudio() {
    if (!bgAudio.src) loadTrack(0);
    
    if (bgAudio.paused) {
        bgAudio.play().then(() => {
            document.getElementById("playAudioIcon").className = "fa-solid fa-pause text-sm ml-0.5";
        }).catch(e => console.log("Audio playback error", e));
    } else {
        bgAudio.pause();
        document.getElementById("playAudioIcon").className = "fa-solid fa-play text-sm ml-0.5";
    }
}

function nextTrack() {
    currentTrackIdx = (currentTrackIdx + 1) % NO_COPYRIGHT_PLAYLIST.length;
    loadTrack(currentTrackIdx);
    bgAudio.play();
    document.getElementById("playAudioIcon").className = "fa-solid fa-pause text-sm ml-0.5";
}

function prevTrack() {
    currentTrackIdx = (currentTrackIdx - 1 + NO_COPYRIGHT_PLAYLIST.length) % NO_COPYRIGHT_PLAYLIST.length;
    loadTrack(currentTrackIdx);
    bgAudio.play();
    document.getElementById("playAudioIcon").className = "fa-solid fa-pause text-sm ml-0.5";
}

/* ==================== 9. GUI NAVIGATION & THEMES ==================== */
function switchTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
    document.getElementById(tabId + "Tab").classList.remove("hidden");

    // Music Player Visibility Control: VISIBLE ONLY ON WORKOUT TAB
    const playerContainer = document.getElementById("musicPlayerContainer");
    if (playerContainer) {
        if (tabId === "workout") {
            playerContainer.classList.remove("hidden");
        } else {
            playerContainer.classList.add("hidden");
        }
    }

    ["workout", "events", "quests", "stats", "profile"].forEach(id => {
        const btn = document.getElementById("nav-" + id);
        if (btn) {
            if (id === tabId) {
                btn.className = "flex flex-col items-center gap-1 text-blue-600 font-bold text-xs transition-colors";
            } else {
                btn.className = "flex flex-col items-center gap-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium text-xs transition-colors";
            }
        }
    });
}

function applyGUITheme() {
    const theme = document.getElementById("settingTheme").value;
    state.theme = theme;
    const html = document.documentElement;

    html.classList.remove("dark", "theme-multicolor", "theme-round", "theme-oled", "theme-white");

    if (theme === "multicolor") {
        html.classList.add("theme-multicolor");
    } else if (theme === "round") {
        html.classList.add("dark", "theme-round");
    } else if (theme === "oled") {
        html.classList.add("dark", "theme-oled");
    } else if (theme === "white") {
        html.classList.add("theme-white");
    }
}

function applyGUIStyle() {
    const style = document.getElementById("settingStyle").value;
    state.style = style;
    const body = document.body;

    body.classList.remove("style-round", "style-aero", "style-metro");
    body.classList.add("style-" + style);
}

function saveSettings() {
    state.mass = parseFloat(document.getElementById("settingMass").value) || 70;
    state.height = parseFloat(document.getElementById("settingHeight").value) || 175;
    state.restTime = parseInt(document.getElementById("settingRestTime").value) || 15;
    saveState();
    closeModal("settingsModal");
}

function exportUserData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `OpenGym_Backup_${new Date().toISOString().slice(0,10)}.sav`;
    a.click();
    URL.revokeObjectURL(url);
}

function importUserData(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
        try {
            state = JSON.parse(evt.target.result);
            saveState();
            alert("Data imported successfully!");
            closeModal("settingsModal");
        } catch(err) {
            alert("Invalid .sav file format.");
        }
    };
    reader.readAsText(file);
}

function deleteUserData() {
    if (confirm("Are you sure you want to reset all app data? This cannot be undone.")) {
        localStorage.removeItem("opengym_state_v3");
        location.reload();
    }
}

function openModal(id) {
    document.getElementById(id).classList.remove("hidden");
}

function closeModal(id) {
    document.getElementById(id).classList.add("hidden");
}

/* Initializer */
window.addEventListener("DOMContentLoaded", () => {
    loadState();
    loadTrack(0);
});
