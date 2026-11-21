// One side of each muscle is drawn and mirrored around the body's midline.
const surfaces = {
    chest: 'M49 32 Q43 29 35 35 L33 43 Q38 49 48 44 Z',
    'deltoids-front': 'M36 31 Q27 30 26 44 Q30 44 34 39 Z',
    biceps: 'M28 45 Q23 49 23 62 Q29 61 31 46 Z',
    'forearms-front': 'M24 63 Q19 66 17 82 Q23 79 27 64 Z',
    abs: 'M49 47 Q45 46 43 49 L43 53 L49 52 Z M49 54 L43 55 L44 59 L49 59 Z M49 61 L44 61 L45 66 L49 67 Z M49 69 L45 68 Q45 75 49 78 Z',
    obliques: 'M35 46 L41 49 L43 70 L38 74 Q39 60 35 53 Z',
    'hip-flexors': 'M38 75 Q45 77 48 83 L46 89 Q40 81 37 80 Z',
    quads: 'M37 82 Q43 85 46 92 Q48 102 44 121 Q40 124 38 116 Q34 97 37 82 Z',
    'calves-front': 'M40 127 Q44 124 44 131 L41 156 Q38 151 39 143 Z',
    traps: 'M46 25 L48 28 L49 49 Q44 42 36 37 L34 33 Z',
    'deltoids-back': 'M35 32 Q28 30 26 42 Q31 44 35 39 Z',
    lats: 'M34 42 Q40 40 48 49 L47 65 Q40 62 36 54 Z',
    triceps: 'M27 44 Q24 46 23 61 Q28 63 31 44 Z',
    lowerback: 'M48 53 Q43 59 41 65 L39 75 Q45 75 49 80 Z',
    glutes: 'M38 78 Q43 74 48 80 Q51 84 48 91 Q43 97 36 91 Z',
    hamstrings: 'M36 94 Q40 97 47 94 Q48 106 44 122 Q39 124 38 117 Z',
    'calves-back': 'M40 126 Q46 123 45 136 Q44 145 41 154 Q35 144 38 133 Z'
};
const anterior = ['chest','deltoids-front','biceps','forearms-front','abs','obliques','hip-flexors','quads','calves-front'];
const silhouette = 'M46 24 Q46 29 36 30 Q27 29 25 39 L22 57 Q22 62 20 66 L15 82 Q11 91 14 95 Q17 96 19 88 L21 88 L21 83 Q26 73 29 63 L33 49 Q38 58 37 72 Q32 87 35 103 L38 122 Q35 134 37 145 L38 158 L34 165 Q34 168 42 166 L44 161 L46 141 L46 125 L50 98';
function atlasBody(prefix, front) {
    const paths = Object.keys(surfaces).filter(key => anterior.includes(key) === front);
    const half = '<path d="' + silhouette + ' L50 24Z"/>';
    return '<svg class="atlas-body" viewBox="9 0 82 172" role="img" aria-label="' + (front ? 'Anterior' : 'Posterior') + ' muscle map"><g fill="#c3d2de">' + half + '<g transform="translate(100) scale(-1 1)">' + half + '</g><path d="M43 12 Q42 3 50 3 Q58 3 57 13 Q56 23 50 24 Q44 23 43 12Z"/></g>' +
        paths.map(key => {
            const path = '<path d="' + surfaces[key] + '"/>';
            return '<g class="muscle-target" id="' + prefix + 'm-' + key + '"><title>' + cleanMuscleName('m-'+key) + '</title>' + path + '<g transform="translate(100) scale(-1 1)">' + path + '</g></g>';
        }).join('') + '</svg>';
}
function muscleExposure(ex, units) {
    const seconds = units * (ex.type === 'seconds' ? 1 : ex.secondsPerRep);
    const entries = [];
    for (const [role, weight] of [['primary',1],['secondary',0.5],['tertiary',0.25]]) {
        for (const id of ex.muscles[role] || []) entries.push([id, weight]);
    }
    const sum = entries.reduce((total, entry) => total + entry[1], 0);
    return entries.map(([id, weight]) => [id, seconds * weight / sum]);
}
function paintAtlas(scope, prefix, scores) {
    const peak = Math.max(0, ...Object.values(scores));
    document.querySelectorAll(scope + ' .muscle-target').forEach(el => {
        const id = el.id.slice(prefix.length);
        const value = scores[id] || 0;
        const t = peak ? Math.sqrt(value / peak) : 0;
        el.style.fill = value ? 'hsl(345 72% ' + (94 - 56*t) + '%)' : '#dfebef';
        el.querySelector('title').textContent = cleanMuscleName(id) + (value ? ' · ' + Math.round(100*value/peak) + '% of highest modeled load' : ' · No modeled load');
    });
}
document.querySelectorAll('[data-atlas]').forEach(slot => {
    slot.innerHTML = atlasBody(slot.closest('#statsTab') ? 'stats-' : '', slot.dataset.atlas === 'front');
});
