/* ==================== 1. CONSTANTS & MET FORMULAS ==================== */

function calculateDumbbellKcal(exercise, heightCm, bodyMass, dumbbellMass, reps) {
    const g = 9.81;
    const efficiency = 0.20;
    const correction = 2;
    const height = heightCm / 100;
    const dbMass = parseFloat(dumbbellMass) || 10;

    const config = {
        dumbbellSquats: { mass: bodyMass * 0.9 + dbMass, distance: height * 0.15 },
        bicepCurls: { mass: dbMass, distance: height * 0.25 },
        shoulderPress: { mass: dbMass, distance: height * 0.35 }
    };

    const e = config[exercise];
    if (!e || reps < 0) return 0;
    const work = e.mass * g * e.distance;
    const res = (work * reps * correction) / (efficiency * 4184);
    return isNaN(res) ? 0 : res;
}

const EXERCISES_DATABASE = {
    "squats": { 
        name: "Squats", category: "Strength", met: 3.8, secondsPerRep: 3, type: "reps", icon: "fa-person-dots-from-line", color: "from-blue-500 to-indigo-600",
        muscles: { primary: ["m-quads", "m-glutes"], secondary: ["m-hamstrings", "m-calves-back"], tertiary: ["m-abs", "m-lowerback"] }
    },
    "push_ups": { 
        name: "Push-ups", category: "Strength", met: 3.8, secondsPerRep: 3, type: "reps", icon: "fa-dumbbell", color: "from-indigo-500 to-purple-600",
        muscles: { primary: ["m-chest", "m-triceps"], secondary: ["m-deltoids-front"], tertiary: ["m-abs"] }
    },
    "sit_ups": { 
        name: "Sit-ups", category: "Strength", met: 3.8, secondsPerRep: 3, type: "reps", icon: "fa-user-ninja", color: "from-purple-500 to-pink-600",
        muscles: { primary: ["m-abs"], secondary: ["m-obliques"], tertiary: ["m-quads"] }
    },
    "lunges": { 
        name: "Lunges", category: "Strength", met: 3.8, secondsPerRep: 3, type: "reps", icon: "fa-person-walking", color: "from-pink-500 to-rose-600",
        muscles: { primary: ["m-quads", "m-glutes"], secondary: ["m-hamstrings"], tertiary: ["m-calves-back"] }
    },
    "burpees": { 
        name: "Burpees", category: "Cardio", met: 7.5, secondsPerRep: 6, type: "reps", icon: "fa-person-running", color: "from-amber-500 to-red-600",
        muscles: { primary: ["m-quads", "m-chest"], secondary: ["m-deltoids-front", "m-triceps"], tertiary: ["m-abs", "m-calves-front"] }
    },
    "jumping_jacks": { 
        name: "Jumping Jacks", category: "Cardio", met: 7.5, secondsPerRep: 1, type: "reps", icon: "fa-child-reaching", color: "from-orange-500 to-amber-600",
        muscles: { primary: ["m-calves-back", "m-deltoids-front"], secondary: ["m-deltoids-back", "m-quads"], tertiary: ["m-abs"] }
    },
    "skipping_rope": { 
        name: "Skipping Rope", category: "Cardio", met: 11.0, secondsPerRep: 0.5, type: "reps", icon: "fa-bolt", color: "from-yellow-500 to-emerald-600",
        muscles: { primary: ["m-calves-back"], secondary: ["m-forearms-front", "m-quads"], tertiary: ["m-abs"] }
    },
    "mountain_climbers": { 
        name: "Mountain Climbers", category: "Cardio", met: 8.0, secondsPerRep: 1, type: "reps", icon: "fa-person-hiking", color: "from-emerald-500 to-teal-600",
        muscles: { primary: ["m-abs"], secondary: ["m-deltoids-front", "m-quads"], tertiary: ["m-triceps"] }
    },
    "forward_bends": { 
        name: "Forward Bends", category: "Flexibility", met: 2.3, secondsPerRep: 3, type: "reps", icon: "fa-person", color: "from-teal-500 to-cyan-600",
        muscles: { primary: ["m-hamstrings"], secondary: ["m-lowerback"], tertiary: ["m-calves-back"] }
    },
    "plank": { 
        name: "Plank", category: "Isometric", met: 2.8, secondsPerRep: 1, type: "seconds", icon: "fa-stopwatch", color: "from-cyan-500 to-blue-600",
        muscles: { primary: ["m-abs", "m-obliques"], secondary: ["m-deltoids-front", "m-quads"], tertiary: ["m-lowerback"] }
    },
    "high_knees": { 
        name: "High Knees", category: "Cardio", met: 7.5, secondsPerRep: 1, type: "reps", icon: "fa-person-running", color: "from-lime-500 to-green-600",
        muscles: { primary: ["m-quads", "m-abs"], secondary: ["m-calves-back"], tertiary: ["m-glutes"] }
    },
    "bicycle_crunches": { 
        name: "Bicycle Crunches", category: "Core", met: 3.8, secondsPerRep: 2, type: "reps", icon: "fa-child", color: "from-emerald-500 to-teal-600",
        muscles: { primary: ["m-obliques", "m-abs"], secondary: ["m-quads"], tertiary: ["m-hip-flexors"] }
    },
    "dumbbell_squats": { 
        name: "Dumbbell Squats", desc: "Squats holding dumbbells at sides or chest.", category: "Legs", type: "reps", secondsPerRep: 3, isDumbbell: true, dbKey: "dumbbellSquats", icon: "fa-dumbbell", color: "from-blue-600 to-slate-700",
        muscles: { primary: ["m-quads", "m-glutes"], secondary: ["m-hamstrings", "m-forearms-front"], tertiary: ["m-lowerback", "m-traps"] }
    },
    "bicep_curls": { 
        name: "Bicep Curls", desc: "Arm curls with dumbbells.", category: "Arms", type: "reps", secondsPerRep: 3, isDumbbell: true, dbKey: "bicepCurls", icon: "fa-hand-fist", color: "from-purple-600 to-slate-700",
        muscles: { primary: ["m-biceps"], secondary: ["m-forearms-front"], tertiary: ["m-deltoids-front"] }
    },
    "shoulder_press": { 
        name: "Shoulder Press", desc: "Overhead press with dumbbells.", category: "Shoulders", type: "reps", secondsPerRep: 3, isDumbbell: true, dbKey: "shoulderPress", icon: "fa-child-reaching", color: "from-amber-600 to-slate-700",
        muscles: { primary: ["m-deltoids-front", "m-deltoids-back"], secondary: ["m-triceps", "m-traps"], tertiary: ["m-abs"] }
    }
};

