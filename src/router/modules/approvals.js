import layout from '@/layout'
export default {
  path: '/approvals',
  component: layout,
  children: [
    {
      path: '',
      name: 'approvals',
      component: () => import('@/views/approvals'),
      meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
