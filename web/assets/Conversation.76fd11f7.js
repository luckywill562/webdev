var $=Object.defineProperty;var Q=(a,s,i)=>s in a?$(a,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):a[s]=i;var g=(a,s,i)=>(Q(a,typeof s!="symbol"?s+"":s,i),i);import{R as e,u as z,r as q,L as G,d as Y,b as O,g as v,D as I,i as ee,h as T,P as te}from"./vendor.7b712f9f.js";import{aH as H,v as se,aI as ae,aq as ne,w as U,F as A,L as k,B as ie,a6 as K,j as le,aE as ce,af as J,av as F,au as re,f as de,aJ as V,aK as me,V as oe,t as ue,l as he,U as S,ac as pe}from"./GeneralCondition.59d0a2ff.js";import{e as D,ag as Ee,ah as B,ai as M,J as ge,K as ve,aj as fe,Y as ye,ak as be,al as _e}from"./main.da775b16.js";import{P as Ne}from"./ProfileSetting.7579865b.js";function we({index:a,value:s,list:i,client:l,src:o}){const u=z(r=>r),f=i.slice(),t=i[a],n=f[a+1],d=f[a-1],[w,h]=q.exports.useState(!1),_=r=>{r.preventDefault(),h(!0)};return e.createElement(e.Fragment,null,t.type==="GIFT"?e.createElement("div",{className:"Fdo Anv Lns Aic w0hvl6rk",key:a},e.createElement("div",{className:"Fdo Anv vag wfh Aic Lns QOqBd Ngt ELG pbD nmjy",style:{maxWidth:250}},e.createElement("div",{className:"Fdo Lng Aic"},e.createElement("div",{className:"Eho  Aic LCR vTu ",style:{border:n&&!n.sended?"1px solid transparent":"1px solid #e5e6ea"}},e.createElement("img",{className:"hty ELG hrt",src:o}))),e.createElement("hr",{className:"Fdo EvR ELG"}),e.createElement("div",{className:"Fdo Anv Aic"},e.createElement("div",{className:"Fdo"},e.createElement(H,{size:24})),t!=null&&t.sended?e.createElement("span",null,"Vous avez envoyer un cadeau"):e.createElement("span",null,"Vous avez re\xE7u un cadeau"),e.createElement(D,{show:w,onHide:()=>h(!1),titre:" cadeau",size:"gift"}),e.createElement(G,{to:"",className:"sqdOP  ZIAjV ",onClick:_},"Voir le contenu"))),(t==null?void 0:t.error)&&e.createElement("div",{className:"Fdo",style:{padding:"4px 0"}},e.createElement("span",{className:"_7UhW9  PIoXz       MMzan  G6S            fDxYl     "},"message non envoy\xE9"))):(t==null?void 0:t.type)==="NEW_CONTACT"?e.createElement("div",{className:"v2ao Vnk"},e.createElement("span",{className:"_7UhW9  PIoXz       MMzan    _0PwGv              fDxYl     "},"vous avez un nouveau contact")):t.type!="NEW_CONTACT"&&t.type!="GIFT"&&e.createElement("div",{className:"Fdo",style:{justifyContent:t.sended?"flex-end":"flex-start",paddingBottom:"1px"}},e.createElement("div",{className:"Fdo b2r Bsj Aic",style:{flexDirection:(t.sended,"row"),justifyContent:t.sended?"flex-end":"flex-start"}},s.subject&&+s.media==0?e.createElement(e.Fragment,null,!t.sended&&e.createElement("div",{className:"Eho Aic LCR vTu cgat1ltu ",style:{border:n&&!n.sended?"1px solid transparent":"1px solid #e5e6ea"}},n&&n.sended||n&&n.time_status!=t.time_status||n&&n.type!=t.type||n&&n.mesmedia.length>0||!n?e.createElement("img",{className:"hty ELG hrt",src:o}):""),t.sended&&t.mesmedia.length==0?e.createElement(e.Fragment,null,s.subject===":special_heart:"?e.createElement("svg",{width:"24",height:"24",viewBox:"0 0 32 32",fill:"#ff4477"},e.createElement("g",null,e.createElement("path",{d:"M 31.984,13.834C 31.9,8.926, 27.918,4.552, 23,4.552c-2.844,0-5.35,1.488-7,3.672 C 14.35,6.040, 11.844,4.552, 9,4.552c-4.918,0-8.9,4.374-8.984,9.282L0,13.834 c0,0.030, 0.006,0.058, 0.006,0.088 C 0.006,13.944,0,13.966,0,13.99c0,0.138, 0.034,0.242, 0.040,0.374C 0.48,26.872, 15.874,32, 15.874,32s 15.62-5.122, 16.082-17.616 C 31.964,14.244, 32,14.134, 32,13.99c0-0.024-0.006-0.046-0.006-0.068C 31.994,13.89, 32,13.864, 32,13.834L 31.984,13.834 z"}))):e.createElement("div",{className:"Bwt bBA Obm ",style:{color:"#f1f1f1",padding:"8px 16px",maxWidth:"60%",borderTopRightRadius:d&&d.sended&&t.sended&&d.time_status===t.time_status&&d.type===t.type&&d.mesmedia.length==0?"4px":"0.9rem",borderBottomRightRadius:n&&n.sended&&t.sended&&n.time_status===t.time_status&&n.type===t.type&&n.mesmedia.length==0?"4px":"0.9rem",borderTopLeftRadius:"0.9rem",borderBottomLeftRadius:"0.9rem",marginTop:d&&d.sended&&t.sended&&d.time_status===t.time_status&&d.type===t.type&&d.mesmedia.length==0?0:"0.6rem"}},e.createElement("span",{className:"SubContent",dangerouslySetInnerHTML:{__html:s.subject}}))):!(t!=null&&t.sended)&&(t==null?void 0:t.mesmedia.length)==0?e.createElement(e.Fragment,null,s.subject===":special_heart:"?e.createElement("svg",{width:"24",height:"24",viewBox:"0 0 32 32",fill:"#ff4477"},e.createElement("g",null,e.createElement("path",{d:"M 31.984,13.834C 31.9,8.926, 27.918,4.552, 23,4.552c-2.844,0-5.35,1.488-7,3.672 C 14.35,6.040, 11.844,4.552, 9,4.552c-4.918,0-8.9,4.374-8.984,9.282L0,13.834 c0,0.030, 0.006,0.058, 0.006,0.088 C 0.006,13.944,0,13.966,0,13.99c0,0.138, 0.034,0.242, 0.040,0.374C 0.48,26.872, 15.874,32, 15.874,32s 15.62-5.122, 16.082-17.616 C 31.964,14.244, 32,14.134, 32,13.99c0-0.024-0.006-0.046-0.006-0.068C 31.994,13.89, 32,13.864, 32,13.834L 31.984,13.834 z"}))):e.createElement("div",{className:"Bwt QOqBd",style:{color:"#262626",padding:"8px 16px",maxWidth:"60%",borderTopLeftRadius:d&&!(d!=null&&d.sended)&&!(t!=null&&t.sended)&&(d==null?void 0:d.time_status)===t.time_status&&d.mesmedia.length==0&&d.type===t.type?"4px":"0.9rem",borderBottomLeftRadius:n&&!n.sended&&!t.sended&&(n==null?void 0:n.time_status)===t.time_status&&n.mesmedia.length==0&&n.type===t.type?"4px":"0.9rem",borderTopRightRadius:"0.9rem",borderBottomRightRadius:"0.9rem",marginTop:d&&!(d!=null&&d.sended)&&!(t!=null&&t.sended)&&(d==null?void 0:d.time_status)===t.time_status&&d.mesmedia.length==0&&d.type===t.type?0:"0.6rem"}},e.createElement("span",{className:"SubContent",dangerouslySetInnerHTML:{__html:s==null?void 0:s.subject}}))):null):e.createElement("div",{className:`Fdo Anv nmjy ${t!=null&&t.sended?" ft4":" b2r"}`,style:{maxWidth:"60%"}},e.createElement("div",{className:"Fdo aovydwv3"},(t==null?void 0:t.media)>0&&(t==null?void 0:t.mesmedia.length)>0?e.createElement(e.Fragment,null,!(t!=null&&t.sended)&&e.createElement("div",{className:"Fdo _4EzTm Aic Eho LCR vTu cgat1ltu ",style:{border:"1px solid #e5e6ea"}},e.createElement("img",{className:" hty ELG hrt",src:o})),e.createElement("div",{className:" Aic jifvfom9 owycx6da d76ob5m9 k4urcfbm rq0escxv",style:{borderRadius:"0.9rem",overflow:"hidden"}},t!=null&&t.price_value?e.createElement(e.Fragment,null,e.createElement(xe,{value:s,client:l,msg:t}),t.sended?e.createElement("div",{className:"Fdo bkfpd7mw"},t==null?void 0:t.price," ",u.Util.c_user.devise):e.createElement("div",{className:"Fdo ELG hty"},e.createElement("button",{className:"sqdOP Xdg L3NKy ZIAjV _Dvgb"},t==null?void 0:t.price," ",u.Util.c_user.devise,": debloquer"))):e.createElement(e.Fragment,null,t==null?void 0:t.mesmedia.map((r,p)=>e.createElement("div",{key:p,className:"kb5gq1qc pfnyh3mw hfv  hcukyx3x RpE"},r!=null&&r.progress?e.createElement(e.Fragment,null,e.createElement("div",{className:"RpE ni8dbmo4 stjgntxs fni8adji hgaippwi fykbt5ly ns4ygwem",style:{height:r.media_height?r.media_height:"auto",width:r.media_width,backgroundColor:"#efefef",borderTopRightRadius:t.sended?4:"0.9rem",borderBottomRightRadius:t.sended?4:"0.9rem",borderTopLeftRadius:t.sended?"0.9rem":4,borderBottomLeftRadius:!t.sended&&t.subject?4:"",opacity:"0.5"}},r.media_type==="video"?e.createElement("video",{className:"k4urcfbm bixrwtb6 datstx6m Fdo",src:r.media_src,controls:!0}):e.createElement("img",{className:"k4urcfbm bixrwtb6 datstx6m Fdo",src:r.media_src})),e.createElement("div",{className:"uploadProgressbar"},e.createElement("div",{className:"barProgress",style:{width:`${r.progress}%`}}," "))):e.createElement(X,{post_id:t==null?void 0:t.id,media_id:r==null?void 0:r.media_id,client:l},e.createElement("div",{className:"RpE ni8dbmo4 stjgntxs fni8adji hgaippwi fykbt5ly ns4ygwem",style:{height:r!=null&&r.media_height?r==null?void 0:r.media_height:"auto",width:r.media_width,backgroundColor:"#efefef",borderTopRightRadius:t!=null&&t.sended?4:"0.9rem",borderBottomRightRadius:t!=null&&t.sended?4:"0.9rem",borderTopLeftRadius:t!=null&&t.sended?"0.9rem":4,borderBottomLeftRadius:!(t!=null&&t.sended)&&(t==null?void 0:t.subject)?4:""}},r.media_type==="video"?e.createElement("video",{className:"k4urcfbm bixrwtb6 datstx6m Fdo",src:r==null?void 0:r.media_src,controls:!0}):e.createElement("img",{className:"k4urcfbm bixrwtb6 datstx6m Fdo",src:r==null?void 0:r.media_src})))))),(t==null?void 0:t.subject)&&e.createElement("div",{className:"Fdo",style:{justifyContent:t!=null&&t.sended?"flex-end":"flex-start",marginTop:5}},t.sended?e.createElement("div",{className:"Bwt Obm bBA",style:{color:"#f1f1f1",padding:"8px 16px",borderTopRightRadius:4,borderBottomRightRadius:4,borderTopLeftRadius:"0.9rem",borderBottomLeftRadius:"0.9rem"}},e.createElement("span",{className:"SubContent",dangerouslySetInnerHTML:{__html:s==null?void 0:s.subject}})):e.createElement("div",{className:"Bwt QOqBd",style:{color:"#262626",padding:"8px 16px",borderTopLeftRadius:4,borderBottomLeftRadius:4,borderTopRightRadius:"0.9rem",borderBottomRightRadius:"0.9rem"}},e.createElement("span",{className:"SubContent",dangerouslySetInnerHTML:{__html:t==null?void 0:t.subject}}))))):e.createElement(e.Fragment,null,!(t!=null&&t.sended)&&e.createElement("div",{className:"Fdo _4EzTm Aic Eho LCR vTu cgat1ltu ",style:{border:n&&!(n!=null&&n.sended)?"1px solid transparent":"1px solid #e5e6ea"}},n&&!(n!=null&&n.sended)||!n&&e.createElement("img",{className:"hty ELG hrt",src:o})),s!=null&&s.media_process?e.createElement("div",{className:"j83agx80 Aic jifvfom9 owycx6da d76ob5m9 k4urcfbm rq0escxv"},e.createElement("div",{className:"Bwt ",style:{color:"#ddd",padding:"8px 16px",borderTopLeftRadius:"0.9rem",borderBottomLeftRadius:n&&!(n!=null&&n.sended)&&!(t!=null&&t.sended)?"4px":"0.9rem",borderTopRightRadius:"0.9rem",borderBottomRightRadius:"0.9rem",border:"solid 1px #efefef"}},"Chargement de l'image...")):e.createElement("div",{className:"Fdo Aic jifvfom9 owycx6da d76ob5m9 k4urcfbm rq0escxv"},e.createElement("div",{className:"Bwt ",style:{color:"#ddd",padding:"8px 16px",borderTopLeftRadius:"0.9rem",borderBottomLeftRadius:"0.9rem",borderTopRightRadius:"0.9rem",borderBottomRightRadius:"0.9rem",border:"solid 1px #efefef"}},"message indisponible"))))),(t==null?void 0:t.sended)&&!n&&(t==null?void 0:t.process)&&!(t!=null&&t.error)&&e.createElement("div",{className:"Eho LCR  _0PwGv  "},e.createElement(se,{size:14})),(t==null?void 0:t.sended)&&!n&&(t==null?void 0:t.error)&&e.createElement("div",{className:"Fdo G6S"},e.createElement(ae,{size:14})),(t==null?void 0:t.sended)&&!n&&!(t!=null&&t.process)&&!(t!=null&&t.error)&&!(t!=null&&t.seen)&&e.createElement("div",{className:"Eho LCR _0PwGv  "},e.createElement(ne,{size:14})),(t==null?void 0:t.sended)&&!(t!=null&&t.seen)&&!t.process&&!(t!=null&&t.error)||(t==null?void 0:t.sended)&&(t==null?void 0:t.seen)&&!t.process&&!(t!=null&&t.error)&&n&&e.createElement("div",{className:"Eho LCR hft RpE   "}),n?e.createElement(e.Fragment,null,(t==null?void 0:t.sended)&&!(n!=null&&n.seen)&&(t==null?void 0:t.seen)&&e.createElement("div",{className:"Eho LCR hft RpE _2dbep "},e.createElement("img",{src:o,className:"hty ELG hrt ApE Udt"}))):e.createElement(e.Fragment,null,(t==null?void 0:t.seen)&&(t==null?void 0:t.sended)&&e.createElement("div",{className:"Eho LCR hft RpE _2dbep "},e.createElement("img",{src:o,className:"hty ELG hrt ApE Udt"}))))))}function X({media_id:a,children:s,post_id:i,client:l}){const o=Y();return e.createElement(G,{to:`/inbox/${l}.media?message_id=${i}&media_id=${a}`,state:{mediachat:o}},s)}const xe=({value:a,msg:s,client:i})=>e.createElement("div",{className:"DivMessengerPremiumMedia kb5gq1qc pfnyh3mw hfv  hcukyx3x RpE"},a==null?void 0:a.mesmedia.map((l,o)=>e.createElement(X,{post_id:s==null?void 0:s.id,media_id:l==null?void 0:l.media_id,client:i,key:o},e.createElement("div",{className:"RpE  ni8dbmo4 stjgntxs fni8adji hgaippwi fykbt5ly ns4ygwem",style:{backgroundColor:"#efefef"}},e.createElement(Le,{src:l==null?void 0:l.media_src}))))),Le=e.memo(function({src:s}){return e.createElement("img",{src:s,className:"k4urcfbm bixrwtb6 datstx6m Fdo"})}),Ce=a=>{const[s,i]=e.useState(!1),[l,o]=e.useState(void 0),[u,f]=e.useState(!1),t=O(),n=z(h=>h);e.useEffect(()=>{if(a.open&&n.GiftLists.length===0){i(!0);var h=new FormData;h.append("url","RESTAPI/Gift/gift"),A("/api",h,_=>{i(!1),t(Ee(_.giftList))})}},[a.open]);const d=h=>{o(h)},w=()=>{a.close();const h=Date.now(),_={subject:"un cadeaux",id:h,sender_id:v.get("s_id"),user_id:a.useParams.id,media:0,created_time:{count:0,time:"m"},sended:!0,mesmedia:[],status:0,type:2,process:!0,error:!1},r={subject:"un cadeaux",client_id:a.useParams.id,id:h,client:{user:a.client},status:0,sender_id:v.get("s_id"),sended:!0,online_status:!1,ismedia:!1,conversations:[]};t(B(_)),t(M(r));let p={data_type:"message_text",sub_type:"Gift",gift_id:l,client_id:a.useParams.id,c_user:v.get("s_id"),security_token:v.get("isLogedin"),msg:"\u{1F381}",media:0,fake_ID:h,type:"gift",price:0};n.Util.ws.send(JSON.stringify(p))};return e.createElement(e.Fragment,null,e.createElement(D,{show:a.open,onHide:a.close,titre:"Choisir un cadeau",size:"gift"},e.createElement("div",{className:"Fdo Anv Aic ELG eGOV_ Aic"},s?e.createElement(k,null):e.createElement("div",{className:"Fdo Aic kzZ jifvfom9 d76ob5m9 k4urcfbm rq0escxv"},n.GiftLists.map((h,_)=>e.createElement("div",{key:_,className:"kb5gq1qc pIc pfnyh3mw rs0gx3tq tvfksri0 w0hvl6rk hcukyx3x RpE "},e.createElement("div",{className:l===h.gift_id?"Fdo Anv vag wfh Aic Lns QOqBd Ngt e6nwac2 ghjf":"Fdo Anv vag wfh Aic Lns QOqBd Ngt e6nwac2 ",onClick:()=>d(h.gift_id)},e.createElement("div",{className:"Fdo"},e.createElement("span",{className:"icon"},h.gift_icon)),e.createElement("div",{className:"Fdo"},e.createElement("span",{className:"v2ao"},h.gift_name)),e.createElement("div",{className:"Fdo"},e.createElement("span",{className:"v2ao"},h.gift_price," ",h.devise))))),e.createElement("div",{className:"Fdo Anv pybr56ya Kmm ELG"},e.createElement(ie,{variant:"_Dvgb",disabled:l===void 0,isLoading:u,onClick:w},"Envoyer"))))))};var Fe=U(Ce);function ke({children:a}){return e.createElement(I,null,e.createElement(I.Toggle,{as:ge,id:"dropdown-custom-components"},e.createElement("svg",{className:"gUZ lZJ U9O kVc",height:"24",width:"24",viewBox:"0 0 24 24","aria-hidden":"true","aria-label":"",role:"img"},e.createElement("path",{d:"M17.75 13.25h-4.5v4.5a1.25 1.25 0 0 1-2.5 0v-4.5h-4.5a1.25 1.25 0 0 1 0-2.5h4.5v-4.5a1.25 1.25 0 0 1 2.5 0v4.5h4.5a1.25 1.25 0 0 1 0 2.5M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0"}))),e.createElement(I.Menu,{as:ve},a))}class Re extends e.Component{constructor(s){super(s);g(this,"UpgradeAccount",()=>{this.setState({process:!0});let s=new FormData;s.append("url","RESTAPI/Payments/Jetons"),s.append("choice",this.state.choice),A("/payments",s,i=>{this.setState({message:i,process:!1,choice:0})})});g(this,"choice",s=>{this.setState({choice:s})});g(this,"handleChange",s=>{this.setState({[s.target.name]:s.target.value})});this.state={message:[],password:"",process:!1,choice:void 0,List:[]}}componentDidMount(){var s=new FormData;s.append("url","RESTAPI/Jeton/offres"),A("/api",s,i=>{this.setState({List:i==null?void 0:i.List})})}render(){var s,i,l;return e.createElement(D,{show:this.props.open,titre:"Jeton",onHide:this.props.close,size:"gift"},e.createElement("div",{className:"Fdo Anv Aic ELG eGOV_ Aic"},this.state.message.length!=0&&e.createElement("div",{className:"Fdo RpE Lns",style:{zIndex:1}},e.createElement("div",{className:this.state.message.success===1?"alert alert-success ":"alert alert-danger",role:"alert"},e.createElement("div",{className:"Fdo Aic"},e.createElement("div",{className:"Fdo Bsj"},e.createElement("span",{className:"gtb"},this.state.message.message))))),this.state.process&&e.createElement(k,null),e.createElement("div",{className:"Fdo Anv Aic ELG Lns Bsj Lns"},e.createElement("span",{className:"RtGi"},e.createElement(K,{size:52}))),((s=this.state.List)==null?void 0:s.length)>0?e.createElement("div",{className:"Fdo Vnk Kmm"},this.state.List.map((o,u)=>e.createElement("div",{className:"Fdo Anv Lbdf Aic",key:u},e.createElement("button",{className:`Fdo ELG Aic sqdOP Xdg L3NKy ZIAjV  Lns Bgrio ${this.state.choice===o._id?"Bgu ":" _8A5w5 "}`,onClick:()=>this.choice(o._id)},e.createElement("span",{className:"Fdo PLP"},e.createElement(K,{size:20})),e.createElement("span",null,o._name)),e.createElement("div",{className:"Fdo v2ao Lsy LDv"},e.createElement("span",{className:""},o._price),e.createElement("span",{className:"Lsy"},o.devise))))):e.createElement(k,null),this.state.choice&&e.createElement(le,{type:"password",value:(i=this.state)==null?void 0:i.password,placeholder:"mot de passe",name:"password",onChange:this.handleChange}),e.createElement("div",{className:"Fdo Kmm"}),e.createElement("div",{className:"Fdo Kmm ELG"},this.state.choice>0&&!this.state.process&&((l=this.state)==null?void 0:l.password.length)>0?e.createElement("button",{className:"sqdOP Xdg L3NKy ZIAjV _Dvgb Bsj",onClick:this.UpgradeAccount},"Acheter"):e.createElement("button",{className:"sqdOP Xdg L3NKy ZIAjV Bsj hdBtn"},"Acheter"))))}}const W=ee({useNativeArt:!0}),{EmojiSuggestions:je,EmojiSelect:Se}=W,Ae=[W];class ze extends q.exports.Component{constructor(s){super(s);g(this,"handlehiddenFileInput",s=>{this.hiddenFileInput.current.click()});g(this,"handlehiddenFileInput2",s=>{this.hiddenFileInput2.current.click()});g(this,"imageChange",s=>{s.target.files&&s.target.files.length>0&&this.props.imageChange(s)});g(this,"priceChange",()=>{this.props.changePrice()});g(this,"deleteImage",s=>{this.props.deleteImage(s)});g(this,"handleKeyBind",s=>s.keyCode===13&&!s.shiftKey&&!(s.metaKey||s.ctrlKey)?"send-message":s.keyCode===13&&s.shiftKey?"split-block":T.getDefaultKeyBinding(s));g(this,"handleKeyCommand",(s,i)=>s==="send-message"?(this.props.sendMessage(),"handled"):"not-handled");g(this,"testImg",()=>{let s=[];for(let i=0;i<this.props.image.length;i++){let l=this.props.image[i].type.split("/");s.push(e.createElement("div",{className:"kb5gq1qc pfnyh3mw m7zwrmfr tmrshh9y rs0gx3tq tvfksri0 w0hvl6rk hcukyx3x RpE",key:i},e.createElement("div",{className:"RpE ni8dbmo4 stjgntxs m7zwrmfr tmrshh9y fni8adji hgaippwi fykbt5ly ns4ygwem"},l[0]==="image"?e.createElement("img",{className:"k4urcfbm bixrwtb6 datstx6m q9uorilb",src:URL.createObjectURL(this.props.image[i]),alt:"Thumb"}):l[0]==="video"?e.createElement(e.Fragment,null,e.createElement("div",{className:"photo-container ApE v1d"},e.createElement("div",{className:"Fdo hty ELG Aic Lns LCR hgf shadowvg"},e.createElement(ce,{size:24}))),e.createElement("video",{ref:o=>this.videoPreview[i]=o,className:"k4urcfbm bixrwtb6 datstx6m q9uorilb",src:URL.createObjectURL(this.props.image[i])})):null),e.createElement("div",{className:"pmk7jnqg nezaghv5 e712q9ov"},e.createElement(J,{onClick:o=>this.deleteImage(i)}))))}return s});g(this,"closeJeton",()=>{this.setState({jeton:!1})});g(this,"closeGift",()=>{this.setState({open:!1})});this.hiddenFileInput=e.createRef(null),this.hiddenFileInput2=e.createRef(null),this.state={open:!1,jeton:!1,price:1e4},this.videoPreview=[]}render(){return e.createElement(e.Fragment,null,e.createElement("div",{className:"RpE i09qtzwb Fdo Lns Aic yC0tu tvmbv18p g3zh7qmp flx89l3n mb8dcdod lbhrjshz"},e.createElement(ke,null,e.createElement(F,{name:"contenu personalis\xE9",onClick:()=>this.props.setSpecialContent(!0)},e.createElement(re,{size:20})),e.createElement(F,{name:"envoyer des jetons",onClick:this.handlehiddenFileInput},e.createElement("svg",{width:"20",height:"20",viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",fill:"#000000"},e.createElement("g",null,e.createElement("path",{d:"M 17.762,9.294c-0.2-0.2-0.462-0.296-0.724-0.292C 16.774,8.998, 16.512,9.094, 16.312,9.294L 9.622,15.212 c-0.392,0.392-0.392,1.030,0,1.422c 0.392,0.392, 1.030,0.392, 1.422,0l 5.992-5.302l 5.992,5.302c 0.392,0.392, 1.030,0.392, 1.422,0 c 0.392-0.392, 0.392-1.030,0-1.422L 17.762,9.294zM 17.762,16.466c-0.2-0.2-0.462-0.296-0.724-0.292C 16.774,16.17, 16.512,16.266, 16.312,16.466l-6.69,5.918 c-0.392,0.392-0.392,1.030,0,1.422c 0.392,0.392, 1.030,0.392, 1.422,0l 5.992-5.3l 5.992,5.3c 0.392,0.392, 1.030,0.392, 1.422,0 c 0.392-0.392, 0.392-1.030,0-1.422L 17.762,16.466zM 17.072,2.144c-8.244,0-14.928,6.684-14.928,14.928S 8.828,32, 17.072,32S 32,25.316, 32,17.072 S 25.316,2.144, 17.072,2.144z M 17.072,30c-7.128,0-12.928-5.8-12.928-12.928s 5.8-12.928, 12.928-12.928S 30,9.944, 30,17.072S 24.2,30, 17.072,30z"})))),e.createElement(F,{name:"acheter des jetons",onClick:()=>this.setState({jeton:!0})},e.createElement("svg",{version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",width:"20",height:"20",viewBox:"0 0 32 32",enableBackground:"new 0 0 16 16",xmlSpace:"preserve",fill:"#000000"}," ",e.createElement("g",null,e.createElement("path",{d:"M 17,2C 8.716,2, 2,8.716, 2,17S 8.716,32, 17,32S 32,25.284, 32,17S 25.284,2, 17,2z M 17,30 C 9.832,30, 4,24.168, 4,17S 9.832,4, 17,4S 30,9.832, 30,17S 24.168,30, 17,30zM 18.714,10C 20.526,10, 22,11.346, 22,13C 22,13.552, 22.448,14, 23,14S 24,13.552, 24,13C 24,10.242, 21.628,8, 18.714,8L 18,8 L 18,7 C 18,6.448, 17.552,6, 17,6S 16,6.448, 16,7L 16,8 L 15.286,8 C 12.372,8, 10,10.242, 10,13S 12.372,18, 15.286,18L 16,18 l0,6 L 15.286,24 C 13.474,24, 12,22.654, 12,21 C 12,20.448, 11.552,20, 11,20S 10,20.448, 10,21C 10,23.758, 12.372,26, 15.286,26L 16,26 l0,1 C 16,27.552, 16.448,28, 17,28S 18,27.552, 18,27L 18,26 l 0.714,0 C 21.628,26, 24,23.758, 24,21S 21.628,16, 18.714,16L 18,16 L 18,10 L 18.714,10 z M 18.714,18C 20.526,18, 22,19.346, 22,21S 20.526,24, 18.714,24L 18,24 L 18,18 L 18.714,18 z M 16,16 L 15.286,16 C 13.474,16, 12,14.654, 12,13S 13.474,10, 15.286,10L 16,10 L 16,16 z"})))),this.props.textLengt>0||this.props.image.length>0?e.createElement(e.Fragment,null,e.createElement(F,{name:"envoyer un cadeau",onClick:()=>this.setState({open:!0})},e.createElement(H,{size:20})),e.createElement(F,{name:"photos ou videos",onClick:this.handlehiddenFileInput},e.createElement(de,{size:20}))):null),this.state.jeton&&e.createElement(Re,{open:this.state.jeton,close:this.closeJeton})),e.createElement("div",{className:"Fdo buofh1pr RpE"},e.createElement("div",{className:"RpE buofh1pr ni8dbmo4 stjgntxs czkt41v7 fmqxjp7s"},e.createElement("div",{className:"pmk7jnqg i09qtzwb j83agx80 Lns Aic cgat1ltu tvmbv18p g3zh7qmp flx89l3n mb8dcdod chkx7lpg"},e.createElement("div",{className:"Fdo nhd2j8a9 i09qtzwb Lns Aic yC0tu   g3zh7qmp flx89l3n mb8dcdod chkx7lpg",onClick:this.handlehiddenFileInput},e.createElement("div",{className:"Fdo nhd2j8a9 lZJ"},e.createElement(V,{size:24}))),e.createElement("input",{className:"mkhogb32",accept:"image/jpeg,image/jpg,image/png,video/mp4",type:"file",multiple:!0,onChange:this.imageChange,style:{display:"none"},ref:this.hiddenFileInput}),e.createElement("div",{className:"Fdo nhd2j8a9 i09qtzwb Lns Aic yC0tu   g3zh7qmp flx89l3n mb8dcdod chkx7lpg"},e.createElement("div",{className:"Fdo nhd2j8a9 lZJ",onClick:()=>this.setState({open:!0})},e.createElement(me,{size:24})),e.createElement(Fe,{client:this.props.client,open:this.state.open,close:this.closeGift}))),e.createElement("div",{className:"buofh1pr Fdo flx89l3n dpja2al7 dfr",style:this.props.textLengt==0&&this.props.image==0?{transform:"translateX(75px)"}:{transform:"translateX(0)"}},e.createElement("div",{className:"b3i9ofy5 RpE orhb3f3m czkt41v7 fmqxjp7s emzo65vh rq0escxv buofh1pr hpfvmrgz"},this.props.image.length>0&&e.createElement("div",{className:"Fdo Aic jifvfom9 owycx6da Vnk d1544ag0 tw6a2znq d76ob5m9 k4urcfbm rq0escxv"},e.createElement(this.testImg,null),e.createElement("div",{className:"RpE ni8dbmo4 stjgntxs m7zwrmfr tmrshh9y fni8adji hgaippwi fykbt5ly ns4ygwem"},e.createElement("div",{className:"RpE ni8dbmo4 stjgntxs m7zwrmfr tmrshh9y fni8adji hgaippwi fykbt5ly ns4ygwem",onClick:this.handlehiddenFileInput2},e.createElement("button",{className:"sqdOP ELG hty Aic Lns",style:{background:"#ddd",width:"100%"}},e.createElement("div",{className:"Fdo Aic Lns _0PwGv"},e.createElement(V,{size:32})))),e.createElement("input",{className:"mkhogb32",accept:"image/jpeg,image/jpg,image/png,video/mp4",type:"file",multiple:!0,onChange:this.imageChange,ref:this.hiddenFileInput2,style:{display:"none"}}))),e.createElement("div",{className:"Fdo lhclo0ds bkfpd7mw"},e.createElement("div",{className:"Fdo buofh1pr nhadk0th ozuftl9m  bi6gxh9e hpfvmrgz nmjy RpE",onClick:this.focus},e.createElement(te,{editorState:this.props.editorState,onChange:this.props.onChange,plugins:Ae,ref:s=>{this.editor=s},placeholder:"Aa",keyBindingFn:this.handleKeyBind,handleKeyCommand:this.handleKeyCommand})))))),e.createElement("div",{className:"pmk7jnqg i09qtzwb Fdo Lns Aic cgat1ltu tvmbv18p n7fi1qx3"},e.createElement(Se,null)),e.createElement(je,null)))}}const Pe=a=>{const s=e.createRef(null),i=u=>{s.current.click()},l=u=>{a.imageChange(u),s.current.value=""},o=u=>{let f=+u.target.value;typeof f=="number"&&f<1e6&&f>=0&&a.setPrice(f)};return e.createElement("div",{className:"MediaSpecialMessangeDiv"},e.createElement("div",{className:"Fdo messagerie-container sLayout",style:{padding:0,height:"100%"}},e.createElement("div",{className:"container-box messages-wrapper"},e.createElement("div",{className:"Fdo messages-listing"},e.createElement("div",{className:"messages-list-wrapper"},e.createElement("div",{className:"messages-list-header"},e.createElement("div",{className:"messages-list-title"},"Pack personalis\xE9")),e.createElement("div",{className:"conversation-list-content"},e.createElement("div",{className:"side-bar-message-wrapper message-scrollabled-list messagerie"},e.createElement("div",{className:"Fdo aovydwv3 pybr56ya Kmm"},e.createElement("button",{onClick:i,className:"sqdOP Xdg L3NKy ZIAjV Bsj Bgu "},"Ajouter des photos des videos")),e.createElement("input",{className:"mkhogb32",accept:"image/jpeg,image/jpg,image/png,video/mp4",type:"file",multiple:!0,onChange:l,style:{display:"none"},ref:s}),e.createElement("div",{className:""},e.createElement("div",{className:"_7UhW9    mWe   KV-D4   uL8Hv "},"Prix:",a.price,"AR")),e.createElement("div",{className:"Fdo aovydwv3 pybr56ya Kmm"},e.createElement("input",{name:"AlbumTitle",className:"Text-form",value:a.price,onChange:o,placeholder:"ajouter un prix"})),e.createElement("div",{className:"Fdo aovydwv3 pybr56ya Kmm"},e.createElement("input",{placeholder:"votre message",className:"Text-form"})))),e.createElement("div",{className:"conversation-footer"},e.createElement("div",{className:"Fdo aovydwv3 pybr56ya Kmm Pap"},e.createElement("button",{className:"sqdOP Xdg L3NKy ZIAjV  Bsj _8A5w5 Rav",onClick:()=>a.setSpecialContent(!1)},"Anuller"),e.createElement("button",{className:"sqdOP Xdg L3NKy ZIAjV Bsj _Dvgb Ftg"},"Envoyer"))))),e.createElement("div",{className:"messages-text-container RpE"},e.createElement("div",{className:"conversation-container"},e.createElement("div",{className:" Fdo Pac Cdf ELG vgh"},e.createElement("div",{className:"Fdo jifvfom9 lhclo0ds pybr56ya vcx Kmm tw6a2znq d76ob5m9 k4urcfbm rq0escxv"},e.createElement(Ie,{Medias:a.Medias,DeleteImage:a.deleteImage}))))))))},Ie=a=>{let s=[];for(let i=0;i<a.Medias.length;i++){const l=a.Medias[i].type.split("/")[0];s.push(e.createElement(e.Fragment,null,e.createElement("div",{className:"kb5gq1qc pfnyh3mw rs0gx3tq tvfksri0 w0hvl6rk hcukyx3x RpE",key:i,style:{height:150,width:150}},e.createElement("div",{className:"RpE ni8dbmo4 bBB stjgntxs fni8adji hgaippwi fykbt5ly ns4ygwem",style:{height:120,width:150}},e.createElement("div",{className:"Fdo Aic vrb vsa nwf6jgls Lns"},l==="video"?e.createElement(e.Fragment,null,e.createElement("div",{className:"photo-container ApE v1d"},e.createElement("div",{className:"Fdo hty ELG Aic Lns"},e.createElement(oe,null))),e.createElement("video",{src:URL.createObjectURL(a.Medias[i])})):e.createElement("img",{className:"idiwt2bm nwf6jgls d2edcug0 dbpd2lw6",src:URL.createObjectURL(a.Medias[i]),alt:"Thumb"}))),e.createElement("div",{className:"Fdo pmk7jnqg nezaghv5 e712q9ov"},e.createElement(J,{onClick:()=>a.DeleteImage(i)})))))}return s},Te=a=>{const[s,i]=e.useState(T.EditorState.createEmpty()),[l,o]=e.useState(0),[u,f]=e.useState([]),[t,n]=e.useState([]),d=z(m=>m),[w,h]=e.useState([]),[_,r]=e.useState(!1),p=O(),P=m=>{i(m),a.setTypingStatus()},R=m=>{const c=w.slice(),y=S.fileaccepted.split(",");for(let b=0;b<m.target.files.length;b++){let x=y.indexOf(m.target.files[b].type.split("/")[1]);m.target.files[b].size<S.min_size||m.target.files[b].size>S.max_size?alert("Le fichier ne doit pas depasser: "+maxSize.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:0})+"Mo"):x===-1?alert(`selectionner un fichier de type: ${S.fileaccepted}`):(c.push({texte:"",confidentiality:0,monetisation:!1,montant:0,thumbnail:"",uploadPercent:0}),h(c),f([...u,...m.target.files]))}},L=m=>{const c=u.slice();c.splice(m,1),f(c)},N=ue(he(s)),C=()=>{if(N.length>0||u.length>0){const m=Date.now(),c=pe(N),y=[];for(let j=0;j<u.length;j++)y.push({media_width:210,media_height:"auto",media_src:URL.createObjectURL(u[j]),media_type:u[j].type.split("/")[0],progress:1});const b={subject:c,fakeID:m,id:m,sender_id:v.get("s_id"),user_id:a.useParams.id,media:u.length,sended:!0,mesmedia:y,status:0,type:"0",process:!0},x={subject:c,client_id:a.useParams.id,id:m,client:{success:1,status:200,user:a.client},status:0,sender_id:v.get("s_id"),sended:!0,online_status:!1,ismedia:!1,conversations:[]};p(B(b)),p(M(x)),t.push(...u);let Z={data_type:"CHAT",chat_sub_type:"message_text",client_id:a.useParams.id,c_user:v.get("s_id"),security_token:v.get("isLogedin"),msg:N,media:u.length,type:0,fake_ID:m,price:l,gift_id:0};d.Util.ws.send(JSON.stringify(Z)),i(T.EditorState.createEmpty()),f([])}};e.useEffect(()=>{d.Util.ws.addEventListener("message",m=>{var y,b,x;const c=JSON.parse(m.data);console.log(c),(c==null?void 0:c.status)===200&&(c==null?void 0:c.data)&&((y=c==null?void 0:c.data)==null?void 0:y.data_type)==="CHAT"&&((b=c==null?void 0:c.data)==null?void 0:b.chat_sub_type)==="message_text"&&(c==null?void 0:c.messages.from_pool)&&parseInt((x=c==null?void 0:c.messages)==null?void 0:x.media)>0&&t.length>0&&p(fe({media:t,uploadIndex:0,element:c.messages}))})},[d.Conversations]);const E=()=>{const m=Date.now(),c={subject:":special_heart:",id:m,sender_id:v.get("s_id"),user_id:a.useParams.id,media:u.length,sended:!0,mesmedia:[],status:0,type:"0",process:!0},y={subject:":special_heart:",client_id:a.useParams.id,id:m,client:{success:1,status:200,user:a.client},status:0,sender_id:v.get("s_id"),sended:!0,online_status:!1,ismedia:!1,conversations:[]};p(B(c)),p(M(y));let b={data_type:"CHAT",chat_sub_type:"message_text",client_id:a.useParams.id,c_user:v.get("s_id"),security_token:v.get("isLogedin"),msg:":special_heart:",media:0,fake_ID:m,type:1,price:0};d.Util.ws.send(JSON.stringify(b))};return e.createElement(e.Fragment,null,_&&e.createElement(Pe,{setSpecialContent:r,Medias:u,deleteImage:L,imageChange:R,price:l,setPrice:o}),e.createElement(ze,{onChange:P,client:a.client,editorState:s,textLengt:N.length,image:u,imageChange:R,sendMessage:C,deleteImage:L,ws:d.Util.ws,setSpecialContent:r}),e.createElement("div",{className:"Fdo  Igw0E   IwRSH    eGOV_   _4EzTm  JI_ht"},N.length||u.length>0?e.createElement("button",{className:"wpO6b",style:{height:"35px",color:"#0095f6",fontWeight:600},onClick:C},e.createElement("div",{className:"QBdPU"}," envoyer ")):e.createElement("button",{type:"button",className:"wpO6b",style:{height:"35px"},onClick:E},e.createElement("div",{className:"QBdPU "},e.createElement("svg",{width:"24",height:"24",viewBox:"0 0 32 32",fill:"#ff4477"},e.createElement("g",null,e.createElement("path",{d:"M 31.984,13.834C 31.9,8.926, 27.918,4.552, 23,4.552c-2.844,0-5.35,1.488-7,3.672 C 14.35,6.040, 11.844,4.552, 9,4.552c-4.918,0-8.9,4.374-8.984,9.282L0,13.834 c0,0.030, 0.006,0.058, 0.006,0.088 C 0.006,13.944,0,13.966,0,13.99c0,0.138, 0.034,0.242, 0.040,0.374C 0.48,26.872, 15.874,32, 15.874,32s 15.62-5.122, 16.082-17.616 C 31.964,14.244, 32,14.134, 32,13.99c0-0.024-0.006-0.046-0.006-0.068C 31.994,13.89, 32,13.864, 32,13.834L 31.984,13.834 z"})))))))};var Be=U(Te);const Me=a=>{const s=O(),i=z(E=>E),[l,o]=e.useState({client_user:void 0}),[u,f]=e.useState(!1),[t,n]=e.useState([]),[d,w]=e.useState(!1);e.useState({typingTimeout:0});const[h,_]=e.useState(!1);e.useState(0);const r=i.Conversations,p=r.find(E=>E.client.user.user_id===a.useParams.id),P=E=>{if(p)n(p.messages),o({client_user:p.client.user});else{w(!0);var m=new FormData;m.append("url","RESTAPI/Chat/getMessages"),m.append("client_id",E),A("/conversation",m,c=>{if(w(!1),c.success===1&&c.status===200){const y=c.conversation.messages;n(y),o({client_user:c.conversation.client.user}),s(_e(c.conversation))}else c.success===0&&c.status===404&&a.navigate("/404")})}};e.useEffect(()=>{n([]),P(a.useParams.id)},[a.useParams.id]);const R=()=>{};e.useEffect(()=>{p&&(n(p.messages),o({client_user:p.client.user})),l.client_user&&h&&L(a.useParams.id)},[r]),e.useEffect(()=>{L(a.useParams.id),_(!0)},[l.client_user]);const L=E=>{if(p){let m=p==null?void 0:p.messages,c=m[m.length-1];if(m.length>0&&c.status!=1&&!c.sended){setTimeout(()=>{s(ye(i.Util.stats.inbox-1))},1e3),s(be(E));let y={data_type:"CHAT",chat_sub_type:"update_message_to_seen",c_user:v.get("s_id"),client_id:l.client_user&&l.client_user.user_id,security_token:v.get("isLogedin"),payload:c};i.Util.ws.send(JSON.stringify(y))}}},N=[];let C=null;return t.forEach((E,m)=>{E.time_status!==C&&(C=E.time_status,N.push(e.createElement("div",{className:"Fdo Bsj Asc _0PwGv  ",key:E==null?void 0:E.time_status},E==null?void 0:E.time_status))),N.push(e.createElement("div",{className:"Fdo Anv",key:E.id},l.client_user&&e.createElement(we,{value:E,index:m,list:t,src:l.client_user.avatar.medium,client:a.useParams.id})))}),e.createElement(q.exports.Suspense,{fallback:e.createElement(k,null)},d?e.createElement(k,null):e.createElement(e.Fragment,null,l.client_user&&e.createElement(e.Fragment,null,e.createElement("div",{className:"conversation-header messagerie"},e.createElement("div",{className:"S-mcP messagerie"},e.createElement("div",{className:"AjEzM messagerie"},e.createElement("div",{className:"m7ETg messagerie",style:{overflow:"inherit"}},e.createElement("div",{className:"Fdo   Fdo Igw0E   rBNOH  eGOV_  ybXk5    _4EzTm"},e.createElement("div",{className:"messagerie _4EzTm ovd"},e.createElement("span",{className:"_2dbep ",style:{width:"28px",height:"28px"}},e.createElement("img",{src:l.client_user.avatar.medium,className:"hty ELG hrt"})),l.client_user.online?e.createElement("div",{className:"rSxHQ UtYtc"}):null),e.createElement("div",{className:"page Fdo  Igw0E   n4cjz   IwRSH  Lns vwCYk"},e.createElement("div",{className:"Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr "},e.createElement("div",{className:"_7UhW9   fDxYl  "},e.createElement(G,{to:`/${l.client_user.username}`,className:"mWe hft"},e.createElement("div",{className:"R19PB"},e.createElement("div",{className:"_7UhW9 Fdo Aic  xLCgt    fDxYl"},l.client_user.first_name)))))),e.createElement("div",{className:"Fdo"},e.createElement(Ne,{user:l.client_user}))))))),e.createElement("div",{className:"Fdo conversation-main"},e.createElement("div",{className:"Fdo Anv Pap"},N,u&&e.createElement("div",{className:"Fdo Aic",style:{justifyContent:"flex-start",paddingBottom:"1px"}},e.createElement("div",{style:{height:30,width:30,marginRight:"0.5em",border:"1px solid transparent",borderRadius:50,overflow:"hidden",alignItems:"center"}},e.createElement("img",{className:"hty ELG hrt",src:l.client_user.avatar.medium})),e.createElement("div",{className:"ticontainer"},e.createElement("div",{className:"tiblock"},e.createElement("div",{className:"tidot"}),e.createElement("div",{className:"tidot"}),e.createElement("div",{className:"tidot"})))))),e.createElement("div",{className:"conversation-footer"},e.createElement("div",{className:"Fdo aovydwv3 Vnk Kmm Pap"},l.client_user.people_meet_desactived&&!l.client_user.blocked_by_viewer&&!l.client_user.has_blocked_viewer||l.client_user.has_match_with_viewer&&!l.client_user.blocked_by_viewer&&!l.client_user.has_blocked_viewer||!l.client_user.has_blocked_viewer&&!l.client_user.blocked_by_viewer&&i.Util.c_user.people_meet_desactived?e.createElement(Be,{setTypingStatus:R,client:l.client_user}):e.createElement("div",{className:"Fdo buofh1pr RpE taijpn5t"},e.createElement("div",{className:"_7UhW9  PIoXz       MMzan    _0PwGv  "},"Vous pouvez pas envoy\xE9 un message a cette utilisateur")))))))};var Ke=U(Me);export{Ke as default};
