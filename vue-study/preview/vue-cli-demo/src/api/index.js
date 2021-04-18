// export const getCourses = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([{ name: 'web全栈' }, { name: 'web高级' }])
//     }, 2000)
//   })
// }

import axios from "axios"

export const getCourses = () => {
  return axios.get('/api/courses').then(res => res.data)
}