Object.assign(EXERCISES_DATABASE, {
    chair_stand: { name: "Chair Stand", category: "Strength", type: "reps", secondsPerRep: 3, met: 3, icon: "fa-person", color: "from-teal-500 to-blue-600",
        muscles: {primary: ['m-quads', 'm-glutes'], secondary: ['m-hamstrings'], tertiary: ['m-abs']} },
    calf_raise: { name: "Standing Calf Raise", category: "Strength", type: "reps", secondsPerRep: 3, met: 3, icon: "fa-person", color: "from-teal-500 to-blue-600",
        muscles: {primary: ['m-calves-back'], secondary: [], tertiary: ['m-abs']} },
    wall_press: { name: "Wall Push-up", category: "Strength", type: "reps", secondsPerRep: 3, met: 3, icon: "fa-person", color: "from-teal-500 to-blue-600",
        muscles: {primary: ['m-chest', 'm-triceps'], secondary: ['m-deltoids-front'], tertiary: ['m-abs']} },
    side_lift: { name: "Standing Side Leg Lift", category: "Strength", type: "reps", secondsPerRep: 3, met: 3, icon: "fa-person", color: "from-teal-500 to-blue-600",
        muscles: {primary: ['m-glutes'], secondary: ['m-obliques'], tertiary: ['m-quads']} },
});

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

const NO_COPYRIGHT_PLAYLIST = [
    {title: "Night Circuit · 120 BPM", artist: "OpenGym", url: "audio/night-circuit.mp3"},
    {title: "Slow Burn · Soft Rock · 100 BPM", artist: "OpenGym", url: "audio/slow-burn.mp3"},
    {title: "Last Tram · Jazz · 116 BPM", artist: "OpenGym", url: "audio/last-tram.mp3"},
    {title: "Window Seat · Lo-fi · 74 BPM", artist: "OpenGym", url: "audio/window-seat.mp3"},
];

function calculateKcal(exKey, value, massKg, heightCm, dbMass = 10) {
    const ex = EXERCISES_DATABASE[exKey];
    if (!ex || !Number.isFinite(Number(value)) || value <= 0 || !(massKg > 0)) return 0;
    if (ex.isDumbbell) return calculateDumbbellKcal(ex.dbKey, heightCm, massKg, dbMass, value);
    const seconds = value * (ex.type === "seconds" ? 1 : ex.secondsPerRep);
    return ex.met * 3.5 * massKg * seconds / 12000;
}

