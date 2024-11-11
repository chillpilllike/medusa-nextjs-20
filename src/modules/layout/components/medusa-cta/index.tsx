import { Text } from "@medusajs/ui"

import Medusa from "../../../common/icons/medusa"
import NextJs from "../../../common/icons/nextjs"

const MedusaCTA = () => {
  return (
    <Text className="flex gap-x-2 txt-compact-small-plus items-center">
      Encrypted Payments, Secure Peace of Mind. 
<IconBadge>
  <Stripe />
</IconBadge>
<IconBadge>
  <Mastercard />
</IconBadge>
<IconBadge>
  <Klarna />
</IconBadge>
<IconBadge>
  <Visa />
</IconBadge>
<IconBadge>
  <VerifiedBadge />
</IconBadge>
 </Text>
  )
}

export default MedusaCTA
