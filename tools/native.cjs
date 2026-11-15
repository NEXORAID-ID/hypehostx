const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
let cmake='cmake',ctest='ctest';const env={...process.env};
if(process.platform==='win32'){
 const install='C:/Program Files (x86)/Microsoft Visual Studio/18/BuildTools';
 const bin=install+'/Common7/IDE/CommonExtensions/Microsoft/CMake/CMake/bin';
 if(fs.existsSync(bin+'/cmake.exe')){cmake=bin+'/cmake.exe';ctest=bin+'/ctest.exe';}
 const compiler=install+'/VC/Tools/MSVC';if(fs.existsSync(compiler)){const versions=fs.readdirSync(compiler).sort().reverse();env.PATH=path.join(compiler,versions[0],'bin/Hostx64/x64')+';'+env.PATH;}
}
const sanitize=process.argv.includes('--asan'),dir=sanitize?'native/build-asan':'native/build',config=sanitize?'RelWithDebInfo':'Debug';
for(const[command,args]of [[cmake,['-S','native','-B',dir,...(sanitize?['-DHYPE_SANITIZE=ON']:[])]],[cmake,['--build',dir,'--config',config]],[ctest,['--test-dir',dir,'-C',config,'--output-on-failure','--timeout','30']]]){
 console.log(command+' '+args.join(' '));const r=spawnSync(command,args,{env,stdio:'inherit',timeout:180000});if(r.status!==0){process.exitCode=r.status??1;break;}
}
