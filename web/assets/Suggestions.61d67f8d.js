import{b as l,R as e,u as i}from"./vendor.7b712f9f.js";import{F as u,_ as c,K as g,R as m}from"./GeneralCondition.59d0a2ff.js";import{F as p}from"./FollowBtn.961a835e.js";import{af as E}from"./main.da775b16.js";import"./Template.529b8812.js";const R=f=>{const r=l(),[o,n]=e.useState(!1),a=i(t=>t);return e.useEffect(()=>{if(a.Suggestions.length===0){n(!0);var t=new FormData;t.append("url","./RESTAPI/suggestions/suggestions"),t.append("limit",5),u("/api",t,s=>{s.success&&r(E(s.users)),n(!1)})}},[]),e.createElement(c,null,o?e.createElement(g,{length:3}):e.createElement(e.Fragment,null,a.Suggestions.map((t,s)=>e.createElement("div",{className:"UserActions Ert Vpe",key:s},e.createElement(m,{author:t},e.createElement(p,{type:"link",user:t})))),a.Suggestions.length===0&&e.createElement("div",{className:""},"Aucune suggestions pour le moment")))};export{R as default};