// import { defineStore } from 'pinia'

// export const useAuthStore = defineStore('auth', {
//   state: () => {
//     const storedState = localStorage.getItem('authState')
//     return storedState
//       ? JSON.parse(storedState)
//       : {
//           user: null,
//           isAuthenticated: false,
//         }
//   },
//   actions: {
//     async setCsrfToken() {
//       await fetch('http://localhost:8000/api/set-csrf-token', {
//         method: 'GET',
//         credentials: 'include',
//       })
//     },

//     // async getBuildingList() {
//     //   const response = await fetch('api/data/buildings/get-building-list', {
//     //     method: 'GET',
//     //     credentials: 'include',
//     //   })
//     // },

//     async logout(router = null) {
//       try {
//         const response = await fetch('http://localhost:8000/api/logout', {
//           method: 'POST',
//           headers: {
//             'X-CSRFToken': getCSRFToken(),
//           },
//           credentials: 'include',
//         })
//         if (response.ok) {
//           this.user = null
//           this.isAuthenticated = false
//           this.saveState()
//           if (router) {
//             await router.push({
//               name: 'login',
//             })
//           }
//         }
//       } catch (error) {
//         console.error('Logout failed', error)
//         throw error
//       }
//     },

//     async fetchUser() {
//       try {
//         const response = await fetch('http://localhost:8000/api/user', {
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': getCSRFToken(),
//           },
//         })
//         if (response.ok) {
//           const data = await response.json()
//           this.user = data
//           this.isAuthenticated = true
//         } else {
//           this.user = null
//           this.isAuthenticated = false
//         }
//       } catch (error) {
//         console.error('Failed to fetch user', error)
//         this.user = null
//         this.isAuthenticated = false
//       }
//       this.saveState()
//     },

//     saveState() {
//       /*
//             We save state to local storage to keep the
//             state when the user reloads the page.

//             This is a simple way to persist state. For a more robust solution,
//             use pinia-persistent-state.
//              */
//       localStorage.setItem(
//         'authState',
//         JSON.stringify({
//           user: this.user,
//           isAuthenticated: this.isAuthenticated,
//         }),
//       )
//     },
//   },
// })

// export function exportedFunction() {
//     console.log('Exported Function call')
// }