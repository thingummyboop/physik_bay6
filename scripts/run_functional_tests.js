// Run every checked-in/local test_*.js suite and retain each result, including failures.
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.join(__dirname,'..');
const tests=fs.readdirSync(__dirname).filter(name=>/^test_.*\.js$/.test(name)).sort();
const results=[];
for(const name of tests){
 const start=Date.now();
 const result=spawnSync(process.execPath,[path.join(__dirname,name)],{cwd:root,encoding:'utf8',timeout:90000,maxBuffer:2*1024*1024,windowsHide:true});
 const passed=result.status===0&&!result.error;
 results.push({name,passed,exitCode:result.status,durationMs:Date.now()-start,stdout:result.stdout||'',stderr:result.stderr||'',error:result.error?.message||null});
 console.log((passed?'PASS ':'FAIL ')+name);
 if(!passed)console.log((result.stderr||result.stdout||result.error?.message||'No diagnostic output').slice(-5000));
}
const report={createdAt:new Date().toISOString(),total:results.length,passed:results.filter(r=>r.passed).length,results};
fs.writeFileSync(path.join(root,'..','functional-test-report.json'),JSON.stringify(report,null,2)+'\n');
console.log(report.passed+'/'+report.total+' functional suites passed. This does not verify curriculum completeness, factual accuracy, media or visual layout.');
process.exitCode=report.passed===report.total?0:1;
