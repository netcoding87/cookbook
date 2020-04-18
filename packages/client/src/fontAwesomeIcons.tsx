import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowAltCircleLeft,
  faStar as farStar,
} from '@fortawesome/free-regular-svg-icons'
import {
  faBalanceScale,
  faBlender,
  faCandyCane,
  faCheck,
  faEdit,
  faImage,
  faPlus,
  faPrint,
  faSave,
  faSearch,
  faSearchPlus,
  faStar,
  faTimes,
  faTrash,
  faWeight,
} from '@fortawesome/free-solid-svg-icons'

const loadIcons = () => {
  library.add(
    faArrowAltCircleLeft,
    faBalanceScale,
    faBlender,
    faCandyCane,
    faCheck,
    faEdit,
    faImage,
    faPlus,
    faPrint,
    faSave,
    faSearch,
    faSearchPlus,
    faStar,
    faTimes,
    faTrash,
    faWeight,
    farStar
  )
}

export default loadIcons
