import{b as m,R as e,u as i}from"./vendor.7b712f9f.js";import{C as c,P as p}from"./Template.529b8812.js";import{i as u,a6 as h}from"./main.da775b16.js";import{w as d,ah as f,aF as E,O as P}from"./GeneralCondition.59d0a2ff.js";const g=r=>{const l=m(),[a,s]=e.useState(!1),o=i(t=>t);return e.useEffect(()=>{if(o.PhotosExplore.length===0){s(!0);let t=new FormData;t.append("url","/RESTAPI/Album/GetPhotosAlbum"),u("/api",t,n=>{s(!1),l(h(n.message))})}},[]),e.createElement(c,null,e.createElement("div",{className:"Ba2"},e.createElement("div",{className:"Fdo Cdf kzZ",style:{margin:"-4px"}},a?e.createElement(f,null):e.createElement(e.Fragment,null,o.PhotosExplore.map(t=>e.createElement("div",{className:"photo-item",key:t.album_id},e.createElement(p,{e:t,state:r.location})))),e.createElement(E,null)),!a&&o.PhotosExplore.length===0&&e.createElement(P,{titre:"Aucune photos pour vous pour le moment",texte:"Abonne toi a plus de personne"})))};var F=d(g);export{F as default};