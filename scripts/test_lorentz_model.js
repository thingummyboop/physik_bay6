const {spawnSync}=require('node:child_process'),path=require('node:path');
const result=spawnSync('py',['-c',`
from math import sqrt
from manim_scripts.lorentz_model import electron_state
for i in range(1001):
 t=i/1000
 p,v,f=electron_state(t)
 dot=lambda a,b:sum(x*y for x,y in zip(a,b))
 assert abs(dot(v,f))<1e-12
 assert abs(dot(v,v)-1)<1e-12
 # q=-1, B=(0,0,-1): F=(-vy,vx,0)*q = (vy,-vx,0).
 expected=(v[1],-v[0],0)
 assert max(abs(a-b) for a,b in zip(f,expected))<1e-12
 radius=(p[0]+3,p[1]+1,0)
 assert abs(dot(radius,radius)-6.25)<1e-12
 assert dot(radius,f)<0
 if 0<t<1:
  h=1e-6
  before=electron_state(t-h)[0];after=electron_state(t+h)[0]
  tangent=[(b-a)/(2*h) for a,b in zip(before,after)]
  length=sqrt(dot(tangent,tangent))
  assert max(abs(tangent[j]/length-v[j]) for j in range(3))<1e-8
print('PASS: 1001 Lorentz states: tangent velocity, constant speed, circular radius, perpendicular inward force and negative-charge cross product.')
`],{cwd:path.join(__dirname,'..'),encoding:'utf8'});
process.stdout.write(result.stdout||'');process.stderr.write(result.stderr||'');if(result.error)throw result.error;process.exitCode=result.status===0?0:1;
