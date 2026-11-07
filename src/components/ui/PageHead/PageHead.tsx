import type { PageHeadProps } from './types'

const PageHead = ({ title, subtitle, actions }: PageHeadProps) => (
  <div className="pagehead">
    <div>
      <h1>{title}</h1>
      {subtitle && <p className="muted mt-1">{subtitle}</p>}
    </div>
    {actions && <div className="row">{actions}</div>}
  </div>
)

export default PageHead