function calculateTargetUnitsForKcal(exKey, targetKcal, massKg, dbMass = 10) {
    const unit = calculateKcal(exKey, 1, massKg, state.height, dbMass);
    return unit > 0 ? Math.max(1, Math.ceil(targetKcal / unit)) : 0;
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
    dailyGoals: [
        { id: "goal_kcal_default", type: "kcal", target: 300 }
    ],
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
let linearChartInstance = null;
let activeMuscleTimeframe = "today";

function loadState() {
    const saved = localStorage.getItem("opengym_state_v5");
    if (saved) {
        try {
            state = { ...state, ...JSON.parse(saved) };
        } catch(e) { console.error("Error loading state", e); }
    }
    if (!state.exerciseStats) state.exerciseStats = {};
    if (!state.dailyGoals) state.dailyGoals = [{ id: "goal_kcal_default", type: "kcal", target: 300 }];
    syncWeek();
    saveState();
}

function saveState() {
    localStorage.setItem("opengym_state_v5", JSON.stringify(state));
    updateUI();
}

/* ==================== 3. UI RENDER ENGINE ==================== */
function updateUI() {
    syncWeek();
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
    
    if (document.getElementById("profileTotalKcal")) {
        document.getElementById("profileTotalKcal").innerText = (state.totalKcal || 0).toFixed(1) + " kcal";
    }

    const nextLvlObj = LEVEL_XP_TABLE[Math.min(currentLvl + 1, LEVEL_XP_TABLE.length - 1)];
    const currLvlObj = LEVEL_XP_TABLE[currentLvl];
    const minXp = currLvlObj.xp;
    const maxXp = nextLvlObj.xp;
    const progressPct = maxXp > minXp ? Math.min(100, Math.max(0, ((state.points - minXp) / (maxXp - minXp)) * 100)) : 100;

    const ring = document.getElementById('rank-ring');
    ring.style.setProperty('--progress', progressPct + '%');
    ring.style.setProperty('--rank-color', ['#569da1','#158a83','#3874bf','#8255b2'][Math.min(3,Math.floor(currentLvl/3))]);
    document.getElementById('rank-mark').textContent = String(currentLvl).padStart(2,'0');
    document.getElementById('rank-distance').textContent = maxXp === minXp ? 'Highest level reached' : (maxXp-state.points).toLocaleString() + ' XP to level ' + nextLvlObj.lvl;
    document.getElementById("profileXPBar").style.width = progressPct + "%";
    document.getElementById("currentLevelMin").innerText = minXp + " XP";
    document.getElementById("nextLevelMax").innerText = maxXp + " XP";

    document.getElementById("statTotalKcal").innerText = (state.totalKcal || 0).toFixed(1);
    document.getElementById("statTotalWorkouts").innerText = state.totalWorkouts || 0;
    document.getElementById("statTotalTime").innerText = Math.round((state.totalTimeSeconds || 0) / 60) + "m";

    const bmi = (state.mass / Math.pow(state.height / 100, 2)).toFixed(1);
    document.getElementById("statBMI").innerText = isNaN(bmi) ? "N/A" : bmi;

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
    renderWeeklyGoals();
    renderDetailedProfileStats();
    renderDailyGoals();
    populateChartMetrics();
    renderTimeframeMuscleHeatmap();
    applyGUITheme();
    applyGUIStyle();
}

function renderExercisesGrid() {
    const grid = document.getElementById("exerciseGrid");
    grid.innerHTML = "";
    Object.keys(EXERCISES_DATABASE).forEach(key => {
        const ex = EXERCISES_DATABASE[key];
        const card = document.createElement("div");
        card.className = `card-ui bg-gradient-to-br ${ex.color} p-3 rounded-2xl text-white shadow-md hover:scale-105 transition-all flex flex-col justify-between min-h-[115px] relative group`;
        
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <i class="fa-solid ${ex.icon} text-xl opacity-90"></i>
                <div class="flex items-center gap-1.5">
                    <button onclick="event.stopPropagation(); openExerciseInfoModal('${key}')" class="w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center text-xs font-serif font-black shadow-sm transition-transform active:scale-90" title="Exercise Burn Info & Muscle Anatomy">
                        i
                    </button>
                    <span class="text-[9px] font-black uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-full">${ex.category}</span>
                </div>
            </div>
            <div class="mt-2 cursor-pointer" onclick="handleExerciseSelect('${key}')">
                <h4 class="font-bold text-xs leading-tight">${ex.name}</h4>
                ${ex.desc ? `<p class="text-[10px] opacity-80 leading-snug mt-1">${ex.desc}</p>` : ''}
                <span class="text-[10px] opacity-75 font-medium block mt-1">${ex.isDumbbell ? 'Dumbbell Weight Needed' : 'Click to add'}</span>
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
                <input type="number" min="1" value="${item.value}" onchange="updateRoutineVal(${idx}, this.value)" class="w-16 p-1 text-center font-extrabold text-xs bg-white dark:bg-slate-700 border border-[var(--border-color)] rounded-lg text-slate-800 dark:text-white">
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

/* ==================== 4. ANATOMICAL HEATMAP & EXERCISE INFO MODAL ==================== */
function openExerciseInfoModal(exKey) {
    const ex = EXERCISES_DATABASE[exKey];
    if (!ex) return;

    document.getElementById("infoModalTitle").innerText = ex.name;
    document.getElementById("infoModalCategory").innerText = ex.category.toUpperCase();
    document.getElementById("infoModalIconBadge").className = `w-10 h-10 rounded-xl bg-gradient-to-tr ${ex.color} text-white flex items-center justify-center text-lg`;
    document.getElementById("infoModalIconBadge").innerHTML = `<i class="fa-solid ${ex.icon}"></i>`;

    const kcalPerRep = calculateKcal(exKey, 1, state.mass, state.height, 10);
    const kcalPerMin = ex.type === "seconds" 
        ? calculateKcal(exKey, 60, state.mass, state.height, 10) 
        : calculateKcal(exKey, Math.round(60 / ex.secondsPerRep), state.mass, state.height, 10);

    document.getElementById("infoMetVal").innerText = ex.isDumbbell ? `Physics (${ex.dbKey})` : ex.met;
    document.getElementById("infoKcalPerRep").innerText = ex.type === "seconds" ? `${calculateKcal(exKey, 1, state.mass, state.height, 10).toFixed(3)} kcal/s` : `${kcalPerRep.toFixed(2)} kcal`;
    document.getElementById("infoKcalPerMin").innerText = `${kcalPerMin.toFixed(2)} kcal`;

    document.getElementById("infoFormulaDesc").innerText = ex.isDumbbell 
        ? `Physics mechanical work formula W = m * g * h (20% efficiency) using your mass (${state.mass}kg) and height (${state.height}cm).`
        : `Estimated MET value (${ex.met}) personalized for your body mass (${state.mass}kg).`;

    paintAtlas('#exerciseInfoModal', '', Object.fromEntries(muscleExposure(ex, 1)));
    document.getElementById('infoMuscleList').textContent = Object.entries(ex.muscles)
        .filter(([, ids]) => ids.length)
        .map(([role, ids]) => role + ' · ' + ids.map(cleanMuscleName).join(', ')).join('  /  ');
    startDemo(exKey);
    openModal("exerciseInfoModal");
}

function cleanMuscleName(mId) {
    const map = {
        "m-chest": "Pectorals (Chest)", "m-deltoids-front": "Front Deltoids", "m-biceps": "Biceps",
        "m-forearms-front": "Forearms", "m-abs": "Rectus Abdominis", "m-obliques": "Obliques",
        "m-quads": "Quadriceps", "m-calves-front": "Shin / Front Calves", "m-traps": "Trapezius",
        "m-deltoids-back": "Rear Deltoids", "m-lats": "Latissimus Dorsi", "m-triceps": "Triceps",
        "m-lowerback": "Erector Spinae", "m-glutes": "Glutes", "m-hamstrings": "Hamstrings",
        "m-calves-back": "Gastrocnemius (Calves)"
    };
    return map[mId] || mId.replace("m-", "");
}

/* ==================== 5. TIMEFRAME MUSCLE HEATMAP ENGINE (AVERAGES OVER SUMS) ==================== */
function setMuscleTimeframe(tf) {
    activeMuscleTimeframe = tf;
    ["today", "yesterday", "7days", "28days", "alltime"].forEach(t => {
        const btn = document.getElementById("tf-" + t);
        if (btn) {
            if (t === tf) {
                btn.className = "tf-btn px-2.5 py-1 text-xs font-bold rounded-lg transition-all bg-white dark:bg-slate-700 text-blue-600 shadow-sm";
            } else {
                btn.className = "tf-btn px-2.5 py-1 text-xs font-bold rounded-lg transition-all text-slate-500";
            }
        }
    });
    renderTimeframeMuscleHeatmap();
}

function renderTimeframeMuscleHeatmap() {
    const muscleScores = {};
    const now = new Date();
    
    let filteredLogs = [];
    if (activeMuscleTimeframe === "today") {
        const todayStr = now.toLocaleDateString();
        filteredLogs = state.history.filter(h => new Date(h.timestamp).toLocaleDateString() === todayStr);
    } else if (activeMuscleTimeframe === "yesterday") {
        const y = new Date();
        y.setDate(now.getDate() - 1);
        const yStr = y.toLocaleDateString();
        filteredLogs = state.history.filter(h => new Date(h.timestamp).toLocaleDateString() === yStr);
    } else if (activeMuscleTimeframe === "7days") {
        const cutoff = Date.now() - (7 * 24 * 60 * 60 * 1000);
        filteredLogs = state.history.filter(h => h.timestamp >= cutoff);
    } else if (activeMuscleTimeframe === "28days") {
        const cutoff = Date.now() - (28 * 24 * 60 * 60 * 1000);
        filteredLogs = state.history.filter(h => h.timestamp >= cutoff);
    } else if (activeMuscleTimeframe === "alltime") {
        filteredLogs = state.history;
    }

    for (const log of filteredLogs) {
        for (const [key, units] of Object.entries(log.exStats || {})) {
            const ex = EXERCISES_DATABASE[key];
            if (!ex || !Number.isFinite(Number(units)) || units <= 0) continue;
            for (const [id, seconds] of muscleExposure(ex, units)) {
                muscleScores[id] = (muscleScores[id] || 0) + seconds;
            }
        }
    }
    paintAtlas('#statsTab', 'stats-', muscleScores);
    const top = Object.entries(muscleScores).sort((a,b) => b[1] - a[1]).slice(0,3);
    document.getElementById('atlas-summary').textContent = top.length ?
        top.map(([id, value]) => cleanMuscleName(id) + ' · ' + Math.round(value) + ' weighted s').join('  /  ') :
        'No logged exercise for this period.';

}

/* ==================== 6. GOALS & LINEAR CHART SYSTEM ==================== */
function getTodayKcalBurned() {
    const todayStr = new Date().toLocaleDateString();
    return state.history
        .filter(h => new Date(h.timestamp).toLocaleDateString() === todayStr)
        .reduce((sum, h) => sum + (h.kcal || 0), 0);
}

function getTodayExerciseReps(exKey) {
    const todayStr = new Date().toLocaleDateString();
    return state.history
        .filter(h => new Date(h.timestamp).toLocaleDateString() === todayStr && h.exStats && h.exStats[exKey])
        .reduce((sum, h) => sum + (h.exStats[exKey] || 0), 0);
}

function renderDailyGoals() {
    const container = document.getElementById("dailyGoalsContainer");
    if (!container) return;
    container.innerHTML = "";

    const todayKcal = getTodayKcalBurned();

    state.dailyGoals.forEach((goal, idx) => {
        let currentVal = 0;
        let title = "";
        let unit = "";
        let icon = "fa-bullseye";
        let colorClass = "from-rose-500 to-pink-600";

        if (goal.type === "kcal") {
            currentVal = todayKcal;
            title = "Daily Kcal Target";
            unit = "kcal";
            icon = "fa-fire";
            colorClass = "from-amber-500 to-orange-600";
        } else if (goal.type === "exercise") {
            const ex = EXERCISES_DATABASE[goal.exKey];
            if (!ex) return;
            currentVal = getTodayExerciseReps(goal.exKey);
            title = `Target: ${ex.name}`;
            unit = ex.type === "seconds" ? "sec" : "reps";
            icon = ex.icon;
            colorClass = ex.color;
        }

        const pct = Math.min(100, Math.round((currentVal / goal.target) * 100));

        const card = document.createElement("div");
        card.className = "card-ui bg-[var(--card-bg)] border border-[var(--border-color)] p-4 rounded-2xl shadow-sm space-y-3 relative overflow-hidden";
        card.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-tr ${colorClass} text-white flex items-center justify-center text-lg shadow-sm">
                        <i class="fa-solid ${icon}"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-sm text-slate-800 dark:text-slate-100">${title}</h4>
                        <span class="text-xs text-slate-400 font-semibold">${currentVal.toFixed(1)} / ${goal.target} ${unit}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-xs font-black px-2.5 py-1 rounded-full ${pct >= 100 ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}">${pct}%</span>
                    ${goal.id !== 'goal_kcal_default' ? `<button onclick="deleteGoal(${idx})" class="text-slate-400 hover:text-rose-500 p-1"><i class="fa-solid fa-trash-can text-xs"></i></button>` : ''}
                </div>
            </div>
            <div class="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r ${colorClass} h-full transition-all duration-500" style="width: ${pct}%"></div>
            </div>
        `;
        container.appendChild(card);
    });
}

function toggleGoalTypeInputs() {
    const type = document.getElementById("goalTypeInput").value;
    const exWrapper = document.getElementById("goalExSelectWrapper");
    const label = document.getElementById("goalTargetValueLabel");

    if (type === "kcal") {
        exWrapper.classList.add("hidden");
        label.innerText = "Target Value (Kcal)";
    } else {
        exWrapper.classList.remove("hidden");
        label.innerText = "Target Value (Reps / Seconds)";
    }
}

function saveNewGoal() {
    const type = document.getElementById("goalTypeInput").value;
    const targetVal = parseFloat(document.getElementById("goalTargetVal").value);
    if (!targetVal || targetVal <= 0) return;

    if (type === "kcal") {
        const existing = state.dailyGoals.find(g => g.type === "kcal");
        if (existing) {
            existing.target = targetVal;
        } else {
            state.dailyGoals.push({ id: "goal_" + Date.now(), type: "kcal", target: targetVal });
        }
    } else {
        const exKey = document.getElementById("goalExerciseKey").value;
        state.dailyGoals.push({ id: "goal_" + Date.now(), type: "exercise", exKey: exKey, target: targetVal });
    }

    closeModal("setGoalModal");
    saveState();
}

function deleteGoal(idx) {
    state.dailyGoals.splice(idx, 1);
    saveState();
}

function populateChartMetrics() {
    const select = document.getElementById("chartMetricSelect");
    const goalExSelect = document.getElementById("goalExerciseKey");
    if (!select) return;

    const existingMetricVal = select.value;
    select.innerHTML = `
        <option value="kcal">Total Kcal Burned</option>
        <option value="workout_count">Workout Count</option>
    `;

    if (goalExSelect) goalExSelect.innerHTML = "";

    Object.keys(EXERCISES_DATABASE).forEach(k => {
        const ex = EXERCISES_DATABASE[k];
        select.innerHTML += `<option value="ex_${k}">${ex.name} (${ex.type === 'seconds' ? 'seconds' : 'reps'})</option>`;
        if (goalExSelect) {
            goalExSelect.innerHTML += `<option value="${k}">${ex.name}</option>`;
        }
    });

    if (existingMetricVal) select.value = existingMetricVal;
}

function updateLinearChart() {
    if (typeof Chart === "undefined") return;
    const ctx = document.getElementById("progressLinearChart");
    if (!ctx) return;

    const metric = document.getElementById("chartMetricSelect").value;
    const daysRange = parseInt(document.getElementById("chartRangeSelect").value) || 30;

    const labels = [];
    const dataValues = [];

    for (let i = daysRange - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toLocaleDateString();
        labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

        const dayLogs = state.history.filter(h => new Date(h.timestamp).toLocaleDateString() === dateStr);

        if (metric === "kcal") {
            const totalVal = dayLogs.reduce((sum, h) => sum + (h.kcal || 0), 0);
            dataValues.push(parseFloat(totalVal.toFixed(1)));
        } else if (metric === "workout_count") {
            dataValues.push(dayLogs.length);
        } else if (metric.startsWith("ex_")) {
            const exKey = metric.replace("ex_", "");
            const totalExVal = dayLogs.reduce((sum, h) => sum + (h.exStats && h.exStats[exKey] ? h.exStats[exKey] : 0), 0);
            dataValues.push(totalExVal);
        }
    }

    if (linearChartInstance) {
        linearChartInstance.destroy();
    }

    const isDark = document.documentElement.classList.contains("dark");
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)";
    const textColor = isDark ? "#cbd5e1" : "#475569";

    linearChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: metric === "kcal" ? 'Kcal Burned' : (metric === "workout_count" ? 'Workouts' : 'Exercise Progress'),
                data: dataValues,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                borderWidth: 3,
                fill: true,
                tension: 0.3,
                pointBackgroundColor: '#2563eb',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    grid: { color: gridColor },
                    ticks: { color: textColor, font: { size: 10 } }
                },
                y: {
                    grid: { color: gridColor },
                    ticks: { color: textColor, font: { size: 10 } },
                    beginAtZero: true
                }
            }
        }
    });
}

/* ==================== 7. WEEKLY EVENTS SYSTEM ==================== */
function monday(date = new Date()) {
    const start = new Date(date);
    start.setHours(0,0,0,0);
    start.setDate(start.getDate() - (start.getDay()+6)%7);
    return start;
}
function syncWeek() {
    const start = monday();
    const next = new Date(start);
    next.setDate(next.getDate()+7);
    if (state.weekStart !== start.getTime()) {
        // Older saves used a rolling expiry. Honor unexpired guided rewards on migration.
        if (state.weekStart || !(state.questsResetTime > Date.now())) state.completedQuests = {};
        state.completedEventStages = {};
        state.weekStart = start.getTime();
    }
    state.completedQuests ||= {};
    state.questsResetTime = next.getTime();
}
const weeklyGoals = [
    {key:'attendance', title:'Show up twice', target:2, unit:'training days', xp:35},
    {key:'variety', title:'Explore the exercise library', target:4, unit:'different exercises', xp:45},
    {key:'sessions', title:'Finish three workouts', target:3, unit:'sessions', xp:55}
];
function weeklyTotals() {
    const logs = state.history.filter(h => h.timestamp >= state.weekStart && h.timestamp < state.questsResetTime &&
        Object.values(h.exStats || {}).some(v => v > 0));
    return {
        attendance:new Set(logs.map(h => new Date(h.timestamp).toDateString())).size,
        variety:new Set(logs.flatMap(h => Object.keys(h.exStats).filter(k => h.exStats[k]>0))).size,
        sessions:logs.length
    };
}
function posterArt(key) {
    return `<canvas aria-hidden="true" width="480" height="286" data-pose="${key}"></canvas>`;
}
function drawPosters(container) {
    container.querySelectorAll('[data-pose]').forEach(canvas => paintMovement(canvas,canvas.dataset.pose,1));
}
function renderWeeklyGoals() {
    const totals = weeklyTotals();
    const logs = state.history.filter(h => h.timestamp >= state.weekStart && h.timestamp < state.questsResetTime);
    const used = Object.keys(EXERCISES_DATABASE).filter(key => logs.some(h => h.exStats?.[key] > 0));
    const todayLogged = logs.some(h=>new Date(h.timestamp).toDateString()===new Date().toDateString() && Object.values(h.exStats || {}).some(v=>v>0));
    const pending = weeklyGoals.filter(g=>!state.completedQuests[g.key]);
    const priority = g => totals[g.key]>=g.target ? 2 : g.key==='attendance' && todayLogged ? -1 : totals[g.key]/g.target;
    const goal = pending.sort((a,b)=>priority(b)-priority(a))[0];
    const move = ['push_ups','squats','bicycle_crunches','plank'].find(key=>!used.includes(key)) || 'squats';
    document.getElementById('questResetTimer').textContent = new Date(state.questsResetTime).toLocaleDateString(undefined,{month:'short',day:'numeric'});
    const hero = document.getElementById('featured-mission');
    if (goal) {
        const count=Math.min(totals[goal.key],goal.target);
        const ready=count===goal.target;
        const wait=goal.key==='attendance' && todayLogged && !ready;
        const action=ready ? `<button onclick="claimWeekly('${goal.key}')">Claim ${goal.xp} XP</button>` :
            wait ? '<p>Log a workout on another day to finish.</p>' :
            `<button onclick="addToRoutine('${move}');switchTab('workout')">Add ${EXERCISES_DATABASE[move].name}</button>`;
        hero.innerHTML=`<article class="poster featured">${posterArt(move)}<div><small>${ready?'Reward ready':'Featured quest'} · <b>+${goal.xp} XP</b></small><h3>${goal.title}</h3><p>${count} of ${goal.target} ${goal.unit}</p><progress max="${goal.target}" value="${count}"></progress>${action}</div></article>`;
        drawPosters(hero);
    } else hero.innerHTML='<article class="poster featured"><div><h3>Week complete</h3><p>All three weekly bonuses claimed.</p></div></article>';
    document.getElementById('weekly-goals').innerHTML=weeklyGoals.map(g=>{
        const count=Math.min(totals[g.key],g.target);
        const details=g.key==='variety' ? (used.map(k=>EXERCISES_DATABASE[k].name).join(', ') || 'No exercises logged yet.') :
            g.key==='attendance' ? 'Each calendar day counts once.' : 'Each completed workout counts once.';
        const claim=!state.completedQuests[g.key] && count===g.target ? `<button onclick="claimWeekly('${g.key}')">Claim ${g.xp} XP</button>` : '';
        return `<article class="session-card"><details><summary><strong>${count}/${g.target}</strong> ${g.unit}</summary><p>${details}</p></details><progress value="${count}" max="${g.target}"></progress><small>${state.completedQuests[g.key]?'✓ Claimed':'+'+g.xp+' XP'}</small>${claim}</article>`;
    }).join('');
}
function claimWeekly(key) {
    syncWeek();
    const goal = weeklyGoals.find(g => g.key === key);
    if (!goal || state.completedQuests[key] || weeklyTotals()[key]<goal.target) return;
    state.completedQuests[key]=true;
    state.points+=goal.xp;
    saveState();
}
function eventKey(evt, value) {return state.weekStart + '_' + evt.dayIdx + '_' + value;}
function stageXP(evt,value) {return evt.exKey==='plank'?Math.round(value/2):value;}
let previewDay = null;
function renderWeeklyEvents() {
    const today = new Date().getDay();
    const day = previewDay || (today>=1 && today<=5 ? today : 1);
    const evt = WEEKLY_EVENTS_CONFIG.find(e=>e.dayIdx===day);
    const active = today===day;
    const container = document.getElementById('eventsListContainer');
    const buttons = evt.stages.map(value=>{
        const done=!!state.completedEventStages[eventKey(evt,value)];
        return `<button ${!active||done?'disabled':''} onclick="runEventStage(${day},${value})"><strong>${value} ${evt.unit.toLowerCase()}</strong><small>${done?'✓ Cleared':'+'+stageXP(evt,value)+' XP'}</small></button>`;
    }).join('');
    container.innerHTML=`<article class="poster featured">${posterArt(evt.exKey)}<div><small>${active?'Live today': 'Preview'} · ${evt.dayName}</small><h3>${evt.title}</h3><p>${active?'Pick a stage to begin.':'Stages open on '+evt.dayName.toLowerCase()+'.'}</p></div></article>
        <div class="stage-row event-stages">${buttons}</div><div class="day-strip" aria-label="Preview a weekday">${WEEKLY_EVENTS_CONFIG.map(e=>`<button aria-pressed="${day===e.dayIdx}" onclick="previewDay=${e.dayIdx};renderWeeklyEvents()">${e.dayName.slice(0,3)}</button>`).join('')}</div>`;
    drawPosters(container);
    document.getElementById('event-week').textContent = Object.keys(state.completedEventStages).filter(k=>k.startsWith(state.weekStart+'_')).length+' of 20 stages cleared this week';
}
function runEventStage(day, value) {
    syncWeek();
    const evt = WEEKLY_EVENTS_CONFIG.find(e=>e.dayIdx===day);
    if (!evt || day!==new Date().getDay() || !evt.stages.includes(value)) return;
    const key = eventKey(evt,value);
    if (state.completedEventStages[key]) return;
    selectedRoutine = [{key:evt.exKey,value,isEvent:true,eventStageKey:key,eventTitle:evt.title}];
    startRoutineExecution();
}

/* ==================== 8. 100s SPEED BLITZ ==================== */
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

    clearInterval(blitzTimerInterval);
    const end = Date.now()+100000;
    let timeLeft = 100;
    document.getElementById("blitzCountdown").innerText = timeLeft;

    blitzTimerInterval = setInterval(() => {
        timeLeft = Math.max(0, Math.ceil((end-Date.now())/1000));
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
    if (!blitzSelectedExKey || !Number.isSafeInteger(reps) || reps <= 0) {alert("Enter a positive repetition count.");return;}

    const kcal = calculateKcal(blitzSelectedExKey, reps, state.mass, state.height);
    const xp = Math.max(10, reps);

    state.totalKcal += kcal;
    state.totalWorkouts += 1;
    state.totalTimeSeconds += 100;
    state.points += xp;

    if (!state.exerciseStats[blitzSelectedExKey]) state.exerciseStats[blitzSelectedExKey] = 0;
    state.exerciseStats[blitzSelectedExKey] += reps;

    const exStatObj = {};
    exStatObj[blitzSelectedExKey] = reps;

    state.history.push({
        title: `100s Blitz: ${EXERCISES_DATABASE[blitzSelectedExKey].name}`,
        timestamp: Date.now(),
        duration: 2,
        kcal: kcal,
        points: xp,
        exStats: exStatObj
    });

    blitzSelectedExKey = null;
    saveState();
    closeModal("blitzModal");
    alert(`Blitz Completed! 🎉
Reps: ${reps}
Burned: ${kcal.toFixed(1)} kcal
XP Earned: +${xp}`);
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
            formattedVal = `${(val / 1000).toFixed(3)} tons lifted`;
        } else if (k === "plank") {
            formattedVal = `${val} plank seconds`;
        } else {
            formattedVal = `${val} reps`;
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
        container.innerHTML = `<p class="text-slate-400 text-center py-2 italic">No completed exercise history available.</p>`;
    }
}

/* ==================== 9. QUESTS SYSTEM ==================== */
function renderQuests() {
    const container = document.getElementById("questsList");
    container.innerHTML = "";

    const quests = [
        { id: "quest_10", title: "10 Kcal Quick Burn", type: "kcal", kcalTarget: 10, reward: 20, count: 1 },
        { id: "quest_50", title: "50 Kcal Endurance", type: "kcal", kcalTarget: 50, reward: 100, count: 4 },
        { id: "quest_100", title: "100 Kcal Beast Challenge", type: "kcal", kcalTarget: 100, reward: 200, count: 4 },
        { id: "quest_sp_100kg", title: "Shoulder Press 100kg Heavy Challenge", type: "weight_sp", targetKg: 100, cardStyle: "gradient-card-purple" },
        { id: "quest_sp_500kg", title: "Shoulder Press 500kg Power Challenge", type: "weight_sp", targetKg: 500, cardStyle: "gradient-card-orange" },
        { id: "quest_sp_1t", title: "Shoulder Press 1 Ton Titan Quest", type: "weight_sp", targetKg: 1000, cardStyle: "gradient-card-green" },
        { id: "quest_sp_5t", title: "Shoulder Press 5 Ton Challenge", type: "weight_sp", targetKg: 5000, fixedXP: 500, cardStyle: "gradient-card-dark-sweaty" }
    ];

    quests.forEach(q => {
        const done = !!state.completedQuests[q.id];
        const strength = q.type==='weight_sp';
        const reward = strength ? q.fixedXP ?? Math.round(q.targetKg/15) : q.reward;
        const move = strength ? 'shoulder_press' : missionMoves[q.id][0];
        const action = strength ? `openSpQuestDetails('${q.id}',${q.targetKg},${reward})` :
            `openQuestDetails('${q.id}',${q.kcalTarget},${reward},${q.count})`;
        const task = strength ? 'Accumulate '+q.targetKg+' kg across shoulder press reps.' :
            missionMoves[q.id].map(k=>EXERCISES_DATABASE[k].name).join(' · ');
        container.insertAdjacentHTML('beforeend',`<article class="poster mission">${posterArt(move)}<div><small><b>+${reward} XP</b></small><h4>${q.title}</h4><p>${task}</p><button ${done?'disabled':''} onclick="${action}">${done?'✓ Completed':'View mission →'}</button></div></article>`);
    });
    drawPosters(container);

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
                    <i class="fa-solid fa-circle-exclamation text-amber-500"></i> Enter 1 Dumbbell Mass (Required):
                </label>
                <div class="flex items-center gap-2">
                    <input type="number" id="spQuestDbMassInput" placeholder="e.g. 10" min="1" oninput="recalcSpQuestReps(${targetKg})" class="w-full bg-white dark:bg-slate-700 border border-[var(--border-color)] rounded-lg p-2 font-black text-sm text-slate-800 dark:text-white">
                    <span class="text-xs text-slate-400 font-bold shrink-0">kg</span>
                </div>
            </div>
            <div class="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl text-xs font-bold">
                <span class="flex items-center gap-2"><i class="fa-solid fa-child-reaching text-amber-500"></i> Required Reps:</span>
                <span class="text-blue-600 dark:text-blue-400 font-mono text-sm" id="spQuestRepsDisplay">Enter dumbbell mass!</span>
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
        display.innerText = "Enter dumbbell mass!";
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

const missionMoves = {
    quest_10:['push_ups'],
    quest_50:['bicycle_crunches','squats','wall_press','plank'],
    quest_100:['jumping_jacks','lunges','mountain_climbers','skipping_rope']
};
function openQuestDetails(questId, targetKcal, reward, count) {
    const selectedKeys = missionMoves[questId];
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
                    <i class="fa-solid fa-circle-exclamation text-amber-500"></i> Dumbbell exercise selected! Enter 1 dumbbell mass:
                </label>
                <div class="flex items-center gap-2">
                    <input type="number" id="kcalQuestDbMassInput" placeholder="e.g. 10" min="1" value="${dbMass || ''}" oninput="updateKcalQuestDbMass()" class="w-full bg-white dark:bg-slate-700 border border-[var(--border-color)] rounded-lg p-2 font-black text-sm text-slate-800 dark:text-white">
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
        tasksHTML = `<p class="text-center py-3 text-amber-600 dark:text-amber-400 font-bold text-xs">Enter dumbbell mass above to calculate target reps!</p>`;
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
    syncWeek();
    if (selectedQuestTemp && state.completedQuests[selectedQuestTemp.questId]) return;
    if (!selectedQuestTemp) return;

    if (selectedQuestTemp.hasDumbbell && (!selectedQuestTemp.dbMass || selectedQuestTemp.dbMass <= 0)) {
        alert("Enter valid dumbbell mass before starting quest!");
        return;
    }

    if (selectedQuestTemp.isSpWeightQuest && (!selectedQuestTemp.dbMass || selectedQuestTemp.dbMass <= 0)) {
        alert("Enter valid dumbbell mass before starting challenge!");
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

/* ==================== 10. EXECUTION ENGINE ==================== */
let execInterval = null;
let execStartTime = 0;
let execElapsedSeconds = 0;
let execCurrentIndex = 0;
let execIsRest = false;
let execRestSecondsLeft = 0;
let execRestEnd = 0;

function startRoutineExecution() {
    if (selectedRoutine.length === 0) return;

    execCurrentIndex = 0;
    execElapsedSeconds = 0;
    execIsRest = false;

    document.getElementById("executionOverlay").classList.remove("hidden");
    
    execStartTime = Date.now();
    updateExecLoop();
    execInterval = setInterval(updateExecLoop, 1000);

    loadExecStep();
}

function updateExecLoop() {
    execElapsedSeconds = Math.max(0, Math.floor((Date.now() - execStartTime) / 1000));
    const mins = String(Math.floor(execElapsedSeconds / 60)).padStart(2, '0');
    const secs = String(execElapsedSeconds % 60).padStart(2, '0');
    document.getElementById("execTimer").innerText = `${mins}:${secs}`;

    let totalKcalSoFar = 0;
    for (let i = 0; i < execCurrentIndex + Number(execIsRest); i++) {
        const item = selectedRoutine[i];
        let kcal = calculateKcal(item.key, item.value, state.mass, state.height, item.dbMass || 10);
        totalKcalSoFar += kcal;
    }
    document.getElementById("execKcal").innerText = totalKcalSoFar.toFixed(1);

    if (execIsRest) {
        execRestSecondsLeft = Math.max(0, Math.ceil((execRestEnd - Date.now()) / 1000));
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
        execRestEnd = Date.now() + execRestSecondsLeft * 1000;
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
    execElapsedSeconds = Math.max(0, Math.floor((Date.now() - execStartTime) / 1000));
    clearInterval(execInterval);
    document.getElementById("executionOverlay").classList.add("hidden");

    let workoutKcal = 0;
    let gainedXP = 0;
    const exStatThisSession = {};

    selectedRoutine.forEach(item => {
        let kcal = calculateKcal(item.key, item.value, state.mass, state.height, item.dbMass || 10);
        const ex = EXERCISES_DATABASE[item.key];

        if (!state.exerciseStats[item.key]) state.exerciseStats[item.key] = 0;
        if (!exStatThisSession[item.key]) exStatThisSession[item.key] = 0;

        if (ex.isDumbbell) {
            state.exerciseStats[item.key] += item.value * (item.dbMass || 10);
            exStatThisSession[item.key] += item.value;
        } else {
            state.exerciseStats[item.key] += item.value;
            exStatThisSession[item.key] += item.value;
        }
        
        if (item.isEvent && !state.completedEventStages[item.eventStageKey]) {
            if (item.key === "plank") {
                gainedXP += Math.round(item.value * 0.5);
            } else {
                gainedXP += item.value;
            }
            if (item.eventStageKey) {
                if (!state.completedEventStages) state.completedEventStages = {};
                state.completedEventStages[item.eventStageKey] = true;
            }
        } else if (!item.isEvent && !activeExecutionQuestId) {
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
        points: gainedXP,
        exStats: exStatThisSession
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

/* ==================== 11. MUSIC PLAYER ==================== */
const bgAudio = document.getElementById("bgAudio");

function loadTrack(idx) {
    currentTrackIdx = idx;
    const track = NO_COPYRIGHT_PLAYLIST[idx];
    bgAudio.src = track.url;
    document.getElementById("trackTitle").innerText = track.title;
    document.getElementById("trackAuthor").innerText = `Author: ${track.artist}`;
}

function playCurrentTrack() {
    bgAudio.play().catch(error => {
        if (error.name !== 'AbortError') document.getElementById('trackAuthor').textContent = 'Playback unavailable. Press play to retry.';
    });
}
function toggleAudio() {
    if (bgAudio.paused) playCurrentTrack();
    else bgAudio.pause();
}
function nextTrack() {
    loadTrack((currentTrackIdx + 1) % NO_COPYRIGHT_PLAYLIST.length);
    playCurrentTrack();
}
function prevTrack() {
    loadTrack((currentTrackIdx + NO_COPYRIGHT_PLAYLIST.length - 1) % NO_COPYRIGHT_PLAYLIST.length);
    playCurrentTrack();
}
bgAudio.addEventListener('ended', nextTrack);
for (const event of ['play', 'pause', 'ended', 'error']) {
    bgAudio.addEventListener(event, () => {
        document.getElementById('playAudioIcon').className = bgAudio.paused ? 'fa-solid fa-play text-sm' : 'fa-solid fa-pause text-sm';
    });
}

/* ==================== 12. GUI NAVIGATION & THEMES ==================== */
function switchTab(tabId) {
    if (tabId==="events") previewDay=null;
    if (tabId==="events" || tabId==="quests") {syncWeek(); renderWeeklyEvents(); renderWeeklyGoals(); renderQuests();}
    document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
    document.getElementById(tabId + "Tab").classList.remove("hidden");

    const playerContainer = document.getElementById("musicPlayerContainer");
    if (playerContainer) {
        if (tabId === "workout") {
            playerContainer.classList.remove("hidden");
        } else {
            playerContainer.classList.add("hidden");
        }
    }

    ["workout", "goals", "events", "quests", "stats", "profile"].forEach(id => {
        const btn = document.getElementById("nav-" + id);
        if (btn) {
            if (id === tabId) {
                btn.className = "flex flex-col items-center gap-1 text-blue-600 font-bold text-xs transition-colors";
            } else {
                btn.className = "flex flex-col items-center gap-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium text-xs transition-colors";
            }
        }
    });

    if (tabId === "goals") {
        updateLinearChart();
    }
    if (tabId === "stats") {
        renderTimeframeMuscleHeatmap();
    }
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
        localStorage.removeItem("opengym_state_v5");
        location.reload();
    }
}

function openModal(id) {
    document.getElementById(id).classList.remove("hidden");
}

function closeModal(id) {
    if (id==="blitzModal") {clearInterval(blitzTimerInterval); blitzSelectedExKey=null;}
    if (id === "exerciseInfoModal") stopDemo();
    document.getElementById(id).classList.add("hidden");
}

window.addEventListener("DOMContentLoaded", () => {
    loadState();
    loadTrack(0);
});
