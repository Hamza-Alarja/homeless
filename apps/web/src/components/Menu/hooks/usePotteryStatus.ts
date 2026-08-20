import useSWRImmutable from 'swr/immutable'
import { fetchLastVaultAddress } from 'state/pottery/fetchPottery'
import { getPotteryVaultContract } from 'utils/contractHelpers'
import { useRouter } from 'next/router'

export const usePotteryStatus = () => {
  const { pathname } = useRouter()

  // Do not start Pottery network requests while on the /swap page to avoid
  // unnecessary GraphQL calls (CORS-failing endpoints). Pottery UI still
  // functions on its own pages where pathname does not start with '/swap'.
  const shouldFetch = !pathname.startsWith('/swap')

  const { data: potteryStatus } = useSWRImmutable(
    shouldFetch ? 'potteryLastStatus' : null,
    async () => {
      const lastVaultAddress = await fetchLastVaultAddress()
      const potteryVaultContract = getPotteryVaultContract(lastVaultAddress)
      return potteryVaultContract.read.getStatus()
    },
  )

  return potteryStatus
}
