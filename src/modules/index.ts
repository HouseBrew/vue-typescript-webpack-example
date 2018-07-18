import router from '@/router'
import store from '@/store'

import {membersRoutes, membersStore} from '@/modules/members'
router.addRoutes(membersRoutes)
store.registerModule(['members'], membersStore)

export {router, store}

