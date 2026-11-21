// Closed triangle meshes in body coordinates: x across, y downward, z anterior.
const bodyFaces = [];
function ellipsoid(name,x,y,z,rx,ry,rz,tilt=0) {
    const rows=10, columns=16;
    const ring=[];
    for(let j=0;j<=rows;j++){
        const lat=Math.PI*j/rows;
        const row=[];
        for(let i=0;i<columns;i++){
            const lon=2*Math.PI*i/columns;
            const u=rx*Math.sin(lat)*Math.cos(lon), v=-ry*Math.cos(lat);
            row.push([x+u*Math.cos(tilt)-v*Math.sin(tilt),y+u*Math.sin(tilt)+v*Math.cos(tilt),z+rz*Math.sin(lat)*Math.sin(lon)]);
        }
        ring.push(row);
    }
    for(let j=0;j<rows;j++)for(let i=0;i<columns;i++){
        const k=(i+1)%columns;
        bodyFaces.push({name,verts:[ring[j][i],ring[j][k],ring[j+1][k],ring[j+1][i]]});
    }
}
ellipsoid('',0,13,0,8.2,10.7,8);
ellipsoid('',0,25,0,5,7,5);
ellipsoid('',0,45,0,17,19,8.1);
ellipsoid('',0,65,0,11.6,17,6.9);
ellipsoid('',0,81,0,14,12,8);
for(const side of [-1,1]){
    function pair(name,x,y,z,rx,ry,rz,tilt=0){ellipsoid(name,x*side,y,z,rx,ry,rz,side*tilt);}
    pair('',20,44,0,5.4,13,5.1,-.26);
    pair('',26,65,0,4,12,4,-.23);
    pair('',30,81,0,3,6,2.5,-.17);
    pair('',8.5,103,0,6.8,21,6.5);
    pair('',9,137,0,4.6,18,4.9);
    pair('',9,158,2.4,4.1,4.3,7);
}
// Original muscle outlines sampled into horizontal sections [height, left edge, right edge].
const contourProfiles = {"chest":[[[31.012,-5.714,-4.743],[32.706,-11.407,-1.059],[34.401,-14.173,-1.2],[36.095,-15.274,-1.341],[37.789,-15.697,-1.482],[39.483,-16.121,-1.624],[41.178,-16.544,-1.765],[42.872,-16.968,-1.906],[44.566,-15.369,-3.195],[46.26,-10.562,-9.544]]],"deltoids-front":[[[30.946,-15.635,-14.689],[32.395,-19.669,-14.349],[33.844,-21.071,-14.711],[35.293,-21.968,-15.073],[36.742,-22.603,-15.436],[38.191,-23.072,-15.798],[39.641,-23.422,-16.53],[41.09,-23.681,-17.897],[42.539,-23.869,-19.676],[43.988,-23.999,-23.611]]],"biceps":[[[45.012,-22.015,-21.964],[46.555,-23.506,-19.076],[48.099,-24.491,-19.311],[49.642,-25.201,-19.584],[51.185,-25.73,-19.903],[52.728,-26.132,-20.278],[54.272,-26.434,-20.723],[55.815,-26.658,-21.261],[57.358,-26.817,-21.93],[58.901,-26.922,-22.802],[60.445,-26.981,-24.058],[61.988,-27.0,-26.935]]],"forearms-front":[[[63.012,-26.019,-25.964],[64.593,-27.778,-23.161],[66.175,-28.849,-23.609],[67.756,-29.645,-24.093],[69.337,-30.282,-24.617],[70.919,-30.811,-25.189],[72.5,-31.261,-25.819],[74.081,-31.65,-26.521],[75.663,-31.989,-27.316],[77.244,-32.288,-28.237],[78.825,-32.553,-29.345],[80.407,-32.789,-30.772],[81.988,-32.998,-32.977]]],"abs":[[[46.762,-3.251,-2.488],[47.454,-5.459,-1.0],[48.146,-6.312,-1.0],[48.837,-6.888,-1.0],[49.529,-7.0,-1.0],[50.221,-7.0,-1.0],[50.913,-7.0,-1.0],[51.604,-7.0,-1.0],[52.296,-7.0,-2.777],[52.988,-7.0,-6.928]],[[54.012,-1.072,-1.0],[54.565,-4.389,-1.0],[55.118,-6.971,-1.0],[55.671,-6.832,-1.0],[56.224,-6.694,-1.0],[56.776,-6.556,-1.0],[57.329,-6.418,-1.0],[57.882,-6.279,-1.0],[58.435,-6.141,-1.0],[58.988,-6.003,-1.0]],[[61.012,-5.998,-1.0],[61.676,-5.865,-1.0],[62.34,-5.732,-1.0],[63.004,-5.599,-1.0],[63.668,-5.466,-1.0],[64.332,-5.334,-1.0],[64.996,-5.201,-1.0],[65.66,-5.068,-1.0],[66.324,-3.704,-1.0],[66.988,-1.048,-1.0]],[[68.012,-5.0,-4.952],[69.12,-4.973,-1.0],[70.229,-4.888,-1.0],[71.337,-4.735,-1.0],[72.446,-4.501,-1.0],[73.554,-4.167,-1.0],[74.663,-3.709,-1.0],[75.771,-3.085,-1.0],[76.88,-2.231,-1.0],[77.988,-1.016,-1.0]]],"obliques":[[[46.012,-15.0,-14.976],[47.484,-15.0,-12.031],[48.957,-15.0,-9.086],[50.429,-15.0,-8.864],[51.902,-15.0,-8.724],[53.374,-14.793,-8.583],[54.847,-14.084,-8.443],[56.319,-13.516,-8.303],[57.791,-13.061,-8.163],[59.264,-12.697,-8.022],[60.736,-12.41,-7.882],[62.209,-12.187,-7.742],[63.681,-12.022,-7.602],[65.153,-11.907,-7.462],[66.626,-11.835,-7.321],[68.098,-11.803,-7.181],[69.571,-11.806,-7.041],[71.043,-11.842,-8.304],[72.516,-11.907,-10.144],[73.988,-11.999,-11.985]]],"hip-flexors":[[[75.012,-12.002,-11.959],[76.565,-12.313,-8.152],[78.118,-12.624,-5.855],[79.671,-12.934,-4.239],[81.224,-10.938,-3.035],[82.776,-9.224,-2.114],[84.329,-7.769,-2.443],[85.882,-6.442,-2.961],[87.435,-5.197,-3.478],[88.988,-4.009,-3.996]]],"quads":[[[82.012,-13.002,-12.976],[83.486,-13.278,-10.544],[84.96,-13.518,-8.765],[86.434,-13.722,-7.372],[87.907,-13.894,-6.243],[89.381,-14.032,-5.308],[90.855,-14.14,-4.524],[92.329,-14.217,-3.936],[93.803,-14.265,-3.699],[95.277,-14.285,-3.528],[96.751,-14.277,-3.415],[98.224,-14.243,-3.353],[99.698,-14.183,-3.334],[101.172,-14.098,-3.353],[102.646,-13.989,-3.407],[104.12,-13.856,-3.491],[105.594,-13.7,-3.604],[107.067,-13.522,-3.743],[108.541,-13.323,-3.904],[110.015,-13.102,-4.088],[111.489,-12.86,-4.291],[112.963,-12.599,-4.513],[114.437,-12.318,-4.752],[115.911,-12.019,-5.007],[117.384,-11.613,-5.278],[118.858,-11.078,-5.563],[120.332,-10.302,-5.861],[121.806,-8.258,-7.807]]],"calves-front":[[[126.113,-8.16,-7.77],[127.606,-10.038,-6.389],[129.1,-10.131,-6.093],[130.594,-10.225,-6.004],[132.088,-10.318,-6.131],[133.581,-10.411,-6.31],[135.075,-10.505,-6.489],[136.569,-10.598,-6.668],[138.063,-10.691,-6.848],[139.557,-10.785,-7.027],[141.05,-10.878,-7.206],[142.544,-10.972,-7.385],[144.038,-11.114,-7.565],[145.532,-11.22,-7.744],[147.025,-11.249,-7.923],[148.519,-11.192,-8.102],[150.013,-11.035,-8.282],[151.507,-10.763,-8.461],[153.0,-10.355,-8.64],[154.494,-9.782,-8.819],[155.988,-9.007,-8.999]]],"traps":[[[25.012,-4.018,-3.992],[26.51,-6.266,-2.993],[28.009,-8.514,-2.0],[29.508,-10.761,-1.928],[31.006,-13.009,-1.857],[32.504,-15.257,-1.785],[34.003,-15.498,-1.714],[35.502,-14.749,-1.643],[37.0,-14.0,-1.571],[38.498,-11.734,-1.5],[39.997,-9.704,-1.429],[41.496,-7.875,-1.357],[42.994,-6.224,-1.286],[44.492,-4.727,-1.215],[45.991,-3.368,-1.143],[47.49,-2.132,-1.072],[48.988,-1.009,-1.001]]],"deltoids-back":[[[31.727,-17.259,-16.534],[32.93,-20.167,-15.0],[34.134,-21.259,-15.0],[35.337,-21.999,-15.0],[36.541,-22.555,-15.0],[37.745,-22.995,-15.0],[38.948,-23.351,-15.0],[40.152,-23.644,-16.027],[41.356,-23.887,-17.469],[42.559,-21.618,-20.836]]],"lats":[[[41.648,-14.162,-13.33],[43.204,-15.799,-8.663],[44.76,-15.54,-6.402],[46.316,-15.281,-4.6],[47.872,-15.021,-3.036],[49.428,-14.762,-2.027],[50.984,-14.503,-2.124],[52.54,-14.243,-2.221],[54.096,-13.951,-2.319],[55.652,-13.111,-2.416],[57.208,-12.142,-2.513],[58.764,-11.01,-2.61],[60.32,-9.668,-2.708],[61.876,-8.031,-2.805],[63.432,-5.943,-2.902],[64.988,-3.028,-2.999]]],"triceps":[[[44.012,-23.017,-19.002],[45.573,-24.256,-19.258],[47.133,-24.903,-19.535],[48.694,-25.363,-19.836],[50.254,-25.72,-20.166],[51.815,-26.009,-20.532],[53.375,-26.249,-20.942],[54.936,-26.452,-21.412],[56.497,-26.625,-21.965],[58.057,-26.773,-22.649],[59.618,-26.901,-23.583],[61.178,-26.288,-25.846]]],"lowerback":[[[53.012,-2.01,-2.0],[54.511,-3.211,-1.944],[56.009,-4.319,-1.889],[57.508,-5.333,-1.833],[59.007,-6.254,-1.778],[60.505,-7.081,-1.722],[62.004,-7.814,-1.667],[63.503,-8.454,-1.611],[65.001,-9.0,-1.556],[66.5,-9.3,-1.5],[67.999,-9.6,-1.444],[69.497,-9.899,-1.389],[70.996,-10.199,-1.333],[72.495,-10.499,-1.278],[73.993,-10.799,-1.222],[75.492,-7.434,-1.167],[76.991,-4.225,-1.111],[78.489,-2.371,-1.056],[79.988,-1.01,-1.0]]],"glutes":[[[76.412,-8.341,-7.659],[78.01,-12.002,-3.988],[79.608,-12.247,-2.337],[81.205,-12.493,-1.265],[82.803,-12.739,-0.709],[84.401,-12.985,-0.507],[85.999,-13.231,-0.573],[87.596,-13.476,-0.854],[89.194,-13.722,-1.309],[90.792,-13.968,-1.912],[92.39,-12.164,-3.373],[93.987,-7.882,-7.123]]],"hamstrings":[[[94.012,-13.999,-2.999],[95.508,-13.869,-2.895],[97.004,-13.739,-2.83],[98.499,-13.609,-2.802],[99.995,-13.479,-2.808],[101.491,-13.349,-2.848],[102.987,-13.219,-2.918],[104.483,-13.088,-3.018],[105.978,-12.958,-3.147],[107.474,-12.828,-3.302],[108.97,-12.698,-3.483],[110.466,-12.568,-3.689],[111.961,-12.438,-3.918],[113.457,-12.308,-4.17],[114.953,-12.178,-4.444],[116.449,-12.048,-4.738],[117.945,-11.838,-5.053],[119.44,-11.44,-5.386],[120.936,-10.72,-5.739],[122.432,-8.321,-7.715]]],"calves-back":[[[125.45,-8.249,-7.744],[126.952,-10.272,-5.775],[128.454,-10.701,-5.246],[129.956,-11.13,-4.991],[131.458,-11.559,-4.879],[132.96,-11.988,-4.859],[134.462,-12.359,-4.903],[135.964,-12.648,-4.997],[137.466,-12.851,-5.176],[138.968,-12.969,-5.384],[140.47,-12.998,-5.62],[141.972,-12.939,-5.884],[143.474,-12.787,-6.175],[144.976,-12.543,-6.495],[146.478,-12.204,-6.842],[147.98,-11.767,-7.217],[149.482,-11.231,-7.62],[150.984,-10.594,-8.051],[152.486,-9.854,-8.51],[153.988,-9.007,-8.996]]]};
// Mid-depth, belly thickness, and wrap around the lateral side of the body.
const muscleDepth = {
    chest:[5.4,4.3,.38], 'deltoids-front':[1.9,4.5,.44], biceps:[1.8,3.8,.29],
    'forearms-front':[.8,3.1,.29], abs:[6.4,2.7,.1], obliques:[3.6,3.5,.66],
    'hip-flexors':[3.4,3.4,.4], quads:[2.3,5.5,.29], 'calves-front':[1.5,3.1,.32],
    traps:[4.2,3.9,.4], 'deltoids-back':[2,4.2,.44], lats:[4.7,4,.55],
    triceps:[2,3.6,.3], lowerback:[4.7,3.1,.32], glutes:[3.8,5.6,.48],
    hamstrings:[2.7,4.6,.28], 'calves-back':[2.1,4.8,.29]
};
function muscleMesh(name, sections, side) {
    const [base,thickness,wrap] = muscleDepth[name];
    const facing = anterior.includes(name) ? 1 : -1;
    const widest = Math.max(...sections.map(([,lo,hi])=>(hi-lo)/2));
    const count = 16;
    const rings = sections.map(([y,lo,hi],row)=>{
        const radius=(hi-lo)/2, center=(lo+hi)/2;
        const along=row/(sections.length-1);
        const taper=Math.pow(Math.sin(Math.PI*along),.4);
        const depth=thickness*Math.sqrt(radius/widest)*(.2+.8*taper);
        return Array.from({length:count},(_,i)=>{
            const angle=2*Math.PI*i/count;
            const offset=radius*Math.cos(angle);
            return [side*(center+offset),y,facing*(base+offset*wrap+depth*Math.sin(angle))];
        });
    });
    // Keep the winding consistent on the mirrored and posterior surfaces.
    function face(verts){
        bodyFaces.push({name,verts:side*facing>0 ? verts : verts.reverse()});
    }
    for(let j=1;j<rings.length;j++)for(let i=0;i<count;i++){
        const k=(i+1)%count;
        face([rings[j-1][i],rings[j-1][k],rings[j][k],rings[j][i]]);
    }
    for(const [ring,top] of [[rings[0],true],[rings.at(-1),false]]){
        const middle=ring.reduce((a,v)=>a.map((x,k)=>x+v[k]/count),[0,0,0]);
        for(let i=0;i<count;i++){
            const k=(i+1)%count;
            face(top?[middle,middle,ring[k],ring[i]]:[middle,middle,ring[i],ring[k]]);
        }
    }
}
for(const [name,parts] of Object.entries(contourProfiles)){
    for(const part of parts)for(const side of [-1,1])muscleMesh(name,part,side);
}
const volumeCanvas=document.getElementById('body-volume');
const volumePanel=document.getElementById('volume');
let yaw=.16,pitch=0,inspected='',projected=[],pendingDraw=0;
function drawVolume(){
    if(volumePanel.hidden)return;
    const ctx=volumeCanvas.getContext('2d');
    const scores=mapScores['#statsTab'] || {};
    const peak=Math.max(0,...Object.values(scores));
    const cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
    const colors=Object.fromEntries(Object.keys(surfaces).map(k=>[k,muscleRGB(scores['m-'+k]||0,peak)]));
    projected=[];
    for(const face of bodyFaces){
        const coords=face.verts.map(([x,y,z])=>{
            const depth=z*cy-x*sy;
            return [x*cy+z*sy,(y-83)*cp-depth*sp,(y-83)*sp+depth*cp];
        });
        const [a,b,c,d]=coords;
        const dx=c[0]-a[0],dy=c[1]-a[1],dz=c[2]-a[2];
        const ex=d[0]-b[0],ey=d[1]-b[1],ez=d[2]-b[2];
        const nx=dy*ez-dz*ey,ny=dz*ex-dx*ez,nz=dx*ey-dy*ex;
        if(nz>=0)continue;
        const shade=.76+.24*Math.max(0,(nx*.35+ny*.4-nz*.85)/Math.hypot(nx,ny,nz));
        const color=colors[face.name]||[155,174,184];
        const path=new Path2D();
        coords.forEach(([x,y],i)=>path[i?'lineTo':'moveTo'](310+x*3.25,280+y*3.25));path.closePath();
        projected.push({path,name:face.name,depth:(a[2]+b[2]+c[2]+d[2])/4,color:'rgb('+color.map(v=>Math.round(v*shade)).join(',')+')'});
    }
    projected.sort((a,b)=>a.depth-b.depth);
    ctx.clearRect(0,0,620,560);ctx.lineWidth=.55;
    for(const f of projected){
        ctx.globalAlpha=f.name ? 1 : .03;
        ctx.fillStyle=ctx.strokeStyle=f.color;
        ctx.fill(f.path);
        if(f.name)ctx.stroke(f.path);
    }
    ctx.globalAlpha=1;
    const value=scores['m-'+inspected]||0;
    document.getElementById('muscle-reading').textContent=inspected ? cleanMuscleName('m-'+inspected)+' · '+Math.round(peak?value/peak*100:0)+'% of peak · '+Math.round(value)+' weighted s' : '';
}
function redraw(){if(!pendingDraw)pendingDraw=requestAnimationFrame(()=>{pendingDraw=0;drawVolume();});}
document.getElementById('map-view').onchange=e=>{
    const show=e.target.value==='3D';
    document.getElementById('flat-map').hidden=show;
    volumePanel.hidden=!show;
    if(show)drawVolume();
};
let drag=null;
volumeCanvas.onpointerdown=e=>{
    if(drag)return;
    drag={id:e.pointerId,x:e.clientX,y:e.clientY,distance:0};volumeCanvas.setPointerCapture(e.pointerId);
};
volumeCanvas.onpointermove=e=>{
    if(drag?.id!==e.pointerId)return;
    const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
    yaw+=dx*.014;pitch=Math.max(-.6,Math.min(.6,pitch+dy*.009));
    drag.distance+=Math.hypot(dx,dy);drag.x=e.clientX;drag.y=e.clientY;redraw();
};
volumeCanvas.onpointerup=e=>{
    if(drag?.id!==e.pointerId)return;
    if(drag.distance<5){
        const r=volumeCanvas.getBoundingClientRect(),ctx=volumeCanvas.getContext('2d');
        const x=(e.clientX-r.left)*620/r.width,y=(e.clientY-r.top)*560/r.height;
        inspected=projected.findLast(f=>f.name && ctx.isPointInPath(f.path,x,y))?.name||'';redraw();
    }
    drag=null;
};
volumeCanvas.onlostpointercapture=()=>{drag=null;};
function turn(angle){yaw+=angle;redraw();}
document.getElementById('turn-left').onclick=()=>turn(-Math.PI/6);
document.getElementById('turn-right').onclick=()=>turn(Math.PI/6);
for(const [id,angle] of [['front',0],['back',Math.PI]])document.getElementById('turn-'+id).onclick=()=>{yaw=angle;pitch=0;redraw();};
volumeCanvas.onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();turn(e.key==='ArrowLeft'?-.2:.2);}};
