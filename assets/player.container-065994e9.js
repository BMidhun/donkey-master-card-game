import{r as d,j as e,g as h,P as g}from"./index-0686dec4.js";const x=13;function N(n){const[t,s]=d.useState(0);function r(){s(o=>o+1)}return d.useEffect(()=>{t===x&&n()},[t,n]),{incrementNumOfCardsLoaded:r}}function w(){return e.jsxs("div",{className:`my-2 rounded-lg flex items-center justify-center grow border-4 shadow-lg shadow-gray-700 relative ${h(g.HUMAN)}`,children:[e.jsx("div",{className:"absolute top-0 right-0 h-10 w-10 transform z-40",children:e.jsx("img",{src:"/assets/icons/crown.svg",className:"h-full w-full",alt:"crown.svg"})}),e.jsx("span",{className:"text-white text-bold",children:"WINNER"})]})}function j({playerCards:n,onCardSelect:t,isWinner:s,highlight:r,loadPlayer:o}){let a=0;const{incrementNumOfCardsLoaded:f}=N(o);return e.jsx(e.Fragment,{children:s?e.jsx(w,{}):e.jsx("div",{className:`my-2 rounded-lg flex items-baseline justify-between grow overflow-auto border-4 shadow-md shadow-gray-700 relative ${h(g.HUMAN)} ${r?"animate-pulse":""}`,children:Object.keys(n).map(i=>{const l=i;return e.jsx("div",{className:"h-full w-full relative",children:n[l].map((c,m)=>(a=m*8,e.jsx("img",{src:c.imgSrc,className:"transition ease-in hover:-translate-y-6 cursor-pointer z-30 absolute transform scale-75",style:{top:`${a}%`},onClick:()=>{t(c)},alt:"card.svg",onLoad:u=>{f()}},c.rank)))},i)})})})}function E({playerCards:n,isCurrentPlayer:t,playerId:s,onDeal:r,playCardTypeOnTable:o,gameState:a,loadPlayer:f}){const i=a.numOfAvailablePlayers===1,l=a.winners[s];d.useEffect(()=>{i||t&&l&&r(s,null)},[t,l,i,s,r]);function c(u){if(!(!t||i)){if(!o){r(s,u);return}u.type!==o&&n[o].length||r(s,u)}}const m=t&&!l&&!i;return e.jsx(j,{playerCards:n,onCardSelect:c,highlight:m,isWinner:a.winners[s],loadPlayer:f})}export{E as default};