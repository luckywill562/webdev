import{R as t,f as N,L as w}from"./vendor.7b712f9f.js";import{w as I,aG as r}from"./GeneralCondition.59d0a2ff.js";const y=n=>{var e,E,l,a,c,d,i;return t.createElement(t.Fragment,null,(e=n==null?void 0:n.message)!=null&&e.client?t.createElement(h,{path:n.location.pathname,to:n==null?void 0:n.to,src:(E=n==null?void 0:n.message)==null?void 0:E.client.user.avatar.x56,first_name:(l=n==null?void 0:n.message)==null?void 0:l.client.user.first_name,subject:(a=n==null?void 0:n.message)==null?void 0:a.subject,message:n==null?void 0:n.message,online_status:n.list[n.index].client.user.online,media:(c=n==null?void 0:n.message)==null?void 0:c.ismedia}):t.createElement(h,{path:n.location.pathname,to:(d=n==null?void 0:n.message)==null?void 0:d.client_id,first_name:".",subject:(i=n==null?void 0:n.message)==null?void 0:i.subject,message:n.message}))};var H=I(y);const u=t.memo(function({src:e}){return t.createElement("img",{src:e,className:"hty ELG hrt"})});function _({src:n,message:e,online_status:E,media:l}){var a,c,d,i;return t.createElement("div",{className:"Fdo   Fdo Igw0E   rBNOH  eGOV_  ybXk5    _4EzTm"},t.createElement("div",{className:"page _4EzTm ovd yC0tu"},t.createElement("span",{className:"_2dbep ",style:{width:"56px",height:"56px"}},n&&t.createElement(u,{src:n})),E&&t.createElement("div",{className:"rSxHQ evOYH"})),t.createElement("div",{className:"page Fdo  Igw0E     IwRSH  Lns vwCYk"},t.createElement("div",{className:" page            qF0y9          Igw0E     IwRSH      eGOV_       acqo5   _4EzTm"},(e==null?void 0:e.seen)===!0||(e==null?void 0:e.sended)?t.createElement("div",{className:"_7UhW9   KV-D4    fDxYl",dangerouslySetInnerHTML:{__html:(c=(a=e==null?void 0:e.client)==null?void 0:a.user)==null?void 0:c.first_name},style:{lineHeight:"20px"}}):t.createElement("div",{className:"_7UhW9  mWe   KV-D4    fDxYl",dangerouslySetInnerHTML:{__html:(i=(d=e==null?void 0:e.client)==null?void 0:d.user)==null?void 0:i.first_name},style:{lineHeight:"20px"}})),t.createElement("div",{className:"Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr   "},t.createElement("div",{className:"_7UhW9     MMzan   fDxYl  "},t.createElement("span",{className:"R19PB"},(e==null?void 0:e.sended)&&t.createElement("span",null,"vous: "),(e==null?void 0:e.seen)||(e==null?void 0:e.sended)?t.createElement(t.Fragment,null,l?t.createElement("span",null,t.createElement(r,{size:18}),t.createElement("span",{className:"_7UhW9    MMzan  se6yk"},"Pi\xE8ce jointe")):t.createElement("span",{className:"_7UhW9     MMzan  se6yk",dangerouslySetInnerHTML:{__html:e==null?void 0:e.subject}})):t.createElement(t.Fragment,null,l?t.createElement("span",null,t.createElement(r,{size:18}),t.createElement("span",{className:"_7UhW9     MMzan  se6yk"},"Piece Jointe")):t.createElement("span",{className:"_7UhW9   se6yk",style:{color:"#3897f0",fontWeight:500},dangerouslySetInnerHTML:{__html:e==null?void 0:e.subject}})))),(e==null?void 0:e.seen)&&(e==null?void 0:e.sended)&&t.createElement("div",{style:{width:"18px",height:"18px",overflow:"hidden",borderRadius:50,flex:"0 0 auto"}},n&&t.createElement(u,{src:n})),!(e!=null&&e.seen)&&!(e!=null&&e.sended)&&t.createElement("div",{className:"Fdo Aic J_0ip  Vpz-1  TKi86"},t.createElement("div",{className:"bqXJH"},"1")))))}function h({to:n,path:e,src:E,first_name:l,subject:a,message:c,activeOnlyWhenExact:d,online_status:i,media:m}){const v=N(`/inbox/${n}`);return t.createElement("div",{className:"Fdo Anv"},v?t.createElement("div",{className:"Fdo Anv"},t.createElement("div",{className:"page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm Cxfa"},t.createElement("div",{className:"page QOqBd   Fdo  Igw0E  IwRSH   eGOV_    _4EzTm",style:{borderRadius:6}},t.createElement("div",{className:"rOtsg"},t.createElement(_,{src:E,first_name:l,subject:a,message:c,online_status:i,media:m}))))):t.createElement("div",{className:"page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm"},t.createElement("div",{className:"page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm",style:{borderRadius:6}},t.createElement(w,{to:n,className:"rOtsg ElL"},t.createElement(_,{src:E,first_name:l,subject:a,message:c,online_status:i,media:m})))))}export{H as default};
