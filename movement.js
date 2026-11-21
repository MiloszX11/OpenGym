// Side-view keyframes. Points: head, shoulder, hip, elbow, wrist, knee, ankle.
// Optional points at the end describe the far arm and leg independently.
const upright = [56,15,55,26,54,52,56,40,57,53,55,72,55,92];
const squat = [64,34,60,44,43,66,70,49,81,47,64,68,55,92];
const highPlank = [83,45,75,52,48,63,74,72,73,92,31,76,16,90];
const lowPush = [84,68,75,73,47,79,62,83,73,92,30,84,16,90];
const supine = [83,83,73,87,49,88,70,76,80,78,39,67,26,91];
const tucked = [83,58,74,64,52,76,71,79,72,92,65,65,43,84,71,78,72,92,32,81,16,91];
const seated = [53,32,52,43,47,68,63,48,74,48,67,68,66,92];
const guides = {
    squats: ['Bend your hips and knees together. Stand back up with your feet planted.', [upright,squat]],
    push_ups: ['Start on straight arms. Bend your elbows, lowering your chest and hips together, then press up.', [highPlank,lowPush]],
    sit_ups: ['With knees bent and feet planted, lift your torso and lower it under control.', [supine,[64,51,60,60,49,88,57,49,65,49,39,67,26,91]]],
    lunges: ['Step forward, bend both knees, then push back to standing. Switch legs.', [upright,[57,31,56,42,54,65,55,53,59,63,76,67,75,92,54,53,54,64,43,86,25,91]]],
    burpees: ['Crouch, place your hands down, extend both legs to plank, bring them in and stand tall.', [upright,tucked,highPlank,tucked,[56,8,55,19,54,45,58,9,60,1,55,63,55,82]]],
    jumping_jacks: ['Jump your feet apart as both arms rise overhead. Return to the starting stance.', [[55,16,55,28,55,54,48,40,46,52,51,73,50,92,62,40,64,52,59,73,60,92],[55,12,55,24,55,50,42,15,47,3,40,68,29,91,68,15,63,3,70,68,81,91]]],
    skipping_rope: ['Turn the rope with your wrists and make small hops as it passes below your feet.', [upright,[56,11,55,22,54,48,53,36,61,41,52,68,49,85]]],
    mountain_climbers: ['From high plank, draw one knee toward your chest. Extend it as the opposite knee comes forward.', [tucked,[83,58,74,64,52,76,71,79,72,92,32,81,16,91,71,78,72,92,65,65,43,84]]],
    forward_bends: ['Soften your knees and hinge at the hips. Return slowly to standing.', [upright,[81,54,71,51,48,55,70,65,67,78,55,73,55,92]]],
    plank: ['Place elbows under shoulders. Hold a straight line through shoulders, hips and ankles as you breathe.', [[82,59,72,66,48,76,72,91,87,91,31,83,15,91],[82,58,72,65,48,75,72,91,87,91,31,83,15,91]]],
    high_knees: ['March or run in place. Alternate lifting each knee and swinging the opposite arm.', [[55,15,55,27,54,53,66,35,71,24,71,52,71,71,46,37,47,50,54,73,53,92],[55,15,55,27,54,53,46,37,47,50,54,73,53,92,66,35,71,24,71,52,71,71]]],
    bicycle_crunches: ['Lift your shoulders. Turn one shoulder toward the opposite knee while extending the other leg, then switch.', [[78,70,70,78,49,88,63,67,76,67,58,68,38,63,79,70,77,66,31,79,13,72],[80,73,72,80,49,88,79,71,78,68,31,79,13,72,64,69,78,68,58,68,38,63]]],
    dumbbell_squats: ['Hold the weights at your sides. Sit your hips down and back, then stand.', [upright,[64,34,60,44,43,66,59,57,60,70,64,68,55,92]]],
    bicep_curls: ['Keep your upper arms beside your ribs. Curl the weights up, then lower them slowly.', [upright,[56,15,55,26,54,52,56,40,63,29,55,72,55,92]]],
    shoulder_press: ['Start with weights near shoulder height. Press overhead, then return to the starting position.', [[55,15,55,27,55,53,43,29,43,17,51,73,50,92,67,29,67,17,59,73,60,92],[55,15,55,27,55,53,48,15,49,4,51,73,50,92,62,15,61,4,59,73,60,92]]],
    chair_stand: ['Start seated on a stable chair. Lean forward, stand up, then sit back down with control.', [seated,[66,24,63,34,53,58,71,40,82,40,69,70,66,92],[66,15,65,26,65,52,73,38,80,42,66,72,66,92]]],
    calf_raise: ['Use a stable chair for balance. Rise onto the balls of your feet, pause, then lower your heels.', [[56,15,55,26,54,52,65,40,76,43,55,72,55,92],[56,10,55,21,54,47,65,37,76,43,55,67,55,87]]],
    wall_press: ['Place your hands on the wall at shoulder height. Bend your elbows to lean in, then press away.', [[71,23,66,32,54,57,78,34,90,34,46,75,39,92],[85,31,77,40,59,62,74,49,90,34,48,77,39,92]]],
    side_lift: ['Hold a stable support. Keep your trunk upright, lift one leg out to the side and lower it. Switch sides.', [[54,15,54,27,54,52,43,38,33,42,51,73,50,92,60,39,61,50,58,73,59,92],[54,15,54,27,54,52,43,38,33,42,51,73,50,92,60,39,61,50,71,64,83,77]]]
};
let demoFrame = 0;
let demoPaused = false;
let demoKey;
let demoTime = 0;
let demoLast;
function stopDemo() {
    cancelAnimationFrame(demoFrame);
    demoLast = undefined;
}
function startDemo(key) {
    stopDemo();
    demoKey = key;
    demoTime = 0;
    demoPaused = matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('demo-cue').textContent = guides[key][0];
    drawDemo(performance.now());
}
function drawDemo(now) {
    if (demoLast !== undefined && !demoPaused) demoTime += Math.min(100, now-demoLast);
    demoLast = now;
    paintMovement(document.getElementById('demo'), demoKey, demoTime / 920);
    document.getElementById('demo-control').textContent=demoPaused?'Play demo':'Pause demo';
    if(!demoPaused)demoFrame=requestAnimationFrame(drawDemo);
}
document.getElementById('demo-control').onclick=()=>{
    stopDemo();demoPaused=!demoPaused;drawDemo(performance.now());
};

