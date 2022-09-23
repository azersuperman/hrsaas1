import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
console.dir(req)
console.log(req.keys())
console.log(req('./dashboard.svg'))

// const requireAll = requireContext => requireContext.keys().map((val) => {
//   return requireContext(val)
// })

const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
console.log(requireAll(req))
