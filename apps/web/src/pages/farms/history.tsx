import { SUPPORT_FARMS } from 'config/constants/supportChains'
import React from 'react'

/*
  TEMP DISABLED: Farms history is disabled while Farms UI is intentionally offline.

  The original implementation used FarmsV3Context, FarmCard, FarmV3Card, ProxyFarmContainer,
  and various farm hooks which are intentionally not mounted during this temporary state.

  If you need to restore the original page, the prior implementation can be found in the
  git history or replaced from the earlier commit where the Farms page was enabled.
*/

const FarmsHistoryPage = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2>Farms History</h2>
      <p>Farms and related historical data are temporarily unavailable.</p>
    </div>
  )
}

FarmsHistoryPage.chains = SUPPORT_FARMS

export default FarmsHistoryPage
