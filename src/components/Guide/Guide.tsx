import { buildGuideModel } from './helpers'
import GuideView from './GuideView'

// Le contenu ne dépend que de constantes : calculé une seule fois.
const MODEL = buildGuideModel()

/** Mode d'emploi, tarifs et charte du jardinier. */
const Guide = () => <GuideView model={MODEL} />

export default Guide
