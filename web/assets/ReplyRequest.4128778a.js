import{b as m,R as e}from"./vendor.7b712f9f.js";import{B as l,F as p}from"./GeneralCondition.59d0a2ff.js";import{F as f,H as E,s as g,c as A}from"./main.da775b16.js";const R=a=>{const t=m(),[o,d]=e.useState(!1),[i,u]=e.useState(!1),n=r=>{r==="ACCEPT"?d(!0):u(!1);let s=new FormData;s.append("action",r),s.append("url","RESTAPI/Users/follow"),s.append("user_id",a.user.user_id),p("/api",s,c=>{c.success===1&&(t(f({user_id:a.user.user_id})),t(E({user_id:a.user.user_id}))),t(g(c)),setTimeout(()=>{t(A())},2e3)})};return e.createElement(e.Fragment,null,e.createElement("div",{className:"Fdo LDv"},e.createElement(l,{variant:"_8A5w5",isLoading:i,disabled:o,onClick:()=>n("DECLINE")},"r\xE9fuser")),e.createElement("div",{className:"Fdo "},e.createElement(l,{variant:"_Dvgb",isLoading:o,disabled:i,onClick:()=>n("ACCEPT")},"accepter")))};export{R};