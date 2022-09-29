export const imgerror = {
  inserted(el, binging, vnode) {
    // console.log(el)
    // console.log(binging)
    // console.log(vnode)
    el.onerror = function() {
      el.src = binging.value
    }
  }
}
export const imgerror1 = {
  inserted(el, binging, vnode) {
    console.log(el)
    console.log(binging)
    console.log(vnode)
    el.onerror = function() {
      el.src = binging.value
    }
  }
}
