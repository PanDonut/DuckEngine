"use strict";(global.webpackChunkelectron_react_webpack_boilerplate=global.webpackChunkelectron_react_webpack_boilerplate||[]).push([[71],{71:(e,t,r)=>{r.r(t),r.d(t,{default:()=>be});var n=r(294),o=r(792),i=r(856);r.p;var a=r(413);function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){m(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function m(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var s=r(822),f=r(477);function p(e,t,r,n,o){var i=setInterval((function(){t>e&&(o(e+=r),e>t&&clearInterval(i)),t<e&&(o(e-=r),e<t&&clearInterval(i))}),n)}function d(e,t){return Math.random()*(e-t)+t}r.p;const y=r.p+"8fe74b4f26568c3b4cd4d18c84e45710.gltf";var w=r(882),h=r(857);function g(){return g=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},g.apply(this,arguments)}function v(e,t,r,o){return function(r){var o=(0,w.L)(t);return n.createElement(e,g({},r,{gltfHook:o,animHook:function(e,t){return(0,h.v)(e,t)}}))}}var b=function(e){var t=e.value,r=e.didUpdate;return(0,n.useEffect)((function(){r(t)}),t),null};function E(e){var t=(0,h.v)(e.animations,e.group).actions;return(0,n.useEffect)((function(){t["animation.viewmodel.draw"].setLoop(f.LoopOnce,1),t["animation.viewmodel.draw"].weight=2,t["animation.viewmodel.draw"].play(),t["animation.viewmodel.hold"].play(),window.addEventListener("keyup",(function(e){"f"==e.key&&(t["animation.viewmodel.inspect"].stop(),t["animation.viewmodel.inspect"].setLoop(f.LoopOnce,1),t["animation.viewmodel.inspect"].weight=2,t["animation.viewmodel.inspect"].play())})),window.addEventListener("click",(function(e){window.PrimaryClip>0&&(t["animation.viewmodel.inspect"].stop(),t["animation.viewmodel.fire"].timeScale=1.7,t["animation.viewmodel.fire"].stop(),t["animation.viewmodel.fire"].setLoop(f.LoopOnce,1),t["animation.viewmodel.fire"].weight=3,t["animation.viewmodel.fire"].play())}))}),[]),(0,n.useEffect)((function(){window.addEventListener("keyup",(function(r){window.PrimaryClip<e.CLIPSIZE&&window.PrimaryAmmo>0&&"r"==r.key&&(t["animation.viewmodel.reload"].stop(),t["animation.viewmodel.reloadFinish"].stop(),t["animation.viewmodel.inspect"].stop(),t["animation.viewmodel.reload"].weight=3,t["animation.viewmodel.reload"].fadeIn(.15),t["animation.viewmodel.reload"].timeScale=1,t["animation.viewmodel.reload"].setLoop(f.LoopRepeat,e.CLIPSIZE-window.PrimaryClip),t["animation.viewmodel.reload"].play(),setTimeout((function(){t["animation.viewmodel.reloadFinish"].setLoop(f.LoopOnce,1),t["animation.viewmodel.reloadFinish"].weight=4,t["animation.viewmodel.reloadFinish"].play()}),1e3*e.RELOADTIME*(e.CLIPSIZE-window.PrimaryClip)-150))}))}),[]),(0,n.useEffect)((function(){switch(e.state){case"run":t["animation.viewmodel.move"].timeScale=1,t["animation.viewmodel.move"].play();break;case"crouch":t["animation.viewmodel.move"].timeScale=.5,t["animation.viewmodel.move"].play();break;case"idle":t["animation.viewmodel.move"].fadeOut(.1),setTimeout((function(){t["animation.viewmodel.move"].stop()}),100)}}),[e.state]),e.children}const S=r.p+"a1b0564a15ae3bf6f5e79c3047453e1d.gltf";function O(e){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},O(e)}function _(){return _=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},_.apply(this,arguments)}function P(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function j(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function A(e,t){return A=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},A(e,t)}function I(e,t){if(t&&("object"===O(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return R(e)}function R(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function L(e){return L=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},L(e)}function k(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function C(e){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(e)}function M(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function D(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function T(e,t){return T=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},T(e,t)}function x(e,t){if(t&&("object"===C(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return F(e)}function F(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function z(e){return z=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},z(e)}function V(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}v(function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&A(e,t)}(c,e);var t,r,o,i,a=(o=c,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=L(o);if(i){var r=L(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return I(this,e)});function c(){var e;P(this,c);for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return k(R(e=a.call.apply(a,[this].concat(r))),"gltf",e.props.gltfHook),k(R(e),"nodes",e.gltf.nodes),k(R(e),"materials",e.gltf.materials),e}return t=c,(r=[{key:"render",value:function(){return n.createElement("group",_({},props,{dispose:null}),n.createElement("group",{position:[0,.03125,-.00520833]},n.createElement("mesh",{castShadow:!0,receiveShadow:!0,geometry:nodes.cube.geometry,material:nodes.cube.material,position:[0,-.03125,-.04166667]}),n.createElement("mesh",{castShadow:!0,receiveShadow:!0,geometry:nodes.cube_1.geometry,material:nodes.cube_1.material,position:[0,-.03125,-.04166667]}),n.createElement("mesh",{castShadow:!0,receiveShadow:!0,geometry:nodes.cube_2.geometry,material:nodes.cube_2.material,position:[0,-.03125,-.04166667]})))}}])&&j(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),c}(n.Component),S);const U=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&T(e,t)}(c,e);var t,r,o,i,a=(o=c,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=z(o);if(i){var r=z(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return x(this,e)});function c(){var e;M(this,c);for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return V(F(e=a.call.apply(a,[this].concat(r))),"group",(0,n.createRef)()),V(F(e),"RANGE",1e3),V(F(e),"CLIPSIZE",8),V(F(e),"AMMOSIZE",64),V(F(e),"PERSHOT",6),V(F(e),"SPREAD",.3),V(F(e),"DAMAGE",6),V(F(e),"RELOADTIME",.65),V(F(e),"FIRETIME",0),V(F(e),"gltf",e.props.gltfHook),V(F(e),"nodes",e.gltf.nodes),V(F(e),"materials",e.gltf.materials),V(F(e),"animations",e.gltf.animations),V(F(e),"AnimFire",(function(){actions["animation.viewmodel.inspect"].stop(),actions["animation.viewmodel.fire"].timeScale=1.7,actions["animation.viewmodel.fire"].stop(),actions["animation.viewmodel.fire"].setLoop(f.LoopOnce,1),actions["animation.viewmodel.fire"].weight=3,actions["animation.viewmodel.fire"].play()})),V(F(e),"Shoot",(function(t){var r=new f.Vector3,n=[];e.props.camera.getWorldDirection(r),r.add(t),console.log(r),new f.Raycaster(e.props.camera.position,r).intersectObjects(e.props.scene.children,!0,n),console.log(n[0].object.userData.id),n[0].object.userData.id&&window.Server.emit("dmg",{id:n[0].object.userData.id,dmg:e.DAMAGE})})),V(F(e),"StartState",(function(){window.addEventListener("click",(function(){if(console.log("FIRE!"),window.PrimaryClip>0){window.PrimaryClip=window.PrimaryClip-1,window.forceUpdate();var t=new f.Vector3(0,0,0);e.Shoot(t);for(var r=0;r<e.PERSHOT-1;r++){var n=new f.Vector3(d(e.SPREAD,0),d(e.SPREAD,0),0);e.Shoot(n),console.log("THIS",n)}}})),window.addEventListener("keyup",(function(t){"r"==t.key&&window.PrimaryAmmo>0&&setTimeout((function(){var t=e.CLIPSIZE-window.PrimaryClip;window.PrimaryClip=e.CLIPSIZE,window.PrimaryAmmo=window.PrimaryAmmo-t,window.forceUpdate()}),1e3*e.RELOADTIME*(e.CLIPSIZE-window.PrimaryClip))}))})),V(F(e),"mixer",new f.AnimationMixer(e.gltf.scene)),V(F(e),"GetActionByName",(function(t){return e.mixer.clipAction(e.gltf.animations.filter((function(e){return e.name==t}))[0])})),e}return t=c,r=[{key:"IdentifyParts",value:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){e.children.forEach((function(e){e.material&&(e.renderOrder=999,e.material.depthTest=!0,e.material.alphaTest=!0,e.material.depthWrite=!1,e.material.polygonOffset=!0,e.material.polygonOffsetFactor=-4),e.children&&IdentifyParts(e)}))}))},{key:"render",value:function(){return n.createElement(n.Fragment,null,n.createElement(b,{value:[],didUpdate:this.StartState}),n.createElement(E,{group:this.group,animations:this.animations,state:this.props.state,RELOADTIME:this.RELOADTIME,CLIPSIZE:this.CLIPSIZE},n.createElement("group",{ref:this.group,dispose:null,position:[0,-.27,-.33]},n.createElement("group",{name:"blockbench_export"},n.createElement("group",null,n.createElement("group",{name:"Root",position:[-.25,-.6875,0]},n.createElement("group",{name:"body",position:[0,-1.5,0]},n.createElement("group",{name:"arms",position:[0,1.25,0]},n.createElement("group",{name:"right_arm",position:[.75,.1875,0]},n.createElement("group",{name:"WeaponRoot",position:[0,-1.3125,0]},n.createElement("group",{name:"WeaponRoot2",position:[.025,.125,-.15],rotation:[Math.PI,0,Math.PI/2]},n.createElement("group",{name:"muzzle",position:[2.26280567,.0625,.3237532]},n.createElement("mesh",{name:"pyramid",castShadow:!0,receiveShadow:!0,geometry:this.nodes.pyramid.geometry,material:this.nodes.pyramid.material,position:[-1.33125,0,-.09375],rotation:[0,0,Math.PI/2]})),n.createElement("group",{name:"pump",position:[1.79755655,.0625,.14688987]},n.createElement("mesh",{name:"pump_1",castShadow:!0,receiveShadow:!0,geometry:this.nodes.pump_1.geometry,material:this.nodes.pump_1.material,position:[-68155e-8,0,.01561013],rotation:[0,-.04363323,0]})),n.createElement("group",{name:"base",position:[.94405567,.0625,.2362532]},n.createElement("mesh",{name:"box",castShadow:!0,receiveShadow:!0,geometry:this.nodes.box.geometry,material:this.nodes.box.material,position:[.18719433,-.0625,.0387468]}),n.createElement("mesh",{name:"top_barrel",castShadow:!0,receiveShadow:!0,geometry:this.nodes.top_barrel.geometry,material:this.nodes.top_barrel.material,position:[.18719433,-.0625,.0387468]}),n.createElement("mesh",{name:"bottom_barrel",castShadow:!0,receiveShadow:!0,geometry:this.nodes.bottom_barrel.geometry,material:this.nodes.bottom_barrel.material,position:[.55906933,0,-.0393782],rotation:[-Math.PI/4,0,0]}),n.createElement("mesh",{name:"holder",castShadow:!0,receiveShadow:!0,geometry:this.nodes.holder.geometry,material:this.nodes.holder.material,position:[.18719433,-.0625,.0387468]}),n.createElement("mesh",{name:"handle",castShadow:!0,receiveShadow:!0,geometry:this.nodes.handle.geometry,material:this.nodes.handle.material,position:[-.88505187,0,-.11007592],rotation:[0,-.91629786,0]})),n.createElement("group",{name:"trigger",position:[.328125,.0625,.128125]},n.createElement("mesh",{name:"trigger_1",castShadow:!0,receiveShadow:!0,geometry:this.nodes.trigger_1.geometry,material:this.nodes.trigger_1.material,position:[.00625,0,-.015625],rotation:[0,-.43633231,0]})))),n.createElement("mesh",{name:"right_arm_1",castShadow:!0,receiveShadow:!0,geometry:this.nodes.right_arm_1.geometry,material:this.nodes.right_arm_1.material,position:[-.75,-2.9375,0]})),n.createElement("group",{name:"left_arm",position:[-.75,.1875,0]},n.createElement("mesh",{name:"left_arm_1",castShadow:!0,receiveShadow:!0,geometry:this.nodes.left_arm_1.geometry,material:this.nodes.left_arm_1.material,position:[.75,-2.9375,0]}))),n.createElement("group",{name:"HeadMod",position:[0,1.5625,0]},n.createElement("group",{name:"head"}))),n.createElement("group",{name:"left_leg",position:[-.25,-1.5,0]}),n.createElement("group",{name:"right_leg",position:[.25,-1.5,0]})))))))}}],r&&D(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),c}(n.Component);function Z(e){e.position;var t=e.state,r=e.camera,o=e.scene,i=(0,n.useRef)(),a=(0,w.L)(y),c=a.nodes,l=(a.materials,a.animations),m=(0,h.v)(l,i).actions;function u(e){var t=new f.Vector3,n=[];r.getWorldDirection(t),t.add(e),console.log(t),new f.Raycaster(r.position,t).intersectObjects(o.children,!0,n),console.log(n[0].object.userData.id),n[0].object.userData.id&&window.Server.emit("dmg",{id:n[0].object.userData.id,dmg:6})}return(0,n.useEffect)((function(){m["animation.viewmodel.draw"].setLoop(f.LoopOnce,1),m["animation.viewmodel.draw"].weight=2,m["animation.viewmodel.draw"].play(),m["animation.viewmodel.hold"].play(),window.addEventListener("keyup",(function(e){"f"==e.key&&(m["animation.viewmodel.inspect"].stop(),m["animation.viewmodel.inspect"].setLoop(f.LoopOnce,1),m["animation.viewmodel.inspect"].weight=2,m["animation.viewmodel.inspect"].play())}))}),[]),(0,n.useEffect)((function(){window.addEventListener("click",(function(){if(window.PrimaryClip>0){m["animation.viewmodel.inspect"].stop(),m["animation.viewmodel.fire"].timeScale=1.7,m["animation.viewmodel.fire"].stop(),m["animation.viewmodel.fire"].setLoop(f.LoopOnce,1),m["animation.viewmodel.fire"].weight=3,m["animation.viewmodel.fire"].play(),window.PrimaryClip=window.PrimaryClip-1,window.forceUpdate(),u(new f.Vector3(0,0,0));for(var e=0;e<5;e++){var t=new f.Vector3(d(.3,0),d(.3,0),0);u(t),console.log("THIS",t)}}})),window.addEventListener("keyup",(function(e){"r"==e.key&&(m["animation.viewmodel.inspect"].stop(),m["animation.viewmodel.reload"].weight=3,m["animation.viewmodel.reload"].fadeIn(.15),m["animation.viewmodel.reload"].timeScale=1,console.log(8-window.PrimaryClip),m["animation.viewmodel.reload"].setLoop(f.LoopRepeat,8-window.PrimaryClip),m["animation.viewmodel.reload"].play(),setTimeout((function(){m["animation.viewmodel.reload"].fadeOut(.15),m["animation.viewmodel.reloadFinish"].setLoop(f.LoopOnce,1),m["animation.viewmodel.reloadFinish"].weight=4,m["animation.viewmodel.reloadFinish"].play(),m["animation.viewmodel.reloadFinish"].fadeIn(.15),window.forceUpdate()}),5200-window.PrimaryClip-150),setTimeout((function(){var e=8-window.PrimaryClip;window.PrimaryClip=8,window.PrimaryAmmo=window.PrimaryAmmo-e,m["animation.viewmodel.reload"].stop(),window.forceUpdate()}),5200-window.PrimaryClip))}))}),[]),(0,n.useEffect)((function(){switch(t){case"run":m["animation.viewmodel.move"].timeScale=.95,m["animation.viewmodel.move"].play();break;case"crouch":m["animation.viewmodel.move"].timeScale=.45,m["animation.viewmodel.move"].play();break;case"idle":m["animation.viewmodel.move"].fadeOut(.1),setTimeout((function(){m["animation.viewmodel.move"].stop()}),100)}console.log(m)}),[t]),(0,n.useEffect)((function(){}),[]),n.createElement("group",{ref:i,dispose:null,position:[0,-.27,-.33]},n.createElement("group",{name:"blockbench_export"},n.createElement("group",null,n.createElement("group",{name:"Root",position:[-.25,-.6875,0]},n.createElement("group",{name:"body",position:[0,-1.5,0]},n.createElement("group",{name:"arms",position:[0,1.25,0]},n.createElement("group",{name:"right_arm",position:[.75,.1875,0]},n.createElement("group",{name:"WeaponRoot",position:[0,-1.3125,0]},n.createElement("group",{name:"WeaponRoot2",position:[.025,.125,-.15],rotation:[Math.PI,0,Math.PI/2]},n.createElement("group",{name:"muzzle",position:[2.26280567,.0625,.3237532]},n.createElement("mesh",{name:"pyramid",castShadow:!0,receiveShadow:!0,geometry:c.pyramid.geometry,material:c.pyramid.material,position:[-1.33125,0,-.09375],rotation:[0,0,Math.PI/2]})),n.createElement("group",{name:"pump",position:[1.79755655,.0625,.14688987]},n.createElement("mesh",{name:"pump_1",castShadow:!0,receiveShadow:!0,geometry:c.pump_1.geometry,material:c.pump_1.material,position:[-68155e-8,0,.01561013],rotation:[0,-.04363323,0]})),n.createElement("group",{name:"base",position:[.94405567,.0625,.2362532]},n.createElement("mesh",{name:"box",castShadow:!0,receiveShadow:!0,geometry:c.box.geometry,material:c.box.material,position:[.18719433,-.0625,.0387468]}),n.createElement("mesh",{name:"top_barrel",castShadow:!0,receiveShadow:!0,geometry:c.top_barrel.geometry,material:c.top_barrel.material,position:[.18719433,-.0625,.0387468]}),n.createElement("mesh",{name:"bottom_barrel",castShadow:!0,receiveShadow:!0,geometry:c.bottom_barrel.geometry,material:c.bottom_barrel.material,position:[.55906933,0,-.0393782],rotation:[-Math.PI/4,0,0]}),n.createElement("mesh",{name:"holder",castShadow:!0,receiveShadow:!0,geometry:c.holder.geometry,material:c.holder.material,position:[.18719433,-.0625,.0387468]}),n.createElement("mesh",{name:"handle",castShadow:!0,receiveShadow:!0,geometry:c.handle.geometry,material:c.handle.material,position:[-.88505187,0,-.11007592],rotation:[0,-.91629786,0]})),n.createElement("group",{name:"trigger",position:[.328125,.0625,.128125]},n.createElement("mesh",{name:"trigger_1",castShadow:!0,receiveShadow:!0,geometry:c.trigger_1.geometry,material:c.trigger_1.material,position:[.00625,0,-.015625],rotation:[0,-.43633231,0]})))),n.createElement("mesh",{name:"right_arm_1",castShadow:!0,receiveShadow:!0,geometry:c.right_arm_1.geometry,material:c.right_arm_1.material,position:[-.75,-2.9375,0]})),n.createElement("group",{name:"left_arm",position:[-.75,.1875,0]},n.createElement("mesh",{name:"left_arm_1",castShadow:!0,receiveShadow:!0,geometry:c.left_arm_1.geometry,material:c.left_arm_1.material,position:[.75,-2.9375,0]}))),n.createElement("group",{name:"HeadMod",position:[0,1.5625,0]},n.createElement("group",{name:"head"}))),n.createElement("group",{name:"left_leg",position:[-.25,-1.5,0]}),n.createElement("group",{name:"right_leg",position:[.25,-1.5,0]})))))}function H(e){return H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},H(e)}function W(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function B(e,t){return B=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},B(e,t)}function G(e,t){if(t&&("object"===H(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return N(e)}function N(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function $(e){return $=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},$(e)}function Y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}w.L.preload(y);var K={bab:{range:1e3,clipSize:16,ammoSize:64,bulletsPerShot:6,spread:.3,ref:v(function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&B(e,t)}(i,e);var t,r,n,o=(r=i,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=$(r);if(n){var o=$(this).constructor;e=Reflect.construct(t,arguments,o)}else e=t.apply(this,arguments);return G(this,e)});function i(){var e;W(this,i);for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Y(N(e=o.call.apply(o,[this].concat(r))),"RANGE",1e3),Y(N(e),"CLIPSIZE",16),Y(N(e),"AMMOSIZE",64),Y(N(e),"PERSHOT",6),Y(N(e),"SPREAD",.3),Y(N(e),"DAMAGE",6),Y(N(e),"RELOADTIME",.65),Y(N(e),"FIRETIME",0),e}return t=i,Object.defineProperty(t,"prototype",{writable:!1}),t}(U),y)},aba:{ref:Z},daba:{ref:Z}};function q(e){e!=window.AnimState&&(window.Server.emit("state",e),console.log(e)),window.AnimState=e}function X(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i=[],a=!0,c=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(c)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return J(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?J(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var Q=function(e){var t=e.socket,r=X((0,n.useReducer)((function(e){return e+1}),0),2)[1],o=(0,a.y)(),c=o.camera,d=o.scene,y=X((0,n.useState)(null),2),w=(y[0],y[1],X((0,n.useState)("stop"),2)),h=w[0],g=w[1],v=X((0,n.useState)(0),2),b=(v[0],v[1],(0,n.useRef)()),E=(0,n.useRef)(),S=(0,n.useRef)(),O=600,_=X((0,s.f)((function(){return{mass:100,fixedRotation:!0,position:[0,1,0],args:.2,material:{friction:0}}})),2),P=_[0],j=_[1],A=(0,n.useRef)({timeToShoot:0,timeTojump:0,vel:[0,0,0],jumping:!1,crouching:!1});(0,n.useEffect)((function(){j.velocity.subscribe((function(e){return A.current.vel=e}))}),[j]);var I=function(){var e,t,r={KeyW:"forward",KeyS:"backward",KeyA:"left",KeyD:"right",Space:"jump",ControlLeft:"crouch"},o=function(e){return r[e]},i=(e=(0,n.useState)({forward:!1,backward:!1,left:!1,right:!1,jump:!1,crouch:!1}),t=2,function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i=[],a=!0,c=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(c)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=i[0],c=i[1];return(0,n.useEffect)((function(){var e=function(e){c((function(t){return l(l({},t),{},m({},o(e.code),!0))})),console.log(e)},t=function(e){c((function(t){return l(l({},t),{},m({},o(e.code),!1))})),console.log(e)};return document.addEventListener("keydown",e),document.addEventListener("keyup",t),function(){document.removeEventListener("keydown",e),document.removeEventListener("keyup",t)}}),[]),a}(),R=I.forward,L=I.backward,k=I.left,C=I.right,M=I.jump,D=I.crouch,T=X((0,n.useState)(0),2),x=T[0],F=T[1],z=0,V=X((0,n.useState)(["bab","aba","daba"]),2),U=V[0],Z=V[1];(0,n.useEffect)((function(){p(x,D?2.55:3.45,.05,9,F)}),[D]);var H=X((0,n.useState)(1),2),W=H[0],B=H[1],G=X((0,n.useState)(1),2),N=G[0],$=G[1],Y=X((0,n.useState)(1),2),J=Y[0],Q=Y[1],ee=X((0,n.useState)(1),2),te=ee[0],re=ee[1];return(0,n.useEffect)((function(){p(W,J,.05,20,B)}),[J]),(0,n.useEffect)((function(){p(N,te,.05,20,$)}),[te]),(0,a.z)((function(e,r){var n=new f.Vector3(0,0,0),o=new f.Vector3;c.getWorldDirection(o);var i=new f.Vector3;i.setFromMatrixColumn(c.matrix,0),i.crossVectors(c.up,i);var a=new f.Vector3;a.setFromMatrixColumn(c.matrix,0),A.current.jumping?(re(R?.75:L?-.5:0),Q(C?.5:k?-.5:0)):A.current.crouching?(re(R?.6:L?-.6:0),Q(C?.6:k?-.6:0),!R||C||k||q("cf"),R||C||k||q("crouch")):(re(R?1:L?-1:0),Q(C?1:k?-1:0),C&&R?q("sr"):k&&R&&q("sl"),!R||C||k||q("run"),C&&!R?q("r"):k&&!R&&q("l"),C||k||R||L||q("idle")),A.current.crouching=!!D,0!==J&&0!==te?(n.add(i.clone().multiplyScalar(O*N)).add(a.clone().multiplyScalar(O*W)),n.clampLength(-600,O)):0!==J?n.add(a.clone().multiplyScalar(O*W)):0!==te&&n.add(i.clone().multiplyScalar(O*N)),j.velocity.set(n.x*r,A.current.vel[1],n.z*r),c.eulerOrder="YXZ",c.position.set(P.current.position.x,x+P.current.position.y,P.current.position.z);var l,m,u,s,p,y=new f.Vector3;if(c.getWorldDirection(y),y.multiplyScalar(.075),y.add(c.position),E.current.position.set(y.x,y.y,y.z),E.current.setRotationFromQuaternion(c.quaternion),g((R||L||C||k)&&!D?"run":(R||L||C||k)&&D?"crouch":"idle"),b.current){var w=new f.Vector3(0,0,0);c.getWorldDirection(w),l=P.current.position,m=o,u=t.id,s=[],p=[],l.toArray(s),m.toArray(p),t.emit("move",{id:u,rotation:p,position:s})}if(A.current.jumping&&A.current.vel[1]<0&&0!==new f.Raycaster(P.current.position,new f.Vector3(0,-1,0),0,.2).intersectObjects(d.children).length&&(A.current.jumping=!1),M&&!A.current.jumping){var h=Date.now();h>A.current.timeTojump&&(A.current.timeTojump=h+400,A.current.jumping=!0,j.velocity.set(A.current.vel[0],5,A.current.vel[2]))}})),(0,n.useEffect)((function(){window.addEventListener("wheel",(function(e){console.log(e.deltaY),e.deltaY>1&&(z-1>=0?z-=1:z=2),e.deltaY<-1&&(z+1<=2?z+=1:z=0),Z(U),console.log(z),r(),window.selectedWeapon=z}))}),[]),(0,n.useEffect)((function(){console.log(z)}),[z]),(0,n.useEffect)((function(){window.PrimaryAmmo=K[U[0]].ammoSize,window.PrimaryClip=K[U[0]].clipSize,window.SecondaryAmmo=K[U[1]].ammoSize,window.SecondaryClip=K[U[1]].clipSize,window.MeleeAmmo=K[U[2]].ammoSize,window.MeleeClip=K[U[2]].clipSize,r(),window.forceUpdate()}),[]),n.createElement(n.Fragment,null,n.createElement("group",null,n.createElement(i.q,{minPolarAngle:.01,maxPolarAngle:3,ref:b,camera:c})),n.createElement("group",{ref:E,scale:[.1,.1,.1],renderOrder:2},n.createElement("group",{ref:S,position:[.3,-.3,0]},U.map((function(e,t){if(t==z){var r=K[e];return n.createElement(r.ref,{state:h,camera:c,scene:d})}})))))};const ee=r.p+"62edb9a2741027143a4e70f82a58255f.gltf";function te(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i=[],a=!0,c=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(c)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return re(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?re(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function re(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var ne=function(e){var t=e.position,r=e.rotation,o=void 0===r?[0,0,0,"XYZ"]:r,i=e.id,a=e.animState,c=(0,n.useRef)(),l=(0,n.useRef)(),m=(0,n.useRef)(),u=(0,n.useRef)(),s=((0,n.useRef)(),(0,n.useRef)(),(0,n.useRef)()),p=(0,w.L)(ee),d=p.nodes,y=(p.materials,p.animations),g=(0,h.v)(y,c).actions,v=te((0,n.useState)([0,0,0]),2),b=v[0],E=(v[1],te((0,n.useState)(!0),2));function S(e){g[e].fadeIn(.1),g[e].play(),Object.keys(g).forEach((function(t){t!=e&&(g[t].fadeOut(.1),setTimeout((function(){g[t].stop()}),100))}))}function O(e){e.children.forEach((function(e){e.userData.id=i,e.castShadow=!0,e.children&&O(e)}))}return E[0],E[1],n.useRef(),(0,n.useEffect)((function(){switch(a){case"idle":S("animation.player.idle");break;case"crouch":S("animation.player.crouch");break;case"cf":S("animation.player.crouchF");break;case"run":S("animation.player.run");break;case"l":S("animation.player.runL");break;case"r":S("animation.player.runR");break;case"sl":S("animation.player.strafeL");break;case"sr":S("animation.player.strafeR");break;default:S("animation.player.def")}console.log(g)}),[a]),(0,n.useEffect)((function(){c.current&&(c.current.userData.id=i,console.log(c.current),c.current.children.forEach((function(e){e.userData.id=i,e.castShadow=!0,O(e)})))}),[c]),(0,n.useEffect)((function(){var e=new f.Vector3;(e=(new f.Vector3).fromArray(o)).y=0,e.add(c.current.position),c.current.lookAt(e)}),[o]),(0,n.useEffect)((function(){u.current.rotation.x=o[1],s.current.rotation.x=o[1]+("cf"==a?1.8:1.5)}),[o]),n.createElement("group",{ref:c,rotation:b,dispose:null,position:t},n.createElement("group",{ref:l}),n.createElement("group",{name:"blockbench_export"},n.createElement("group",null,n.createElement("group",{name:"Root",rotation:[Math.PI,0,Math.PI]},n.createElement("group",null,n.createElement("group",{ref:m,name:"body",position:[0,1.5,0]},n.createElement("group",{name:"HeadMod",position:[0,1.56,0],ref:u},n.createElement("group",{name:"head"},n.createElement("mesh",{name:"head_1",castShadow:!0,receiveShadow:!0,geometry:d.head_1.geometry,material:d.head_1.material,position:[0,-3.0625,0]}))),n.createElement("group",{name:"arms",position:[0,1.25,0],ref:s},n.createElement("group",{name:"left_arm",position:[-.75,.1875,0]},n.createElement("mesh",{name:"left_arm_1",castShadow:!0,receiveShadow:!0,geometry:d.left_arm_1.geometry,material:d.left_arm_1.material,position:[.75,-2.9375,0]})),n.createElement("group",{name:"right_arm",position:[.75,.1875,0]},n.createElement("mesh",{name:"right_arm_1",castShadow:!0,receiveShadow:!0,geometry:d.right_arm_1.geometry,material:d.right_arm_1.material,position:[-.75,-2.9375,0]}))),n.createElement("mesh",{name:"body_1",castShadow:!0,receiveShadow:!0,geometry:d.body_1.geometry,material:d.body_1.material,position:[0,-1.5,0]}))),n.createElement("group",{name:"left_leg",position:[-.25,1.5,0]},n.createElement("mesh",{name:"left_leg_1",castShadow:!0,receiveShadow:!0,geometry:d.left_leg_1.geometry,material:d.left_leg_1.material,position:[.25,-1.5,0]})),n.createElement("group",{name:"right_leg",position:[.25,1.5,0]},n.createElement("mesh",{name:"right_leg_1",castShadow:!0,receiveShadow:!0,geometry:d.right_leg_1.geometry,material:d.right_leg_1.material,position:[-.25,-1.5,0]}))))))};w.L.preload(ee);var oe=r(977),ie=r(537),ae=r(593),ce=r(217);const le=r.p+"6da4e5170eabe08000fe505f5fe44d53.hdr",me=r.p+"d516aec7c37e8bbe2c7d8a564c2dbd77.gltf";w.L.preload(me);var ue=r(580);function se(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function fe(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function pe(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var de=function(e){var t,r,o=(0,s.a)((function(){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?se(Object(r),!0).forEach((function(t){fe(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):se(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({mass:1,args:[.5,.5,.5],material:{friction:1,restitution:0}},e)})),i=(t=o,r=1,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i=[],a=!0,c=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(c)throw o}}return i}}(t,r)||function(e,t){if(e){if("string"==typeof e)return pe(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?pe(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0],a=(0,n.useMemo)((function(){return ue[8][Math.floor(Math.random()*ue[8].length)]}),[]);return n.createElement("mesh",{ref:i,castShadow:!0,receiveShadow:!0,layers:e.layers},n.createElement("boxBufferGeometry",{args:[.5,.5,.5]}),n.createElement("meshLambertMaterial",{color:a}))};function ye(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var we=function(){var e,t,r=(e=(0,s.u)((function(){return{rotation:[-Math.PI/2,0,0],position:[0,-.25,0],material:{friction:.1}}})),t=1,function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i=[],a=!0,c=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(c)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return ye(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?ye(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0];return n.createElement("mesh",{ref:r,receiveShadow:!0,scale:[1e3,1e3,1e3]},n.createElement("planeBufferGeometry",{receiveShadow:!0}),n.createElement("meshPhongMaterial",{color:"skyblue",receiveShadow:!0}))};const he=r.p+"e6f09b38c4af066ad670f4c73cf99f82.gltf";function ge(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i=[],a=!0,c=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(c)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return ve(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?ve(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ve(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function be(){(0,a.C)(ce.E,he);var e=(0,n.useRef)(),t=ge((0,n.useState)(null),2),r=t[0],i=t[1],c=ge((0,n.useState)({}),2),l=c[0],m=c[1];return(0,n.useEffect)((function(){var e=(0,o.io)("http://localhost:5000");return console.log("Sever connect..."),i(e),window.Server=e,function(){r&&r.disconnect()}}),[]),(0,n.useEffect)((function(){if(r){r.on("move",(function(e){m(e)}));var e={name:localStorage.getItem("name"),uid:localStorage.getItem("uid")};r.on("connect",(function(){console.log("CON!"),r.emit("UserData",JSON.stringify(e))}))}}),[r]),r&&n.createElement(n.Fragment,null,n.createElement(oe.Xz,{ref:e,className:"GameViewport"},n.createElement(ie.j,null),n.createElement(s.P,{gravity:[0,-9,0],tolerance:0,iterations:50,broadphase:"SAP"},n.createElement(Q,{socket:r}),n.createElement(we,null),n.createElement(de,{position:[0,0,-5],layers:1}),n.createElement(de,{position:[-.6,0,-5]}),n.createElement(de,{position:[.6,0,-5]}),n.createElement(de,{position:[-.3,.5,-5]}),n.createElement(de,{position:[.3,.5,-5]}),n.createElement(de,{position:[0,1,-5]}),n.createElement(de,{position:[-5,0,-5]}),n.createElement(de,{position:[-5,.5,-5]}),n.createElement(de,{position:[-5,1,-5]}),n.createElement(de,{position:[-5,1.5,-5]}),n.createElement(de,{position:[0,0,5],type:"Static"}),n.createElement(de,{position:[0,0,5.5],type:"Static"}),n.createElement(de,{position:[0,.5,5.5],type:"Static"})),n.createElement(ae.qA,{background:!0,files:le}),n.createElement("ambientLight",{intensity:0,rotation:[0,1,0]}),n.createElement("directionalLight",{intensity:1}),Object.keys(l).filter((function(e){return e!==r.id})).map((function(e){var t=l[e],r=t.position,o=t.rotation;return n.createElement(ne,{onClick:function(){console.log(e)},key:e,id:e,position:r,rotation:o,animState:l[e].state})}))),n.createElement("div",{className:"cel"}),n.createElement("div",{className:"UIAmmo"},n.createElement("h2",null,window.PrimaryClip),n.createElement("h3",null,window.PrimaryAmmo)))}}}]);