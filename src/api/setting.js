import request from '@/utils/request'
export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 添加接口
 * @param {} data
 * @returns
 */
export const addRole = (data) => {
  return request({
    url: '/sys/role',
    data,
    method: 'POST'
  })
}

/**
 * 编辑接口
 * @param {Object} data
 * @returns
 */
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}

/**
 * 删除接口
 * @param {Number} id
 * @returns
 */
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
