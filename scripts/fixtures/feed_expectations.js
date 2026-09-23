// Independent reference: six numbered cards repeat Sport/Kunst/Wissen twice.
module.exports=function expectedFeed(counts,rule){
 if(rule==='common')return [1,2,3];
 const buckets=[];
 for(let points=3;points>=0;points--)for(let id=1;id<=6;id++)if(counts[(id-1)%3]===points)buckets.push(id);
 if(rule==='profile')return buckets.slice(0,3);
 const picked=[];for(const id of buckets)if(!picked.some(old=>(old-1)%3===(id-1)%3))picked.push(id);
 return picked;
};
