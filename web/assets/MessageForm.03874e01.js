import{_ as S}from"./main.da775b16.js";import{r as h,R as t,h as _,u as x,b as D,g as f}from"./vendor.7b712f9f.js";import{w as F,t as b,l as z,U as c}from"./GeneralCondition.59d0a2ff.js";const I=h.exports.lazy(()=>S(()=>import("./Form.61876d87.js"),["Form.61876d87.js","vendor.7b712f9f.js","GeneralCondition.59d0a2ff.js","GeneralCondition.c3442c85.css"])),M=u=>{const[m,d]=t.useState(_.EditorState.createEmpty()),[s,r]=t.useState([]);t.useState([]);const g=x(e=>e);D();const y=e=>{d(e)},E=e=>{const a=c.fileaccepted.split(",");for(let i=0;i<e.target.files.length;i++){let l=a.indexOf(e.target.files[i].type.split("/")[1]);e.target.files[i].size<c.min_size||e.target.files[i].size>c.max_size?alert("Le fichier ne doit pas depasser: "+maxSize.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:0})+"Mo"):l?r([...s,...e.target.files]):alert("selectionner un fichier de type: jpeg,jpg,png")}},v=e=>{const a=s.slice();a.splice(e,1),r(a)},n=b(z(m)),p=()=>{if(n.length>0||s.length>0){const a=[];for(let o=0;o<s.length;o++){var e=new FileReader;e.onload=w=>a.push({media_width:210,media_height:"auto",media_src:w.target.result,media_type:s[o].type.split("/")[0],progress:1}),e.readAsDataURL(s[o]),console.log(a)}const i=Date.now();let l={data_type:"message_incognito",sub_type:"send_message",c_user:f.get("s_id"),security_token:f.get("isLogedin"),client_id:parseInt(u.user_id),msg:n,fake_ID:i,medias:a};g.Util.ws.send(JSON.stringify(l)),d(_.EditorState.createEmpty()),r([])}};return t.createElement("div",{className:"Fdo aovydwv3 Vnk Kmm Pap"},t.createElement(h.exports.Suspense,{fallback:"chargement..."},t.createElement(I,{onChange:y,editorState:m,textLengt:n.length,image:s,imageChange:E,sendMessage:p,deleteImage:v,ws:g.Util.ws})),t.createElement("div",{className:"Fdo  Igw0E   IwRSH    eGOV_   _4EzTm  JI_ht"},n.length||s.length>0?t.createElement("button",{className:"wpO6b",style:{height:"35px",color:"#0095f6",fontWeight:600},onClick:p},t.createElement("div",{className:"QBdPU"}," envoyer ")):t.createElement("div",{className:"wpO6b",style:{color:"#0095f6",opacity:.6,fontWeight:600}},t.createElement("div",{className:"QBdPU"}," envoyer "))))};var U=F(M);export{U as default};