function paintMovement(canvas, demoKey, phase) {
    const frames = guides[demoKey][1];
    // A three-stage chair stand returns via the forward-leaning position.
    const seq = demoKey === 'chair_stand' ? [frames[0],frames[1],frames[2],frames[1]] : frames;
    const a = seq[Math.floor(phase)%seq.length], b = seq[(Math.floor(phase)+1)%seq.length];
    const mix = (1-Math.cos(Math.PI*(phase%1)))/2;
    function full(p) {return p.length === 14 ? [...p,p[6]-2,p[7],p[8]-3,p[9],p[10]-3,p[11],p[12]-4,p[13]] : p;}
    const end = full(b);
    const v = full(a).map((value,i) => value+(end[i]-value)*mix);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(2.8,0,0,2.8,76,3);
    ctx.clearRect(-28,-2,173,104);
    function line(coords,color,width) {
        ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineJoin=ctx.lineCap='round';
        ctx.beginPath();ctx.moveTo(coords[0],coords[1]);
        for(let i=2;i<coords.length;i+=2)ctx.lineTo(coords[i],coords[i+1]);
        ctx.stroke();
    }
    const limb=(indices,color,width)=>line(indices.flatMap(i=>[v[i],v[i+1]]),color,width);
    line([1,94,115,94],'#56747b',.7);
    if(demoKey==='wall_press')line([91,14,91,94],'#88a3a8',2);
    if(demoKey==='chair_stand'){line([28,47,28,70,54,70,54,93],'#91aab1',2);line([29,70,29,93],'#91aab1',2);}
    if(['calf_raise','side_lift'].includes(demoKey)){const x=demoKey==='side_lift'?33:76;line([x,42,x,92],'#91aab1',2);}
    limb([4,18,20],'#60989c',4);limb([2,14,16],'#60989c',3);
    limb([0,2,4],'#a7e4de',5.8);limb([4,10,12],'#76ded2',4.4);limb([2,6,8],'#f0c89b',3.4);
    if(demoKey==='calf_raise')line([v[12],v[13],61,93],'#76ded2',3);
    if(['bicep_curls','shoulder_press','dumbbell_squats'].includes(demoKey))
        for(const i of [8,16])line([v[i]-3,v[i+1],v[i]+3,v[i+1]],'#fcc46e',3.8);
    if(demoKey==='skipping_rope'){
        ctx.beginPath();ctx.ellipse(55,51,22,Math.max(1,45*Math.abs(Math.cos(phase*Math.PI))),0,0,Math.PI*2);ctx.strokeStyle='#f4ae79';ctx.lineWidth=.8;ctx.stroke();
    }
    ctx.fillStyle='#f0c89b';ctx.beginPath();ctx.arc(v[0],v[1],5.3,0,Math.PI*2);ctx.fill();
}

function previewMissionMovement(event) {
    const card = event.target.closest('.mission');
    if (!card || card.contains(event.relatedTarget) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = card.querySelector('[data-pose]');
    if (canvas.dataset.playing) return;
    canvas.dataset.playing = 'true';
    const start = performance.now();
    const cycle = guides[canvas.dataset.pose][1].length;
    function frame(now) {
        if (!canvas.isConnected) return;
        const fraction = Math.min(1,(now-start)/1500);
        paintMovement(canvas,canvas.dataset.pose,1+cycle*fraction);
        if (fraction<1) requestAnimationFrame(frame);
        else delete canvas.dataset.playing;
    }
    requestAnimationFrame(frame);
}
document.getElementById('questsList').addEventListener('pointerover',previewMissionMovement);
document.getElementById('questsList').addEventListener('focusin',previewMissionMovement);
