({self:document.querySelector(".avatar"),profileDropdown:document.querySelector(".profile-dropdown"),hydrate:function(){null!=this.profileDropdown&&this.showHideProfileDropdown()},showHideProfileDropdown:function(){var e=this;this.self.addEventListener("click",(function(){e.profileDropdown.classList.contains("scale-0")?e.profileDropdown.classList.replace("scale-0","scale-100"):e.profileDropdown.classList.replace("scale-100","scale-0")}))}}).hydrate();