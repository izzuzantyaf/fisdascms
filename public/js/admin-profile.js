(()=>{function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}function n(e,t){return function(e,t){if(t.get)return t.get.call(e);return t.value}(e,function(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}(e,t,"get"))}var r=new WeakMap,a=new WeakMap,i=new WeakMap,l=new WeakMap,o=new WeakMap,c=new WeakSet,s=new WeakSet;function u(){var e=this;n(this,a).addEventListener("click",(function(){for(var t=0,a=Array.from(n(e,r).querySelectorAll(".non-edit-el"));t<a.length;t++){a[t].classList.add("hidden")}for(var i=0,l=Array.from(n(e,r).querySelectorAll(".edit-el"));i<l.length;i++){l[i].classList.remove("hidden")}}))}function d(){var e=this;n(this,l).addEventListener("click",(function(t){t.target!=n(e,o)&&t.target!=n(e,l)||n(e,l).classList.replace("flex","hidden")})),n(this,i).addEventListener("click",(function(){n(e,l).classList.replace("hidden","flex")}))}(new(function(){function f(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),s.add(this),c.add(this),r.set(this,{writable:!0,value:document.querySelector(".admin-profile")}),a.set(this,{writable:!0,value:document.querySelector(".edit-btn")}),i.set(this,{writable:!0,value:document.querySelector(".delete-btn")}),l.set(this,{writable:!0,value:document.querySelector(".delete-modal-overlay")}),o.set(this,{writable:!0,value:document.querySelector(".cancel-btn")})}var h,v,w;return h=f,(v=[{key:"hydrate",value:function(){null!=n(this,r)&&(t(this,c,u).call(this),t(this,s,d).call(this))}}])&&e(h.prototype,v),w&&e(h,w),f}())).hydrate()})();