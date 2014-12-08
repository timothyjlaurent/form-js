/** 
* FormJS - v0.1.0.
* https://github.com/mkay581/formjs.git
* Copyright 2014. Licensed MIT.
*/
define(["underscore","./form-element","./libs/element-kit/element-kit.min"],function(e,t){var n=function(e){this.initialize(e)};return n.prototype=e.extend({},t.prototype,{initialize:function(n){this.options=e.extend({el:null,onChecked:null,onUnchecked:null,containerClass:"ui-checkbox",inputClass:"ui-checkbox-input",checkedClass:"ui-checkbox-checked",disabledClass:"ui-checkbox-disabled"},n),this.el=this.options.el,this.el.tagName.toLowerCase()!=="input"&&console.warn("checkbox error: element passed in instantiation was not an input element"),t.prototype.initialize.call(this,this.options),this.setup()},setup:function(){var e=this.getFormElement();e.kit.classList.add(this.options.inputClass),this._container=this._buildUIElement(this.el),this.isInitChecked=e.checked,this.isInitChecked&&this._container.kit.classList.add(this.options.checkedClass),this.isInitDisabled=e.disabled,this.isInitDisabled&&this._container.kit.classList.add(this.options.disabledClass),this.getUIElement().kit.addEventListener("click","_onClick",this)},_onClick:function(){var e=this.getFormElement();e.disabled||(this.getUIElement().kit.classList.contains(this.options.checkedClass)?this.uncheck():this.check())},_buildUIElement:function(e){return e.kit.appendOuterHtml('<div class="'+this.options.containerClass+'"></div>')},check:function(){var e=this.getFormElement(),t=this.getUIElement();e.checked||(e.checked=!0),t.kit.classList.add(this.options.checkedClass),this.options.onChecked&&this.options.onChecked(e.value,e,t)},uncheck:function(){var e=this.getFormElement(),t=this.getUIElement();e.checked&&(e.checked=!1),t.kit.classList.remove(this.options.checkedClass),this.options.onUnchecked&&this.options.onUnchecked(e.value,e,t)},enable:function(){this.getFormElement().disabled=!1,this.getUIElement().kit.classList.remove(this.options.disabledClass)},disable:function(){this.getFormElement().disabled=!0,this.getUIElement().kit.classList.add(this.options.disabledClass)},getFormElement:function(){return this.el},getUIElement:function(){return this._container},getElementKey:function(){return"checkbox"},destroy:function(){var e=this.getUIElement(),n=this.getFormElement();e.kit.removeEventListener("click","_onClick",this),e.parentNode.replaceChild(n,e),this.isInitChecked&&(n.checked=!0),this.isInitDisabled&&(n.disabled=!0),t.prototype.destroy.call(this)}}),n});